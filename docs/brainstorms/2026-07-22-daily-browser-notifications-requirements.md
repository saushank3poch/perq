---
date: 2026-07-22
topic: daily-browser-notifications
---

# Daily Browser Notifications Requirements

## Summary

Perq will offer an opt-in daily browser notification summarizing offers that start or end today. The open-source default will run at 12:00 PM in Asia/Kolkata, with both time and timezone configurable by each private copy.

---

## Problem Frame

Perq already tracks offer dates and surfaces expiry information inside the site, but a cardholder must remember to inspect the site to notice a same-day opportunity or deadline. Because the site is usually open, a lightweight browser alert can make the existing dated offer inventory useful at the moment it matters without introducing accounts or a central notification service.

---

## Key Flow

- F1. Receive the daily offer summary
  - **Trigger:** The configured local notification time arrives while Perq is open, or Perq becomes active later that calendar day after missing the configured time.
  - **Steps:** Perq checks the user's selected cards, identifies verified offers starting or ending on the current date, and sends one browser notification after permission has been granted. Clicking the notification opens Perq with today's matching offers visible.
  - **Outcome:** The user receives one clear daily summary, including an explicit all-clear when nothing starts or ends that day.
  - **Covered by:** R1, R2, R3, R4, R5, R6, R7

---

## Requirements

**Permission and scheduling**

- R1. Perq must provide an explicit user control for enabling browser notifications and must not request permission without that action.
- R2. The default notification schedule must be 12:00 PM in the Asia/Kolkata timezone.
- R3. A private copy must be able to configure the notification time and timezone in the repository.
- R4. Perq must send no more than one scheduled summary per configured calendar day in a given browser.
- R5. If Perq was open but suspended at the scheduled time, or is opened later that day, it must send the missed summary when it next becomes active that day.

**Notification content and navigation**

- R6. The summary must cover only verified offers for cards selected in that browser, separated into offers starting today and offers ending today.
- R7. When neither group contains an offer, Perq must still send a summary stating that no offers start or end today.
- R8. Clicking the notification must bring Perq into view and show today's matching offers.
- R9. Dates must be evaluated using the configured timezone rather than the browser machine's incidental timezone.

---

## Acceptance Examples

- AE1. **Covers R2, R4, R6.** Given notifications are enabled and two selected-card offers end today, when 12:00 PM Asia/Kolkata arrives with Perq active, one notification reports both expiring offers and no second scheduled notification appears that day.
- AE2. **Covers R5, R6.** Given Perq was suspended at noon and becomes active at 3:00 PM on the same configured day, when it checks the schedule, it sends that day's summary once.
- AE3. **Covers R6, R7.** Given no verified selected-card offers start or end today, when the daily check runs, the notification says that no offers start or end today.
- AE4. **Covers R1.** Given the user has not selected the enable-notifications control, when the site loads, it does not display a browser permission prompt.
- AE5. **Covers R3, R9.** Given a private copy changes its configured time and timezone, when the configured local time arrives, the summary uses that timezone's calendar date.
- AE6. **Covers R8.** Given a summary contains matching offers, when the user clicks it, Perq comes into view with those offers visible.

---

## Success Criteria

- A user can enable the feature once and receive one useful daily status message without manually checking the offer list.
- The summary never includes an offer from an unselected card or an unverified/inferred date.
- Template owners can change the default schedule without introducing accounts or hosted notification infrastructure.
- Planning and implementation do not need to invent permission, catch-up, empty-state, selection, timezone, or click behavior.

---

## Scope Boundaries

- Notifications while the browser or Perq site is completely closed are not required.
- Server-side web push, user accounts, email, Slack, and mobile-app notifications are out of scope.
- The feature does not create, infer, refresh, or change offer dates; it only reports trusted data already present in the private tracker.
- Per-offer reminder customization, snoozing, and multiple daily schedules are out of scope.

---

## Key Decisions

- Daily all-clear: send a notification even when no offer starts or ends that day, so silence is not ambiguous.
- Open-site delivery: optimize for the user's normal behavior of keeping Perq open and avoid server-side push infrastructure.
- Configurable template default: ship 12:00 PM Asia/Kolkata while allowing each private copy to choose its own schedule.
- Selected-card scope: match the wallet selection already stored in that browser.

---

## Dependencies / Assumptions

- The browser supports notifications and the user grants permission.
- Delivery timing may occur shortly after the configured minute when the browser throttles or suspends the page.
- Only offer rows with trusted dates are eligible for the summary, preserving Perq's official-source and fail-closed rules.
