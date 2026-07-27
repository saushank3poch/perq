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

## Daily browser notification

Perq can send one opt-in browser alert each day with offers starting or ending that day, including an all-clear when there are no matches. The site must be open; if the browser suspends the tab at the scheduled time, Perq sends the missed alert when the tab becomes active again that day.

The template defaults to `12:00` in `Asia/Kolkata`. Change `time` or `timeZone` in [app/notification-config.ts](app/notification-config.ts) for a private copy. Use 24-hour `HH:MM` format (`00`–`23` hours and `00`–`59` minutes) and an IANA time zone such as `Asia/Kolkata`. Invalid settings pause alerts and show a configuration error without hiding the catalogue. Each browser user must select **Enable alerts** once and grant notification permission. Selecting an alert opens the durable Today view at `/?view=today#catalogue`.

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
