import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Listing } from '@/components/Listing';
import { PageHeader } from '@/components/PageHeader';
import { getCategories, getCategory, getToolsInCategory } from '@/lib/data';
import { GroupBy } from '@/types';

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
  return category
    ? { title: category.name, description: category.description }
    : {};
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
      <div className="border-border-strong flex flex-[1_1_320px] flex-col gap-3 rounded-[16px] border border-dashed p-7">
        <span className="font-serif text-[32px] leading-[1.1]">
          A young shelf.
        </span>
        <p className="text-ink-2 m-0 text-[15px] leading-[1.55]">
          We only list what we would use ourselves, so this one is still filling
          up. Know a tool that belongs here?
        </p>
        <Link
          href="/suggest-tool"
          className="bg-btn !text-btn-text mt-1 inline-flex h-10 items-center self-start rounded-[8px] px-4 text-[14px] leading-none font-semibold no-underline"
        >
          Submit a tool
        </Link>
      </div>
      <div className="border-border bg-surface flex flex-[1_1_320px] flex-col gap-1 rounded-[16px] border px-6 py-5">
        <span className="text-ink-3 py-2 font-mono text-[12px] leading-none font-medium">
          NEARBY SHELVES
        </span>
        {nearby.map((other, index) => (
          <Link
            key={other.slug}
            href={`/${other.slug}`}
            className={`text-ink flex justify-between py-3 font-medium no-underline ${
              index < nearby.length - 1 ? 'border-border border-b' : ''
            }`}
          >
            <span>
              <span aria-hidden="true">{other.emoji} </span>
              {other.name}
            </span>
            <span className="text-ink-3 font-mono text-[13px] leading-none">
              {other.toolCount} {other.toolCount === 1 ? 'Tool' : 'Tools'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[clamp(24px,3vw,32px)] pb-24"
    >
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: category.name }]}
        mark={category.emoji}
        title={category.name}
        meta={`${category.toolCount} ${category.toolCount === 1 ? 'Tool' : 'Tools'} | ${category.subcategories.length} ${
          category.subcategories.length === 1 ? 'Subcategory' : 'Subcategories'
        }`}
        description={category.description}
      />
      <Suspense fallback={null}>
        <Listing
          basePath={`/${category.slug}`}
          tools={tools}
          groupBy={GroupBy.Subcategory}
          groups={category.subcategories.map(name => ({
            key: name,
            label: name,
          }))}
          footer={sparse || undefined}
        />
      </Suspense>
    </main>
  );
}
