'use client';

import { track, toolClickData } from '@/lib/analytics';
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useToolSearch } from '@/lib/data-context';
import type { Tool } from '@/lib/types';
import { AnalyticsEvent, SearchPanelState, ToolClickSource } from '@/types';

const MAX_ROWS = 8;
const DEBOUNCE_MS = 150;

export function openTool(tool: Tool) {
  track(
    AnalyticsEvent.ToolClick,
    toolClickData(tool, ToolClickSource.SearchPanel)
  );
  window.open(tool.url, '_blank', 'noopener,noreferrer');
}

/** Query, debounced results and keyboard navigation shared by both search UIs. */
export function useSearchState(onDone: () => void) {
  const router = useRouter();
  const search = useToolSearch();
  const [query, setQueryRaw] = useState('');
  const [debounced, setDebounced] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  const trimmed = query.trim();
  const results = useMemo(
    () => (debounced.trim() ? search(debounced) : []),
    [debounced, search]
  );
  const rows = results.slice(0, MAX_ROWS);
  const total = results.length;
  const pending = trimmed !== debounced.trim();
  const hasResults = rows.length > 0 || pending;
  let state = SearchPanelState.None;
  if (!trimmed) {
    state = SearchPanelState.Empty;
  } else if (hasResults) {
    state = SearchPanelState.Results;
  }

  const setQuery = (value: string) => {
    setQueryRaw(value);
    setActive(0);
  };

  const goToResults = () => {
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    onDone();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const last = rows.length; // index `rows.length` is the "all results" row
    if (event.key === 'ArrowDown' && rows.length > 0) {
      event.preventDefault();
      setActive(i => Math.min(i + 1, last));
    } else if (event.key === 'ArrowUp' && rows.length > 0) {
      event.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      /**
       * While the debounce is pending, `rows` still belong
       * to the previous query.
       */
      if (!pending && rows.length > 0 && active < rows.length) {
        openTool(rows[active]);
        onDone();
      } else if (trimmed) {
        goToResults();
      }
    } else if (event.key === 'Escape') {
      onDone();
    }
  };

  const reset = () => {
    setQueryRaw('');
    setDebounced('');
    setActive(0);
  };

  return {
    query,
    trimmed,
    setQuery,
    rows,
    total,
    pending,
    state,
    active,
    setActive,
    onKeyDown,
    goToResults,
    reset,
  };
}

export type SearchState = ReturnType<typeof useSearchState>;
