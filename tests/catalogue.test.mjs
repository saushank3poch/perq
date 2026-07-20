import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const validator = new URL("../scripts/validate-catalogue.mjs", import.meta.url);
const catalogue = new URL("../catalogue/cards.json", import.meta.url);
const validatorPath = fileURLToPath(validator);
const cataloguePath = fileURLToPath(catalogue);

test("community catalogue is source-only and valid", async () => {
  const { stdout } = await execFileAsync(process.execPath, [validatorPath, cataloguePath]);
  assert.match(stdout, /Validated/);

  const parsed = JSON.parse(await readFile(catalogue, "utf8"));
  assert.equal(parsed.cards.length, 4);
  assert.ok(parsed.cards.every((card) => card.sources.every((source) => source.url.startsWith("https://"))));
});

test("catalogue validator rejects private and generated fields", async () => {
  const folder = await mkdtemp(join(tmpdir(), "perq-catalogue-"));
  const invalidPath = join(folder, "invalid.json");
  await writeFile(
    invalidPath,
    JSON.stringify({
      schemaVersion: 1,
      cards: [
        {
          id: "in-example-card",
          country: "IN",
          issuer: "Example Bank",
          name: "Example Card",
          wallet: true,
          sources: [{ kind: "card", label: "Card page", url: "https://example.com/card" }],
        },
      ],
    }),
  );

  await assert.rejects(execFileAsync(process.execPath, [validatorPath, invalidPath]), (error) => {
    assert.match(error.stderr, /wallet is not allowed/);
    return true;
  });
});

test("catalogue validator rejects source URLs containing credentials", async () => {
  const folder = await mkdtemp(join(tmpdir(), "perq-catalogue-"));
  const invalidPath = join(folder, "invalid.json");
  await writeFile(
    invalidPath,
    JSON.stringify({
      schemaVersion: 1,
      cards: [
        {
          id: "in-example-card",
          country: "IN",
          issuer: "Example Bank",
          name: "Example Card",
          sources: [{ kind: "card", label: "Card page", url: "https://secret@example.com/card" }],
        },
      ],
    }),
  );

  await assert.rejects(execFileAsync(process.execPath, [validatorPath, invalidPath]), (error) => {
    assert.match(error.stderr, /must not include credentials/);
    return true;
  });
});
