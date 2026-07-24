import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Perq offer tracker", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Perq — Use the right card before the perk expires<\/title>/i);
  assert.match(html, /Use the right card\. Before the perk expires\./);
  assert.match(html, /Try the live demo/);
  assert.match(html, /Open source\.<\/strong>/);
  assert.match(html, /href="\/make-it-yours"/);
  assert.match(html, /India demo · source snapshot checked 22 Jul 2026/);
  assert.match(html, /Times Black/);
  assert.match(html, /Platinum Card/);
  assert.match(html, /Infinia Metal/);
  assert.match(html, /Emirates Emeralde/);
  assert.match(html, /Ranked offers/);
  assert.match(html, />Offers</);
  assert.match(html, />Card benefits</);
  assert.match(html, />Memberships</);
  assert.match(html, /Daily browser alert/);
  assert.match(html, /Offers starting or ending today/);
  assert.match(html, /Enable alerts/);
  assert.match(html, />Today</);
  assert.match(html, /Just For You personalized offers/);
  assert.match(html, /Open official details/);
  assert.match(html, /How ranking works/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("explains the private setup before sending people to GitHub", async () => {
  const response = await render("/make-it-yours");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Make Perq yours in three steps/);
  assert.match(html, /Create a private copy/);
  assert.match(html, /Open it in Codex/);
  assert.match(html, /Name your country and cards/);
  assert.match(html, /github\.com\/saushank3poch\/perq\/generate/);
  assert.match(html, /No card numbers/);
});

test("keeps issuer datasets in the unified catalogue", async () => {
  const [amex, infinia, allPerks] = await Promise.all([
    readFile(new URL("../app/data/amex-platinum.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/hdfc-infinia.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/all-perks.ts", import.meta.url), "utf8"),
  ]);

  assert.match(amex, /charge-platinum\/travel\.html/);
  assert.match(amex, /charge-platinum\/retail\.html/);
  assert.match(amex, /charge-platinum\/health-and-wellness\.html/);
  assert.match(amex, /Amex Wednesdays/);
  assert.match(infinia, /infinia-smartbuy-personalized/);
  assert.equal((infinia.match(/id: "infinia-smartbuy-[^"]+july-2026"/g) ?? []).length, 14);
  const smartBuyChannels = [...infinia.matchAll(/smartBuyChannel\(\{([\s\S]*?)\n  \}\),/g)].map(
    (match) => match[1],
  );
  assert.equal(smartBuyChannels.length, 14);
  assert.ok(
    smartBuyChannels
      .filter((channel) => /Reward Points/.test(channel))
      .every((channel) => /category: "Rewards"/.test(channel)),
  );
  assert.match(
    smartBuyChannels.find((channel) => /MyEMIShop/.test(channel)) ?? "",
    /category: "Shopping"/,
  );
  assert.equal((amex.match(/id: "amex-[^"]+"/g) ?? []).length, 75);
  assert.equal((infinia.match(/id: "infinia-[^"]+"/g) ?? []).length, 32);
  assert.equal((allPerks.match(/id: "emirates-[^"]+"/g) ?? []).length, 8);
  assert.equal(70 + 75 + 32 + 8, 185);
  assert.match(allPerks, /\.\.\.timesPerks/);
  assert.match(allPerks, /\.\.\.amexPlatinumPerks/);
  assert.match(allPerks, /\.\.\.hdfcInfiniaPerks/);
  assert.match(allPerks, /\.\.\.emiratesPerks/);
  assert.match(amex, /Marriott Bonvoy Gold Elite status/);
  assert.match(amex, /ALL Accor\+ Explorer membership/);
  assert.match(
    amex,
    /id: "amex-international-airline-program"[\s\S]*?kind: "card-benefit"/,
  );
  assert.match(
    amex,
    /id: "amex-global-lounge-collection"[\s\S]*?kind: "card-benefit"/,
  );

  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /perk\.kind === "membership"\) return "memberships"/);
  assert.match(page, /perk\.kind === "rewards-program"/);
  assert.match(page, /perk\.kind === "earning-channel" && !perk\.endDate/);
  assert.match(allPerks, /title === "Annual Zomato Gold membership/);
});

test("removes starter assets and keeps local preferences private", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /writeLocalPreference\("perq-selected-cards"/);
  assert.match(page, /writeLocalPreference\("perq-saved-offers"/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("keeps daily notifications opt-in and repository-configurable", async () => {
  const [page, config, declarations, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/notification-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/notification-schedule.d.mts", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(config, /time: "12:00"/);
  assert.match(config, /timeZone: "Asia\/Kolkata"/);
  assert.match(page, /Notification\.requestPermission\(\)/);
  assert.match(page, /perq-notification-last-sent/);
  assert.match(page, /view === "today"/);
  assert.match(page, /delivery\.claimedDate = scheduleState\.dateKey/);
  assert.match(page, /delivery\.disabledForSession = true/);
  assert.match(page, /readLocalPreference\(NOTIFICATIONS_ENABLED_KEY\)/);
  assert.match(page, /navigator\.locks\.request\(NOTIFICATION_DELIVERY_LOCK/);
  assert.match(page, /this browser cannot coordinate delivery across tabs/);
  assert.match(page, /delivery coordination failed in this browser/);
  assert.match(page, /window\.addEventListener\("storage", handleStorage\)/);
  assert.match(
    page,
    /event\.key === NOTIFICATIONS_ENABLED_KEY[\s\S]*?setNotificationState\(permission\)[\s\S]*?setNotificationsEnabled/,
  );
  assert.match(page, /new URLSearchParams\(window\.location\.search\)\.get\("view"\) === "today"/);
  assert.match(page, /window\.location\.assign\("\/\?view=today#catalogue"\)/);
  assert.match(page, /notification\.onclick = \(\) => \{/);
  assert.match(page, /finally \{\s*notification\.close\(\)/);
  assert.doesNotMatch(page, /findTodayOffers\([\s\S]*?\) as \{/);
  assert.ok(
    page.indexOf("notification.onclick =") <
      page.indexOf("writeLocalPreference(NOTIFICATION_LAST_SENT_KEY"),
    "notification click handling must be attached before marker persistence",
  );
  assert.ok(
    page.indexOf("navigator.locks.request(NOTIFICATION_DELIVERY_LOCK") <
      page.indexOf("const lastSentPreference = readLocalPreference(NOTIFICATION_LAST_SENT_KEY)") &&
      page.indexOf("const lastSentPreference = readLocalPreference(NOTIFICATION_LAST_SENT_KEY)") <
        page.indexOf("delivery.claimedDate = scheduleState.dateKey") &&
      page.indexOf("delivery.claimedDate = scheduleState.dateKey") <
        page.indexOf("writeLocalPreference(NOTIFICATION_LAST_SENT_KEY"),
    "due-check, claim, delivery, and marker persistence must stay inside the cross-tab lock",
  );
  assert.match(
    page,
    /if \(enabled\) \{\s*notificationDelivery\.current\.disabledForSession = false;\s*notificationDelivery\.current\.inFlight = false;/,
  );
  assert.match(page, /Alert configuration error: check the notification time and time zone/);
  assert.match(declarations, /findTodayOffers<T extends SchedulablePerk>/);
  assert.match(declarations, /TodayOffers<T>/);
  assert.match(readme, /app\/notification-config\.ts/);
  assert.match(readme, /site must be open/i);
  assert.match(readme, /00.*23.*00.*59/);
});

test("keeps the complete Times Black catalogue structurally sound", async () => {
  const source = await readFile(
    new URL("../app/times-black-benefits.ts", import.meta.url),
    "utf8",
  );
  const match = source.match(
    /timesBlackBenefits: TimesBlackBenefit\[\] = (\[[\s\S]*\]);/,
  );
  assert.ok(match, "Times Black data should remain a JSON-compatible array");

  const benefits = JSON.parse(match[1]);
  const expectedSections = new Set([
    "WELCOME",
    "SIGNATURE BENEFITS",
    "MILESTONES",
    "BONUS REWARDS",
    "EVENTS",
    "EXCLUSIVE DISCOUNTS",
  ]);

  assert.equal(benefits.length, 70);
  assert.equal(new Set(benefits.map((benefit) => benefit.id)).size, 70);
  assert.deepEqual(new Set(benefits.map((benefit) => benefit.section)), expectedSections);
  assert.ok(
    benefits.every((benefit) =>
      benefit.source.startsWith("https://www.timesblack.com/benefits"),
    ),
  );
});
