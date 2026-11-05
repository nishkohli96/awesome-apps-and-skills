import mixpanel from 'mixpanel-browser';
import { ENV_VARIABLES } from '@/constants';
import type { FilterState, Tool } from './types';
import {
  AnalyticsEvent,
  FilterAction,
  FilterType,
  type ToolClickSource
} from '@/types';

type EventData = Record<string, string | number>;

const TOKEN = ENV_VARIABLES.mixpanelToken;
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
  const site = ENV_VARIABLES.siteUrl;
  if (site && window.location.hostname !== new URL(site).hostname) {
    return;
  }
  mixpanel.init(TOKEN, {
    track_pageview: false,
    persistence: 'localStorage',
    api_host: ENV_VARIABLES.mixpanelApiHost
  });
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

/**
 * Sends one "Filter Change" per filter that differs between the old state and the requested change,
 * with the page it happened on, e.g. {filter: 'tag', value: 'seo', action: 'added', page: '/media'}.
 */
export function trackFilterChange(prev: FilterState, next: Partial<FilterState>): void {
  const page = window.location.pathname;

  const send = (
    filter: FilterType,
    value: string,
    action: FilterAction
  ) =>
    track(AnalyticsEvent.FilterChange, { filter, value, action, page });

  const diff = (
    filter: FilterType,
    before: string[],
    after: string[]
  ) => {
    after.filter(value => !before.includes(value)).forEach(value => send(filter, value, FilterAction.Added));
    before.filter(value => !after.includes(value)).forEach(value => send(filter, value, FilterAction.Removed));
  };

  if (next.tags) {
    diff(FilterType.Tag, prev.tags, next.tags);
  }
  if (next.types) {
    diff(FilterType.Type, prev.types, next.types);
  }
  if (next.price !== undefined && next.price !== prev.price) {
    send(FilterType.Pricing, next.price, FilterAction.Set);
  }
  if (next.sort !== undefined && next.sort !== prev.sort) {
    send(FilterType.Sort, next.sort, FilterAction.Set);
  }
}
