import { icon } from './icons.js';

let uid = 0;
const item = (title, body, expanded) => {
  const id = `ea-acc-${uid++}`;
  return `
  <div class="ea-accordion__item">
    <h3 class="ea-accordion__heading">
      <button type="button" class="ea-accordion__trigger" aria-expanded="${expanded}" aria-controls="${id}-panel" id="${id}-btn">
        <span class="ea-accordion__icon-slot">${expanded ? icon.chevronCollapse('ea-accordion__icon') : icon.chevronExpand('ea-accordion__icon')}</span>
        <span>${title}</span>
      </button>
    </h3>
    <div class="ea-accordion__panel" id="${id}-panel" role="region" aria-labelledby="${id}-btn" ${expanded ? '' : 'hidden'}>${body}</div>
  </div>`;
};

/** Wires toggle behavior. Returns a DOM node so Storybook keeps the listeners. */
const mount = (html, { single = false } = {}) => {
  const root = document.createElement('div');
  root.innerHTML = html;
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.ea-accordion__trigger');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    if (single && open) {
      root.querySelectorAll('.ea-accordion__trigger[aria-expanded="true"]').forEach(b => b !== btn && set(b, false));
    }
    set(btn, open);
  });
  function set(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.ea-accordion__icon-slot').innerHTML = open ? icon.chevronCollapse('ea-accordion__icon') : icon.chevronExpand('ea-accordion__icon');
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }
  return root;
};

const FAQ = [
  ['What counts as household income?', 'Include wages, self-employment income, Social Security, unemployment, and alimony received before 2019. Do not include child support or SSI.'],
  ['When does my coverage start?', 'If you enroll by the 15th, coverage starts on the 1st of the next month. After the 15th, it starts the 1st of the month after that.'],
  ['Can I change plans later?', 'Only during Open Enrollment, or within 60 days of a qualifying life event such as moving, marriage, or the birth of a child.'],
];

export default {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Accordion",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1219-44450"
      }
    ],
    docs: {
      description: {
        component: `Expandable section for progressive disclosure (FAQs, plan details, optional form sections). Source: **Vitae → Accordion** (Expanded = False/True; content slot).

**Anatomy:** 1px input-rest border, 8px radius, 12px padding · 20px expand/collapse chevron + Bold 16/20 title · divider + content slot when expanded.

**Accessibility:** APG accordion pattern — each title is a \`<button aria-expanded aria-controls>\` inside a heading; the panel is \`role="region"\` labelled by its button and uses \`hidden\` when collapsed. Enter/Space toggle natively. Focus shows the Vitae dashed ring.

**Do:** keep titles as questions or short nouns; allow multiple open by default.
**Don't:** hide required form fields or errors inside a collapsed panel.`,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    expanded: { control: 'boolean' },
  },
  args: { title: 'What counts as household income?', expanded: false },
  render: ({ title, expanded }) => mount(`<div class="ea-accordion">${item(title, FAQ[0][1], expanded)}</div>`),
};

export const Collapsed = {};
export const Expanded = { args: { expanded: true } };

export const Group = {
  name: 'Group (multiple open)',
  render: () => mount(`<div class="ea-accordion">${FAQ.map(([t, b], i) => item(t, b, i === 0)).join('')}</div>`),
};

export const SingleOpen = {
  name: 'Group (one open at a time)',
  render: () => mount(`<div class="ea-accordion">${FAQ.map(([t, b], i) => item(t, b, i === 0)).join('')}</div>`, { single: true }),
};
