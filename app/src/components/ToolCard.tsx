'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toolClickData, track } from '@/lib/analytics';
import { useFavourites } from '@/lib/favourites';
import { ICON } from '@/constants';
import type { Tool } from '@/lib/types';
import { AnalyticsEvent, ProfileLocation, ToolClickSource } from '@/types';
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
  hideNewBadge?: boolean;
  sponsored?: boolean;
}

export function ToolCard({
  tool,
  activeTags = [],
  onTagToggle,
  showSubcategory = true,
  hideNewBadge = false,
  sponsored = false,
}: ToolCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const { has, toggle } = useFavourites();
  const saved = has(tool.slug);

  const isLong = tool.description.length > LONG_DESCRIPTION;
  const extraTags = tool.tags.length - VISIBLE_TAGS;
  const trackClick = () =>
    track(AnalyticsEvent.ToolClick, toolClickData(tool, ToolClickSource.Card));
  const shownTags = tagsOpen ? tool.tags : tool.tags.slice(0, VISIBLE_TAGS);

  return (
    <article
      className={`lift border-border flex min-w-0 flex-col gap-[14px] rounded-[12px] border p-5 ${
        sponsored ? 'bg-surface-2' : 'bg-surface'
      }`}
    >
      {sponsored && (
        <div className="-mt-1 -mb-0.5 flex items-center justify-between">
          <span className="border-border-strong text-ink-2 inline-flex h-[22px] items-center rounded-[6px] border border-dashed px-2 font-mono text-[11px] leading-none font-medium">
            Sponsored
          </span>
          <Link href="/about" className="text-ink-3 text-[12px]">
            About sponsors
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3">
        <h3 className="m-0 min-w-0 flex-1 text-[17px] leading-[1.3] font-semibold tracking-[-0.01em]">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink no-underline"
            onClick={trackClick}
          >
            {tool.name}
          </a>
        </h3>
        {tool.isNew && !hideNewBadge && (
          <span className="bg-accent-soft text-accent-ink inline-flex h-[22px] items-center gap-[5px] rounded-full px-2 font-mono text-[11px] leading-none font-semibold">
            <span className="bg-accent size-1.5 rounded-full" />
            New
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <TypeBadge type={tool.type} />
        {tool.pricing && <PricingPill pricing={tool.pricing} />}
        {showSubcategory && (
          <span className="text-ink-3 ml-auto font-mono text-[12px] leading-none">
            {tool.subcategory}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-1">
        <p
          className={`text-ink-2 m-0 text-[14.5px] leading-[1.55] ${expanded ? '' : 'line-clamp-3'}`}
        >
          {tool.description}
        </p>
        {isLong && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(v => !v)}
            className="text-accent-ink border-0 bg-transparent p-0 text-[13px] leading-[1.4] font-medium"
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
            className="border-accent-ink/60 text-accent-ink inline-flex h-[26px] items-center rounded-[6px] border bg-transparent px-2 font-mono text-[12px] leading-none font-medium"
          >
            {tagsOpen ? 'less' : `+${extraTags}`}
          </button>
        )}
      </div>

      <footer className="border-border flex items-center justify-between border-t pt-3">
        {saved ? (
          <button
            type="button"
            aria-pressed="true"
            aria-label={`Remove ${tool.name} from favourites`}
            onClick={() => toggle(tool.slug)}
            className="bg-accent-soft text-accent-ink -ml-2 inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border-0 pr-2.5 pl-2 text-[13px] leading-none font-medium"
          >
            <Icon d={ICON.heart} size={17} filled />
            Saved
          </button>
        ) : (
          <button
            type="button"
            aria-pressed="false"
            aria-label={`Add ${tool.name} to favourites`}
            onClick={() => toggle(tool.slug)}
            className="text-ink-2 hover:text-ink -ml-2 grid size-[34px] place-items-center rounded-[8px] border-0 bg-transparent"
          >
            <Icon d={ICON.heart} size={18} />
          </button>
        )}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick}
          className="text-ink inline-flex h-[34px] items-center gap-1.5 rounded-[8px] pr-1 pl-2.5 text-[14px] leading-none font-medium no-underline"
        >
          Visit
          <Icon d={ICON.out} />
          <span className="sr-only">(opens in new tab)</span>
        </a>
        {tool.addedBy && !sponsored && (
          <span className="text-ink-3 ml-auto inline-flex min-w-0 items-center gap-1.5 pl-2 text-[13px]">
            Added by
            {tool.addedBy.login ? (
              <a
                href={`https://github.com/${tool.addedBy.login}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track(AnalyticsEvent.ProfileClick, {
                    location: ProfileLocation.ToolCard,
                    profile: tool.addedBy?.login ?? '',
                  })
                }
                aria-label={`${tool.addedBy.login} on GitHub (opens in new tab)`}
                className="text-ink-2 truncate font-medium underline underline-offset-[3px]"
              >
                @{tool.addedBy.login}
              </a>
            ) : (
              <span className="text-ink-2 truncate font-medium">
                {tool.addedBy.name}
              </span>
            )}
          </span>
        )}
      </footer>
    </article>
  );
}
