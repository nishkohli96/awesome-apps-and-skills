'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { filtersToQuery, parseFilters } from '@/lib/filters';
import { trackFilterChange } from '@/lib/analytics';
import type { FilterState } from '@/lib/types';
import { PriceFilter, type SortKey } from '@/types';

const CHANGE_EVENT = 'url-filters:change';
const FILTER_PARAMS = ['tags', 'type', 'price', 'sort'];

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
    [search, defaultSort]
  );

  const update = (next: Partial<FilterState>) => {
    trackFilterChange(state, next);
    // Keep parameters that are not filters (utm_*, etc.); only ours are rewritten.
    const params = new URLSearchParams(window.location.search);
    FILTER_PARAMS.forEach(key => params.delete(key));
    filtersToQuery({ ...state, ...next }, defaultSort).forEach((value, key) =>
      params.set(key, value)
    );
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const clear = () => update({ tags: [], types: [], price: PriceFilter.Any });
  return { state, update, clear, defaultSort };
}
