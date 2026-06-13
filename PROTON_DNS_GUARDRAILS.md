# Proton DNS Guardrails

This site launch must not damage live Proton mail flow.

## Untouchable records

Do not delete, replace, or casually edit any live Proton-related records for:

- MX
- SPF
- DKIM
- DMARC
- Proton domain verification TXT records
- SimpleLogin or alias-routing records, if present
- Any existing mail autodiscovery or mail-submission records already in use

## Safe scope for website launch

Only website-serving records for the public site should change during Cloudflare Pages cutover, and only after launch gates pass.

That means:

- web root or apex records for `steelyourcase.com`
- `www` records for `www.steelyourcase.com`

Mail records are out of scope for this rollout.

## Change rule

If a proposed DNS change touches mail delivery in any way, stop and review it manually before applying anything.
