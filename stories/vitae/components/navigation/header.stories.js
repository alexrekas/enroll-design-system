import { canvas, esc, figma, argDocs } from '../../_shared.js';
import { SIGNED_IN } from '../../data.js';
import { icon } from '../../icons.js';
import { logo } from '../../logos.js';
import { CLIENT_INFO, ROLE_ICON, clientOf, header } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Header',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { user: 'Individual & Family', showCart: true },
  argTypes: argDocs({
    user: ["Who is signed in. Sets the role icon, account name and menu; Logged out shows Sign in.", "Individual & Family", "role"],
    showCart: ["Show the cart button. Plan shopping only.", "true", "boolean"],
  }, { user: { control: 'select', options: ['Logged out', 'Individual & Family', 'Employer', 'Employee', 'Broker', 'Admin'] } }),
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

export const EveryRole = {
  name: 'Every role',
  render: (_a, { globals }) => `<div class="vitae-bleed" style="display:grid;gap:24px">${['Logged out', 'Individual & Family', 'Employer', 'Employee', 'Broker', 'Admin'].filter((u) => !(u === 'Employee' && ['ea', 'me'].includes(clientOf(globals)))).map((u) => `<div><div class="vitae-demo-label" style="padding:0 16px 4px">${u}</div>${header({ client: clientOf(globals), user: u })}</div>`).join('')}</div>`,
  parameters: { design: figma('117:721', 'Header') },
};

export const Mobile = {
  name: 'Mobile',
  args: { open: true, user: 'Individual & Family' },
  argTypes: argDocs({
    open: ["Show the menu drawer open.", undefined, "boolean"],
    user: ["Who is signed in. Sets the role icon, account name and menu.", "Individual & Family", "role"],
  }, { user: { control: 'select', options: ['Individual & Family', 'Employer', 'Broker', 'Admin'] } }),
  render: ({ open, user }, { globals }) => {
    const client = clientOf(globals); const c = CLIENT_INFO[client];
    return `<div style="position:relative;width:375px;height:640px;overflow:hidden;border:1px solid var(--vitae-border-subtle);background:var(--vitae-background-page)">
      <div class="vitae-mobile-header"><a href="#" class="vitae-mobile-header__logo" aria-label="${esc(c.name)}">${logo(client)}</a>
        <button type="button" class="vitae-menu-button" aria-expanded="${open}" aria-controls="drawer" aria-label="${open ? 'Close menu' : 'Open menu'}">${icon(open ? 'close' : 'menu', 24, 'regular')}</button></div>
      ${open ? `<div class="vitae-scrim"></div><nav class="vitae-drawer" id="drawer" aria-label="Main">
        <div><div class="vitae-drawer__tagline">${esc(c.tagline)}</div><div>${esc(user)}</div></div>
        <div class="vitae-drawer__user">${icon(ROLE_ICON[user](client))}<div><strong>${esc(SIGNED_IN[user][0])}</strong><div class="vitae-demo-label">ID: ${esc(SIGNED_IN[user][1])}</div></div></div>
        <ul><li><a href="#">Home</a></li><li><button type="button" aria-expanded="false">My Portal${icon('chevron-down', 20, 'filled')}</button></li><li><a href="#">Help</a></li><li><a href="#">Log Out</a></li></ul>
        <hr><a href="tel:${c.tel}" class="vitae-btn vitae-btn--outline vitae-btn--primary">${icon('phone', 20, 'filled')}Call Customer Service</a></nav>` : ''}</div>`;
  },
  parameters: {
    design: [figma('119:718', 'Header/Mobile'), figma('119:499', 'Header/Mobile drawer')],
    docs: { description: { story: 'Below 768px: 71px bar, logo and a 44×44 menu button (`aria-expanded`, `aria-controls`, "Open menu" / "Close menu"). The drawer is 260px, slides in from the right over 240ms (no slide under reduced motion), moves focus in, and closes on Esc or a scrim click, returning focus to the button. The role icon matches the signed-in role. Log Out is a link, not a destructive button. Every phone number is a `tel:` link.' } },
  },
};
