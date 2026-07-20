# Perq

Perq is a private, personal credit-card tracker. It turns official card pages into a simple ranked view of offers, card benefits, memberships, rewards and expirations.

This repository is a **GitHub Template**. The included India tracker is a working, dated demo—not a shared offer database.

## Make your private tracker

1. Click **Use this template** on GitHub and create a **private** repository.
2. Open that repository in Codex with Sites and ask it to follow [SITE_PROMPT.md](SITE_PROMPT.md).
3. Confirm your country and exact card variants. Sites will use the community catalogue and official pages to create your private data and deployment.

Your wallet, generated offers and refresh history belong in your private copy. Do not make that repository or its deployment public unless you are comfortable sharing them.

## Community catalogue

[catalogue/cards.json](catalogue/cards.json) is the canonical public community catalogue. It contains only:

- card identity
- country and issuer
- official card, benefit, offer, event and reward-program pages

It never contains extracted offers, rankings, expiry state, a user's cards, card numbers, credentials, or login-only content. A private copy checks this source during refresh only to discover official pages; it does not import another person's data.

## Refreshing your private copy

The setup prompt can create a daily Codex automation using [prompts/daily-refresh.md](prompts/daily-refresh.md). It checks the community catalogue and public official sources, preserves trusted entries when a check is blocked or unclear, archives confirmed expirations, validates the tracker, and publishes only a successful refresh.

You can also use that prompt manually whenever you want a refresh.

## Contributing sources

If a card is missing, Sites can first set it up privately from official URLs. It can then prepare a minimal, sanitized catalogue entry for you to review. Nothing is submitted without your approval.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the rules and run:

```bash
npm run validate:catalogue
npm test
```

## Local development

```bash
npm install
npm run dev
```

The app uses the existing vinext/Sites setup. A template copy creates its own Sites project on first private deployment; no shared project ID is included here.

## License

[MIT](LICENSE)
