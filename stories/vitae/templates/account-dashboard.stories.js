import { figma } from '../_shared.js';
import { dashboard } from '../markup/templates.js';
import { TEMPLATE_DECORATORS, frame, widthArg, clientOf } from './_template.js';

export default {
  title: 'Vitae 27/Templates/Account dashboard',
  tags: ['autodocs'],
  decorators: TEMPLATE_DECORATORS,
  parameters: {
    layout: 'fullscreen',
    design: [{ label: 'Composed from Vitae 27 components', status: 'projected', note: 'Figma page template to follow after review' }, figma('117:721', 'Header'), figma('145:149', 'Left nav')],
    docs: { description: { component: `
Home page for a signed-in Individual & Family account (Marcus Bennett). Change **Theme** and **Mode** in the toolbar for each client, and **width** to see the phone layout.

- **Shell:** skip link, Header, left nav (256px) and content in the 1140px container, Footer. Under 768px: phone header, and the left nav becomes the Mobile nav toggle above the content.
- **Order:** page title (h1) and lead, then anything that needs action (a warning Alert, not dismissible), then Your coverage (cards), To do (a Verification), Messages.
- **Headings:** h1 page, h2 sections, h3 cards and verifications. Section links ("All documents") sit on the right of the h2.
- **Cards** stretch to fill the grid (\`vitae-card--fill\`) and wrap to one column under about 680px.` } },
  },
};

export const Page = {
  ...widthArg,
  render: ({ width }, { globals }) => frame(dashboard({ client: clientOf(globals) }), width),
};

export const Phone = {
  name: 'Phone (375)',
  render: (args, { globals }) => frame(dashboard({ client: clientOf(globals) }), 'Phone'),
};
