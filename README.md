# envoyai Library

The [envoyai](https://envoyai.xyz) component registry — shadcn-compatible, installed
straight from GitHub. Components are copied into your project, so you own the code.

This repo holds **only components**. The website that browses and previews them
lives separately in [`xnsteam-ai/envoyai`](https://github.com/xnsteam-ai/envoyai)
and is never shipped as installable code.

## Install

Requires an existing shadcn project (`npx shadcn@latest init`).

```bash
npx shadcn@latest add xnsteam-ai/Envoyai-Library/deep-search
```

Swap the last segment for any item name below.

### Branded namespace (optional)

To install as `@envoyai/deep-search`, add the namespace to your `components.json`
once, then reference items by short name:

```json
{
  "registries": {
    "@envoyai": "https://envoyai.xyz/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @envoyai/deep-search
```

This needs the generated JSON served at that URL — run `pnpm registry:build` and
publish `public/r/` from the website deployment. The GitHub install above works
with no hosting at all.

## Components

| Item | Description | Deps |
| --- | --- | --- |
| `deep-search` | Search bar with clear, filters and visual-search triggers | `lucide-react` |
| `category-pills` | Scrollable row of selectable category pills | — |
| `library-sidebar` | Icon and label sidebar navigation with active state | — |
| `theme-toggle` | Light/dark toggle, hydration safe | `lucide-react`, `next-themes` |
| `envoy-logo` | The envoyai mark as inline SVG | — |

Every component is controlled-or-uncontrolled, forwards native props, and styles
itself from your existing shadcn theme tokens (`--foreground`, `--muted`,
`--border`, …). No envoyai-specific CSS to import.

## Adding a component

1. Create `components/<name>/<name>.tsx`.
2. Append an entry to `registry.json` — `files[].path` is repo-relative,
   `files[].target` is where it lands in the user's project.
3. Commit. The GitHub install path picks it up immediately.

Keep this repo pure: no pages, no layouts, no site config, no app shell.

## Building the JSON output

```bash
pnpm install
pnpm registry:build
```

Writes `public/r/<name>.json` for URL-based installs. Not required for GitHub installs.
