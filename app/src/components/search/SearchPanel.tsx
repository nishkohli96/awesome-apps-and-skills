'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/data-context';
import { TypeBadge } from '@/components/ui/TypeBadge';
import { SearchPanelState } from '@/types';
import { openTool, type SearchState } from './useSearchState';

const POPULAR_TAGS = 10;
const JUMP_TO = 3;

interface SearchPanelProps {
  search: SearchState;
  listId: string;
  optionId: (index: number) => string;
  onDone: () => void;
  /** Full-screen phone layout: taller rows and a bottom button. */
  mobile?: boolean;
}

const mono = 'font-mono text-[12px] leading-none font-medium text-ink-3';

export function SearchPanel({
  search,
  listId,
  optionId,
  onDone,
  mobile = false,
}: SearchPanelProps) {
  const { tools, categories } = useData();
  const {
    rows,
    total,
    trimmed,
    pending,
    state,
    active,
    setActive,
    goToResults,
  } = search;

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>();
    tools.forEach(t =>
      t.tags.forEach(g => counts.set(g, (counts.get(g) ?? 0) + 1))
    );
    return [...counts]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, POPULAR_TAGS)
      .map(([tag]) => tag);
  }, [tools]);

  const categoryName = (slug: string) =>
    categories.find(c => c.slug === slug)?.name ?? '';
  const footerLabel = `All ${total} result${total === 1 ? '' : 's'} for “${trimmed}” →`;

  return (
    <div
      className={
        mobile
          ? 'flex flex-1 flex-col overflow-y-auto'
          : 'border-border bg-surface shadow-pop flex flex-col overflow-hidden rounded-[12px] border'
      }
    >
      {state === SearchPanelState.Empty && (
        <div className="flex flex-col gap-3 px-[18px] pt-[18px] pb-5">
          <span className={mono}>POPULAR TAGS</span>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.map(tag => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                onClick={onDone}
                className="border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink inline-flex h-[30px] items-center rounded-[6px] border px-2.5 font-mono text-[12px] font-medium no-underline"
              >
                {tag}
              </Link>
            ))}
          </div>
          <span className={`${mono} pt-2`}>JUMP TO</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, JUMP_TO).map(category => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                onClick={onDone}
                className="bg-surface-2 text-ink rounded-[6px] px-2.5 py-1.5 text-[14px] no-underline"
              >
                <span aria-hidden="true">{category.emoji} </span>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {state === SearchPanelState.Results && (
        <>
          {rows.length > 0 && (
            <ul
              id={listId}
              role="listbox"
              aria-label="Results"
              className={`m-0 flex list-none flex-col p-1.5 ${mobile ? 'gap-0 p-2' : 'gap-0.5'}`}
            >
              {rows.map((tool, index) => {
                const on = index === active;
                return (
                  <li
                    key={tool.slug}
                    id={optionId(index)}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => setActive(index)}
                    onClick={() => {
                      openTool(tool);
                      onDone();
                    }}
                    className={`flex cursor-pointer items-center gap-3 ${
                      mobile
                        ? 'border-border min-h-16 border-b p-2'
                        : `rounded-[8px] p-2.5 ${on ? 'bg-surface-2 shadow-[inset_2px_0_0_var(--accent)]' : ''}`
                    }`}
                  >
                    <TypeBadge type={tool.type} box={mobile ? 36 : 32} />
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="text-ink text-[15px] leading-tight font-semibold">
                        {tool.name}
                      </span>
                      <span className="text-ink-2 truncate text-[13px]">
                        {tool.description}
                      </span>
                    </span>
                    {!mobile && (
                      <span className="text-ink-3 shrink-0 font-mono text-[12px] leading-none">
                        {categoryName(tool.category)}
                      </span>
                    )}
                    {!mobile && on && (
                      <kbd className="border-border bg-surface text-ink-2 h-[22px] rounded-[5px] border px-1.5 font-mono text-[11px] leading-5 font-medium">
                        ↵
                      </kbd>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {pending && (
            <div
              aria-hidden="true"
              className="flex flex-col gap-3.5 px-3 pt-1.5 pb-3"
            >
              {[
                ['40%', '75%'],
                ['30%', '65%'],
              ].map(([a, b]) => (
                <div key={a} className="flex items-center gap-3">
                  <div className="skeleton size-8" />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="skeleton h-3" style={{ width: a }} />
                    <div className="skeleton h-2.5" style={{ width: b }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {state === SearchPanelState.None && (
        <div className="flex flex-col items-start gap-3 px-6 py-7">
          <span className="font-serif text-[30px] leading-[1.1]">
            Nothing for “{trimmed}” yet.
          </span>
          <p className="text-ink-2 m-0 text-[14px] leading-[1.55]">
            Check the spelling, try a broader word like “video” or “seo”, or
            suggest a tool you have in mind.
          </p>
          <Link
            href="/suggest-tool"
            onClick={onDone}
            className="bg-btn !text-btn-text mt-1 inline-flex h-[38px] items-center rounded-[8px] px-3.5 text-[14px] leading-none font-semibold no-underline"
          >
            Submit a tool
          </Link>
        </div>
      )}

      {mobile ? (
        state === SearchPanelState.Results &&
        rows.length > 0 && (
          <button
            type="button"
            onClick={goToResults}
            className="border-border-strong text-ink mx-4 my-2 grid h-12 place-items-center rounded-[10px] border bg-transparent font-medium"
          >
            {`All ${total} result${total === 1 ? '' : 's'} for “${trimmed}”`}
          </button>
        )
      ) : (
        <div className="border-border bg-surface-2 text-ink-3 flex items-center justify-between gap-3 border-t px-3.5 py-2.5 font-mono text-[12px] leading-none">
          <span>↑↓ move · ↵ open · esc close</span>
          {state === SearchPanelState.Results && rows.length > 0 && (
            <button
              type="button"
              id={optionId(rows.length)}
              onClick={goToResults}
              onMouseMove={() => setActive(rows.length)}
              className={`text-accent-ink rounded-[5px] border-0 bg-transparent px-1.5 py-1 font-sans text-[13px] leading-none font-medium ${
                active === rows.length ? 'bg-surface underline' : ''
              }`}
            >
              {footerLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
