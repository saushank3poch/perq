import assert from "node:assert/strict";
import test from "node:test";

import {
  buildNotificationCopy,
  findTodayOffers,
  getZonedScheduleState,
  shouldSendDailyNotification,
} from "../app/notification-schedule.mjs";

const schedule = {
  timeZone: "Asia/Kolkata",
  configuredTime: "12:00",
};

test("evaluates the configured time in its own timezone", () => {
  const beforeNoon = getZonedScheduleState(
    new Date("2026-07-22T06:29:00.000Z"),
    schedule.timeZone,
    schedule.configuredTime,
  );
  const atNoon = getZonedScheduleState(
    new Date("2026-07-22T06:30:00.000Z"),
    schedule.timeZone,
    schedule.configuredTime,
  );

  assert.deepEqual(beforeNoon, {
    dateKey: "2026-07-22",
    scheduledTimeHasPassed: false,
  });
  assert.deepEqual(atNoon, {
    dateKey: "2026-07-22",
    scheduledTimeHasPassed: true,
  });
});

test("sends once after noon and supports a same-day catch-up", () => {
  const atThree = new Date("2026-07-22T09:30:00.000Z");

  assert.equal(
    shouldSendDailyNotification({
      ...schedule,
      now: atThree,
      lastSentDate: null,
    }).shouldSend,
    true,
  );
  assert.equal(
    shouldSendDailyNotification({
      ...schedule,
      now: atThree,
      lastSentDate: "2026-07-22",
    }).shouldSend,
    false,
  );
});

test("finds only trusted matches for selected cards", () => {
  const perks = [
    { id: "starts", cardId: "amex", title: "Starts", status: "upcoming", startDate: "2026-07-22" },
    { id: "ends", cardId: "amex", title: "Ends", status: "active", endDate: "2026-07-22" },
    { id: "other-card", cardId: "times", title: "Other", status: "active", endDate: "2026-07-22" },
    { id: "unclear", cardId: "amex", title: "Unclear", status: "unclear", endDate: "2026-07-22" },
  ];

  const matches = findTodayOffers(perks, ["amex"], "2026-07-22");
  assert.deepEqual(matches.starting.map((perk) => perk.id), ["starts"]);
  assert.deepEqual(matches.ending.map((perk) => perk.id), ["ends"]);
});

test("builds actionable and all-clear notification copy", () => {
  assert.deepEqual(buildNotificationCopy({ starting: [], ending: [] }), {
    title: "Perq daily offers",
    body: "No offers start or end today.",
  });

  const copy = buildNotificationCopy({
    starting: [{ title: "Apple" }],
    ending: [{ title: "Taj" }, { title: "Lounge" }, { title: "Dining" }],
  });
  assert.equal(copy.title, "Perq daily offers");
  assert.equal(copy.body, "Starting today: Apple\nEnding today: Taj, Lounge +1 more");
});

test("rejects invalid configured times", () => {
  assert.throws(
    () => getZonedScheduleState(new Date(), "Asia/Kolkata", "25:00"),
    /Invalid notification time/,
  );
});
