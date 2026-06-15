# SteelYourCase

Static-first Astro site for `steelyourcase.com`, prepared for Cloudflare Pages with Pages Functions, preview gating, and a probe-gated Proton SMTP lane.

## What is included

- Public marketing and intake pages for immigration, credit repair, traffic tickets, notary, and multilingual routing.
- `POST /api/contact` with Turnstile verification before mail handling.
- `POST /api/assistant` locked to `static_rules` mode for launch.
- `POST /api/internal/mail-probe` for preview-only Proton SMTP proof.
- Mock, disabled, and Worker-native Proton SMTP transport modes.
- Local screenshot tooling for visual review.
- Internal Proton operating notes in `PROTON_OPERATING_MODEL.md`.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the env examples:

```bash
copy .env.example .env
copy .dev.vars.example .dev.vars
```

3. Keep local mail in mock mode:

```text
MAIL_TRANSPORT_MODE=mock
ASSISTANT_PROVIDER=static_rules
```

4. Start local Astro development:

```bash
npm run dev
```

## Verification commands

```bash
npm run check
npm test
npm run build
npm run render
```

If Playwright browsers are missing:

```bash
npm run render:visuals:install
```

## Cloudflare launch notes

- `wrangler.jsonc` is the non-secret Pages config source of truth.
- Runtime secrets stay out of the repo. Set them in Cloudflare Pages or local `.dev.vars`.
- Build-time `TURNSTILE_SITE_KEY` should be set in `.env` locally and as a Pages build variable in Cloudflare.
- Do not move to production until all three gates pass:
  - Gate 1: local visual approval
  - Gate 2: Cloudflare Pages preview approval
  - Gate 2b: preview-only Proton SMTP proof through `/api/internal/mail-probe`

## Mail stop gate

`MAIL_TRANSPORT_MODE=proton_smtp` is not a launch default. It must only be enabled on preview after:

1. Real Proton SMTP secrets are loaded.
2. The preview-only probe endpoint completes a real authenticated send.
3. The controlled probe message arrives in the destination mailbox.

If preview SMTP fails at socket open, TLS upgrade, auth, or DATA send, stop the rollout and re-plan. Do not swap providers live and do not cut over production anyway.
