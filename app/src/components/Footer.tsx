import Link from 'next/link';
import { CURATOR_URL, REPO_URL } from '@/lib/constants';
import type { Category } from '@/lib/types';
import { ProfileLocation } from '@/types';
import { Logo } from './ui/Logo';
import { ProfileLink } from './ui/ProfileLink';

const link = 'text-[14px] text-ink-2 no-underline hover:text-ink';

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-[clamp(48px,9vw,120px)] border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-10 px-[clamp(24px,3vw,32px)] pt-12 pb-10 max-[760px]:gap-y-7 max-[760px]:pt-8 max-[760px]:pb-8">
        <div className="flex flex-[1_1_260px] items-center gap-3 self-start">
          <Logo size={60} />
          <div className="flex flex-col gap-1">
            <span className="text-[16px] font-semibold">
              Awesome Apps &amp; Skills
            </span>
            <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
              Curated by
              {' '}
              <ProfileLink
                href={CURATOR_URL}
                location={ProfileLocation.Footer}
                profile="curator"
                className="font-medium text-accent-ink"
              >
                Nishant Kohli
              </ProfileLink>
            </p>
          </div>
        </div>
        <nav
          aria-label="Categories"
          className="grid flex-[2_1_420px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] content-start gap-x-6 gap-y-2.5 max-[760px]:gap-y-2"
        >
          {categories.map(category => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className={link}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <nav
          aria-label="Site"
          className="flex flex-[1_1_140px] flex-col gap-2.5"
        >
          <Link href="/about" className={link}>
            About
          </Link>
          <Link href="/suggest-tool" className={link}>
            Submit a tool
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
