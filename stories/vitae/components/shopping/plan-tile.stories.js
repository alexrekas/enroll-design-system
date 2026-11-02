import { canvas, figma } from '../../_shared.js';
import { PLANS } from '../../data.js';
import { clientOf, planTile, wireShopping } from '../../markup/shopping.js';

export default {
  title: 'Vitae 27/Components/Plan shopping/Plan tile',
  tags: ['autodocs'],
  decorators: [wireShopping, canvas],
};

export const Playground = {
  args: { context: 'shopping', compare: false, current: false, program: true, width: '' },
  argTypes: { context: { control: 'inline-radio', options: ['shopping', 'employer', 'enrolled'] }, width: { control: 'inline-radio', options: ['', '720', '375'] } },
  render: (args, { globals }) => planTile({ ...args, client: clientOf(globals) }),
  parameters: {
    design: [figma('235:2596', 'Plan tile'), figma('208:12', 'Plan tile/Fact')],
    docs: { description: { story: `
Full-width plan list item. **Shopping**: compare checkbox, premium, key costs, Select plan. **Employer shopping**: premium split into what the employee and employer pay. **Enrolled**: product header and an Actions menu. Switch **Theme** for each client's network label and program tag; set **width** to see it reflow.

- Reflows with \`flex-wrap\`: the name wraps under the logo, the premium under the plan, the fact columns stack below about 620px, and the button drops below the links. Under 480px (container query): 16px side padding, full-width button, smaller premium.
- Facts are \`<dl>\` lists (\`dt\` label with its colon, \`dd\` value) on a 28px row grid; the label column is 132px.
- **Compare=On**: 2px \`--vitae-action-primary\` border, header bar on \`--vitae-nav-item-selected\`, checkbox relabelled "Added to compare". Up to 3 plans; a fourth shows an inline message on that tile instead of disabling the others.
- Carrier logos are images with the carrier name as alt text.` } },
  },
};

export const CompareAndLimit = {
  name: 'Compare and limit',
  render: (_a, { globals }) => `<div style="display:grid;gap:24px">${planTile({ client: clientOf(globals), compare: true, plan: PLANS[1], program: false })}${planTile({ client: clientOf(globals), plan: PLANS[2], program: false, limit: true })}${planTile({ client: clientOf(globals), context: 'enrolled', current: true, program: false })}</div>`,
  parameters: { design: figma('235:2596', 'Plan tile') },
};
