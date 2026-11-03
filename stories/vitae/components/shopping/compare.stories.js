import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, argDocs } from '../../_shared.js';
import { compareTable, tray, wireShopping } from '../../markup/shopping.js';

export default {
  title: 'Vitae 27/Components/Plan shopping/Compare',
  tags: ['autodocs'],
  decorators: [wireShopping, canvas],
};

export const Tray = {
  name: 'Tray',
  args: { count: 2, width: 1140 },
  argTypes: argDocs({
    count: ["Plans selected for comparison (up to 3).", "2"],
    width: ["Container width in px, to see the phone layout.", undefined, "number (example)"],
  }, { count: { control: 'inline-radio', options: [1, 2, 3] }, width: { control: 'inline-radio', options: [1140, 375] } }),
  render: ({ count, width }) => `<div style="width:${width}px;max-width:100%">${tray(count)}</div>`,
  parameters: {
    design: [figma('293:38166', 'Plan compare/Tray'), figma('293:38161', 'Plan compare/Chip')],
    docs: { description: { story: `
Appears once a plan is checked. Background \`--vitae-surface-header-bar\`. It's the last element in the main content with \`position: sticky; bottom: 0\`, so it floats while scrolling and settles above the footer at the end of the page.

- Chips clamp the name to two lines; the full name is in the remove button's \`aria-label\` and a tooltip.
- Never disable Compare plans: with one plan, pressing it shows the helper and moves focus to it.
- Under 480px the chips hide and Compare plans goes full width (chips are on the Compare page).
- Announce changes politely: "Taro Health Gold PPO added to compare. 2 of 3 plans selected."
- No empty Compare page: with fewer than two plans, send people back to the results with an Info alert and focus on its heading.` } },
  },
};

export const Table = {
  name: 'Table',
  args: { plans: 3, compact: false },
  argTypes: argDocs({
    plans: ["Number of plans compared.", "3"],
    compact: ["Tighter rows.", "false", "boolean"],
  }, { plans: { control: 'inline-radio', options: [2, 3] } }),
  render: (args) => `<div style="max-width:1140px">${compareTable(args)}</div>`,
  parameters: {
    design: [figma('295:38844', 'Plan compare/Table'), figma('298:39641', 'Plan compare/Plan header'), figma('295:42', 'Plan compare/Row')],
    docs: { description: { story: `
One real table: caption "Comparing 3 plans" (visually hidden), plan headers \`th scope="col"\`, row labels \`th scope="row"\`, so screen readers announce "Primary care visit, CareFirst BlueChoice…, $15 copay". One value per benefit. Click a section heading to collapse it.

- Plan names wrap in full in the table. Select plan sits at the bottom of every header so buttons line up.
- The header row is \`position: sticky; top: 0\`. Turn on **compact** to see the scrolled state: name (two lines) and premium only. Switch with an IntersectionObserver on a sentinel above the table; keep the same DOM and hide parts with CSS so focus isn't lost.
- Label column is 240px max; plan columns share the rest (140px min). On phones the table scrolls sideways inside a focusable region (two plans visible).
- Removing a plan moves focus to the next Remove button (or Back to plans when one plan is left). "Show only differences" hides identical rows and says how many are hidden.` } },
  },
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const section = canvasElement.querySelector('.vitae-compare__section button');
    const rows = () => [...section.closest('tbody').querySelectorAll('tr:not(.vitae-compare__section)')];
    await expect(section).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(section);
    await expect(section).toHaveAttribute('aria-expanded', 'false');
    await expect(rows().every((r) => r.hidden)).toBe(true);
    await userEvent.click(section);
    await expect(rows().some((r) => r.hidden)).toBe(false);
  },
};
