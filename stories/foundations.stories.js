import ea from '../dist/docs/tokens.ea.json';
import dc from '../dist/docs/tokens.dc.json';
import ma from '../dist/docs/tokens.ma.json';
import me from '../dist/docs/tokens.me.json';

const themes = { ea, dc, ma, me };

export default { title: 'Foundations' };

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

export const Typography = {
  render: () => `
    <div style="font-family:var(--ea-font-family-brand);">
      <p style="font-size:13px; color:var(--ea-color-text-secondary);">Brand font resolves per theme — EA: Roboto Flex · DC/MA: Open Sans · ME: Barlow</p>
      ${['800', '700', '600', '500', '400', '300', '200', '100'].map(s => `
        <div style="display:flex; align-items:baseline; gap:16px; margin-bottom:8px;">
          <code style="width:90px; font-size:12px;">size-${s}</code>
          <span style="font-size:var(--ea-font-size-${s});">Health coverage that works for you</span>
        </div>`).join('')}
      <div style="margin-top:12px;">
        ${['light', 'regular', 'semibold', 'bold', 'extrabold'].map(w => `
          <div style="font-weight:var(--ea-font-weight-${w}); font-size:18px; margin-bottom:4px;">${w} — Enroll App Design System</div>`).join('')}
      </div>
    </div>`,
};
