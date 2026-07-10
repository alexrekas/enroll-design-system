import { icon } from './icons.js';

const calendarIcon = icon.calendar('ea-input__icon');

let uid = 0;
const field = ({ label, placeholder, state, errorText, icon }) => {
  const errorId = `ea-input-error-${uid++}`;
  const isError = state === 'error';
  return `
  <label class="ea-field">
    <span class="ea-field__label">${label}</span>
    <span class="ea-input-wrap">
      <input class="ea-input ${isError ? 'ea-input--error' : ''} ${icon ? 'ea-input--with-icon' : ''}"
             placeholder="${placeholder}" ${state === 'disabled' ? 'disabled' : ''}
             ${isError ? `aria-invalid="true" aria-describedby="${errorId}"` : ''}>
      ${icon ? calendarIcon : ''}
    </span>
    ${isError ? `<span class="ea-field__error" id="${errorId}">${errorText}</span>` : ''}
  </label>`;
};

export default {
  title: 'Components/Text Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Single-line text entry field with label, optional trailing icon, and error messaging.

**States:** Default, Hover, Focus (brand-colored border), Disabled, Error (red border + message row below).

**Accessibility:** the native \`<label>\` wraps the input, giving an implicit label association. **Known gap:** the error message isn't wired to the input via \`aria-describedby\`/\`aria-invalid\` in every case — recommend adding both when wiring up real interactivity.

**Do:** always pair a visible label with every input; show the error message immediately below the field it belongs to.
**Don't:** rely on placeholder text as a substitute for a label.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    state: { control: 'select', options: ['default', 'disabled', 'error'] },
    errorText: { control: 'text' },
    icon: { control: 'boolean' },
  },
  args: { label: 'First name', placeholder: 'placeholder', state: 'default', errorText: 'Error Information', icon: false },
  render: field,
};

export const Default = {};
export const Disabled = { args: { state: 'disabled' } };
export const Error = { args: { state: 'error' } };
export const WithTrailingIcon = { args: { label: 'Date of Birth', placeholder: 'MM/DD/YYYY', icon: true } };
