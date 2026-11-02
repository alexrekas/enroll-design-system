# Enroll Design System (Vitae 27)

Vitae 27 is the design system for Enroll. One set of tokens and components serves four clients, each in light and dark mode:

| Client | Product |
|---|---|
| **EA** | Enroll App, the unbranded demo client (default) |
| **DC** | DC Health Link |
| **MA** | Massachusetts Health Connector |
| **ME** | CoverME.gov |

- **Storybook:** https://alexrekas.github.io/enroll-design-system/ (rebuilt on every push to `main`)
- **Figma:** [Vitae 27](https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F/Vitae-27), the design source for every component
- **Target stack:** Rails `html.erb`. The markup on each Storybook Docs page is the contract.

## Quick start

```bash
npm install
npm run storybook        # http://localhost:6006
npm run build            # rebuild tokens into dist/
```

Uses Node 22 (the version CI runs). Story checks also need Chromium for Playwright: `npx playwright install chromium`.

## Using the tokens

Load one stylesheet and set the client and mode on the page:

```html
<link rel="stylesheet" href="dist/v2/css/vitae.css">
<html data-client="dc" data-mode="dark">
```

`vitae.css` holds all 8 client/mode combinations; EA light is also the `:root` default. Every variable starts with `--vitae-`. Use semantic tokens (`--vitae-text-body`, `--vitae-action-primary`, `--vitae-border-subtle`) in components, never primitives or hard-coded values.

| Output | What it's for |
|---|---|
| `dist/v2/css/vitae.css` | All clients and modes, switched by `data-client` / `data-mode` |
| `dist/v2/css/vitae.<client>.<mode>.css` | One combination, for apps that only ever need one |
| `dist/v2/docs/vitae.<client>.<mode>.json` | Flat resolved values (used by the contrast check and for reference) |
| `dist/v2/docs/manifest.json` | Token list with descriptions |

Component CSS (`vitae-btn`, `vitae-field`, `vitae-alert` …) is in `stories/vitae/vitae.css` and each component's markup is in `stories/vitae/markup/`; together they're the reference implementation for the Rails components.

## How the repo is organized

```
tokens-v2/            Vitae 27 tokens (DTCG JSON) — see tokens-v2/README.md
  primitives.json       raw values: color ramps, spacing, radius, type, motion
  brand/{ea,dc,ma,me}   what differs by client: brand ramps, fonts, radii, client settings
  semantic/{light,dark} what components use, by meaning, per mode
build-v2.mjs          Style Dictionary build for tokens-v2 → dist/v2/
stories/vitae/        Vitae 27 Storybook: Introduction, Foundations, Icons, Logos, Sample users
  components/<group>/   one story file per component (actions, forms, feedback, navigation, layout, shopping, patterns)
  markup/               plain functions that return each component's HTML (the contract the Rails components match)
  data.js               shared sample data: people, plans and records used by every story
  vitae.css             component CSS
  icons/                Fluent 2 icons (from github.com/microsoft/fluentui-system-icons) and header icons
.storybook/           Storybook config: Theme and Mode toolbar, design-source badge, accessibility panel
figma-links.json      Storybook pages each Figma component links to
check-*.mjs           CI checks (below)
rails/                Rails ViewComponents (vitae_components gem), a Lookbook demo app and the parity test — see rails/README.md

tokens/, build.mjs, stories/*.stories.js, dist/{css,scss,docs}
                      Legacy (v1) system, kept for reference (notes in LEGACY.md). Shown under "Legacy (v1)" in Storybook.
```

The token layers mirror the Figma variable collections: **Primitives**, **Brand** (modes EA, DC, MA, ME) and **Color** (modes Light, Dark). In Figma, set the Brand and Color modes on the page frame or section, never on a component.

## Checks

CI (`.github/workflows/ci.yml`) runs these on every push and pull request, then publishes Storybook to GitHub Pages from `main`.

| Command | What fails the build |
|---|---|
| `npm run check:contrast` | Any Vitae 27 semantic color pair below WCAG 2.1 AA in any client or mode: 4.5:1 for text, 3:1 for focus rings, field borders and icons. Also checks the legacy v1 pairs. |
| `npm run check:sources` | A story file with no `parameters.design` (the Figma frame it was built from). |
| `npm run check:links` | A Storybook page that a Figma component links to no longer exists. Renaming a Storybook title means updating `figma-links.json` and the Figma documentation link. |
| `npm run check:stories` | Any Vitae 27 story that errors, has a failing play function, or has an axe WCAG 2.1 A/AA violation, in any of the 8 client/mode combinations. Run after `npm run build-storybook`; add `--quick` for EA light only or `--only=button,upload` to filter. |
| `npm run check:rails` | A Rails component (`rails/vitae_components`) whose HTML differs from the Storybook markup, or stale copies of the CSS and icons in the gem. Needs Ruby (no gems). |
| `npm run check:visual` | Any Vitae 27 story that looks different from its approved screenshot in `visual-baselines/` (EA light, DC dark, MA light, ME dark). CI uploads a **visual-report** artifact with the baseline, the new screenshot and the difference for each change. |

**Approving visual changes.** When a change is intended, accept it as the new baseline: Actions → Design System CI → Run workflow → tick **Accept the current look of every story as the new visual baseline**. CI takes new screenshots and commits them. Baselines are made in CI because a Mac renders text slightly differently, so compare there rather than locally. A new story only gets a baseline on the next acceptance.

The **Accessibility** tab under each story in Storybook runs the same axe rules. Automated checks find only part of the problems, so also check new components with a keyboard and a screen reader.

## Contributing

- **Design first.** Components are built in Figma, then in Storybook; every story's Source badge links to its Figma frame.
- **Adding a component:** put its HTML function in `stories/vitae/markup/`, its stories in `stories/vitae/components/<group>/<name>.stories.js` (title `Vitae 27/Components/<Group>/<Name>`, a `Playground` story driven by args, then state stories), sample content in `data.js`, and an interaction test (`play`) if it has behavior. Add its Figma node to `figma-links.json` and set the Figma documentation link.
- **No hard-coded values.** Colors, spacing, radius, borders, type and effects come from tokens.
- **Accessibility:** WCAG 2.1 AA. Never rely on color alone; focus is a 2px dashed ring on `:focus-visible`; disabled controls have no hover or pressed state; phone numbers are `tel:` links.
- **One responsive component** rather than separate desktop and mobile versions, unless the narrow version is a different pattern.
- **Publishing:** pushing to `main` rebuilds Storybook. Put `[skip ci]` anywhere in the commit message to skip the workflow, or rebuild by hand from Actions → Design System CI → Run workflow. Hosting is GitHub Pages only.

Questions or changes: Alex Rekas, Design Lead, IdeaCrew.
