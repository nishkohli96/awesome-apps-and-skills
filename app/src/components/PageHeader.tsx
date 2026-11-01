import Link from 'next/link';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  crumbs: { label: string; href?: string }[];
  /** Emoji (or short mark) shown in the rounded tile. */
  mark: string;
  title: string;
  meta: string;
  description: ReactNode;
}

/** Header shared by category, tag and type pages. */
export function PageHeader({ crumbs, mark, title, meta, description }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-4 pt-10">
      <nav aria-label="Breadcrumb" className="flex gap-2 text-[14px] text-ink-3">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label} className="flex gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {crumb.href
              ? (
                <Link href={crumb.href} className="text-ink-2 no-underline hover:text-ink">
                  {crumb.label}
                </Link>
              )
              : (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              )}
          </span>
        ))}
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-[14px] border border-border bg-surface-2 text-[28px]"
          >
            {mark}
          </span>
          <h1 className="m-0 text-[clamp(34px,5vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {title}
          </h1>
        </div>
        <span className="font-mono text-[14px] leading-none font-medium text-ink-2">
          {meta}
        </span>
      </div>
      <p className="m-0 max-w-[640px] text-[17px] leading-[1.55] text-ink-2">
        {description}
      </p>
    </section>
  );
}
