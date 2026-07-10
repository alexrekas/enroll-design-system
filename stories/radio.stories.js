export default {
  title: 'Components/Radio Button',
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { selected: false, disabled: false, label: 'Label' },
  render: ({ selected, disabled, label }) => `
    <div class="ea-radio-row">
      <button class="ea-radio" role="radio" aria-checked="${selected}" ${disabled ? 'disabled' : ''}></button>
      <span class="ea-radio-label">${label}</span>
    </div>`,
};

export const Unselected = {};
export const Selected = { args: { selected: true } };
export const Disabled = { args: { disabled: true } };

export const Group = {
  render: () => `
    <div style="display:flex; flex-direction:column; gap:4px;">
      ${['Individual', 'Employee', 'Employer'].map((label, i) => `
        <div class="ea-radio-row">
          <button class="ea-radio" role="radio" aria-checked="${i === 0}"></button>
          <span class="ea-radio-label">${label}</span>
        </div>`).join('')}
    </div>`,
};
