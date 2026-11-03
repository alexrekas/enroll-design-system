import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { link } from '../../markup/link.js';

export default {
  title: 'Vitae 27/Components/Actions/Link',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    design: figma('42:2307', 'Link'),
    docs: { description: { component: `
**Inline** links sit in running text and are always underlined (the link color alone is under 3:1 against body text). **Standalone** links sit on their own line in SemiBold, underline on hover, with an optional trailing icon: Arrow Right by default, External Link when the link leaves the site.

\`<a class="vitae-link">\` / \`<a class="vitae-link vitae-link--standalone">\`

Colors: \`--vitae-text-link\`, \`-hover\`, \`-active\`. Hover and pressed thicken the underline. Focus: dashed ring, 2px outside.

### Rails

\`Vitae::LinkComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::LinkComponent.new(label: "Learn how plan levels work", href: help_levels_path) %>
<%= render Vitae::LinkComponent.new(label: "View plan details", href: plan_path(plan), standalone: true) %>
<%= render Vitae::LinkComponent.new(label: "IRS Form 1095-A", href: irs_url, standalone: true, icon: "external-link") %>
\`\`\`` } },
  },
  argTypes: argDocs({
    label: ["Link text. Say where it goes; avoid \"click here\". Rails: `label:`", undefined, "string"],
    type: ["Inline sits inside a sentence and is underlined. Standalone is on its own line, SemiBold, with an optional trailing icon. Rails: `standalone: true`", "inline"],
    state: ["Preview a state. In real use hover, pressed and focus come from the browser.", "rest"],
    trailingIcon: ["Icon after a standalone link: arrow-right for the next page, external-link when it opens another site. Rails: `icon:`", "arrow-right"],
  }, {
    type: { control: 'inline-radio', options: ['inline', 'standalone'] },
    state: { control: 'inline-radio', options: ['rest', 'hover', 'pressed', 'focus'] },
    trailingIcon: { control: 'inline-radio', options: ['', 'arrow-right', 'external-link'] },
  }),
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
