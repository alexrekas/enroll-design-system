// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc } from '../_shared.js';
import { SIGNED_IN } from '../data.js';
import { icon } from '../icons.js';
import { logo } from '../logos.js';
import { button } from './button.js';

export const CLIENT_INFO = {
  ea: { name: 'EnrollApp', tagline: 'EnrollApp', copyright: ['EnrollApp', 'All Rights Reserved.'], phone: '(000) 000-0000 / TTY 000', tel: '+10000000000', help: [['secondary', 'phone'], ['tertiary', '']], languages: true },
  dc: { name: 'DC Health Link', tagline: 'DC Health Link', copyright: ['© 2026 District of Columbia Health Link.'], phone: '(855) 532-5465 / TTY: 711', tel: '+18555325465', email: 'info@dchealthlink.com', ghost: true },
  ma: { name: 'Massachusetts Health Connector', tagline: 'MA Health Connector', copyright: ['MA Health Connector', 'All Rights Reserved.'], phone: '1-888-813-9220', tel: '+18888139220', help: [['primary', 'phone'], ['secondary', '']] },
  me: { name: 'CoverME.gov', tagline: 'CoverME.gov', copyright: ['CoverME.gov', 'All Rights Reserved.'], phone: '(866) 636-0355 / TTY 711', tel: '+18666360355', help: [['secondary', 'phone'], ['tertiary', '']] },
};

export const ROLE_ICON = {
  'Individual & Family': () => 'nav-user-consumer',
  Employer: (c) => ({ ea: 'nav-building', me: 'nav-building', dc: 'nav-building-retail', ma: 'nav-user-consumer' }[c]),
  Employee: (c) => ({ dc: 'nav-user-expert', ma: 'nav-user-consumer' }[c] || 'nav-user-expert'),
  Broker: () => 'nav-user-expert',
  Admin: () => 'nav-user-settings',
};

export const clientOf = (g) => g.theme || 'ea';

export const header = ({ client, user = 'Individual & Family', showCart = true }) => {
  const c = CLIENT_INFO[client];
  const portal = user === 'Logged out' ? 'Individual & Family' : user;
  const myPortal = !(client === 'ma' && user === 'Employee');
  const right = user === 'Logged out' ? '' : `<div class="vitae-header__actions">
      ${user === 'Individual & Family' && showCart ? `<a href="#" class="vitae-header__cart" aria-label="Cart, 1 plan">${icon('nav-cart-filled')}<span class="vitae-badge" aria-hidden="true">1</span></a>` : ''}
      <div class="vitae-header__user">${icon(ROLE_ICON[user](client))}<div><div class="vitae-header__name">${esc(SIGNED_IN[user][0])}</div>
        <div class="vitae-header__meta"><span>ID: ${esc(SIGNED_IN[user][1])}</span>${myPortal ? '<a href="#">My Portal</a>' : ''}<a href="#">Log Out</a></div></div></div>
    </div>`;
  const navItems = user === 'Admin' ? ['Home', 'Families', 'User Accounts', 'Issuers', 'Brokers', 'Admin'] : ['Home', 'Families'];
  const navbar = ['Broker', 'Admin'].includes(user) ? `<nav class="vitae-navbar" aria-label="${user}"><ul>${navItems.map((n, i) => `<li>${['Families', 'Issuers', 'Brokers', 'Admin'].includes(n) && user === 'Admin' ? `<button type="button" aria-expanded="false" aria-haspopup="true">${n}${icon('chevron-down', 16, 'filled')}</button>` : `<a href="#"${i === 0 ? ' aria-current="page"' : ''}>${n}</a>`}</li>`).join('')}
      <li><a href="#">Mail <span class="vitae-badge" aria-label="2 unread">2</span></a></li>${user === 'Admin' && ['dc', 'ma'].includes(client) ? '<li><a href="#">Notices</a></li>' : ''}</ul></nav>` : '';
  return `<header class="vitae-header"><div class="vitae-container vitae-header__bar">
      <div class="vitae-header__brand"><a href="#" class="vitae-header__logo" aria-label="${esc(c.name)}">${logo(client)}</a><span class="vitae-header__divider" aria-hidden="true"></span><a href="#" class="vitae-header__portal">${esc(portal)}</a></div>
      ${right}</div></header>${navbar}`;
};

export const footer = ({ client }) => {
  const c = CLIENT_INFO[client];
  const help = c.ghost
    ? [['phone', c.phone, `tel:${c.tel}`], ['mail', c.email, `mailto:${c.email}`], ['', 'Get Help', '#']].map(([i, l, h]) => `<a href="${h}" class="vitae-btn vitae-btn--ghost vitae-btn--primary">${i ? icon(i, 20, 'filled') : ''}${esc(l)}</a>`).join('')
    : c.help.map(([level, i], n) => `<a href="${n === 0 ? `tel:${c.tel}` : '#'}" class="vitae-btn vitae-btn--solid vitae-btn--${level}">${i ? icon(i, 20, 'filled') : ''}${esc(n === 0 ? c.phone : 'Get Help')}</a>`).join('');
  return `<div class="vitae-footer-wrap">${c.languages ? `<nav class="vitae-footer__lang" aria-label="Language"><div class="vitae-footer__lang-row">${icon('nav-translate', 24)}<ul><li><a href="#" lang="en" aria-current="true">English</a></li><li><a href="#" lang="es">Español</a></li><li><a href="#" lang="am">Amharic</a></li></ul></div></nav>` : ''}
    <footer class="vitae-footer"><div class="vitae-footer__content"><p class="vitae-footer__copyright">${c.copyright.length > 1 ? `<strong>${esc(c.copyright[0])}</strong><br>${esc(c.copyright[1])}` : esc(c.copyright[0])}</p><div class="vitae-footer__help">${help}</div></div></footer></div>`;
};

export const crumbs = (depth) => {
  const all = ['Application', 'Household', 'Income', 'Job income'];
  const items = depth === 'Collapsed' ? ['Application', '…', 'Income', 'Job income'] : all.slice(4 - Number(depth));
  return `<nav aria-label="Breadcrumb"><ol class="vitae-breadcrumbs">${items.map((t, i) => i === items.length - 1
    ? `<li class="vitae-breadcrumbs__item" aria-current="page">${esc(t)}</li>`
    : t === '…' ? `<li class="vitae-breadcrumbs__item"><button type="button" class="vitae-breadcrumbs__more" aria-label="Show all levels" aria-expanded="false">…</button></li>`
      : `<li class="vitae-breadcrumbs__item"><a href="#">${esc(t)}</a></li>`).join('')}</ol></nav>`;
};

export const backLink = (label = 'Back to Income', state = 'rest') => `<nav aria-label="Breadcrumb"><a href="#" class="vitae-back-link${state !== 'rest' ? ` is-${state}` : ''}">${icon('arrow-left', 20, 'filled')}${esc(label)}</a></nav>`;

export const pagination = (type, current = 5, total = 32, summary = true) => {
  // First, last and the pages either side of the current one, with an ellipsis for each gap.
  const nums = [...new Set([1, current - 1, current, current + 1, total])].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const pages = nums.flatMap((p, i) => (i && p - nums[i - 1] > 1 ? ['…', p] : [p]));
  const sum = summary ? `<p class="vitae-pagination__summary" aria-live="polite">Showing ${(current - 1) * 10 + 1}–${current * 10} of 312 results</p>` : '';
  if (type === 'compact') {
    return `<nav class="vitae-pagination vitae-pagination--compact" aria-label="Pagination">${sum}<div class="vitae-pagination__controls">
      <a ${current === 1 ? 'role="link" aria-disabled="true"' : 'href="#"'} class="vitae-page" aria-label="Previous page">${icon('chevron-left', 20, 'filled')}</a>
      <label class="vitae-pagination__select">Page <select class="vitae-input vitae-select" aria-label="Page, ${current} of ${total}" style="background-image:none">${Array.from({ length: total }, (_, i) => `<option${i + 1 === current ? ' selected' : ''}>${i + 1}</option>`).join('')}</select> of ${total}</label>
      <a ${current === total ? 'role="link" aria-disabled="true"' : 'href="#"'} class="vitae-page" aria-label="Next page">${icon('chevron-right', 20, 'filled')}</a></div></nav>`;
  }
  return `<nav class="vitae-pagination vitae-pagination--full" aria-label="Pagination">${sum}<ul>
    <li>${button({ label: 'Previous', style: 'ghost', iconLeft: 'chevron-left' }).replace('<button type="button"', current === 1 ? '<a role="link" aria-disabled="true"' : '<a href="#"').replace('</button>', '</a>')}</li>
    ${pages.map((p) => `<li>${p === '…' ? '<span class="vitae-page__ellipsis" aria-hidden="true">…</span>' : `<a href="#" class="vitae-page" aria-label="Page ${p}${p === current ? ', current page' : ''}"${p === current ? ' aria-current="page"' : ''}>${p}</a>`}</li>`).join('')}
    <li>${button({ label: 'Next', style: 'ghost', iconRight: 'chevron-right' }).replace('<button type="button"', current === total ? '<a role="link" aria-disabled="true"' : '<a href="#"').replace('</button>', '</a>')}</li></ul></nav>`;
};

export const tabsHtml = ({ labels, selected = 0, counts = {}, cues = '' }) => `<div class="vitae-tabs"><div class="vitae-tabs__list" role="tablist">${labels.map((l, i) => `<button type="button" role="tab" class="vitae-tab" aria-selected="${i === selected}" tabindex="${i === selected ? 0 : -1}"><span class="vitae-tab__label"><span class="vitae-tab__text" data-label="${esc(l)}">${esc(l)}</span>${counts[l] ? `<span class="vitae-tab__count">${counts[l]}<span class="vitae-visually-hidden"> new</span></span>` : ''}</span></button>`).join('')}</div>
  ${cues.includes('right') ? `<div class="vitae-tabs__cue vitae-tabs__cue--right" aria-hidden="true"><span tabindex="-1">${icon('chevron-right', 20, 'filled')}</span></div>` : ''}${cues.includes('left') ? `<div class="vitae-tabs__cue vitae-tabs__cue--left" aria-hidden="true"><span tabindex="-1">${icon('chevron-left', 20, 'filled')}</span></div>` : ''}</div>`;

export const TAB_LABELS = ['Overview', 'Household', 'Documents', 'Messages', 'Plans', 'Payments'];

export const wireTabs = (storyFn) => {
  const el = storyFn();
  setTimeout(() => document.querySelectorAll('.vitae-tabs__list').forEach((list) => {
    if (list.dataset.wired) return; list.dataset.wired = '1';
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const select = (t) => { tabs.forEach((x) => { x.setAttribute('aria-selected', String(x === t)); x.tabIndex = x === t ? 0 : -1; }); t.focus(); };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => { const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key]; if (k !== undefined) { e.preventDefault(); select(tabs[(k + tabs.length) % tabs.length]); } });
    });
  }));
  return el;
};

export const NAV_ITEMS = [['My Coverage', 'document'], ['Household', 'people-team'], ['Messages', 'mail', 3], ['Documents', 'document'], ['Payments', 'wallet'], ['Settings', 'settings']];

export const leftnav = (current = 0, icons = true) => `<nav class="vitae-leftnav" aria-label="My Account"><ul>${NAV_ITEMS.map(([l, i, b], n) => `<li><a href="#" class="vitae-leftnav__item"${n === current ? ' aria-current="page"' : ''}>${icons ? icon(i, 20, 'regular') : ''}${esc(l)}${b ? `<span class="vitae-badge">${b}<span class="vitae-visually-hidden"> unread</span></span>` : ''}</a></li>`).join('')}</ul></nav>`;

export const STEP_NAMES = ['Business Information', 'Benefits', 'Employees', 'Review and submit'];

export const steps = (current = 1, names = STEP_NAMES) => `<ol class="vitae-steps">${names.map((s, i) => {
  const status = i < current ? 'complete' : i === current ? 'current' : 'upcoming';
  const cls = [`vitae-step vitae-step--${status}`, i === 0 ? 'no-above' : '', i === names.length - 1 ? 'no-below' : '', i > current ? 'dim-above' : '', i >= current ? 'dim-below' : ''].join(' ');
  const label = status === 'complete' ? `<a href="#">${esc(s)}<span class="vitae-visually-hidden"> completed</span></a>` : esc(s);
  return `<li class="${cls}"${status === 'current' ? ' aria-current="step"' : ''}><span class="vitae-step__label">${label}</span><span class="vitae-step__marker" aria-hidden="true"><span class="vitae-step__dot"></span></span></li>`;
}).join('')}</ol>`;

// In the mobile toggle the line is decorative (the button text already says the step), so it's hidden there.
export const progressLine = (pct, flush = false, text = '') => `<div class="vitae-progress-line${flush ? ' vitae-progress-line--flush' : ''}"${flush ? ' aria-hidden="true"' : ` role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-valuetext="${esc(text)}"`}><div class="vitae-progress-line__fill" style="width:${pct}%"></div></div>`;
