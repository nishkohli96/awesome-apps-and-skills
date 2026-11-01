'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { filtersToQuery, parseFilters } from '@/lib/filters';
import type { FilterState, SortKey } from '@/lib/types';

/** Filter state that lives in the URL, so a filtered view is a shareable link. */
export function useUrlFilters(defaultSort: SortKey) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const state = parseFilters(params, defaultSort);

  const update = (next: Partial<FilterState>) => {
    const merged = filtersToQuery({ ...state, ...next }, defaultSort);
    // Keep params this hook does not own, such as the search query.
    const q = params.get('q');
    if (q) {
      merged.set('q', q);
    }
    const qs = merged.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clear = () => update({ tags: [], types: [], price: 'any' });
  return { state, update, clear, defaultSort };
}
