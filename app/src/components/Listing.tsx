'use client';

import { useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import {
  filtersToQuery,
  isFiltering,
  matchesFilters,
  sortTools,
  toggle
} from '@/lib/filters';
import type { Tool } from '@/lib/types';
import { GroupBy, SortKey, TOOL_TYPES } from '@/types';
import { FilterBar } from './FilterBar';
import { ToolCard } from './ToolCard';
import { useUrlFilters } from './useUrlFilters';

export interface ListingGroup {
  /** Matches `tool.subcategory` or `tool.category`, depending on `groupBy`. */
  key: string;
  label: string;
  emoji?: string;
}

interface ListingProps {
  basePath: string;
  /** Everything in scope, already limited by the page (category, tag or type). */
  tools: Tool[];
  groupBy: GroupBy;
  groups: ListingGroup[];
  /** A tag the page itself is about; left out of the tag bar. */
  lockedTag?: string;
  /** A type the page itself is about; the type filter is hidden. */
  lockedType?: string;
  /** Shown below the list while no filter is active (sparse categories). */
  footer?: ReactNode;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function Listing({
  basePath,
  tools,
  groupBy,
  groups,
  lockedTag,
  lockedType,
  footer,
}: ListingProps) {
  const { state, update, clear, defaultSort } = useUrlFilters(SortKey.AZ);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    tools.forEach(t => t.tags.forEach(g => counts.set(g, (counts.get(g) ?? 0) + 1)));
    return [...counts]
      .filter(([tag]) => tag !== lockedTag)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [tools, lockedTag]);

  const types = lockedType ? [] : TOOL_TYPES.filter(type => tools.some(t => t.type === type));
  const filtering = isFiltering(state);
  const matched = useMemo(
    () => sortTools(tools.filter(t => matchesFilters(t, state)), state.sort),
    [tools, state],
  );
  const isEmpty = filtering && matched.length === 0;

  // With filters on, a group with no hits is left out of both the list and the side nav.
  const sections = groups.flatMap((group, index) => {
    const own = (t: Tool) => (groupBy === GroupBy.Subcategory ? t.subcategory : t.category) === group.key;
    const all = tools.filter(own).length;
    const hits = matched.filter(own);
    return filtering && hits.length === 0 ? [] : [{ ...group, id: `group-${index}`, all, hits }];
  });

  const toggleTag = (tag: string) => update({ tags: toggle(state.tags, tag) });

  return (
    <>
      <FilterBar
        state={state}
        onChange={update}
        tags={tags}
        types={types}
        sortOptions={[
          { value: SortKey.AZ, label: 'A–Z' },
          { value: SortKey.Newest, label: 'Newest' },
        ]}
      />

      <div
        role="status"
        aria-live="polite"
        className="flex min-h-8 flex-wrap items-center gap-3"
      >
        <strong className="text-[15px]">
          {filtering
            ? `${matched.length} ${matched.length === 1 ? 'tool matches' : 'tools match'}`
            : plural(tools.length, 'Tool', 'Tools')}
        </strong>
        {filtering && (
          <button
            type="button"
            onClick={clear}
            className="h-8 rounded-[8px] border border-border-strong bg-surface px-3 text-[13px] leading-none font-medium text-ink"
          >
            Clear filters
          </button>
        )}
      </div>

      <div
        id="results"
        className="flex flex-wrap items-start gap-10"
      >
        <nav
          aria-label={groupBy === GroupBy.Subcategory ? 'Subcategories' : 'Categories'}
          className="sticky top-24 flex max-w-[220px] flex-[1_1_200px] flex-col gap-0.5 self-start max-[760px]:hidden"
        >
          <span className="px-2.5 pb-2.5 font-mono text-[12px] leading-none font-medium text-ink-3">
            ON THIS PAGE
          </span>
          {(isEmpty ? [] : sections).map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex justify-between gap-2 rounded-[8px] px-2.5 py-2 text-[14px] font-medium text-ink no-underline hover:bg-surface-2"
            >
              <span>
                {section.emoji && (
                  <span aria-hidden="true">
                    {section.emoji}
                    {' '}
                  </span>
                )}
                {section.label}
              </span>
              <span className="font-mono text-[12px] leading-none font-medium text-ink-3">
                {filtering ? section.hits.length : section.all}
              </span>
            </a>
          ))}
        </nav>
        <label className="hidden flex-[1_1_100%] flex-col gap-1.5 text-[13px] text-ink-2 max-[760px]:flex">
          Jump to
          {' '}
          {groupBy === GroupBy.Subcategory ? 'subcategory' : 'category'}
          <select
            defaultValue=""
            onChange={event => {
              if (event.target.value) {
                window.location.hash = event.target.value;
              }
            }}
            className="filter-select h-11 rounded-[8px] border border-border-strong bg-surface px-2.5 text-[15px] leading-none text-ink"
          >
            <option value="" disabled>
              Choose…
            </option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
          {isEmpty && (
            <section
              aria-label="No results"
              className="flex flex-col items-start gap-3.5 rounded-[16px] border border-dashed border-border-strong px-[clamp(20px,4vw,48px)] py-12"
            >
              <span className="font-serif text-[40px] leading-[1.05]">
                Nothing matches all of those.
              </span>
              <p className="m-0 max-w-[520px] text-[15px] leading-[1.55] text-ink-2">
                Tags combine with AND. Remove one to widen the list, or tell us about a tool that
                should be here.
              </p>
              <div className="flex flex-wrap gap-2">
                {state.tags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-border-strong bg-surface px-2.5 font-mono text-[12px] leading-none font-medium text-ink"
                  >
                    Remove
                    {' '}
                    {tag}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12 M18 6L6 18" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={clear}
                  className="h-10 rounded-[8px] border-0 bg-btn px-4 text-[14px] leading-none font-semibold text-btn-text"
                >
                  Clear filters
                </button>
                <Link
                  href="/suggest-tool"
                  className="inline-flex h-10 items-center rounded-[8px] border border-border-strong px-4 text-[14px] leading-none font-medium text-ink no-underline"
                >
                  Submit a tool
                </Link>
              </div>
            </section>
          )}

          {!isEmpty
            && sections.map(section => (
              <section
                key={section.id}
                id={section.id}
                className="flex scroll-mt-24 flex-col gap-4"
              >
                <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                  <h2 className="m-0 text-[22px] font-semibold tracking-[-0.015em]">
                    {section.emoji && (
                      <span aria-hidden="true">
                        {section.emoji}
                        {' '}
                      </span>
                    )}
                    {section.label}
                  </h2>
                  <span className="font-mono text-[13px] leading-none font-medium text-ink-3">
                    {filtering
                      ? plural(section.hits.length, 'match', 'matches')
                      : plural(section.all, 'tool', 'tools')}
                  </span>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-5">
                  {section.hits.map(tool => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      activeTags={state.tags}
                      onTagToggle={toggleTag}
                      showSubcategory={groupBy === GroupBy.Category}
                    />
                  ))}
                </div>
              </section>
            ))}

          {!filtering && footer}
        </div>
      </div>
    </>
  );
}
