import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Listing } from '@/components/Listing';
import { PageHeader } from '@/components/PageHeader';
import { TYPE_META } from '@/constants';
import { getCategories, getTools } from '@/lib/data';
import { GroupBy, TOOL_TYPES, type ToolType } from '@/types';

type Props = { params: Promise<{ type: string }> };

export const dynamicParams = false;

const isType = (value: string): value is ToolType => (TOOL_TYPES as string[]).includes(value);

export function generateStaticParams() {
  const present = new Set(getTools().map(tool => tool.type));
  return TOOL_TYPES.filter(type => present.has(type)).map(type => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  return isType(type) ? { title: TYPE_META[type].label } : {};
}

export default async function TypePage({ params }: Props) {
  const { type } = await params;
  if (!isType(type)) {
    notFound();
  }

  const tools = getTools().filter(tool => tool.type === type);
  if (tools.length === 0) {
    notFound();
  }

  const categories = getCategories().filter(c => tools.some(t => t.category === c.slug));
  const label = TYPE_META[type].label;
  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1200px] flex-col gap-8 px-[clamp(24px,3vw,32px)] pb-24"
    >
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label }]}
        mark="◆"
        title={label}
        meta={`${tools.length} ${tools.length === 1 ? 'Tool' : 'Tools'} | ${categories.length} ${
          categories.length === 1 ? 'Category' : 'Categories'
        }`}
        description={`Everything of type “${type}”, grouped by category.`}
      />
      <Suspense fallback={null}>
        <Listing
          basePath={`/type/${type}`}
          tools={tools}
          groupBy={GroupBy.Category}
          groups={categories.map(c => ({ key: c.slug, label: c.name, emoji: c.emoji }))}
          lockedType={type}
        />
      </Suspense>
    </main>
  );
}
