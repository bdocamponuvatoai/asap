import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { MobileActions } from "@/components/layout/mobile-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Topbar } from "@/components/layout/topbar";
import { BusinessJsonLd } from "@/components/seo/business-json-ld";
import "@/styles/globals.css";

// adjustFontFallback is off so glyphs missing from these subsets (e.g. "←")
// fall back to plain Arial, exactly as in the original stylesheet.
const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  adjustFontFallback: false,
});

const inter = localFont({
  src: "../assets/fonts/inter.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Topbar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActions />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
