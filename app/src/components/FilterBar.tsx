'use client';

import { useState } from 'react';
import { TYPE_META } from '@/constants';
import { toggle } from '@/lib/filters';
import type { FilterState } from '@/lib/types';
import {
  PRICINGS,
  PriceFilter,
  type Pricing,
  type SortKey,
  type ToolType
} from '@/types';
import { Icon } from './ui/Icon';

const VISIBLE_TAGS = 8;
const label = 'font-mono text-[12px] leading-none font-medium text-ink-3';
const chip
  = 'inline-flex h-[30px] shrink-0 items-center gap-1.5 rounded-[6px] border px-2.5 font-mono text-[12px] leading-none font-medium';
const chipOn = 'border-btn bg-btn text-btn-text';
const chipOff = 'border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink';
const select
  = 'filter-select h-[30px] rounded-[6px] border border-border-strong bg-surface pl-2.5 font-mono text-[12px] leading-none font-medium text-ink';

interface FilterBarProps {
  state: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  /** Every tag in scope with its tool count, most used first. */
  tags: [string, number][];
  /** Types present in scope; hidden when empty. */
  types: ToolType[];
  sortOptions: { value: SortKey; label: string }[];
}

export function FilterBar({
  state,
  onChange,
  tags,
  types,
  sortOptions
}: FilterBarProps) {
  const [showAll, setShowAll] = useState(false);

  const counts = new Map(tags);
  const visible = (showAll ? tags : tags.slice(0, VISIBLE_TAGS)).map(([tag]) => tag);
  // A selected tag stays visible even when it would be folded away.
  const bar = [...visible, ...state.tags.filter(tag => !visible.includes(tag))];

  return (
    <section
      aria-label="Filters"
      className="flex flex-col gap-3.5 rounded-[12px] border border-border bg-surface p-4"
    >
      {tags.length > 0 && (
        <div className="flex min-w-0 items-center gap-3">
          <span className={`shrink-0 ${label}`}>TAGS</span>
          <div
            role="group"
            aria-label="Filter by tag"
            className={`flex min-w-0 flex-1 gap-1.5 ${
              showAll ? 'flex-wrap' : 'flex-nowrap overflow-x-auto pb-2'
            }`}
          >
            {bar.map(tag => {
              const on = state.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ tags: toggle(state.tags, tag) })}
                  className={`${chip} ${on ? chipOn : chipOff}`}
                >
                  {tag}
                  <span className="opacity-70">
                    {counts.get(tag) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          {tags.length > VISIBLE_TAGS && (
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll(v => !v)}
              className="h-[30px] shrink-0 rounded-[6px] border-0 bg-transparent px-2.5 text-[13px] leading-none font-medium text-accent-ink"
            >
              {showAll ? 'Fewer tags' : `Show all ${tags.length} tags`}
            </button>
          )}
        </div>
      )}

      <div
        className={`flex flex-wrap items-start gap-x-5 gap-y-3 ${
          tags.length > 0 ? 'border-t border-border pt-3.5' : ''
        }`}
      >
        {types.length > 1 && (
          <div role="group" aria-label="Filter by type" className="flex min-w-0 flex-[1_1_240px] items-start gap-3">
            <span className={`${label} flex h-[30px] shrink-0 items-center`}>TYPE</span>
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {types.map(type => {
                const on = state.types.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onChange({ types: toggle(state.types, type) })}
                    className={`${chip} ${on ? chipOn : chipOff}`}
                  >
                    <Icon d={TYPE_META[type].icon} size={12} strokeWidth={2} />
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <label className={`flex shrink-0 items-center gap-2 ${label}`}>
          PRICING
          <select
            value={state.price}
            onChange={e => {
              onChange({ price: e.target.value as Pricing | PriceFilter });
              e.target.blur();
            }}
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
        <label className={`ml-auto flex shrink-0 items-center gap-2 ${label}`}>
          SORT
          <select
            value={state.sort}
            onChange={e => {
              onChange({ sort: e.target.value as SortKey });
              e.target.blur();
            }}
            className={select}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
