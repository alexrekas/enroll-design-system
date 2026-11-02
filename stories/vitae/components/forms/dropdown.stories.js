import { canvas, figma, matrix } from '../../_shared.js';
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
- For a searchable or richer list, use Search with a Menu instead.` } },
  },
  argTypes: { state: { control: 'select', options: STATES } },
  args: { kind: 'select', label: 'Tax filing status', placeholder: 'Select', value: '', helper: '', error: '', required: true, info: false, showLabel: true, state: 'rest' },
  render: (args) => field(args),
};

export const Playground = {};

export const AllStates = {
  name: 'All states',
  render: () => matrix(3, STATES.map((state) => [state, field({ kind: 'select', state, label: 'Tax filing status', placeholder: 'Select', value: state === 'rest' ? '' : 'Single', error: state === 'error' ? 'Choose a filing status.' : '' })])),
};
