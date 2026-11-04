import { Pricing } from '@/types';

const base = 'inline-flex h-[22px] items-center rounded-[8px] border px-[9px] font-mono text-[11px] leading-none font-medium';
// "free" is the thing people scan for, so its outline and text are green rather than grey.
const FREE = 'border-[var(--t-app)] font-semibold text-[var(--t-app)]';
const OTHER = 'border-border-strong text-ink-2';

export function PricingPill({ pricing }: { pricing: Pricing }) {
  return (
    <span className={`${base} ${pricing === Pricing.Free ? FREE : OTHER}`}>
      {pricing}
    </span>
  );
}
