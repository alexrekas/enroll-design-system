import { canvas, figma } from './_shared.js';
import { icon } from './icons.js';

const SHAPES = [
  ['Button', 'Buttons and the back link', '<button type="button" class="vitae-btn vitae-btn--solid vitae-btn--primary is-focus">Continue</button>', 'brand/radius/focus-ring (button radius + 4)'],
  ['Text', 'Links and inline text', '<a href="#" class="vitae-link is-focus">View plan details</a>', '4px'],
  ['Round', 'Pills, chips and icon buttons', `<button type="button" class="vitae-ring-demo vitae-ring-demo--round" aria-label="Close">${icon('close', 20, 'filled')}</button>`, 'Fully round'],
  ['Field', 'Inputs, dropdowns and search', '<input class="vitae-input is-focus" aria-label="Annual income" placeholder="$0" style="max-width:280px">', 'Field radius + 4'],
  ['Card', 'Selectable cards and plan tiles', '<div class="vitae-ring-demo vitae-ring-demo--card" tabindex="0">Selectable card</div>', 'brand/radius/card-focus-ring (card radius + 4)'],
];

export default {
  title: 'Vitae 27/Components/Focus ring',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: figma('42:6', 'Focus ring'),
    docs: { description: { component: `
The focus indicator shared by every interactive component: a 2px dashed \`border/focus-ring\`, drawn 2px outside the element.

\`\`\`css
:focus-visible { outline: 2px dashed var(--vitae-border-focus-ring); outline-offset: 2px; }
\`\`\`

The browser follows the element's corner radius, so the ring is the element radius + 4 (the Figma shapes show this). Show it on \`:focus-visible\` only, so a mouse click doesn't draw it. Text fields show the active border on any focus and add the ring only for keyboard focus. Never remove an outline without replacing it. The ring contrasts at least 3:1 with the page in every client and mode (WCAG 2.4.7, 1.4.11).` } },
  },
};

export const Shapes = {
  render: () => `<style>
    .vitae-ring-demo{display:inline-flex;align-items:center;justify-content:center;background:var(--vitae-card-surface);border:1px solid var(--vitae-border-subtle);color:var(--vitae-text-body);font:inherit;outline:2px dashed var(--vitae-border-focus-ring);outline-offset:2px}
    .vitae-ring-demo--round{width:44px;height:44px;border-radius:50%;padding:0;cursor:pointer}
    .vitae-ring-demo--card{width:240px;height:96px;border-radius:var(--vitae-brand-radius-card)}
    .vitae-ring-row{display:grid;grid-template-columns:120px 1fr 1fr;gap:24px;align-items:center;padding:16px 0;border-bottom:1px solid var(--vitae-border-subtle)}
    @media (max-width:640px){.vitae-ring-row{grid-template-columns:1fr}}
    .vitae-ring-row p{margin:0;font-size:var(--vitae-font-size-14);line-height:var(--vitae-font-line-height-20);color:var(--vitae-text-secondary)}
  </style>${SHAPES.map(([shape, use, el, radius]) => `<div class="vitae-ring-row"><strong>${shape}</strong><div>${el}</div><p>${use}<br>Radius: ${radius}</p></div>`).join('')}`,
  parameters: { docs: { description: { story: 'Each shape shown in its focused state. Use the Theme and Mode toolbar controls to check the ring in every client.' } } },
};

export const TryIt = {
  name: 'Try it with the keyboard',
  render: () => `<p style="margin:0 0 16px">Click in the frame, then press Tab. The ring only shows for keyboard focus.</p>
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
      <button type="button" class="vitae-btn vitae-btn--solid vitae-btn--primary">Continue</button>
      <button type="button" class="vitae-btn vitae-btn--outline vitae-btn--primary">Save and exit</button>
      <a href="#" class="vitae-link">View plan details</a>
      <input class="vitae-input" aria-label="Annual income" placeholder="$0" style="max-width:200px">
    </div>`,
};
