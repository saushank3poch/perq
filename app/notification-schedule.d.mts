export type ZonedScheduleState = {
  dateKey: string;
  scheduledTimeHasPassed: boolean;
};

export type DailyNotificationState = ZonedScheduleState & {
  shouldSend: boolean;
};

export type SchedulablePerk = {
  cardId: string;
  status: string;
  title: string;
  startDate?: string;
  endDate?: string;
};

export type TodayOffers<T extends SchedulablePerk> = {
  starting: T[];
  ending: T[];
};

export function getZonedScheduleState(
  now: Date,
  timeZone: string,
  configuredTime: string,
): ZonedScheduleState;

export function shouldSendDailyNotification(options: {
  now: Date;
  timeZone: string;
  configuredTime: string;
  lastSentDate: string | null;
}): DailyNotificationState;

export function findTodayOffers<T extends SchedulablePerk>(
  perks: readonly T[],
  selectedCardIds: readonly string[],
  dateKey: string,
): TodayOffers<T>;

export function buildNotificationCopy(offers: {
  starting: readonly Pick<SchedulablePerk, "title">[];
  ending: readonly Pick<SchedulablePerk, "title">[];
}): {
  title: string;
  body: string;
};
