// Vitae 27 page templates: whole pages assembled only from the component markup functions.
// They show how components fit together (page shell, headings, spacing, responsive behavior);
// they add no new components, only the page-level layout classes in vitae.css (/* Templates */).
import { esc, id } from '../_shared.js';
import { MEMBERS, PLANS, SIGNED_IN } from '../data.js';
import { icon } from '../icons.js';
import { logo } from '../logos.js';
import { button } from './button.js';
import { alert, tag } from './feedback.js';
import { field } from './field.js';
import { choiceGroup, fieldset, search, table } from './layout.js';
import { CLIENT_INFO, backLink, footer, header, leftnav, pagination, progressLine, steps, NAV_ITEMS } from './navigation.js';
import { historyRow, verification } from './upload.js';

/** A button-styled link (navigation, not an action). */
export const linkButton = ({ label, style = 'solid', level = 'primary', iconLeft = '', iconRight = '' }) =>
  button({ label, style, level, iconLeft, iconRight }).replace('<button type="button"', '<a href="#"').replace('</button>', '</a>');

/** Page title block: h1, optional lead paragraph and actions on the right (they wrap under on narrow screens). */
export const pageHeader = ({ title, lead = '', actions = '' }) => `<div class="vitae-page-header">
    <div class="vitae-page-header__text"><h1 class="vitae-page-title">${esc(title)}</h1>${lead ? `<p class="vitae-page-lead">${esc(lead)}</p>` : ''}</div>
    ${actions ? `<div class="vitae-page-header__actions">${actions}</div>` : ''}</div>`;

/** A titled page section (h2) with an optional link or button on the right of the heading. */
export const pageSection = ({ title, action = '', body }) => {
  const sid = id('section');
  return `<section class="vitae-page-section" aria-labelledby="${sid}"><div class="vitae-page-section__header"><h2 class="vitae-page-section__title" id="${sid}">${esc(title)}</h2>${action}</div>${body}</section>`;
};

/** Under 768px: the phone header bar. The drawer it opens is the Header › Mobile story. */
const mobileHeader = (client) => {
  const did = id('drawer');
  return `<header class="vitae-mobile-header"><a href="#" class="vitae-mobile-header__logo" aria-label="${esc(CLIENT_INFO[client].name)}">${logo(client)}</a>
    <button type="button" class="vitae-menu-button" aria-expanded="false" aria-controls="${did}" aria-label="Open menu">${icon('menu', 24, 'regular')}</button></header>
    <div id="${did}" hidden></div>`;
};

/**
 * Page shell: skip link, header (desktop and phone versions, switched by the page width), an optional
 * side column (left nav or progress) and the footer. `sideMobile` replaces the side column under 768px.
 */
export const appShell = ({ client, user, side = '', sideMobile = '', main }) => `<div class="vitae-app">
  <a href="#main" class="vitae-skip-link">Skip to main content</a>
  <div class="vitae-app__header vitae-app__header--wide">${header({ client, user, showCart: false })}</div>
  <div class="vitae-app__header vitae-app__header--narrow">${mobileHeader(client)}</div>
  <div class="vitae-container vitae-app__body${side ? ' vitae-app__body--side' : ''}">
    ${side ? `<div class="vitae-app__side vitae-app__side--wide">${side}</div>` : ''}
    ${sideMobile ? `<div class="vitae-app__side vitae-app__side--narrow">${sideMobile}</div>` : ''}
    <main id="main" class="vitae-app__main" tabindex="-1">${main}</main>
  </div>
  ${footer({ client })}
</div>`;

/** Under 768px the left nav collapses into the Mobile nav toggle (closed). */
const accountNavMobile = (current) => {
  const pid = id('acct');
  return `<button type="button" class="vitae-navtoggle vitae-navtoggle--rule" aria-expanded="false" aria-controls="${pid}"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">My Account: </span>${esc(NAV_ITEMS[current][0])}</span>${icon('chevron-down', 20, 'filled')}</span></button>
    <div class="vitae-navpanel" id="${pid}" hidden></div>`;
};

const summaryList = (pairs) => `<dl class="vitae-summary-list">${pairs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

/* ---------- Account dashboard ---------- */
export const MESSAGES = (client) => [
  { subject: 'Your 2027 eligibility results are ready', from: CLIENT_INFO[client].name, date: '10/28/2026', unread: true },
  { subject: 'We need proof of income', from: CLIENT_INFO[client].name, date: '10/14/2026', unread: true },
  { subject: 'Your September payment was received', from: 'CareFirst BlueChoice', date: '09/03/2026', unread: false },
];

export const dashboard = ({ client = 'ea', alertShown = true } = {}) => {
  const plan = PLANS[0];
  const health = `<section class="vitae-card vitae-card--fill" aria-labelledby="cov-health">
      <div class="vitae-card__header"><h3 class="vitae-card__title" id="cov-health">Health</h3>${tag({ type: 'success', label: 'Enrolled' })}</div>
      <p class="vitae-card__lead">${esc(plan.name)}</p>
      ${summaryList([['Monthly premium', `${esc(plan.premium)}`], ['Covered', 'Marcus, Dana, Ava, Leo and Mia'], ['Coverage ends', '12/31/2027']])}
      <div class="vitae-card__footer">${linkButton({ label: 'View plan details', style: 'outline' })}${linkButton({ label: 'Change plan', style: 'ghost' })}</div></section>`;
  const dental = `<section class="vitae-card vitae-card--fill" aria-labelledby="cov-dental">
      <div class="vitae-card__header"><h3 class="vitae-card__title" id="cov-dental">Dental</h3>${tag({ type: 'neutral', label: 'Not enrolled', showIcon: false })}</div>
      <p style="margin:0">You can add dental coverage for your household during open enrollment.</p>
      <div class="vitae-card__footer">${linkButton({ label: 'Shop for dental plans', style: 'outline' })}</div></section>`;
  const messages = `<ul class="vitae-message-list">${MESSAGES(client).map((m) => `<li class="vitae-message${m.unread ? ' is-unread' : ''}">
      <a href="#" class="vitae-message__subject">${m.unread ? '<span class="vitae-visually-hidden">Unread: </span>' : ''}${esc(m.subject)}</a>
      <span class="vitae-message__meta">${esc(m.from)} · ${esc(m.date)}</span></li>`).join('')}</ul>`;
  const main = `${pageHeader({ title: `Welcome back, ${SIGNED_IN['Individual & Family'][0].split(' ')[0]}`, lead: 'Your household’s coverage for 2027.' })}
    ${alertShown ? alert({ type: 'warning', title: 'We need a document from you', message: 'Upload proof of income by 12/01/2026 so your household keeps its tax credits.', link: 'Upload documents', dismissible: false }) : ''}
    ${pageSection({ title: 'Your coverage', body: `<div class="vitae-card-grid">${health}${dental}</div>` })}
    ${pageSection({ title: 'To do', action: linkButton({ label: 'All documents', style: 'ghost', iconRight: 'arrow-right' }), body: verification({ state: 'Action needed' }) })}
    ${pageSection({ title: 'Messages', action: linkButton({ label: 'All messages', style: 'ghost', iconRight: 'arrow-right' }), body: messages })}`;
  return appShell({ client, user: 'Individual & Family', side: leftnav(0), sideMobile: accountNavMobile(0), main });
};

/* ---------- Application step ---------- */
export const APP_STEPS = ['Household', 'Income', 'Health coverage', 'Review and sign'];

export const applicationStep = ({ client = 'ea', error = false } = {}) => {
  const current = 1; const total = APP_STEPS.length;
  const pct = Math.round(((current + 0.5) / total) * 100);
  const stepText = `Step ${current + 1} of ${total}`;
  const pid = id('steps');
  const side = `<nav class="vitae-progress" aria-label="Application progress"><div class="vitae-progress__card"><h2 class="vitae-progress__title">2027 Application</h2>${progressLine(pct, false, stepText)}${steps(current, APP_STEPS)}</div>
    <div class="vitae-progress__links"><a href="#" class="vitae-link vitae-link--standalone">Save &amp; Exit</a><a href="#" class="vitae-link vitae-link--standalone">Get Help</a></div></nav>`;
  const sideMobile = `<button type="button" class="vitae-navtoggle" aria-expanded="false" aria-controls="${pid}"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">2027 Application, </span>${stepText}: ${esc(APP_STEPS[current])}</span>${icon('chevron-down', 20, 'filled')}</span>${progressLine(pct, true)}</button>
    <div id="${pid}" hidden></div>`;
  const amount = field({ label: 'Amount before taxes', value: error ? '' : '$1,850.00', required: true, helper: 'Pay before taxes and deductions are taken out.', error: error ? 'Enter the amount Marcus is paid before taxes, like $1,850.00.' : '' });
  const main = `${backLink('Back to Household')}
    ${pageHeader({ title: 'Income for Marcus Bennett', lead: 'Tell us about money Marcus gets from jobs. We use it to see if your household can get help paying for coverage.' })}
    ${error ? alert({ type: 'error', title: 'Fix 1 problem to continue', message: 'Amount before taxes is missing.', dismissible: false }) : ''}
    <form class="vitae-form" novalidate>
      ${choiceGroup({ legend: 'Does Marcus have a job?', options: [{ label: 'Yes', checked: true }, { label: 'No' }], inline: true, name: 'has-job' })}
      ${fieldset({ legend: 'Job 1', rows: [
        [field({ label: 'Employer name', value: 'Northside Bakery & Café', required: true })],
        [amount, field({ kind: 'select', label: 'How often is Marcus paid?', value: 'Every 2 weeks', options: ['Weekly', 'Every 2 weeks', 'Twice a month', 'Monthly', 'Once a year'], required: true })],
        [field({ label: 'Start date', value: '03/14/2022', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar', required: true, width: 'half' })],
      ] })}
      <div class="vitae-form__add">${button({ label: 'Add another job', style: 'ghost', iconLeft: 'add-circle' })}</div>
      <div class="vitae-form-actions">${linkButton({ label: 'Back', style: 'outline' })}${button({ label: 'Save and continue' }).replace('type="button"', 'type="submit"')}</div>
    </form>`;
  return appShell({ client, user: 'Individual & Family', side, sideMobile, main });
};

/* ---------- Documents ---------- */
export const documentsPage = ({ client = 'ea' } = {}) => {
  const main = `${pageHeader({ title: 'Documents', lead: 'Upload documents we ask for and see the ones you’ve sent. We review documents within 10 business days.' })}
    ${pageSection({ title: 'Documents we need', body: `<div class="vitae-stack">${verification({ state: 'Uploading' })}${verification({ state: 'In review', title: 'Income', member: 'Dana Bennett' })}${verification({ state: 'Verified', title: 'Residency', message: 'Your residency is verified. No action needed.' })}</div>` })}
    ${pageSection({ title: 'Document history', body: `<ul class="vitae-upload-history" aria-label="Document history">
      ${historyRow({ status: 'Rejected', type: 'Paystub', name: 'Paystub_Aug.jpg', submitted: '09/03/2026' })}
      ${historyRow({ status: 'Accepted', type: 'Lease agreement', name: 'Bennett_lease_2026.pdf', submitted: '08/22/2026', remove: false })}
      ${historyRow({ status: 'Accepted', type: 'Birth certificate', name: 'Ava_Bennett_birth_certificate.pdf', submitted: '08/22/2026', remove: false })}</ul>` })}`;
  return appShell({ client, user: 'Individual & Family', side: leftnav(3), sideMobile: accountNavMobile(3), main });
};

/* ---------- Admin table ---------- */
export const adminTable = ({ client = 'ea', selected = [1, 2] } = {}) => {
  const toolbar = `<div class="vitae-toolbar">${search({ value: '', open: false, label: 'Search families', placeholder: 'Search by name or account ID' })}
    ${field({ kind: 'select', label: 'Status', value: '', placeholder: 'All statuses', options: ['Active', 'Pending', 'Action needed', 'Terminated'] })}</div>`;
  const main = `${pageHeader({ title: 'Families', lead: `${MEMBERS.length * 62 + 2} families`, actions: linkButton({ label: 'Add family', iconLeft: 'add' }) })}
    ${toolbar}
    ${table({ caption: 'Families', selected })}
    <div class="vitae-pagination-wrap">${pagination('full', 1, 32)}${pagination('compact', 1, 32)}</div>`;
  return appShell({ client, user: 'Admin', main });
};
