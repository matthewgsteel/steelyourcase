# DNS Notes

## Current rule

The public site may be broken at the edge, but live Proton mail records are not part of the repair surface.

## Cutover order

1. Finish local visual review.
2. Finish Cloudflare Pages preview review.
3. Finish preview SMTP proof.
4. Only then attach the production custom domain in Cloudflare Pages.
5. Change website records only.
6. Re-check both:
   - `https://steelyourcase.com`
   - `https://www.steelyourcase.com`

## After domain attachment

Verify:

- homepage loads
- major service pages load
- `POST /api/contact` still blocks on failed Turnstile
- assistant stays in `static_rules` mode
- mail probe stays preview-only and is not reachable on production
