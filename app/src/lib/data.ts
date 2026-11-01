import 'server-only';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parseCategoryFile } from './parse';
import type { Category, Tool, ToolType } from './types';

const REPO_ROOT = path.resolve(process.cwd(), '..');
const CATEGORIES_DIR = path.join(REPO_ROOT, 'categories');
const NEW_WINDOW_DAYS = 14;
const HISTORY_DAYS = 30;

interface Data {
  tools: Tool[];
  categories: Category[];
}

/**
 * Reads `git log` once to learn when each entry first appeared. An entry that
 * is removed and re-added in the same commit was only moved (alphabetical
 * sorting), so it does not count as new. Returns an empty map without git.
 */
function readAddedDates(): Map<string, string> {
  const added = new Map<string, string>();
  try {
    const log = execFileSync(
      'git',
      [
        'log',
        `--since=${HISTORY_DAYS} days ago`,
        '--format=@@%aI',
        '-p',
        '--unified=0',
        '--',
        'categories',
      ],
      { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
    );
    const entry = /^([+-])- \*\*\[(.+?)\]\(/;
    let date = '';
    let plus = new Set<string>();
    let minus = new Set<string>();
    const commit = () => {
      for (const name of plus) {
        if (!minus.has(name) && !added.has(name)) {
          added.set(name, date);
        }
      }
      plus = new Set();
      minus = new Set();
    };
    for (const line of log.split('\n')) {
      if (line.startsWith('@@20')) {
        commit();
        date = line.slice(2);
        continue;
      }
      const match = entry.exec(line);
      if (match) {
        (match[1] === '+' ? plus : minus).add(match[2]);
      }
    }
    commit();
  } catch {
    // Not a git checkout (or git missing): nothing is flagged as new.
  }
  return added;
}

function load(): Data {
  const addedDates = readAddedDates();
  const now = Date.now();
  const tools: Tool[] = [];
  const categories: Category[] = [];

  for (const file of readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.md'))) {
    const source = readFileSync(path.join(CATEGORIES_DIR, file), 'utf8');
    const parsed = parseCategoryFile(file.replace(/\.md$/, ''), source);
    categories.push({ ...parsed.category, toolCount: parsed.tools.length });
    for (const tool of parsed.tools) {
      const addedAt = addedDates.get(tool.name) ?? null;
      const ageDays = addedAt ? (now - Date.parse(addedAt)) / 86_400_000 : Infinity;
      tools.push({ ...tool, addedAt, isNew: ageDays < NEW_WINDOW_DAYS });
    }
  }

  categories.sort((a, b) => b.toolCount - a.toolCount || a.name.localeCompare(b.name));
  return { tools, categories };
}

let cache: Data | undefined;
function data(): Data {
  cache ??= load();
  return cache;
}

export const getTools = (): Tool[] => data().tools;
export const getCategories = (): Category[] => data().categories;
export const getCategory = (slug: string): Category | undefined =>
  data().categories.find(category => category.slug === slug);
export const getToolsInCategory = (slug: string): Tool[] =>
  data().tools.filter(tool => tool.category === slug);

/** Tags used by the given tools, most used first. */
export function countTags(tools: Tool[]): [tag: string, count: number][] {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    for (const tag of tool.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function countTypes(tools: Tool[]): Map<ToolType, number> {
  const counts = new Map<ToolType, number>();
  for (const tool of tools) {
    counts.set(tool.type, (counts.get(tool.type) ?? 0) + 1);
  }
  return counts;
}

/** Newest first; tools git does not know about keep their file order after. */
export function newestFirst(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => (b.addedAt ?? '').localeCompare(a.addedAt ?? ''));
}
