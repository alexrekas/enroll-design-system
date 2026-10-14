// WCAG 2.1 AA contrast gate — fails the build if a required pair drops below threshold.
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
if (failures) { console.error(`\n${failures} contrast failure(s)`); process.exit(1); }
console.log('\nAll contrast checks passed.');
