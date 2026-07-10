const icons = {
  success: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="M6 10.2 L8.8 13 L14 7.4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="M6.5 6.5 L13.5 13.5 M13.5 6.5 L6.5 13.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  warning: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 L18.5 17 L1.5 17 Z" fill="currentColor"/><rect x="9.2" y="8" width="1.6" height="5" fill="#fff"/><rect x="9.2" y="14" width="1.6" height="1.6" fill="#fff"/></svg>`,
  info: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><rect x="9.2" y="8.5" width="1.6" height="6" fill="#fff"/><rect x="9.2" y="5.5" width="1.6" height="1.6" fill="#fff"/></svg>`,
};

export default {
  title: 'Components/Alert',
  argTypes: {
    type: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: { type: 'success', message: 'Your enrollment was submitted.', dismissible: true },
  render: ({ type, message, dismissible }) => `
    <div class="ea-alert ea-alert--${type}" role="${type === 'error' ? 'alert' : 'status'}">
      ${icons[type]}
      <span class="ea-alert__msg">${message}</span>
      ${dismissible ? `<button class="ea-alert__close" aria-label="Dismiss">&#10005;</button>` : ''}
    </div>`,
};

export const Success = {};
export const Error = { args: { type: 'error', message: "SSN doesn't match our records." } };
export const Warning = { args: { type: 'warning', message: 'Your application is missing required documents.' } };
export const Info = { args: { type: 'info', message: 'Open enrollment ends December 15.' } };

export const AllTypes = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${['success', 'error', 'warning', 'info'].map(t => `
        <div class="ea-alert ea-alert--${t}">
          ${icons[t]}
          <span class="ea-alert__msg">This is a ${t} alert.</span>
          <button class="ea-alert__close" aria-label="Dismiss">&#10005;</button>
        </div>`).join('')}
    </div>`,
};
