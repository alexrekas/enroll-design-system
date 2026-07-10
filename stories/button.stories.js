import { icon as sharedIcon } from './icons.js';

const icon = sharedIcon.chevronRight('ea-btn__icon');

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Primary call-to-action control. Use for the main action on a screen or form step (Continue, Submit, Sign In).

**States:** Default, Hover, Active, Disabled (flat gray, shared across every level), Focus-visible (2px outline ring).

**Accessibility:** native \`<button>\` — no ARIA role needed. Native Tab/Enter/Space behavior comes for free. If an icon-only button is ever introduced, it will need an \`aria-label\`.

**Do:** use one Primary button per screen/step; reserve Destructive for irreversible/removal actions.
**Don't:** put two Primary buttons side by side — pair Primary with Secondary or Tertiary instead; don't use Destructive styling for a neutral "Cancel."`,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'destructive'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    iconLeft: { control: 'boolean' },
    iconRight: { control: 'boolean' },
  },
  args: { variant: 'primary', label: 'Continue', disabled: false, iconLeft: false, iconRight: false },
  render: ({ variant, label, disabled, iconLeft, iconRight }) => `
    <button class="ea-btn ea-btn--${variant}" ${disabled ? 'disabled' : ''}>
      ${iconLeft ? icon : ''}${label}${iconRight ? icon : ''}
    </button>`,
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary', label: 'Back' } };
export const Tertiary = { args: { variant: 'tertiary', label: 'Alternate' } };
export const Destructive = { args: { variant: 'destructive', label: 'Cancel plan' } };
export const Disabled = { args: { disabled: true } };
export const WithIcons = { args: { iconLeft: true, iconRight: true, label: 'Continue' } };

export const AllVariants = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
      <button class="ea-btn ea-btn--primary">Primary</button>
      <button class="ea-btn ea-btn--secondary">Secondary</button>
      <button class="ea-btn ea-btn--tertiary">Tertiary</button>
      <button class="ea-btn ea-btn--destructive">Destructive</button>
      <button class="ea-btn ea-btn--primary" disabled>Disabled</button>
      <button class="ea-btn ea-btn--primary">${icon} With Icon ${icon}</button>
    </div>`,
};
