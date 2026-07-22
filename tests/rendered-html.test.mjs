import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /<title>Perq — Your credit card offers, simplified<\/title>/i);
  assert.match(html, /Every card benefit, ranked in one place\./);
  assert.match(html, /India demo · source snapshot checked 22 Jul 2026/);
  assert.match(html, /Times Black/);
  assert.match(html, /Platinum Card/);
  assert.match(html, /Infinia Metal/);
  assert.match(html, /Emirates Emeralde/);
  assert.match(html, /Ranked offers/);
  assert.match(html, />Offers</);
  assert.match(html, />Card benefits</);
  assert.match(html, />Memberships</);
  assert.match(html, /Just For You personalized offers/);
  assert.match(html, /Open official details/);
  assert.match(html, /How ranking works/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
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
  assert.equal((allPerks.match(/id: "emirates-[^"]+"/g) ?? []).length, 3);
  assert.equal(70 + 75 + 32 + 3, 180);
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

  assert.match(page, /localStorage\.setItem\("perq-selected-cards"/);
  assert.match(page, /localStorage\.setItem\("perq-saved-offers"/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
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
