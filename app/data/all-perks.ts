import { timesBlackBenefits } from "../times-black-benefits";
import { amexPlatinumPerks } from "./amex-platinum";
import { hdfcInfiniaPerks } from "./hdfc-infinia";
import type { PerkCategory, PerkKind, UnifiedPerk } from "./types";

const TIMES_CHECKED_AT = "2026-07-27";
const EMIRATES_CHECKED_AT = "2026-07-27";

const expiredTimesBenefitIds = new Set([
  "a823b527-339e-4f96-ac84-5bd4aaa6dcb6",
  "d7d19739-7855-44b2-8b02-ed4c23fd93bc",
  "00f4eb8f-2b3b-444b-819e-5d2573c36c4a",
  "6c456b76-c282-4cfb-a07f-b26400141313",
  "51471b60-63e6-4a0b-90dc-a1f141778df6",
  "10981757-07e9-4ba8-b4dd-03ff64c95f2d",
]);

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

function timesKind(section: string, title: string): PerkKind {
  if (
    title === "Annual Zomato Gold membership for your food ordering & dining needs" ||
    title === "Premium global subscriptions in one membership" ||
    title === "A wellness membership that has you fully covered" ||
    title === "20% off on the standard membership"
  ) {
    return "membership";
  }
  if (section === "EVENTS") return "event";
  if (section === "MILESTONES") return "milestone";
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
  const expired = expiredTimesBenefitIds.has(benefit.id);
  const isCampaign = benefit.section === "BONUS REWARDS" || benefit.section === "EVENTS";

  return {
    id: `times-${benefit.id}`,
    cardId: "times",
    provider: benefit.merchant,
    title: benefit.title,
    ...extractedValue,
    category: timesCategory(benefit.title, benefit.merchant),
    kind: timesKind(benefit.section, benefit.title),
    status: expired ? "expired" : isCampaign ? "active" : "unclear",
    timingLabel: expired
      ? benefit.section === "EVENTS"
        ? "Event ended"
        : "Removed from live catalogue"
      : benefit.tag ?? benefit.section.toLocaleLowerCase("en-IN"),
    summary: `A Times Black ${benefit.section.toLocaleLowerCase("en-IN")} listing. Check the official page for the redemption path and current availability.`,
    important: "Eligibility, inventory, participating locations and redemption windows can change. Times Black may continue listing a benefit after its campaign ends.",
    source: benefit.source,
    checkedAt: TIMES_CHECKED_AT,
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
    id: "emirates-joining-silver-tier",
    cardId: "emirates",
    provider: "Emirates Skywards",
    title: "Receive joining miles and Emirates Skywards Silver Tier",
    value: "10,000 miles + Silver Tier",
    category: "Rewards",
    kind: "card-benefit",
    status: "active",
    timingLabel: "Joining benefit",
    summary: "The official card page lists 10,000 Skywards miles and Emirates Skywards Silver Tier for new cardholders.",
    important: "Joining fee, account-linking, card approval and issuer fulfilment conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 8,
  },
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
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 5,
  },
  {
    id: "emirates-renewal-miles",
    cardId: "emirates",
    provider: "Emirates Skywards",
    title: "Receive renewal miles and Emirates Skywards Gold Tier upgrade",
    value: "10,000 miles + Gold Tier",
    category: "Rewards",
    kind: "card-benefit",
    status: "active",
    timingLabel: "On annual renewal",
    summary: "The official card page lists 10,000 Skywards miles and an upgrade to Gold Tier on annual renewal.",
    important: "Annual fee payment, account status, Skywards account-linking and issuer fulfilment conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 8,
  },
  {
    id: "emirates-lounge-access",
    cardId: "emirates",
    provider: "ICICI Bank",
    title: "Use complimentary domestic and international airport lounges",
    value: "Unlimited visits",
    category: "Travel",
    kind: "card-benefit",
    status: "active",
    timingLabel: "Primary cardholder",
    summary: "The official card page lists complimentary international and domestic lounge access.",
    important: "Access is listed for the primary cardholder. Network, airport, guest, validation and issuer conditions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 7,
  },
  {
    id: "emirates-skywards-earning",
    cardId: "emirates",
    provider: "Emirates Skywards",
    title: "Earn Emirates Skywards miles on card spends",
    value: "2 miles / ₹100",
    category: "Rewards",
    kind: "earning-channel",
    status: "active",
    timingLabel: "Domestic and international spends",
    summary: "The official card page lists 2 Skywards miles per ₹100 on both domestic and international spends.",
    important: "Miles are credited to the linked Emirates Skywards account after the billing cycle. Exclusions and account-status rules apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 7,
  },
  {
    id: "emirates-gold-tier-milestone",
    cardId: "emirates",
    provider: "Emirates Skywards",
    title: "Unlock Emirates Skywards Gold Tier after qualifying annual spend",
    value: "Gold Tier",
    category: "Rewards",
    kind: "milestone",
    status: "active",
    timingLabel: "Anniversary-year spend",
    summary: "Spend ₹15 lakh in the anniversary year, including at least ₹50,000 on Emirates flights, to qualify for a Gold Tier upgrade.",
    important: "The card account must remain active and the annual fee must be paid. Emirates flight-spend and anniversary-year rules apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 6,
  },
  {
    id: "emirates-fuel-surcharge-waiver",
    cardId: "emirates",
    provider: "ICICI Bank",
    title: "Save the fuel surcharge on eligible fuel transactions",
    value: "1% waiver",
    category: "Travel",
    kind: "card-benefit",
    status: "active",
    timingLabel: "Fuel transactions up to ₹4,000",
    summary: "The official card page lists a 1% fuel surcharge waiver on fuel transactions up to ₹4,000.",
    important: "Fuel-transaction caps, eligible outlets, statement credit timing and issuer exclusions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 3,
  },
  {
    id: "emirates-bookmyshow",
    cardId: "emirates",
    provider: "BookMyShow",
    title: "Buy one movie ticket and save on the second",
    value: "Up to ₹750 off",
    valueAmount: 750,
    category: "Lifestyle",
    kind: "merchant-offer",
    status: "active",
    timingLabel: "Up to 4 times monthly",
    summary: "Use the card on an eligible BookMyShow booking for the second-ticket discount after meeting the quarterly spend rule.",
    important: "From 1 April 2026, cardholders must spend ₹25,000 or more in the preceding quarter. Monthly usage, ticket, show and platform restrictions apply.",
    source: "https://www.icici.bank.in/personal-banking/cards/credit-card/emirates-skywards/emirates-emeralde",
    checkedAt: EMIRATES_CHECKED_AT,
    rankBoost: 4,
  },
];

export const allPerks: UnifiedPerk[] = [
  ...timesPerks,
  ...amexPlatinumPerks,
  ...hdfcInfiniaPerks,
  ...emiratesPerks,
];
