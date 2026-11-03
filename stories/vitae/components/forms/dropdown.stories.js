import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { iconNames } from '../../icons.js';
import { STATES, field } from '../../markup/field.js';

export default {
  title: 'Vitae 27/Components/Forms/Dropdown',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    design: figma('53:782', 'Dropdown'),
    docs: { description: { component: `
Choose one option from about 5–15 (use Radio for 2–4). Shares one field anatomy with Dropdown: label (Body/Label, \`--vitae-text-secondary\`), optional required marker and info button, 44px control with a 2px border, helper text and an error message.

\`\`\`html
<div class="vitae-field">
  <label class="vitae-field__label" for="filing">Tax filing status</label>
  <div class="vitae-field__control">
    <select class="vitae-input vitae-select" id="filing"><option value="" disabled hidden selected>Select</option>…</select>
    <svg class="vitae-icon vitae-icon--trailing" aria-hidden="true">…</svg>
  </div>
</div>
\`\`\`

- A native \`<select>\` with a hidden, disabled first option as the placeholder. The open list is the operating system's own menu, so keyboard and screen reader behavior come for free.
- **Error:** \`aria-invalid="true"\` and the message linked with \`aria-describedby\`.
- For a searchable or richer list, use Search with a Menu instead.

### Rails

\`Vitae::DropdownComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::DropdownComponent.new(label: "Tax filing status", name: "household[filing_status]", value: @household.filing_status,
      options: [["Single", "single"], ["Married filing jointly", "mfj"]], required: true) %>
\`\`\`` } },
  },
  argTypes: argDocs({
    kind: ["Text input or select. In Rails use Vitae::InputComponent or Vitae::DropdownComponent.", "input", undefined, {"control": false}],
    label: ["Visible label. Always set it, even when showLabel is off, so screen readers get a name. Rails: `label:`", undefined, "string (required)"],
    placeholder: ["Text shown before a choice is made. Rails: `placeholder:`", "Select", "string"],
    value: ["Current value. Rails: `value:`", "(none)", "string"],
    helper: ["Hint under the field, linked with aria-describedby. Rails: `helper:`", "(none)", "string"],
    error: ["Error message under the field. Adds the error icon and aria-invalid. Say how to fix it. Rails: `error:`", "(none)", "string"],
    required: ["Adds the asterisk and the required attribute. Rails: `required:`", "false", "boolean"],
    info: ["Adds an info button after the label that opens more help. Rails: `info:`", "false", "boolean"],
    showLabel: ["Show the label. Turn off only when the context makes the field obvious; the label stays for screen readers. Rails: `show_label:`", "true", "boolean"],
    state: ["Preview a state. In real use hover, pressed and focus come from the browser. Error and disabled map to `error:` and `disabled: true` in Rails.", "rest"],
  }, { state: { control: 'select', options: STATES } }),
  args: { kind: 'select', label: 'Tax filing status', placeholder: 'Select', value: '', helper: '', error: '', required: true, info: false, showLabel: true, state: 'rest' },
  render: (args) => field(args),
};

export const Playground = {};

export const AllStates = {
  name: 'All states',
  render: () => matrix(3, STATES.map((state) => [state, field({ kind: 'select', state, label: 'Tax filing status', placeholder: 'Select', value: state === 'rest' ? '' : 'Single', error: state === 'error' ? 'Choose a filing status.' : '' })])),
};
