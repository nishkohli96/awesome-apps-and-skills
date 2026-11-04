import Link from 'next/link';
import { REPO_URL } from '@/lib/constants';
import type { Category } from '@/lib/types';
import { Logo } from './ui/Logo';

const link = 'text-[14px] text-ink-2 no-underline hover:text-ink';

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-[clamp(72px,9vw,120px)] border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-10 px-[clamp(24px,3vw,32px)] pt-12 pb-10">
        <div className="flex flex-[1_1_260px] flex-col gap-3">
          <span className="flex items-center gap-2.5">
            <Logo />
            <span className="text-[15px] font-semibold">
              Awesome Apps &amp; Skills
            </span>
          </span>
          <p className="m-0 max-w-[300px] text-[14px] leading-[1.55] text-ink-2">
            Curated by hand. Every link goes to the tool itself.
          </p>
        </div>
        <nav
          aria-label="Categories"
          className="grid flex-[2_1_420px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] content-start gap-x-6 gap-y-2.5"
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
          <Link href="/submit" className={link}>
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
