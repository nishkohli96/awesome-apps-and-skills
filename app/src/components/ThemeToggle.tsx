'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { ICON } from '@/lib/constants';
import { Theme, ThemeToggleVariant } from '@/types';
import { Icon } from './ui/Icon';

const OPTIONS = [
  { value: Theme.Light, label: 'Light', icon: ICON.sun },
  { value: Theme.Dark, label: 'Dark', icon: ICON.moon },
  { value: Theme.System, label: 'System', icon: ICON.monitor },
] as const;

const subscribeNothing = () => () => {};

interface ThemeToggleProps {
  /** `icons` for the appbar, `labels` for the mobile menu. */
  variant?: ThemeToggleVariant;
}

export function ThemeToggle({ variant = ThemeToggleVariant.Icons }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  // next-themes only knows the stored choice after hydration.
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const labels = variant === ThemeToggleVariant.Labels;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`inline-flex gap-0.5 border border-border bg-surface-2 ${
        labels ? 'rounded-[10px] p-[3px]' : 'rounded-[9px] p-0.5'
      }`}
    >
      {OPTIONS.map(option => {
        const on = mounted && theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={labels ? undefined : `${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={`border text-ink-2 ${
              on ? 'border-border bg-surface !text-ink' : 'border-transparent bg-transparent'
            } ${
              labels
                ? 'h-[38px] rounded-[7px] px-3 text-[14px] leading-none font-medium'
                : 'grid h-7 w-[30px] place-items-center rounded-[7px]'
            }`}
          >
            {labels ? option.label : <Icon d={option.icon} size={15} />}
          </button>
        );
      })}
    </div>
  );
}
