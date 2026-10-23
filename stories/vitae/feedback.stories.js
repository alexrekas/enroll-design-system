import { canvas, figma, esc, matrix } from './_shared.js';
import { icon } from './icons.js';

const ALERT_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'] };

export const alert = ({ type = 'info', title = 'Your application was submitted', message = "We'll email you when your eligibility results are ready.", link = '', dismissible = true } = {}) => {
  const [n, t] = ALERT_ICON[type];
  return `<div class="vitae-alert vitae-alert--${type}" role="${type === 'error' ? 'alert' : 'status'}">
    ${icon(n, 24, t)}
    <div class="vitae-alert__body">
      ${title ? `<p class="vitae-alert__title">${esc(title)}</p>` : ''}
      <p class="vitae-alert__message">${esc(message)}</p>
      ${link ? `<a href="#" class="vitae-link vitae-link--standalone">${esc(link)}${icon('arrow-right', 20, 'filled')}</a>` : ''}
    </div>
    ${dismissible ? `<button type="button" class="vitae-alert__dismiss" aria-label="Dismiss">${icon('close', 20, 'filled')}</button>` : ''}
  </div>`;
};

const TAG_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'], 'dc-healthy': ['star', 'filled'], 'dc-essential': ['bookmark', 'filled'], 'me-clear-choice': ['success', 'regular'], 'me-current-plan': ['star', 'filled'] };
export const tag = ({ label = 'Approved', type = 'success', showIcon = true } = {}) => {
  const i = TAG_ICON[type];
  return `<span class="vitae-tag vitae-tag--${type}">${showIcon && i ? icon(i[0], 16, i[1]) : ''}${esc(label)}</span>`;
};

export const metalBadge = (level = 'Gold') => `<span class="vitae-metal-badge vitae-metal-badge--${level.toLowerCase()}">${esc(level)}</span>`;

export default {
  title: 'Vitae 27/Components/Alert, Tag and Metal badge',
  tags: ['autodocs'],
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: { design: [figma('94:56', 'Alert'), figma('96:27', 'Tag'), figma('180:32', 'Metal badge')] },
};

export const Alert = {
  args: { type: 'info', title: 'Your application was submitted', message: "We'll email you when your eligibility results are ready.", link: 'View your application', dismissible: true },
  argTypes: { type: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  render: (args) => alert(args),
  parameters: { docs: { description: { story: `
Inline message about the page or a task, with a status icon (Warning is two-tone). Title and message use \`--vitae-alert-text\`.

- \`role="alert"\` for Error, \`role="status"\` for the others. Icons are \`aria-hidden\`; Dismiss is a 32×32 \`<button aria-label="Dismiss">\`.
- Move focus to an alert only when it blocks the next step (for example form errors). Don't stack two alerts of the same type.
- Appears with a fade and 4px slide over 150ms; no slide under reduced motion.` } } },
};

export const AlertTypes = {
  name: 'Alert · all types',
  render: () => `<div style="display:grid;gap:16px">${[
    ['info', 'Open enrollment ends December 15', 'Choose a plan by then for coverage starting January 1.'],
    ['success', 'Your plan is selected', 'Pay your first premium to start coverage.'],
    ['warning', 'We need one more document', 'Upload proof of income by November 30 to keep your tax credit.'],
    ['error', 'There are 2 problems on this page', 'Fix the fields marked below, then continue.'],
  ].map(([type, title, message]) => alert({ type, title, message })).join('')}</div>`,
};

export const Tag = {
  args: { label: 'Approved', type: 'success', showIcon: true },
  argTypes: { type: { control: 'select', options: ['neutral', 'brand', 'info', 'success', 'warning', 'error', 'current-plan', 'dc-healthy', 'dc-essential', 'me-clear-choice', 'me-current-plan', 'ma-premium-value'] } },
  render: (args) => tag(args),
  parameters: { docs: { description: { story: `
Compact, non-interactive label (24px pill, Body/Button). Status types carry a 16px icon so color is never the only cue. Program tags belong to one client only: Healthy DC Plan and Essential Plan (DC), Clear Choice Plan (ME), Premium Value Plan (MA).

\`<span class="vitae-tag vitae-tag--success"><svg aria-hidden="true">…</svg>Approved</span>\`` } } },
};

export const TagTypes = {
  name: 'Tag · all types',
  render: () => matrix(6, [
    ['Neutral', tag({ type: 'neutral', label: 'Draft', showIcon: false })],
    ['Brand', tag({ type: 'brand', label: 'Brand', showIcon: false })],
    ['Info', tag({ type: 'info', label: 'In review' })],
    ['Success', tag({ type: 'success', label: 'Approved' })],
    ['Warning', tag({ type: 'warning', label: 'Action needed' })],
    ['Error', tag({ type: 'error', label: 'Denied' })],
    ['Current plan', tag({ type: 'current-plan', label: 'Current plan', showIcon: false })],
    ['DC · Healthy DC Plan', tag({ type: 'dc-healthy', label: 'Healthy DC Plan' })],
    ['DC · Essential Plan', tag({ type: 'dc-essential', label: 'Essential Plan' })],
    ['ME · Clear Choice Plan', tag({ type: 'me-clear-choice', label: 'Clear Choice Plan' })],
    ['ME · Your current plan', tag({ type: 'me-current-plan', label: 'Your current plan' })],
    ['MA · Premium Value Plan', tag({ type: 'ma-premium-value', label: 'Premium Value Plan', showIcon: false })],
  ]),
};

export const MetalBadge = {
  name: 'Metal badge',
  render: () => matrix(5, ['Bronze', 'Silver', 'Gold', 'Platinum', 'Catastrophic'].map((l) => [l, metalBadge(l)])),
  parameters: { docs: { description: { story: 'ACA plan level. Same colors in every client and mode; black text on Bronze, Silver and Gold, white on Platinum and Catastrophic (all 4.5:1 or better). Always shows the level name. `<span class="vitae-metal-badge vitae-metal-badge--gold">Gold</span>`' } } },
};

export const Tooltip = {
  args: { message: 'Include income from jobs, self-employment and unemployment for everyone in your tax household.', placement: 'top' },
  argTypes: { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right', 'none'] } },
  render: ({ message, placement }) => `<div style="padding:24px"><div role="tooltip" class="vitae-tooltip vitae-tooltip--${placement}">${esc(message)}</div></div>`,
  parameters: {
    design: figma('101:33', 'Tooltip'),
    docs: { description: { story: `
One or two sentences of extra help. The field-label info button opens it as a **toggletip** (click, tap, Enter or Space; Esc, a second click or a click outside closes it) and the text is announced through a polite live region. Hover and focus tooltips are only for short labels on icon-only buttons. No links or buttons inside, and nothing the person needs to finish the task.` } },
  },
};
