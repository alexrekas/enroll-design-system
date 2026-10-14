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

## Resolved 10/14/26

- **Base font:** Open Sans (`font.family.base`). Roboto Flex removed. ME keeps Barlow.
- **Button radius** comes from EA-DesignSystem-2021 per theme: EA 6px, DC 4px, MA 3px, ME 6px. (Vitae draws 24px pills; not adopted.)
- **Metal levels** (2021 DS `Metal-Level/*` = Vitae semantic `Tag/*` borders): Platinum `#5D5D60`, Gold `#FABB18`, Silver `#C0C0C0`, Bronze `#CD7F32`, plus Vitae tag tints. `#F7B319` was legacy Enroll code, not Vitae. Vitae's *primitive* metal layer (`#D4AF37` gold, `#E5E4E2` platinum) is stale and superseded.
- **Interpolated ramp steps:** the 2021 DS defines full 050–150 ramps. EA primary and MA tertiary interpolated steps are now the 2021 values (MA/ME ramps already matched 2021).
- **Type scale:** semantic `type.*` tokens follow the 2021 DS (h1 36/54, h2 24/36, h3 18/27, dialog 20/28, paragraph 16/24, button 16/20, table 16/14/12, breadcrumb 14/20).

## Known gaps

- **Ramp steps that 2021 can't fill** (still interpolated, flagged in `$description`):
  - EA secondary/tertiary: 2021 uses different colors (navy `#00224D` / blue `#0067A1`) than Vitae (slate `#3B5B81` / plum `#441C36`). Decide which family EA uses.
  - DC primary: 2021's DC primary ramp is non-monotonic (its 050–090 and 110–150 are light blues derived from `#0076CC`; looks swapped with secondary). DC tertiary's 2021 ramp is gold/brown while its 100 is red `#DA2325`. We keep monotonic ramps from the Vitae/decided 100s.
  - The 025 step doesn't exist in 2021 for any brand.
- **Catastrophic** metal color is defined in neither file (placeholder).
- **Vitae divergences from the 2021 type scale** (not adopted): Vitae h2 32/40, h3 28/35, 1.25 line-height everywhere, table data +2px.
- **Vitae EA-Dark mode** exists in the Vitae variable collection; no dark theme is built here yet.
- **Not yet designed in Vitae:** date picker calendar popover (built from tokens), dropdown option panel (native `<select>` used), tooltip (still stock Fluent 2).
- **Secondary Outline buttons** use ramp-110 text instead of Vitae's 100 (DC/MA fail AA at 100).
- Gold `#FABB18` lives at `color.metal.gold` and is a metal-level plan indicator ONLY. Never use it for buttons or accents.
