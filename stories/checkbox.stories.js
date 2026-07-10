const checkIcon = `<svg class="ea-checkbox__check" viewBox="0 0 14 11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5.5L5 9.5L13 1.5"/></svg>`;

export default {
  title: 'Components/Checkbox',
  argTypes: {
    checked: { control: 'select', options: ['unchecked', 'partial', 'checked'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { checked: 'unchecked', disabled: false, label: 'Label' },
  render: ({ checked, disabled, label }) => `
    <div class="ea-checkbox-row">
      <button class="ea-checkbox" role="checkbox" aria-checked="${checked === 'partial' ? 'mixed' : checked === 'checked'}" ${disabled ? 'disabled' : ''}>
        ${checked === 'checked' ? checkIcon : checked === 'partial' ? '<span class="ea-checkbox__dash"></span>' : ''}
      </button>
      <span class="ea-checkbox-label">${label}</span>
    </div>`,
};

export const Unchecked = {};
export const Partial = { args: { checked: 'partial' } };
export const Checked = { args: { checked: 'checked' } };
export const Disabled = { args: { disabled: true } };

export const AllStates = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${['unchecked', 'partial', 'checked'].map(c => `
        <div class="ea-checkbox-row">
          <button class="ea-checkbox" role="checkbox" aria-checked="${c === 'partial' ? 'mixed' : c === 'checked'}">
            ${c === 'checked' ? checkIcon : c === 'partial' ? '<span class="ea-checkbox__dash"></span>' : ''}
          </button>
          <span class="ea-checkbox-label">${c[0].toUpperCase() + c.slice(1)}</span>
        </div>`).join('')}
      <div class="ea-checkbox-row">
        <button class="ea-checkbox" role="checkbox" aria-checked="false" disabled></button>
        <span class="ea-checkbox-label">Disabled</span>
      </div>
    </div>`,
};
