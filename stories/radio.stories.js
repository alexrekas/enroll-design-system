export default {
  title: 'Components/Radio Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Single-select control within a mutually exclusive group (e.g. Individual / Employee / Employer).

**Accessibility:** \`role="radio"\` on each native \`<button>\`, with \`aria-checked\` per item. **Known gap:** the group wrapper does not have a \`role="radiogroup"\` container with a group-level \`aria-label\` in every story — without it, screen reader users won't hear "N of M" group context, and arrow-key navigation between options isn't implementable as currently marked up. The \`Group\` story below shows the recommended fix.

**Do:** use Radio for 2–5 mutually exclusive options.
**Don't:** use Radio for a single yes/no choice — use Toggle or Checkbox instead.`,
      },
    },
  },
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
    <div role="radiogroup" aria-label="Applicant type" style="display:flex; flex-direction:column; gap:4px;">
      ${['Individual', 'Employee', 'Employer'].map((label, i) => `
        <div class="ea-radio-row">
          <button class="ea-radio" role="radio" aria-checked="${i === 0}"></button>
          <span class="ea-radio-label">${label}</span>
        </div>`).join('')}
    </div>`,
};
