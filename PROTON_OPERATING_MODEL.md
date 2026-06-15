# Proton Operating Model

This file is internal-only. It documents how Proton-related tools fit the operating model without turning them into public website content.

## Public site rule

Proton is operating infrastructure, not public marketing copy.

Keep Proton out of the public website as:

- product cards
- feature grids
- public privacy-stack pages
- Proton Calendar or Proton Meet claims
- Proton Drive, Docs, or Sheets portal claims
- Proton Pass client login claims
- Proton Wallet or payment claims
- Lumo backend claims

Public-facing language may stay general:

- secure systems
- controlled intake
- disciplined records
- clean communication channels
- privacy-conscious operations

## Internal operating lanes

- Proton Mail and SMTP: business mail delivery and the Cloudflare SMTP proof lane
- Proton Bridge: optional local desktop mail workflow when needed
- Proton Calendar and Meet equivalents: internal consultation coordination only
- Proton Drive and document tooling: internal file custody and drafting only
- Proton Pass and related credential tools: internal access control only
- Lumo or other AI adapters: future-only, non-launch, attorney-reviewed

## Scheduling status

- Default mode: `request_only`
- Public consultation CTAs route to `/contact/`
- No live public Calendar integration
- No live public Meet integration
- No embedded scheduler

## Mail lane

- Cloudflare Pages preview is the proof gate for SMTP
- Proton SMTP stays documented in `CLOUDFLARE_DOCS_CHECK.md`
- Operational DNS guardrails stay documented in `PROTON_DNS_GUARDRAILS.md`
- No secrets belong in the repo

## Architecture note

The public site is allowed to describe disciplined intake and secure handling in general terms. Specific Proton product naming stays in internal docs, setup notes, and operational architecture only.
