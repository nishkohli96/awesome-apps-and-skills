export const ENV_VARIABLES = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim(),
  vercelProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN?.trim(),
  // EU projects must use the EU host (https://api-eu.mixpanel.com), or their events never arrive.
  mixpanelApiHost: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST?.trim() || undefined,
};
