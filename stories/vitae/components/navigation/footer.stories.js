import { canvas, figma } from '../../_shared.js';
import { clientOf, footer } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Footer',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { width: 1140 },
  argTypes: { width: { control: 'inline-radio', options: [1140, 720, 375] } },
  render: ({ width }, { globals }) => `<div style="width:${width}px;max-width:100%">${footer({ client: clientOf(globals) })}</div>`,
  parameters: {
    design: figma('246:2099', 'Footer'),
    docs: { description: { story: `
One responsive footer: \`flex-wrap\`, 1140px max width, copyright left and help actions pushed right with \`margin-left: auto\`. When the help actions wrap below the copyright they align left (this story uses a container query). Below 480px the EA, MA and ME help buttons go full width. DC's contact links are ghost buttons; when stacked, pull the group back by the button padding (\`margin-inline-start: calc(-1 * var(--vitae-space-016))\`) so icons line up with the copyright. EA alone shows the language row. Every phone number is a \`tel:\` link (E.164).` } },
  },
};
