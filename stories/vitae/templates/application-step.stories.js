import { figma } from '../_shared.js';
import { applicationStep } from '../markup/templates.js';
import { TEMPLATE_DECORATORS, frame, widthArg, clientOf } from './_template.js';

export default {
  title: 'Vitae 27/Templates/Application step',
  tags: ['autodocs'],
  decorators: TEMPLATE_DECORATORS,
  parameters: {
    layout: 'fullscreen',
    design: [{ label: 'Composed from Vitae 27 components', status: 'projected', note: 'Figma page template to follow after review' }, figma('161:205', 'Progress'), figma('159:996', 'Progress line')],
    docs: { description: { component: `
One step of a multi-step application (Income, step 2 of 4).

- **Side column:** the Progress card (flow title, progress line, steps) with Save &amp; Exit and Get Help. Under 768px it becomes the Mobile nav toggle with a flush progress line: "Step 2 of 4: Income".
- **Content:** Back link, h1 naming the person ("Income for Marcus Bennett"), one short lead, then the questions. Group related fields in a Field-set; ask yes/no questions with an inline Choice group.
- **Form width:** 720px max, so lines stay readable and paired fields stay side by side.
- **Actions:** Back (outline, a link) on the left and Save and continue (solid, submit) on the right, under a divider. On phones they stack full width with the main action on top.
- **Errors:** after submit, show an error Alert at the top that names the number of problems, and an error on each field. Move focus to the alert.` } },
  },
};

export const Page = {
  ...widthArg,
  args: { ...widthArg.args, error: false },
  argTypes: { ...widthArg.argTypes, error: { description: 'Show the page after a submit with a missing amount: an error Alert at the top and an error on the field.', table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } } } },
  render: ({ width, error }, { globals }) => frame(applicationStep({ client: clientOf(globals), error }), width),
};

export const WithError = {
  name: 'With an error',
  render: (args, { globals }) => frame(applicationStep({ client: clientOf(globals), error: true }), 'Desktop'),
};

export const Phone = {
  name: 'Phone (375)',
  render: (args, { globals }) => frame(applicationStep({ client: clientOf(globals) }), 'Phone'),
};
