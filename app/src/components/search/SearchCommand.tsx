'use client';

import { Command } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { ICON, searchPlaceholder } from '@/constants';
import { useData } from '@/lib/data-context';
import { Icon } from '@/components/ui/Icon';
import { SearchPanelState, SearchVariant } from '@/types';
import { SearchPanel } from './SearchPanel';
import { useSearchState } from './useSearchState';

/** Height of the sticky appbar; a hero field scrolled under it counts as off screen. */
const APPBAR_HEIGHT = 64;

interface SearchCommandProps {
  variant: SearchVariant;
  /** Listens for ⌘K / Ctrl+K and focuses the visible search field. */
  shortcuts?: boolean;
  /** Called by the shortcuts when this field is hidden (phone layout). */
  onShortcutFallback?: () => void;
}

export function SearchCommand({
  variant,
  shortcuts = false,
  onShortcutFallback,
}: SearchCommandProps) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const { tools } = useData();
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    inputRef.current?.blur();
  };
  const search = useSearchState(close);

  useEffect(() => {
    if (!shortcuts) {
      return;
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (!(
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      )) {
        return;
      }
      event.preventDefault();
      const input = inputRef.current;
      // While the hero field is on screen the appbar one is hidden, so focus the visible one.
      // Measured now rather than read from the observer's flag, which lags a frame behind scrolling.
      const hero = document.querySelector<HTMLInputElement>(
        '[data-hero-search-input]'
      );
      const box = hero?.getBoundingClientRect();
      const heroInput =
        box && box.bottom > APPBAR_HEIGHT && box.top < window.innerHeight
          ? hero
          : null;
      if (heroInput) {
        heroInput.focus();
      } else if (input && input.offsetParent !== null) {
        input.focus();
        setOpen(true);
      } else {
        onShortcutFallback?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcuts, onShortcutFallback]);

  // The home page shows one search field at a time: the appbar's appears once the hero's scrolls away.
  useEffect(() => {
    const field = fieldRef.current;
    if (variant !== SearchVariant.Hero || !field) {
      return;
    }
    const root = document.documentElement;
    // The top margin treats the strip under the sticky appbar as off screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.heroSearch = entry.isIntersecting ? 'visible' : 'hidden';
      },
      { rootMargin: `-${APPBAR_HEIGHT}px 0px 0px 0px` }
    );
    observer.observe(field);
    return () => {
      observer.disconnect();
      delete root.dataset.heroSearch;
    };
  }, [variant]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const hero = variant === SearchVariant.Hero;
  const showPanel =
    open &&
    (search.state !== SearchPanelState.Results ||
      search.rows.length > 0 ||
      search.pending);

  return (
    <div
      ref={fieldRef}
      onBlur={onBlur}
      className={`relative min-w-0 ${
        hero
          ? 'w-full max-w-[640px]'
          : 'max-w-[440px] flex-1 max-[760px]:hidden [html[data-hero-search=visible]_&]:invisible'
      }`}
    >
      <label
        className={`relative ${hero ? '' : 'z-30'} border-border-strong bg-surface text-ink-3 focus-within:border-accent focus-within:ring-accent/35 flex items-center border focus-within:ring-2 ${
          hero
            ? 'h-[60px] gap-3 rounded-[12px] pr-2.5 pl-[18px] shadow-[0_1px_0_var(--border)]'
            : 'h-10 gap-2.5 rounded-[8px] pr-2 pl-3'
        }`}
      >
        <Icon d={ICON.search} size={hero ? 22 : 17} />
        <input
          ref={inputRef}
          data-hero-search-input={hero ? '' : undefined}
          type="search"
          role="combobox"
          aria-label={hero ? 'Search the directory' : 'Search'}
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            showPanel && search.rows.length > 0
              ? optionId(search.active)
              : undefined
          }
          autoComplete="off"
          placeholder={searchPlaceholder(tools.length)}
          value={search.query}
          onFocus={() => setOpen(true)}
          onChange={event => {
            search.setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={search.onKeyDown}
          className={`text-ink min-w-0 flex-1 border-0 bg-transparent leading-none outline-none focus-visible:!outline-none ${
            hero ? 'text-[18px]' : 'text-[14px]'
          }`}
        />
        <kbd
          className={`border-border bg-surface-2 text-ink-2 inline-flex items-center justify-center gap-[3px] border font-mono leading-none font-medium max-[760px]:hidden ${
            hero
              ? 'h-[26px] min-w-[26px] rounded-[6px] px-[7px] text-[12px]'
              : 'h-[22px] rounded-[5px] px-1.5 text-[11px]'
          }`}
        >
          <Command size={hero ? 13 : 12} strokeWidth={2} aria-hidden="true" />K
        </kbd>
      </label>
      {showPanel && (
        <div
          className={
            hero
              ? 'absolute inset-x-0 top-[calc(100%+8px)] z-10'
              : 'fixed top-[calc(100%+12px)] left-1/2 z-30 w-[min(680px,calc(100vw-32px))] -translate-x-1/2'
          }
          onMouseDown={e => e.preventDefault()}
        >
          <SearchPanel
            search={search}
            listId={listId}
            optionId={optionId}
            onDone={close}
          />
        </div>
      )}
      {showPanel && !hero && (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-full z-20 h-screen bg-black/40 backdrop-blur-[2px]"
          onMouseDown={e => e.preventDefault()}
          onClick={close}
        />
      )}
    </div>
  );
}
