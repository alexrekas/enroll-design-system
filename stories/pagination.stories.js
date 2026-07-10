import { icon } from './icons.js';

const arrow = (dir, disabled) => `
  <button class="ea-pagination__arrow" ${disabled ? 'disabled' : ''} aria-label="${dir === 'left' ? 'Previous page' : 'Next page'}">
    ${dir === 'left' ? icon.chevronLeftCircle() : icon.chevronRightCircle()}
  </button>`;

export default {
  title: 'Components/Navigation/Pagination',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Page-through control for tables and lists, showing current position and total.

**Accessibility:** arrow controls are native \`<button>\` elements with \`aria-label="Previous page"\` / \`aria-label="Next page"\`. Disabled arrows use the native \`disabled\` attribute, correctly removing them from the tab order.

**Do:** disable (don't hide) the arrow at either end.
**Don't:** hide the arrow entirely — that shifts layout and removes a predictable landmark.`,
      },
    },
  },
  argTypes: {
    page: { control: 'number' },
    total: { control: 'number' },
  },
  args: { page: 1, total: 3 },
  render: ({ page, total }) => `
    <div class="ea-pagination">
      ${arrow('left', page <= 1)}
      <span class="ea-pagination__label">Page</span>
      <span class="ea-pagination__box">${page}</span>
      <span class="ea-pagination__label">of <span class="ea-pagination__total">${total}</span></span>
      ${arrow('right', page >= total)}
    </div>`,
};

export const Start = { args: { page: 1 } };
export const Middle = { args: { page: 2 } };
export const End = { args: { page: 3 } };
