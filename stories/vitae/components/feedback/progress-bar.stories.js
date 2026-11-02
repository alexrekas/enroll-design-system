import { canvas, figma } from '../../_shared.js';
import { progressBar } from '../../markup/upload.js';

export default {
  title: 'Vitae 27/Components/Feedback/Progress bar',
  tags: ['autodocs'],
  decorators: [canvas],
};

export const Playground = {
  args: { value: 45, label: 'Uploading… 45%', name: 'Uploading Employer_letter.pdf', showLabel: true },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
  render: (args) => `<div style="max-width:320px">${progressBar(args)}</div>`,
  parameters: {
    design: figma('398:2845', 'Progress bar'),
    docs: { description: { story: `
How far along one task is, such as a file upload. 8px track (\`--vitae-border-subtle\`) with an \`--vitae-action-primary\` fill and a 14px label below. Not for multi-step flows (use Progress).

- \`role="progressbar"\` with \`aria-valuenow\`, \`aria-valuemin="0"\`, \`aria-valuemax="100"\` and a name that says what is loading (for example the file name).
- Keep the visible label so progress isn't shown by the bar alone. Announce completion or failure once in a polite live region, not every percent.
- The fill animates linearly; no animation under reduced motion.` } },
  },
};
