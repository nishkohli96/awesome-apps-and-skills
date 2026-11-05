import type { Metadata } from 'next';
import { REPO_URL } from '@/lib/constants';

export const metadata: Metadata = { title: 'Suggest a tool' };

const option
  = 'flex flex-col gap-2 rounded-[12px] border border-border bg-surface p-5 text-ink no-underline lift';

export default function SuggestToolPage() {
  return (
    <main
      id="main"
      className="mx-auto flex max-w-[860px] flex-col gap-5 px-[clamp(24px,3vw,32px)] pt-12 pb-24"
    >
      <h1 className="m-0 font-serif text-[44px] leading-[1.02] font-normal">
        Suggest a tool
      </h1>
      <p className="m-0 text-[15px] leading-[1.55] text-ink-2">
        Submissions go through a GitHub pull request, so every addition is public and reviewable.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3">
        <a
          href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
          target="_blank"
          rel="noopener noreferrer"
          className={option}
        >
          <span className="font-mono text-[12px] leading-none font-medium text-ink-3">
            FASTEST TO MERGE
          </span>
          <span className="text-[17px] font-semibold">
            Open a pull request
          </span>
          <span className="text-[14px] leading-[1.5] text-ink-2">
            Add one entry to the data file with type, tags and pricing.
          </span>
          <span className="text-[14px] font-medium text-accent-ink">
            Contribution guide ↗
          </span>
        </a>
      </div>
      <div className="flex flex-col gap-1.5 rounded-[12px] bg-surface-2 px-[18px] py-4">
        <span className="text-[14px] font-semibold">
          What gets in
        </span>
        <span className="text-[14px] leading-[1.55] text-ink-2">
          Any app, website, Claude skill, MCP server or library, as long as it is genuinely useful: a
          free alternative to a paid tool, a way to save hours on routine work, or something that
          helps people create, learn, automate or get more done.
        </span>
      </div>
    </main>
  );
}
