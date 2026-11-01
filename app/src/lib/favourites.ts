'use client';

import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'aas:favourites';
const NONE: readonly string[] = [];

let raw: string | null = null;
let snapshot: readonly string[] = NONE;
const listeners = new Set<() => void>();

function readSnapshot(): readonly string[] {
  let next: string | null = null;
  try {
    next = window.localStorage.getItem(KEY);
  } catch {
    return snapshot;
  }
  if (next !== raw) {
    raw = next;
    try {
      const parsed: unknown = next ? JSON.parse(next) : [];
      snapshot = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : NONE;
    } catch {
      snapshot = NONE;
    }
  }
  return snapshot;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) {
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function write(slugs: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // Storage blocked (private mode): the heart simply will not stick.
    return;
  }
  listeners.forEach(listener => listener());
}

export function useFavourites() {
  const slugs = useSyncExternalStore(subscribe, readSnapshot, () => NONE);
  const toggle = useCallback((slug: string) => {
    const current = readSnapshot();
    write(current.includes(slug) ? current.filter(s => s !== slug) : [...current, slug]);
  }, []);
  return { slugs, toggle, has: (slug: string) => slugs.includes(slug) };
}
