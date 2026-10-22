import { icon } from './icons.js';

const STATUS = {
  standard: null,
  info: icon.statusInfo('ea-modal__icon'),
  success: icon.statusSuccess('ea-modal__icon'),
  warning: icon.statusWarning('ea-modal__icon'),
  error: icon.statusError('ea-modal__icon'),
};
const COPY = {
  standard: ['Leave this application?', 'Your answers are saved. You can come back and finish any time before December 15.', 'Stay', 'Leave'],
  info: ['Your income changed', 'Because your income changed, your tax credit may change too. We’ll recalculate it on the next step.', 'Back', 'Continue'],
  success: ['Application submitted', 'We sent a confirmation to your email. Most applications are reviewed within 2 business days.', 'View application', 'Done'],
  warning: ['You have unsaved changes', 'If you leave now, changes to this section will be lost.', 'Keep editing', 'Discard changes'],
  error: ['We couldn’t verify your identity', 'The information you entered doesn’t match our records. Check your Social Security number and try again.', 'Get help', 'Try again'],
};

let uid = 0;
const modal = ({ type, title, body, secondary, primary, destructive }) => {
  const id = `ea-modal-${uid++}`;
  return `
  <div class="ea-modal ea-modal--${type}" role="${type === 'error' || type === 'warning' ? 'alertdialog' : 'dialog'}" aria-modal="true" aria-labelledby="${id}-t" aria-describedby="${id}-d">
    <div class="ea-modal__header">
      ${STATUS[type] || ''}
      <h2 class="ea-modal__title" id="${id}-t">${title}</h2>
      <button type="button" class="ea-modal__close" aria-label="Close">${icon.dismiss()}</button>
    </div>
    <div class="ea-modal__body" id="${id}-d"><p>${body}</p></div>
    <div class="ea-modal__footer">
      <button type="button" class="ea-btn ea-btn--${destructive ? 'destructive' : 'primary'} ea-btn--outline">${secondary}</button>
      <button type="button" class="ea-btn ea-btn--${destructive ? 'destructive' : 'primary'}">${primary}</button>
    </div>
  </div>`;
};

const inline = (inner) => `<div class="ea-modal-scrim ea-modal-scrim--inline">${inner}</div>`;

export default {
  title: 'Legacy (v1)/Components/Modal',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Modal",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=2615-18586"
      }
    ],
    docs: {
      description: {
        component: `Blocking dialog for confirmations, important status, and short decisions. Source: **Vitae → Modal** (Type = Standard / Info / Success / Warning / Error).

**Anatomy:** 560px, 4px radius, Elevation64 shadow · header (optional 20px status icon, dialog title 20/28 SemiBold — the 2021 dialog-box-header style, X close) · body (paragraph 16/24) · right-aligned footer with Outline + Solid buttons, 6px apart.

**Accessibility:** \`role="dialog"\` (or \`alertdialog\` for Warning/Error) with \`aria-modal\`, \`aria-labelledby\` → title and \`aria-describedby\` → body. In production: move focus into the modal on open (to the least destructive action), trap Tab, close on Esc, and return focus to the trigger on close. The status icon is decorative — the title must say what happened.

**Do:** use the primary action's verb on the button ("Discard changes", not "OK").
**Don't:** stack modals or put long forms in one.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: Object.keys(STATUS) },
    title: { control: 'text' },
    body: { control: 'text' },
    secondary: { control: 'text' },
    primary: { control: 'text' },
    destructive: { control: 'boolean' },
  },
  args: { type: 'standard', title: COPY.standard[0], body: COPY.standard[1], secondary: COPY.standard[2], primary: COPY.standard[3], destructive: false },
  render: (args) => inline(modal(args)),
};

export const Standard = {};
export const Info = { args: { type: 'info', title: COPY.info[0], body: COPY.info[1], secondary: COPY.info[2], primary: COPY.info[3] } };
export const Success = { args: { type: 'success', title: COPY.success[0], body: COPY.success[1], secondary: COPY.success[2], primary: COPY.success[3] } };
export const Warning = { args: { type: 'warning', title: COPY.warning[0], body: COPY.warning[1], secondary: COPY.warning[2], primary: COPY.warning[3], destructive: true } };
export const Error = { args: { type: 'error', title: COPY.error[0], body: COPY.error[1], secondary: COPY.error[2], primary: COPY.error[3] } };

export const Interactive = {
  name: 'Open / close (focus handling)',
  parameters: { docs: { description: { story: 'Reference behavior: focus moves to the dialog on open, Tab is trapped, Esc / X / either button closes, and focus returns to the trigger.' } } },
  render: () => {
    const root = document.createElement('div');
    root.innerHTML = `<button type="button" class="ea-btn ea-btn--primary" data-open>Leave application</button>`;
    const trigger = root.querySelector('[data-open]');
    let scrim;
    const close = () => { scrim?.remove(); scrim = null; trigger.focus(); };
    trigger.addEventListener('click', () => {
      const [t, b, s, p] = COPY.standard;
      root.insertAdjacentHTML('beforeend', `<div class="ea-modal-scrim">${modal({ type: 'standard', title: t, body: b, secondary: s, primary: p })}</div>`);
      scrim = root.lastElementChild;
      const focusables = () => [...scrim.querySelectorAll('button')];
      focusables()[1].focus(); // secondary (least destructive) action
      scrim.addEventListener('click', (e) => { if (e.target === scrim || e.target.closest('button')) close(); });
      scrim.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
        if (e.key === 'Tab') {
          const f = focusables(); const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    });
    return root;
  },
};
