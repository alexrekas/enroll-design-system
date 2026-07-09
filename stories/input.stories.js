const field = ({ label, placeholder, state, errorText }) => `
  <label class="ea-field">
    <span class="ea-field__label">${label}</span>
    <input class="ea-input ${state === 'error' ? 'ea-input--error' : ''}"
           placeholder="${placeholder}" ${state === 'disabled' ? 'disabled' : ''}>
    ${state === 'error' ? `<span class="ea-field__error">${errorText}</span>` : ''}
  </label>`;

export default {
  title: 'Components/Text Input',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    state: { control: 'select', options: ['default', 'disabled', 'error'] },
    errorText: { control: 'text' },
  },
  args: { label: 'First name', placeholder: 'placeholder', state: 'default', errorText: 'Error Information' },
  render: field,
};

export const Default = {};
export const Disabled = { args: { state: 'disabled' } };
export const Error = { args: { state: 'error' } };
