const arrow = (dir, disabled) => `
  <button class="ea-pagination__arrow" ${disabled ? 'disabled' : ''} aria-label="${dir === 'left' ? 'Previous page' : 'Next page'}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10.5"/>
      <path d="${dir === 'left' ? 'M15 4L7 12L15 20' : 'M9 4L17 12L9 20'}" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>`;

export default {
  title: 'Components/Navigation/Pagination',
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
