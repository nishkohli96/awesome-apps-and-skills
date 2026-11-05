import mixpanel from 'mixpanel-browser';
import type { Tool } from './types';
import type { AnalyticsEvent, ToolClickSource } from '@/types';

type EventData = Record<string, string | number>;

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN?.trim();
let ready = false;

/**
 * Starts Mixpanel once in the browser. Does nothing without a
 * project token, and once NEXT_PUBLIC_SITE_URL is set it only
 * records that host, so dev and previews stay out of the stats.
 * Do Not Track is respected (the SDK's default).
 *
 * When accounts arrive: call `mixpanel.identify(user.id)` after
 * sign-in so the visitor's earlier anonymous events join their
 * profile.
 */
export function initAnalytics(): void {
  if (!TOKEN || ready || typeof window === 'undefined') {
    return;
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site && window.location.hostname !== new URL(site).hostname) {
    return;
  }
  mixpanel.init(TOKEN, { track_pageview: false, persistence: 'localStorage' });
  ready = true;
}

/** Sends one event; a no-op until `initAnalytics` has run with a token. */
export function track(event: AnalyticsEvent, data?: EventData): void {
  if (ready) {
    mixpanel.track(event, data);
  }
}

export function toolClickData(tool: Tool, source: ToolClickSource): EventData {
  return {
    tool: tool.name,
    category: tool.category,
    type: tool.type,
    source
  };
}
