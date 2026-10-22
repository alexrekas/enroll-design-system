import { canvas, figma, esc } from './_shared.js';
import { icon } from './icons.js';

// Fictional people for mockups (Figma: Sample users page, 329:3). Phone numbers use 555-01xx,
// emails use example.com, IDs are placeholders. Full personas for user flows come later.
const ADDRESS = {
  dc: '1420 Example St NW, Washington, DC 20009',
  ma: '25 Sample Rd, Worcester, MA 01602',
  me: '88 Placeholder Ln, Portland, ME 04101',
  ea: '100 Demo Ave, Springfield, ST 00000',
};

const contact = (phone, email) => `<a href="tel:+1${phone.replace(/\D/g, '')}" class="vitae-link">${esc(phone)}</a> · <a href="mailto:${email}" class="vitae-link">${esc(email)}</a>`;

const USERS = (client) => [
  { group: 'Household', icon: 'nav-user-consumer', name: 'The Bennett family (5)', facts: [
    ['Primary', 'Marcus Bennett, 41 (DOB 03/14/1985): applicant, warehouse supervisor plus weekend rideshare income'],
    ['Spouse', 'Dana Bennett, 39 (DOB 07/02/1987): part-time dental assistant'],
    ['Children', 'Ava, 16 (DOB 05/09/2010) · Leo, 11 (DOB 01/22/2015) · Mia, 4 (DOB 10/30/2021)'],
    ['Household income', '$68,400 / year (useful for tax credits; children may qualify for Medicaid or CHIP)'],
    ['Contact', contact('(202) 555-0142', 'marcus.bennett@example.com'), true],
    ['Address', ADDRESS[client]],
    ['Account ID', '1004 2381'],
    ['Helped by', 'Sofia Martinez (assister)'],
  ] },
  { group: 'Admin', icon: 'nav-user-settings', name: 'Priya Raman', facts: [
    ['Role', 'Exchange administrator (full admin permissions)'],
    ['Works on', 'Account lookups, eligibility overrides, notices, broker and assister approvals'],
    ['Contact', contact('(202) 555-0167', 'priya.raman@example.com'), true],
    ['Staff ID', 'ADM-0042'],
  ] },
  { group: 'Broker', icon: 'nav-user-expert', name: 'Gregory Hale', facts: [
    ['Agency', 'Hale Insurance Group (fictional)'],
    ['Clients', 'Broker of record for Northside Bakery & Café; 60+ individual clients'],
    ['Contact', contact('(202) 555-0118', 'greg@halegroup.example.com'), true],
    ['NPN', '0000000 (placeholder)'],
  ] },
  { group: 'Assister', icon: 'nav-user-expert', name: 'Sofia Martinez', facts: [
    ['Role', 'Certified navigator, bilingual (English and Spanish)'],
    ['Organization', 'Community Health Access Center (fictional)'],
    ['Clients', 'Helping the Bennett family with their application'],
    ['Contact', contact('(202) 555-0193', 'sofia.martinez@example.com'), true],
    ['Assister ID', 'NAV-1187'],
  ] },
  { group: 'Employer', icon: 'nav-building', name: 'Northside Bakery & Café, LLC', facts: [
    ['Contact', 'Hannah Cole, owner'],
    ['Size', '14 employees (11 full-time)'],
    ['Plan year', 'Starts 01/01/2027; employer pays 75% of employee premiums'],
    ['Broker', 'Gregory Hale, Hale Insurance Group'],
    ['Contact info', contact('(202) 555-0175', 'hannah@northsidebakery.example.com'), true],
    ['FEIN', '00-0000000 (placeholder)'],
  ] },
  { group: 'Employee', icon: 'nav-user-consumer', name: 'James Whitaker', facts: [
    ['Employer', 'Northside Bakery & Café: head baker, full-time'],
    ['Age', '34 (DOB 11/03/1992)'],
    ['Coverage', 'Enrolling himself and his spouse, Erin Whitaker (32)'],
    ['Contact', contact('(202) 555-0129', 'james.whitaker@example.com'), true],
    ['Employee ID', 'NB-0007'],
  ] },
];

export default {
  title: 'Vitae 27/Sample users',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: figma('329:3', 'Sample users'),
    docs: { description: { component: 'Fictional people for mockups, so every screen and story uses the same names and details. All names, numbers and addresses are made up: phone numbers use the 555-01xx range, emails use example.com, and IDs are placeholders. The household address follows the Theme toolbar. Full personas for user flows come later.' } },
  },
};

export const SampleUsers = {
  name: 'Sample users',
  render: (_a, { globals }) => `<style>
    .vitae-users{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:24px}
    .vitae-user{max-width:none}
    .vitae-user dl{display:grid;grid-template-columns:max-content 1fr;gap:8px 16px;margin:0}
    .vitae-user dt{color:var(--vitae-text-secondary)} .vitae-user dd{margin:0}
    @container (max-width:360px){.vitae-user dl{grid-template-columns:1fr;gap:0}.vitae-user dd{margin-bottom:8px}}
    .vitae-user__head{display:flex;align-items:center;gap:8px;margin:0 0 4px;color:var(--vitae-text-secondary);font-size:var(--vitae-font-size-14)}
    .vitae-user h3{margin:0 0 16px;font-size:var(--vitae-font-size-18);line-height:var(--vitae-font-line-height-27);color:var(--vitae-text-heading)}
  </style><div class="vitae-users">${USERS(globals.theme || 'ea').map((u) => `
    <section class="vitae-card vitae-user" style="container-type:inline-size" aria-labelledby="user-${u.group}">
      <p class="vitae-user__head">${icon(u.icon)}${esc(u.group)}</p>
      <h3 id="user-${u.group}">${esc(u.name)}</h3>
      <dl>${u.facts.map(([k, v, html]) => `<dt>${esc(k)}:</dt><dd>${html ? v : esc(v)}</dd>`).join('')}</dl>
    </section>`).join('')}</div>`,
};
