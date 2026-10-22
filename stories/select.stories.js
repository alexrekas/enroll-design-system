import { icon } from './icons.js';

const chevron = icon.chevronDown('ea-input__icon');
let uid = 0;

const select = ({ label, placeholder, options, value = '', state = 'default', required = true, errorText = 'Select an option.' }) => {
  const id = `ea-select-${uid++}`;
  const isError = state === 'error';
  const disabled = state === 'disabled';
  return `
  <div class="ea-field${disabled ? ' ea-field--disabled' : ''}">
    <span class="ea-field__label-row">
      <label class="ea-field__label" for="${id}">${label}</label>
      ${required ? '<span class="ea-field__required" aria-hidden="true">*</span>' : ''}
    </span>
    <span class="ea-input-wrap">
      <select id="${id}" class="ea-input ea-select ${isError ? 'ea-input--error' : ''}" ${disabled ? 'disabled' : ''} ${required ? 'required aria-required="true"' : ''}
              ${isError ? `aria-invalid="true" aria-describedby="${id}-error"` : ''}>
        <option value="" disabled ${value ? '' : 'selected'} hidden>${placeholder}</option>
        ${options.map(o => `<option ${o === value ? 'selected' : ''}>${o}</option>`).join('')}
      </select>
      ${chevron}
    </span>
    ${isError ? `<span class="ea-field__error" id="${id}-error">${errorText}</span>` : ''}
  </div>`;
};

const STATES = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'MA', 'MD', 'ME', 'NH', 'NY', 'VA', 'VT'];
const SUFFIX = ['Jr.', 'Sr.', 'II', 'III', 'IV'];

export default {
  title: 'Legacy (v1)/Components/Dropdown',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Dropdown",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=2582-215"
      },
      {
        "label": "Native <select> option list",
        "status": "adapted",
        "note": "Option panel not designed in Vitae yet"
      }
    ],
    docs: {
      description: {
        component: `Single-choice picker from a known list. Source: **Vitae → Dropdown** (the shared \`.input-trunk\` + trailing chevron; Status = Rest/Hover/Active/Focus/Disabled/Error).

**Implementation:** a native \`<select>\` styled with the Text Input classes (\`ea-input ea-select\`) plus the chevron from the shared icon set. Native gives free keyboard support, type-ahead, mobile pickers and screen reader support. The open list uses the OS menu, because Vitae doesn't design an options panel yet.

**Accessibility:** explicit \`<label for>\`; a hidden, disabled first option acts as the placeholder so \`required\` validation works; errors use \`aria-invalid\` + \`aria-describedby\`.

**Do:** use for 5–15 options; sort alphabetically unless there's a natural order.
**Don't:** use for 2–4 options (use Radio) or very long lists (use a searchable input).`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    state: { control: 'select', options: ['default', 'disabled', 'error'] },
    required: { control: 'boolean' },
  },
  args: { label: 'State', placeholder: 'Select a state', options: STATES, state: 'default', required: true },
  render: select,
};

export const Default = {};
export const Selected = { args: { value: 'ME' } };
export const Optional = { args: { label: 'Suffix', placeholder: 'None', options: SUFFIX, required: false } };
export const Disabled = { args: { state: 'disabled', value: 'DC' } };
export const Error = { args: { state: 'error', errorText: 'Select the state you live in.' } };
