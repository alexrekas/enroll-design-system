export default {
  title: 'Components/Tag',
  argTypes: {
    type: { control: 'select', options: ['default', 'info', 'success', 'warning', 'error'] },
    label: { control: 'text' },
  },
  args: { type: 'default', label: 'Tag' },
  render: ({ type, label }) => {
    if (type === 'default') {
      return `<span class="ea-tag">${label}
        <button class="ea-tag__dismiss" aria-label="Remove"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L11 11M11 1L1 11"/></svg></button>
      </span>`;
    }
    return `<span class="ea-tag ea-tag--${type}"><span class="ea-tag__dot"></span>${label}</span>`;
  },
};

export const Default = {};
export const Info = { args: { type: 'info', label: 'Info' } };
export const Success = { args: { type: 'success', label: 'Success' } };
export const Warning = { args: { type: 'warning', label: 'Warning' } };
export const Error = { args: { type: 'error', label: 'Error' } };

export const AllTypes = {
  render: () => `
    <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
      <span class="ea-tag">Tag <button class="ea-tag__dismiss" aria-label="Remove"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L11 11M11 1L1 11"/></svg></button></span>
      <span class="ea-tag ea-tag--info"><span class="ea-tag__dot"></span>Info</span>
      <span class="ea-tag ea-tag--success"><span class="ea-tag__dot"></span>Success</span>
      <span class="ea-tag ea-tag--warning"><span class="ea-tag__dot"></span>Warning</span>
      <span class="ea-tag ea-tag--error"><span class="ea-tag__dot"></span>Error</span>
    </div>`,
};
