import { PRICINGS, TOOL_TYPES } from './types';
import type { Category, Pricing, Tool, ToolType } from './types';

export type ParsedTool = Omit<Tool, 'addedAt' | 'addedBy' | 'isNew'>;
export type ParsedCategory = Omit<Category, 'toolCount'>;

const ENTRY_START = /^- \*\*\[(.+?)\]\((.+?)\)\*\*(.*)$/;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isToolType(value: string): value is ToolType {
  return (TOOL_TYPES as readonly string[]).includes(value);
}

function isPricing(value: string): value is Pricing {
  return (PRICINGS as readonly string[]).includes(value);
}

function plainText(value: string): string {
  return value
    .replace(/<br\s*\/?>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseEntry(
  block: string[],
  category: string,
  subcategory: string,
): ParsedTool | null {
  const head = ENTRY_START.exec(block[0]);
  if (!head) {
    return null;
  }
  const [, name, url, rest] = head;
  const typeAlt = [...rest.matchAll(/alt="([a-z-]+)"/g)]
    .map(match => match[1])
    .find(isToolType);
  if (!typeAlt) {
    return null;
  }

  const description: string[] = [];
  let tags: string[] = [];
  let pricing: Pricing | null = null;
  for (const line of block.slice(1)) {
    const text = line.trim();
    if (text.startsWith('🏷')) {
      tags = [...text.matchAll(/`([^`]+)`/g)].map(match => match[1]);
    } else if (text.startsWith('💰')) {
      const value = text.replace('💰', '').trim();
      pricing = isPricing(value) ? value : null;
    } else if (text) {
      description.push(plainText(text));
    }
  }

  return {
    slug: slugify(name),
    name,
    url,
    type: typeAlt,
    category,
    subcategory,
    description: description.join(' '),
    tags,
    pricing,
  };
}

export function parseCategoryFile(
  fileName: string,
  source: string,
): { category: ParsedCategory; tools: ParsedTool[] } {
  const lines = source.split('\n');
  const heading = (/^# (\S+)\s+(.+)$/).exec(lines.find(l => l.startsWith('# ')) ?? '');
  const blurb = lines.find(l => (/^_.+_$/).test(l.trim())) ?? '';
  const slug = slugify(heading?.[2] ?? fileName);

  const tools: ParsedTool[] = [];
  const subcategories: string[] = [];
  let subcategory = '';
  let block: string[] = [];

  const flush = () => {
    if (block.length > 0) {
      const tool = parseEntry(block, slug, subcategory);
      if (tool) {
        tools.push(tool);
      }
      block = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush();
      subcategory = line.slice(3).trim();
      subcategories.push(subcategory);
    } else if (line.startsWith('- ')) {
      flush();
      block = [line];
    } else if (block.length > 0 && line.startsWith(' ')) {
      block.push(line);
    } else {
      flush();
    }
  }
  flush();

  return {
    category: {
      slug,
      emoji: heading?.[1] ?? '',
      name: heading?.[2].trim() ?? slug,
      description: blurb.trim().replace(/^_|_$/g, ''),
      subcategories: subcategories.filter(name =>
        tools.some(tool => tool.subcategory === name),),
    },
    tools,
  };
}
