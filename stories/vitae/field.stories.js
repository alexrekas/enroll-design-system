import { canvas, figma, esc, id, matrix } from './_shared.js';
import { icon, iconNames } from './icons.js';

export const field = ({
  kind = 'input', label = 'Annual income', placeholder = '$0', value = '', helper = '', error = '', required = false,
  info = false, showLabel = true, leadingIcon = '', trailingIcon = '', state = 'rest', options = ['Single', 'Married filing jointly', 'Married filing separately', 'Head of household'],
} = {}) => {
  const fid = id('field');
  const describedby = [helper && `${fid}-help`, error && `${fid}-error`].filter(Boolean).join(' ');
  const cls = ['vitae-input', kind === 'select' ? 'vitae-select' : '', leadingIcon ? 'has-leading' : '', trailingIcon ? 'has-trailing' : '', ['hover', 'active', 'focus'].includes(state) ? `is-${state}` : ''].join(' ').trim();
  const attrs = `id="${fid}" class="${cls}"${describedby ? ` aria-describedby="${describedby}"` : ''}${error || state === 'error' ? ' aria-invalid="true"' : ''}${required ? ' required' : ''}${state === 'disabled' ? ' disabled' : ''}`;
  const control = kind === 'select'
    ? `<select ${attrs}><option value="" disabled hidden${value ? '' : ' selected'}>${esc(placeholder || 'Select')}</option>${options.map((o) => `<option${o === value ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>${icon('chevron-down', 20, 'filled', { className: 'vitae-icon vitae-icon--trailing' })}`
    : `<input type="text" ${attrs} placeholder="${esc(placeholder)}" value="${esc(value)}">${leadingIcon ? icon(leadingIcon, 20, 'filled', { className: 'vitae-icon vitae-icon--leading' }) : ''}${trailingIcon ? icon(trailingIcon, 20, 'filled', { className: 'vitae-icon vitae-icon--trailing' }) : ''}`;
  return `<div class="vitae-field">
    <div class="vitae-field__label-row${showLabel ? '' : ' vitae-visually-hidden'}">
      <label class="vitae-field__label" for="${fid}">${esc(label)}${required ? ' <span class="vitae-field__required" aria-hidden="true">*</span>' : ''}</label>
      ${info ? `<button type="button" class="vitae-info-button" aria-expanded="false">${icon('info', 16, 'filled')}<span class="vitae-visually-hidden">More about ${esc(label)}</span></button>` : ''}
    </div>
    <div class="vitae-field__control">${control}</div>
    ${helper ? `<p class="vitae-field__helper" id="${fid}-help">${esc(helper)}</p>` : ''}
    ${error ? `<p class="vitae-field__error" id="${fid}-error">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}
  </div>`;
};

const STATES = ['rest', 'hover', 'active', 'focus', 'error', 'disabled'];

export default {
  title: 'Vitae 27/Components/Input and Dropdown',
  tags: ['autodocs'],
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: [figma('44:191', 'Input'), figma('53:782', 'Dropdown')],
    docs: { description: { component: `
**Input** and **Dropdown** share one field anatomy: label (Body/Label, \`--vitae-text-secondary\`), optional required marker and info button, 44px control with a 2px border, helper text and an error message.

\`\`\`html
<div class="vitae-field">
  <label class="vitae-field__label" for="income">Annual income</label>
  <input class="vitae-input" id="income" aria-describedby="income-help income-error">
  <p class="vitae-field__helper" id="income-help">…</p>
  <p class="vitae-field__error" id="income-error">…</p>
</div>
\`\`\`

- **Active** (clicked into or typing) changes the background and border. **Focus** adds the dashed ring only for keyboard users: browsers match \`:focus-visible\` on text fields even after a click, so set \`html.vitae-kbd\` on Tab and remove it on pointer down (this Storybook does that).
- **Error:** \`aria-invalid="true"\` and the message linked with \`aria-describedby\`.
- **Dropdown** is a native \`<select class="vitae-input vitae-select">\` with a hidden, disabled first option as the placeholder. The open list is the operating system's own menu. Use it for about 5–15 options (Radio for 2–4).
- **Info button** is a 24×24 toggletip trigger, not a hover tooltip.` } },
  },
  argTypes: {
    kind: { control: 'inline-radio', options: ['input', 'select'] },
    state: { control: 'select', options: STATES },
    leadingIcon: { control: 'select', options: ['', ...iconNames] },
    trailingIcon: { control: 'select', options: ['', ...iconNames] },
  },
  args: { kind: 'input', label: 'Annual income', placeholder: '$0', value: '', helper: 'Before taxes, for everyone in your household.', error: '', required: true, info: true, showLabel: true, leadingIcon: '', trailingIcon: '', state: 'rest' },
  render: (args) => field(args),
};

export const Playground = {};

export const InputStates = {
  name: 'Input · all states',
  render: () => matrix(3, STATES.map((state) => [state, field({ state, label: 'First name', placeholder: 'Placeholder text', value: state === 'disabled' ? '' : 'Marcus', error: state === 'error' ? 'Enter your first name.' : '' })])),
};

export const DropdownStates = {
  name: 'Dropdown · all states',
  render: () => matrix(3, STATES.map((state) => [state, field({ kind: 'select', state, label: 'Tax filing status', placeholder: 'Select', value: state === 'rest' ? '' : 'Single', error: state === 'error' ? 'Choose a filing status.' : '' })])),
};

export const WithIcons = {
  render: () => matrix(2, [
    ['Leading icon', field({ label: 'Email', placeholder: 'name@example.com', leadingIcon: 'mail' })],
    ['Trailing icon', field({ label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar' })],
  ]),
};
