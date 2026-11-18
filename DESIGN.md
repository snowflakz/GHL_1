# DESIGN.md

Design source of truth for the HighLevel bootcamp affiliate site (landing page + `/blog` guides).
Tokens live in `src/styles.css` (`:root` and `@theme inline`).

## Colour: one job per colour

| Token | Value | Job |
| --- | --- | --- |
| `--background` | `oklch(0.14 0.02 260)` | Deep navy page. Matches the dark field the HighLevel logo is designed on. |
| `--primary` | `oklch(0.68 0.19 250)` | Blue. **Action colour only**: CTA buttons, links, focus rings. Taken from the logo's blue arrow. |
| `--primary-glow` | `oklch(0.82 0.14 210)` | Cyan. Pairs with blue in the CTA gradient and labels. |
| `--violet` | `oklch(0.72 0.18 295)` | **Supporting colour (added 2026-11-18).** Job: depth and highlight: headline accent gradients, section numbers, pull-quote rules, reading progress, background glows, the AI category. Never used on buttons, so every CTA keeps reading as "blue = act". |
| `--accent` | `oklch(0.85 0.17 90)` | Yellow, from the logo. Badges ("FREE BONUS"), stars, tips. |
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
