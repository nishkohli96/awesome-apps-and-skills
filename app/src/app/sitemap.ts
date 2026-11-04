import type { MetadataRoute } from 'next';
import { countTags, getCategories, getTools } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import type { Tool } from '@/lib/types';

/** Newest add date among the tools, so a page's lastmod only moves when its content does. */
function latest(tools: Tool[]): Date | undefined {
  const dates = tools.map(tool => tool.addedAt).filter((d): d is string => d !== null);
  return dates.length > 0 ? new Date(dates.sort().at(-1) as string) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools();
  const url = (path: string) => `${SITE_URL}${path}`;

  const categories = getCategories().map(category => ({
    url: url(`/${category.slug}`),
    lastModified: latest(tools.filter(tool => tool.category === category.slug)),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const types = [...new Set(tools.map(tool => tool.type))].map(type => ({
    url: url(`/type/${type}`),
    lastModified: latest(tools.filter(tool => tool.type === type)),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tags = countTags(tools).map(([tag]) => ({
    url: url(`/tag/${encodeURIComponent(tag)}`),
    lastModified: latest(tools.filter(tool => tool.tags.includes(tag))),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [
    {
      url: url('/'),
      lastModified: latest(tools),
      changeFrequency: 'daily',
      priority: 1
    },
    ...categories,
    ...types,
    ...tags,
    {
      url: url('/submit'),
      lastModified: latest(tools),
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: url('/about'),
      lastModified: latest(tools),
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}
