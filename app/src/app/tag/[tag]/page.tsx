import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Listing } from '@/components/Listing';
import { PageHeader } from '@/components/PageHeader';
import { countTags, getCategories, getTools } from '@/lib/data';
import { GroupBy } from '@/types';

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return countTags(getTools()).map(([tag]) => ({ tag }));
}

const decode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decode((await params).tag);
  return { title: `#${tag}`, description: `Tools tagged ${tag}.` };
}

export default async function TagPage({ params }: Props) {
  const tag = decode((await params).tag);
  const tools = getTools().filter(tool => tool.tags.includes(tag));
  if (tools.length === 0) {
    notFound();
  }

  const categories = getCategories().filter(c => tools.some(t => t.category === c.slug));
  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[clamp(24px,3vw,32px)] pb-24"
    >
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: `#${tag}` }]}
        mark="#"
        title={tag}
        meta={`${tools.length} ${tools.length === 1 ? 'tool' : 'tools'} · ${categories.length} ${
          categories.length === 1 ? 'category' : 'categories'
        }`}
        description={`Every tool tagged “${tag}”, grouped by category.`}
      />
      <Suspense fallback={null}>
        <Listing
          basePath={`/tag/${encodeURIComponent(tag)}`}
          tools={tools}
          groupBy={GroupBy.Category}
          groups={categories.map(c => ({ key: c.slug, label: c.name, emoji: c.emoji }))}
          lockedTag={tag}
        />
      </Suspense>
    </main>
  );
}
