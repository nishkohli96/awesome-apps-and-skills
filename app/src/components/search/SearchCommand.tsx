'use client';

import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { ICON, SEARCH_PLACEHOLDER } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';
import { SearchPanelState, SearchVariant } from '@/types';
import { SearchPanel } from './SearchPanel';
import { useSearchState } from './useSearchState';

interface SearchCommandProps {
  variant: SearchVariant;
  /** Listens for `/` and ⌘K / Ctrl+K and focuses this field. */
  shortcuts?: boolean;
  /** Called by the shortcuts when this field is hidden (phone layout). */
  onShortcutFallback?: () => void;
}

export function SearchCommand({ variant, shortcuts = false, onShortcutFallback }: SearchCommandProps) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const inputRef = useRef<HTMLInputElement>(null);
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
      const target = event.target instanceof Element ? event.target : null;
      const typing = target?.closest('input, textarea, select, [contenteditable="true"]');
      const cmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (!cmdK && !(event.key === '/' && !typing)) {
        return;
      }
      event.preventDefault();
      const input = inputRef.current;
      if (input && input.offsetParent !== null) {
        input.focus();
        setOpen(true);
      } else {
        onShortcutFallback?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcuts, onShortcutFallback]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  const hero = variant === SearchVariant.Hero;
  const showPanel = open && (search.state !== SearchPanelState.Results || search.rows.length > 0 || search.pending);

  return (
    <div
      onBlur={onBlur}
      className={`relative min-w-0 ${hero ? 'w-full max-w-[640px]' : 'max-w-[440px] flex-1 max-[760px]:hidden'}`}
    >
      <label
        className={`relative z-30 flex items-center border border-border-strong bg-surface text-ink-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/35 ${
          hero
            ? 'h-[60px] gap-3 rounded-[12px] pr-2.5 pl-[18px] shadow-[0_1px_0_var(--border)]'
            : 'h-10 gap-2.5 rounded-[8px] pr-2 pl-3'
        }`}
      >
        <Icon d={ICON.search} size={hero ? 22 : 17} />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label={hero ? 'Search the directory' : 'Search'}
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && search.rows.length > 0 ? optionId(search.active) : undefined}
          autoComplete="off"
          placeholder={SEARCH_PLACEHOLDER}
          value={search.query}
          onFocus={() => setOpen(true)}
          onChange={event => {
            search.setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={search.onKeyDown}
          className={`min-w-0 flex-1 border-0 bg-transparent leading-none text-ink outline-none focus-visible:!outline-none ${
            hero ? 'text-[18px]' : 'text-[14px]'
          }`}
        />
        <kbd
          className={`grid place-items-center border border-border bg-surface-2 font-mono leading-none font-medium text-ink-2 max-[760px]:hidden ${
            hero
              ? 'h-[26px] min-w-[26px] rounded-[6px] px-[7px] text-[12px]'
              : 'h-[22px] rounded-[5px] px-1.5 text-[11px]'
          }`}
        >
          {hero ? '/' : '⌘K'}
        </kbd>
      </label>
      {showPanel && (
        <div
          className={
            hero
              ? 'absolute inset-x-0 top-[calc(100%+8px)] z-30'
              // The sticky header has a backdrop-filter, so `fixed` is measured from the header box:
              // `top-full` is the line under it. A wide, centred palette with a scrim, not a
              // dropdown squeezed to the input's width.
              : 'fixed top-[calc(100%+12px)] left-1/2 z-30 w-[min(680px,calc(100vw-32px))] -translate-x-1/2'
          }
          onMouseDown={e => e.preventDefault()}
        >
          <SearchPanel search={search} listId={listId} optionId={optionId} onDone={close} />
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
