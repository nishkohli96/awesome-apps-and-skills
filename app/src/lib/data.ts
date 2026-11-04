import 'server-only';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { resolveGithubHandle } from './authors';
import { parseCategoryFile } from './parse';
import type { ToolType } from '@/types';
import type { Category, Tool } from './types';

const REPO_ROOT = path.resolve(process.cwd(), '..');
const CATEGORIES_DIR = path.join(REPO_ROOT, 'categories');
const NEW_WINDOW_DAYS = 7;

interface Data {
  categories: Category[];
  tools: Tool[];
}

interface Addition {
  date: string;
  name: string;
  email: string;
}

/**
 * Reads `git log` once to learn when, and by whom, each entry first appeared.
 * An entry that is removed and re-added in the same commit was only moved
 * (alphabetical sorting), so that commit does not count as its addition.
 * Returns an empty map without git, or in a shallow clone, where the oldest
 * commit would wrongly look like it added everything.
 */
function readAdditions(): Map<string, Addition> {
  const added = new Map<string, Addition>();
  const git = (args: string[]) =>
    execFileSync('git', args, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  try {
    if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') {
      return added;
    }
    const log = git([
      'log',
      '--reverse',
      '--format=@@%aI%x1f%aN%x1f%aE',
      '-p',
      '--unified=0',
      '--',
      'categories',
    ]);
    const entry = /^([+-])- \*\*\[(.+?)\]\(/;
    let who: Addition = { date: '', name: '', email: '' };
    let plus = new Set<string>();
    let minus = new Set<string>();
    const commit = () => {
      for (const name of plus) {
        if (!minus.has(name) && !added.has(name)) {
          added.set(name, who);
        }
      }
      plus = new Set();
      minus = new Set();
    };
    for (const line of log.split('\n')) {
      if (line.startsWith('@@20')) {
        commit();
        const [date, name, email] = line.slice(2).split('\x1f');
        who = { date, name, email };
        continue;
      }
      const match = entry.exec(line);
      if (match) {
        (match[1] === '+' ? plus : minus).add(match[2]);
      }
    }
    commit();
  } catch {
    // Not a git checkout (or git missing): no dates or authors.
  }
  return added;
}

function load(): Data {
  const additions = readAdditions();
  const now = Date.now();
  const tools: Tool[] = [];
  const categories: Category[] = [];

  for (const file of readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.md'))) {
    const source = readFileSync(path.join(CATEGORIES_DIR, file), 'utf8');
    const parsed = parseCategoryFile(file.replace(/\.md$/, ''), source);
    categories.push({
      ...parsed.category,
      toolCount: parsed.tools.length
    });

    for (const tool of parsed.tools) {
      const added = additions.get(tool.name);
      const addedAt = added?.date ?? null;
      const ageDays = addedAt ? (now - Date.parse(addedAt)) / 86_400_000 : Infinity;
      tools.push({
        ...tool,
        addedAt,
        addedBy: added
          ? { name: added.name, login: resolveGithubHandle(added.email) }
          : null,
        isNew: ageDays < NEW_WINDOW_DAYS,
      });
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
