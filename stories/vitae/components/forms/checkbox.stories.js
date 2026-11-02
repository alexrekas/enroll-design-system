import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, matrix } from '../../_shared.js';
import { STATES, checkbox, wireSelection } from '../../markup/selection.js';

export default {
  title: 'Vitae 27/Components/Forms/Checkbox',
  tags: ['autodocs'],
  decorators: [wireSelection, canvas],
  parameters: {
    design: figma('58:240', 'Checkbox'),
    docs: { description: { component: `
Choose any number of options, or agree to one statement. Native inputs styled with a sibling box, so they keep keyboard, screen reader and form behaviour. Rows are 44px tall (10px top and bottom) with an 8px gap to the label; labels and descriptions wrap with the control aligned to the first line. Disabled controls have no hover or pressed state: scope hover and active styles with \`:not(:disabled)\`.

- 24px box, 2px border, radius 4. Checked and indeterminate use \`--vitae-action-primary\`. Hover on an unchecked box previews a faint checkmark.
- **Indeterminate** is set in JS (\`input.indeterminate = true\`) and announces "mixed". Use it only for a "select all" that controls a group.
- **Error:** \`aria-invalid="true"\` and the message via \`aria-describedby\`. For a group, use Choice group so the error belongs to the question.` } },
  },
};

export const Playground = {
  args: { label: 'Bronze', description: '', checked: 'false', state: 'rest', error: '' },
  argTypes: { checked: { control: 'inline-radio', options: ['false', 'true', 'indeterminate'] }, state: { control: 'select', options: STATES } },
  render: (args) => checkbox(args),
  play: async ({ canvasElement, step }) => {
    const box = within(canvasElement).getByRole('checkbox', { name: 'Bronze' });
    await expect(box).not.toBeChecked();
    await userEvent.click(within(canvasElement).getByText('Bronze'));
    await expect(box).toBeChecked();
  },
};

export const AllStates = {
  name: 'All states',
  render: () => matrix(6, ['false', 'true', 'indeterminate'].flatMap((checked) => STATES.map((state) => [`${checked} · ${state}`, checkbox({ checked, state, label: 'Silver' })]))),
};
