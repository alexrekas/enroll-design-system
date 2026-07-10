const calendarIcon = `<svg class="ea-input__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`;

const field = ({ label, placeholder, state, errorText, icon }) => `
  <label class="ea-field">
    <span class="ea-field__label">${label}</span>
    <span class="ea-input-wrap">
      <input class="ea-input ${state === 'error' ? 'ea-input--error' : ''} ${icon ? 'ea-input--with-icon' : ''}"
             placeholder="${placeholder}" ${state === 'disabled' ? 'disabled' : ''}>
      ${icon ? calendarIcon : ''}
    </span>
    ${state === 'error' ? `<span class="ea-field__error">${errorText}</span>` : ''}
  </label>`;

export default {
  title: 'Components/Text Input',
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
