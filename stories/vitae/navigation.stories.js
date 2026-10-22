import { canvas, figma, esc, matrix } from './_shared.js';
import { icon } from './icons.js';
import { button } from './button.stories.js';
import { logo } from './logos.js';

const CLIENT = {
  ea: { name: 'Enroll App', tagline: 'Enroll App', copyright: ['Enroll App', 'All Rights Reserved.'], phone: '(000) 000-0000 / TTY 000', tel: '+10000000000', help: [['secondary', 'phone'], ['tertiary', '']], languages: true },
  dc: { name: 'DC Health Link', tagline: 'DC Health Link', copyright: ['© 2026 District of Columbia Health Link.'], phone: '(855) 532-5465 / TTY: 711', tel: '+18555325465', email: 'info@dchealthlink.com', ghost: true },
  ma: { name: 'Massachusetts Health Connector', tagline: 'MA Health Connector', copyright: ['MA Health Connector', 'All Rights Reserved.'], phone: '1-888-813-9220', tel: '+18888139220', help: [['primary', 'phone'], ['secondary', '']] },
  me: { name: 'CoverME.gov', tagline: 'CoverME.gov', copyright: ['CoverME.gov', 'All Rights Reserved.'], phone: '(866) 636-0355 / TTY 711', tel: '+18666360355', help: [['secondary', 'phone'], ['tertiary', '']] },
};
const ROLE_ICON = {
  'Individual & Family': () => 'nav-user-consumer',
  Employer: (c) => ({ ea: 'nav-building', me: 'nav-building', dc: 'nav-building-retail', ma: 'nav-user-consumer' }[c]),
  Employee: (c) => ({ dc: 'nav-user-expert', ma: 'nav-user-consumer' }[c] || 'nav-user-expert'),
  Broker: () => 'nav-user-expert',
  Admin: () => 'nav-user-settings',
};
const NAME = { 'Individual & Family': ['Marcus Bennett', '1004 2381'], Employer: ['Northside Bakery & Café', '2001953'], Employee: ['James Whitaker', 'NB-0007'], Broker: ['Gregory Hale', '2001953'], Admin: ['Priya Raman', 'ADM-0042'] };
const clientOf = (g) => g.theme || 'ea';

const header = ({ client, user = 'Individual & Family', showCart = true }) => {
  const c = CLIENT[client];
  const portal = user === 'Logged out' ? 'Individual & Family' : user;
  const myPortal = !(client === 'ma' && user === 'Employee');
  const right = user === 'Logged out' ? '' : `<div class="vitae-header__actions">
      ${user === 'Individual & Family' && showCart ? `<a href="#" class="vitae-header__cart" aria-label="Cart, 1 plan">${icon('nav-cart-filled')}<span class="vitae-badge" aria-hidden="true">1</span></a>` : ''}
      <div class="vitae-header__user">${icon(ROLE_ICON[user](client))}<div><div class="vitae-header__name">${esc(NAME[user][0])}</div>
        <div class="vitae-header__meta"><span>ID: ${esc(NAME[user][1])}</span>${myPortal ? '<a href="#">My Portal</a>' : ''}<a href="#">Log Out</a></div></div></div>
    </div>`;
  const navItems = user === 'Admin' ? ['Home', 'Families', 'User Accounts', 'Issuers', 'Brokers', 'Admin'] : ['Home', 'Families'];
  const navbar = ['Broker', 'Admin'].includes(user) ? `<nav class="vitae-navbar" aria-label="${user}"><ul>${navItems.map((n, i) => `<li>${['Families', 'Issuers', 'Brokers', 'Admin'].includes(n) && user === 'Admin' ? `<button type="button" aria-expanded="false" aria-haspopup="true">${n}${icon('chevron-down', 16, 'filled')}</button>` : `<a href="#"${i === 0 ? ' aria-current="page"' : ''}>${n}</a>`}</li>`).join('')}
      <li><a href="#">Mail <span class="vitae-badge" aria-label="2 unread">2</span></a></li>${user === 'Admin' && ['dc', 'ma'].includes(client) ? '<li><a href="#">Notices</a></li>' : ''}</ul></nav>` : '';
  return `<header class="vitae-header"><div class="vitae-container vitae-header__bar">
      <div class="vitae-header__brand"><a href="#" class="vitae-header__logo" aria-label="${esc(c.name)}">${logo(client)}</a><span class="vitae-header__divider" aria-hidden="true"></span><a href="#" class="vitae-header__portal">${esc(portal)}</a></div>
      ${right}</div></header>${navbar}`;
};

export const footer = ({ client }) => {
  const c = CLIENT[client];
  const help = c.ghost
    ? [['phone', c.phone, `tel:${c.tel}`], ['mail', c.email, `mailto:${c.email}`], ['', 'Get Help', '#']].map(([i, l, h]) => `<a href="${h}" class="vitae-btn vitae-btn--ghost vitae-btn--primary">${i ? icon(i, 20, 'filled') : ''}${esc(l)}</a>`).join('')
    : c.help.map(([level, i], n) => `<a href="${n === 0 ? `tel:${c.tel}` : '#'}" class="vitae-btn vitae-btn--solid vitae-btn--${level}">${i ? icon(i, 20, 'filled') : ''}${esc(n === 0 ? c.phone : 'Get Help')}</a>`).join('');
  return `<div class="vitae-footer-wrap">${c.languages ? `<nav class="vitae-footer__lang" aria-label="Language"><ul><li><a href="#" lang="en" aria-current="true">English</a></li><li><a href="#" lang="es">Español</a></li><li><a href="#" lang="am">Amharic</a></li></ul></nav>` : ''}
    <footer class="vitae-footer"><div class="vitae-footer__content"><p class="vitae-footer__copyright">${c.copyright.length > 1 ? `<strong>${esc(c.copyright[0])}</strong><br>${esc(c.copyright[1])}` : esc(c.copyright[0])}</p><div class="vitae-footer__help">${help}</div></div></footer></div>`;
};

export default {
  title: 'Vitae 27/Components/Navigation',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Header = {
  args: { user: 'Individual & Family', showCart: true },
  argTypes: { user: { control: 'select', options: ['Logged out', 'Individual & Family', 'Employer', 'Employee', 'Broker', 'Admin'] } },
  render: (args, { globals }) => `<div class="vitae-bleed">${header({ ...args, client: clientOf(globals) })}</div>`,
  parameters: {
    design: [figma('117:721', 'Header'), figma('116:382', 'Header/Nav bar')],
    docs: { description: { story: `
Global header, 70px bar with a 2px \`--vitae-nav-rule\` bottom border on a 1140px content width. Switch **Theme** to see each client's logo, portal label and icon choices; switch **user** for each role. Broker and Admin add the nav bar.

- \`<header>\` landmark; the logo link's accessible name is the client name; the portal label is a link.
- Nav bar: \`<nav aria-label="Broker">\` / \`"Admin"\`; dropdown items are \`<button aria-expanded aria-haspopup>\`; current page has \`aria-current="page"\`; the Mail count reads "2 unread".
- The cart link's name includes the count ("Cart, 1 plan").
- Below 768px use the mobile header.
- Logos: render both the color and white logo and switch with \`[data-mode="dark"]\` (logo/show-color, logo/show-white), or swap the file server-side by mode. Never invert or filter the color logo, except MA, whose white logo is a white mask of the same artwork.` } },
  },
};

export const HeaderAllRoles = {
  name: 'Header · every role',
  render: (_a, { globals }) => `<div class="vitae-bleed" style="display:grid;gap:24px">${['Logged out', 'Individual & Family', 'Employer', 'Employee', 'Broker', 'Admin'].filter((u) => !(u === 'Employee' && ['ea', 'me'].includes(clientOf(globals)))).map((u) => `<div><div class="vitae-demo-label" style="padding:0 16px 4px">${u}</div>${header({ client: clientOf(globals), user: u })}</div>`).join('')}</div>`,
  parameters: { design: figma('117:721', 'Header') },
};

export const MobileHeader = {
  name: 'Header · mobile',
  args: { open: true, user: 'Individual & Family' },
  argTypes: { user: { control: 'select', options: ['Individual & Family', 'Employer', 'Broker', 'Admin'] } },
  render: ({ open, user }, { globals }) => {
    const client = clientOf(globals); const c = CLIENT[client];
    return `<div style="position:relative;width:375px;height:640px;overflow:hidden;border:1px solid var(--vitae-border-subtle);background:var(--vitae-background-page)">
      <div class="vitae-mobile-header"><a href="#" class="vitae-mobile-header__logo" aria-label="${esc(c.name)}">${logo(client)}</a>
        <button type="button" class="vitae-menu-button" aria-expanded="${open}" aria-controls="drawer" aria-label="${open ? 'Close menu' : 'Open menu'}">${icon(open ? 'close' : 'menu', 24, 'regular')}</button></div>
      ${open ? `<div class="vitae-scrim"></div><nav class="vitae-drawer" id="drawer" aria-label="Main">
        <div><div class="vitae-drawer__tagline">${esc(c.tagline)}</div><div>${esc(user)}</div></div>
        <div class="vitae-drawer__user">${icon(ROLE_ICON[user](client))}<div><strong>${esc(NAME[user][0])}</strong><div class="vitae-demo-label">ID: ${esc(NAME[user][1])}</div></div></div>
        <ul><li><a href="#">Home</a></li><li><button type="button" aria-expanded="false">My Portal${icon('chevron-down', 20, 'filled')}</button></li><li><a href="#">Help</a></li><li><a href="#">Log Out</a></li></ul>
        <hr><a href="tel:${c.tel}" class="vitae-btn vitae-btn--outline vitae-btn--primary">${icon('phone', 20, 'filled')}Call Customer Service</a></nav>` : ''}</div>`;
  },
  parameters: {
    design: [figma('119:718', 'Header/Mobile'), figma('119:499', 'Header/Mobile drawer')],
    docs: { description: { story: 'Below 768px: 71px bar, logo and a 44×44 menu button (`aria-expanded`, `aria-controls`, "Open menu" / "Close menu"). The drawer is 260px, slides in from the right over 240ms (no slide under reduced motion), moves focus in, and closes on Esc or a scrim click, returning focus to the button. The role icon matches the signed-in role. Log Out is a link, not a destructive button. Every phone number is a `tel:` link.' } },
  },
};

export const Footer = {
  args: { width: 1140 },
  argTypes: { width: { control: 'inline-radio', options: [1140, 720, 375] } },
  render: ({ width }, { globals }) => `<div style="width:${width}px;max-width:100%">${footer({ client: clientOf(globals) })}</div>`,
  parameters: {
    design: figma('246:2099', 'Footer'),
    docs: { description: { story: `
One responsive footer: \`flex-wrap\`, 1140px max width, copyright left and help actions pushed right with \`margin-left: auto\`. When the help actions wrap below the copyright they align left (this story uses a container query). Below 480px the EA, MA and ME help buttons go full width. DC's contact links are ghost buttons; when stacked, pull the group back by the button padding (\`margin-inline-start: calc(-1 * var(--vitae-space-016))\`) so icons line up with the copyright. EA alone shows the language row. Every phone number is a \`tel:\` link (E.164).` } },
  },
};

const crumbs = (depth) => {
  const all = ['Application', 'Household', 'Income', 'Job income'];
  const items = depth === 'Collapsed' ? ['Application', '…', 'Income', 'Job income'] : all.slice(4 - Number(depth));
  return `<nav aria-label="Breadcrumb"><ol class="vitae-breadcrumbs">${items.map((t, i) => i === items.length - 1
    ? `<li class="vitae-breadcrumbs__item" aria-current="page">${esc(t)}</li>`
    : t === '…' ? `<li class="vitae-breadcrumbs__item"><button type="button" class="vitae-breadcrumbs__more" aria-label="Show all levels" aria-expanded="false">…</button></li>`
      : `<li class="vitae-breadcrumbs__item"><a href="#">${esc(t)}</a></li>`).join('')}</ol></nav>`;
};
const backLink = (label = 'Back to Income', state = 'rest') => `<nav aria-label="Breadcrumb"><a href="#" class="vitae-back-link${state !== 'rest' ? ` is-${state}` : ''}">${icon('arrow-left', 20, 'filled')}${esc(label)}</a></nav>`;

export const Breadcrumbs = {
  args: { depth: '3' },
  argTypes: { depth: { control: 'inline-radio', options: ['2', '3', '4', 'Collapsed'] } },
  render: ({ depth }) => crumbs(depth),
  parameters: {
    design: figma('135:101', 'Breadcrumbs'),
    docs: { description: { story: 'Where the page sits in a multi-level flow. Prior levels are links in `--vitae-text-secondary` (14/20); the current page is SemiBold text with `aria-current="page"`. Separators come from CSS (`li + li::before`) so screen readers skip them. Collapsed keeps the first level, an "…" button that expands the middle, the parent and the current page. Under 768px use Back link instead. Not for step-by-step flows (use Progress).' } },
  },
};

export const BackLink = {
  name: 'Back link',
  render: () => matrix(4, ['rest', 'hover', 'pressed', 'focus'].map((s) => [s, backLink('Back to Income', s)])),
  parameters: {
    design: figma('309:3052', 'Back link'),
    docs: { description: { story: 'A single "Back to {parent}" link, built from Link / Standalone with a leading Arrow Left. Replaces Breadcrumbs under 768px (keep the `<nav aria-label="Breadcrumb">` landmark) and works on its own, e.g. "Back to plans" on Compare. Always name the destination; link to the parent page rather than `history.back()`.' } },
  },
};

const pagination = (type, current = 5, total = 32, summary = true) => {
  const pages = [1, '…', current - 1, current, current + 1, '…', total];
  const sum = summary ? `<p class="vitae-pagination__summary" aria-live="polite">Showing ${(current - 1) * 10 + 1}–${current * 10} of 312 results</p>` : '';
  if (type === 'compact') {
    return `<nav class="vitae-pagination vitae-pagination--compact" aria-label="Pagination">${sum}<div class="vitae-pagination__controls">
      <a href="#" class="vitae-page" aria-label="Previous page">${icon('chevron-left', 20, 'filled')}</a>
      <label class="vitae-pagination__select">Page <select class="vitae-input vitae-select" aria-label="Page, ${current} of ${total}" style="background-image:none">${Array.from({ length: total }, (_, i) => `<option${i + 1 === current ? ' selected' : ''}>${i + 1}</option>`).join('')}</select> of ${total}</label>
      <a href="#" class="vitae-page" aria-label="Next page">${icon('chevron-right', 20, 'filled')}</a></div></nav>`;
  }
  return `<nav class="vitae-pagination vitae-pagination--full" aria-label="Pagination">${sum}<ul>
    <li>${button({ label: 'Previous', style: 'ghost', iconLeft: 'chevron-left' }).replace('<button type="button"', '<a href="#"').replace('</button>', '</a>')}</li>
    ${pages.map((p) => `<li>${p === '…' ? '<span class="vitae-page__ellipsis" aria-hidden="true">…</span>' : `<a href="#" class="vitae-page" aria-label="Page ${p}${p === current ? ', current page' : ''}"${p === current ? ' aria-current="page"' : ''}>${p}</a>`}</li>`).join('')}
    <li>${button({ label: 'Next', style: 'ghost', iconRight: 'chevron-right' }).replace('<button type="button"', '<a href="#"').replace('</button>', '</a>')}</li></ul></nav>`;
};

export const Pagination = {
  args: { width: 960, summary: true },
  argTypes: { width: { control: 'inline-radio', options: [960, 720, 600, 375] } },
  render: ({ width, summary }) => `<div class="vitae-pagination-wrap" style="width:${width}px;max-width:100%">${pagination('full', 5, 32, summary)}${pagination('compact', 5, 32, summary)}</div>`,
  parameters: {
    design: [figma('140:53', 'Pagination'), figma('139:247', 'Pagination/Page')],
    docs: { description: { story: `
**Full** (container 560px and wider): summary on the left, Previous / pages / Next on the right; the controls wrap below the summary when space runs out. **Compact** (under 560px): summary centered over icon-only arrows and a native "Page [5] of 32" select. This story switches between them with a container query; change **width** to see it.

- \`<nav aria-label="Pagination">\`; each page is a link with \`aria-label="Page 4"\`; the current page has \`aria-current="page"\`.
- Always show first, last, current ±1 and "…" for gaps (7 slots max). On the first or last page, keep Previous/Next in place with \`aria-disabled="true"\`.
- Announce the summary in a polite live region when results change. Tables show 10 per page.` } },
  },
};

const tabsHtml = ({ labels, selected = 0, counts = {}, cues = '' }) => `<div class="vitae-tabs"><div class="vitae-tabs__list" role="tablist">${labels.map((l, i) => `<button type="button" role="tab" class="vitae-tab" aria-selected="${i === selected}" tabindex="${i === selected ? 0 : -1}"><span class="vitae-tab__label"><span class="vitae-tab__text" data-label="${esc(l)}">${esc(l)}</span>${counts[l] ? `<span class="vitae-tab__count">${counts[l]}<span class="vitae-visually-hidden"> new</span></span>` : ''}</span></button>`).join('')}</div>
  ${cues.includes('right') ? `<div class="vitae-tabs__cue vitae-tabs__cue--right" aria-hidden="true"><span tabindex="-1">${icon('chevron-right', 20, 'filled')}</span></div>` : ''}${cues.includes('left') ? `<div class="vitae-tabs__cue vitae-tabs__cue--left" aria-hidden="true"><span tabindex="-1">${icon('chevron-left', 20, 'filled')}</span></div>` : ''}</div>`;
const TAB_LABELS = ['Overview', 'Household', 'Documents', 'Messages', 'Plans', 'Payments'];

const wireTabs = (storyFn) => {
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

export const Tabs = {
  decorators: [wireTabs],
  render: () => `<div style="display:grid;gap:32px">
    <div><div class="vitae-demo-label">Wide · all tabs fit</div>${tabsHtml({ labels: TAB_LABELS, counts: { Documents: 2 } })}</div>
    <div style="width:375px"><div class="vitae-demo-label">Narrow · scrolls sideways, cue on the right</div>${tabsHtml({ labels: TAB_LABELS, counts: { Documents: 2 }, cues: 'right' })}</div></div>`,
  parameters: {
    design: [figma('248:566', 'Tabs'), figma('175:37', 'Tabs/Item')],
    docs: { description: { story: `
Sections within a page. 44px tabs on a 1px rule; selected tab has a 4px \`--vitae-action-primary\` indicator and SemiBold label (width reserved so tabs don't shift); hover previews a 2px indicator at 40%, pressed 70%. Click a tab or use the arrow keys here.

- \`role="tablist"\` with \`role="tab"\` buttons (\`aria-selected\`, \`aria-controls\`) and \`role="tabpanel"\` content. Left/Right move, Home/End jump, only the selected tab is in the tab order. If each tab is its own URL, use a nav of links with \`aria-current="page"\` instead.
- One row that scrolls sideways (\`overflow-x: auto\`), never wraps. Show the chevron + fade cue only on the side with more tabs; chevrons are \`aria-hidden="true"\` and \`tabindex="-1"\` (pointer and touch aid only). Scroll the selected tab into view on load.
- Count pills need hidden text, e.g. "Documents, 2 new".` } },
  },
};

export const TabStates = {
  name: 'Tabs · item states',
  render: () => matrix(7, ['rest', 'hover', 'pressed', 'focus', 'selected', 'selected focus', 'disabled'].map((s) => [s, `<div class="vitae-tabs" style="border:0"><div class="vitae-tabs__list"><button type="button" role="tab" class="vitae-tab${['hover', 'pressed', 'focus'].includes(s) || s === 'selected focus' ? ` is-${s.replace('selected ', '')}` : ''}" aria-selected="${s.startsWith('selected')}"${s === 'disabled' ? ' disabled' : ''}><span class="vitae-tab__label"><span class="vitae-tab__text" data-label="Documents">Documents</span></span></button></div></div>`])),
  parameters: { design: figma('175:37', 'Tabs/Item') },
};

const NAV_ITEMS = [['My Coverage', 'document'], ['Household', 'people-team'], ['Messages', 'mail', 3], ['Documents', 'document'], ['Payments', 'wallet'], ['Settings', 'settings']];
const leftnav = (current = 0, icons = true) => `<nav class="vitae-leftnav" aria-label="My Account"><ul>${NAV_ITEMS.map(([l, i, b], n) => `<li><a href="#" class="vitae-leftnav__item"${n === current ? ' aria-current="page"' : ''}>${icons ? icon(i, 20, 'regular') : ''}${esc(l)}${b ? `<span class="vitae-badge">${b}<span class="vitae-visually-hidden"> unread</span></span>` : ''}</a></li>`).join('')}</ul></nav>`;

export const LeftNav = {
  name: 'Left nav',
  args: { icons: true },
  render: ({ icons }) => `<div style="display:flex;gap:48px;align-items:flex-start">${leftnav(0, icons)}
    <div style="width:375px"><div class="vitae-demo-label">Mobile (under 640px), open</div>
      <button type="button" class="vitae-navtoggle vitae-navtoggle--rule" aria-expanded="true" aria-controls="acct-panel"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">My Account: </span>My Coverage</span>${icon('chevron-down', 20, 'filled')}</span></button>
      <div class="vitae-navpanel" id="acct-panel"><div class="vitae-navpanel__surface">${leftnav(0, icons).replace('vitae-leftnav"', 'vitae-leftnav" style="width:100%"')}</div></div></div></div>`,
  parameters: {
    design: [figma('145:149', 'Left nav'), figma('145:43', 'Left nav/Item'), figma('154:1078', 'Mobile nav toggle')],
    docs: { description: { story: `
Account and portal sections, one level. Desktop: 256px column, 44px rows with 1px dividers; selected item has a 4px \`--vitae-action-primary\` bar, \`--vitae-nav-item-selected\` fill and SemiBold label; hover previews a 2px bar at 40%. Badges need hidden text ("Messages, 3 unread").

Under 640px the Mobile nav toggle shows the current page; tapping it opens the list as an overlay panel under the toggle with a scrim (150ms entrance). Toggle: \`<button aria-expanded aria-controls>\` with a hidden prefix ("My Account:"). Close on Esc, scrim tap or link selection and return focus to the toggle. \`<nav aria-label="My Account">\` with a list of links, current one \`aria-current="page"\`.` } },
  },
};

const STEP_NAMES = ['Business Information', 'Benefits', 'Employees', 'Review and submit'];
const steps = (current = 1) => `<ol class="vitae-steps">${STEP_NAMES.map((s, i) => {
  const status = i < current ? 'complete' : i === current ? 'current' : 'upcoming';
  const cls = [`vitae-step vitae-step--${status}`, i === 0 ? 'no-above' : '', i === STEP_NAMES.length - 1 ? 'no-below' : '', i > current ? 'dim-above' : '', i >= current ? 'dim-below' : ''].join(' ');
  const label = status === 'complete' ? `<a href="#">${esc(s)}<span class="vitae-visually-hidden"> completed</span></a>` : esc(s);
  return `<li class="${cls}"${status === 'current' ? ' aria-current="step"' : ''}><span class="vitae-step__label">${label}</span><span class="vitae-step__marker" aria-hidden="true"><span class="vitae-step__dot"></span></span></li>`;
}).join('')}</ol>`;
const progressLine = (pct, flush = false) => `<div class="vitae-progress-line${flush ? ' vitae-progress-line--flush' : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-valuetext="Step 2 of 4"><div class="vitae-progress-line__fill" style="width:${pct}%"></div></div>`;

export const Progress = {
  args: { current: 1 },
  argTypes: { current: { control: { type: 'range', min: 0, max: 3 } } },
  render: ({ current }) => `<div style="display:flex;gap:48px;align-items:flex-start">
    <nav class="vitae-progress" aria-label="Progress"><div class="vitae-progress__card"><h3 class="vitae-progress__title">Create New Employer</h3>${progressLine(Math.round(((current + 0.5) / 4) * 100))}${steps(current)}</div>
      <div class="vitae-progress__links"><a href="#" class="vitae-link vitae-link--standalone">Save &amp; Exit</a><a href="#" class="vitae-link vitae-link--standalone">Get Help</a><a href="#" class="vitae-link vitae-link--standalone">Return Home</a></div></nav>
    <div style="width:375px"><div class="vitae-demo-label">Mobile (under 640px)</div>
      <button type="button" class="vitae-navtoggle" aria-expanded="false"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">Create New Employer, </span>Step ${current + 1} of 4: ${esc(STEP_NAMES[current])}</span>${icon('chevron-down', 20, 'filled')}</span>${progressLine(Math.round(((current + 0.5) / 4) * 100), true)}</button></div></div>`,
  parameters: {
    design: [figma('161:205', 'Progress'), figma('161:68', 'Progress/Step'), figma('159:996', 'Progress line')],
    docs: { description: { story: `
Multi-step flows. Desktop: 280px card with the flow title, a progress line and the step list; links below. Switch **Theme** to see the client difference: EA, MA and ME use gapped connectors and an open ring for the current step; DC uses continuous connectors and a center dot (\`progress.connector-*\`, \`progress.current-center-dot\`).

- Steps the person has reached (Complete, Visited) are links; Current and Upcoming are not. Current has \`aria-current="step"\`; completed steps get hidden text "completed".
- \`<nav aria-label="Progress">\` with an \`<ol>\`. The progress line is a \`progressbar\` with \`aria-valuetext="Step 2 of 4"\` (round the width to a whole percent).
- Under 640px the Mobile nav toggle shows "Step 2 of 4: Business Information" over a flush progress line and opens the same content as an overlay panel.` } },
  },
};
