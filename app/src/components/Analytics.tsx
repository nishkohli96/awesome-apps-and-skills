'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, track } from '@/lib/analytics';
import { AnalyticsEvent } from '@/types';

/** Starts Mixpanel and records a page view on every route change. Renders nothing. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    track(AnalyticsEvent.PageView, { path: pathname });
  }, [pathname]);

  return null;
}
