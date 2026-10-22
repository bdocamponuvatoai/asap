import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/deployment";
import { serviceSlugs } from "@/content/services";

export const dynamic = "force-static";

const STATIC_PATHS = ["/", "/services/", "/about/", "/contact/", "/request/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...serviceSlugs.map((slug) => `/${slug}/`)];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
