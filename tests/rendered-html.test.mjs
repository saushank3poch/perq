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
  assert.match(html, /All your card offers, without the fine print\./);
  assert.match(html, /Times Black/);
  assert.match(html, /Platinum Card/);
  assert.match(html, /Infinia Metal/);
  assert.match(html, /Emirates Emeralde/);
  assert.match(html, /Featured offers worth knowing about/);
  assert.match(html, /All 68 Times Black benefits/);
  assert.match(html, /Complimentary First-Class Lounge Access/);
  assert.match(html, /Marshall Acton III/);
  assert.match(html, /Candlelight/);
  assert.match(html, /Check official source/);
  assert.match(html, /Official details/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
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

  assert.equal(benefits.length, 68);
  assert.equal(new Set(benefits.map((benefit) => benefit.id)).size, 68);
  assert.deepEqual(new Set(benefits.map((benefit) => benefit.section)), expectedSections);
  assert.ok(
    benefits.every((benefit) =>
      benefit.source.startsWith("https://www.timesblack.com/benefits/"),
    ),
  );
});
