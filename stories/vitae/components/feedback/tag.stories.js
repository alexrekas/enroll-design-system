import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { tag } from '../../markup/feedback.js';

export default {
  title: 'Vitae 27/Components/Feedback/Tag',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::TagComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::TagComponent.new(label: "Approved", type: :success) %>
<%= render Vitae::TagComponent.new(label: "Draft", type: :neutral, show_icon: false) %>
\`\`\`` } }, design: figma('96:27', 'Tag') },
};

export const Playground = {
  args: { label: 'Approved', type: 'success', showIcon: true },
  argTypes: argDocs({
    label: ["Tag text. Keep the capitalization the product already uses. Rails: `label:`", undefined, "string (required)"],
    type: ["Status color (neutral to error) or a client program tag. Use client tags only on their own client. Rails: `type:`", "success", "status or client tag"],
    showIcon: ["Show the leading icon. Keep it on status tags so the meaning doesn’t rely on color. Rails: `show_icon:`", "true", "boolean"],
  }, { type: { control: 'select', options: ['neutral', 'brand', 'info', 'success', 'warning', 'error', 'current-plan', 'dc-healthy', 'dc-essential', 'me-clear-choice', 'me-current-plan', 'ma-premium-value'] } }),
  render: (args) => tag(args),
  parameters: { docs: { description: { story: `
Compact, non-interactive label (24px pill, Body/Button). Status types carry a 16px icon so color is never the only cue. Program tags belong to one client only: Healthy DC Plan and Essential Plan (DC), Clear Choice Plan (ME), Premium Value Plan (MA).

\`<span class="vitae-tag vitae-tag--success"><svg aria-hidden="true">…</svg>Approved</span>\`` } } },
};

export const AllTypes = {
  name: 'All types',
  render: () => matrix(6, [
    ['Neutral', tag({ type: 'neutral', label: 'Draft', showIcon: false })],
    ['Brand', tag({ type: 'brand', label: 'Brand', showIcon: false })],
    ['Info', tag({ type: 'info', label: 'In review' })],
    ['Success', tag({ type: 'success', label: 'Approved' })],
    ['Warning', tag({ type: 'warning', label: 'Action needed' })],
    ['Error', tag({ type: 'error', label: 'Denied' })],
    ['Current plan', tag({ type: 'current-plan', label: 'Current plan', showIcon: false })],
    ['DC · Healthy DC Plan', tag({ type: 'dc-healthy', label: 'Healthy DC Plan' })],
    ['DC · Essential Plan', tag({ type: 'dc-essential', label: 'Essential Plan' })],
    ['ME · Clear Choice Plan', tag({ type: 'me-clear-choice', label: 'Clear Choice Plan' })],
    ['ME · Your current plan', tag({ type: 'me-current-plan', label: 'Your current plan' })],
    ['MA · Premium Value Plan', tag({ type: 'ma-premium-value', label: 'Premium Value Plan', showIcon: false })],
  ]),
};
