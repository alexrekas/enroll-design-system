import { figma } from '../_shared.js';
import { documentsPage } from '../markup/templates.js';
import { TEMPLATE_DECORATORS, frame, widthArg, clientOf } from './_template.js';

export default {
  title: 'Vitae 27/Templates/Documents',
  tags: ['autodocs'],
  decorators: TEMPLATE_DECORATORS,
  parameters: {
    layout: 'fullscreen',
    design: [{ label: 'Composed from Vitae 27 components', status: 'projected', note: 'Figma page template to follow after review' }, figma('395:660', 'Example: ME verification documents'), figma('393:20', 'Document upload')],
    docs: { description: { component: `
The account Documents page: what we still need and what's been sent.

- **Documents we need:** one Verification per item, most urgent first (Action needed, then In review, then Verified). The one being worked on opens its Upload panel in place.
- **Document history:** every file sent, newest first, with its review status. Rejected files show the reason; accepted files can't be removed.
- Same shell as the Account dashboard, with Documents selected in the left nav.` } },
  },
};

export const Page = {
  ...widthArg,
  render: ({ width }, { globals }) => frame(documentsPage({ client: clientOf(globals) }), width),
};

export const Phone = {
  name: 'Phone (375)',
  render: (args, { globals }) => frame(documentsPage({ client: clientOf(globals) }), 'Phone'),
};
