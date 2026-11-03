import { canvas, figma, argDocs } from '../../_shared.js';
import { field } from '../../markup/field.js';
import { clientOf, filterPanel, wireShopping } from '../../markup/shopping.js';

export default {
  title: 'Vitae 27/Components/Plan shopping/Filter panel',
  tags: ['autodocs'],
  decorators: [wireShopping, canvas],
};

export const Playground = {
  args: { layout: 'expanded', carrierOpen: false, rangeError: false },
  argTypes: argDocs({
    layout: ["Expanded: the sidebar with every group open. Collapsed: groups closed. Sheet: the full-screen panel used on phones.", "expanded"],
    carrierOpen: ["Show the carrier list open.", "false", "boolean"],
    rangeError: ["Show the error when the minimum premium is higher than the maximum.", "false", "boolean"],
  }, { layout: { control: 'inline-radio', options: ['expanded', 'collapsed', 'sheet'] } }),
  render: (args, { globals }) => `<div style="max-width:1140px;min-height:${args.layout === 'sheet' ? 740 : 560}px">${filterPanel({ ...args, client: clientOf(globals) })}</div>`,
  parameters: {
    design: [figma('196:770', 'Filter panel'), figma('319:7598', 'Filter/Carrier list'), figma('195:218', 'Filter/Range'), figma('192:3', 'Filter label')],
    docs: { description: { story: `
**Expanded** (768px and wider): groups in three equal columns (\`grid-template-columns: repeat(3, 1fr)\`, 32px gaps): Plan level · Plan type · Network with Plan features under it; then Carrier · Premium · Deductible. **Collapsed**: Show filters, a summary of what's applied and Clear all. **Sheet** (under 768px): a "Filters" button opens a full-screen sheet with the groups stacked and Reset / Apply pinned at the bottom. Switch **Theme** for each client's network label and program plans. Click the Carrier field to open its list.

- Each group is a \`<fieldset>\` with its Filter label as the \`<legend>\`; a group shows its own Clear link only when it has selections. The toggle is a button with \`aria-expanded\`. Announce the new result count after Apply.
- **Carrier** is multi-select: a button (\`aria-expanded\`, accessible name includes the summary) opens a list of native checkboxes; it summarizes as one carrier's name, "2 carriers" or "All carriers". Add a search box above 8 carriers. In the Sheet it's a plain checkbox group. Never a \`<select multiple>\`.
- **Ranges** accept whole dollars (\`inputmode="decimal"\`) with visually hidden labels ("Minimum premium"); when max is less than min, show the error on Max.
- Sorting lives in the results bar, not the panel.` } },
  },
};

export const ResultsBar = {
  name: 'Results bar',
  render: () => `<div class="vitae-results-bar"><p class="vitae-results-bar__count" aria-live="polite">24 plans</p><div class="vitae-results-bar__sort">${field({ kind: 'select', label: 'Sort by', value: 'Premium: low to high', options: ['Premium: low to high', 'Premium: high to low', 'Deductible: low to high', 'Deductible: high to low', 'Carrier: A to Z', 'Plan name: A to Z'], helper: '', info: false, required: false }).replace('class="vitae-field"', 'class="vitae-field" style="flex-direction:row;align-items:center;gap:8px;max-width:none"')}</div></div>`,
  parameters: { design: figma('195:219', 'Filter/Results bar'), docs: { description: { story: 'Result count (announced with `aria-live="polite"`) and a native "Sort by" select. Sorting reorders results; it is not a filter.' } } },
};
