import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Keeps `/about/` → `out/about/index.html`, matching the original URLs.
  trailingSlash: true,
  images: {
    // Static export has no image optimizer. The custom loader serves the
    // pre-sized 800 px / 1600 px variants that ship in src/assets/images,
    // reproducing the original `srcset` ("-small.webp 800w, .webp 1600w").
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [800, 1600],
  },
};

export default nextConfig;
