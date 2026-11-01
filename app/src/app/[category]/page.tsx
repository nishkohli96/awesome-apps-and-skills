import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Listing } from '@/components/Listing';
import { PageHeader } from '@/components/PageHeader';
import { getCategories, getCategory, getToolsInCategory } from '@/lib/data';

type Props = { params: Promise<{ category: string }> };

/** Categories this small get a "young shelf" panel instead of an empty-looking page. */
const SPARSE_AT = 3;
const NEARBY = 3;

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map(category => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) {
    notFound();
  }

  const tools = getToolsInCategory(category.slug);
  const nearby = getCategories()
    .filter(other => other.slug !== category.slug)
    .slice(0, NEARBY);

  const sparse = tools.length <= SPARSE_AT && (
    <section className="flex flex-wrap items-stretch gap-6">
      <div className="flex flex-[1_1_320px] flex-col gap-3 rounded-[16px] border border-dashed border-border-strong p-7">
        <span className="font-serif text-[32px] leading-[1.1]">A young shelf.</span>
        <p className="m-0 text-[15px] leading-[1.55] text-ink-2">
          We only list what we would use ourselves, so this one is still filling up. Know a tool
          that belongs here?
        </p>
        <Link
          href="/submit"
          className="mt-1 inline-flex h-10 items-center self-start rounded-[8px] bg-btn px-4 text-[14px] leading-none font-semibold !text-btn-text no-underline"
        >
          Submit a tool
        </Link>
      </div>
      <div className="flex flex-[1_1_320px] flex-col gap-1 rounded-[16px] border border-border bg-surface px-6 py-5">
        <span className="py-2 font-mono text-[12px] leading-none font-medium text-ink-3">
          NEARBY SHELVES
        </span>
        {nearby.map((other, index) => (
          <Link
            key={other.slug}
            href={`/${other.slug}`}
            className={`flex justify-between py-3 font-medium text-ink no-underline ${
              index < nearby.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <span>
              <span aria-hidden="true">
                {other.emoji}
                {' '}
              </span>
              {other.name}
            </span>
            <span className="font-mono text-[13px] leading-none text-ink-3">
              {other.toolCount}
              {' '}
              tools
            </span>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[clamp(16px,3vw,24px)] pb-24"
    >
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]}
        mark={category.emoji}
        title={category.name}
        meta={`${category.toolCount} ${category.toolCount === 1 ? 'tool' : 'tools'} · ${category.subcategories.length} ${
          category.subcategories.length === 1 ? 'subcategory' : 'subcategories'
        }`}
        description={category.description}
      />
      <Suspense fallback={null}>
        <Listing
          basePath={`/${category.slug}`}
          tools={tools}
          groupBy="subcategory"
          groups={category.subcategories.map(name => ({ key: name, label: name }))}
          footer={sparse || undefined}
        />
      </Suspense>
    </main>
  );
}
