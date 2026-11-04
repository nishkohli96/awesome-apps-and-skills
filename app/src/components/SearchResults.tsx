'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useData, useToolSearch } from '@/lib/data-context';
import { filtersToQuery, matchesFilters, parseFilters, sortTools, toggle } from '@/lib/filters';
import type { FilterState, Tool } from '@/lib/types';
import { PRICINGS, PriceFilter, SortKey, TOOL_TYPES } from '@/types';
import { ToolCard } from './ToolCard';

const label = 'font-mono text-[12px] leading-none font-medium text-ink-3';
const select
  = 'filter-select h-[30px] rounded-[6px] border border-border-strong bg-surface pl-2.5 font-mono text-[12px] leading-none font-medium text-ink';

export function SearchResults() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { tools, categories } = useData();
  const search = useToolSearch();

  const q = (params.get('q') ?? '').trim();
  const defaultSort: SortKey = q ? SortKey.Match : SortKey.Newest;
  const state = useMemo(() => parseFilters(params, defaultSort), [params, defaultSort]);

  const results = useMemo(
    () => sortTools(search(q).filter(tool => matchesFilters(tool, state)), state.sort),
    [search, q, state],
  );

  const update = (next: Partial<FilterState>) => {
    const query = filtersToQuery({ ...state, ...next }, defaultSort);
    if (q) {
      query.set('q', q);
    }
    const qs = query.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const groups = useMemo(() => {
    const order: string[] = [];
    const byCategory = new Map<string, Tool[]>();
    for (const tool of results) {
      if (!byCategory.has(tool.category)) {
        order.push(tool.category);
        byCategory.set(tool.category, []);
      }
      byCategory.get(tool.category)?.push(tool);
    }
    return order.map(slug => ({
      category: categories.find(c => c.slug === slug),
      tools: byCategory.get(slug) ?? [],
    }));
  }, [results, categories]);

  const typesInScope = TOOL_TYPES.filter(type => tools.some(t => t.type === type));
  const allTags = useMemo(() => new Set(tools.flatMap(t => t.tags)), [tools]);

  return (
    <div className="flex flex-col gap-6 rounded-[16px]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="m-0 text-[40px] leading-[1.1] font-semibold tracking-[-0.03em]">
          {q
            ? (
              <>
                Results for
                {' '}
                <span className="font-serif text-[46px] leading-none font-normal tracking-normal italic">
                  “
                  {q}
                  ”
                </span>
              </>
            )
            : (
              'All tools'
            )}
        </h1>
        <span role="status" className="font-mono text-[14px] leading-none font-medium text-ink-2">
          {results.length}
          {' '}
          {results.length === 1 ? 'tool' : 'tools'}
          {' '}
          ·
          {' '}
          {groups.length}
          {' '}
          {groups.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[12px] border border-border bg-surface px-4 py-3.5">
        <div role="group" aria-label="Filter by type" className="flex flex-wrap items-center gap-1.5">
          <span className={`${label} mr-1.5`}>TYPE</span>
          {typesInScope.map(type => {
            const on = state.types.includes(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={on}
                onClick={() => update({ types: toggle(state.types, type) })}
                className={`h-[30px] rounded-[6px] border px-2.5 font-mono text-[12px] leading-none font-medium ${
                  on
                    ? 'border-btn bg-btn text-btn-text'
                    : 'border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        <label className={`flex items-center gap-2 ${label}`}>
          PRICING
          <select
            value={state.price}
            onChange={e => update({ price: e.target.value as FilterState['price'] })}
            className={select}
          >
            <option value={PriceFilter.Any}>Any</option>
            {PRICINGS.map(price => (
              <option key={price} value={price}>
                {price[0].toUpperCase() + price.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className={`ml-auto flex items-center gap-2 ${label}`}>
          SORT
          <select
            value={state.sort}
            onChange={e => update({ sort: e.target.value as SortKey })}
            className={select}
          >
            {q && <option value={SortKey.Match}>Best match</option>}
            <option value={SortKey.AZ}>A–Z</option>
            <option value={SortKey.Newest}>Newest</option>
          </select>
        </label>
      </div>

      {results.length === 0 && (
        <section className="flex flex-col items-start gap-3.5 rounded-[16px] border border-dashed border-border-strong px-[clamp(20px,4vw,48px)] py-12">
          <span className="font-serif text-[40px] leading-[1.05]">
            Nothing for “
            {q}
            ” yet.
          </span>
          <p className="m-0 max-w-[520px] text-[15px] leading-[1.55] text-ink-2">
            Check the spelling, try a broader word like “video” or “seo”, or suggest the tool you
            had in mind.
          </p>
          <Link
            href="/submit"
            className="inline-flex h-10 items-center rounded-[8px] bg-btn px-4 text-[14px] leading-none font-semibold !text-btn-text no-underline"
          >
            Submit a tool
          </Link>
        </section>
      )}

      {groups.map(({ category, tools: groupTools }) => {
        if (!category) {
          return null;
        }
        const exactTag = allTags.has(q.toLowerCase());
        return (
          <section key={category.slug} className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between border-b border-border pb-3">
              <h2 className="m-0 text-[22px] font-semibold">
                <span aria-hidden="true">
                  {category.emoji}
                  {' '}
                </span>
                {category.name}
              </h2>
              <Link
                href={exactTag
                  ? `/${category.slug}?tags=${encodeURIComponent(q.toLowerCase())}`
                  : `/${category.slug}`}
                className="text-[14px] font-medium"
              >
                {exactTag
                  ? `Open ${category.name} filtered by “${q}” →`
                  : `Open ${category.name} →`}
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] items-start gap-5">
              {groupTools.map(tool => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
