'use client';

import Link from 'next/link';
import { ICON } from '@/constants';
import { useData } from '@/lib/data-context';
import { useFavourites } from '@/lib/favourites';
import { Icon } from './ui/Icon';
import { ToolCard } from './ToolCard';

export function FavouritesList() {
  const { tools, categories } = useData();
  const { slugs } = useFavourites();
  const saved = tools.filter(tool => slugs.includes(tool.slug));
  const media = categories[0];

  if (saved.length === 0) {
    return (
      <section className="flex flex-col gap-4 py-12">
        <span
          aria-hidden="true"
          className="grid size-14 place-items-center rounded-[14px] border border-dashed border-border-strong text-accent-ink"
        >
          <Icon
            d={ICON.heart}
            size={26}
            strokeWidth={1.5}
          />
        </span>
        <h1 className="m-0 font-serif text-[44px] leading-[1.02] font-normal">
          Nothing saved yet.
        </h1>
        <p className="m-0 max-w-[420px] text-[15px] leading-[1.55] text-ink-2">
          Tap the heart on any card to keep it here. Favourites stay in this browser; no account
          needed.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/#new"
            className="inline-flex h-10 items-center rounded-[8px] bg-btn px-4 text-[14px] leading-none font-semibold !text-btn-text no-underline"
          >
            See what’s new
          </Link>
          {media && (
            <Link
              href={`/${media.slug}`}
              className="inline-flex h-10 items-center rounded-[8px] border border-border-strong px-4 text-[14px] leading-none font-medium text-ink no-underline"
            >
              Browse
              {' '}
              {media.name}
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
        <h1 className="m-0 font-serif text-[44px] leading-[1.02] font-normal">
          Your favourites
        </h1>
        <span className="font-mono text-[14px] leading-none font-medium text-ink-2">
          {saved.length}
          {' '}
          saved · stored in this browser
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] items-start gap-5">
        {saved.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
