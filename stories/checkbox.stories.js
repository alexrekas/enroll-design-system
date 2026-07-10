import { icon } from './icons.js';

const checkIcon = icon.check('ea-checkbox__check');

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Standard checkbox for form selections, including an indeterminate ("partial") state for parent/group checkboxes.

**Accessibility:** \`role="checkbox"\` on the native \`<button>\`; \`aria-checked\` takes \`"true"\`, \`"false"\`, or \`"mixed"\` for the partial state — correct ARIA usage.

**Do:** use the partial state only for a parent checkbox representing a mixed-selection group.
**Don't:** use partial as a generic "disabled but on" visual — that's a different state.`,
      },
    },
  },
  argTypes: {
    checked: { control: 'select', options: ['unchecked', 'partial', 'checked'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { checked: 'unchecked', disabled: false, label: 'Label' },
  render: ({ checked, disabled, label }) => `
    <div class="ea-checkbox-row">
      <button class="ea-checkbox" role="checkbox" aria-checked="${checked === 'partial' ? 'mixed' : checked === 'checked'}" ${disabled ? 'disabled' : ''}>
        ${checked === 'checked' ? checkIcon : checked === 'partial' ? '<span class="ea-checkbox__dash"></span>' : ''}
      </button>
      <span class="ea-checkbox-label">${label}</span>
    </div>`,
};

export const Unchecked = {};
export const Partial = { args: { checked: 'partial' } };
export const Checked = { args: { checked: 'checked' } };
export const Disabled = { args: { disabled: true } };

export const AllStates = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${['unchecked', 'partial', 'checked'].map(c => `
        <div class="ea-checkbox-row">
          <button class="ea-checkbox" role="checkbox" aria-checked="${c === 'partial' ? 'mixed' : c === 'checked'}">
            ${c === 'checked' ? checkIcon : c === 'partial' ? '<span class="ea-checkbox__dash"></span>' : ''}
          </button>
          <span class="ea-checkbox-label">${c[0].toUpperCase() + c.slice(1)}</span>
        </div>`).join('')}
      <div class="ea-checkbox-row">
        <button class="ea-checkbox" role="checkbox" aria-checked="false" disabled></button>
        <span class="ea-checkbox-label">Disabled</span>
      </div>
    </div>`,
};
