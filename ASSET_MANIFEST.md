# Asset Manifest

Date: 2026-06-14

## Active public image assets

| Asset | Size | Public use | Audit note |
| --- | --- | --- | --- |
| `public/images/site-shell-texture.webp` | 1600x1200 | sitewide background texture | Renamed from `privacy-stack.webp` so the public URL no longer carries privacy-stack wording. No broken crop observed. |
| `public/images/hero-home.webp` | 900x1100 | homepage hero art | Tall crop is aggressive on mobile but still reads as intentional, not broken. |
| `public/images/practice-immigration.webp` | 960x720 | homepage immigration card | No broken crop observed in current render. |
| `public/images/practice-credit-repair.webp` | 960x720 | homepage credit card | No broken crop observed in current render. |
| `public/images/practice-traffic-tickets.webp` | 960x720 | homepage traffic card | No broken crop observed in current render. |
| `public/images/practice-notary.webp` | 960x720 | homepage notary card | No broken crop observed in current render. |
| `public/brand/crest-logo.webp` | 720x720 | header, footer, divider | Clean in current render. |
| `public/brand/crest-logo.png` | 720x720 | fallback brand asset | Not directly rendered in reviewed pages. |
| `public/brand/favicon.png` | 256x256 | browser icon | Not part of crop audit. |
| `public/brand/apple-touch-icon.png` | 512x512 | mobile icon | Not part of crop audit. |

## Crop findings

- Weird crops flagged: no
- Rejected assets used: unknown

## Visual notes from current renders

- The asset crops themselves look stable in the reviewed home, contact, immigration, credit, and mobile renders.
- The main visual interference comes from floating UI overlays, not from image crops.
