const timeFormatterCache = new Map();

function formatterFor(timeZone) {
  if (!timeFormatterCache.has(timeZone)) {
    timeFormatterCache.set(
      timeZone,
      new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }),
    );
  }

  return timeFormatterCache.get(timeZone);
}

export function getZonedScheduleState(now, timeZone, configuredTime) {
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(configuredTime);

  if (!timeMatch) {
    throw new Error(`Invalid notification time: ${configuredTime}`);
  }

  const configuredHour = Number(timeMatch[1]);
  const configuredMinute = Number(timeMatch[2]);
  if (configuredHour > 23 || configuredMinute > 59) {
    throw new Error(`Invalid notification time: ${configuredTime}`);
  }

  const parts = Object.fromEntries(
    formatterFor(timeZone)
      .formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  const scheduledMinutes = configuredHour * 60 + configuredMinute;

  return {
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    scheduledTimeHasPassed:
      Number(parts.hour) * 60 + Number(parts.minute) >= scheduledMinutes,
  };
}

export function shouldSendDailyNotification({
  now,
  timeZone,
  configuredTime,
  lastSentDate,
}) {
  const state = getZonedScheduleState(now, timeZone, configuredTime);
  return {
    ...state,
    shouldSend: state.scheduledTimeHasPassed && lastSentDate !== state.dateKey,
  };
}

export function findTodayOffers(perks, selectedCardIds, dateKey) {
  const selectedCards = new Set(selectedCardIds);
  const eligible = perks.filter(
    (perk) =>
      selectedCards.has(perk.cardId) &&
      perk.status !== "unclear" &&
      perk.status !== "expired",
  );

  return {
    starting: eligible.filter((perk) => perk.startDate === dateKey),
    ending: eligible.filter((perk) => perk.endDate === dateKey),
  };
}

function summarizeTitles(perks) {
  const visibleTitles = perks.slice(0, 2).map((perk) => perk.title);
  const remaining = perks.length - visibleTitles.length;
  return `${visibleTitles.join(", ")}${remaining > 0 ? ` +${remaining} more` : ""}`;
}

export function buildNotificationCopy({ starting, ending }) {
  if (!starting.length && !ending.length) {
    return {
      title: "Perq daily offers",
      body: "No offers start or end today.",
    };
  }

  const lines = [];
  if (starting.length) lines.push(`Starting today: ${summarizeTitles(starting)}`);
  if (ending.length) lines.push(`Ending today: ${summarizeTitles(ending)}`);

  return {
    title: "Perq daily offers",
    body: lines.join("\n"),
  };
}
