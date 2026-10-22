import type { Metadata } from "next";

import heroImage from "@/assets/images/hero.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  title: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  description: string;
};

/**
 * Per-page metadata: absolute title, description, canonical URL and Open
 * Graph tags. URLs are resolved against `metadataBase` from the root layout.
 */
export function pageMetadata({ title, path, description }: PageMetadataInput): Metadata {
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      type: "website",
      url: path,
      images: [{ url: heroImage.src, width: heroImage.width, height: heroImage.height }],
    },
  };
}
