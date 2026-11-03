import { canvas, figma } from '../../_shared.js';
import { table, wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Layout and data/Table',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::TableComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::TableComponent.new(caption: "Employees", selectable: true,
      columns: [{ label: "Name", sort: :ascending, pinned: true }, { label: "Status" }, { label: "Premium", numeric: true },
                { label: "Actions", hidden: true, numeric: true }],
      rows: @employees.map { |e| { label: e.name, selected: @selected.include?(e.id),
        cells: [link_to(e.name, e, class: "vitae-link"), render(Vitae::TagComponent.new(label: e.status, type: :success)),
                number_to_currency(e.premium), link_to("View", e, class: "vitae-link")] } }) do |table| %>
  <% table.with_bulk_actions do %>
    <%= render Vitae::ButtonComponent.new(label: "Send reminder", style: :outline) %>
    <%= render Vitae::ButtonComponent.new(label: "Export", style: :ghost) %>
  <% end %>
<% end %>
\`\`\`` } } },
};

export const Playground = {
  args: { layout: 'grid', bulk: true, width: '' },
  argTypes: { layout: { control: 'inline-radio', options: ['grid', 'summary'] }, width: { control: 'inline-radio', options: ['', '560', '375'] } },
  render: (args) => table({ ...args, selected: args.layout === 'grid' ? [1] : [] }),
  parameters: {
    design: [figma('255:2897', 'Table'), figma('190:47', 'Table/Header cell'), figma('190:88', 'Table/Cell')],
    docs: { description: { story: `
**Data grid** (admin, broker): select-all header checkbox, row checkboxes, sortable headers, a link to the record, status tags, right-aligned numbers, a row action and the bulk bar. **Summary** (plan details, payment history): read-only. Set **width** to 560 or 375 to see it scroll sideways with the pinned first column.

- A real \`<table>\` with a caption (can be visually hidden), inside a scroll container with \`tabindex="0"\`, \`role="region"\` and an \`aria-label\`.
- Columns never squeeze or wrap: the first column stretches, the rest keep their width, and the table scrolls sideways. Pin the checkbox + Name with \`position: sticky\` and show its edge shadow only while scrolled.
- Select all is labelled "Select all rows" (visually hidden), \`indeterminate\` with \`aria-checked="mixed"\` when some rows are checked; it selects the current page (offer "Select all 312" in the bulk bar).
- Sortable headers: a button inside \`<th scope="col">\`; \`aria-sort\` on the sorted column only (arrow in \`--vitae-icon-brand\`).
- Numbers use tabular figures. Row hover only when the row is clickable or selectable.` } },
  },
};
