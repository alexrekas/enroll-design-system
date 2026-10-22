import { icon as sharedIcon } from './icons.js';

// Filled status badges come from the shared icon set (white glyph on a solid color badge).
const icons = {
  success: sharedIcon.statusSuccess('ea-alert__icon'),
  error: sharedIcon.statusError('ea-alert__icon'),
  warning: sharedIcon.statusWarning('ea-alert__icon'),
  info: sharedIcon.statusInfo('ea-alert__icon'),
};
const dismissIcon = sharedIcon.dismiss('ea-alert__close-icon');

export default {
  title: 'Legacy (v1)/Components/Alert',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Alert",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=2611-13948"
      }
    ],
    docs: {
      description: {
        component: `Source: **Vitae → Alert** (Type = Info/Success/Warning/Error, optional hyperlink row, optional X-close). Vitae notification-tint surfaces, 12px radius, 1px status border.\n\nInline banner communicating success, error, warning, or informational messages tied to page or form state.

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
    link: { control: 'text' },
  },
  args: { type: 'success', message: 'Your enrollment was submitted.', dismissible: true, link: '' },
  render: ({ type, message, dismissible, link }) => `
    <div class="ea-alert ea-alert--${type}" role="${type === 'error' ? 'alert' : 'status'}">
      ${icons[type]}
      <span class="ea-alert__msg">${message}${link ? `<br><a href="#">${link}</a>` : ''}</span>
      ${dismissible ? `<button class="ea-alert__close" aria-label="Dismiss">${dismissIcon}</button>` : ''}
    </div>`,
};

export const Success = {};
export const Error = { args: { type: 'error', message: "SSN doesn't match our records." } };
export const Warning = { args: { type: 'warning', message: 'Your application is missing required documents.' } };
export const Info = { args: { type: 'info', message: 'Open enrollment ends December 15.' } };
export const WithLink = { args: { type: 'info', message: 'You may qualify for lower costs.', link: 'See if you qualify' } };

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
