import Link from 'next/link';
import { CategoryCard } from '@/components/CategoryCard';
// import { Newsletter } from '@/components/Newsletter';
import { SearchCommand } from '@/components/search/SearchCommand';
import { ToolCard } from '@/components/ToolCard';
import { TypeBadge } from '@/components/ui/TypeBadge';
import { EDITORS_PICKS, TYPE_META, TYPE_STRIP } from '@/lib/constants';
import { SearchVariant } from '@/types';
import {
  countTypes,
  getCategories,
  getTools,
  newestFirst
} from '@/lib/data';

const QUICK_PICKS = [
  { label: 'Claude skills', href: '/type/skill' },
  { label: 'MCP servers', href: '/type/mcp-server' },
  { label: 'Free', href: '/search?price=free' },
  { label: 'Video', href: '/tag/video' },
  { label: 'Coding', href: '/coding' },
];

const eyebrow = 'font-mono text-[12px] leading-none font-medium tracking-[0.04em] text-ink-3 uppercase';
const sectionHead
  = 'flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4';
const h2 = 'm-0 text-[clamp(26px,3vw,32px)] font-semibold tracking-[-0.025em]';

export default function HomePage() {
  const tools = getTools();
  const categories = getCategories();
  const typeCounts = countTypes(tools);
  const newest = newestFirst(tools);
  const picks = EDITORS_PICKS.flatMap(slug => tools.find(tool => tool.slug === slug) ?? []);

  const byToolCount = [...categories].sort((a, b) => b.toolCount - a.toolCount);
  const typesByCount = [...TYPE_STRIP].sort((a, b) => (typeCounts.get(b) ?? 0) - (typeCounts.get(a) ?? 0));
  const subcategoryCount = categories.reduce((sum, c) => sum + c.subcategories.length, 0);

  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(72px,9vw,120px)] px-[clamp(24px,3vw,32px)]"
    >
      <section className="flex flex-wrap items-start gap-12 pt-[clamp(48px,8vw,104px)]">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
          <span className={eyebrow}>
            A human-curated index of AI tools
          </span>
          <h1 className="m-0 font-serif text-[clamp(44px,7vw,84px)] leading-[0.98] font-normal tracking-[-0.02em] text-balance">
            Skip the endless searching.
            {' '}
            <em className="text-accent-ink">Find the tool that fits.</em>
          </h1>
          <p className="m-0 text-[18px] leading-[1.55] text-pretty text-ink-2">
            Claude skills, MCP servers, apps and web tools, hand-picked by a techie and linked straight
            to the source.
          </p>
          <SearchCommand variant={SearchVariant.Hero} />
          <p className="m-0 -mt-3 text-[15px] leading-[1.55] text-pretty text-ink-2">
            Whether you&apos;re a developer, designer, creator or an entrepreneur, I&apos;d bet
            at least one tool in here will make you 10x more productive.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[14px] text-ink-3">Try</span>
            {QUICK_PICKS.map(pick => (
              <Link
                key={pick.label}
                href={pick.href}
                className="inline-flex h-9 items-center rounded-full border border-border bg-surface px-3.5 text-[14px] leading-none font-medium text-ink no-underline hover:border-border-strong"
              >
                {pick.label}
              </Link>
            ))}
          </div>
          <p className="m-0 font-mono text-[13px] leading-[1.4] font-medium text-ink-3">
            {`${tools.length} Tools | ${categories.length} Categories`}
          </p>
        </div>

        <aside
          aria-labelledby="picks"
          className="flex min-w-0 flex-[1_1_280px] flex-col max-[919px]:border-t-1 max-[919px]:border-ink max-[919px]:pt-4 min-[920px]:mt-10"
        >
          <h2 id="picks" className={`${eyebrow} m-0 mb-2`}>
            Editor&apos;s picks
          </h2>
          {picks.map(tool => (
            <a
              key={tool.slug}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 border-b border-border py-3.5 text-ink no-underline"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-[16px] font-semibold">
                  {tool.name}
                </span>
                <TypeBadge type={tool.type} />
              </span>
              <span className="line-clamp-2 text-[14px] leading-[1.45] text-ink-2">
                {tool.description}
              </span>
            </a>
          ))}
        </aside>
      </section>

      <section
        id="categories"
        aria-labelledby="cats"
        className="flex scroll-mt-24 flex-col gap-7"
      >
        <div className={sectionHead}>
          <h2 id="cats" className={h2}>
            Browse by category
          </h2>
          <span className="font-mono text-[13px] leading-none font-medium text-ink-3">
            {`${categories.length} Categories | ${subcategoryCount} Subcategories`}
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(272px,100%),1fr))] gap-4">
          {byToolCount.map(category => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="types" className="flex flex-col gap-5">
        <h2 id="types" className="m-0 text-[clamp(22px,2.4vw,24px)] font-semibold tracking-[-0.02em]">
          Browse by type
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(168px,100%),1fr))] overflow-hidden rounded-[12px] border border-border bg-surface">
          {typesByCount.map(type => (
            <Link
              key={type}
              href={`/type/${type}`}
              className="-mr-px -mb-px flex items-center justify-between gap-3 border-r border-b border-border px-5 py-[18px] text-ink no-underline hover:bg-surface-2"
            >
              <span className="flex items-center gap-2.5 text-[15px] font-medium">
                <TypeBadge type={type} box={28} />
                {TYPE_META[type].label}
              </span>
              <span className="font-mono text-[13px] leading-none font-medium text-ink-3">
                {typeCounts.get(type) ?? 0}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="new"
        aria-labelledby="newh"
        className="flex scroll-mt-24 flex-col gap-7"
      >
        <div className={sectionHead}>
          <h2 id="newh" className={h2}>
            Recently Added
          </h2>
          <Link href="/search?sort=new" className="text-[14px] font-medium">
            All new tools →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-5">
          {newest.slice(0, 5).map(tool => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              hideNewBadge
            />
          ))}
          <Link
            href="/search?sort=new"
            className="flex flex-col gap-6 rounded-[12px] border border-dashed border-border-strong p-6 text-ink no-underline"
          >
            <span className="font-serif text-[30px] leading-[1.1]">
              Everything added in the last 30 days
            </span>
            <span className="text-[14px] font-medium text-accent-ink">
              See all new →
            </span>
          </Link>
        </div>
      </section>

      {/* <Newsletter /> */}
    </main>
  );
}
