import { canvas, figma, esc } from './_shared.js';
import { logoColor, logoWhite } from './logos.js';

const NAMES = { ea: 'Enroll App', dc: 'DC Health Link', ma: 'Massachusetts Health Connector', me: 'CoverME.gov' };

export default {
  title: 'Vitae 27/Logos',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: [figma('115:12316', 'Logo/EA'), figma('121:1244', 'Logo/EA white'), figma('265:38213', 'Log-in/Logo')],
    docs: { description: { component: `
Client logos in color (light mode) and white (dark mode). Components pick the version with the \`logo/show-color\` and \`logo/show-white\` tokens; in code, render both and switch with \`[data-mode="dark"]\`, or serve the right file per mode.

- Use only these two versions; don't redraw a logo or make other color variations. The white logos are the same artwork with every fill set to white (MA's is a white mask of its PNG), which is how this preview builds them.
- Every logo needs a text alternative (the client name). When the logo is a link home, put the name on the link.
- Heights: header EA 32, DC 35, MA 35, ME 48; sign-in card 32 (MA 40, because its artwork carries a tagline).` } },
  },
};

const tile = (client, mode, html, label) => `<div style="flex:1 1 260px;display:flex;flex-direction:column;gap:8px">
  <div data-client="${client}" data-mode="${mode}" style="display:flex;align-items:center;justify-content:center;height:120px;padding:16px;border-radius:var(--vitae-brand-radius-card);border:1px solid var(--vitae-border-subtle);background:var(--vitae-background-page)" class="vitae-logo-tile">${html}</div>
  <span style="font-size:var(--vitae-font-size-14);color:var(--vitae-text-secondary)">${esc(label)}</span></div>`;

export const AllClients = {
  name: 'All clients',
  render: () => `<style>.vitae-logo-tile svg,.vitae-logo-tile img{height:40px;width:auto}.vitae-logo-tile .ea-logo-lockup{display:inline-flex;align-items:center;gap:4px}</style>
    ${Object.keys(NAMES).map((c) => `<h3 style="margin:24px 0 12px">${esc(NAMES[c])}</h3><div style="display:flex;flex-wrap:wrap;gap:16px">
      ${tile(c, 'light', logoColor(c), 'Color · light mode')}${tile(c, 'dark', logoWhite(c), 'White · dark mode')}</div>`).join('')}`,
};
