#!/usr/bin/env node
/**
 * Rebuilds public/r/registry.json — the single combined index the frontend
 * fetches to browse/filter every item. `shadcn build` only emits per-item
 * install files (public/r/<name>.json); it doesn't compose the root
 * registry.json's `include[]` into one browsing index, so that step is done
 * here by concatenating each sub-manifest's full items (including `meta`) in
 * the same order as root registry.json's `include` list, prefixing each
 * item's files[].path with its source folder (files are stored relative to
 * the sub-registry that declares them, e.g. "faces/x.jpg" inside
 * media/registry.json, but the frontend needs the full repo-relative path,
 * "media/faces/x.jpg").
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = process.argv[2] ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = JSON.parse(fs.readFileSync(path.join(REPO, "registry.json"), "utf8"));

const items = [];
for (const rel of root.include) {
  const folder = path.dirname(rel); // e.g. "media", "icons/phosphor"
  const sub = JSON.parse(fs.readFileSync(path.join(REPO, rel), "utf8"));
  for (const item of sub.items) {
    const files = item.files?.map(f => ({ ...f, path: `${folder}/${f.path}` }));
    items.push(files ? { ...item, files } : item);
  }
}

const index = {
  $schema: root.$schema,
  name: root.name,
  homepage: root.homepage,
  items,
};

fs.writeFileSync(path.join(REPO, "public", "r", "registry.json"), JSON.stringify(index) + "\n");
console.log(`Wrote public/r/registry.json with ${items.length} items.`);
