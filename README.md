# Enroll Design System — Tokens (Phase 1)

DTCG-format design tokens for Enroll App, themed for **EA** (unbranded default), **DC HealthLink**, **MA Health Connector**, and **CoverME.gov**. Built with Style Dictionary v4.

Source precedence (decided 7/9/26): **Vitae → EA-DesignSystem-2021 → Enroll code.** Every color token's `$description` names its source; `interpolated`/`extrapolated`/`PLACEHOLDER` values are flagged for review.

## Structure

```
tokens/
  primitives/   color.json (brand ramps per client, gray, feedback), dimension.json, typography.json
  semantic/     semantic.json — intent-named tokens; THE theming layer. References {color.brand.*}
  component/    component.json — button + input seed, aliases semantic only
  themes/       ea.json  dc.json  ma.json  me.json — bind color.brand.* to a client's primitive ramps
build.mjs       builds all 4 themes → dist/
contrast-check.mjs  WCAG 2.1 AA gate (run in CI; fails build on violation)
```

## Usage

```bash
npm install
npm run build           # dist/css, dist/scss, dist/docs per theme
npm run check:contrast  # AA gate
npm run storybook       # design library at localhost:6006
npm run build-storybook # static build (a prebuilt copy ships in storybook-static/)
```

**Storybook design library:** 23 components (Accordion, Alert, Breadcrumbs, Button, Card, Checkbox, Date Picker, Dropdown, Field-Set, Header/Footer/LeftNav, Icon, Log-In, Modal, Pagination, Plan, Progress, Radio, Table, Tag, Text Input, Toggle, Tooltip), plus Foundations pages (color ramps, cross-theme hex reference, spacing, radius, typography) generated from the built token manifests. The toolbar's Theme menu re-renders any story in EA / DC / MA / ME instantly. Reference component classes live in `.storybook/tokens.css` (`ea-btn`, `ea-input`, `ea-alert`) — the same markup contract mockups and Enroll App adoption will use.

**Web:** load `dist/css/tokens.ea.css` (also binds `:root`) plus the client file; switch brand with `<html data-theme="dc">`.
**Enroll App (Rails):** `@import 'dist/scss/tokens.me';` — replaces `.scss.erb` config interpolation over time.
**Figma:** `dist/docs/tokens.{theme}.json` flat manifests feed variable import / REST sync (Phase 2).

## CI (GitHub)

`.github/workflows/ci.yml` runs on every push/PR: token build → contrast gate (build fails on any AA violation) → Storybook build → deploy to **GitHub Pages**. One-time setup after pushing the repo: Settings → Pages → Source = "GitHub Actions". The design library is then hosted at `https://<org>.github.io/<repo>/` and updates on every merge.

## Architecture rules

1. Components/designs never reference primitives — only semantic (or component) tokens.
2. A client theme overrides **only** `color.brand.*` bindings, `font.family.brand`, and `radius.button` (+ documented exceptions).
3. Adding client #5 = one new theme file + one primitive ramp set.
4. Contrast gate must pass for every theme before merge.

## Where each story comes from

Every Storybook story shows a **Source** badge under it, linking to the Figma frame it was built from:

| Badge | Meaning |
|---|---|
| **From Figma** | Built from that frame and checked against it |
| **Adapted from Figma** | Built from the frame, restyled onto Enroll tokens or anatomy (e.g. Fluent 2 tooltip/calendar) |
| **Reference · not re-verified** | Built from that frame in an earlier pass; not re-checked since |
| **Projected · no Figma frame yet** | No frame exists for this client/variant; built from the closest real frame |

Stories declare this with `parameters.design` (see `.storybook/preview.js`). CI fails if a story file has none (`npm run check:sources`). Logos and header/footer icons in `stories/brand-assets.js` are exported from Figma (`exportAsync`), not redrawn.

## Resolved 10/14/26

- **Base font:** Open Sans (`font.family.base`). Roboto Flex removed. ME keeps Barlow.
- **Button radius** comes from EA-DesignSystem-2021 per theme: EA 6px, DC 4px, MA 3px, ME 6px. (Vitae draws 24px pills; not adopted.)
- **Metal levels** (2021 DS `Metal-Level/*` = Vitae semantic `Tag/*` borders): Platinum `#5D5D60`, Gold `#FABB18`, Silver `#C0C0C0`, Bronze `#CD7F32`, plus Vitae tag tints. `#F7B319` was legacy Enroll code, not Vitae. Vitae's *primitive* metal layer (`#D4AF37` gold, `#E5E4E2` platinum) is stale and superseded.
- **Catastrophic** metal level: `#4A6274` steel, tint `#DCE4EA` (approved 10/14/26; not in either Figma file).
- **EA secondary** is Vitae slate `#3B5B81`, not the 2021 swatch navy `#00224D` (confirmed 10/14/26).
- **Color ramps:** every brand ramp (EA/DC/MA/ME × primary/secondary/tertiary, steps 005–150 incl. 010/020/030/035/040) is now taken verbatim from Vitae's `Color/Brand/*` variables. Nothing is interpolated. The 2021 DS's *variables* disagree with its own swatch page in places (e.g. its DC page labels Primary-100 `#007BC4` under a navy swatch, and its EA Tertiary/100 variable is blue `#0067A1` under a plum swatch). Vitae is internally consistent, so it wins.
- **Type scale:** semantic `type.*` tokens follow the 2021 DS (h1 36/54, h2 24/36, h3 18/27, dialog 20/28, paragraph 16/24, button 16/20, table 16/14/12, breadcrumb 14/20).

## Known gaps

- **Vitae divergences from the 2021 type scale** (not adopted): Vitae h2 32/40, h3 28/35, 1.25 line-height everywhere, table data +2px.
- **Header/Footer:** only the latest-Bootstrap style is modeled (DC/MA production still run an older version). Maine (ME-nuharbor-1) is the only client with latest-Bootstrap frames; EA/DC/MA are projected from it. The MA logo available in the 2021 file is the "for Business" lockup.
- **Vitae EA-Dark mode** exists in the Vitae variable collection; no dark theme is built here yet.
- **Stock Fluent 2 (decided 10/14/26):** date-picker calendar popover and tooltip follow Fluent 2 anatomy on Enroll tokens. Dropdown option panel isn't designed (native `<select>` used).
- **Outline buttons rest on white**, not Vitae's ramp-005 tint. DC secondary `#0076CC` and MA secondary `#C15800` sit right at the AA line (4.71:1 and 4.50:1 on white); the 005 tint pulls them to 4.39:1 and 4.20:1. Text/border colors follow Vitae (100 → 120 → 140 across rest/hover/active).
- **Solid button border** = ramp 150 (Vitae `button-*-solid`). Vitae's MA secondary-solid border points at *primary*-150 (likely a typo); we use secondary-150.
- Gold `#FABB18` lives at `color.metal.gold` and is a metal-level plan indicator ONLY. Never use it for buttons or accents.
