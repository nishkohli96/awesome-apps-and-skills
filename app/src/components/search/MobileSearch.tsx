'use client';

import { useId } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ICON, searchPlaceholder } from '@/constants';
import { useData } from '@/lib/data-context';
import { Icon } from '@/components/ui/Icon';
import { SearchPanel } from './SearchPanel';
import { useSearchState } from './useSearchState';

function Body({ onClose }: { onClose: () => void }) {
  const id = useId();
  const { tools } = useData();
  const search = useSearchState(onClose);
  return (
    <>
      <div className="border-border flex h-16 shrink-0 items-center gap-2 border-b pr-2 pl-3">
        <label className="border-accent bg-surface text-ink-3 flex h-11 flex-1 items-center gap-2 rounded-[10px] border px-3">
          <Icon d={ICON.search} size={18} />
          <input
            type="search"
            role="combobox"
            aria-label="Search"
            aria-expanded
            aria-controls={`${id}-list`}
            aria-activedescendant={
              search.rows.length > 0
                ? `${id}-option-${search.active}`
                : undefined
            }
            autoComplete="off"
            autoFocus
            placeholder={searchPlaceholder(tools.length)}
            value={search.query}
            onChange={event => search.setQuery(event.target.value)}
            onKeyDown={search.onKeyDown}
            className="text-ink min-w-0 flex-1 border-0 bg-transparent text-[16px] leading-none outline-none focus-visible:outline-none!"
          />
        </label>
        <button
          type="button"
          onClick={onClose}
          className="text-ink h-11 border-0 bg-transparent px-2.5 text-[15px] leading-none font-medium"
        >
          Cancel
        </button>
      </div>
      <SearchPanel
        mobile
        search={search}
        listId={`${id}-list`}
        optionId={index => `${id}-option-${index}`}
        onDone={onClose}
      />
    </>
  );
}

interface MobileSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Full-screen search for phone widths. */
export function MobileSearch({ open, onOpenChange }: MobileSearchProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-bg inset-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <Body onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
