import { icon } from './icons.js';

const TRAILING = {
  none: '',
  calendar: icon.calendar('ea-input__icon'),
  search: icon.search('ea-input__icon'),
};

let uid = 0;
export const field = ({ label, placeholder, state, errorText, trailing = 'none', required = false, info = false, value = '' }) => {
  const id = `ea-input-${uid++}`;
  const errorId = `${id}-error`;
  const isError = state === 'error';
  const disabled = state === 'disabled';
  return `
  <div class="ea-field${disabled ? ' ea-field--disabled' : ''}">
    <span class="ea-field__label-row">
      <label class="ea-field__label" for="${id}">${label}</label>
      ${required ? '<span class="ea-field__required" aria-hidden="true">*</span>' : ''}
      ${info ? `<button type="button" class="ea-field__info" aria-label="More about ${label}">${icon.info()}</button>` : ''}
    </span>
    <span class="ea-input-wrap">
      <input id="${id}" class="ea-input ${isError ? 'ea-input--error' : ''} ${trailing !== 'none' ? 'ea-input--with-icon' : ''}"
             placeholder="${placeholder}" value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required aria-required="true"' : ''}
             ${isError ? `aria-invalid="true" aria-describedby="${errorId}"` : ''}>
      ${TRAILING[trailing]}
    </span>
    ${isError ? `<span class="ea-field__error" id="${errorId}">${errorText}</span>` : ''}
  </div>`;
};

export default {
  title: 'Legacy (v1)/Components/Text Input',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Input",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=2625-82827"
      }
    ],
    docs: {
      description: {
        component: `Single-line text entry. Source: **Vitae → Input** (State = Rest/Hover/Active/Focus/Disabled/Error; Required, Tooltip, Dropdown/Search/Calendar slots).

**Anatomy:** label row (SemiBold label + optional red required \`*\` + optional info icon) · 44px input box with 2px border, 4px radius · optional trailing icon · error-info box below (Vitae notification-error tint).

**States:** Rest (gray-045) · Hover (gray-065) · Active (#333) · Focus (brand primary) · Disabled (gray-020 fill) · Error (status-error border + message).

**Accessibility:** explicit \`<label for>\`; required fields set \`required\`/\`aria-required\` (the visual \`*\` is \`aria-hidden\`); error state sets \`aria-invalid\` and \`aria-describedby\` → the error message. The info icon is a real button with an \`aria-label\` so it can open a Tooltip.

**Do:** always show a visible label; put format hints (MM/DD/YYYY) in the placeholder *and* in help text for date fields.
**Don't:** use placeholder text as the label.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'select', options: ['default', 'disabled', 'error'] },
    errorText: { control: 'text' },
    trailing: { control: 'inline-radio', options: Object.keys(TRAILING) },
    required: { control: 'boolean' },
    info: { control: 'boolean' },
  },
  args: { label: 'First name', placeholder: 'placeholder', value: '', state: 'default', errorText: 'Error Information', trailing: 'none', required: true, info: false },
  render: field,
};

export const Default = {};
export const Optional = { args: { required: false, label: 'Middle name' } };
export const WithInfo = { args: { info: true, label: 'Household size' } };
export const Disabled = { args: { state: 'disabled', value: 'Read only' } };
export const Error = { args: { state: 'error', errorText: 'Enter your first name.' } };
export const Search = { args: { label: 'Search plans', placeholder: 'Plan name or carrier', trailing: 'search', required: false } };

export const AllStates = {
  render: () => `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px;">
    ${field({ label: 'Rest', placeholder: 'placeholder', state: 'default' })}
    ${field({ label: 'Filled', placeholder: 'placeholder', value: 'Jordan', state: 'default' })}
    ${field({ label: 'Disabled', placeholder: 'placeholder', state: 'disabled' })}
    ${field({ label: 'Error', placeholder: 'placeholder', state: 'error', errorText: 'Error Information' })}
  </div>`,
};
