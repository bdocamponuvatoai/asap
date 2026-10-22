import "server-only";

const LOCAL_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercel ? `https://${vercel}` : LOCAL_URL);
  return url.replace(/\/+$/, "");
}

/** Absolute origin used for canonical URLs, Open Graph, robots and sitemap. */
export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when explicitly enabled. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE=true requires SITE_URL (or VERCEL_PROJECT_PRODUCTION_URL) to point at the public domain.",
  );
}
