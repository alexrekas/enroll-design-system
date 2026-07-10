import { icon } from './icons.js';

export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Compact status/category label. Default variant is neutral; status variants (info/success/warning/error) communicate state.

**Accessibility:** dismissible tags' remove button has \`aria-label="Remove"\` — in a real implementation this should include the tag's own label (e.g. \`aria-label="Remove Gold plan"\`) so screen reader users know which tag they're removing when multiple are present.

**Do:** reserve the Warning tag's gold color for its intended status meaning.
**Don't:** reuse the gold Warning color as a generic "featured" accent — it's aliased to the Metal/Gold plan-tier color, not a general warning color.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['default', 'info', 'success', 'warning', 'error'] },
    label: { control: 'text' },
  },
  args: { type: 'default', label: 'Tag' },
  render: ({ type, label }) => {
    if (type === 'default') {
      return `<span class="ea-tag">${label}
        <button class="ea-tag__dismiss" aria-label="Remove ${label}">${icon.dismiss()}</button>
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
      <span class="ea-tag">Tag <button class="ea-tag__dismiss" aria-label="Remove Tag">${icon.dismiss()}</button></span>
      <span class="ea-tag ea-tag--info"><span class="ea-tag__dot"></span>Info</span>
      <span class="ea-tag ea-tag--success"><span class="ea-tag__dot"></span>Success</span>
      <span class="ea-tag ea-tag--warning"><span class="ea-tag__dot"></span>Warning</span>
      <span class="ea-tag ea-tag--error"><span class="ea-tag__dot"></span>Error</span>
    </div>`,
};
