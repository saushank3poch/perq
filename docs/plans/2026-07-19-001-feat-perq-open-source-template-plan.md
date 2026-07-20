---
title: Perq Open-Source Template
type: feat
status: active
date: 2026-07-19
origin: docs/brainstorms/2026-07-19-perq-open-source-template-requirements.md
---

# Perq Open-Source Template

## Goal

Make the current Perq repository a GitHub Template that people can copy into a private repository and personalize through one Sites prompt. Keep the India tracker as a dated demo; share only card identities and official source pages through the community catalogue.

## U1. Add the community catalogue

**Files**

- Create `catalogue/cards.json`
- Create `catalogue/README.md`
- Modify `app/page.tsx`

**Work**

- Add the four current cards with stable IDs, country, issuer and typed official URLs.
- Do not include extracted offers, rankings, expiry state or wallet selections.
- Keep the existing offer modules in place as the non-canonical India demo and label the demo and its checked date clearly in the UI.

**Done when**

- The tracker works exactly as it does today.
- The catalogue contains source metadata only.

## U2. Add the Sites prompts

**Files**

- Create `SITE_PROMPT.md`
- Create `prompts/daily-refresh.md`
- Modify `.openai/hosting.json`

**Work**

- Ask for country and exact card variants, look them up in the community catalogue and replace unselected demo data in the user's private copy.
- Let missing cards work immediately from user-provided official pages.
- Prepare and show a sanitized catalogue contribution, but submit it only after explicit user approval.
- Offer to create a daily Codex automation that checks the upstream catalogue and official pages, preserves trusted data when checks fail, archives confirmed expirations, validates and then deploys privately.
- Remove the maintainer's Sites project ID so every private copy creates its own deployment.

**Done when**

- A new user can personalize and privately deploy Perq primarily by following `SITE_PROMPT.md`.
- Refresh failures leave the last trusted tracker intact.

## U3. Add validation and contribution guidance

**Files**

- Create `scripts/validate-catalogue.mjs`
- Create `tests/catalogue.test.mjs`
- Create `CONTRIBUTING.md`
- Create `.github/pull_request_template.md`
- Modify `package.json`

**Work**

- Reject duplicate IDs, invalid URLs, unsupported schema versions and generated-offer or wallet fields.
- Document the official-source rule, including issuer-linked benefit administrators whose relationship can be verified from an official page.
- Ensure contributions contain only the exact public payload reviewed by the user.

**Done when**

- Valid source additions pass and personal/generated data is rejected.

## U4. Publish as a GitHub Template

**Files**

- Create `LICENSE` using MIT
- Create `.github/workflows/ci.yml`
- Rewrite `README.md`
- Update `tests/rendered-html.test.mjs`

**Work**

- Make the README path: create a private repository with **Use this template**, then ask Sites to follow `SITE_PROMPT.md`.
- Run catalogue validation, existing tests and the production build in CI.
- Enable GitHub's **Template repository** setting.
- Smoke-test a fresh private copy and confirm it has no maintainer project ID, keeps the India demo and can create its own private Site.

**Done when**

- A clean private template copy can be personalized without exposing the user's wallet or depending on the original deployment.

## Not in this implementation

- Database or authentication refactors.
- Runtime scraping infrastructure.
- Automatic public contributions.
- Automatic application-code updates for existing private copies.
- Exhaustive country coverage or a central offer database.

## References

- `docs/brainstorms/2026-07-19-perq-open-source-template-requirements.md`
- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
