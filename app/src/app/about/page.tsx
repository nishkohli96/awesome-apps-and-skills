import type { Metadata } from 'next';
import { REPO_URL } from '@/lib/constants';
import { countTags, getCategories, getTools } from '@/lib/data';

export const metadata: Metadata = { title: 'About' };

const rowClass = 'flex justify-between border-b border-border py-3.5';

export default function AboutPage() {
  const tools = getTools();
  const stats = [
    ['Tools', tools.length],
    ['Categories', getCategories().length],
    ['Tags', countTags(tools).length],
  ] as const;

  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1000px] flex-wrap gap-8 px-[clamp(24px,3vw,32px)] pt-12 pb-24"
    >
      <div className="flex flex-[2_1_300px] flex-col gap-4">
        <h1 className="m-0 font-serif text-[44px] leading-[1.02] font-normal">
          A reading list, for tools.
        </h1>
        <p className="m-0 text-[16px] leading-[1.6] text-ink-2">
          Every entry is added by hand, described in plain words and linked straight to its own
          site. No affiliate links, no paid placement inside the list.
        </p>
        <p className="m-0 text-[16px] leading-[1.6] text-ink-2">
          Curated by Nishant Kohli, who adds new tools as they appear.
        </p>
        <p className="m-0 text-[13px] text-ink-3">
          Not affiliated with Anthropic.
        </p>
      </div>
      <dl className="m-0 flex flex-[1_1_180px] flex-col border-t-2 border-ink">
        {stats.map(([name, value]) => (
          <div key={name} className={rowClass}>
            <dt className="text-ink-2">
              {name}
            </dt>
            <dd className="m-0 font-mono text-[15px] leading-tight font-medium">
              {value}
            </dd>
          </div>
        ))}
        <div className="flex justify-between py-3.5">
          <dt className="text-ink-2">Source</dt>
          <dd className="m-0">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-medium">
              GitHub ↗
            </a>
          </dd>
        </div>
      </dl>
    </main>
  );
}
