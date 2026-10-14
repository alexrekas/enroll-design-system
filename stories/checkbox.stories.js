import { icon } from './icons.js';

const checkIcon = icon.check('ea-checkbox__check');

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Checkbox",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1309-558"
      },
      {
        "label": "Vitae · Checkbox Group",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1223-50433"
      }
    ],
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

// ---- Vitae additions (10/14/26): Error row + Checkbox Group ----
const box = (label, { checked = false, name } = {}) => `
  <div class="ea-checkbox-row">
    <button class="ea-checkbox" role="checkbox" aria-checked="${checked}" ${name ? `aria-label="${name}"` : ''}>${checked ? checkIcon : ''}</button>
    <span class="ea-checkbox-label">${label}</span>
  </div>`;

export const Error = {
  parameters: { docs: { description: { story: 'Vitae `Error=True`: the whole row gets the notification-error tint with a 12px radius; label and message turn status-error. Wire the message with `aria-describedby` and set `aria-invalid="true"`.' } } },
  render: () => `
    <div class="ea-checkbox-row ea-checkbox-row--error">
      <button class="ea-checkbox" role="checkbox" aria-checked="false" aria-invalid="true" aria-describedby="cb-err-1" aria-labelledby="cb-lbl-1"></button>
      <span class="ea-checkbox__text">
        <span class="ea-checkbox-label" id="cb-lbl-1">I agree to the terms</span>
        <span class="ea-checkbox__error" id="cb-err-1">You must agree before continuing.</span>
      </span>
    </div>`,
};

export const Group = {
  name: 'Group (vertical)',
  parameters: { docs: { description: { story: 'Vitae `Checkbox Group`: a `<fieldset>` whose `<legend>` is the group label (SemiBold, text-secondary). Vertical stacks rows with no gap; horizontal uses a 4px gap.' } } },
  render: () => `
    <fieldset class="ea-checkbox-group">
      <legend>Which coverage do you need?</legend>
      <div class="ea-checkbox-group__set">${box('Health', { checked: true })}${box('Dental')}${box('Vision')}</div>
    </fieldset>`,
};

export const GroupHorizontal = {
  name: 'Group (horizontal)',
  render: () => `
    <fieldset class="ea-checkbox-group ea-checkbox-group--horizontal">
      <legend>Days you can be reached</legend>
      <div class="ea-checkbox-group__set">${box('Mon', { checked: true })}${box('Tue')}${box('Wed', { checked: true })}${box('Thu')}${box('Fri')}</div>
    </fieldset>`,
};
