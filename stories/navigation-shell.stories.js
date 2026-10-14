import { icon } from './icons.js';
import { logos, brand, navIcons, figmaSources } from './brand-assets.js';

const { FIGMA_2021, FIGMA_ME, FIGMA_DC, FIGMA_MA } = figmaSources;
const node = (file, id) => `${file}?node-id=${id.replace(':', '-')}`;

const USERS = {
  loggedOut: { portal: 'Individual & Family', name: null },
  individual: { portal: 'Individual & Family', name: 'TestAccount User', id: '1004502', icon: navIcons.userConsumer },
  employer: { portal: 'Employer', name: 'ACME, Inc.', id: '2001953', icon: navIcons.building },
  employee: { portal: 'Employee', name: 'TestAccount User', id: '2001953', icon: navIcons.userExpert },
  broker: { portal: 'Broker', name: 'Broker McCain', id: '2001953', icon: navIcons.userExpert },
  admin: { portal: 'Admin', name: 'TestAdmin User', id: '2001953', icon: navIcons.userSettings },
};
const SUBNAV = {
  broker: [{ label: 'Home', current: true }, { label: 'Families' }, { label: 'Mail', count: 2 }],
  admin: [{ label: 'Home', current: true }, { label: 'Families', menu: true }, { label: 'User Accounts' }, { label: 'Issuers' },
    { label: 'Brokers', menu: true }, { label: 'Admin', menu: true }, { label: 'Mail', count: 2 }],
};

/* Per-story Figma provenance. `status`: figma = built from this frame; adapted = built from the frame
   but restyled onto Enroll tokens; projected = no frame exists for this client/variant yet. */
const meSrc = { label: 'ME-nuharbor-1 · Navigation', url: node(FIGMA_ME, '5958:25693') };
const dcSrc = { label: 'DC - Bootstrap Upgrade · Navigation', url: node(FIGMA_DC, '5958:25693') };
const dcFooterSrc = { label: 'DC - Bootstrap Upgrade · Navigation/Footer/Desktop-0', url: node(FIGMA_DC, '15640:6530') };
const maSrc = { label: 'MA - Bootstrap Upgrade · Navigation', url: node(FIGMA_MA, '5958:25693') };
const maFooterSrc = { label: 'MA - Bootstrap Upgrade · Navigation/Footer/Desktop-1', url: node(FIGMA_MA, '823:92866') };
const CLIENT_SRC = { me: meSrc, dc: dcSrc, ma: maSrc };
const shellOf = (theme) => brand[theme].shell || {};
const ea2021 = { label: 'EA-DesignSystem-2021 · Navigation/HeaderFooter-Desktop', url: node(FIGMA_2021, '991:21766') };
const headerDesign = (extra = []) => (globals) => {
  const t = globals.theme || 'ea';
  if (CLIENT_SRC[t]) return [{ ...CLIENT_SRC[t], status: 'figma' }, ...extra];
  return [{ ...meSrc, status: 'projected', note: `No latest-Bootstrap ${t.toUpperCase()} header in Figma yet — ME anatomy with ${t.toUpperCase()} logo + brand tokens` }, { ...ea2021, status: 'reference', note: `${t.toUpperCase()} variant here is the older style` }, ...extra];
};

const header = ({ user = 'individual', subnav = true, cartCount = 0 }, theme) => {
  const sh = shellOf(theme);
  const u = { ...USERS[user] };
  if (user === 'employer' && sh.employerIcon) u.icon = navIcons[sh.employerIcon];
  if (user === 'employee' && sh.employeeIcon) u.icon = navIcons[sh.employeeIcon];
  const nav = subnav && SUBNAV[user] && [...SUBNAV[user], ...(user === 'admin' && sh.adminExtra ? sh.adminExtra : [])];
  return `
  <header class="ea-header">
    <div class="ea-header__bar"><div class="ea-shell-inner">
      <div class="ea-header__brand">
        <a class="ea-header__logo" href="#" aria-label="${brand[theme].name} home">${logos[theme]}</a>
        <span class="ea-header__divider" aria-hidden="true"></span>
        <a class="ea-header__portal" href="#">${u.portal}</a>
      </div>
      <div class="ea-header__actions">
        ${cartCount ? `<a class="ea-header__cart" href="#" aria-label="Cart, ${cartCount} plan${cartCount > 1 ? 's' : ''}">${navIcons.cartFilled}<span class="ea-header__cart-count" aria-hidden="true">${cartCount}</span></a>` : ''}
        ${u.name ? `
        <div class="ea-header__user">
          <span class="ea-header__user-icon">${u.icon}</span>
          <div>
            <p class="ea-header__user-name">${u.name}</p>
            <div class="ea-header__user-meta"><span>ID: ${u.id}</span>${sh.myPortal === false || user === 'employee' ? '' : '<a href="#">My Portal</a>'}<a href="#">Log Out</a></div>
          </div>
        </div>` : ''}
      </div>
    </div></div>
    ${nav ? `
    <nav class="ea-subnav ea-subnav--${user}" aria-label="${u.portal}">
      <ul class="ea-shell-inner">
        ${nav.map(i => `<li>${i.menu
          ? `<button type="button" aria-expanded="false" aria-haspopup="true">${i.label}${icon.chevronDown('ea-subnav__chevron')}</button>`
          : `<a href="#"${i.current ? ' aria-current="page"' : ''}>${i.label}${i.count ? ` <span class="ea-count-badge" aria-label="${i.count} unread">${i.count}</span>` : ''}</a>`}</li>`).join('')}
      </ul>
    </nav>` : ''}
  </header>`;
};

// The language row is an opt-in for later; it is off by default.
const footer = (theme, { showLanguages = false } = {}) => {
  const b = brand[theme];
  const sh = shellOf(theme);
  const tel = `tel:${b.phone.replace(/[^\d]/g, '').slice(0, 10)}`;
  if (sh.footer === 'contact') return `
  <footer class="ea-footer">
    <div class="ea-footer__body"><div class="ea-shell-inner">
      <p>${sh.copyrightLine(new Date().getFullYear())}</p>
      <div class="ea-footer__contact">
        <a class="ea-btn ea-btn--primary ea-btn--ghost" href="${tel}">${navIcons.phone}${b.phone}</a>
        <a class="ea-btn ea-btn--primary ea-btn--ghost" href="mailto:${b.email}">${navIcons.mail}${b.email}</a>
        <a class="ea-btn ea-btn--primary ea-btn--ghost" href="#">Get Help</a>
      </div>
    </div></div>
  </footer>`;
  return `
  <footer class="ea-footer">
    ${showLanguages ? `<div class="ea-footer__lang"><div class="ea-shell-inner" role="group" aria-label="Language">
      ${navIcons.translate}<span aria-current="true">English</span><a href="#" lang="es">Español</a><a href="#" lang="am">Amharic</a>
    </div></div>` : ''}
    <div class="ea-footer__body"><div class="ea-shell-inner">
      <div><p><strong>${b.copyright}</strong></p><p>All Rights Reserved.</p></div>
      <div class="ea-footer__help">
        <a class="ea-btn ea-btn--${(sh.helpLevels || ['secondary'])[0]}" href="${tel}">${navIcons.phone}${b.phone}</a>
        <a class="ea-btn ea-btn--${(sh.helpLevels || [, 'primary'])[1]}" href="#">Get Help</a>
      </div>
    </div></div>
  </footer>`;
};

const themeOf = (ctx) => ctx.globals.theme || 'ea';

export default {
  title: 'Components/Navigation/Header & Footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Global page chrome — **latest Bootstrap style only** (DC and MA production still run an older version; that older style is intentionally not modeled here).

**Source of truth:** ME-nuharbor-1 \`Navigation\` (User = Individual & Family / Broker / Admin, Logged In, Navigation), \`Navigation/Footer/Desktop-1\`, and the \`000 - Mobile\` frames. Employer (building icon) and the cart-count variant come from EA-DesignSystem-2021 \`HeaderFooter-Desktop\`. **DC** is built from **DC - Bootstrap Upgrade** \`Navigation\` and \`Navigation/Footer/Desktop-0\`: no My Portal link, an Employee user type, a retail-building Employer icon, Notices in the Admin bar, both nav bars in #00629D, and a single-row white footer with ghost contact links. **MA** is built from **MA - Bootstrap Upgrade** \`Navigation\` and \`Navigation/Footer/Desktop-1\`: Employee user type (no My Portal), consumer icon for Employer, Notices in the Admin bar, both nav bars in MA primary-100, and a #EDEBE9 footer with a 2px top rule and Primary phone / Secondary Get Help buttons. Logos and icons are exported from those files, not redrawn. **Switch the toolbar Theme** to see each client: ME, DC and MA are direct builds; EA reuses the ME anatomy with their own logo and brand tokens until their latest-Bootstrap frames exist (the source badge under each story says which).

**Anatomy:** 70px bar + 2px brand rule · logo | divider | portal link · user block (32px user-type icon, name, ID / My Portal / Log Out). Broker adds a brand-color nav bar; Admin adds a light nav bar with dropdowns. Mail count uses a 24px badge.

**Accessibility:** \`<header>\` / \`<nav aria-label>\` / \`<footer>\` landmarks; current section uses \`aria-current="page"\`; admin dropdown triggers are \`<button aria-expanded aria-haspopup>\`; the mail badge has an \`aria-label\` with the count; the optional language row (off by default; a future option) marks the active language with \`aria-current\` and each link with \`lang\`. The mobile menu button toggles \`aria-expanded\` and returns focus on Esc.`,
      },
    },
  },
  argTypes: {
    user: { control: 'select', options: Object.keys(USERS) },
    subnav: { control: 'boolean', description: 'Show the Broker/Admin navigation bar' },
    cartCount: { control: { type: 'number', min: 0, max: 9 } },
  },
  args: { user: 'individual', subnav: true, cartCount: 0 },
  render: (args, ctx) => header(args, themeOf(ctx)),
};

export const LoggedOut = { args: { user: 'loggedOut' }, parameters: { design: headerDesign() } };
export const IndividualFamily = { name: 'Individual & Family', parameters: { design: headerDesign() } };
export const IndividualWithCart = {
  name: 'Individual & Family · cart',
  args: { cartCount: 1 },
  parameters: { design: () => [{ ...ea2021, status: 'adapted', note: 'Cart Full=True variant; cart restyled onto the latest anatomy' }, { ...meSrc, status: 'figma' }] },
};
export const Employer = {
  args: { user: 'employer' },
  parameters: { design: () => [{ ...ea2021, status: 'adapted', note: 'UserType=Business (building icon) restyled onto the latest anatomy' }, { ...meSrc, status: 'figma' }] },
};
export const Employee = {
  args: { user: 'employee' },
  parameters: { design: (g) => ['dc', 'ma'].includes(g.theme || 'ea') ? [{ ...CLIENT_SRC[g.theme], status: 'figma' }] : [{ ...dcSrc, status: 'projected', note: 'Employee header exists only in the DC and MA files so far' }] },
};
export const Broker = { args: { user: 'broker' }, parameters: { design: headerDesign() } };
export const Admin = { args: { user: 'admin' }, parameters: { design: headerDesign() } };

export const AllUserTypes = {
  name: 'All user types',
  parameters: { design: headerDesign() },
  render: (_, ctx) => `<div style="display:flex; flex-direction:column; gap:24px; padding:16px 0; background:var(--ea-color-surface-sunken);">
    ${(shellOf(themeOf(ctx)).userTypes || ['loggedOut', 'individual', 'employer', 'broker', 'admin']).map(u => header({ user: u, subnav: true }, themeOf(ctx))).join('')}
  </div>`,
};

export const Footer = {
  parameters: {
    design: (g) => (g.theme || 'ea') === 'dc' ? [{ ...dcFooterSrc, status: 'figma' }] : (g.theme || 'ea') === 'ma' ? [{ ...maFooterSrc, status: 'figma', note: 'Figma phone is a (000) 000-0000 placeholder; story uses the real number' }] : (g.theme || 'ea') === 'me'
      ? [{ label: 'ME-nuharbor-1 · Navigation/Footer/Desktop-1', url: node(FIGMA_ME, '823:92866'), status: 'figma' }]
      : [{ label: 'ME-nuharbor-1 · Navigation/Footer/Desktop-1', url: node(FIGMA_ME, '823:92866'), status: 'projected', note: 'Client contact details from EA-DesignSystem-2021 footers' }, { ...ea2021, status: 'reference' }],
  },
  argTypes: {
    user: { table: { disable: true } },
    subnav: { table: { disable: true } },
    cartCount: { table: { disable: true } },
    showLanguages: { control: 'boolean', description: 'Language selector row above the footer body. Off by default; a future option.' },
  },
  args: { showLanguages: false },
  render: (args, ctx) => footer(themeOf(ctx), args),
};

/* ---------- Mobile ---------- */
const mobileShell = (theme, { open = false, user = 'individual' } = {}) => {
  const b = brand[theme]; const u = USERS[user];
  const root = document.createElement('div');
  root.className = 'ea-mobile-frame';
  root.innerHTML = `
    <header class="ea-header ea-header--mobile">
      <div class="ea-header__bar"><div class="ea-shell-inner">
        <a class="ea-header__logo" href="#" aria-label="${b.name} home">${logos[theme]}</a>
        <button type="button" class="ea-header__menu" aria-expanded="${open}" aria-controls="ea-drawer" aria-label="${open ? 'Close menu' : 'Open menu'}">${open ? icon.dismiss() : navIcons.menu}</button>
      </div></div>
    </header>
    <div class="ea-drawer-scrim" ${open ? '' : 'hidden'}>
      <nav class="ea-drawer" id="ea-drawer" aria-label="Main">
        <div><p class="ea-drawer__market">${b.tagline}</p><p class="ea-drawer__portal">${u.portal}</p></div>
        ${u.name ? `<div class="ea-header__user"><span class="ea-header__user-icon">${u.icon}</span><div><p class="ea-header__user-name">${u.name}</p><div class="ea-header__user-meta"><span>ID: ${u.id}</span></div></div></div>` : ''}
        <ul>
          <li><a href="#">Home</a></li>
          <li><button type="button" aria-expanded="false" aria-controls="ea-drawer-portals">${icon.chevronDown()}My Portal</button>
            <div class="ea-drawer__sub" id="ea-drawer-portals" hidden><p>You can move between your insured employer broker accounts using this My Portals link</p><a href="#">My Insured Portal</a><br><a href="#">Broker McCain</a></div></li>
          <li><a href="#">Help</a></li>
        </ul>
        <hr>
        <a class="ea-btn ea-btn--primary ea-btn--outline" href="tel:${b.phone.replace(/[^\d]/g, '').slice(0, 10)}">${navIcons.phone}Call Customer Service</a>
        <button type="button" class="ea-btn ea-btn--destructive ea-btn--outline">Logout</button>
      </nav>
    </div>
    <div style="padding:24px; min-height:${open ? 520 : 360}px; font-family:var(--ea-font-family-brand);">
      <h1 style="margin:0 0 8px; font-size:36px; line-height:1.25;">Welcome to ${b.name},</h1>
      <p style="margin:0; font-size:20px; font-weight:600;">${b.tagline}</p>
    </div>
    <footer class="ea-footer ea-footer--mobile"><div class="ea-footer__body"><div class="ea-shell-inner" style="padding:0 15px; width:auto;">
      <p><strong>Get Help</strong></p><p>${b.phone}</p><p><a href="mailto:${b.email}">${b.email}</a></p>
      <div class="ea-footer__copy"><p><strong>© ${new Date().getFullYear()} ${b.copyright}</strong></p><p>All Rights Reserved.</p></div>
    </div></div></footer>`;
  const btn = root.querySelector('.ea-header__menu');
  const scrim = root.querySelector('.ea-drawer-scrim');
  const set = (o) => { btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); btn.innerHTML = o ? icon.dismiss() : navIcons.menu; scrim.hidden = !o; if (o) root.querySelector('.ea-drawer a, .ea-drawer button').focus(); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  scrim.addEventListener('click', (e) => { if (e.target === scrim) { set(false); btn.focus(); } });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !scrim.hidden) { set(false); btn.focus(); } });
  const sub = root.querySelector('[aria-controls="ea-drawer-portals"]');
  sub.addEventListener('click', () => { const o = sub.getAttribute('aria-expanded') !== 'true'; sub.setAttribute('aria-expanded', o); root.querySelector('#ea-drawer-portals').hidden = !o; });
  return root;
};
const mobileDesign = (g) => {
  const src = { label: 'ME-nuharbor-1 · 000 - Mobile', url: node(FIGMA_ME, '790:64426') };
  return (g.theme || 'ea') === 'me' ? [{ ...src, status: 'figma' }] : [{ ...src, status: 'projected', note: 'Only the Maine mobile frames exist so far' }];
};

export const MobileClosed = {
  name: 'Mobile · menu closed',
  parameters: { layout: 'padded', design: mobileDesign },
  render: (_, ctx) => mobileShell(themeOf(ctx)),
};
export const MobileOpen = {
  name: 'Mobile · menu open',
  parameters: { layout: 'padded', design: mobileDesign },
  render: (_, ctx) => mobileShell(themeOf(ctx), { open: true }),
};

/* ---------- LeftNav (unchanged this pass) ---------- */
export const LeftNav = {
  parameters: { layout: 'padded', design: [{ label: 'EA-DesignSystem-2021 · Navigation/LeftNav', url: node(FIGMA_2021, '1087:14842'), status: 'reference', note: 'Not yet re-verified against Figma' }] },
  argTypes: { type: { control: 'select', options: ['Individual', 'Employee', 'Employer'] }, user: { table: { disable: true } }, subnav: { table: { disable: true } }, cartCount: { table: { disable: true } } },
  args: { type: 'Individual' },
  render: ({ type }) => {
    const items = {
      Individual: ['Home', 'My Household', 'Documents', 'Messages'],
      Employee: ['Home', 'My Household', 'Documents', 'My Experts', 'Cost Savings', 'Messages'],
      Employer: ['Home', 'Business Info', 'Employees', 'Benefits', 'Experts', 'Documents', 'Billing', 'Messages'],
    }[type];
    return `<nav class="ea-left-nav" aria-label="Section">${items.map(i => `<a href="#">${i}</a>`).join('')}</nav>`;
  },
};
