import type { Pricing } from '@/lib/types';

export function PricingPill({ pricing }: { pricing: Pricing }) {
  return (
    <span className="inline-flex h-[22px] items-center rounded-full border border-border-strong px-[9px] font-mono text-[11px] leading-none font-medium text-ink-2">
      {pricing}
    </span>
  );
}
