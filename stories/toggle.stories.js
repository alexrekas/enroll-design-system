export default {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Binary on/off control for settings that take effect immediately (no separate "submit" step).

**Accessibility:** \`role="switch"\` on the native \`<button>\` — the correct ARIA pattern for a toggle (not \`checkbox\`). \`aria-checked\` reflects state.

**Do:** use Toggle for settings that apply instantly.
**Don't:** use Toggle inside a form that needs an explicit Submit — use Checkbox instead.`,
      },
    },
  },
  argTypes: {
    on: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { on: false, disabled: false, label: 'Label' },
  render: ({ on, disabled, label }) => `
    <div class="ea-toggle-row">
      <button class="ea-toggle" role="switch" aria-checked="${on}" ${disabled ? 'disabled' : ''}></button>
      <span class="ea-toggle-label">${label}</span>
    </div>`,
};

export const Off = {};
export const On = { args: { on: true } };
export const Disabled = { args: { disabled: true } };
export const DisabledOn = { args: { disabled: true, on: true } };

export const AllStates = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <div class="ea-toggle-row"><button class="ea-toggle" role="switch" aria-checked="false"></button><span class="ea-toggle-label">Off</span></div>
      <div class="ea-toggle-row"><button class="ea-toggle" role="switch" aria-checked="true"></button><span class="ea-toggle-label">On</span></div>
      <div class="ea-toggle-row ea-toggle-row--focus"><button class="ea-toggle" role="switch" aria-checked="true"></button><span class="ea-toggle-label">Focus</span></div>
      <div class="ea-toggle-row"><button class="ea-toggle" role="switch" aria-checked="false" disabled></button><span class="ea-toggle-label">Disabled</span></div>
    </div>`,
};
