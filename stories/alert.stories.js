import { icon as sharedIcon } from './icons.js';

// Alert keeps a filled circle/triangle backdrop (brand convention: white glyph on a solid
// color badge) so these compose the shared monochrome icon.js paths onto that backdrop
// rather than importing the outline versions directly.
const icons = {
  success: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="M6 10.2 L8.8 13 L14 7.4" fill="none" stroke="var(--ea-color-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><path d="M6.5 6.5 L13.5 13.5 M13.5 6.5 L6.5 13.5" fill="none" stroke="var(--ea-color-white)" stroke-width="2" stroke-linecap="round"/></svg>`,
  warning: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2 L18.5 17 L1.5 17 Z" fill="currentColor"/><rect x="9.2" y="8" width="1.6" height="5" fill="var(--ea-color-white)"/><rect x="9.2" y="14" width="1.6" height="1.6" fill="var(--ea-color-white)"/></svg>`,
  info: `<svg class="ea-alert__icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="currentColor"/><rect x="9.2" y="8.5" width="1.6" height="6" fill="var(--ea-color-white)"/><rect x="9.2" y="5.5" width="1.6" height="1.6" fill="var(--ea-color-white)"/></svg>`,
};
const dismissIcon = sharedIcon.dismiss('ea-alert__close-icon');

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Inline banner communicating success, error, warning, or informational messages tied to page or form state.

**Accessibility:** \`role="alert"\` for the error type only (assertive, interrupts screen readers); \`role="status"\` for success/warning/info (polite, doesn't interrupt). The dismiss button is a native \`<button aria-label="Dismiss">\`. Type icons are decorative (\`aria-hidden="true"\`) — the message text carries the meaning.

**Do:** use \`role="alert"\` only for the error type; keep alert text short and actionable.
**Don't:** use \`role="alert"\` on every type — it's disruptive for non-urgent messages.`,
      },
    },
  },
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
      ${dismissible ? `<button class="ea-alert__close" aria-label="Dismiss">${dismissIcon}</button>` : ''}
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
          <button class="ea-alert__close" aria-label="Dismiss">${dismissIcon}</button>
        </div>`).join('')}
    </div>`,
};
