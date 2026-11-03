import { figma } from '../_shared.js';
import { adminTable } from '../markup/templates.js';
import { TEMPLATE_DECORATORS, frame, widthArg, clientOf } from './_template.js';

export default {
  title: 'Vitae 27/Templates/Admin table',
  tags: ['autodocs'],
  decorators: TEMPLATE_DECORATORS,
  parameters: {
    layout: 'fullscreen',
    design: [{ label: 'Composed from Vitae 27 components', status: 'projected', note: 'Figma page template to follow after review' }, figma('116:382', 'Header/Nav bar'), figma('255:2706', 'Table')],
    docs: { description: { component: `
A list page for admins and brokers (Families, signed in as Priya Raman).

- **Shell:** Header with the Admin nav bar, full-width content (no left nav).
- **Page header:** h1 with the total count as the lead, and the page's main action on the right (Add family).
- **Toolbar:** Search on the left (grows), filters on the right. Filters apply right away and update the count.
- **Table:** row selection with the bulk-action bar, sortable columns, a link on the name. It scrolls sideways on narrow screens instead of squeezing columns.
- **Pagination** under the table: full controls from 560px, the compact version below.` } },
  },
};

export const Page = {
  ...widthArg,
  render: ({ width }, { globals }) => frame(adminTable({ client: clientOf(globals) }), width),
};

export const Phone = {
  name: 'Phone (375)',
  render: (args, { globals }) => frame(adminTable({ client: clientOf(globals) }), 'Phone'),
};
