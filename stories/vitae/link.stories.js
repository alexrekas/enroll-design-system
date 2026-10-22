import { canvas, figma, esc, matrix } from './_shared.js';
import { icon } from './icons.js';

const link = ({ label = 'View plan details', type = 'inline', state = 'rest', trailingIcon = 'arrow-right' } = {}) => {
  const cls = ['vitae-link', type === 'standalone' ? 'vitae-link--standalone' : '', state !== 'rest' ? `is-${state}` : ''].join(' ').trim();
  return `<a href="#" class="${cls}">${esc(label)}${type === 'standalone' && trailingIcon ? icon(trailingIcon, 20, 'filled') : ''}</a>`;
};

export default {
  title: 'Vitae 27/Components/Link',
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: figma('42:2307', 'Link'),
    docs: { description: { component: `
**Inline** links sit in running text and are always underlined (the link color alone is under 3:1 against body text). **Standalone** links sit on their own line in SemiBold, underline on hover, with an optional trailing icon: Arrow Right by default, External Link when the link leaves the site.

\`<a class="vitae-link">\` / \`<a class="vitae-link vitae-link--standalone">\`

Colors: \`--vitae-text-link\`, \`-hover\`, \`-active\`. Hover and pressed thicken the underline. Focus: dashed ring, 2px outside.` } },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['inline', 'standalone'] },
    state: { control: 'inline-radio', options: ['rest', 'hover', 'pressed', 'focus'] },
    trailingIcon: { control: 'inline-radio', options: ['', 'arrow-right', 'external-link'] },
  },
  args: { label: 'View plan details', type: 'standalone', state: 'rest', trailingIcon: 'arrow-right' },
  render: (args) => link(args),
};

export const Playground = {};

export const InRunningText = {
  render: () => `<p style="max-width:560px">You can change your plan until December 15. ${link({ label: 'Learn how plan levels work' })} before you choose, or ${link({ label: 'call customer service' })}.</p>`,
};

export const AllStates = {
  render: () => matrix(4, ['inline', 'standalone'].flatMap((type) => ['rest', 'hover', 'pressed', 'focus'].map((state) => [`${type} · ${state}`, link({ type, state })]))),
};
