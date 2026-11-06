import {
  PRICINGS,
  PriceFilter,
  SortKey,
  TOOL_TYPES,
  type Pricing,
  type ToolType,
} from '@/types';
import type { FilterState, Tool } from './types';

type Params = Pick<URLSearchParams, 'get'>;

const list = (value: string | null): string[] =>
  value ? value.split(',').filter(Boolean) : [];

export function parseFilters(
  params: Params,
  defaultSort: SortKey
): FilterState {
  const price = params.get('price');
  const sort = params.get('sort');
  return {
    tags: list(params.get('tags')),
    types: list(params.get('type')).filter((t): t is ToolType =>
      (TOOL_TYPES as string[]).includes(t)
    ),
    price: (PRICINGS as string[]).includes(price ?? '')
      ? (price as Pricing)
      : PriceFilter.Any,
    sort: (Object.values(SortKey) as string[]).includes(sort ?? '')
      ? (sort as SortKey)
      : defaultSort,
  };
}

/** Query string for the state, leaving out anything that is at its default. */
export function filtersToQuery(
  state: FilterState,
  defaultSort: SortKey
): URLSearchParams {
  const params = new URLSearchParams();
  if (state.tags.length) {
    params.set('tags', state.tags.join(','));
  }
  if (state.types.length) {
    params.set('type', state.types.join(','));
  }
  if (state.price !== PriceFilter.Any) {
    params.set('price', state.price);
  }
  if (state.sort !== defaultSort) {
    params.set('sort', state.sort);
  }
  return params;
}

export const isFiltering = (state: FilterState): boolean =>
  state.tags.length > 0 ||
  state.types.length > 0 ||
  state.price !== PriceFilter.Any;

export function matchesFilters(tool: Tool, state: FilterState): boolean {
  return (
    state.tags.every(tag => tool.tags.includes(tag)) &&
    (state.types.length === 0 || state.types.includes(tool.type)) &&
    (state.price === PriceFilter.Any || tool.pricing === state.price)
  );
}

export function sortTools(tools: Tool[], sort: SortKey): Tool[] {
  if (sort === SortKey.Match) {
    return tools;
  }
  const sorted = [...tools];
  if (sort === SortKey.Newest) {
    return sorted.sort(
      (a, b) =>
        (b.addedAt ?? '').localeCompare(a.addedAt ?? '') ||
        a.name.localeCompare(b.name)
    );
  }
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

export function toggle<T>(items: T[], item: T): T[] {
  return items.includes(item)
    ? items.filter(x => x !== item)
    : [...items, item];
}
