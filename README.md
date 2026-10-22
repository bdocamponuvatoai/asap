# ASAP Appliance Service & Plumbing

Marketing website for ASAP Appliance Service & Plumbing (Scotts Valley, CA), built with Next.js
(App Router) as a fully static export. Seven pages, a homepage topic finder and a three-step
service-notes builder that runs entirely in the browser: nothing is sent, stored or booked.

The site was migrated from a generated static HTML build and is pixel-identical to it; see
[docs/verification.md](docs/verification.md).

## Getting started

Requires Node.js 20.9 or later (`.nvmrc` pins the current LTS, 24).

```sh
npm install
npm run dev        # http://localhost:3000
```

Production build and local preview of the exported files:

```sh
npm run build      # writes the static site to out/
npm run preview    # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                                              |
| `npm run build`        | Static export to `out/`, then `postbuild` (below)                               |
| `postbuild`            | `scripts/fix-export-segments.mjs`: flattens prefetch files (Windows export bug) |
| `npm run preview`      | Serves `out/` with `npx serve@14` (not a dependency)                            |
| `npm run lint`         | ESLint (`eslint-config-next`, core web vitals + TypeScript)                     |
| `npm run typecheck`    | `next typegen` (route types) + `tsc --noEmit`                                   |
| `npm run format`       | Prettier, write                                                                 |
| `npm run format:check` | Prettier, check only                                                            |
| `npm run check`        | typecheck + lint + format:check (what CI runs before building)                  |

## Structure

```
src/
  app/                    routes (App Router)
    layout.tsx            html/body shell, fonts, header/footer, global metadata, JSON-LD
    page.tsx              /
    [service]/page.tsx    /appliances/ and /plumbing/ (generateStaticParams, dynamicParams = false)
    services/ about/ contact/ request/
    not-found.tsx         styled 404 (exported as 404.html)
    icon.svg              favicon
    robots.ts sitemap.ts  generated from config + content
  components/
    layout/               topbar, site header (client: menu), footer, mobile call bar
    sections/             shared sections: page intro, service cards, process, FAQ, closing
    home/                 homepage sections; topic-finder.tsx is a client component
    detail/ about/ contact/
    request/              request builder (client), ?service= preset wrapper, aside
    ui/                   Icon, SmartLink, ButtonLink/TextLink, Eyebrow, Brand, Photo, OwnerLine
    seo/                  business JSON-LD
  config/
    site.ts               business details + navigation (safe in client code)
    deployment.ts         SITE_URL / SITE_INDEXABLE (server only)
  content/                typed copy: services, FAQ, finder topics, request form options
  lib/                    metadata builder, request notes builder, image loader
  styles/                 globals.css imports ordered partials: base/, components/, sections/, pages/
  assets/                 images/ (photo + 800 px variant) and fonts/ (Manrope, Inter)
scripts/                  fix-export-segments.mjs
docs/                     verification.md
```

## Conventions

- **Design parity first.** Markup and class names mirror the original CSS. Keep element nesting
  and class names when editing, and re-check the page visually at 1600, 1024, 768, 390 and 320 px.
- **Server Components by default.** Client components exist only for real interactivity:
  `site-header.tsx` (mobile menu), `topic-finder.tsx` (tabs), `request-builder.tsx` and
  `preset-request-builder.tsx` (form, `useSearchParams`).
- **Text nodes.** Where literal text meets a value, render one string (`{`Or call ${phone}`}`),
  not `Or call {phone}`. Separate text nodes shape slightly differently in Chrome.
- **Links.** Use `SmartLink`/`ButtonLink`/`TextLink`: internal paths (`/…`) become `next/link`;
  `tel:`, `#hash` and external URLs stay plain `<a>`.
- **Images.** Use `<Photo>` with a static import. Each photo has an 800 px `-small.webp` sibling;
  `src/lib/image-loader.ts` maps between them, and `next.config.ts` limits widths to 800/1600.
  Add new photos to the loader's map. Pass `eager` only for the above-the-fold image. (In
  development, Next.js may log that the loader "does not implement width"; this is expected
  because the full-size file is returned unchanged for the 1600 w candidate.)
- **Fonts.** `next/font/local` exposes `--font-manrope` / `--font-inter`; CSS uses the `--heading`
  and `--body` tokens. `adjustFontFallback` is off so glyphs missing from the subsets (e.g. "←")
  fall back to plain Arial as designed.
- **CSS order matters.** `src/styles/globals.css` imports partials in the original cascade order.
  Add new rules to the partial that owns the selector; don't re-sort imports.
- **No invented facts.** Hours, prices, licences, reviews, service areas and similar details are
  intentionally absent. Add them only from the owner.

## Routes

| Route          | Purpose                                                                  |
| -------------- | ------------------------------------------------------------------------ |
| `/`            | Hero, services, topic finder, owner story, process, location, FAQ        |
| `/services/`   | Service overview                                                         |
| `/appliances/` | Appliance service enquiry topics                                         |
| `/plumbing/`   | Plumbing enquiry topics                                                  |
| `/about/`      | About the business and owner                                             |
| `/contact/`    | Phone, owner, address, FAQ                                               |
| `/request/`    | Three-step notes builder; supports `?service=appliance\|plumbing\|other` |
| any other path | Styled 404                                                               |

The request builder only prepares notes: visitors can copy them or download a `.txt` file, then
call. There is no backend, email, analytics, tracking or storage.

## Configuration

Copy `.env.example` to `.env.local` for local overrides. On Vercel, set them per environment.

| Variable         | Default                                                                | Purpose                                                                                                                     |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Absolute origin for canonical URLs, Open Graph, JSON-LD, robots and sitemap. Trailing slash is stripped.                    |
| `SITE_INDEXABLE` | `false`                                                                | `true` removes `noindex,nofollow` and lets robots.txt allow crawling. The build fails if `true` while the URL is localhost. |

Business details (name, owner, phone, address, map link) live in `src/config/site.ts`.

## Before launch

- [ ] Owner confirms phone number, address, owner name and the services described.
- [ ] Owner approves the branding and the AI-generated photography (or supplies real photos).
- [ ] Decide on the remaining preview wording: the contact page source note and the FAQ answer
      that says "This preview helps you prepare…".
- [ ] Connect the production domain and set `SITE_URL` to it.
- [ ] Set `SITE_INDEXABLE=true` for Production only, redeploy, and check `robots.txt`,
      `sitemap.xml` and canonical tags on the live domain.
- [ ] Run Lighthouse on the live site; submit `sitemap.xml` in Google Search Console.

## Continuous integration

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci`,
`npm run check`, `npm run build`, then uploads `out/` as an artifact. Dependabot
(`.github/dependabot.yml`) opens grouped npm updates weekly and GitHub Actions updates monthly.

## Hosting

The site is a static export (`out/`) and runs on any static host that serves `index.html` for
directory paths and `404.html` for misses.

On Vercel: import the repository with the Next.js framework preset (the static export is detected
automatically). `vercel.json` adds security headers (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`). No Content Security Policy
is set, because Next.js uses inline scripts; add one only after testing it against the build.

### Deployment

Preview URL: _to be added after the first Vercel deployment._
