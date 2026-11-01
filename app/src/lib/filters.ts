import { PRICINGS, TOOL_TYPES } from './types';
import type { FilterState, Pricing, SortKey, Tool, ToolType } from './types';

type Params = Pick<URLSearchParams, 'get'>;

const list = (value: string | null): string[] =>
  value ? value.split(',').filter(Boolean) : [];

export function parseFilters(params: Params, defaultSort: SortKey): FilterState {
  const price = params.get('price');
  const sort = params.get('sort');
  return {
    tags: list(params.get('tags')),
    types: list(params.get('type')).filter((t): t is ToolType =>
      (TOOL_TYPES as readonly string[]).includes(t),),
    price: (PRICINGS as readonly string[]).includes(price ?? '') ? (price as Pricing) : 'any',
    sort: sort === 'az' || sort === 'new' || sort === 'match' ? sort : defaultSort,
  };
}

/** Query string for the state, leaving out anything that is at its default. */
export function filtersToQuery(state: FilterState, defaultSort: SortKey): URLSearchParams {
  const params = new URLSearchParams();
  if (state.tags.length) {
    params.set('tags', state.tags.join(','));
  }
  if (state.types.length) {
    params.set('type', state.types.join(','));
  }
  if (state.price !== 'any') {
    params.set('price', state.price);
  }
  if (state.sort !== defaultSort) {
    params.set('sort', state.sort);
  }
  return params;
}

export const isFiltering = (state: FilterState): boolean =>
  state.tags.length > 0 || state.types.length > 0 || state.price !== 'any';

export function matchesFilters(tool: Tool, state: FilterState): boolean {
  return (
    state.tags.every(tag => tool.tags.includes(tag))
    && (state.types.length === 0 || state.types.includes(tool.type))
    && (state.price === 'any' || tool.pricing === state.price)
  );
}

export function sortTools(tools: Tool[], sort: SortKey): Tool[] {
  if (sort === 'match') {
    return tools;
  }
  const sorted = [...tools];
  if (sort === 'new') {
    return sorted.sort(
      (a, b) =>
        (b.addedAt ?? '').localeCompare(a.addedAt ?? '') || a.name.localeCompare(b.name),
    );
  }
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

export function toggle<T>(items: T[], item: T): T[] {
  return items.includes(item) ? items.filter(x => x !== item) : [...items, item];
}
