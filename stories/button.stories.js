const icon = `<svg class="ea-btn__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10h12M11 5l5 5-5 5"/></svg>`;

export default {
  title: 'Components/Button',
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
