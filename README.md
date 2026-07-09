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

**Storybook design library:** stories for Button, Text Input, and Alert (all variants/states), plus Foundations pages (color ramps, cross-theme hex reference, spacing, radius, typography) generated from the built token manifests. The toolbar's Theme menu re-renders any story in EA / DC / MA / ME instantly. Reference component classes live in `.storybook/tokens.css` (`ea-btn`, `ea-input`, `ea-alert`) — the same markup contract mockups and Enroll App adoption will use.

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

## Known gaps (Phase 1 open items)

- **Font finding:** Vitae's typography token is **Roboto Flex** (now `font.family.base`, Open Sans fallback), but code ships Open Sans and the 2021 DS uses it throughout. Confirm Roboto Flex is the intended future base font.

- **Button radii per client are TODO-confirm** (`radius.button` in each theme; EA=24px from Vitae, others 4px approx).
- Gold `#F7B319` lives at `color.metal.gold` — metal-level plan indicator ONLY, never buttons or accents (decided 7/9/26). Code's gold `primary_button` is a legacy divergence. Bronze/silver/platinum/catastrophic values are placeholders to extract.
- Interpolated/extrapolated ramp steps (marked in `$description`) need designer eyes.
- Typography scale/weights seeded from code + 2021 DS; reconcile with Vitae typography when