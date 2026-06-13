# Lumo Manual Project Workflow

Launch mode does not call Lumo live. The public assistant stays on:

```text
ASSISTANT_PROVIDER=static_rules
```

## Why

- launch scope is intake routing, not live model output
- privacy review is simpler in `static_rules` mode
- SMTP proof is already the risky launch gate

## If Lumo is enabled later

1. Keep `static_rules` as the safe fallback.
2. Add `LUMO_API_KEY` as a runtime secret only after explicit approval.
3. Switch preview first:

```text
ASSISTANT_PROVIDER=lumo_official_api
```

4. Re-test assistant behavior, rate limiting, and disclaimer handling.
5. Add or expand tests before any production move.

## Non-launch rule

Lumo remains optional and non-launch. Do not combine first-time Lumo enablement with the first production SMTP cutover.
