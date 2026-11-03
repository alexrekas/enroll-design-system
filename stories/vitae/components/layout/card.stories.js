import { canvas, figma, matrix } from '../../_shared.js';
import { card, wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Layout and data/Card',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::CardComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::CardComponent.new(title: "Health coverage", body: "Marcus, Dana, Ava, Leo and Mia are covered through December 31, 2027.") do |card| %>
  <% card.with_tag { render Vitae::TagComponent.new(label: "Enrolled", type: :success) } %>
  <% card.with_footer { render Vitae::ButtonComponent.new(label: "View details", style: :outline) } %>
<% end %>

<%= render Vitae::CardComponent.new(type: :radio, name: "payment_plan", value: "monthly", title: "Monthly payment",
      body: "Pay $412.88 on the 1st of each month.", checked: @plan == "monthly") %>
\`\`\`` } } },
};

export const Playground = {
  args: { type: 'static', state: 'rest', title: 'Health coverage', withTag: true, footer: true },
  argTypes: { type: { control: 'inline-radio', options: ['static', 'radio', 'checkbox'] }, state: { control: 'select', options: ['rest', 'hover', 'pressed', 'focus', 'selected', 'error', 'disabled'] } },
  render: (args) => card(args),
  parameters: {
    design: figma('183:349', 'Card'),
    docs: { description: { story: `
\`--vitae-card-surface\`, 1px \`--vitae-border-subtle\`, Elevation 8, card radius, 24px padding, 16px between sections. **Static** cards hold a title, optional tag, content and an optional footer with actions.

**Radio / Checkbox** cards are selectable: the whole card is the \`<label>\` for a real input, so it behaves like the form control. Selected: 2px \`--vitae-action-primary\` border on \`--vitae-nav-item-selected\`. Keep one interactive target per selectable card (no buttons inside). Use sparingly: most Enroll pages are forms, not card grids.` } },
  },
};

export const SelectableStates = {
  name: 'Selectable states',
  render: () => matrix(3, ['rest', 'hover', 'pressed', 'focus', 'selected', 'error', 'disabled'].map((s) => [s, card({ type: 'radio', state: s, title: 'Monthly payment', body: 'Pay $412.88 on the 1st of each month.', name: `c-${s}` })])),
  parameters: { design: figma('183:349', 'Card') },
};
