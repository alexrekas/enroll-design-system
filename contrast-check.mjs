// WCAG 2.1 AA contrast gate — fails the build if a required pair drops below threshold.
// Checks the v1 (legacy) token pairs, then every Vitae 27 semantic pair in each client and mode.
import { readFileSync } from 'fs';

const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = h => { const [r, g, b] = rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

// pairs: [foreground, background, min ratio, label]
const PAIRS = [
  ['ColorTextPrimary', 'ColorSurfacePage', 4.5, 'body text on page'],
  ['ColorTextPrimary', 'ColorSurfaceRaised', 4.5, 'body text on card'],
  ['ColorTextSecondary', 'ColorSurfaceRaised', 4.5, 'secondary text on card'],
  ['ColorTextLink', 'ColorSurfaceRaised', 4.5, 'link on card'],
  ['ButtonPrimaryText', 'ButtonPrimaryBg', 4.5, 'button label rest'],
  ['ButtonPrimaryText', 'ButtonPrimaryBgHover', 4.5, 'button label hover'],
  ['ButtonPrimaryText', 'ButtonPrimaryBgActive', 4.5, 'button label active'],
  ['ButtonDestructiveText', 'ButtonDestructiveBg', 4.5, 'destructive label'],
  ['AlertText', 'AlertSuccessBg', 4.5, 'alert text on success bg'],
  ['AlertText', 'AlertErrorBg', 4.5, 'alert text on error bg'],
  ['ColorStatusError', 'ColorSurfaceRaised', 4.5, 'error text'],
  ['ColorStatusSuccess', 'ColorSurfaceRaised', 4.5, 'success text'],
  ['ColorStatusInfo', 'ColorSurfaceRaised', 4.5, 'info text'],
  ['ColorBorderFocus', 'ColorSurfaceRaised', 3.0, 'focus ring (non-text)'],
  ['InputBorder', 'InputBg', 3.0, 'input border (non-text)'],
  ['InputPlaceholder', 'InputBg', 4.5, 'placeholder text'],
  ['AlertWarningBorder', 'AlertWarningBg', 3.0, 'warning icon/border on warning surface (non-text)'],
  ['AlertInfoBorder', 'AlertInfoBg', 3.0, 'info icon/border on info surface (non-text)'],
  ['AlertSuccessBorder', 'AlertSuccessBg', 3.0, 'success icon/border on success surface (non-text)'],
  ['AlertErrorBorder', 'AlertErrorBg', 3.0, 'error icon/border on error surface (non-text)'],
  ['TagText', 'TagNeutralBg', 4.5, 'neutral tag label'],
  ['TagText', 'TagInfoBg', 4.5, 'info tag label'],
  ['TagText', 'TagSuccessBg', 4.5, 'success tag label'],
  ['TagText', 'TagWarningBg', 4.5, 'warning tag label'],
  ['TagText', 'TagErrorBg', 4.5, 'error tag label'],
  ['TagText', 'TagBrandBg', 4.5, 'brand (current/essential plan) tag label'],
  ['TagDcHealthyText', 'TagDcHealthyBg', 4.5, 'DC Healthy Plan tag label'],
  ['TagText', 'TagMeClearChoiceBg', 4.5, 'ME Clear Choice tag label'],
  ['TagText', 'TagMetalGoldBg', 4.5, 'gold tag label'],
  ['TagText', 'TagMetalSilverBg', 4.5, 'silver tag label'],
  ['TagText', 'TagMetalBronzeBg', 4.5, 'bronze tag label'],
  ['TagText', 'TagMetalPlatinumBg', 4.5, 'platinum tag label'],
  ['TagWarningBorder', 'TagWarningBg', 3.0, 'warning tag border (non-text)'],
  ['ButtonPrimaryOutlineText', 'ButtonPrimaryOutlineBg', 4.5, 'outline primary label'],
  ['ButtonPrimaryOutlineTextHover', 'ButtonPrimaryOutlineBgHover', 4.5, 'outline primary label hover'],
  ['ButtonSecondaryOutlineTextHover', 'ButtonSecondaryOutlineBgHover', 4.5, 'outline secondary label hover'],
  ['ButtonSecondaryOutlineTextActive', 'ButtonSecondaryOutlineBgActive', 4.5, 'outline secondary label active'],
  ['ButtonTertiaryOutlineTextHover', 'ButtonTertiaryOutlineBgHover', 4.5, 'outline tertiary label hover'],
  ['ButtonSecondaryGhostTextHover', 'ButtonSecondaryGhostBgHover', 4.5, 'ghost secondary label hover'],
  ['TagMetalCatastrophicBorder', 'TagMetalCatastrophicBg', 3.0, 'catastrophic tag border'],
  ['TagText', 'TagMetalCatastrophicBg', 4.5, 'catastrophic tag label'],
  ['ButtonSecondaryOutlineText', 'ButtonSecondaryOutlineBg', 4.5, 'outline secondary label'],
  ['ButtonTertiaryOutlineText', 'ButtonTertiaryOutlineBg', 4.5, 'outline tertiary label'],
  ['ButtonDestructiveOutlineText', 'ColorSurfaceRaised', 4.5, 'outline destructive label'],
  ['ButtonPrimaryGhostText', 'ColorSurfaceRaised', 4.5, 'ghost primary label'],
  ['ButtonPrimaryGhostText', 'ButtonPrimaryGhostBgHover', 4.5, 'ghost primary label hover'],
  ['ButtonSecondaryGhostText', 'ColorSurfaceRaised', 4.5, 'ghost secondary label'],
  ['ButtonTertiaryGhostText', 'ColorSurfaceRaised', 4.5, 'ghost tertiary label'],
  ['ButtonSecondaryText', 'ButtonSecondaryBg', 4.5, 'secondary solid label'],
  ['ButtonTertiaryText', 'ButtonTertiaryBg', 4.5, 'tertiary solid label'],
  ['AlertText', 'AlertInfoBg', 4.5, 'alert text on info bg'],
  ['AlertText', 'AlertWarningBg', 4.5, 'alert text on warning bg'],
  ['CheckboxErrorText', 'CheckboxErrorBg', 4.5, 'checkbox error message on error row'],
  ['ModalTitleColor', 'ModalBg', 4.5, 'modal title'],
  ['TooltipText', 'TooltipBg', 4.5, 'tooltip text'],
  ['AccordionTitleColor', 'AccordionBg', 4.5, 'accordion title'],
  ['AccordionBorder', 'AccordionBg', 3.0, 'accordion border (non-text)'],
  ['InputRequired', 'InputBg', 4.5, 'required asterisk'],
  ['NavHeaderPortalColor', 'NavHeaderBg', 4.5, 'header portal link'],
  ['NavHeaderLink', 'NavHeaderBg', 4.5, 'header My Portal / Log Out'],
  ['NavHeaderUserIcon', 'NavHeaderBg', 3.0, 'header user icon (non-text)'],
  ['NavSubnavBrokerText', 'NavSubnavBrokerBg', 4.5, 'broker nav text'],
  ['NavSubnavAdminText', 'NavSubnavAdminBg', 4.5, 'admin nav text'],
  ['NavSubnavBadgeText', 'NavSubnavBadgeBg', 4.5, 'mail count badge'],
  ['NavFooterLink', 'NavFooterLangBg', 4.5, 'footer language links'],
  ['NavFooterText', 'NavFooterBg', 4.5, 'footer text'],
  ['NavFooterLink', 'NavFooterBg', 4.5, 'footer contact links'],
  ['NavFooterIcon', 'NavFooterBg', 3.0, 'footer contact icons (non-text)'],
  ['TableRowText', 'ColorSurfaceRaised', 4.5, 'table cell text'],
  ['TableHeaderText', 'ColorSurfaceRaised', 4.5, 'table header text'],
  ['CardTitleColor', 'CardBg', 4.5, 'card title'],
  ['CardBodyColor', 'CardBg', 4.5, 'card body text'],
];

let failures = 0;
for (const theme of ['ea', 'dc', 'ma', 'me']) {
  const flat = JSON.parse(readFileSync(`dist/docs/tokens.${theme}.json`, 'utf8'));
  console.log(`\n=== ${theme.toUpperCase()} ===`);
  for (const [fg, bg, min, label] of PAIRS) {
    const f = flat[fg], b = flat[bg];
    if (!f || !b || !/^#[0-9a-f]{6}$/i.test(f) || !/^#[0-9a-f]{6}$/i.test(b)) {
      console.log(`  SKIP ${label} (${fg}=${f} on ${bg}=${b})`); continue;
    }
    const r = ratio(f, b);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? 'PASS' : 'FAIL'} ${label}: ${r.toFixed(2)}:1 (min ${min}) ${f} on ${b}`);
  }
}
// ---------- Vitae 27 (tokens-v2): every client in light and dark ----------
// Text pairs need 4.5:1 (WCAG 1.4.3). Non-text pairs (focus rings, field borders, icons, selection borders) need 3:1 (1.4.11).
// Disabled text is exempt. Rendered components are also checked with axe (npm run check:stories).
const SURFACES = ['BackgroundPage', 'BackgroundLayer01', 'BackgroundLayer02', 'CardSurface'];
const ACTIONS = ['Primary', 'Secondary', 'Tertiary', 'Destructive'];
const V2 = [
  ...SURFACES.flatMap((bg) => [
    ...['TextHeading', 'TextBody', 'TextSecondary', 'TextError', 'TextLink', 'TextLinkHover', 'TextLinkActive'].map((fg) => [fg, bg, 4.5, 'text']),
    ...ACTIONS.flatMap((a) => ['', 'Hover', 'Active'].map((st) => [`Action${a}Text${st}`, bg, 4.5, 'outline/ghost label'])),
    ...['BorderFocus', 'BorderFocusRing', 'FieldBorder', 'BorderBrand', 'IconPrimary', 'IconSecondary', 'IconBrand'].map((fg) => [fg, bg, 3, 'non-text']),
  ]),
  ...ACTIONS.flatMap((a) => [
    ...['', 'Hover', 'Active'].map((st) => [a === 'Destructive' ? 'TextOnDestructive' : `TextOn${a}`, `Action${a}${st}`, 4.5, 'solid button label']),
    [`Action${a}TextHover`, `Action${a}SubtleHover`, 4.5, 'outline/ghost hover'],
    [`Action${a}TextActive`, `Action${a}SubtleActive`, 4.5, 'outline/ghost pressed'],
  ]),
  ['TextBody', 'FieldBackground', 4.5, 'field value'], ['TextPlaceholder', 'FieldBackground', 4.5, 'placeholder'],
  ['TextBody', 'FieldBackgroundActive', 4.5, 'field value (active)'], ['FieldBorder', 'FieldBackground', 3, 'field border'],
  ['FieldBorderActive', 'FieldBackground', 3, 'field border (active)'],
  ...['BackgroundLayerHover', 'BackgroundSelected', 'TableRowHover', 'TableRowSelected'].map((bg) => ['TextBody', bg, 4.5, 'text on hover/selected']),
  // Light mode only: in dark mode, buttons on a selected surface (e.g. the table bulk-action bar) switch to TextBody,
  // because brand text on the deep brand selected tone falls below 4.5:1 for EA (see .vitae-bulkbar in vitae.css).
  ['ActionPrimaryText', 'BackgroundSelected', 4.5, 'link/button on selected', 'light'],
  ['TextOnBrand', 'BackgroundBrand', 4.5, 'text on brand'],
  ...['Info', 'Success', 'Warning', 'Error'].flatMap((t) => [['AlertText', `Support${t}Surface`, 4.5, 'alert text'], ['TextLink', `Support${t}Surface`, 4.5, 'alert link']]),
  ...['Info', 'Success', 'Error'].map((t) => [`Support${t}`, `Support${t}Surface`, 3, 'status icon']),
  ['SupportWarningIconInk', 'SupportWarningIconFill', 4.5, 'warning icon ink'],
  ...['Bronze', 'Silver', 'Gold', 'Platinum', 'Catastrophic'].map((m) => [`Metal${m}Text`, `Metal${m}`, 4.5, 'metal badge']),
  ['NavBarText', 'NavBar', 4.5, 'nav bar'], ['NavAdminText', 'NavAdminBar', 4.5, 'admin bar'], ['NavBadgeText', 'NavBadge', 4.5, 'nav badge'],
];
let v2checked = 0;
for (const client of ['ea', 'dc', 'ma', 'me']) for (const mode of ['light', 'dark']) {
  const flat = JSON.parse(readFileSync(`dist/v2/docs/vitae.${client}.${mode}.json`, 'utf8'));
  const misses = [];
  for (const [fg, bg, min, label, only] of V2) {
    if (only && only !== mode) continue;
    const f = flat[fg], b = flat[bg];
    if (!/^#[0-9a-f]{6}$/i.test(f || '') || !/^#[0-9a-f]{6}$/i.test(b || '')) { misses.push(`  MISSING ${fg} on ${bg} (${label})`); failures++; continue; }
    v2checked++;
    const r = ratio(f, b);
    if (r < min) { failures++; misses.push(`  FAIL ${label}: ${fg} on ${bg} ${r.toFixed(2)}:1 (min ${min}) ${f} on ${b}`); }
  }
  console.log(`\n=== Vitae 27 ${client.toUpperCase()} ${mode} === ${misses.length ? '' : `all pairs pass`}`);
  for (const m of misses) console.log(m);
}
console.log(`\nVitae 27: ${v2checked} pairs checked.`);

if (failures) { console.error(`\n${failures} contrast failure(s)`); process.exit(1); }
console.log('\nAll contrast checks passed.');
