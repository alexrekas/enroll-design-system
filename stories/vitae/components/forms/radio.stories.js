import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, matrix } from '../../_shared.js';
import { STATES, checkbox, wireSelection } from '../../markup/selection.js';

export default {
  title: 'Vitae 27/Components/Forms/Radio',
  tags: ['autodocs'],
  decorators: [wireSelection, canvas],
  parameters: {
    design: figma('61:137', 'Radio'),
    docs: { description: { component: `
Choose one of 2–4 options (Dropdown for more). Native inputs styled with a sibling box, so they keep keyboard, screen reader and form behaviour. Rows are 44px tall (10px top and bottom) with an 8px gap to the label; labels and descriptions wrap with the control aligned to the first line. Disabled controls have no hover or pressed state: scope hover and active styles with \`:not(:disabled)\`.

- 24px circle with a 12px dot. Always in a \`<fieldset>\` with a \`<legend>\` and a shared \`name\`; arrow keys move between options.
- **Error:** \`aria-invalid="true"\` and the message via \`aria-describedby\` on the fieldset (see Choice group).

### Rails

\`Vitae::RadioComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<fieldset>
  <legend>Does anyone in your household have health coverage through a job?</legend>
  <%= render Vitae::RadioComponent.new(label: "Yes", name: "job_coverage", value: "yes", checked: @answer == "yes") %>
  <%= render Vitae::RadioComponent.new(label: "No", name: "job_coverage", value: "no", checked: @answer == "no") %>
</fieldset>
\`\`\`` } },
  },
};

export const Playground = {
  args: { label: 'Yes', description: '', checked: 'false', state: 'rest' },
  argTypes: { checked: { control: 'inline-radio', options: ['false', 'true'] }, state: { control: 'select', options: STATES } },
  render: (args) => checkbox({ ...args, radio: true }),
};

export const Group = {
  name: 'Group',
  render: () => `<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:var(--vitae-font-weight-semibold);margin-bottom:4px">Does anyone in your household have health coverage through a job?</legend>
    ${checkbox({ radio: true, name: 'job', label: 'Yes', checked: 'true' })}${checkbox({ radio: true, name: 'job', label: 'No' })}${checkbox({ radio: true, name: 'job', label: "I'm not sure", description: "We'll ask a few questions to find out." })}</fieldset>`,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'Yes' })).toBeChecked();
    await userEvent.click(canvas.getByRole('radio', { name: 'Yes' }));
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('radio', { name: 'No' })).toBeChecked();
    await expect(canvas.getByRole('radio', { name: 'Yes' })).not.toBeChecked();
  },
};

export const AllStates = {
  name: 'All states',
  render: () => matrix(6, ['false', 'true'].flatMap((checked) => STATES.map((state) => [`${checked} · ${state}`, checkbox({ radio: true, name: `r-${checked}-${state}`, checked, state, label: 'Yes' })]))),
};
