export type CardId = "times" | "amex" | "infinia" | "emirates";

export type PerkCategory =
  | "Travel"
  | "Dining"
  | "Shopping"
  | "Rewards"
  | "Wellness"
  | "Lifestyle"
  | "Events";

export type PerkKind =
  | "merchant-offer"
  | "card-benefit"
  | "membership"
  | "rewards-program"
  | "earning-channel"
  | "milestone"
  | "event"
  | "protection"
  | "personalized";

export type PerkStatus = "active" | "upcoming" | "expired" | "unclear";

export type UnifiedPerk = {
  id: string;
  cardId: CardId;
  provider: string;
  title: string;
  value: string;
  valueAmount?: number;
  category: PerkCategory;
  kind: PerkKind;
  status: PerkStatus;
  startDate?: string;
  endDate?: string;
  timingLabel: string;
  summary: string;
  important: string;
  source: string;
  checkedAt: string;
  groupSize?: number;
  rankBoost?: number;
};
