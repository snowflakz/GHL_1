# DESIGN.md

Design source of truth for the NuvoraCore site (HighLevel affiliate: landing page + `/blog` guides).
Tokens live in `src/styles.css` (`:root` and `@theme inline`).

## Brand (updated 2026-11-21)
- Brand is **NuvoraCore** ("Connect. Automate. Grow."). Logo files live in `public/brand/` and render through
  `src/components/site/BrandLogo.tsx`: header = mark + wordmark (177×32, WebP + PNG, 1x/2x); footer = lockup with tagline.
- The logo was cut out of the supplied raster (smoky background removed). The "A GoHighLevel Affiliate Partner" line
  was left out because it contains the HighLevel logo.
- Hard rule: never use the HighLevel logo or HighLevel's colours as a brand identity. The tri-colour dash on blog
  covers is NuvoraCore blue / violet / orange, and the accent token moved from yellow to NuvoraCore orange.
- Browser tab titles lead with the brand and stay evergreen (no trial length in `<title>`).

## Colour: one job per colour

| Token | Value | Job |
| --- | --- | --- |
| `--background` | `oklch(0.14 0.02 260)` | Deep navy page. Matches the dark field the HighLevel logo is designed on. |
| `--primary` | `oklch(0.68 0.19 250)` | Blue. **Action colour only**: CTA buttons, links, focus rings. Taken from the logo's blue arrow. |
| `--primary-glow` | `oklch(0.82 0.14 210)` | Cyan. Pairs with blue in the CTA gradient and labels. |
| `--violet` | `oklch(0.72 0.18 295)` | **Supporting colour (added 2026-11-18).** Job: depth and highlight: headline accent gradients, section numbers, pull-quote rules, reading progress, background glows, the AI category. Never used on buttons, so every CTA keeps reading as "blue = act". |
| `--accent` | `oklch(0.79 0.16 62)` | NuvoraCore orange (from the logo's N accent). Badges ("FREE BONUS"), tips. |
| `--success` | `oklch(0.75 0.17 150)` | Green, from the logo. Ticks, "live" dots, key takeaways. |
| `--destructive` | `oklch(0.65 0.21 25)` | Red. The "trying alone" crosses only. |

Gradients:
- `--gradient-primary` (blue → cyan): CTA buttons and icon tiles.
- `--gradient-spectrum` (cyan → blue → violet): text highlights, section numbers, quotes, progress bar.

**Why violet:** the logo gives blue, yellow and green. The page needed a second cool tone for depth that
doesn't compete with yellow badges or blue buttons. Violet sits beside blue on the colour wheel, so blends
stay smooth, and its contrast on the navy background is about 7:1 (passes WCAG AA for text).

## Type
- Display: Space Grotesk (headings, numbers). Body: DM Sans. Both kept from the original build.
- Article body: 18px phone → 19px tablet → 20px desktop, 1.78 line height, ~72ch measure.

## Motion (Emil Kowalski rules)
- Transform and opacity only, strong ease-out `cubic-bezier(.23,1,.32,1)`.
- Scroll reveals are pure CSS (`animation-timeline: view()`), so no JS state and nothing stuck hidden.
- Page changes cross-fade (View Transitions); exit 160ms, enter 320ms.
- Hover lift only on `(hover: hover) and (pointer: fine)`; buttons scale to 0.97 on press.
- `prefers-reduced-motion`: no movement anywhere.
- Added 2026-11-20: hero children rise in sequence on load (70ms steps); photos unveil with a clip-path
  wipe as they scroll in; the step timeline's connector draws on scroll; primary buttons get a single light
  sweep on hover (desktop only, never looping); guide cards lift with a gradient border glow and a cover sweep.

## Navigation and links
- Header is sticky on every page, with a solid gradient trial button (visible on phones as "Free trial").
- Nav links are 15px at 80% white, with full 44px tap targets and a pill hover; never small grey text.
- One shared footer (`components/site/SiteFooter.tsx`): Start here / Popular guides / Explore columns plus the
  main offer as a button, so visitors who reach the bottom always have a clear next click.
- Guides get Back + Home buttons, social sharing (WhatsApp, Facebook, X, LinkedIn, email, copy link, native share
  on phones) and floating controls (all guides, home, previous/next section, top).

## Imagery
- Covers: custom SVG illustrations (`public/blog/*.svg`) with PNG share images (`public/blog/og/`).
- Photos: one relatable photo per guide from Pixabay (Pixabay Content License: free commercial use, no
  attribution required; each is credited and linked anyway). Sources are listed in `src/content/photos.ts`.
- Video: the bootcamp explainer (YouTube `ICBwheORWVs`) loads as a local poster image and only fetches
  YouTube (privacy-enhanced domain) when someone presses play.
