# Cloudflare Docs Check

Checked on 2026-06-13 against current official docs and local Wrangler schema.

## Confirmed facts

- Cloudflare Workers TCP sockets support outbound TCP through `cloudflare:sockets`:
  - `connect()`
  - `secureTransport: "off" | "on" | "starttls"`
  - `startTls()` for opportunistic upgrade
  - Doc: https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
- Cloudflare blocks outbound SMTP on port `25`. The SMTP lane must stay on Proton's documented submission ports, not raw port `25`.
- Cloudflare Pages accepts `pages_build_output_dir`, `compatibility_date`, and `compatibility_flags` in `wrangler.jsonc`.
- Pages secret management is handled with `wrangler pages secret ...` or the Cloudflare dashboard, not a `secrets` block in `wrangler.jsonc`.
- Pages Functions can use runtime env bindings and should keep secrets out of source control.

## SMTP runtime risk

The risk is not "Can Proton do SMTP?" The risk is "Can a Pages Function on the Workers runtime complete a real Proton SMTP flow with TCP sockets, STARTTLS, auth, and DATA send in preview?"

That is why this project ships three transport modes:

- `mock`
- `proton_smtp`
- `disabled`

And that is why production is blocked on a preview-only proof endpoint.

## Required stop gate

Before any production move:

1. Deploy a Cloudflare Pages preview.
2. Load real Proton SMTP secrets into the preview environment.
3. Call `POST /api/internal/mail-probe` with `Authorization: Bearer <MAIL_PROBE_TOKEN>`.
4. Confirm:
   - socket open succeeds
   - `EHLO` succeeds
   - `STARTTLS` succeeds on port `587`
   - auth succeeds
   - `MAIL FROM`, `RCPT TO`, and `DATA` succeed
   - the destination inbox actually receives the message

If any of those fail, stop and replace the plan instead of forcing production.

## Official references

- Cloudflare TCP sockets:
  - https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
- Cloudflare Pages Functions:
  - https://developers.cloudflare.com/pages/functions/
- Wrangler Pages commands:
  - https://developers.cloudflare.com/workers/wrangler/commands/pages/
- Wrangler configuration:
  - https://developers.cloudflare.com/workers/wrangler/configuration/
