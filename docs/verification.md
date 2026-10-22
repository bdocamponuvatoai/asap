# Verification

Parity checks between the original ChatGPT-generated static site (`build.py` → `dist/`) and this
Next.js static export (`out/`). Measured on 2026-10-23 on Windows 11, Node 24.15.0, Next.js
16.4.2, using `playwright-core` 1.64.1 driving the installed Google Chrome. Both sites were served
locally by the same tiny Node static server (directory `index.html` + `404.html` fallback).

The verification scripts lived in a scratch folder alongside a byte-for-byte backup of the original
folder; they are not part of this repository (they need Playwright and the legacy files).

## Capture method

- Browser context: `deviceScaleFactor: 1`, `reducedMotion: "reduce"`.
- Before capture: wait for `networkidle`, switch every `<img>` to `loading="eager"` and
  `decoding="sync"`, await `img.decode()` and `document.fonts.ready`, scroll through the page so
  every tile is rasterised, return to the top, wait three animation frames.
- Chrome flags: `--disable-checker-imaging --disable-gpu --disable-gpu-rasterization
--force-color-profile=srgb --font-render-hinting=none`.

Why the flags: without `--disable-checker-imaging`, Chrome sometimes paints large downscaled photos
before their final-quality decode. A **control run comparing the legacy site with itself** showed a
47,851-pixel difference at 1600 px from this alone. With the flags, the control run is 0 px at every
route and width, so any remaining difference would be a real one.

## 1. Full-page pixel diff

pixelmatch with `threshold: 0` (any channel difference counts) on full-page screenshots.

| Route                        | 1600 | 1280 | 1024 | 768 | 390 | 320 |
| ---------------------------- | ---: | ---: | ---: | --: | --: | --: |
| `/`                          |    0 |    0 |    0 |   0 |   0 |   0 |
| `/services/`                 |    0 |    0 |    0 |   0 |   0 |   0 |
| `/appliances/`               |    0 |    0 |    0 |   0 |   0 |   0 |
| `/plumbing/`                 |    0 |    0 |    0 |   0 |   0 |   0 |
| `/about/`                    |    0 |    0 |    0 |   0 |   0 |   0 |
| `/contact/`                  |    0 |    0 |    0 |   0 |   0 |   0 |
| `/request/`                  |    0 |    0 |    0 |   0 |   0 |   0 |
| `/request/?service=plumbing` |    0 |    0 |    0 |   0 |   0 |   0 |

48 of 48 captures are pixel-identical, with identical page heights (e.g. `/` is 1600×5764 and
390×7744 on both sites). No anti-aliasing allowance was needed.

Both sites load the same image variant at every width (800 px `-small` file up to a rendered need
of 800 px, the full-size file above), checked via `img.currentSrc`.

## 2. Behaviour parity

The same scripted interactions ran against both sites; 56 recorded outcomes were compared as JSON
and 13 state screenshots were pixel-diffed. **56/56 outcomes identical, 13/13 screenshots 0 px.**

- **Mobile menu (390 px):** open/close, `aria-expanded`, `aria-label` ("Open menu"/"Close menu"),
  Escape closes and returns focus to the toggle, toggling twice, resize to 1024 px closes it,
  following a menu link closes it and sets `aria-current` on the new page.
- **Topic finder:** initial panel, click each tab, re-select the first tab, keyboard
  ArrowRight ×3 (wraps), ArrowLeft, Home, End, ArrowDown, ArrowUp, Tab; for each: selected tab,
  `tabindex`, panel `aria-labelledby`, number, label, title markup, description, prompts, CTA
  `href`, focused element. CTA lands on `/request/?service=plumbing` with "plumbing" checked.
- **Request builder (1280 px and 390 px):** Continue without a topic (native validation message,
  focus); appliance step 2 (options, brand/model enabled); empty fields; whitespace-only notes
  ("Please add a short description."); invalid ZIP; review rows (including trimmed brand, HTML in
  notes rendered as text); copy to clipboard (exact clipboard text); download (filename
  `ASAP-Service-Enquiry.txt` and exact file contents); clipboard failure fallback (textarea shown,
  focused, fully selected, status text); Back keeps every value; switching to plumbing resets the
  item list and hides/disables brand/model while keeping their values; switching back restores them.
  All `tel:` hrefs compared. (The original site has no `mailto:` links, so there is none to compare.)
- **Presets:** `?service=appliance`, `?service=other`, `?service=bogus`, none.

One legacy quirk is deliberately preserved: the finder's first title is authored with a line break
("What isn’t working / the way it used to?") and, once any tab is chosen, titles render as a single
line.

## 3. Computed styles

`getComputedStyle` (plus `::before`/`::after`) for every element on 7 routes at 1600, 1150, 951,
700 and 360 px: 7,390 element comparisons, including hidden elements (closed menu, later form
steps). This guards against cascade-order changes from splitting the stylesheet into partials.

All values match except two known, non-visual differences:

| Difference                                                   | Why                                                                                 | Visible?                                                     |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `<img>` `aspect-ratio: auto W / H`, `color: transparent`     | `next/image` writes `width`/`height` attributes and an inline `color: transparent`  | No: CSS sets both width and height on every photo; no border |
| `<button>` `background-position: 0px 0px` instead of `0% 0%` | The production CSS minifier rewrites `background: transparent` as `background: 0 0` | No: these buttons have no background image                   |

The CSS split itself was checked when generated: every (media query, selector, declaration) triple
in the original stylesheet appears exactly once in the partials (2,087 = 2,087).

## 4. Navigation (Next build)

| Check                                                                                  | Result      |
| -------------------------------------------------------------------------------------- | ----------- |
| Client-side clicks through all routes keep JS state (`window` marker survives)         | Pass        |
| Title, canonical and `aria-current` update on each navigation                          | Pass        |
| `?service=` preset applied after client navigation                                     | Pass        |
| Footer `/#how-it-works` from another page scrolls to the section (below sticky header) | Pass        |
| In-page `#services` link scrolls                                                       | Pass        |
| Back / Forward                                                                         | Pass        |
| Mobile menu closes after client navigation                                             | Pass        |
| Unknown URL returns HTTP 404 with the styled not-found page                            | Pass        |
| 4xx/5xx responses (excluding the deliberate 404 probe)                                 | 0           |
| Prefetch segment requests (`__next.*.txt`)                                             | 34, all 200 |
| Console errors / warnings / hydration warnings                                         | 0           |

`scripts/fix-export-segments.mjs` flattened 7 nested prefetch files per build; without it these
prefetches 404 on Windows builds.

## 5. Head metadata

Compared per route after normalising the origin (`chatgpt.site` → configured `SITE_URL`) and the
hashed hero image path: title, description, robots, theme-color, canonical, `og:title`,
`og:description`, `og:type`, `og:url`, `og:image`, favicon type, `lang`, viewport and the JSON-LD
object are identical on all 7 routes.

Next.js adds, without removing anything: `og:image:width`/`height`, `twitter:*` card tags, a preload
for Inter as well as Manrope, a responsive preload for the hero image (`fetchPriority="high"`), and
`sizes="any"` on the icon link. Robots renders as `noindex, nofollow` (with a space).

## 6. Static checks

- `npm run check` (route typegen + `tsc --noEmit`, ESLint, Prettier): pass.
- `npm run build`: 7 pages + 404 + `robots.txt` + `sitemap.xml` + `icon.svg` exported to `out/`.

## 7. After the production clean-up

The owner-facing disclaimers below were removed on request:

- the footer "Private design concept…" note (every page);
- the "ILLUSTRATIVE SERVICE PHOTOGRAPHY" labels on the home hero and the appliance and plumbing
  photos (alt text still describes the photos as illustrative).

The note's bottom padding moved to `.footer-bottom` (28 px, or 102 px at ≤700 px so the last row
still clears the fixed call bar). The contact-page source note and the FAQ wording "This preview
helps you prepare…" were kept.

Every check above was re-run on the cleaned build, with the same two removals and the moved
padding applied to the legacy page at capture time:

| Check                  | Result                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Pixel diff             | 48/48 captures identical (0 px). Pages are 50–90 px shorter than the original, all at the footer |
| Behaviour              | 56/56 outcomes identical, 13/13 state screenshots 0 px                                           |
| Computed styles        | 7,340 elements; only the two known non-visual differences                                        |
| Navigation             | all checks pass; 0 4xx/5xx; 32 prefetch requests, all 200; 0 console errors                      |
| Head metadata          | identical on all 7 routes                                                                        |
| `npm run check`        | pass                                                                                             |
| `npm audit --omit=dev` | 0 vulnerabilities                                                                                |

`npm audit` including dev dependencies reports 5 high-severity entries, all one chain inside the
linter: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`
(GHSA-vfj7-8cjw-p6xm, stack exhaustion on deeply nested glob patterns). It runs only at lint time
on this repository's own files and is not part of the exported site. npm's suggested fix is a
downgrade to `eslint-config-next@14`, so it was not applied; Dependabot will pick up an upstream fix.
