'use client';

import { createContext, use, useMemo, type ReactNode } from 'react';
import Fuse from 'fuse.js';
import type { Category, Tool } from './types';

interface DataValue {
  tools: Tool[];
  categories: Category[];
}

const DataContext = createContext<DataValue | null>(null);

export function DataProvider({
  tools,
  categories,
  children,
}: DataValue & { children: ReactNode }) {
  const value = useMemo(() => ({ tools, categories }), [tools, categories]);
  return <DataContext value={value}>{children}</DataContext>;
}

export function useData(): DataValue {
  const value = use(DataContext);
  if (!value) {
    throw new Error('useData must be used inside <DataProvider>');
  }
  return value;
}

/** Fuse index over every tool; built once, on first search. */
export function useToolSearch(): (query: string) => Tool[] {
  const { tools, categories } = useData();
  const fuse = useMemo(() => {
    const records = tools.map(tool => ({
      tool,
      name: tool.name,
      tags: tool.tags.join(' '),
      description: tool.description,
      group: `${categories.find(c => c.slug === tool.category)?.name ?? ''} ${tool.subcategory}`,
    }));
    return new Fuse(records, {
      keys: [
        { name: 'name', weight: 0.5 },
        { name: 'tags', weight: 0.25 },
        { name: 'description', weight: 0.15 },
        { name: 'group', weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [tools, categories]);

  return useMemo(
    () => (query: string) => {
      const q = query.trim();
      return q ? fuse.search(q).map(hit => hit.item.tool) : tools;
    },
    [fuse, tools]
  );
}
