import { icon as sharedIcon } from './icons.js';

const icon = sharedIcon.chevronRight('ea-btn__icon');
const LEVELS = ['primary', 'secondary', 'tertiary', 'destructive'];
const STYLES = ['solid', 'outline', 'ghost'];
const cls = (level, style) => `ea-btn ea-btn--${level}${style === 'solid' ? '' : ` ea-btn--${style}`}`;

export default {
  title: 'Legacy (v1)/Components/Button',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Button",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1211-25159"
      },
      {
        "label": "EA-DesignSystem-2021 · Button (radius per client)",
        "status": "adapted",
        "url": "https://www.figma.com/design/pwv7np3TmLIWuBxO7Bz1go/EA-DesignSystem-2021?node-id=1206-23079",
        "note": "Only the per-client corner radius is taken from 2021"
      }
    ],
    docs: {
      description: {
        component: `Call-to-action control. Source: **Vitae → Button** (Level × Style × State), radius from **EA-DesignSystem-2021** per client theme (EA/ME 6px, DC 4px, MA 3px).

**Level:** Primary · Secondary · Tertiary · Destructive. **Style:** Solid (filled, 2px border at ramp-140) · Outline (ramp-005 tint, 2px ramp-100 border) · Ghost (text only).

**Markup:** \`class="ea-btn ea-btn--{level}"\` + optional \`ea-btn--outline\` or \`ea-btn--ghost\`.

**States:** Rest, Hover, Active, Focus-visible (2px *dashed* ring, Vitae focus-outline), Disabled (one flat gray look for every level and style).

**Accessibility:** native \`<button>\` — Tab/Enter/Space for free. Icon-only buttons need an \`aria-label\`. Secondary Outline uses ramp-110 text (not Vitae's 100) because DC #0076CC and MA #C15800 fail 4.5:1 on the outline tint.

**Do:** one Primary Solid per screen; pair it with an Outline or Ghost of the same level for the secondary action (Vitae modal pattern).
**Don't:** use Destructive for a neutral "Cancel" — use Primary Outline or Ghost.`,
      },
    },
  },
  argTypes: {
    variant: { name: 'level', control: 'select', options: LEVELS },
    style: { control: 'inline-radio', options: STYLES },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    iconLeft: { control: 'boolean' },
    iconRight: { control: 'boolean' },
  },
  args: { variant: 'primary', style: 'solid', label: 'Continue', disabled: false, iconLeft: false, iconRight: false },
  render: ({ variant, style, label, disabled, iconLeft, iconRight }) => `
    <button class="${cls(variant, style)}" ${disabled ? 'disabled' : ''}>
      ${iconLeft ? icon : ''}${label}${iconRight ? icon : ''}
    </button>`,
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary', label: 'Back' } };
export const Tertiary = { args: { variant: 'tertiary', label: 'Alternate' } };
export const Destructive = { args: { variant: 'destructive', label: 'Remove plan' } };
export const Outline = { args: { style: 'outline', label: 'Cancel' } };
export const Ghost = { args: { style: 'ghost', label: 'Skip for now' } };
export const Disabled = { args: { disabled: true } };
export const WithIcons = { args: { iconLeft: true, iconRight: true, label: 'Continue' } };

export const Matrix = {
  name: 'Level × Style matrix',
  parameters: { docs: { description: { story: 'Mirrors the Vitae Button page grid. Hover/press/Tab through to see interactive states.' } } },
  render: () => `
    <table style="border-collapse:separate; border-spacing:16px 12px; font-family:var(--ea-font-family-brand);">
      <thead><tr><th></th>${STYLES.map(s => `<th style="text-align:left; text-transform:capitalize; color:var(--ea-color-text-secondary); font-weight:600;">${s}</th>`).join('')}</tr></thead>
      <tbody>
        ${LEVELS.map(l => `<tr>
          <th style="text-align:left; text-transform:capitalize; color:var(--ea-color-text-secondary); font-weight:600;">${l}</th>
          ${STYLES.map(s => `<td><button class="${cls(l, s)}">Button</button></td>`).join('')}
        </tr>`).join('')}
        <tr><th style="text-align:left; color:var(--ea-color-text-secondary); font-weight:600;">Disabled</th>
          ${STYLES.map(s => `<td><button class="${cls('primary', s)}" disabled>Button</button></td>`).join('')}</tr>
      </tbody>
    </table>`,
};

export const ModalActions = {
  name: 'Pattern: paired actions',
  render: () => `
    <div style="display:flex; gap:6px; justify-content:flex-end; max-width:528px;">
      <button class="ea-btn ea-btn--primary ea-btn--outline">Cancel</button>
      <button class="ea-btn ea-btn--primary">Confirm</button>
    </div>`,
};
