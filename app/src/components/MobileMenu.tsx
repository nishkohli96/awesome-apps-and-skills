'use client';

import { ThemeToggleVariant } from '@/types';
import Link from 'next/link';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ICON, REPO_URL } from '@/lib/constants';
import { useData } from '@/lib/data-context';
import { useFavourites } from '@/lib/favourites';
import { Icon } from './ui/Icon';
import { ThemeToggle } from './ThemeToggle';

const FEATURED_CATEGORIES = 4;
const row
  = 'flex h-[52px] items-center justify-between px-3 text-[17px] font-medium text-ink no-underline';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const { categories } = useData();
  const { slugs } = useFavourites();
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="inset-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto rounded-none bg-bg p-0 ring-0 sm:max-w-none"
      >
        <header className="flex h-14 shrink-0 items-center border-b border-border pr-1.5 pl-6">
          <DialogTitle className="m-0 mr-auto text-[15px] font-semibold">
            Menu
          </DialogTitle>
          <DialogClose
            aria-label="Close menu"
            className="grid size-11 place-items-center border-0 bg-transparent text-ink"
          >
            <Icon d={ICON.close} size={20} />
          </DialogClose>
        </header>

        <nav aria-label="Mobile" className="flex flex-col px-3 pt-2 pb-4">
          <Link href="/#new" onClick={close} className={row}>
            New this week
          </Link>
          <Link href="/favourites" onClick={close} className={row}>
            Favourites
            <span className="font-mono text-[13px] leading-none text-ink-3">
              {slugs.length}
            </span>
          </Link>
          <Link href="/submit" onClick={close} className={row}>
            Submit a tool
          </Link>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={row}>
            Star on GitHub
          </a>
        </nav>

        <div className="flex items-center justify-between border-y border-border px-6 py-4">
          <span className="text-[15px] text-ink-2">Theme</span>
          <ThemeToggle variant={ThemeToggleVariant.Labels} />
        </div>

        <div className="flex flex-col gap-1.5 p-6">
          <span className="pb-1.5 font-mono text-[12px] leading-none font-medium text-ink-3">
            CATEGORIES
          </span>
          {categories.slice(0, FEATURED_CATEGORIES).map(category => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              onClick={close}
              className="flex h-11 items-center justify-between text-[15px] text-ink no-underline"
            >
              {category.name}
              <span className="font-mono text-[12px] leading-none text-ink-3">
                {category.toolCount}
              </span>
            </Link>
          ))}
          <Link
            href="/#categories"
            onClick={close}
            className="flex h-11 items-center text-[15px] font-medium no-underline"
          >
            All
            {' '}
            {categories.length}
            {' '}
            categories →
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
