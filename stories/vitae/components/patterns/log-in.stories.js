import { expect, userEvent, within } from 'storybook/test';
import { canvas, esc, figma } from '../../_shared.js';
import { LOGIN_CLIENT, SCREEN_NAMES, clientOf, loginCard, loginLayout, officialBanner, wireLogin } from '../../markup/login.js';

export default {
  title: 'Vitae 27/Components/Patterns/Log-in',
  tags: ['autodocs'],
  decorators: [wireLogin, canvas],
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
- Logos: render both the color and white logo and switch with \`[data-mode="dark"]\` (logo/show-color, logo/show-white), or swap the file server-side by mode. Never invert or filter the color logo, except MA, whose white logo is a white mask of the same artwork.` } },
  },
};

export const Card = {
  args: { screen: 'Sign in' },
  argTypes: { screen: { control: 'select', options: SCREEN_NAMES } },
  render: (args, { globals }) => `<div style="background:var(--vitae-background-page);padding:32px 16px">${loginCard({ client: clientOf(globals), ...args })}</div>`,
  parameters: { docs: { description: { story: 'Pick a screen with the control. The client logo, help phone and DC system notice follow the Theme toolbar.' } } },
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const canvas = within(canvasElement);
    const password = canvasElement.querySelector('input[autocomplete="current-password"]');
    await step('Show and Hide switch the password field', async () => {
      await expect(password).toHaveAttribute('type', 'password');
      await userEvent.click(canvas.getByRole('button', { name: /Show password/ }));
      await expect(password).toHaveAttribute('type', 'text');
      await expect(canvas.getByRole('button', { name: /Hide password/ })).toHaveAttribute('aria-pressed', 'true');
    });
  },
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
  name: 'Layout at 375px',
  render: (_a, { globals }) => `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">${['centered', 'split'].map((l) => `<div style="width:375px;border:1px dashed var(--vitae-border-subtle)">${loginLayout({ client: clientOf(globals), layout: l })}</div>`).join('')}</div>`,
};

export const OfficialBanner = {
  name: 'Official banner',
  args: { expanded: false },
  render: (args, { globals }) => {
    const client = clientOf(globals);
    return `${LOGIN_CLIENT[client].banner ? '' : `<p class="vitae-field__helper" style="margin:0 0 8px">Shown for MA only (login/show-official-banner). Previewing with ${client.toUpperCase()} text.</p>`}${officialBanner({ client, ...args })}`;
  },
  parameters: { docs: { description: { story: 'Above the header, MA only today. The 20px seal slot takes the client’s own seal artwork (placeholder here; we don’t redraw government seals). The toggle is a button with `aria-expanded` and `aria-controls`. The two explanations sit side by side and stack on phones. Full width; content max 1140px.' } } },
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const toggle = within(canvasElement).getByRole('button', { name: /how you know/i });
    const open = toggle.getAttribute('aria-expanded') === 'true';
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', String(!open));
  },
};
