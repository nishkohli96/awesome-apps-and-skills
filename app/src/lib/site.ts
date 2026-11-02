/**
 * Public origin of the site, used for the sitemap, robots.txt and metadata.
 * Set NEXT_PUBLIC_SITE_URL to the real domain; on Vercel the production
 * domain is picked up on its own until then.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();
