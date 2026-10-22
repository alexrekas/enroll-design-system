import { canvas, esc } from './_shared.js';
import { icon, iconNames } from './icons.js';

export default {
  title: 'Vitae 27/Icons',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: { label: 'Vitae 27 · Icon', url: 'https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F/Vitae-27?node-id=19-2', status: 'figma' },
    docs: { description: { component: `
Fluent System Icons, copied exactly at 16, 20 and 24 in Regular and Filled, plus the Vitae-drawn Info (with a Heavy theme), two-tone Warning, product icons and header icons.

- Use inline SVG with \`fill="currentColor"\` so the icon takes its color from text or an \`--vitae-icon-*\` role. Decorative icons get \`aria-hidden="true"\`; icon-only buttons need an accessible name.
- Export and use each icon at its full frame (16, 20 or 24px square viewBox, padding included). Never crop to the artwork.
- The two-tone Warning uses \`--vitae-support-warning-icon-fill\`, \`-ink\` and \`-outline-color\` instead of currentColor.` } },
  },
  args: { size: 20, theme: 'filled' },
  argTypes: { size: { control: 'inline-radio', options: [16, 20, 24] }, theme: { control: 'inline-radio', options: ['regular', 'filled'] } },
};

export const Library = {
  render: ({ size, theme }) => `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;color:var(--vitae-icon-primary)">${iconNames.filter((n) => !n.startsWith('nav-')).map((n) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;background:var(--vitae-background-layer-01);border:1px solid var(--vitae-border-subtle);border-radius:var(--vitae-brand-radius-card)">
      ${icon(n, size, n === 'warning' && theme === 'filled' ? 'filled' : theme)}<code style="font-size:12px;color:var(--vitae-text-secondary)">${esc(n)}</code></div>`).join('')}</div>`,
};

export const SpecialThemes = {
  name: 'Info heavy and two-tone Warning',
  render: () => `<div style="display:flex;gap:24px;align-items:center;color:var(--vitae-icon-primary)">${[16, 20, 24].map((s) => icon('info', s, 'heavy')).join('')}${[16, 20, 24].map((s) => icon('warning', s, 'two-tone')).join('')}</div>`,
};

export const HeaderIcons = {
  name: 'Header icons',
  render: () => `<div style="display:flex;gap:24px;align-items:center;color:var(--vitae-icon-primary)">${iconNames.filter((n) => n.startsWith('nav-')).map((n) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${icon(n)}<code style="font-size:12px">${esc(n)}</code></div>`).join('')}</div>`,
};
