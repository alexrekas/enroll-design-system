// EnrollApp brand export: the EA (EnrollApp) colors, type and button rules from Vitae 27, packaged for use
// outside the app (the enroll.ideacrew.com microsite, decks, other tools). Everything is read from the built
// Vitae 27 tokens (dist/v2/docs/vitae.ea.{light,dark}.json), so the export always matches the design system.
//
//   npm run export:enrollapp      (also runs as part of npm run build)
//
// Writes dist/brand/enrollapp/:
//   enrollapp-tokens.css   CSS variables, light by default, dark via [data-theme="dark"] or the OS setting
//   enrollapp-tokens.json  the same values as data
//   enrollapp-brand.md     how to use them (roles, contrast rules, buttons, type, logo)
//   enrollapp-logo.svg, enrollapp-logo-dark.svg (the SVG markup is also inside the .md and .json, for tools that
//   won't accept .svg uploads; PNG copies for those tools come from npm run export:enrollapp -- --png)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const OUT = 'dist/brand/enrollapp';
const light = JSON.parse(readFileSync('dist/v2/docs/vitae.ea.light.json', 'utf8'));
const dark = JSON.parse(readFileSync('dist/v2/docs/vitae.ea.dark.json', 'utf8'));
const logo = readFileSync('stories/brand-assets.js', 'utf8').match(/export const enrollAppLogo = `([\s\S]*?)`;/)[1];
const logoDark = logo.replace(/fill="#0C264A"/g, 'fill="#FFFFFF"');

// [css name, Vitae token, what it's for]. Mode-dependent roles: one value per mode.
const ROLES = [
  ['bg-page', 'BackgroundPage', 'Page background'],
  ['bg-raised', 'CardSurface', 'Cards, panels, anything raised above the page'],
  ['text-heading', 'TextHeading', 'Headings'],
  ['text-body', 'TextBody', 'Body text'],
  ['text-secondary', 'TextSecondary', 'Supporting text, captions'],
  ['link', 'TextLink', 'Links (always underlined)'], ['link-hover', 'TextLinkHover', 'Link hover'], ['link-active', 'TextLinkActive', 'Link pressed'],
  ['border-subtle', 'BorderSubtle', 'Dividers, card borders'], ['border-strong', 'BorderStrong', 'Stronger borders'],
  ['focus-ring', 'BorderFocusRing', 'Keyboard focus ring: 2px dashed, 2px offset'],
  ['brand-rule', 'NavRule', 'Thin brand rule under the header (decorative)'],
  ['cta', 'ActionCta', 'Call-to-action button fill (solid primary)'], ['cta-hover', 'ActionCtaHover', 'CTA hover'], ['cta-active', 'ActionCtaActive', 'CTA pressed'],
  ['on-cta', 'TextOnCta', 'CTA label'],
  ['cta-text', 'ActionCtaText', 'Outline and ghost primary: label and border'], ['cta-text-hover', 'ActionCtaTextHover', ''], ['cta-text-active', 'ActionCtaTextActive', ''],
  ['cta-tint-hover', 'ActionCtaSubtleHover', 'Outline and ghost primary hover fill (see-through)'], ['cta-tint-active', 'ActionCtaSubtleActive', 'Outline and ghost primary pressed fill (see-through)'],
  ['secondary', 'ActionSecondary', 'Secondary button fill (ink blue)'], ['secondary-hover', 'ActionSecondaryHover', ''], ['secondary-active', 'ActionSecondaryActive', ''],
  ['on-secondary', 'TextOnSecondary', 'Secondary button label'],
  ['secondary-text', 'ActionSecondaryText', 'Outline and ghost secondary: label and border'], ['secondary-text-hover', 'ActionSecondaryTextHover', ''], ['secondary-text-active', 'ActionSecondaryTextActive', ''],
  ['secondary-tint-hover', 'ActionSecondarySubtleHover', 'Outline and ghost secondary hover fill (see-through)'], ['secondary-tint-active', 'ActionSecondarySubtleActive', ''],
  ['tertiary', 'ActionTertiary', 'Tertiary button fill (purple): use sparingly'], ['tertiary-hover', 'ActionTertiaryHover', ''], ['tertiary-active', 'ActionTertiaryActive', ''],
  ['on-tertiary', 'TextOnTertiary', 'Tertiary button label'],
  ['tertiary-text', 'ActionTertiaryText', 'Outline and ghost tertiary: label and border'], ['tertiary-text-hover', 'ActionTertiaryTextHover', ''], ['tertiary-text-active', 'ActionTertiaryTextActive', ''],
  ['tertiary-tint-hover', 'ActionTertiarySubtleHover', ''], ['tertiary-tint-active', 'ActionTertiarySubtleActive', ''],
  ['control', 'ActionPrimary', 'Checked checkboxes and radios, toggles, selected tabs, progress'], ['on-control', 'TextOnPrimary', 'Check marks on a control'],
  ['error', 'TextError', 'Error text'], ['success', 'SupportSuccess', 'Success icon and text'], ['info', 'SupportInfo', 'Info icon and text'], ['warning', 'SupportWarning', 'Warning icon'],
];
const RAMPS = { ink: 'ColorEaPrimary', green: 'ColorEaSecondary', purple: 'ColorEaTertiary' };
const STEPS = ['005', '010', '015', '020', '025', '030', '035', '040', '050', '060', '070', '080', '090', '100', '110', '120', '130', '140', '150', '160', '170', '180', '190'];
const SHAPE = {
  'font-family': `${light.BrandFontFamily}, system-ui, sans-serif`,
  'radius-button': light.BrandRadiusButton, 'radius-tag': light.BrandRadiusTag, 'radius-card': light.BrandRadiusCard,
  'button-height': '44px', 'focus-ring-width': '2px',
};

const missing = ROLES.filter(([, k]) => !light[k] || !dark[k]).map(([, k]) => k);
if (missing.length) { console.error(`export-enrollapp: missing tokens ${missing.join(', ')}`); process.exit(1); }

const v = (name) => `--enrollapp-${name}`;
const block = (src) => ROLES.map(([n, k]) => `  ${v(n)}: ${src[k]};`).join('\n');
const ramps = Object.entries(RAMPS).flatMap(([name, key]) => STEPS.map((s) => `  ${v(`${name}-${s}`)}: ${light[`${key}${s}`]};`)).join('\n');
const shape = Object.entries(SHAPE).map(([n, val]) => `  ${v(n)}: ${val};`).join('\n');

const css = `/* EnrollApp brand tokens, generated from Vitae 27 (enroll-design-system). Do not edit by hand: run npm run export:enrollapp.
   Light by default. Dark: set data-theme="dark" on <html>, or leave data-theme off to follow the visitor's OS setting.
   Load Inter (400, 500, 600, 700) yourself, e.g. self-hosted from @fontsource/inter. See enrollapp-brand.md for usage rules. */
:root {
  /* Ramps (raw colors; build with the roles below, not these) */
${ramps}
  /* Shape and type */
${shape}
  /* Roles, light */
${block(light)}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${block(dark).replace(/^ {2}/gm, '    ')}
  }
}
:root[data-theme="dark"] {
${block(dark)}
}
`;

const json = {
  $description: 'EnrollApp brand tokens generated from Vitae 27. Values for light and dark mode; see enrollapp-brand.md.',
  ramps: Object.fromEntries(Object.entries(RAMPS).map(([name, key]) => [name, Object.fromEntries(STEPS.map((s) => [s, light[`${key}${s}`]]))])),
  shape: SHAPE,
  roles: Object.fromEntries(ROLES.map(([n, k, d]) => [n, { light: light[k], dark: dark[k], ...(d ? { use: d } : {}) }])),
  logo: { light: logo.trim(), dark: logoDark.trim(), use: 'SVG markup: light = ink wordmark for light backgrounds, dark = white wordmark for dark backgrounds.' },
};

const hex = (n, m = 'light') => (m === 'light' ? light : dark)[ROLES.find(([x]) => x === n)[1]];
const md = `# EnrollApp brand: colors, type and buttons

Generated from the Vitae 27 design system (repo \`alexrekas/enroll-design-system\`, EA client), so it always matches the product. Don't edit these files by hand; change the tokens and run \`npm run export:enrollapp\`.

Files: \`enrollapp-tokens.css\` (CSS variables, light and dark), \`enrollapp-tokens.json\` (same values as data), \`enrollapp-logo.svg\` and \`enrollapp-logo-dark.svg\`.
Live reference: https://alexrekas.github.io/enroll-design-system/ (set Theme to EA, toggle Mode for dark).

## Palette

| Family | Brand color | Use |
|---|---|---|
| **Ink** | ${light.ColorEaPrimary100} | Headings, secondary buttons, form controls. The main brand dark. |
| **Green** | ${light.ColorEaSecondary100} (logo green) | The logo and the call to action. Logo green itself is for the logo and graphics only (3.0:1 on white): never text, never a button fill with white text. |
| **Purple** | ${light.ColorEaTertiary100} | Tertiary buttons and rare accents. Use sparingly; green should stay the thing people notice first. |

Each family has a ramp (\`--enrollapp-ink-005\` … \`-190\`, 100 = the brand color). Build with the **roles**, not the ramps.

## Roles (light / dark)

| Role | Light | Dark | Use |
|---|---|---|---|
${ROLES.filter(([, , d]) => d).map(([n, , d]) => `| \`--enrollapp-${n}\` | ${hex(n)} | ${hex(n, 'dark')} | ${d} |`).join('\n')}

## Contrast rules (WCAG 2.1 AA)

- **CTA green ${hex('cta')} carries white text at 4.54:1. Never lighten it.** It's the lightest green that passes with white text. Hover and pressed go darker (${hex('cta-hover')}, ${hex('cta-active')}).
- Green text and links use ${hex('link')} (light) and ${hex('link', 'dark')} (dark). Logo green ${light.ColorEaSecondary100} is never text.
- Every role pair above passes AA in both modes (checked by the design system's contrast test across 1,300+ pairs). The see-through hover tints were checked over every background.
- Links are always underlined. Focus is a 2px dashed ring in \`--enrollapp-focus-ring\` with a 2px offset, shown on keyboard focus (\`:focus-visible\`).

## Buttons

- Pills (\`--enrollapp-radius-button\`), 44px tall, Inter 16px semibold, 16px side padding, 8px gap to an icon.
- **Solid primary = the call to action.** Aim for one per page, the happy path; use two only when the page genuinely sends people one of two ways. Everything else is secondary (ink), outline or ghost.
- Solid: fill \`--enrollapp-cta\` / \`-secondary\` / \`-tertiary\`, label \`--enrollapp-on-…\`; hover and pressed use the \`-hover\` and \`-active\` fills.
- Outline: transparent, 2px border and label in \`--enrollapp-cta-text\` (or \`secondary-text\`, \`tertiary-text\`). Ghost: the same without the border.
- Outline and ghost hover and pressed: a see-through tint (\`--enrollapp-cta-tint-hover\`, \`-tint-active\`) plus the \`-text-hover\` / \`-text-active\` label. Don't fill them solid; they shouldn't look like the CTA.
- Disabled: avoid where you can (say what's missing instead).

\`\`\`css
.btn { min-height: 44px; padding: 10px 16px; border: 2px solid transparent; border-radius: var(--enrollapp-radius-button);
  font: 600 16px/20px var(--enrollapp-font-family); cursor: pointer; }
.btn-cta { background: var(--enrollapp-cta); color: var(--enrollapp-on-cta); }
.btn-cta:hover { background: var(--enrollapp-cta-hover); } .btn-cta:active { background: var(--enrollapp-cta-active); }
.btn-outline { background: transparent; border-color: var(--enrollapp-cta-text); color: var(--enrollapp-cta-text); }
.btn-outline:hover { background: var(--enrollapp-cta-tint-hover); border-color: var(--enrollapp-cta-text-hover); color: var(--enrollapp-cta-text-hover); }
.btn-outline:active { background: var(--enrollapp-cta-tint-active); border-color: var(--enrollapp-cta-text-active); color: var(--enrollapp-cta-text-active); }
.btn:focus-visible { outline: 2px dashed var(--enrollapp-focus-ring); outline-offset: 2px; }
\`\`\`

## Type and shape

- **Inter** everywhere (400 body, 600 labels and UI, 700 headings). Self-host it; don't load from Google Fonts in production.
- Corners: buttons are pills, tags and status labels 4px (so they never look like buttons), cards 8px.

## Logo

- \`enrollapp-logo.svg\`: green mark (${light.ColorEaSecondary100}) with ink wordmark, for light backgrounds.
- \`enrollapp-logo-dark.svg\`: green mark with white wordmark, for dark backgrounds.
- Name: **EnrollApp** (one word, capital E and A). Give the image an accessible name (\`alt="EnrollApp"\` or \`aria-label\`).
- PNG copies (\`enrollapp-logo.png\`, \`enrollapp-logo-dark.png\`, 4× size, transparent) are for tools that won't take SVG. For the web, use the SVG.

### Logo source (SVG)

If the .svg files can't be attached, save each block below as an .svg file.

Light backgrounds (\`enrollapp-logo.svg\`):

\`\`\`svg
${logo.trim()}
\`\`\`

Dark backgrounds (\`enrollapp-logo-dark.svg\`):

\`\`\`svg
${logoDark.trim()}
\`\`\`
`;

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/enrollapp-tokens.css`, css);
writeFileSync(`${OUT}/enrollapp-tokens.json`, `${JSON.stringify(json, null, 2)}\n`);
writeFileSync(`${OUT}/enrollapp-brand.md`, md);
writeFileSync(`${OUT}/enrollapp-logo.svg`, `${logo.trim()}\n`);
writeFileSync(`${OUT}/enrollapp-logo-dark.svg`, `${logoDark.trim()}\n`);
// --png: also render the logos to PNG (4x, transparent) with Playwright, for tools that won't accept SVG.
if (process.argv.includes('--png')) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ deviceScaleFactor: 4 });
  for (const [file, svg] of [['enrollapp-logo.png', logo], ['enrollapp-logo-dark.png', logoDark]]) {
    await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
    await page.locator('svg').screenshot({ path: `${OUT}/${file}`, omitBackground: true });
  }
  await browser.close();
}
console.log(`Wrote the EnrollApp brand export to ${OUT}/ (${ROLES.length} roles, light and dark).`);
