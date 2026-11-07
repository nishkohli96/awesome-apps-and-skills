import type { MetadataRoute } from 'next';
import { countTags, getCategories, getTools } from '@/lib/data';
import { SITE_URL } from '@/constants';
import type { Category } from '@/lib/types';

/**
 * Newest last-commit date among the category files, so a page's lastmod moves
 * when an entry is added, edited or removed (not only added). Dates are UTC ISO.
 */
function latest(categories: Category[]): Date | undefined {
  const dates = categories
    .map(category => category.updatedAt)
    .filter((d): d is string => d !== null);
  return dates.length > 0 ? new Date(dates.sort().at(-1) as string) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools();
  const allCategories = getCategories();
  const url = (path: string) => `${SITE_URL}${path}`;
  // Categories that hold at least one tool matching the page.
  const holding = (match: (tool: (typeof tools)[number]) => boolean) =>
    allCategories.filter(category =>
      tools.some(tool => tool.category === category.slug && match(tool))
    );

  const categories = allCategories.map(category => ({
    url: url(`/${category.slug}`),
    lastModified: latest([category]),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const types = [...new Set(tools.map(tool => tool.type))].map(type => ({
    url: url(`/type/${type}`),
    lastModified: latest(holding(tool => tool.type === type)),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tags = countTags(tools).map(([tag]) => ({
    url: url(`/tag/${encodeURIComponent(tag)}`),
    lastModified: latest(holding(tool => tool.tags.includes(tag))),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  // /suggest-tool and /about are static pages: no lastModified rather than a wrong one.
  return [
    {
      url: url('/'),
      lastModified: latest(allCategories),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categories,
    ...types,
    ...tags,
    { url: url('/suggest-tool'), changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
