export default {
  title: 'Components/Button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'destructive'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { variant: 'primary', label: 'Continue', disabled: false },
  render: ({ variant, label, disabled }) =>
    `<button class="ea-btn ea-btn--${variant}" ${disabled ? 'disabled' : ''}>${label}</button>`,
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary', label: 'Back' } };
export const Destructive = { args: { variant: 'destructive', label: 'Cancel plan' } };
export const Disabled = { args: { disabled: true } };

export const AllVariants = {
  render: () => `
    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <button class="ea-btn ea-btn--primary">Primary</button>
      <button class="ea-btn ea-btn--secondary">Secondary</button>
      <button class="ea-btn ea-btn--destructive">Destructive</button>
      <button class="ea-btn ea-btn--primary" disabled>Disabled</button>
    </div>`,
};
