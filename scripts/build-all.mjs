#!/usr/bin/env node
/**
 * Builds the whole registry: runs `shadcn build` once per sub-registry
 * declared in root registry.json's `include`, then merges all of them into
 * the single public/r/registry.json the frontend actually fetches.
 *
 * `shadcn build` resolves each item's files[].path relative to the CWD, not
 * to the registry.json passed in — so each sub-registry must be built from
 * inside its own directory, with the output path adjusted for its depth
 * (e.g. icons/phosphor/ is two levels deep, components/ is one).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = JSON.parse(fs.readFileSync(path.join(REPO, "registry.json"), "utf8"));

for (const rel of root.include) {
  const dir = path.join(REPO, path.dirname(rel));
  const outDir = path.relative(dir, path.join(REPO, "public", "r"));
  console.log(`\n--- building ${rel} ---`);
  execSync(`npx shadcn@latest build registry.json -o "${outDir}"`, {
    cwd: dir,
    stdio: "inherit",
  });
}

console.log("\n--- merging combined index ---");
execSync(`node "${path.join(REPO, "scripts", "build-index.mjs")}" "${REPO}"`, {
  stdio: "inherit",
});
