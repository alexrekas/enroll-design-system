import { icon } from './icons.js';

const PLACEMENTS = ['top', 'bottom', 'left', 'right', 'none'];
let uid = 0;

/** Interactive tooltip: shows on hover and keyboard focus, hides on blur/mouseleave/Esc. */
const mount = ({ text, placement, triggerLabel }) => {
  const id = `ea-tip-${uid++}`;
  const root = document.createElement('span');
  root.className = 'ea-tooltip-anchor';
  root.innerHTML = `
    <button type="button" class="ea-field__info" aria-describedby="${id}" aria-label="${triggerLabel}">${icon.info()}</button>
    <span class="ea-tooltip ea-tooltip--${placement}" role="tooltip" id="${id}" data-interactive>${text}</span>`;
  const show = () => root.classList.add('is-open');
  const hide = () => root.classList.remove('is-open');
  root.addEventListener('mouseenter', show);
  root.addEventListener('mouseleave', hide);
  root.addEventListener('focusin', show);
  root.addEventListener('focusout', hide);
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  return root;
};

const staticTip = (placement, text = 'Tooltip') => `
  <span class="ea-tooltip-anchor" style="width:96px; height:24px; justify-content:center; color:var(--ea-color-text-secondary); font-size:14px;">${placement}
    <span class="ea-tooltip ea-tooltip--${placement}" role="tooltip"${placement === 'none' ? ' style="top:calc(100% + 10px); left:50%; translate:-50% 0;"' : ''}>${text}</span>
  </span>`;

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Short, non-essential help text attached to a control (most often the info icon in an input label). Source: **Vitae → Tooltip** (Beak = None / Top / Bottom / Left / Right).

**Note:** Vitae's Tooltip page is still the stock Fluent 2 component (Segoe UI). It's mapped here onto Enroll tokens: brand font, 12/16 caption, white surface, 4px radius, 240px max width, Fluent Shadow 08.

**Placement:** the modifier names where the tooltip sits relative to its trigger; the beak points back at it.

**Accessibility:** the trigger is a focusable \`<button>\` with \`aria-describedby\` → \`role="tooltip"\`. Show on hover **and** keyboard focus; hide on blur, mouse-out and Esc (WCAG 1.4.13). Never put links or other interactive content inside a tooltip — use a popover or the Modal instead.

**Do:** keep it to one sentence of supplementary info.
**Don't:** put information the user needs to complete the task only in a tooltip.`,
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'inline-radio', options: PLACEMENTS },
    triggerLabel: { control: 'text' },
  },
  args: { text: 'Count everyone you claim on your federal tax return.', placement: 'top', triggerLabel: 'About household size' },
  render: (args) => {
    const wrap = document.createElement('div');
    wrap.style.padding = '72px 160px';
    wrap.append(mount(args));
    return wrap;
  },
};

export const Interactive = {};

export const Placements = {
  name: 'All placements (static)',
  render: () => `<div style="display:flex; gap:120px; padding:64px 120px; align-items:center; flex-wrap:wrap;">${PLACEMENTS.map(p => staticTip(p)).join('')}</div>`,
};

export const InLabel = {
  name: 'Pattern: info icon in an input label',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.paddingTop = '72px';
    wrap.innerHTML = `
      <div class="ea-field">
        <span class="ea-field__label-row"><label class="ea-field__label" for="hh">Household size</label><span class="ea-field__required" aria-hidden="true">*</span></span>
        <span class="ea-input-wrap"><input id="hh" class="ea-input" placeholder="1" inputmode="numeric" required></span>
      </div>`;
    wrap.querySelector('.ea-field__label-row').append(mount({ text: 'Count everyone you claim on your federal tax return.', placement: 'top', triggerLabel: 'About household size' }));
    return wrap;
  },
};
