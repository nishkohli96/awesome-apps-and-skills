'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { Category } from '@/lib/types';
import { AnalyticsEvent } from '@/types';

export function CategoryCard({ category }: { category: Category }) {
  const subs = category.subcategories;
  const preview = subs.slice(0, 2).join(' · ');
  const extra = subs.length - 2;
  return (
    <Link
      href={`/${category.slug}`}
      onClick={() =>
        track(AnalyticsEvent.CategoryClick, { category: category.name })
      }
      className="lift border-border bg-surface text-ink flex min-w-0 flex-col gap-3 rounded-[12px] border p-5 no-underline"
    >
      <span className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="bg-surface-2 grid size-10 place-items-center rounded-[10px] text-[20px]"
        >
          {category.emoji}
        </span>
        <span className="text-ink-2 pt-1 font-mono text-[13px] leading-none font-medium">
          {category.toolCount} {category.toolCount === 1 ? 'Tool' : 'Tools'}
        </span>
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="text-[18px] font-semibold tracking-[-0.01em]">
          {category.name}
        </span>
        <span className="text-ink-2 line-clamp-2 text-[14px] leading-[1.5]">
          {category.description}
        </span>
      </span>
      <span className="border-border text-ink-3 mt-auto border-t pt-3 font-mono text-[12px] leading-[1.5]">
        {preview}
        {extra > 0 && (
          <span className="text-accent-ink font-medium"> +{extra}</span>
        )}
      </span>
    </Link>
  );
}
