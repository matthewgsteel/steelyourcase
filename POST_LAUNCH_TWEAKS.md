# Post-Launch Tweak Map

Use this file as the fastest path for pointed changes after launch.

## Most common edits

- Wording, capitalization, button labels, practice summaries, disclaimers, and most page copy:
  - `src/lib/site.ts`
- Contact form labels, dropdown values, intake wording, and consent text:
  - `src/lib/forms.ts`
- Global fonts, color palette, spacing, button styles, and most sitewide visual treatment:
  - `src/styles/global.css`
- Record Room assistant look and spacing:
  - `src/styles/assistant.css`
- Anthem player look and spacing:
  - `src/styles/anthem.css`
- Sitewide shell, favicon, and Turnstile site-key wiring:
  - `src/layouts/BaseLayout.astro`

## Page-level edits

- Home page section order and module selection:
  - `src/pages/index.astro`
- Contact page structure:
  - `src/pages/contact.astro`
- About page:
  - `src/pages/about.astro`
- Practice landing pages and deeper service pages:
  - `src/pages/immigration/*`
  - `src/pages/credit-repair/*`
  - `src/pages/traffic-tickets/*`
  - `src/pages/notary/*`
  - `src/pages/privacy-first-law-firm.astro`

## Fonts

Current font imports and sitewide font variables live in:

- `src/styles/global.css`

Current families:

- Display: `Cinzel`
- Accent serif: `Cormorant Garamond`
- Body: `Inter`

If you want different fonts later, change the imports at the top of `src/styles/global.css` and then update:

- `--font-display`
- `--font-accent`
- `--font-body`

## Images and branding

- Logos and icons:
  - `public/brand/*`
- Homepage and practice images:
  - `public/images/*`

## Safe workflow for small corrections

1. Edit the target file above.
2. Run `npm run check`
3. Run `npm run build`
4. If the change is visual, run `npm run render:visuals`
5. Commit and push to `main`

## Notes

- The public assistant is intentionally launch-locked to `static_rules`.
- Proton SMTP proof stays behind the preview probe gate until real secrets are loaded and verified.
