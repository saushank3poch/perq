import { readFile } from "node:fs/promises";

const cataloguePath = process.argv[2] ?? "catalogue/cards.json";
const allowedSourceKinds = new Set(["card", "benefits", "offers", "events", "rewards"]);
const forbiddenFields = new Set([
  "offer",
  "offers",
  "perk",
  "perks",
  "summary",
  "ranking",
  "rank",
  "expiry",
  "endDate",
  "startDate",
  "wallet",
  "selectedCards",
  "cardNumber",
  "credential",
  "password",
]);

function fail(message) {
  throw new Error(`${cataloguePath}: ${message}`);
}

function assertObject(value, context) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${context} must be an object`);
  }
}

function assertString(value, context) {
  if (typeof value !== "string" || !value.trim()) fail(`${context} must be a non-empty string`);
}

function assertAllowedKeys(value, allowedKeys, context) {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) fail(`${context}.${key} is not allowed`);
  }
}

function assertNoForbiddenFields(value, context = "catalogue") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoForbiddenFields(item, `${context}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;

  for (const [key, item] of Object.entries(value)) {
    if (forbiddenFields.has(key)) fail(`${context}.${key} is not allowed in the community catalogue`);
    assertNoForbiddenFields(item, `${context}.${key}`);
  }
}

export function validateCatalogue(catalogue) {
  assertObject(catalogue, "catalogue");
  assertAllowedKeys(catalogue, new Set(["schemaVersion", "cards"]), "catalogue");
  if (catalogue.schemaVersion !== 1) fail("schemaVersion must be 1");
  if (!Array.isArray(catalogue.cards) || catalogue.cards.length === 0) {
    fail("cards must be a non-empty array");
  }

  assertNoForbiddenFields(catalogue);
  const cardIds = new Set();

  catalogue.cards.forEach((card, cardIndex) => {
    const context = `cards[${cardIndex}]`;
    assertObject(card, context);
    assertAllowedKeys(card, new Set(["id", "country", "issuer", "name", "sources"]), context);
    assertString(card.id, `${context}.id`);
    assertString(card.country, `${context}.country`);
    assertString(card.issuer, `${context}.issuer`);
    assertString(card.name, `${context}.name`);
    if (!/^[A-Z]{2}$/.test(card.country)) fail(`${context}.country must be an ISO alpha-2 code`);
    if (cardIds.has(card.id)) fail(`${context}.id duplicates ${card.id}`);
    cardIds.add(card.id);
    if (!Array.isArray(card.sources) || card.sources.length === 0) fail(`${context}.sources must be a non-empty array`);

    const sourceUrls = new Set();
    card.sources.forEach((source, sourceIndex) => {
      const sourceContext = `${context}.sources[${sourceIndex}]`;
      assertObject(source, sourceContext);
      assertAllowedKeys(source, new Set(["kind", "label", "url"]), sourceContext);
      assertString(source.kind, `${sourceContext}.kind`);
      assertString(source.label, `${sourceContext}.label`);
      assertString(source.url, `${sourceContext}.url`);
      if (!allowedSourceKinds.has(source.kind)) fail(`${sourceContext}.kind is not supported`);
      let url;
      try {
        url = new URL(source.url);
      } catch {
        fail(`${sourceContext}.url must be a valid HTTPS URL`);
      }
      if (url.protocol !== "https:") fail(`${sourceContext}.url must use HTTPS`);
      if (url.username || url.password) fail(`${sourceContext}.url must not include credentials`);
      if (sourceUrls.has(source.url)) fail(`${sourceContext}.url is duplicated`);
      sourceUrls.add(source.url);
    });
  });
}

const rawCatalogue = await readFile(cataloguePath, "utf8");
validateCatalogue(JSON.parse(rawCatalogue));
console.log(`Validated ${cataloguePath}`);
