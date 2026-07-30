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
npx shadcn@latest add xnsteam-ai/Envoyai-Library/tag-picker
npx shadcn@latest add xnsteam-ai/Envoyai-Library/envoy-noir
npx shadcn@latest add xnsteam-ai/Envoyai-Library/aurora-background
```

Swap the last segment for any item name in the tables below.

## Catalogue

1,700+ items across six categories — run `npx shadcn@latest registry validate` for the exact current count.

### Component — `registry:ui`

Five full-width marketing blocks:

| Item | Description | Deps |
| --- | --- | --- |
| `feature-grid` | Bento-style feature showcase: two detail cards plus a full-width highlight row | `lucide-react` |
| `stats-band` | Horizontal strip of key metrics, divided by hairlines | — |
| `pricing-cards` | Three-tier pricing layout with a highlighted plan and feature checklist | `lucide-react` |
| `testimonial-wall` | Responsive grid of quote cards with initials avatars | `lucide-react` |
| `cta-banner` | Full-width call-to-action band with a soft radial backdrop | `lucide-react` |

Plus 19 smaller primitives shadcn's own registry doesn't ship — see the
Primitives section directly below.

### Primitives — `registry:ui`

These 19 fill gaps in shadcn's own component set — nothing here duplicates
an official item. Each one composes existing Radix/shadcn primitives rather
than reinventing them (`tag-picker` is Popover + Command + this repo's own
`tag`, `tree` is Collapsible, `toolbar` is `@radix-ui/react-toolbar`).

| Item | Description |
| --- | --- |
| `portal` | Renders children into a different part of the DOM, mounted client-side only |
| `image` | An img with real loading/error states instead of a blank box or broken-image icon |
| `list` | A structured list of rows — plain, divided or bordered |
| `info-label` | A form label with an inline info icon that reveals help text in a tooltip |
| `search-box` | A search field built on InputGroup — leading icon, clear button, shortcut hint |
| `tag` | A dismissible/interactive chip, distinct from the static `Badge` |
| `avatar-group` | Overlapping avatars with a `max` cutoff collapsing the rest into "+N" |
| `persona` | An avatar paired with name, secondary text and a presence indicator |
| `app-provider` | The one wrapper an app mounts at its root — theme, tooltip provider, toast viewport |
| `spin-button` | A number field with increment/decrement steppers, clamped to min/max |
| `rating` | An interactive star rating input, with optional half-star clicks |
| `rating-display` | A read-only rating — filled/partial/empty stars plus a review count |
| `swatch-picker` | A grid of preset color swatches on a single RadioGroup |
| `color-picker` | A saturation/value area, hue slider and hex input kept in sync through one HSV state |
| `toolbar` | A row of grouped actions with proper roving-tabindex keyboard navigation |
| `tag-picker` | A multi-select combobox that renders its selection as removable Tags |
| `overflow` | Renders as many items as fit on one line, collapses the rest into a "+N" dropdown |
| `teaching-popover` | A coachmark — title, body, step counter, next/prev |
| `tree` | A nested expandable tree with roving-tabindex keyboard navigation |

**Naming.** These names follow Fluent UI v9's vocabulary, since that's the
list this batch was specified against. Where Fluent and shadcn already agree
(`Accordion`, `Avatar`, `Badge`, `Button`, `Card`, `Checkbox`, `Dialog`,
`Input`, `Popover`, `Select`, `Switch`, `Tooltip`, and others) or shadcn has
the same thing under a different name (`Divider`→`separator`,
`Dropdown`→`dropdown-menu`, `ProgressBar`→`progress`, `TabList`→`tabs`,
`DataGrid`→`data-table`, `MessageBar`→`alert`, `Nav`→`navigation-menu`,
`Text`→`typography`), that upstream item is what `registryDependencies`
points at — nothing is re-shipped here under a second name, since both
would install to the same `components/ui/button.tsx` and collide.
`FluentProvider`'s role is covered by `app-provider`, named neutrally since
this registry isn't shipping the Fluent design system, just the same
"wrap the app once" job.

### Icon — Phosphor set

1,512 icons from [Phosphor](https://phosphoricons.com) (MIT), each shipping
three weights: regular, bold and duotone.

```bash
npx shadcn@latest add xnsteam-ai/Envoyai-Library/ph-acorn
```

Names are prefixed `ph-` because both sets have a `cube`, a `compass` and a
`terminal` — the prefix keeps them from colliding with the hand-drawn envoyai
glyphs. Each item's `meta` records its `set`, `pascalName`, available `weights`
and search `tags`; Phosphor's own categories become filter tags.

Phosphor draws with fills rather than strokes, so weight is a different file
rather than a `stroke-width` — that is why three weights ship per icon.

> Iconsax was considered and ruled out: its licence forbids redistributing loose
> icon files on both the free and premium tiers, which is exactly what a
> registry does.

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

### Palette & Color — `registry:theme`

| Item | Description |
| --- | --- |
| `envoy-noir` | House palette. Pure monochrome, high contrast in both modes |
| `envoy-ember` | Warm ember accent over a near-black base |

These are tagged `palette` and live in `palettes/`. The item `type` stays
`registry:theme` — that value is fixed by the shadcn registry schema, so
renaming it would fail validation and break `shadcn add`.

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

40 photos at 1600px JPEG, across seven folders — `faces/` (10 human-face
portraits), `renders/` (3D/abstract), `commerce/`, `pro/`, `classic/`,
`modern/` (20 across these four, added as one batch), and `people/` (10
candid/group/lifestyle shots).

```bash
npx shadcn@latest add xnsteam-ai/Envoyai-Library/portrait-aiony
```

They land at `public/media/<folder>/<name>.jpg`.

**Provenance.** Sourced through the official Unsplash API with `unsplash-js`,
screened to exclude Unsplash+ and Getty-partnered stock. Each item's `meta`
carries the photographer's name, their profile URL and the photo's page, so
real attribution travels with the asset even though the site's own UI labels
these "Envoyai Library" rather than naming the source directly:

```json
"meta": {
  "photographer": "Aiony Haust",
  "photographerUrl": "https://unsplash.com/@aiony?utm_source=envoyai&...",
  "photoUrl": "https://unsplash.com/photos/...",
  "licence": "Free for personal & commercial use"
}
```

`photographerUrl`/`photoUrl` are real, working links back to the source —
those don't get rebranded even where display copy does, since that's the
actual attribution the terms these photos were vendored under require. The
download endpoint was tracked for each photo at vendoring time, as the API
guidelines require.

All 40 items carry a `meta.masterPrompt` (subject/composition/environment/
lighting/camera/atmosphere, written from actually looking at the photo — see
`registry.ts`'s `masterPromptFor` in the [website repo](https://github.com/xnsteam-ai/envoyai))
and a `meta.brief` (the short description shown in the library's Description
tab). The 30 non-portrait items use the
`scene`/`object` subject shape rather than the person shape the 10 portraits
use, since age/expression/clothing can't describe a rendered cube or a
marble countertop.

The gradient-mesh wallpapers that used to live here now ship as pure-CSS
backgrounds — see the Background section.

## Structure

The root `registry.json` uses `include` to pull in one manifest per category, so
each part is maintained separately.

```
registry.json                    ← root, include[] only
components/registry.json         ← registry:ui (5 marketing blocks + 19 primitives)
templates/registry.json          ← registry:block
palettes/registry.json           ← registry:theme
icons/registry.json              ← registry:ui + registry:file (hand-drawn glyphs)
icons/phosphor/registry.json     ← registry:file (1,512 Phosphor icons, MIT)
backgrounds/registry.json        ← registry:file (CSS)
media/registry.json              ← registry:file (JPEG photos)
logos/registry.json              ← registry:file (130 brand SVGs)
scripts/build-index.mjs          ← merges every manifest above into public/r/registry.json
scripts/build-all.mjs            ← runs shadcn build per manifest, then build-index.mjs
public/r/<item>.json             ← generated per-item install payload, one per item
public/r/registry.json           ← generated combined index — this is what the website fetches
```

File paths inside each manifest are relative to that manifest, not to the repo root — `shadcn build`
must be run from inside each manifest's own directory, which is why the two build scripts exist
rather than one `shadcn build` invocation at the repo root.

## Branded namespace (optional)

To install as `@envoyai/tag-picker`, add the namespace to your `components.json`
once:

```json
{
  "registries": {
    "@envoyai": "https://envoyai.xyz/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @envoyai/tag-picker
```

This needs `public/r/` served at that URL — publish it from the website
deployment. The GitHub install above needs no hosting at all.

## Contributing an item

1. Drop the source into the matching category folder.
2. Append an entry to that folder's `registry.json`. `files[].path` is relative to
   that manifest; `files[].target` is where it lands in the user's project.
3. Validate and rebuild:

   ```bash
   npm run registry:validate
   npm run registry:build
   ```

   `registry:build` runs `shadcn build` once per manifest (each must run from its
   own directory — `files[].path` resolves relative to CWD, not to the
   `registry.json` passed in) and then regenerates the combined `public/r/registry.json`
   index. Running `shadcn build` directly at the repo root only builds whichever
   single manifest you point it at, and fails outright on any manifest other than
   the root with paths relative to that manifest's own folder.

4. Commit. GitHub installs pick it up immediately.

Keep this repo pure: no pages, no layouts, no site config, no app shell.
