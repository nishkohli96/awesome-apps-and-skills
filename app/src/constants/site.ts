import { ENV_VARIABLES } from './environment';

export const SITE_NAME = 'Awesome Apps & Skills';
export const REPO_URL =
  'https://github.com/nishkohli96/awesome-apps-and-skills';

/** The curator's own site, linked from the footer and the About page. */
export const CURATOR_URL = 'https://nishkohli96.vercel.app/';

/**
 * Public origin of the site, used for the sitemap, robots.txt and metadata.
 * Set NEXT_PUBLIC_SITE_URL to the real domain; on Vercel the production
 * domain is picked up on its own until then.
 */
function resolveSiteUrl(): string {
  const configured = ENV_VARIABLES.siteUrl;
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  const vercel = ENV_VARIABLES.vercelProductionUrl;
  return vercel ? `https://${vercel}` : 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
