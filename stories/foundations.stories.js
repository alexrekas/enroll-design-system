import ea from '../dist/docs/tokens.ea.json';
import dc from '../dist/docs/tokens.dc.json';
import ma from '../dist/docs/tokens.ma.json';
import me from '../dist/docs/tokens.me.json';

const themes = { ea, dc, ma, me };

export default {
  title: 'Legacy (v1)/Foundations',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Colors",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=106-3"
      },
      {
        "label": "Vitae · Typography",
        "status": "adapted",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=106-2",
        "note": "Type scale follows EA-DesignSystem-2021 text styles"
      },
      {
        "label": "Vitae · Spacing",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1123-2909"
      }
    ],
    docs: {
      description: {
        component: `Raw token values for the active theme (switch with the toolbar's Theme control) plus a cross-theme hex reference table. See the **Introduction** page for the full primitives → semantic → component token architecture explanation.`,
      },
    },
  },
};

/** Brand ramps for the ACTIVE theme, driven by CSS vars so the toolbar re-themes it. */
export const Color = {
  render: () => {
    const steps = ['005', '015', '025', '050', '060', '070', '080', '090', '100', '110', '120', '130', '140', '150'];
    const tier = (name) => `
      <h3 style="margin:16px 0 6px; text-transform:capitalize;">${name}</h3>
      <div style="display:flex; gap:2px;">
        ${steps.map(s => `
          <div style="flex:1; text-align:center; font-size:10px;">
            <div style="height:40px; border-radius:2px; background:var(--ea-color-brand-${name}-${s}); border:1px solid #eee;"></div>${s}
          </div>`).join('')}
      </div>`;
    return `<div style="font-family:var(--ea-font-family-brand);">
      ${['primary', 'secondary', 'tertiary'].map(tier).join('')}
      <h3 style="margin:16px 0 6px;">Status</h3>
      <div style="display:flex; gap:8px;">
        ${['error', 'success', 'warning', 'info'].map(k => `
          <div style="flex:1; text-align:center; font-size:12px;">
            <div style="height:40px; border-radius:2px; background:var(--ea-color-status-${k});"></div>${k}
          </div>`).join('')}
      </div>
    </div>`;
  },
};

/** Hex values per theme, from the built manifests. */
export const ColorReference = {
  render: () => {
    const keys = Object.keys(ea).filter(k => k.startsWith('ColorBrand') && k.endsWith('100'));
    const rows = keys.map(k => `
      <tr><td style="padding:4px 12px 4px 0; font-family:monospace;">${k}</td>
        ${Object.entries(themes).map(([, t]) => `
          <td style="padding:4px 12px;">
            <span style="display:inline-block; width:14px; height:14px; border-radius:2px; background:${t[k]}; vertical-align:-2px; border:1px solid #ddd;"></span>
            <code>${t[k]}</code>
          </td>`).join('')}
      </tr>`).join('');
    return `<table style="border-collapse:collapse; font-size:13px;">
      <thead><tr><th></th><th style="padding:4px 12px;">EA</th><th style="padding:4px 12px;">DC</th><th style="padding:4px 12px;">MA</th><th style="padding:4px 12px;">ME</th></tr></thead>
      <tbody>${rows}</tbody></table>`;
  },
};

export const Spacing = {
  render: () => {
    const steps = ['000', '050', '075', '100', '125', '150', '200', '250', '300', '400', '500', '600', '800'];
    return `<div style="font-family:var(--ea-font-family-brand);">
      ${steps.map(s => `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:6px;">
          <code style="width:90px;">space-${s}</code>
          <code style="width:50px;">${ea['Space' + s] ?? ''}</code>
          <div style="height:16px; background:var(--ea-color-brand-primary-100); width:var(--ea-space-${s});"></div>
        </div>`).join('')}
    </div>`;
  },
};

export const Radius = {
  render: () => {
    const steps = ['02', '04', '08', '12', '16', '48'];
    return `<div style="display:flex; gap:16px; font-family:var(--ea-font-family-brand);">
      ${steps.map(s => `
        <div style="text-align:center; font-size:12px;">
          <div style="width:72px; height:48px; background:var(--ea-color-brand-primary-025); border:2px solid var(--ea-color-brand-primary-100); border-radius:var(--ea-radius-${s});"></div>
          radius-${s}
        </div>`).join('')}
    </div>`;
  },
};

const SPEC = {"h1": "36/54 Bold", "h2": "24/36 Bold", "h3": "18/27 Bold", "dialog": "20/28 SemiBold", "paragraph": "16/24 Regular", "label": "16/24 SemiBold", "button": "16/20 SemiBold", "table-header": "16/24 SemiBold", "table-col1": "14/24 Regular", "table-data": "12/20 Regular", "breadcrumb": "14/20 Regular", "caption": "12/16 Regular"};

export const Typography = {
  render: () => `
    <div style="font-family:var(--ea-font-family-brand);">
      <p style="font-size:13px; color:var(--ea-color-text-secondary);">Brand font resolves per theme — EA/DC/MA: Open Sans (decided 10/14/26) · ME: Barlow</p>
      <h3 style="margin:16px 0 8px;">Type scale (semantic <code>--ea-type-*</code>, from EA-DesignSystem-2021)</h3>
      <table style="border-collapse:collapse;">
        ${[['h1', 'Health coverage that works for you'], ['h2', 'Review your application'], ['h3', 'Household income'], ['dialog', 'Leave this application?'],
           ['paragraph', 'Most applications are reviewed within 2 business days.'], ['label', 'Date of birth'], ['button', 'Continue'],
           ['table-header', 'Plan name'], ['table-col1', 'Aetna Gold HN Only 6000'], ['table-data', '$412.18 / month'], ['breadcrumb', 'Household / Income'], ['caption', 'Tooltip text']]
          .map(([k, txt]) => `<tr style="border-bottom:1px solid var(--ea-color-border-default);">
            <td style="padding:8px 16px 8px 0; vertical-align:baseline;"><code style="font-size:12px;">type-${k}</code></td>
            <td style="padding:8px 16px 8px 0; vertical-align:baseline; font-size:12px; color:var(--ea-color-text-secondary); white-space:nowrap;" >${SPEC[k]}</td>
            <td style="padding:8px 0; font-size:var(--ea-type-${k}-size); line-height:var(--ea-type-${k}-line-height); font-weight:var(--ea-type-${k}-weight);">${txt}</td></tr>`).join('')}
      </table>
      <h3 style="margin:24px 0 8px;">Weights</h3>
      ${['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'].map(w => `
        <div style="font-weight:var(--ea-font-weight-${w}); font-size:18px; margin-bottom:4px;">${w} — Enroll App Design System</div>`).join('')}
      <h3 style="margin:24px 0 8px;">Raw size ramp</h3>
      ${['800', '750', '700', '600', '500', '400', '300', '200', '100'].map(s => `
        <div style="display:flex; align-items:baseline; gap:16px; margin-bottom:8px;">
          <code style="width:90px; font-size:12px;">size-${s}</code>
          <span style="font-size:var(--ea-font-size-${s});">Health coverage that works for you</span>
        </div>`).join('')}
    </div>`,
};
