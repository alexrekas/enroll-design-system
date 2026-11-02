import { canvas, figma } from '../../_shared.js';
import { alert } from '../../markup/feedback.js';

export default {
  title: 'Vitae 27/Components/Feedback/Alert',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { design: figma('94:56', 'Alert') },
};

export const Playground = {
  args: { type: 'info', title: 'Your application was submitted', message: "We'll email you when your eligibility results are ready.", link: 'View your application', dismissible: true },
  argTypes: { type: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  render: (args) => alert(args),
  parameters: { docs: { description: { story: `
Inline message about the page or a task, with a status icon (Warning is two-tone). Title and message use \`--vitae-alert-text\`.

- \`role="alert"\` for Error, \`role="status"\` for the others. Icons are \`aria-hidden\`; Dismiss is a 32×32 \`<button aria-label="Dismiss">\`.
- Move focus to an alert only when it blocks the next step (for example form errors). Don't stack two alerts of the same type.
- Appears with a fade and 4px slide over 150ms; no slide under reduced motion.` } } },
};

export const AllTypes = {
  name: 'All types',
  render: () => `<div style="display:grid;gap:16px">${[
    ['info', 'Open enrollment ends December 15', 'Choose a plan by then for coverage starting January 1.'],
    ['success', 'Your plan is selected', 'Pay your first premium to start coverage.'],
    ['warning', 'We need one more document', 'Upload proof of income by November 30 to keep your tax credit.'],
    ['error', 'There are 2 problems on this page', 'Fix the fields marked below, then continue.'],
  ].map(([type, title, message]) => alert({ type, title, message })).join('')}</div>`,
};
