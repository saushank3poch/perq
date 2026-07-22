import type { Metadata } from "next";
import Link from "next/link";

const GITHUB_TEMPLATE = "https://github.com/saushank3poch/perq/generate";

export const metadata: Metadata = {
  title: "Make Perq yours — Private setup guide",
  description:
    "Create a private Perq tracker for your country and credit cards in three guided steps.",
};

const steps = [
  {
    number: "01",
    title: "Create a private copy",
    body: (
      <>
        Use the button below to open GitHub. Choose an owner and repository name, select
        <strong> Private</strong>, then click <strong>Create repository</strong>.
      </>
    ),
    note: "This keeps your wallet and generated offer data out of the public template.",
  },
  {
    number: "02",
    title: "Open it in Codex",
    body: (
      <>
        Clone or open the new repository in Codex, then ask it to follow
        <code> SITE_PROMPT.md</code>. Perq will show the India demo before changing anything.
      </>
    ),
    note: "The setup prompt contains the source, privacy and deployment guardrails.",
  },
  {
    number: "03",
    title: "Name your country and cards",
    body: (
      <>
        Give Codex your country and exact card variants. It will use official issuer pages to
        build and publish your personal tracker.
      </>
    ),
    note: "No card numbers, credentials or login-only offers are required.",
  },
];

export default function MakeItYours() {
  return (
    <main className="setup-page">
      <header className="site-header setup-header">
        <Link className="brand" href="/" aria-label="Perq home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>Perq</span>
        </Link>
        <Link className="setup-back-link" href="/">← Back to the demo</Link>
      </header>

      <section className="setup-hero" aria-labelledby="setup-title">
        <div className="setup-hero-copy">
          <p className="eyebrow">Open source · Private by design</p>
          <h1 id="setup-title">Make Perq yours in three steps.</h1>
          <p>
            GitHub holds your private copy; Codex personalizes it. You stay in control of the
            cards, generated offers, refresh history and deployment.
          </p>
          <div className="setup-actions">
            <a className="primary-action setup-primary" href={GITHUB_TEMPLATE} target="_blank" rel="noreferrer">
              Create my private Perq on GitHub <span aria-hidden="true">↗</span>
            </a>
            <span>Free · MIT licensed · No card numbers</span>
          </div>
        </div>
        <aside className="setup-promise" aria-label="What the GitHub button does">
          <span className="setup-promise-mark" aria-hidden="true">↗</span>
          <p>What happens when you click?</p>
          <strong>GitHub opens a pre-filled copy form.</strong>
          <span>You are not editing the public Perq repository.</span>
        </aside>
      </section>

      <section className="setup-steps" aria-labelledby="steps-title">
        <div className="setup-steps-heading">
          <p className="eyebrow">The complete setup</p>
          <h2 id="steps-title">From template to your wallet.</h2>
        </div>
        <ol>
          {steps.map((step) => (
            <li key={step.number}>
              <span className="setup-step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <small>{step.note}</small>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="setup-final" aria-labelledby="setup-final-title">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 id="setup-final-title">Start with a private repository.</h2>
          <p>You can delete it at any time. Nothing is added to the public catalogue without your approval.</p>
        </div>
        <a className="primary-action setup-primary" href={GITHUB_TEMPLATE} target="_blank" rel="noreferrer">
          Make it yours <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
