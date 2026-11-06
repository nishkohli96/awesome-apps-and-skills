'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Fuse from 'fuse.js';
import { ICON } from '@/constants';
import { useData } from '@/lib/data-context';
import { Icon } from './ui/Icon';

/** Search box for the 404 page, plus a "did you mean" taken from the broken URL. */
export function NotFoundSearch() {
  const pathname = usePathname();
  const { tools, categories } = useData();
  const last = pathname.split('/').filter(Boolean).pop() ?? '';
  let guess = last;
  try {
    guess = decodeURIComponent(last);
  } catch {
    // Malformed %-encoding in the URL: use the raw text.
  }

  const suggestion = useMemo(() => {
    if (!guess) {
      return null;
    }
    const tags = [...new Set(tools.flatMap(t => t.tags))];
    const hit = new Fuse(tags, { threshold: 0.4 }).search(guess)[0]?.item;
    if (hit) {
      return { href: `/tag/${encodeURIComponent(hit)}`, label: `#${hit}` };
    }
    const category = new Fuse(categories, {
      keys: ['name', 'slug'],
      threshold: 0.4,
    }).search(guess)[0]?.item;
    return category
      ? { href: `/${category.slug}`, label: category.name }
      : null;
  }, [guess, tools, categories]);

  return (
    <>
      <form
        action="/search"
        role="search"
        className="border-border-strong bg-surface text-ink-3 focus-within:border-accent focus-within:ring-accent/35 flex h-12 max-w-[460px] items-center gap-2.5 rounded-[10px] border px-3.5 focus-within:ring-2"
      >
        <Icon d={ICON.search} size={18} />
        <input
          type="search"
          name="q"
          defaultValue={guess}
          aria-label="Search"
          className="text-ink min-w-0 flex-1 border-0 bg-transparent text-[16px] leading-none outline-none focus-visible:!outline-none"
        />
      </form>
      <p className="text-ink-2 m-0 text-[14px]">
        {suggestion && (
          <>
            Did you mean{' '}
            <Link href={suggestion.href} className="font-medium">
              {suggestion.label}
            </Link>
            ? Or{' '}
          </>
        )}
        {suggestion ? '' : 'Or '}
        <Link href="/" className="font-medium">
          go home
        </Link>
        .
      </p>
    </>
  );
}
