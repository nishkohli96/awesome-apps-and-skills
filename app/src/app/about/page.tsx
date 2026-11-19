import type { Metadata } from 'next';
import { ProfileLink } from '@/components/ui/ProfileLink';
import { CURATOR_URL, REPO_URL } from '@/constants';
import { ProfileLocation } from '@/types';
import { countTags, getCategories, getTools } from '@/lib/data';

export const metadata: Metadata = { title: 'About' };

const rowClass =
  'flex justify-between py-3.5 max-[760px]:border-b max-[760px]:border-border';

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
        <p className="text-ink-2 m-0 text-[16px] leading-[1.6]">
          Curated by{' '}
          <ProfileLink
            href={CURATOR_URL}
            location={ProfileLocation.About}
            profile="curator"
          >
            Nishant Kohli
          </ProfileLink>
          , who aims to curate the list of the best tools as they appear.
        </p>
        <p className="text-ink-2 m-0 text-[16px] leading-[1.6]">
          Every tool here has been reviewed and hand-picked by the author, so
          you can trust it&apos;s worth your time and does exactly what
          you&apos;re looking for.
        </p>
      </div>
      <dl className="max-[760px]:border-ink m-0 flex flex-[1_1_180px] flex-col max-[760px]:border-t">
        {stats.map(([name, value]) => (
          <div key={name} className={rowClass}>
            <dt className="text-ink-2">{name}</dt>
            <dd className="m-0 font-mono text-[15px] leading-tight font-medium">
              {value}
            </dd>
          </div>
        ))}
        <div className="flex justify-between py-3.5">
          <dt className="text-ink-2">Source</dt>
          <dd className="m-0">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium"
            >
              GitHub ↗
            </a>
          </dd>
        </div>
      </dl>
    </main>
  );
}
