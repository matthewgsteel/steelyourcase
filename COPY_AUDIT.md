# Copy Audit

Date: 2026-06-14

## Fixed in this salvage pass

- Removed the public `/privacy-first-law-firm/` route and all linked CTA, nav, footer, and homepage copy around it.
- Removed public Proton and Lumo product language from active public routes by deleting the only public page that enumerated those tools.
- Changed consultation language from `Schedule` to `Request` so the public site matches the real `request_only` behavior.
- Changed notary CTA language from `Book` to `Request` for the same reason.
- Replaced public-facing `privacy-first` and `operating stack` phrasing with general language such as controlled intake, disciplined records, and clean communication channels.
- Changed the Record Room toggle label from `Privacy-first intake routing` to `Controlled intake routing`.
- Softened the privacy-policy analytics line from marketing-style wording to plain operational wording.

## Flagged and left in place

- The visual direction is still heavy, dramatic, and stylized. That is a design choice, not generic startup copy.
- The floating anthem control and Record Room toggle overlap some rendered views. That is a UI density issue, not a copy issue.

## Quick keyword sweep

No active public route now contains these removed public-facing ideas:

- `privacy-first`
- `Privacy Stack`
- public Proton product lists
- public Lumo positioning
- live scheduling claims

## Internal-only references intentionally preserved

- Proton SMTP runtime code
- Cloudflare SMTP probe notes
- optional future Lumo adapter stub
- internal operating documentation
