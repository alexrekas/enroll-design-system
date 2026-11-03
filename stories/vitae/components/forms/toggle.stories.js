import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { toggle, wireSelection } from '../../markup/selection.js';

export default {
  title: 'Vitae 27/Components/Forms/Toggle',
  tags: ['autodocs'],
  decorators: [wireSelection, canvas],
  parameters: {
    design: figma('68:75', 'Toggle'),
    docs: { description: { component: `
A setting that applies immediately. Use Checkbox when the choice is submitted later with a form.

- \`<button role="switch" aria-checked>\` with a \`<label for>\`. State shows by knob position as well as color; on hover the knob leans 6px toward the other side.
- Disabled toggles have no hover or pressed state.

### Rails

\`Vitae::ToggleComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::ToggleComponent.new(label: "Paperless notices", on: @account.paperless?) %>
\`\`\`` } },
  },
};

export const Playground = {
  args: { label: 'Email me reminders', description: 'We send a reminder 30 days before open enrollment ends.', on: false, state: 'rest' },
  argTypes: argDocs({
    label: ["What the setting controls. Rails: `label:`", undefined, "string (required)"],
    description: ["Second line under the label. Rails: `description:`", "(none)", "string"],
    on: ["On or off. Use toggles for settings that apply immediately; in forms with a Submit button use a checkbox. Rails: `on:`", "false", "boolean"],
    state: ["Preview a state. In real use hover, pressed and focus come from the browser. Disabled maps to `disabled: true` in Rails.", "rest"],
  }, { state: { control: 'inline-radio', options: ['rest', 'hover', 'focus', 'disabled'] } }),
  render: (args) => toggle(args),
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const toggle = within(canvasElement).getByRole('switch');
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard(' ');
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
  },
};

export const AllStates = {
  name: 'All states',
  render: () => matrix(4, [false, true].flatMap((on) => ['rest', 'hover', 'focus', 'disabled'].map((state) => [`${on ? 'on' : 'off'} · ${state}`, toggle({ on, state, label: 'Paperless notices' })]))),
};
