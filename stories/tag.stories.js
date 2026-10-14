import { icon } from './icons.js';

const ic = 'ea-tag__icon';
const TYPES = {
  success: { label: 'Verified', glyph: icon.statusSuccess(ic) },
  info: { label: 'Pending review', glyph: icon.statusInfo(ic) },
  warning: { label: 'Action needed', glyph: icon.statusWarning(ic) },
  error: { label: 'Denied', glyph: icon.statusError(ic) },
  neutral: { label: 'Inactive', glyph: icon.statusNeutral(ic) },
};
const PROGRAM = [
  { cls: 'dc-healthy', label: 'Healthy DC Plan', glyph: icon.star(ic), market: 'DC' },
  { cls: 'brand', label: 'Current Plan', glyph: icon.statusSuccess(ic), market: 'DC' },
  { cls: 'brand', label: 'Essential Plan', glyph: icon.bookmark(ic), market: 'DC' },
  { cls: 'me-clear-choice', label: 'Clear Choice Plan', glyph: icon.checkCircleOutline(ic), market: 'ME' },
  { cls: 'brand', label: 'Current Plan', glyph: icon.star(ic), market: 'ME' },
];
const METALS = ['platinum', 'gold', 'silver', 'bronze', 'catastrophic'];

const tag = (type, label, { showIcon = true, dismissible = false, glyph } = {}) => `
  <span class="ea-tag ea-tag--${type}">
    ${showIcon && glyph ? glyph : ''}${label}
    ${dismissible ? `<button class="ea-tag__dismiss" aria-label="Remove ${label}">${icon.dismiss()}</button>` : ''}
  </span>`;

export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Tag",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=2615-20776"
      }
    ],
    docs: {
      description: {
        component: `Compact status / category label. Source: **Vitae → Tag**.

**Anatomy:** 24px pill · 1px status-color border · Vitae notification-tint fill · 16px Medium label · optional 16px leading status icon · optional dismiss.

**Types:** Success · Info · Warning · Error · Neutral (Vitae "Null"), plus market program tags (DC Healthy Plan, DC Current/Essential Plan, ME Clear Choice, ME Current Plan) and metal-level tags.

**Accessibility:** status icons are decorative — the label carries the meaning, so never ship an icon-only tag. The dismiss button's \`aria-label\` includes the tag text ("Remove Verified").

**Do:** use program tags only in their market (switch the toolbar Theme to DC/ME to preview them in-brand); keep labels to 1–3 words.
**Don't:** use the metal-level colors for anything except plan metal tier.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: Object.keys(TYPES) },
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: { type: 'success', label: 'Verified', showIcon: true, dismissible: false },
  render: ({ type, label, showIcon, dismissible }) => tag(type, label, { showIcon, dismissible, glyph: TYPES[type].glyph }),
};

export const Success = {};
export const Info = { args: { type: 'info', label: 'Pending review' } };
export const Warning = { args: { type: 'warning', label: 'Action needed' } };
export const Error = { args: { type: 'error', label: 'Denied' } };
export const Neutral = { args: { type: 'neutral', label: 'Inactive' } };
export const Dismissible = { args: { dismissible: true } };

export const AllStatus = {
  render: () => `<div style="display:flex; gap:8px; flex-wrap:wrap;">
    ${Object.entries(TYPES).map(([t, v]) => tag(t, v.label, { glyph: v.glyph })).join('')}</div>`,
};

export const ProgramTags = {
  name: 'Market program tags',
  render: () => `<div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
    ${PROGRAM.map(p => `<div style="display:flex; gap:12px; align-items:center;">
      <code style="width:28px; color:var(--ea-color-text-secondary);">${p.market}</code>${tag(p.cls, p.label, { glyph: p.glyph })}</div>`).join('')}
  </div>`,
};

export const MetalLevel = {
  name: 'Metal level',
  render: () => `<div style="display:flex; gap:8px; flex-wrap:wrap;">
    ${METALS.map(m => tag(m, m[0].toUpperCase() + m.slice(1), { showIcon: false })).join('')}</div>`,
};
