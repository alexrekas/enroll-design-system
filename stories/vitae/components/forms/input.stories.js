import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { iconNames } from '../../icons.js';
import { STATES, field } from '../../markup/field.js';

export default {
  title: 'Vitae 27/Components/Forms/Input',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    design: figma('44:191', 'Input'),
    docs: { description: { component: `
Single-line text entry. Shares one field anatomy with Dropdown: label (Body/Label, \`--vitae-text-secondary\`), optional required marker and info button, 44px control with a 2px border, helper text and an error message.

\`\`\`html
<div class="vitae-field">
  <label class="vitae-field__label" for="income">Annual income</label>
  <input class="vitae-input" id="income" aria-describedby="income-help income-error">
  <p class="vitae-field__helper" id="income-help">…</p>
  <p class="vitae-field__error" id="income-error">…</p>
</div>
\`\`\`

- **Active** (clicked into or typing) changes the background and border. **Focus** adds the dashed ring only for keyboard users: browsers match \`:focus-visible\` on text fields even after a click, so set \`html.vitae-kbd\` on Tab and remove it on pointer down (this Storybook does that).
- **Error:** \`aria-invalid="true"\` and the message linked with \`aria-describedby\`.
- Leading and trailing icons are decorative (\`aria-hidden\`); the label carries the meaning.
- **Info button** is a 24×24 toggletip trigger, not a hover tooltip.

### Rails

\`Vitae::InputComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::InputComponent.new(label: "Annual income", name: "household[income]", value: @household.income,
      placeholder: "$0", helper: "Before taxes, for everyone in your household.", required: true, inputmode: "decimal",
      error: @household.errors[:income].first) %>
\`\`\`` } },
  },
  argTypes: argDocs({
    kind: ["Text input or select. In Rails use Vitae::InputComponent or Vitae::DropdownComponent.", "input", undefined, {"control": false}],
    label: ["Visible label. Always set it, even when showLabel is off, so screen readers get a name. Rails: `label:`", undefined, "string (required)"],
    placeholder: ["Example format only (\"MM/DD/YYYY\", \"$0\"). Never put instructions here; they disappear when typing. Use helper instead. Rails: `placeholder:`", "(none)", "string"],
    value: ["Current value. Rails: `value:`", "(none)", "string"],
    helper: ["Hint under the field, linked with aria-describedby. Rails: `helper:`", "(none)", "string"],
    error: ["Error message under the field. Adds the error icon and aria-invalid. Say how to fix it. Rails: `error:`", "(none)", "string"],
    required: ["Adds the asterisk and the required attribute. Rails: `required:`", "false", "boolean"],
    info: ["Adds an info button after the label that opens more help. Rails: `info:`", "false", "boolean"],
    showLabel: ["Show the label. Turn off only when the context makes the field obvious; the label stays for screen readers. Rails: `show_label:`", "true", "boolean"],
    leadingIcon: ["Fluent icon at the start of the field (20px). Rails: `leading_icon:`", "(none)", "icon name"],
    trailingIcon: ["Fluent icon at the end of the field (20px), e.g. calendar. Rails: `trailing_icon:`", "(none)", "icon name"],
    state: ["Preview a state. In real use hover, pressed and focus come from the browser. Error and disabled map to `error:` and `disabled: true` in Rails.", "rest"],
  }, {
    state: { control: 'select', options: STATES },
    leadingIcon: { control: 'select', options: ['', ...iconNames] },
    trailingIcon: { control: 'select', options: ['', ...iconNames] },
  }),
  args: { kind: 'input', label: 'Annual income', placeholder: '$0', value: '', helper: 'Before taxes, for everyone in your household.', error: '', required: true, info: true, showLabel: true, leadingIcon: '', trailingIcon: '', state: 'rest' },
  render: (args) => field(args),
};

export const Playground = {};

export const AllStates = {
  name: 'All states',
  render: () => matrix(3, STATES.map((state) => [state, field({ state, label: 'First name', placeholder: 'Placeholder text', value: state === 'disabled' ? '' : 'Marcus', error: state === 'error' ? 'Enter your first name.' : '' })])),
};

export const WithIcons = {
  render: () => matrix(2, [
    ['Leading icon', field({ label: 'Email', placeholder: 'name@example.com', leadingIcon: 'mail' })],
    ['Trailing icon', field({ label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar' })],
  ]),
};
