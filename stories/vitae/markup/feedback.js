// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc } from '../_shared.js';
import { icon } from '../icons.js';

export const ALERT_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'] };

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

export const TAG_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'], 'dc-healthy': ['star', 'filled'], 'dc-essential': ['bookmark', 'filled'], 'me-clear-choice': ['success', 'regular'], 'me-current-plan': ['star', 'filled'] };

export const tag = ({ label = 'Approved', type = 'success', showIcon = true } = {}) => {
  const i = TAG_ICON[type];
  return `<span class="vitae-tag vitae-tag--${type}">${showIcon && i ? icon(i[0], 16, i[1]) : ''}${esc(label)}</span>`;
};

export const metalBadge = (level = 'Gold') => `<span class="vitae-metal-badge vitae-metal-badge--${level.toLowerCase()}">${esc(level)}</span>`;
