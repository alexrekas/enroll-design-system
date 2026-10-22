// Vitae 27 foundations, generated from tokens-v2 (npm run build:v2).
// Swatches and samples read CSS variables, so the Theme and Mode toolbar controls re-theme them live.
import manifest from '../../dist/v2/docs/manifest.json';

const FIGMA = 'https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F/Vitae-27';
const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const page = (title, intro, body) => `
<div class="vf" style="background:var(--vitae-background-page);color:var(--vitae-text-body);font-family:var(--vitae-brand-font-family),system-ui,sans-serif;padding:24px;">
  <h2 class="vf-h2">${esc(title)}</h2>
  <p class="vf-intro">${intro}</p>
  ${body}
</div>
<style>
  .vf-h2{font-size:var(--vitae-font-size-24);line-height:var(--vitae-font-line-height-36);font-weight:var(--vitae-font-weight-bold);margin:0 0 8px}
  .vf-h3{font-size:var(--vitae-font-size-18);line-height:var(--vitae-font-line-height-27);font-weight:var(--vitae-font-weight-bold);margin:32px 0 12px}
  .vf-intro{max-width:72ch;margin:0 0 16px;color:var(--vitae-text-secondary)}
  .vf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
  .vf-card{background:var(--vitae-background-layer-01);border:1px solid var(--vitae-border-subtle);border-radius:var(--vitae-brand-radius-card);padding:12px;display:flex;gap:12px;align-items:flex-start}
  .vf-sw{flex:none;width:48px;height:48px;border-radius:var(--vitae-radius-4);border:1px solid var(--vitae-border-subtle)}
  .vf-name{font-weight:var(--vitae-font-weight-semibold);font-size:var(--vitae-font-size-14);line-height:var(--vitae-font-line-height-20);word-break:break-word}
  .vf-var{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--vitae-text-secondary);word-break:break-all}
  .vf-desc{font-size:var(--vitae-font-size-12);line-height:var(--vitae-font-line-height-16);color:var(--vitae-text-secondary);margin-top:4px}
  .vf-table{border-collapse:collapse;width:100%;font-size:var(--vitae-font-size-14)}
  .vf-table th,.vf-table td{text-align:left;padding:8px 12px;border-bottom:1px solid var(--vitae-border-subtle);vertical-align:top}
  .vf-table th{font-weight:var(--vitae-font-weight-semibold)}
  .vf-code{font-family:ui-monospace,Menlo,monospace;font-size:12px}
</style>`;

const semanticColors = manifest.filter((t) => t.source === 'semantic' && t.type === 'color');
const groups = [...new Set(semanticColors.map((t) => t.path.split('.')[0]))];
const swatch = (t) => `
  <div class="vf-card">
    <span class="vf-sw" style="background:var(${t.cssVar})"></span>
    <div><div class="vf-name">${esc(t.path)}</div><div class="vf-var">var(${t.cssVar})</div>${t.description ? `<div class="vf-desc">${esc(t.description)}</div>` : ''}</div>
  </div>`;

export default {
  title: 'Vitae 27/Foundations',
  parameters: {
    design: { label: 'Vitae 27 · Variables (Primitives, Brand, Color)', url: FIGMA, status: 'figma' },
    docs: { description: { component: 'Generated from tokens-v2. Use the Theme and Mode toolbar controls to see each client in light and dark.' } },
  },
};

export const SemanticColor = {
  name: 'Color · semantic roles',
  render: () => page(
    'Semantic color roles',
    'Use these in components, never the primitives. Every role is defined for all four clients in light and dark mode; the swatches follow the toolbar.',
    groups.map((g) => `<h3 class="vf-h3">${esc(g)}</h3><div class="vf-grid">${semanticColors.filter((t) => t.path.split('.')[0] === g).map(swatch).join('')}</div>`).join(''),
  ),
};

export const BrandRamps = {
  name: 'Color · client ramps',
  render: (_args, { globals }) => {
    const client = globals.theme || 'ea';
    const ramps = manifest.filter((t) => t.source === 'primitive' && t.path.startsWith(`color.${client}.`));
    const byRamp = [...new Set(ramps.map((t) => t.path.split('.')[2]))];
    return page(
      `Client ramps · ${client.toUpperCase()}`,
      'Primitive brand ramps for the client chosen in the toolbar (100 is the brand color). Components reach these through the brand and semantic roles, not directly.',
      byRamp.map((r) => `<h3 class="vf-h3">${esc(r)}</h3><div class="vf-grid">${ramps.filter((t) => t.path.split('.')[2] === r).map(swatch).join('')}</div>`).join(''),
    );
  },
};

const TEXT_STYLES = [
  ['Heading/H1', 36, 54, 'bold'], ['Heading/H2', 24, 36, 'bold'], ['Heading/H3', 18, 27, 'bold'], ['Heading/H4', 16, 24, 'bold'],
  ['Heading/H5', 14, 21, 'bold'], ['Heading/H6', 12, 18, 'bold'], ['Heading/Dialog', 20, 28, 'semibold'],
  ['Body/Regular', 16, 24, 'regular'], ['Body/Bold', 16, 24, 'bold'], ['Body/Label', 16, 24, 'semibold'], ['Body/Button', 16, 20, 'semibold'],
  ['Body/Input', 16, 20, 'regular'], ['Body/Helper', 14, 20, 'regular'],
  ['Table/Header', 16, 24, 'semibold'], ['Table/Column 1', 14, 24, 'regular'], ['Table/Column 2+', 12, 20, 'regular'],
  ['Navigation/Breadcrumb', 14, 20, 'regular'], ['Navigation/Breadcrumb Current', 14, 20, 'semibold'], ['Navigation/Filter Heading', 14, 21, 'semibold'],
  ['Link/Body', 16, 24, 'regular', true], ['Link/Label', 16, 24, 'semibold', true], ['Link/Small', 14, 20, 'regular', true],
  ['Label/Badge', 12, 16, 'regular'], ['Label/Tagline', 12, 16, 'bold'],
];

export const Typography = {
  render: () => page(
    'Text styles',
    'The Figma text styles, with the font family set per client (brand.font.family). Links are always underlined; hover and pressed thicken the underline. Sizes and line heights come from the font primitives.',
    `<table class="vf-table"><thead><tr><th>Style</th><th>Sample</th><th>Size / line height / weight</th></tr></thead><tbody>${TEXT_STYLES.map(([n, s, lh, w, link]) => `
      <tr><td class="vf-name">${esc(n)}</td>
      <td><span style="font-size:var(--vitae-font-size-${s});line-height:var(--vitae-font-line-height-${lh});font-weight:var(--vitae-font-weight-${w});${link ? 'text-decoration:underline;color:var(--vitae-text-link);' : ''}">Find a health plan that fits</span></td>
      <td class="vf-code">--vitae-font-size-${s} / --vitae-font-line-height-${lh} / --vitae-font-weight-${w}</td></tr>`).join('')}</tbody></table>`,
  ),
};

const scale = (prefix, sample) => manifest.filter((t) => t.source === 'primitive' && t.path.startsWith(prefix));

export const Spacing = {
  render: () => page('Spacing', 'Every padding and gap in Vitae 27 uses one of these. Use the token, not the pixel value.',
    `<table class="vf-table"><tbody>${scale('space.').map((t) => `<tr><td class="vf-code">var(${t.cssVar})</td><td><span style="display:inline-block;height:16px;width:var(${t.cssVar});background:var(--vitae-action-primary)"></span></td></tr>`).join('')}</tbody></table>`),
};

export const RadiusAndBorders = {
  name: 'Radius and borders',
  render: () => page('Radius and border width', 'Client-specific radii (cards, buttons) live in brand.radius.*; use those in components.',
    `<div class="vf-grid">${[...scale('radius.'), ...manifest.filter((t) => t.path.startsWith('brand.radius.'))].map((t) => `<div class="vf-card"><span class="vf-sw" style="border-radius:var(${t.cssVar});background:var(--vitae-background-layer-02);border:2px solid var(--vitae-border-strong)"></span><div><div class="vf-name">${esc(t.path)}</div><div class="vf-var">var(${t.cssVar})</div></div></div>`).join('')}</div>
     <h3 class="vf-h3">Border width</h3><div class="vf-grid">${scale('border-width.').map((t) => `<div class="vf-card"><span class="vf-sw" style="border:var(${t.cssVar}) solid var(--vitae-border-strong)"></span><div class="vf-var">var(${t.cssVar})</div></div>`).join('')}</div>`),
};

export const Elevation = {
  render: () => page('Elevation', 'Two shadows: elevation-8 for menus, popovers and the compare tray; elevation-64 for dialogs.',
    `<div class="vf-grid">${scale('shadow.').map((t) => `<div class="vf-card" style="box-shadow:var(${t.cssVar});border:none;min-height:96px"><div><div class="vf-name">${esc(t.path)}</div><div class="vf-var">var(${t.cssVar})</div></div></div>`).join('')}</div>`),
};

export const Motion = {
  render: () => page('Motion', 'Durations and easing curves. Turn motion off under prefers-reduced-motion.',
    `<table class="vf-table"><tbody>${scale('motion.').map((t) => `<tr><td class="vf-name">${esc(t.path)}</td><td class="vf-code">var(${t.cssVar})</td><td class="vf-desc">${esc(t.description)}</td></tr>`).join('')}</tbody></table>`),
};

export const ClientSettings = {
  name: 'Client settings',
  render: () => page('Client settings', 'Switches and copy that differ by client (booleans and strings). They are not part of the DTCG spec; map booleans to a CSS class or data attribute and use strings as copy. Values follow the Theme toolbar.',
    `<table class="vf-table"><thead><tr><th>Token</th><th>Value (active client)</th><th>What it does</th></tr></thead><tbody>${manifest.filter((t) => t.type === 'boolean' || t.type === 'string').map((t) => `<tr><td class="vf-code">${esc(t.path)}</td><td class="vf-code">${esc(getComputedStyle(document.documentElement).getPropertyValue(t.cssVar).trim() || '—')}</td><td class="vf-desc">${esc(t.description)}</td></tr>`).join('')}</tbody></table>`),
};
