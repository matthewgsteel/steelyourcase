# Patch Report

- public privacy-stack page removed: yes
- `/privacy-policy/` preserved: yes
- Proton public product content removed: yes
- Proton operating docs preserved/created: yes
- Calendar integration exists: no
- Meet integration exists: no
- scheduling added: no
- weird crops flagged: no
- off-brand copy flagged/fixed: yes
- rejected assets used: unknown
- check result: pass
- test result: pass
- build result: pass
- render result: pass
- deployed: no
- visual editor plan created: yes
- CloudCannon pilot implemented: yes
- custom builder created: no
- implementation performed: yes, narrow pilot only
- recommended platform: CloudCannon
- current Astro site can be adapted: yes for a narrow CloudCannon pilot
- full rebuild actually required: no for CloudCannon path; likely yes for a true Webflow-style builder-first path

## Notes

- The public route count dropped from 27 to 26 after removing `/privacy-first-law-firm/`.
- The public site now stays on general language such as secure systems, controlled intake, disciplined records, and clean communication channels.
- The render script was patched to wait on `domcontentloaded` plus a short settle period instead of Playwright `networkidle`.
- The visual-editor decision memo is in `CMS_VISUAL_EDITOR_PLAN.md` and recommended a narrow CloudCannon pilot before any more broad polish.
- That pilot is now wired for `/`, `/about/`, `/contact/`, and `/immigration/` through CloudCannon collections, editable regions, and registered Astro components without changing the existing contact form, Turnstile, or Proton SMTP route.
