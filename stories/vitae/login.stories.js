import { canvas, figma, esc, id } from './_shared.js';
import { icon } from './icons.js';
import { field } from './field.stories.js';
import { checkbox } from './selection.stories.js';
import { alert } from './feedback.stories.js';
import { logos } from '../brand-assets.js';

// Values mirror the login/* client tokens in the Brand collection.
const CLIENT = {
  ea: { name: 'Enroll App', phone: '(000) 000-0000 / TTY 000', tel: '+10000000000', banner: false, notice: false, gov: ['An official website', 'Official websites use .gov', 'A .gov website belongs to an official government organization.'] },
  dc: { name: 'DC Health Link', phone: '(855) 532-5465 / TTY: 711', tel: '+18555325465', banner: false, notice: true, gov: ['An official website of the District of Columbia', 'Official websites use .dc.gov', 'A .dc.gov website belongs to an official government organization in the District of Columbia.'] },
  ma: { name: 'Massachusetts Health Connector', phone: '1-888-813-9220', tel: '+18888139220', banner: true, notice: false, gov: ['An official website of the Commonwealth of Massachusetts', 'Official websites use .mass.gov', 'A .mass.gov website belongs to an official government organization in Massachusetts.'] },
  me: { name: 'CoverME.gov', phone: '(866) 636-0355 / TTY 711', tel: '+18666360355', banner: false, notice: false, gov: ['An official website of the State of Maine', 'Official websites use .maine.gov', 'A .maine.gov website belongs to an official government organization in Maine.'] },
};
const SYSTEM_NOTICE = 'This system is the property of the District of Columbia Government. Use of this system may be monitored, recorded and subject to audit. Unauthorized use is prohibited.';
const clientOf = (g) => g.theme || 'ea';

const link = (label, href = '#') => `<a href="${href}" class="vitae-link">${esc(label)}</a>`;
const submit = (label) => `<button type="submit" class="vitae-btn vitae-btn--solid vitae-btn--primary">${esc(label)}</button>`;

// Text field with the right type and autocomplete; password fields get a Show/Hide toggle.
const input = ({ label, type = 'text', autocomplete, placeholder = '', inputmode = '', error = '' }) => {
  let html = field({ label, placeholder, required: true, error })
    .replace('<input type="text"', `<input type="${type}" autocomplete="${autocomplete}"${inputmode ? ` inputmode="${inputmode}"` : ''}`);
  if (type === 'password') {
    html = html.replace('<div class="vitae-field__control">', '<div class="vitae-field__control vitae-password">')
      .replace(/(<input [^>]*>)/, `$1<button type="button" class="vitae-password__toggle" aria-pressed="false">${icon('eye', 20, 'regular')}Show<span class="vitae-visually-hidden"> password</span></button>`);
  }
  return html;
};

const CHECKS = ['At least 12 characters', 'An uppercase and a lowercase letter', 'A number', 'A special character (for example ! @ # $)', 'Not your email or username'];
const checklist = (met) => {
  const lid = id('pw-rules');
  return `<div><p class="vitae-field__helper" id="${lid}">Your password needs:</p>
    <ul class="vitae-checklist" aria-labelledby="${lid}">${CHECKS.map((c, i) => `<li class="${i < met ? 'is-met' : ''}">${icon('success', 20, i < met ? 'filled' : 'regular')}<span>${esc(c)}<span class="vitae-visually-hidden">${i < met ? ' (met)' : ' (not yet met)'}</span></span></li>`).join('')}</ul>
    <p class="vitae-visually-hidden" aria-live="polite">${met} of ${CHECKS.length} requirements met</p></div>`;
};

const signInForm = (client) => `
  ${input({ label: 'Email or username', autocomplete: 'username', placeholder: 'name@example.com' })}
  ${input({ label: 'Password', type: 'password', autocomplete: 'current-password' })}
  ${checkbox({ label: 'Keep me signed in on this device' })}
  ${submit('Sign in')}
  <div class="vitae-login-card__links">${link('Forgot password?')}${link('Forgot username?')}</div>
  <p class="vitae-login-card__center">New here? ${link('Create an account')}</p>
  ${CLIENT[client].notice ? `<p class="vitae-login-card__notice">${esc(SYSTEM_NOTICE)}</p>` : ''}`;

const SCREENS = {
  'Sign in': (c) => ({ title: 'Sign in', body: signInForm(c) }),
  'Sign in error': (c) => ({ title: 'Sign in', top: alert({ type: 'error', title: 'That email and password don’t match our records', message: 'Check them and try again, or reset your password.', dismissible: false }), body: signInForm(c) }),
  'Lockout warning': (c) => ({ title: 'Sign in', top: alert({ type: 'warning', title: '2 attempts left', message: 'After 2 more unsuccessful attempts your account will be locked for 30 minutes. You can reset your password instead.', dismissible: false }), body: signInForm(c) }),
  'Signed out': (c) => ({ title: 'Sign in', top: alert({ type: 'info', title: 'You were signed out to protect your information', message: 'You were inactive for 20 minutes. Sign in again to continue where you left off.', dismissible: false }), body: signInForm(c) }),
  Locked: () => ({ title: 'Your account is temporarily locked', status: icon('lock', 24, 'regular'), lede: 'There were too many unsuccessful sign-in attempts. You can try again after 30 minutes (at 2:45 PM), or reset your password now.', body: `${submit('Reset password')}<p class="vitae-login-card__center">${link('Back to sign in')}</p>` }),
  'Verify code': () => ({ title: 'Enter your verification code', lede: 'We sent a 6-digit code to (•••) •••-1234. It expires in 10 minutes.', body: `
    ${input({ label: 'Verification code', autocomplete: 'one-time-code', inputmode: 'numeric', placeholder: '6-digit code' })}
    ${checkbox({ label: 'Trust this device for 30 days', description: 'Don’t select this on a shared or public computer.' })}
    ${submit('Verify')}
    <p class="vitae-login-card__center">Didn’t get a code? You can resend it in 0:45.</p>
    <div class="vitae-login-card__links"><button type="button" class="vitae-btn vitae-btn--ghost vitae-btn--primary" aria-disabled="true">Resend code</button>${link('Use a different method')}</div>` }),
  'Create account': () => ({ title: 'Create an account', body: `
    ${input({ label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'name@example.com' })}
    ${input({ label: 'Password', type: 'password', autocomplete: 'new-password' })}
    ${checklist(3)}
    ${input({ label: 'Confirm password', type: 'password', autocomplete: 'new-password' })}
    ${submit('Create account')}
    <p class="vitae-login-card__center">Already have an account? ${link('Sign in')}</p>` }),
  'Reset password': () => ({ title: 'Reset your password', lede: 'Enter the email for your account and we’ll send you a link to reset your password.', body: `
    ${input({ label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'name@example.com' })}
    ${submit('Send reset link')}<p class="vitae-login-card__center">${link('Back to sign in')}</p>` }),
  'Reset sent': () => ({ title: 'Check your email', status: icon('mail', 24, 'regular'), lede: 'If an account exists for name@example.com, we’ve sent a link to reset your password. The link expires in 60 minutes.', body: `
    <button type="button" class="vitae-btn vitae-btn--outline vitae-btn--primary">Resend email</button><p class="vitae-login-card__center">${link('Back to sign in')}</p>` }),
};

export const loginCard = ({ client = 'ea', screen = 'Sign in' } = {}) => {
  const c = CLIENT[client];
  const s = SCREENS[screen](client);
  return `<form class="vitae-login-card" novalidate aria-labelledby="login-title-${screen.replace(/\W/g, '')}">
    <div class="vitae-login-card__logo">${logos[client]}<span class="vitae-visually-hidden">${esc(c.name)}</span></div>
    ${s.status ? `<div class="vitae-login-card__status" aria-hidden="true">${s.status}</div>` : ''}
    <h1 id="login-title-${screen.replace(/\W/g, '')}">${esc(s.title)}</h1>
    ${s.lede ? `<p class="vitae-login-card__lede">${esc(s.lede)}</p>` : ''}
    ${s.top || ''}
    ${s.body}
    <p class="vitae-login-card__help">Need help? Call <a href="tel:${c.tel}" class="vitae-link">${esc(c.phone)}</a></p>
    <div class="vitae-login-card__legal">${link('Privacy policy')}${link('Terms of use')}</div>
  </form>`;
};

export const officialBanner = ({ client = 'ma', expanded = false } = {}) => {
  const [text, title, desc] = CLIENT[client].gov;
  const pid = id('gov-panel');
  return `<section class="vitae-official-banner" aria-label="Official website of the government">
    <div class="vitae-official-banner__bar"><span class="vitae-official-banner__seal" aria-hidden="true"></span><span>${esc(text)}</span>
      <button type="button" class="vitae-official-banner__toggle" aria-expanded="${expanded}" aria-controls="${pid}">Here’s how you know${icon(expanded ? 'chevron-up' : 'chevron-down', 16, 'filled')}</button></div>
    <div class="vitae-official-banner__panel" id="${pid}"${expanded ? '' : ' hidden'}>
      <div>${icon('building', 24, 'regular')}<p><strong>${esc(title)}</strong><br>${esc(desc)}</p></div>
      <div>${icon('lock', 24, 'regular')}<p><strong>Secure websites use HTTPS</strong><br>A lock or https:// means you’ve safely connected to the official website. Share sensitive information only on official, secure websites.</p></div>
    </div></section>`;
};

export const loginLayout = ({ client = 'ea', layout = 'centered', screen = 'Sign in' } = {}) => `
  <div class="vitae-login-layout vitae-login-layout--${layout}" style="background:var(--vitae-background-page)">
    ${layout === 'split' ? `<div class="vitae-login-layout__inner">${loginCard({ client, screen })}
      <aside class="vitae-login-panel" aria-labelledby="login-panel-h"><h2 id="login-panel-h">Health coverage for you and your family</h2>
        <ul><li>Compare plans and prices side by side</li><li>See if you qualify for savings on your premium</li><li>Update your information and coverage anytime</li></ul>
        <p><strong>Open enrollment</strong><br>November 1, 2026 – January 15, 2027. Sign up by December 15 for coverage that starts January 1.</p></aside></div>`
      : loginCard({ client, screen })}
  </div>`;

const wire = (storyFn) => {
  const el = storyFn();
  setTimeout(() => {
    document.querySelectorAll('.vitae-password__toggle').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => {
        const inp = b.parentElement.querySelector('input'); const show = inp.type === 'password';
        inp.type = show ? 'text' : 'password'; b.setAttribute('aria-pressed', String(show));
        b.innerHTML = `${icon(show ? 'eye-off' : 'eye', 20, 'regular')}${show ? 'Hide' : 'Show'}<span class="vitae-visually-hidden"> password</span>`;
      });
    });
    document.querySelectorAll('.vitae-official-banner__toggle').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', String(open)); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; });
    });
    document.querySelectorAll('form.vitae-login-card').forEach((f) => { f.onsubmit = (e) => e.preventDefault(); });
  });
  return el;
};

export default {
  title: 'Vitae 27/Components/Log-in',
  excludeStories: /^[a-z]/,
  decorators: [wire, canvas],
  parameters: {
    design: [figma('263:841', 'Log-in/Card'), figma('264:565', 'Log-in/Layout'), figma('265:38213', 'Log-in/Logo'), figma('270:3132', 'Log-in/Official banner')],
    docs: { description: { component: `
Sign-in and account screens for every client. One card (440px max, \`card/surface\`, \`border/subtle\`, \`brand/radius/card\`, elevation 8) that fills the width on phones; the padding drops from 32px to 24px below 480px (container query).

**Security and UX rules**
- One generic sign-in error ("That email and password don’t match our records"). Never say which field was wrong. The reset confirmation is generic too ("If an account exists…").
- Errors are inline: an alert at the top of the card plus field messages. No pop-up dialogs. Never disable the submit button; show what is missing when it is pressed.
- Warn before lockout (attempts left) and say when a locked account unlocks, with a reset path and the help phone.
- Verification code: one input, not split boxes. Say where the code went; resend with a countdown and an alternate method.
- Create account: live password checklist. Met requirements show a filled check, unmet an outline check, plus text (never color alone). Show/Hide on every password field.

**Developer notes**
- Allow paste and password managers everywhere (WCAG 2.2 SC 3.3.8). \`autocomplete\`: \`username\`, \`current-password\`, \`new-password\`, \`one-time-code\`; \`inputmode="numeric"\` on the code field. No CAPTCHA puzzles.
- Top-of-card alerts use \`role="alert"\` and take focus on a submit error; field errors use \`aria-describedby\`.
- The checklist is a list with an \`aria-live="polite"\` summary ("3 of 5 requirements met").
- "Keep me signed in" and "Trust this device" are unchecked by default.
- Session timeout: warn 2 minutes before and land on **Signed out** (WCAG 2.2.1).
- The help phone is a \`tel:\` link (\`login/help-phone-tel\`) at every width. DC alone shows the system-use notice (\`login/show-system-notice\`).
- Dark mode uses the white logos from Figma; this preview inverts the color logo as a stand-in.` } },
  },
};

const SCREEN_NAMES = Object.keys(SCREENS);

export const Card = {
  args: { screen: 'Sign in' },
  argTypes: { screen: { control: 'select', options: SCREEN_NAMES } },
  render: (args, { globals }) => `<div style="background:var(--vitae-background-page);padding:32px 16px">${loginCard({ client: clientOf(globals), ...args })}</div>`,
  parameters: { docs: { description: { story: 'Pick a screen with the control. The client logo, help phone and DC system notice follow the Theme toolbar.' } } },
};

export const AllScreens = {
  name: 'All screens',
  render: (_a, { globals }) => `<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;background:var(--vitae-background-page);padding:24px">${SCREEN_NAMES.map((s) => `<div style="flex:1 1 360px;max-width:440px"><p class="vitae-field__helper" style="margin:0 0 8px">Screen: ${esc(s)}</p>${loginCard({ client: clientOf(globals), screen: s })}</div>`).join('')}</div>`,
};

export const Layout = {
  args: { layout: 'centered', screen: 'Sign in' },
  argTypes: { layout: { control: 'inline-radio', options: ['centered', 'split'] }, screen: { control: 'select', options: SCREEN_NAMES } },
  render: (args, { globals }) => loginLayout({ client: clientOf(globals), ...args }),
  parameters: { docs: { description: { story: `Page body between the header and footer. **Centered**: card on \`background/page\`, 64px top and bottom. **Split**: card plus an info panel (\`background/brand-subtle\`), 960px max; below about 680px the panel wraps under the card. Keep the card first in the code so visual and reading order match (no CSS \`order\`). The card title is the page h1; the panel heading is h2.` } } },
};

export const LayoutPhone = {
  name: 'Layout · 375px',
  render: (_a, { globals }) => `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">${['centered', 'split'].map((l) => `<div style="width:375px;border:1px dashed var(--vitae-border-subtle)">${loginLayout({ client: clientOf(globals), layout: l })}</div>`).join('')}</div>`,
};

export const OfficialBanner = {
  name: 'Official banner',
  args: { expanded: false },
  render: (args, { globals }) => {
    const client = clientOf(globals);
    return `${CLIENT[client].banner ? '' : `<p class="vitae-field__helper" style="margin:0 0 8px">Shown for MA only (login/show-official-banner). Previewing with ${client.toUpperCase()} text.</p>`}${officialBanner({ client, ...args })}`;
  },
  parameters: { docs: { description: { story: 'Above the header, MA only today. The 20px seal slot takes the client’s own seal artwork (placeholder here; we don’t redraw government seals). The toggle is a button with `aria-expanded` and `aria-controls`. The two explanations sit side by side and stack on phones. Full width; content max 1140px.' } } },
};
