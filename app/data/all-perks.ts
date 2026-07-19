import { timesBlackBenefits } from "../times-black-benefits";
import { amexPlatinumPerks } from "./amex-platinum";
import { hdfcInfiniaPerks } from "./hdfc-infinia";
import type { PerkCategory, PerkKind, UnifiedPerk } from "./types";

const CHECKED_AT = "2026-07-19";

function timesCategory(title: string, merchant: string): PerkCategory {
  const text = `${title} ${merchant}`.toLocaleLowerCase("en-IN");
  if (/dining|restaurant|food|buffet|brunch|cafe|sweet|tea|zomato|haldiram/.test(text)) {
    return "Dining";
  }
  if (/clinic|hospital|health|wellness|salon|groom|ayurveda|sleep/.test(text)) {
    return "Wellness";
  }
  if (/flight|hotel|stay|travel|visa|airport|lounge|car|ixigo|klook|tumi|forex/.test(text)) {
    return "Travel";
  }
  if (/event|tour|candlelight|quorum/.test(text)) return "Events";
  if (/reward|milestone|points|annual spend|fee waiver/.test(text)) return "Rewards";
  return "Shopping";
}

function timesKind(section: string): PerkKind {
  if (section === "EVENTS") return "event";
  if (section === "MILESTONES") return "milestone";
  if (section === "BONUS REWARDS") return "rewards-program";
  if (section === "WELCOME") return "card-benefit";
  if (section === "SIGNATURE BENEFITS") return "card-benefit";
  return "merchant-offer";
}

function timesValue(title: string, tag: string | null) {
  const rupees = title.match(/₹\s?([\d,]+)/);
  if (rupees) return { value: `₹${rupees[1]}`, valueAmount: Number(rupees[1].replaceAll(",", "")) };
  const percent = title.match(/(?:up to |flat )?(\d+)%/i);
  if (percent) return { value: `${percent[1]}% off` };
  if (/complimentary|included|free/i.test(title)) return { value: "Included" };
  return { value: tag ?? "Card benefit" };
}

const timesPerks: UnifiedPerk[] = timesBlackBenefits.map((benefit) => {
  const extractedValue = timesValue(benefit.title, benefit.tag);
  const expired = benefit.id === "a823b527-339e-4f96-ac84-5bd4aaa6dcb6";
  const isCampaign = benefit.section === "BONUS REWARDS" || benefit.section === "EVENTS";

  return {
    id: `times-${benefit.id}`,
    cardId: "times",
    provider: benefit.merchant,
    title: benefit.title,
    ...extractedValue,
    category: timesCategory(benefit.title, benefit.merchant),
    kind: timesKind(benefit.section),
    status: expired ? "expired" : isCampaign ? "active" : "unclear",
    timingLabel: expired ? "Ended campaign" : benefit.tag ?? benefit.section.toLocaleLowerCase("en-IN"),
    summary: `A Times Black ${benefit.section.toLocaleLowerCase("en-IN")} listing. Check the official page for the redemption path and current availability.`,
    important: "Eligibility, inventory, participating locations and redemption windows can change. Times Black may continue listing a benefit after its campaign ends.",
    source: benefit.source,
    checkedAt: CHECKED_AT,
    rankBoost:
      benefit.section === "EVENTS"
        ? 10
        : benefit.section === "BONUS REWARDS"
          ? 8
          : benefit.section === "MILESTONES"
            ? 6
            : benefit.section === "WELCOME"
              ? 5
              : 3,
  };
});

const emiratesPerks: UnifiedPerk[] = [
  {
    id: "emirates-flight-discount",
    cardId: "emirates",
    provider: "Emirates",
    title: "Save on eligible Emirates flight bookings with code INICI26",
    value: "Up to 10% off",
    category: "Travel",
    kind: "merchant-offer",
    status: "unclear",
    timingLabel: "Promo code INICI26",
    summary: "Test the code on Emirates before comparing the final fare with other booking channels.",
    important: "Eligible routes, cabins, travel dates and fare conditions apply. Confirm that the code still validates before paying.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: CHECKED_AT,
    rankBoost: 5,
  },
  {
    id: "emirates-renewal-miles",
    cardId: "emirates",
    provider: "Emirates Skywards",
    title: "Receive annual renewal miles",
    value: "10,000 miles",
    category: "Rewards",
    kind: "card-benefit",
    status: "active",
    timingLabel: "On annual renewal",
    summary: "Confirm the miles land after renewal and keep the correct Skywards account linked.",
    important: "Annual fee, account status and issuer fulfilment conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: CHECKED_AT,
    rankBoost: 8,
  },
  {
    id: "emirates-bookmyshow",
    cardId: "emirates",
    provider: "BookMyShow",
    title: "Buy one movie ticket and save on the second",
    value: "Up to ₹750 off",
    valueAmount: 750,
    category: "Lifestyle",
    kind: "card-benefit",
    status: "active",
    timingLabel: "Up to 4 times monthly",
    summary: "Use the card on an eligible BookMyShow booking for the second-ticket discount.",
    important: "Monthly usage, ticket, show and platform restrictions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: CHECKED_AT,
    rankBoost: 4,
  },
];

export const allPerks: UnifiedPerk[] = [
  ...timesPerks,
  ...amexPlatinumPerks,
  ...hdfcInfiniaPerks,
  ...emiratesPerks,
];
