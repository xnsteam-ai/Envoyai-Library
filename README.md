# envoyai Library

The [envoyai](https://envoyai.xyz) asset registry — shadcn-compatible, installed
straight from GitHub, free forever. No server, no backend, no paywall: GitHub
itself is the registry.

Components are copied into your project, so you own the code.

This repo holds **assets only**. The website that browses and previews them lives
separately in [`xnsteam-ai/envoyai`](https://github.com/xnsteam-ai/envoyai) and is
never shipped as installable code.

## Install

Requires an existing shadcn project (`npx shadcn@latest init`).

```bash
npx shadcn@latest add xnsteam-ai/Envoyai-Library/deep-search
npx shadcn@latest add xnsteam-ai/Envoyai-Library/envoy-noir
npx shadcn@latest add xnsteam-ai/Envoyai-Library/mesh-ember
```

Swap the last segment for any item name in the tables below.

## Catalogue

21 items across six categories.

### Component — `registry:ui`

| Item | Description | Deps |
| --- | --- | --- |
| `deep-search` | Search bar with clear, filters and visual-search triggers | `lucide-react` |
| `category-pills` | Scrollable row of selectable category pills | — |
| `library-sidebar` | Icon and label sidebar navigation with active state | — |
| `theme-toggle` | Light/dark toggle, hydration safe | `lucide-react`, `next-themes` |
| `asset-card` | Asset preview card with copy-to-clipboard install command | `lucide-react` |

### Icon & Logo — brand logos

130 AI and LLM provider logos, each shipping a monochrome SVG plus a full-colour
variant where one exists (98 of them). Install by slug:

```bash
npx shadcn@latest add xnsteam-ai/Envoyai-Library/openai-logo
```

Each carries a `meta` block with a stable `logoId`, its `slug`, and whether a
colour variant exists — that id is what the site's `/logo/{id}/{slug}` pages and
PNG links are keyed on, so it must stay stable. Ids are assigned alphabetically
by slug, so adding a brand never renumbers the others.

**Provenance.** These marks are vendored from
[`@lobehub/icons`](https://github.com/lobehub/lobe-icons) (MIT). The MIT licence
covers the packaging, not the marks: every logo remains the trademark of its
owner and is included for identification only. Using one does not imply
endorsement, and brand-guideline rules still apply to whoever ships it.

### Template — `registry:block`

| Item | Description |
| --- | --- |
| `library-shell` | Browse layout: sidebar, search, category filters, results grid |

### Theme & Color — `registry:theme`

| Item | Description |
| --- | --- |
| `envoy-noir` | House theme. Pure monochrome, high contrast in both modes |
| `envoy-ember` | Warm ember accent over a near-black base |

### Icon & Logo — `registry:ui` + `registry:file`

| Item | Type | Lands at |
| --- | --- | --- |
| `envoy-logo` | React component | `components/ui/envoy-logo.tsx` |
| `envoy-mark` | SVG file | `public/brand/envoy-mark.svg` |
| `envoy-wordmark` | SVG file | `public/brand/envoy-wordmark.svg` |

### Background — `registry:file`

| Item | Lands at |
| --- | --- |
| `grid-background` | `styles/backgrounds/grid-background.css` |
| `aurora-background` | `styles/backgrounds/aurora-background.css` |

### Image & Video — `registry:file`

Eight original gradient-mesh wallpapers, each under 2 KB of scalable SVG — no
raster assets, no Git LFS, no bandwidth cost.

`mesh-ember` · `mesh-noir` · `mesh-tide` · `mesh-moss` · `mesh-orchid` ·
`mesh-dune` · `mesh-glacier` · `mesh-rosewood`

All land at `public/media/<name>.svg`.

## Structure

The root `registry.json` uses `include` to pull in one manifest per category, so
each part is maintained separately.

```
registry.json              ← root, include[] only
components/registry.json   ← registry:ui
templates/registry.json    ← registry:block
themes/registry.json       ← registry:theme
icons/registry.json        ← registry:ui + registry:file
backgrounds/registry.json  ← registry:file (CSS)
media/registry.json        ← registry:file (SVG)
public/r/                  ← generated, one JSON per item
```

File paths inside each manifest are relative to that manifest, not to the repo root.

## Branded namespace (optional)

To install as `@envoyai/deep-search`, add the namespace to your `components.json`
once:

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

This needs `public/r/` served at that URL — publish it from the website
deployment. The GitHub install above needs no hosting at all.

## Contributing an item

1. Drop the source into the matching category folder.
2. Append an entry to that folder's `registry.json`. `files[].path` is relative to
   that manifest; `files[].target` is where it lands in the user's project.
3. Validate and rebuild:

   ```bash
   npx shadcn@latest registry validate
   npx shadcn@latest build
   ```

4. Commit. GitHub installs pick it up immediately.

Keep this repo pure: no pages, no layouts, no site config, no app shell.
