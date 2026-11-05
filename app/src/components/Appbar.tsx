'use client';

import { SearchVariant } from '@/types';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ICON, REPO_URL } from '@/constants';
import { useFavourites } from '@/lib/favourites';
import { MobileMenu } from './MobileMenu';
import { SearchCommand } from './search/SearchCommand';
import { MobileSearch } from './search/MobileSearch';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './ui/Logo';
import { Icon } from './ui/Icon';

const navLink
  = 'inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[14px] leading-none font-medium text-ink no-underline hover:bg-surface-2';

export function Appbar() {
  const { slugs } = useFavourites();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openMobileSearch = useCallback(() => setSearchOpen(true), []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg backdrop-blur-[8px]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-5 px-[clamp(24px,3vw,32px)]">
        <Link
          href="/"
          className="mr-auto flex shrink-0 items-center gap-2.5 text-ink no-underline max-[760px]:gap-2"
        >
          <Logo />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            Awesome Apps &amp; Skills
          </span>
        </Link>

        <SearchCommand
          variant={SearchVariant.Appbar}
          shortcuts
          onShortcutFallback={openMobileSearch}
        />

        <nav
          aria-label="Primary"
          className="flex shrink-0 items-center gap-0.5 max-[760px]:hidden"
        >
          <Link
            href="/favourites"
            aria-label={`Favourites, ${slugs.length} saved`}
            className={navLink}
          >
            <Icon d={ICON.heart} />
            <span className="font-mono text-[12px]">
              {slugs.length}
            </span>
          </Link>
          <Link href="/suggest-tool" className={navLink}>
            Contribute
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-border px-2.5 text-[13px] leading-none font-medium text-ink no-underline hover:bg-surface-2"
          >
            <Icon d={ICON.star} size={15} />
            Star
            <span className="sr-only">on GitHub (opens in new tab)</span>
          </a>
          <ThemeToggle />
        </nav>

        <div className="hidden items-center max-[760px]:flex">
          <button
            type="button"
            aria-label="Search"
            onClick={openMobileSearch}
            className="grid size-11 place-items-center rounded-[8px] border-0 bg-transparent text-ink"
          >
            <Icon d={ICON.search} size={20} />
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className="-mr-[15px] grid size-11 place-items-center rounded-[8px] border-0 bg-transparent text-ink"
          >
            <Icon d={ICON.menu} size={20} />
          </button>
        </div>
      </div>
      <MobileSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
