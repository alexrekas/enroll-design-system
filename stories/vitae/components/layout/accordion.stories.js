import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, argDocs } from '../../_shared.js';
import { accordion, wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Layout and data/Accordion',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::AccordionComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::AccordionComponent.new(style: :bordered) do |accordion| %>
  <% accordion.with_item(title: "Household", summary: "5 people", open: true) do %>
    <p>Marcus Bennett (41), Dana Bennett (39), Ava (16), Leo (11) and Mia (4).</p>
    <%= render Vitae::LinkComponent.new(label: "Edit household", href: edit_household_path, standalone: true) %>
  <% end %>
  <% accordion.with_item(title: "Income", summary: "$68,400 / year") do %>…<% end %>
<% end %>
\`\`\`` } } },
};

export const Playground = {
  args: { style: 'divided', expandAll: true },
  argTypes: argDocs({
    style: ["Divided: rules between sections. Bordered: each section in its own box. Rails: `style:`", "divided"],
    expandAll: ["Show the Expand all / Collapse all button. Rails: `expand_all:`", "true", "boolean"],
  }, { style: { control: 'inline-radio', options: ['divided', 'bordered'] } }),
  render: ({ style, expandAll }) => `<div style="max-width:720px">${accordion(style, [0], expandAll)}</div>`,
  parameters: {
    design: [figma('188:180', 'Accordion'), figma('188:90', 'Accordion/Item')],
    docs: { description: { story: `
Sections open independently; click a header here to toggle it. 56px headers with an optional summary (a price, "3 filters applied"). **Divided** for FAQs, plan details and filters; **Bordered** wraps the rows in one card for review pages.

- The header is a \`<button aria-expanded aria-controls>\` inside a heading (h2–h4 to fit the page outline); the panel is a region labelled by the button.
- On review pages put "Edit" links in the panel, never in the header, so the header stays one button.
- Opens over 150ms with the entrance easing; no motion under reduced motion.` } },
  },
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const canvas = within(canvasElement);
    const income = canvas.getByRole('button', { name: /Income/ });
    await step('A closed section opens and its panel shows', async () => {
      await expect(income).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(income);
      await expect(income).toHaveAttribute('aria-expanded', 'true');
      await expect(canvasElement.querySelector(`#${income.getAttribute('aria-controls')}`)).toBeVisible();
    });
    await step('Sections open independently and close again', async () => {
      await expect(canvas.getByRole('button', { name: /Household/ })).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(income);
      await expect(income).toHaveAttribute('aria-expanded', 'false');
    });
  },
};
