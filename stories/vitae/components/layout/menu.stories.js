import { canvas, figma, matrix } from '../../_shared.js';
import { menuGroup, menuItem } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Layout and data/Menu',
  tags: ['autodocs'],
  decorators: [canvas],
};

export const Examples = {
  render: () => matrix(2, [
    ['Item states', `<ul class="vitae-menu" role="listbox" aria-label="Plan">${[['Rest', 'rest'], ['Hover', 'hover'], ['Highlighted (keyboard)', 'highlighted'], ['Selected', 'selected'], ['Disabled', 'disabled']].map(([l, s]) => menuItem({ label: l, state: s })).join('')}</ul>`],
    ['Groups, secondary text and icons', `<ul class="vitae-menu" role="listbox" aria-label="Plan">${menuGroup('Gold', 'menu-gold', menuItem({ label: 'CareFirst BlueChoice HMO Gold $0', secondary: '$442.07 per month', lead: 'health' }) + menuItem({ label: 'Kaiser Permanente Gold 0/20', secondary: '$468.30 per month', lead: 'health', state: 'selected' }))}<li class="vitae-menu__divider" role="none"></li>${menuGroup('Silver', 'menu-silver', menuItem({ label: 'Kaiser Permanente DC Silver 2500/40 HMO', secondary: '$389.15 per month', lead: 'health' }))}</ul>`],
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
