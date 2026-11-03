import { canvas, figma, matrix } from '../../_shared.js';
import { menu } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Layout and data/Menu',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::MenuComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::MenuComponent.new(label: "Plan", entries: [
      { group: "Gold", items: [{ label: "Kaiser Permanente Gold 0/20", secondary: "$468.30 per month", icon: "health", state: :selected }] },
      :divider,
      { label: "Kaiser Permanente DC Silver 2500/40 HMO", secondary: "$389.15 per month", icon: "health" }]) %>
\`\`\`` } } },
};

export const Examples = {
  render: () => matrix(2, [
    ['Item states', menu({ label: 'Plan', entries: [['Rest', 'rest'], ['Hover', 'hover'], ['Highlighted (keyboard)', 'highlighted'], ['Selected', 'selected'], ['Disabled', 'disabled']].map(([label, state]) => ({ label, state })) })],
    ['Groups, secondary text and icons', menu({ label: 'Plan', entries: [
      { group: 'Gold', items: [{ label: 'CareFirst BlueChoice HMO Gold $0', secondary: '$442.07 per month', lead: 'health' }, { label: 'Kaiser Permanente Gold 0/20', secondary: '$468.30 per month', lead: 'health', state: 'selected' }] },
      'divider',
      { group: 'Silver', items: [{ label: 'Kaiser Permanente DC Silver 2500/40 HMO', secondary: '$389.15 per month', lead: 'health' }] },
    ] })],
  ]),
  parameters: {
    design: [figma('86:50', 'Menu'), figma('86:43', 'Menu/Item')],
    docs: { description: { story: `
Floating list used by the custom Dropdown, Search suggestions and header menus. Same width as its trigger, 4px below it (flips above when there's no room), max 320px tall then scrolls. Items are 40px; **Highlighted** (keyboard, via \`aria-activedescendant\`) adds a dashed ring inside the item; **Selected** shows a check.

- \`role="listbox"\` / \`option\` for Dropdown and Search; \`role="menu"\` / \`menuitem\` for action menus.
- Groups: wrap each group's options in \`<ul role="group" aria-labelledby="…">\` whose first item is the heading (\`role="presentation"\`), so the heading is announced with its options. Dividers are \`role="none"\`.
- ↑/↓ move (wrapping), Home/End, Enter selects, Esc closes and returns focus to the trigger, typing jumps to matches.` } },
  },
};
