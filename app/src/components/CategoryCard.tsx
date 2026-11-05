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
      onClick={() => track(AnalyticsEvent.CategoryClick, { category: category.name })}
      className="lift flex min-w-0 flex-col gap-3 rounded-[12px] border border-border bg-surface p-5 text-ink no-underline"
    >
      <span className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-[10px] bg-surface-2 text-[20px]"
        >
          {category.emoji}
        </span>
        <span className="pt-1 font-mono text-[13px] leading-none font-medium text-ink-2">
          {category.toolCount}
          {' '}
          {category.toolCount === 1 ? 'Tool' : 'Tools'}
        </span>
      </span>
      <span className="flex flex-col gap-1.5">
        <span className="text-[18px] font-semibold tracking-[-0.01em]">
          {category.name}
        </span>
        <span className="line-clamp-2 text-[14px] leading-[1.5] text-ink-2">
          {category.description}
        </span>
      </span>
      <span className="mt-auto border-t border-border pt-3 font-mono text-[12px] leading-[1.5] text-ink-3">
        {preview}
        {extra > 0 && (
          <span className="font-medium text-accent-ink">
            {' '}
            +
            {extra}
          </span>
        )}
      </span>
    </Link>
  );
}
