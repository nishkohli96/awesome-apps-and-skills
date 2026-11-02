'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFavourites } from '@/lib/favourites';
import { ICON } from '@/lib/constants';
import type { Tool } from '@/lib/types';
import { Icon } from './ui/Icon';
import { PricingPill } from './ui/PricingPill';
import { TagChip } from './ui/TagChip';
import { TypeBadge } from './ui/TypeBadge';

const LONG_DESCRIPTION = 140;
const VISIBLE_TAGS = 3;

interface ToolCardProps {
  tool: Tool;
  /** Tags currently filtering the list; shown as pressed. */
  activeTags?: string[];
  /** When set, tag chips filter in place instead of linking to the tag page. */
  onTagToggle?: (tag: string) => void;
  /** Shows the subcategory label (lists that are not grouped by subcategory). */
  showSubcategory?: boolean;
  sponsored?: boolean;
}

export function ToolCard({
  tool,
  activeTags = [],
  onTagToggle,
  showSubcategory = true,
  sponsored = false,
}: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const { has, toggle } = useFavourites();
  const saved = has(tool.slug);

  const initial = tool.name.replace(/[^A-Za-z]/g, '').charAt(0) || '?';
  const isLong = tool.description.length > LONG_DESCRIPTION;
  const extraTags = tool.tags.length - VISIBLE_TAGS;
  const shownTags = tagsOpen ? tool.tags : tool.tags.slice(0, VISIBLE_TAGS);

  return (
    <article
      className={`lift flex min-w-0 flex-col gap-[14px] rounded-[12px] border border-border p-5 ${
        sponsored ? 'bg-surface-2' : 'bg-surface'
      }`}
    >
      {sponsored && (
        <div className="-mt-1 -mb-0.5 flex items-center justify-between">
          <span className="inline-flex h-[22px] items-center rounded-[6px] border border-dashed border-border-strong px-2 font-mono text-[11px] leading-none font-medium text-ink-2">
            Sponsored
          </span>
          <Link href="/about" className="text-[12px] text-ink-3">
            About sponsors
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-[8px] border border-border bg-surface-2 text-[14px] leading-none font-semibold text-ink-2"
        >
          {initial}
        </span>
        <h3 className="m-0 min-w-0 flex-1 text-[17px] leading-[1.3] font-semibold tracking-[-0.01em]">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink no-underline"
          >
            {tool.name}
          </a>
        </h3>
        {tool.isNew && (
          <span className="inline-flex h-[22px] items-center gap-[5px] rounded-full bg-accent-soft px-2 font-mono text-[11px] leading-none font-semibold text-accent-ink">
            <span className="size-1.5 rounded-full bg-accent" />
            New
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <TypeBadge type={tool.type} />
        {tool.pricing && <PricingPill pricing={tool.pricing} />}
        {showSubcategory && (
          <span className="ml-auto font-mono text-[12px] leading-none text-ink-3">
            {tool.subcategory}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-1">
        <p
          className={`m-0 text-[14.5px] leading-[1.55] text-ink-2 ${expanded ? '' : 'line-clamp-3'}`}
        >
          {tool.description}
        </p>
        {isLong && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(v => !v)}
            className="border-0 bg-transparent p-0 text-[13px] leading-[1.4] font-medium text-accent-ink"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {shownTags.map(tag => (
          <TagChip
            key={tag}
            tag={tag}
            pressed={activeTags.includes(tag)}
            onToggle={onTagToggle ? () => onTagToggle(tag) : undefined}
          />
        ))}
        {extraTags > 0 && (
          <button
            type="button"
            aria-expanded={tagsOpen}
            onClick={() => setTagsOpen(v => !v)}
            className="h-[26px] rounded-[6px] border border-dashed border-border-strong bg-transparent px-2 font-mono text-[12px] leading-none font-medium text-ink-2"
          >
            {tagsOpen ? 'less' : `+${extraTags}`}
          </button>
        )}
      </div>

      <footer className="flex items-center justify-between border-t border-border pt-3">
        {saved
          ? (
            <button
              type="button"
              aria-pressed="true"
              aria-label={`Remove ${tool.name} from favourites`}
              onClick={() => toggle(tool.slug)}
              className="-ml-2 inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border-0 bg-accent-soft pr-2.5 pl-2 text-[13px] leading-none font-medium text-accent-ink"
            >
              <Icon d={ICON.heart} size={17} filled />
              Saved
            </button>
          )
          : (
            <button
              type="button"
              aria-pressed="false"
              aria-label={`Add ${tool.name} to favourites`}
              onClick={() => toggle(tool.slug)}
              className="-ml-2 grid size-[34px] place-items-center rounded-[8px] border-0 bg-transparent text-ink-2 hover:text-ink"
            >
              <Icon d={ICON.heart} size={18} />
            </button>
          )}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] pr-1 pl-2.5 text-[14px] leading-none font-medium text-ink no-underline"
        >
          Visit
          <Icon d={ICON.out} />
          <span className="sr-only">(opens in new tab)</span>
        </a>
        {tool.addedBy && !sponsored && (
          <span className="ml-auto inline-flex min-w-0 items-center gap-1.5 pl-2 text-[13px] text-ink-3">
            Added by
            {tool.addedBy.login
              ? (
                <a
                  href={`https://github.com/${tool.addedBy.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tool.addedBy.login} on GitHub (opens in new tab)`}
                  className="truncate font-medium text-ink-2 underline underline-offset-[3px]"
                >
                  @
                  {tool.addedBy.login}
                </a>
              )
              : (
                <span className="truncate font-medium text-ink-2">
                  {tool.addedBy.name}
                </span>
              )}
          </span>
        )}
      </footer>
    </article>
  );
}
