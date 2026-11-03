import { canvas, figma, argDocs } from '../../_shared.js';
import { modal } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Feedback/Modal',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::ModalComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::ModalComponent.new(type: :warning, title: "Discard your changes?",
      body: "You haven't saved the changes to your household. If you leave now, they'll be lost.",
      primary: "Discard changes", secondary_label: "Keep editing") %>
\`\`\`` } } },
};

export const Playground = {
  args: { type: 'warning', title: 'Discard your changes?', body: "You haven't saved the changes to your household. If you leave now, they'll be lost.", primary: 'Discard changes', secondaryLabel: 'Keep editing', secondary: true, close: true },
  argTypes: argDocs({
    type: ["Standard has no icon; the others add a status icon by the title. Rails: `type:`", "standard"],
    title: ["Dialog title and its accessible name. Ask the question or say the outcome (\"Discard your changes?\"). Rails: `title:`", undefined, "string (required)"],
    body: ["Explanation under the title. Rails: `body:`", "(none)", "string"],
    primary: ["Main button label. Name the action, not \"OK\". Rails: `primary:`", "Continue", "string"],
    secondaryLabel: ["Second button label. Rails: `secondary_label:`", "Cancel", "string"],
    secondary: ["Show the second button. Rails: `secondary:`", "true", "boolean"],
    close: ["Show the close (X) button in the corner. Esc closes the dialog either way. Rails: `close:`", "true", "boolean"],
  }, { type: { control: 'inline-radio', options: ['standard', 'info', 'success', 'warning', 'error'] } }),
  render: (args) => modal(args),
  parameters: {
    design: figma('112:124', 'Modal'),
    docs: { description: { story: `
Blocking dialog for a decision or important status. 560px wide (full width minus 32px on small screens), title in Heading/Dialog, Outline + Solid buttons on the right; below 600px they stack full width with the primary on top. Warning uses Destructive buttons when the action loses data.

- Prefer the native \`<dialog>\` with \`showModal()\`. \`role="dialog"\` (\`alertdialog\` for Warning/Error), \`aria-modal="true"\`, labelled by the title and described by the body.
- On open move focus inside (the least destructive action, or the title for long content); trap Tab; Esc and Close dismiss except for required decisions; return focus to the trigger.
- Label buttons with verbs ("Discard changes"), never OK/Yes. Don't stack modals. Long bodies scroll inside the dialog.
- Opens with a fade and 96%→100% scale over 240ms; fade only under reduced motion.` } },
  },
};

export const Types = {
  name: 'Types',
  render: () => `<div style="display:grid;gap:16px">${[
    ['standard', 'Submit your application?', "You can't change your answers after you submit.", 'Submit application', 'Go back'],
    ['success', 'Payment received', 'Your coverage starts January 1, 2027.', 'View coverage', ''],
    ['error', "We couldn't save your changes", 'Check your connection and try again.', 'Try again', 'Cancel'],
  ].map(([type, title, body, primary, sec]) => modal({ type, title, body, primary, secondaryLabel: sec, secondary: !!sec })).join('')}</div>`,
  parameters: { design: figma('112:124', 'Modal') },
};
