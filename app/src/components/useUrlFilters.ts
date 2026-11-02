'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { filtersToQuery, parseFilters } from '@/lib/filters';
import type { FilterState, SortKey } from '@/lib/types';

const CHANGE_EVENT = 'url-filters:change';

function subscribe(listener: () => void): () => void {
  window.addEventListener('popstate', listener);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener('popstate', listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

const getSearch = () => window.location.search;
// The server always renders the unfiltered list, so the page ships real cards
// in its HTML. Filters from the URL apply right after hydration.
const getServerSearch = () => '';

/**
 * Filter state that lives in the URL, so a filtered view is a shareable link.
 * Reads `location.search` instead of `useSearchParams`, which would make the
 * whole listing render in the browser only.
 */
export function useUrlFilters(defaultSort: SortKey) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const state = useMemo(
    () => parseFilters(new URLSearchParams(search), defaultSort),
    [search, defaultSort],
  );

  const update = (next: Partial<FilterState>) => {
    const query = filtersToQuery({ ...state, ...next }, defaultSort).toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const clear = () => update({ tags: [], types: [], price: 'any' });
  return { state, update, clear, defaultSort };
}
