import { canvas, figma, argDocs } from '../../_shared.js';
import { datePicker } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Date picker',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::DatePickerComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::DatePickerComponent.new(label: "Date of birth", name: "dob", value: @person.dob&.strftime("%m/%d/%Y")) %>
\`\`\`` } } },
};

export const Playground = {
  args: { open: true },
  argTypes: argDocs({
    open: ["Show the calendar. People can always type the date instead. Rails: `open:`", "false", "boolean"],
  }),
  render: ({ open }) => `<div style="min-height:${open ? 420 : 120}px">${datePicker({ open })}</div>`,
  parameters: {
    design: [figma('73:6441', 'Date picker'), figma('73:21', 'Calendar'), figma('73:20', 'Calendar/Day')],
    docs: { description: { story: `
Typed MM/DD/YYYY entry with an optional calendar. Typing always works, so date of birth never needs the calendar (\`inputmode="numeric"\`, \`autocomplete="bday"\`). Keep the format hint visible. Validate on blur; impossible dates (02/30) show the error state.

- The 44×44 calendar button has \`aria-label="Choose date"\`, \`aria-haspopup="dialog"\` and \`aria-expanded\`. The calendar opens 4px below; picking a day writes the date and returns focus to the input.
- Calendar: \`role="dialog"\` with a \`role="grid"\` labelled by the month. Arrows move a day or week, PageUp/PageDown a month (Shift for a year), Home/End the week, Enter/Space selects, Esc closes.
- Days: today is a filled brand circle (\`aria-current="date"\`), selected has a brand border (\`aria-selected="true"\`), outside days are secondary, disabled days \`aria-disabled="true"\`.` } },
  },
};
