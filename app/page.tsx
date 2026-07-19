"use client";

import { useEffect, useMemo, useState } from "react";
import {
  timesBlackBenefits,
  timesBlackSectionOrder,
  type TimesBlackBenefitSection,
} from "./times-black-benefits";

type CardId = "times" | "amex" | "infinia" | "emirates";
type Category = "All" | "Travel" | "Dining" | "Shopping" | "Rewards";
type BenefitSectionFilter = "ALL" | TimesBlackBenefitSection;

type Card = {
  id: CardId;
  short: string;
  name: string;
  issuer: string;
  accent: string;
};

type Offer = {
  id: string;
  cardId: CardId;
  merchant: string;
  title: string;
  value: string;
  valueAmount: number;
  category: Exclude<Category, "All">;
  expiry?: string;
  expiryLabel: string;
  plainEnglish: string;
  important: string;
  source: string;
};

const cards: Card[] = [
  {
    id: "times",
    short: "TB",
    name: "Times Black",
    issuer: "ICICI Bank",
    accent: "card-times",
  },
  {
    id: "amex",
    short: "AX",
    name: "Platinum Card",
    issuer: "American Express",
    accent: "card-amex",
  },
  {
    id: "infinia",
    short: "IN",
    name: "Infinia Metal",
    issuer: "HDFC Bank",
    accent: "card-infinia",
  },
  {
    id: "emirates",
    short: "EK",
    name: "Emirates Emeralde",
    issuer: "ICICI Bank",
    accent: "card-emirates",
  },
];

const offers: Offer[] = [
  {
    id: "amex-imperial",
    cardId: "amex",
    merchant: "The Imperial",
    title: "Save on a luxury stay before July ends",
    value: "25% off",
    valueAmount: 0,
    category: "Travel",
    expiry: "2026-07-31",
    expiryLabel: "Ends 31 Jul",
    plainEnglish: "Book and pay with your Platinum Card before the offer closes.",
    important: "Eligible rates and dates vary. Check participating-rate terms before booking.",
    source: "https://www.americanexpress.com/en-in/benefits/amex-offers/offers/charge-platinum/travel.html",
  },
  {
    id: "amex-paul",
    cardId: "amex",
    merchant: "Paul Hotels & Resorts",
    title: "A straightforward hotel-rate discount",
    value: "20% off",
    valueAmount: 0,
    category: "Travel",
    expiry: "2026-08-31",
    expiryLabel: "Ends 31 Aug",
    plainEnglish: "Use Amex Platinum when booking the eligible best available rate.",
    important: "Availability and participating properties apply; pay in full with the eligible card.",
    source: "https://www.americanexpress.com/en-in/benefits/amex-offers/offers/charge-platinum/travel.html",
  },
  {
    id: "amex-cathay",
    cardId: "amex",
    merchant: "Cathay Pacific",
    title: "Biggest visible flight discount",
    value: "₹20,000 off",
    valueAmount: 20000,
    category: "Travel",
    expiry: "2027-04-30",
    expiryLabel: "Ends 30 Apr 2027",
    plainEnglish: "If an eligible Cathay flight fits your plans, this is the first card to check.",
    important: "Booking channel, fare, route and minimum-spend conditions may apply.",
    source: "https://www.americanexpress.com/en-in/benefits/amex-offers/offers/charge-platinum/travel.html",
  },
  {
    id: "amex-taj",
    cardId: "amex",
    merchant: "Taj Hotels",
    title: "Suite savings at select Taj properties",
    value: "25% off",
    valueAmount: 0,
    category: "Travel",
    expiry: "2026-12-31",
    expiryLabel: "Ends 31 Dec",
    plainEnglish: "Useful when you want a suite—not automatically the cheapest Taj rate.",
    important: "Select suites and properties only; a minimum two-night stay and availability rules apply.",
    source: "https://www.americanexpress.com/en-in/benefits/amex-offers/offers/charge-platinum/travel.taj.html",
  },
  {
    id: "amex-wednesday",
    cardId: "amex",
    merchant: "District / Zomato",
    title: "Make Wednesday your dining day",
    value: "25% off",
    valueAmount: 10000,
    category: "Dining",
    expiryLabel: "Check monthly",
    plainEnglish: "Use Amex Platinum on eligible Wednesday bookings; savings can reach ₹10,000 a month.",
    important: "Eligible restaurants, booking slots and monthly caps apply.",
    source: "https://www.americanexpress.com/en-in/benefits/amex-offers/offers/charge-platinum/dining.html",
  },
  {
    id: "times-lohono",
    cardId: "times",
    merchant: "Lohono Stays / EaseMyTrip",
    title: "Pick the travel voucher you will actually use",
    value: "Up to ₹12,000",
    valueAmount: 12000,
    category: "Travel",
    expiryLabel: "Member benefit",
    plainEnglish: "Choose ₹12,000 at Lohono or ₹10,000 at EaseMyTrip—do not claim both.",
    important: "Choice benefit; redemption windows and eligible bookings apply in the Times Black app.",
    source: "https://www.timesblack.com/benefits",
  },
  {
    id: "times-visa",
    cardId: "times",
    merchant: "OneVasco",
    title: "Use your visa-service credits before paying cash",
    value: "₹10,000 value",
    valueAmount: 10000,
    category: "Travel",
    expiryLabel: "Member benefit",
    plainEnglish: "Check the included doorstep-visa services and lounge access first.",
    important: "Covered services and destinations vary; book through the designated benefit flow.",
    source: "https://www.timesblack.com/benefits",
  },
  {
    id: "times-klook",
    cardId: "times",
    merchant: "Klook",
    title: "Milestone reward for travel experiences",
    value: "₹10,000 voucher",
    valueAmount: 10000,
    category: "Rewards",
    expiryLabel: "After ₹2L annual spend",
    plainEnglish: "Worth tracking only if you are naturally close to the ₹2 lakh annual milestone.",
    important: "Do not spend extra just to unlock it; claim and usage windows apply.",
    source: "https://www.timesblack.com/benefits",
  },
  {
    id: "infinia-rewards",
    cardId: "infinia",
    merchant: "HDFC SmartBuy",
    title: "Your default card for accelerated points",
    value: "Up to 10× points",
    valueAmount: 0,
    category: "Rewards",
    expiryLabel: "Ongoing benefit",
    plainEnglish: "Start on SmartBuy for eligible travel or shopping instead of paying the merchant directly.",
    important: "Merchant multipliers, monthly caps and excluded transactions apply.",
    source: "https://www.hdfc.bank.in/credit-cards/infinia-credit-card",
  },
  {
    id: "infinia-itc",
    cardId: "infinia",
    merchant: "ITC Hotels",
    title: "Stay three nights and pay for two",
    value: "1 night free",
    valueAmount: 0,
    category: "Travel",
    expiryLabel: "Ongoing benefit",
    plainEnglish: "Strong value for an eligible three-night stay; weak value if you only need two nights.",
    important: "Participating hotels, eligible rates and booking-channel rules apply.",
    source: "https://www.hdfc.bank.in/credit-cards/infinia-credit-card",
  },
  {
    id: "infinia-lounge",
    cardId: "infinia",
    merchant: "Global airport lounges",
    title: "Use the lounge benefit you already pay for",
    value: "Unlimited visits",
    valueAmount: 0,
    category: "Travel",
    expiryLabel: "Ongoing benefit",
    plainEnglish: "Primary and add-on cardholders can use eligible domestic and international lounges.",
    important: "Present the correct card or Priority Pass for the lounge and region; guest fees can apply.",
    source: "https://www.hdfc.bank.in/credit-cards/infinia-credit-card",
  },
  {
    id: "emirates-flight",
    cardId: "emirates",
    merchant: "Emirates",
    title: "Check this before booking an Emirates flight",
    value: "Up to 10% off",
    valueAmount: 0,
    category: "Travel",
    expiryLabel: "Promo INICI26",
    plainEnglish: "Book on Emirates and test code INICI26 before comparing the final fare elsewhere.",
    important: "Eligible routes, travel dates, cabins and fare conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
  },
  {
    id: "emirates-miles",
    cardId: "emirates",
    merchant: "Emirates Skywards",
    title: "Do not miss the annual-renewal miles",
    value: "10,000 miles",
    valueAmount: 0,
    category: "Rewards",
    expiryLabel: "On annual renewal",
    plainEnglish: "Confirm the miles land after renewal and keep your Skywards account linked.",
    important: "Annual fee, account status and issuer fulfilment conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
  },
  {
    id: "emirates-movies",
    cardId: "emirates",
    merchant: "BookMyShow",
    title: "Movie benefit available four times a month",
    value: "Up to ₹750 off",
    valueAmount: 750,
    category: "Shopping",
    expiryLabel: "4× each month",
    plainEnglish: "Buy one eligible ticket and use the card for up to ₹750 off the second.",
    important: "Monthly usage, ticket, show and platform restrictions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
  },
];

const categories: Category[] = ["All", "Travel", "Dining", "Shopping", "Rewards"];
const allCardIds = cards.map((card) => card.id);
const DAY = 1000 * 60 * 60 * 24;

function daysUntil(expiry?: string) {
  if (!expiry) return Number.POSITIVE_INFINITY;
  return Math.ceil((new Date(`${expiry}T23:59:59+05:30`).getTime() - Date.now()) / DAY);
}

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export default function Home() {
  const [selectedCards, setSelectedCards] = useState<CardId[]>(allCardIds);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [savedOffers, setSavedOffers] = useState<string[]>([]);
  const [benefitSection, setBenefitSection] = useState<BenefitSectionFilter>("ALL");
  const [benefitQuery, setBenefitQuery] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedCards = window.localStorage.getItem("perq-selected-cards");
    const storedOffers = window.localStorage.getItem("perq-saved-offers");

    try {
      if (storedCards) {
        const parsed = JSON.parse(storedCards) as CardId[];
        const valid = parsed.filter((id) => allCardIds.includes(id));
        if (valid.length) setSelectedCards(valid);
      }
      if (storedOffers) setSavedOffers(JSON.parse(storedOffers));
    } catch {
      window.localStorage.removeItem("perq-selected-cards");
      window.localStorage.removeItem("perq-saved-offers");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("perq-selected-cards", JSON.stringify(selectedCards));
  }, [ready, selectedCards]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("perq-saved-offers", JSON.stringify(savedOffers));
  }, [ready, savedOffers]);

  const visibleOffers = useMemo(() => {
    const filtered = offers.filter(
      (offer) =>
        selectedCards.includes(offer.cardId) &&
        (activeCategory === "All" || offer.category === activeCategory),
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "expiry") return daysUntil(a.expiry) - daysUntil(b.expiry);
      if (sortBy === "value") return b.valueAmount - a.valueAmount;
      const aUrgency = daysUntil(a.expiry) <= 60 ? 1 : 0;
      const bUrgency = daysUntil(b.expiry) <= 60 ? 1 : 0;
      return bUrgency - aUrgency || b.valueAmount - a.valueAmount;
    });
  }, [activeCategory, selectedCards, sortBy]);

  const expiringSoon = visibleOffers.filter((offer) => {
    const days = daysUntil(offer.expiry);
    return days >= 0 && days <= 60;
  }).length;

  const strongestVisible = visibleOffers.reduce(
    (highest, offer) => Math.max(highest, offer.valueAmount),
    0,
  );

  const visibleTimesBenefits = useMemo(() => {
    const query = benefitQuery.trim().toLocaleLowerCase("en-IN");

    return timesBlackBenefits.filter((benefit) => {
      const matchesSection = benefitSection === "ALL" || benefit.section === benefitSection;
      const haystack = `${benefit.merchant} ${benefit.title} ${benefit.tag ?? ""}`.toLocaleLowerCase(
        "en-IN",
      );
      return matchesSection && (!query || haystack.includes(query));
    });
  }, [benefitQuery, benefitSection]);

  const toggleCard = (cardId: CardId) => {
    setSelectedCards((current) => {
      if (current.includes(cardId)) {
        if (current.length === 1) return current;
        return current.filter((id) => id !== cardId);
      }
      return [...current, cardId];
    });
  };

  const toggleSaved = (offerId: string) => {
    setSavedOffers((current) =>
      current.includes(offerId)
        ? current.filter((id) => id !== offerId)
        : [...current, offerId],
    );
  };

  const scrollToOffers = () => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Perq home">
          <span className="brand-mark" aria-hidden="true">
            P
          </span>
          <span>Perq</span>
        </a>
        <div className="country-control">
          <label htmlFor="country">Offers for</label>
          <select id="country" defaultValue="india" aria-label="Country">
            <option value="india">🇮🇳 India</option>
            <option value="singapore" disabled>
              Singapore — soon
            </option>
            <option value="uae" disabled>
              UAE — soon
            </option>
          </select>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Your cards. Their best perks.</p>
          <h1 id="hero-title">All your card offers, without the fine print.</h1>
          <p className="hero-subtitle">
            Pick the cards in your wallet. Perq turns scattered issuer offers into a
            short, useful answer: what you save, which card to use, and what could
            trip you up.
          </p>
          <button className="primary-action" type="button" onClick={scrollToOffers}>
            Show my best offers <span aria-hidden="true">↓</span>
          </button>
          <p className="source-note">Curated from official issuer pages · Checked 19 Jul 2026</p>
        </div>

        <div className="hero-deal" aria-label="Top offer preview">
          <div className="deal-sun" aria-hidden="true" />
          <p className="deal-kicker">Best visible saving</p>
          <strong>₹20,000</strong>
          <p>off an eligible Cathay Pacific booking with Amex Platinum</p>
          <div className="mini-card" aria-hidden="true">
            <span>AMEX</span>
            <b>PLATINUM</b>
          </div>
          <span className="deal-tag">Flight plan? Check this first.</span>
        </div>
      </section>

      <section className="wallet-section" aria-labelledby="wallet-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Step 1</p>
            <h2 id="wallet-title">What’s in your wallet?</h2>
          </div>
          <p>Select or remove cards. We remember this on your device.</p>
        </div>

        <div className="card-picker" role="group" aria-label="Your credit cards">
          {cards.map((card) => {
            const selected = selectedCards.includes(card.id);
            return (
              <button
                className={`wallet-card ${card.accent} ${selected ? "is-selected" : ""}`}
                key={card.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCard(card.id)}
              >
                <span className="wallet-card-check" aria-hidden="true">
                  {selected ? "✓" : "+"}
                </span>
                <span className="wallet-card-short">{card.short}</span>
                <span className="wallet-card-name">{card.name}</span>
                <span className="wallet-card-issuer">{card.issuer}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="offers-section" id="offers" aria-labelledby="offers-title">
        <div className="offers-intro">
          <div>
            <p className="eyebrow">Step 2</p>
            <h2 id="offers-title">Featured offers worth knowing about</h2>
          </div>
          <div className="offer-stats" aria-label="Offer summary" aria-live="polite">
            <span><strong>{visibleOffers.length}</strong> matches</span>
            <span><strong>{expiringSoon}</strong> ending soon</span>
            <span>
              <strong>{strongestVisible ? `₹${strongestVisible.toLocaleString("en-IN")}` : "—"}</strong>
              top saving
            </span>
          </div>
        </div>

        <div className="filter-bar">
          <div className="category-tabs" role="group" aria-label="Offer categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="sort-control">
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="expiry">Expiring soon</option>
              <option value="value">Highest rupee value</option>
            </select>
          </label>
        </div>

        {visibleOffers.length ? (
          <div className="offer-grid">
            {visibleOffers.map((offer) => {
              const card = cards.find((item) => item.id === offer.cardId)!;
              const saved = savedOffers.includes(offer.id);
              const urgent = daysUntil(offer.expiry) >= 0 && daysUntil(offer.expiry) <= 60;

              return (
                <article className="offer-card" key={offer.id}>
                  <div className="offer-card-topline">
                    <span className={`card-chip ${card.accent}`}>{card.short}</span>
                    <span className="offer-category">{offer.category}</span>
                    <button
                      type="button"
                      className={`save-button ${saved ? "saved" : ""}`}
                      aria-label={`${saved ? "Remove" : "Save"} ${offer.merchant} offer`}
                      aria-pressed={saved}
                      onClick={() => toggleSaved(offer.id)}
                    >
                      {saved ? "Saved ✓" : "Save +"}
                    </button>
                  </div>
                  <div className="offer-value">{offer.value}</div>
                  <p className="offer-merchant">{offer.merchant}</p>
                  <h3>{offer.title}</h3>
                  <div className="plain-answer">
                    <span>Use {card.name}</span>
                    <p>{offer.plainEnglish}</p>
                  </div>
                  <div className="offer-footer">
                    <span className={urgent ? "expiry urgent" : "expiry"}>
                      {urgent ? "Clock’s ticking · " : ""}{offer.expiryLabel}
                    </span>
                    <details>
                      <summary>Important terms</summary>
                      <p>{offer.important}</p>
                      <a href={offer.source} target="_blank" rel="noreferrer">
                        Check official source ↗
                      </a>
                    </details>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">◎</span>
            <h3>No matching offers</h3>
            <p>Try another category or re-select a card.</p>
          </div>
        )}
      </section>

      {selectedCards.includes("times") && (
        <section className="benefits-library" aria-labelledby="benefits-library-title">
          <div className="benefit-library-header">
            <div>
              <p className="eyebrow">Complete card library</p>
              <h2 id="benefits-library-title">All 68 Times Black benefits</h2>
            </div>
            <p>
              The full official index across welcome benefits, signature perks, milestones,
              bonus rewards, events and exclusive discounts—not just the highlights above.
            </p>
          </div>

          <div className="benefit-caveat">
            <strong>Listed does not always mean active.</strong>
            <span>
              Times Black still shows a few ended campaigns, eligibility-only benefits and
              pages without clear end dates. Open the official details before relying on one.
            </span>
          </div>

          <div className="benefit-controls">
            <label className="benefit-search" htmlFor="benefit-search">
              <span>Search benefits</span>
              <input
                id="benefit-search"
                type="search"
                value={benefitQuery}
                placeholder="Try lounge, hotel, Apple…"
                onChange={(event) => setBenefitQuery(event.target.value)}
              />
            </label>
            <div className="benefit-section-tabs" role="group" aria-label="Times Black sections">
              {(["ALL", ...timesBlackSectionOrder] as BenefitSectionFilter[]).map((section) => {
                const count =
                  section === "ALL"
                    ? timesBlackBenefits.length
                    : timesBlackBenefits.filter((benefit) => benefit.section === section).length;
                return (
                  <button
                    key={section}
                    type="button"
                    aria-pressed={benefitSection === section}
                    className={benefitSection === section ? "active" : ""}
                    onClick={() => setBenefitSection(section)}
                  >
                    <span>{section === "ALL" ? "All" : section.toLocaleLowerCase("en-IN")}</span>
                    <b>{count}</b>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="benefit-results-count" aria-live="polite">
            Showing {formatCount(visibleTimesBenefits.length, "benefit")}
          </p>

          {visibleTimesBenefits.length ? (
            <div className="benefit-groups">
              {timesBlackSectionOrder.map((section) => {
                const sectionBenefits = visibleTimesBenefits.filter(
                  (benefit) => benefit.section === section,
                );
                if (!sectionBenefits.length) return null;

                return (
                  <details
                    className="benefit-group"
                    key={section}
                    open={
                      benefitSection !== "ALL" ||
                      Boolean(benefitQuery.trim()) ||
                      section === "WELCOME"
                    }
                  >
                    <summary>
                      <span>{section.toLocaleLowerCase("en-IN")}</span>
                      <b>{sectionBenefits.length}</b>
                    </summary>
                    <div className="benefit-list">
                      {sectionBenefits.map((benefit) => (
                        <article className="benefit-row" key={benefit.id}>
                          <div className="benefit-row-main">
                            <p>{benefit.merchant}</p>
                            <h3>{benefit.title}</h3>
                          </div>
                          <div className="benefit-row-meta">
                            {benefit.tag && <span>{benefit.tag}</span>}
                            <a href={benefit.source} target="_blank" rel="noreferrer">
                              Official details ↗
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          ) : (
            <div className="empty-state benefit-empty-state">
              <span aria-hidden="true">⌕</span>
              <h3>No benefit found</h3>
              <p>Try a merchant, perk or another official section.</p>
            </div>
          )}
        </section>
      )}

      <section className="how-it-works" aria-labelledby="how-title">
        <div>
          <p className="eyebrow">The Perq rule</p>
          <h2 id="how-title">A discount is only good if you would buy it anyway.</h2>
        </div>
        <ol>
          <li><strong>1</strong><span>Start with what you planned to buy.</span></li>
          <li><strong>2</strong><span>Compare the final price, not the headline percentage.</span></li>
          <li><strong>3</strong><span>Check the official terms before you pay.</span></li>
        </ol>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Perq home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>Perq</span>
        </a>
        <p>
          An independent personal tracker. Offers can change; issuer terms are the final word.
          No card numbers or financial account details are collected.
        </p>
        <a href="#wallet-title">Update my cards ↑</a>
      </footer>
    </main>
  );
}
