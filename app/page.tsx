"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { allPerks } from "./data/all-perks";
import { notificationConfig } from "./notification-config";
import {
  buildNotificationCopy,
  findTodayOffers,
  getZonedScheduleState,
  shouldSendDailyNotification,
} from "./notification-schedule.mjs";
import type {
  CardId,
  PerkCategory,
  PerkKind,
  PerkStatus,
  UnifiedPerk,
} from "./data/types";

type CategoryFilter = "All" | PerkCategory;
type ViewFilter = "current" | "today" | "ending" | "ongoing" | "archive";
type SortMode = "ranked" | "expiry" | "value";
type CatalogueTab = "offers" | "benefits" | "memberships";
type NotificationState = NotificationPermission | "unsupported";

const GITHUB_REPO = "https://github.com/saushank3poch/perq";
const NOTIFICATIONS_ENABLED_KEY = "perq-notifications-enabled";
const NOTIFICATION_LAST_SENT_KEY = "perq-notification-last-sent";

type Card = {
  id: CardId;
  short: string;
  name: string;
  issuer: string;
  accent: string;
};

const cards: Card[] = [
  { id: "times", short: "TB", name: "Times Black", issuer: "ICICI Bank", accent: "card-times" },
  { id: "amex", short: "AX", name: "Platinum Card", issuer: "American Express", accent: "card-amex" },
  { id: "infinia", short: "IN", name: "Infinia Metal", issuer: "HDFC Bank", accent: "card-infinia" },
  { id: "emirates", short: "EK", name: "Emirates Emeralde", issuer: "ICICI Bank", accent: "card-emirates" },
];

const categories: CategoryFilter[] = [
  "All",
  "Travel",
  "Dining",
  "Shopping",
  "Rewards",
  "Wellness",
  "Lifestyle",
  "Events",
];

const views: { id: ViewFilter; label: string }[] = [
  { id: "current", label: "Current" },
  { id: "today", label: "Today" },
  { id: "ending", label: "Ending soon" },
  { id: "ongoing", label: "Ongoing" },
  { id: "archive", label: "Archive" },
];

const catalogueTabs: {
  id: CatalogueTab;
  label: string;
  heading: string;
  description: string;
}[] = [
  {
    id: "offers",
    label: "Offers",
    heading: "Ranked offers",
    description: "Merchant deals, earning routes, milestones and events—ranked by value and urgency.",
  },
  {
    id: "benefits",
    label: "Card benefits",
    heading: "Card benefits",
    description: "Ongoing card features such as lounge access, premium-cabin fares and protection.",
  },
  {
    id: "memberships",
    label: "Memberships",
    heading: "Memberships",
    description: "Hotel, dining and lifestyle memberships included with your selected cards.",
  },
];

const allCardIds = cards.map((card) => card.id);
const DAY = 1000 * 60 * 60 * 24;

function dateAtEndOfDay(date: string) {
  return new Date(`${date}T23:59:59+05:30`).getTime();
}

function dateAtStartOfDay(date: string) {
  return new Date(`${date}T00:00:00+05:30`).getTime();
}

function daysUntil(date?: string) {
  if (!date) return Number.POSITIVE_INFINITY;
  return Math.ceil((dateAtEndOfDay(date) - Date.now()) / DAY);
}

function effectiveStatus(perk: UnifiedPerk): PerkStatus {
  if (perk.endDate && daysUntil(perk.endDate) < 0) return "expired";
  if (perk.startDate && dateAtStartOfDay(perk.startDate) > Date.now()) return "upcoming";
  return perk.status;
}

function catalogueTabFor(perk: UnifiedPerk): CatalogueTab {
  if (perk.kind === "membership") return "memberships";
  if (
    perk.kind === "card-benefit" ||
    perk.kind === "protection" ||
    perk.kind === "rewards-program" ||
    (perk.kind === "earning-channel" && !perk.endDate)
  ) {
    return "benefits";
  }
  return "offers";
}

function rankScore(perk: UnifiedPerk) {
  const status = effectiveStatus(perk);
  const statusScore = status === "active" ? 80 : status === "unclear" ? 48 : status === "upcoming" ? 36 : -500;
  const valueScore = Math.min((perk.valueAmount ?? 0) / 1000, 30);
  const days = daysUntil(perk.endDate);
  const urgencyScore = days >= 0 && days <= 14 ? 16 : days <= 45 ? 9 : 0;
  const breadthScore = perk.groupSize ? Math.min(Math.log10(perk.groupSize + 1) * 5, 14) : 0;
  const kindScore =
    perk.kind === "card-benefit"
      ? 8
      : perk.kind === "earning-channel"
        ? 7
        : perk.kind === "milestone"
          ? 6
          : perk.kind === "event"
            ? 5
            : 3;
  return statusScore + valueScore + urgencyScore + breadthScore + kindScore + (perk.rankBoost ?? 0);
}

function rankReason(perk: UnifiedPerk) {
  const status = effectiveStatus(perk);
  const days = daysUntil(perk.endDate);
  if (status === "expired") return "Expired — kept for reference";
  if (days >= 0 && days <= 14) return `Ends in ${days} day${days === 1 ? "" : "s"}`;
  if ((perk.valueAmount ?? 0) >= 10000) return "High potential rupee value";
  if (perk.groupSize) return `${perk.groupSize.toLocaleString("en-IN")} places or brands`;
  if (perk.kind === "earning-channel") return "Use this route before paying";
  if (perk.kind === "card-benefit" && !perk.endDate) return "Useful ongoing card benefit";
  if (status === "unclear") return "Availability needs verification";
  return "Strong fit across value and usability";
}

function kindLabel(kind: PerkKind) {
  const labels: Record<PerkKind, string> = {
    "merchant-offer": "Merchant offer",
    "card-benefit": "Card benefit",
    membership: "Membership",
    "rewards-program": "Rewards program",
    "earning-channel": "Earning channel",
    milestone: "Milestone",
    event: "Event",
    protection: "Protection",
    personalized: "Personalized",
  };
  return labels[kind];
}

function statusLabel(perk: UnifiedPerk) {
  const status = effectiveStatus(perk);
  if (status === "expired") return "Expired";
  if (status === "upcoming") return "Upcoming";
  if (status === "unclear") return "Verify";
  return "Active";
}

function formatCount(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export default function Home() {
  const [selectedCards, setSelectedCards] = useState<CardId[]>(allCardIds);
  const [catalogueTab, setCatalogueTab] = useState<CatalogueTab>("offers");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [view, setView] = useState<ViewFilter>("current");
  const [sortBy, setSortBy] = useState<SortMode>("ranked");
  const [query, setQuery] = useState("");
  const [savedPerks, setSavedPerks] = useState<string[]>([]);
  const [notificationState, setNotificationState] =
    useState<NotificationState>("unsupported");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let selectedFromStorage: CardId[] | null = null;
    let savedFromStorage: string[] | null = null;

    try {
      const storedCards = window.localStorage.getItem("perq-selected-cards");
      const storedPerks = window.localStorage.getItem("perq-saved-offers");
      if (storedCards) {
        const parsed = JSON.parse(storedCards) as CardId[];
        const valid = parsed.filter((id) => allCardIds.includes(id));
        if (valid.length) selectedFromStorage = valid;
      }
      if (storedPerks) savedFromStorage = JSON.parse(storedPerks) as string[];
    } catch {
      window.localStorage.removeItem("perq-selected-cards");
      window.localStorage.removeItem("perq-saved-offers");
    }

    queueMicrotask(() => {
      if (selectedFromStorage) setSelectedCards(selectedFromStorage);
      if (savedFromStorage) setSavedPerks(savedFromStorage);
      if ("Notification" in window) {
        setNotificationState(Notification.permission);
        setNotificationsEnabled(
          Notification.permission === "granted" &&
            window.localStorage.getItem(NOTIFICATIONS_ENABLED_KEY) === "true",
        );
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("perq-selected-cards", JSON.stringify(selectedCards));
  }, [ready, selectedCards]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("perq-saved-offers", JSON.stringify(savedPerks));
  }, [ready, savedPerks]);

  useEffect(() => {
    if (
      !ready ||
      !notificationsEnabled ||
      notificationState !== "granted" ||
      !("Notification" in window)
    ) {
      return;
    }

    const showDailyNotification = () => {
      if (Notification.permission !== "granted") {
        setNotificationState(Notification.permission);
        setNotificationsEnabled(false);
        window.localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, "false");
        return;
      }

      const lastSentDate = window.localStorage.getItem(NOTIFICATION_LAST_SENT_KEY);
      const scheduleState = shouldSendDailyNotification({
        now: new Date(),
        timeZone: notificationConfig.timeZone,
        configuredTime: notificationConfig.time,
        lastSentDate,
      });

      if (!scheduleState.shouldSend) return;

      const offerPerks = allPerks.filter((perk) => catalogueTabFor(perk) === "offers");
      const matches = findTodayOffers(
        offerPerks,
        selectedCards,
        scheduleState.dateKey,
      ) as { starting: UnifiedPerk[]; ending: UnifiedPerk[] };
      const copy = buildNotificationCopy(matches);
      const notification = new Notification(copy.title, {
        body: copy.body,
        icon: "/favicon.svg",
        tag: `perq-daily-${scheduleState.dateKey}`,
      });

      window.localStorage.setItem(NOTIFICATION_LAST_SENT_KEY, scheduleState.dateKey);
      notification.onclick = () => {
        window.focus();
        setCatalogueTab("offers");
        setCategory("All");
        setView("today");
        setQuery("");
        window.location.hash = "catalogue";
        window.setTimeout(() => {
          document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
        }, 0);
        notification.close();
      };
    };

    showDailyNotification();
    const interval = window.setInterval(showDailyNotification, 60_000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") showDailyNotification();
    };
    window.addEventListener("focus", showDailyNotification);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", showDailyNotification);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [notificationState, notificationsEnabled, ready, selectedCards]);

  const selectedCurrentPerks = useMemo(
    () =>
      allPerks
        .filter(
          (perk) =>
            selectedCards.includes(perk.cardId) &&
            catalogueTabFor(perk) === catalogueTab &&
            effectiveStatus(perk) !== "expired",
        )
        .sort((a, b) => rankScore(b) - rankScore(a)),
    [catalogueTab, selectedCards],
  );

  const visiblePerks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en-IN");
    const filtered = allPerks.filter((perk) => {
      const status = effectiveStatus(perk);
      const days = daysUntil(perk.endDate);
      const today = getZonedScheduleState(
        new Date(),
        notificationConfig.timeZone,
        notificationConfig.time,
      ).dateKey;
      const matchesView =
        view === "archive"
          ? status === "expired"
          : view === "today"
            ? status !== "expired" &&
              status !== "unclear" &&
              (perk.startDate === today || perk.endDate === today)
          : view === "ending"
            ? status !== "expired" && days >= 0 && days <= 45
            : view === "ongoing"
              ? status !== "expired" && !perk.endDate
              : status !== "expired";
      const haystack = `${perk.provider} ${perk.title} ${perk.summary} ${perk.value} ${kindLabel(perk.kind)}`.toLocaleLowerCase("en-IN");
      return (
        selectedCards.includes(perk.cardId) &&
        catalogueTabFor(perk) === catalogueTab &&
        (category === "All" || perk.category === category) &&
        matchesView &&
        (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "expiry") return daysUntil(a.endDate) - daysUntil(b.endDate);
      if (sortBy === "value") return (b.valueAmount ?? 0) - (a.valueAmount ?? 0);
      return rankScore(b) - rankScore(a);
    });
  }, [catalogueTab, category, query, selectedCards, sortBy, view]);

  const tabCounts = useMemo(
    () =>
      catalogueTabs.reduce<Record<CatalogueTab, number>>(
        (counts, item) => ({
          ...counts,
          [item.id]: allPerks.filter(
            (perk) =>
              selectedCards.includes(perk.cardId) &&
              catalogueTabFor(perk) === item.id &&
              effectiveStatus(perk) !== "expired",
          ).length,
        }),
        { offers: 0, benefits: 0, memberships: 0 },
      ),
    [selectedCards],
  );

  const activeCatalogueTab = catalogueTabs.find((item) => item.id === catalogueTab)!;

  const topPerk = selectedCurrentPerks[0];
  const topCard = topPerk ? cards.find((card) => card.id === topPerk.cardId) : cards[0];
  const endingSoon = selectedCurrentPerks.filter((perk) => {
    const days = daysUntil(perk.endDate);
    return days >= 0 && days <= 45;
  }).length;

  const toggleCard = (cardId: CardId) => {
    setSelectedCards((current) => {
      if (current.includes(cardId)) {
        return current.length === 1 ? current : current.filter((id) => id !== cardId);
      }
      return [...current, cardId];
    });
  };

  const toggleSaved = (perkId: string) => {
    setSavedPerks((current) =>
      current.includes(perkId)
        ? current.filter((id) => id !== perkId)
        : [...current, perkId],
    );
  };

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      window.localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, "false");
      return;
    }

    if (!("Notification" in window)) {
      setNotificationState("unsupported");
      return;
    }

    const permission =
      Notification.permission === "granted"
        ? "granted"
        : await Notification.requestPermission();
    setNotificationState(permission);

    const enabled = permission === "granted";
    setNotificationsEnabled(enabled);
    window.localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, String(enabled));
  };

  const notificationStatus =
    notificationState === "unsupported"
      ? "This browser does not support notifications."
      : notificationState === "denied"
        ? "Notifications are blocked in your browser settings."
        : notificationsEnabled
          ? `Enabled · Daily at ${notificationConfig.time} (${notificationConfig.timeZone})`
          : `Off · Daily at ${notificationConfig.time} (${notificationConfig.timeZone})`;

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Perq home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>Perq</span>
        </a>
        <div className="header-actions">
          <div className="country-control">
            <label htmlFor="country">Demo for</label>
            <select id="country" defaultValue="india" aria-label="Country">
              <option value="india">🇮🇳 India</option>
              <option value="singapore" disabled>Singapore — soon</option>
              <option value="uae" disabled>UAE — soon</option>
            </select>
          </div>
          <Link className="header-create-link" href="/make-it-yours">
            Make it yours <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Open source · Live India demo</p>
          <h1 id="hero-title">Use the right card. Before the perk expires.</h1>
          <p className="hero-subtitle">
            <strong className="open-source-highlight">Open source.</strong> Perq turns scattered
            official credit-card offer pages into one ranked, searchable view. Choose the cards
            you carry, see what is active or ending soon, and save what matters.
          </p>
          <button className="primary-action" type="button" onClick={scrollToCatalogue}>
            Try the live demo <span aria-hidden="true">↓</span>
          </button>
          <div className="hero-proof" aria-label="Product details">
            <span>180 tracked benefits</span>
            <span>Official sources</span>
            <span>No sign-up</span>
          </div>
          <p className="source-note">India demo · source snapshot checked 22 Jul 2026</p>
        </div>

        {topPerk && (
          <div className="hero-deal" aria-label="Top ranked benefit">
            <div className="deal-sun" aria-hidden="true" />
            <p className="deal-kicker">#1 for your selected cards</p>
            <strong>{topPerk.value}</strong>
            <p>{topPerk.title}</p>
            <div className={`mini-card ${topCard.accent}`} aria-hidden="true">
              <span>{topCard.issuer}</span>
              <b>{topCard.name}</b>
            </div>
            <span className="deal-tag">{rankReason(topPerk)}</span>
          </div>
        )}
      </section>

      <section className="wallet-section" aria-labelledby="wallet-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your wallet</p>
            <h2 id="wallet-title">Choose the cards to rank.</h2>
          </div>
          <p>Selection stays on this device. At least one card remains selected.</p>
        </div>

        <div className="card-picker" role="group" aria-label="Your credit cards">
          {cards.map((card) => {
            const selected = selectedCards.includes(card.id);
            const count = allPerks.filter((perk) => perk.cardId === card.id).length;
            return (
              <button
                className={`wallet-card ${card.accent} ${selected ? "is-selected" : ""}`}
                key={card.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCard(card.id)}
              >
                <span className="wallet-card-check" aria-hidden="true">{selected ? "✓" : "+"}</span>
                <span className="wallet-card-short">{card.short}</span>
                <span className="wallet-card-name">{card.name}</span>
                <span className="wallet-card-issuer">{card.issuer} · {formatCount(count, "listing")}</span>
              </button>
            );
          })}
        </div>
        <div className="notification-panel">
          <div>
            <p className="notification-kicker">Daily browser alert</p>
            <strong>Offers starting or ending today</strong>
            <span aria-live="polite">{notificationStatus}</span>
          </div>
          <button
            type="button"
            onClick={toggleNotifications}
            disabled={notificationState === "unsupported" || notificationState === "denied"}
          >
            {notificationsEnabled ? "Disable alerts" : "Enable alerts"}
          </button>
        </div>
        <p className="coverage-note">
          HDFC “Just For You” inventory is login-gated, so it appears as a program row rather
          than pretending the public catalogue includes your private offers.
        </p>
      </section>

      <section className="catalogue-section" id="catalogue" aria-labelledby="catalogue-title">
        <div className="catalogue-intro">
          <div>
            <p className="eyebrow">Your card catalogue</p>
            <h2 id="catalogue-title">{activeCatalogueTab.heading}</h2>
            <p className="catalogue-description">{activeCatalogueTab.description}</p>
          </div>
          <div className="catalogue-stats" aria-label="Catalogue summary" aria-live="polite">
            <span><strong>{visiblePerks.length}</strong> showing</span>
            <span><strong>{endingSoon}</strong> ending soon</span>
            <span><strong>{savedPerks.length}</strong> saved</span>
          </div>
        </div>

        <div className="catalogue-type-tabs" role="group" aria-label="Catalogue type">
          {catalogueTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={catalogueTab === item.id}
              className={catalogueTab === item.id ? "active" : ""}
              onClick={() => {
                setCatalogueTab(item.id);
                setCategory("All");
                setView("current");
                setQuery("");
              }}
            >
              <span>{item.label}</span>
              <strong>{tabCounts[item.id]}</strong>
            </button>
          ))}
        </div>

        <div className="catalogue-controls">
          <label className="catalogue-search" htmlFor="catalogue-search">
            <span>Search {activeCatalogueTab.label.toLocaleLowerCase("en-IN")}</span>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              placeholder={catalogueTab === "offers" ? "Try Apple, hotel, dining…" : catalogueTab === "benefits" ? "Try lounge, insurance, golf…" : "Try Marriott, Accor, Taj…"}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="view-tabs" role="group" aria-label="Benefit status">
            {views.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={view === item.id}
                className={view === item.id ? "active" : ""}
                onClick={() => setView(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="sort-control">
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortMode)}>
              <option value="ranked">Best match</option>
              <option value="expiry">Expiring soon</option>
              <option value="value">Highest known ₹ value</option>
            </select>
          </label>
        </div>

        <div className="catalogue-category-tabs" role="group" aria-label="Benefit categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="ranking-explainer">
          Best match weighs current status, likely value, urgency, breadth and redemption effort.
          Change the sort whenever you want a literal expiry or rupee-value order.
        </p>

        {visiblePerks.length ? (
          <ol className="ranked-list">
            {visiblePerks.map((perk, index) => {
              const card = cards.find((item) => item.id === perk.cardId)!;
              const saved = savedPerks.includes(perk.id);
              const status = effectiveStatus(perk);
              return (
                <li key={perk.id}>
                  <article className={`ranked-perk ${status === "expired" ? "is-expired" : ""}`}>
                    <div className="rank-number" aria-label={`Rank ${index + 1}`}>{index + 1}</div>
                    <div className="ranked-perk-main">
                      <div className="perk-topline">
                        <span className={`card-chip ${card.accent}`}>{card.short}</span>
                        <span>{card.name}</span>
                        <span>{perk.category}</span>
                        <span>{kindLabel(perk.kind)}</span>
                        <span className={`status-pill status-${status}`}>{statusLabel(perk)}</span>
                      </div>
                      <p className="perk-provider">{perk.provider}</p>
                      <h3>{perk.title}</h3>
                      <p className="perk-summary">{perk.summary}</p>
                      <details className="perk-details">
                        <summary>Eligibility and official source</summary>
                        <p>{perk.important}</p>
                        <p>Source checked {perk.checkedAt}.</p>
                        <a href={perk.source} target="_blank" rel="noreferrer">Open official details ↗</a>
                      </details>
                    </div>
                    <div className="ranked-perk-value">
                      <strong>{perk.value}</strong>
                      <span>{perk.timingLabel}</span>
                      <b>{rankReason(perk)}</b>
                      {perk.groupSize && <em>{perk.groupSize.toLocaleString("en-IN")} in this program</em>}
                      <button
                        type="button"
                        className={`save-button ${saved ? "saved" : ""}`}
                        aria-label={`${saved ? "Remove" : "Save"} ${perk.title}`}
                        aria-pressed={saved}
                        onClick={() => toggleSaved(perk.id)}
                      >
                        {saved ? "Saved ✓" : "Save +"}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>No matching benefits</h3>
            <p>Try another view, category, card or search term.</p>
          </div>
        )}
      </section>

      <section className="how-it-works" aria-labelledby="how-title">
        <div>
          <p className="eyebrow">How ranking works</p>
          <h2 id="how-title">Useful beats merely available.</h2>
        </div>
        <ol>
          <li><strong>1</strong><span>Expired offers move to the archive automatically.</span></li>
          <li><strong>2</strong><span>High-value, urgent and broadly usable benefits rise.</span></li>
          <li><strong>3</strong><span>Programs stay grouped so 400 restaurants do not bury everything else.</span></li>
        </ol>
      </section>

      <section className="make-it-yours" aria-labelledby="make-it-yours-title">
        <div className="make-it-yours-copy">
          <p className="eyebrow">Private by design</p>
          <h2 id="make-it-yours-title">This demo is public. Your wallet does not have to be.</h2>
          <p>
            Perq is open source. Start from the public catalogue of official card pages, then
            create a private copy for your country and cards. Your generated offers, saved items
            and refresh history stay in that copy.
          </p>
          <div className="ownership-actions">
            <Link className="primary-action ownership-primary" href="/make-it-yours">
              See how to make it yours <span aria-hidden="true">→</span>
            </Link>
            <a className="text-action" href={GITHUB_REPO} target="_blank" rel="noreferrer">
              View the source on GitHub
            </a>
          </div>
        </div>
        <ol className="ownership-steps" aria-label="Create your private Perq">
          <li><strong>01</strong><span>Create a private repository from Perq.</span></li>
          <li><strong>02</strong><span>Tell Codex your country and exact cards.</span></li>
          <li><strong>03</strong><span>Get your own tracker and daily source refresh.</span></li>
        </ol>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Perq home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>Perq</span>
        </a>
        <p>
          An independent personal tracker. This India inventory is a dated demo; the community
          catalogue shares only card identities and official pages. Issuer terms remain the final
          word. No card numbers are collected.
        </p>
        <a href={GITHUB_REPO} target="_blank" rel="noreferrer">Open source ↗</a>
      </footer>
    </main>
  );
}
