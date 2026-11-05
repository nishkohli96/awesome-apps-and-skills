export const ENV_VARIABLES = {
  mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN?.trim(),
  // EU projects must use the EU host (https://api-eu.mixpanel.com), or their events never arrive.
  mixpanelApiHost: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST?.trim() || undefined,
};
