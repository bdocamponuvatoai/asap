"use client";

import type { ImageLoaderProps } from "next/image";

import appliance from "@/assets/images/appliance.webp";
import applianceSmall from "@/assets/images/appliance-small.webp";
import hero from "@/assets/images/hero.webp";
import heroSmall from "@/assets/images/hero-small.webp";
import home from "@/assets/images/home.webp";
import homeSmall from "@/assets/images/home-small.webp";
import plumbing from "@/assets/images/plumbing.webp";
import plumbingSmall from "@/assets/images/plumbing-small.webp";

/** Full-size image URL → its 800 px wide variant. */
const SMALL_VARIANTS: Record<string, string> = {
  [appliance.src]: applianceSmall.src,
  [hero.src]: heroSmall.src,
  [home.src]: homeSmall.src,
  [plumbing.src]: plumbingSmall.src,
};

const SMALL_WIDTH = 800;

/**
 * Picks between the two pre-generated files per photo. `deviceSizes` in
 * next.config.ts limits the requested widths to 800 and 1600.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (width <= SMALL_WIDTH) return SMALL_VARIANTS[src] ?? src;
  return src;
}
