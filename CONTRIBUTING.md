# Contributing a card source

Perq accepts pull requests that improve `catalogue/cards.json` with reusable card identity and official source links.

Before opening a pull request:

1. Use a stable card ID and the ISO country code.
2. Include only issuer/program-controlled pages. An issuer-linked benefits administrator is acceptable only when an official issuer or program page demonstrates that relationship.
3. Do not include extracted offers, rankings, expiry information, copied page content, card selections, card numbers, credentials, or login-only information.
4. Run `npm run validate:catalogue` and `npm test`.

If Sites helped configure a missing card in a private copy, copy only the reviewed JSON entry into a branch or fork of this public repository. The private repository, generated data, and deployment details must never be attached to the contribution.
