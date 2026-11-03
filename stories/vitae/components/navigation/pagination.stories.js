import { canvas, figma, argDocs } from '../../_shared.js';
import { pagination } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Pagination',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { width: 960, summary: true },
  argTypes: argDocs({
    width: ["Container width in px. 560px and wider shows the full control; narrower shows the compact one.", undefined, "number (example)"],
    summary: ["Show the \"Showing 41–50 of 312 results\" text.", "true", "boolean"],
  }, { width: { control: 'inline-radio', options: [960, 720, 600, 375] } }),
  render: ({ width, summary }) => `<div class="vitae-pagination-wrap" style="width:${width}px;max-width:100%">${pagination('full', 5, 32, summary)}${pagination('compact', 5, 32, summary)}</div>`,
  parameters: {
    design: [figma('140:53', 'Pagination'), figma('139:247', 'Pagination/Page')],
    docs: { description: { story: `
**Full** (container 560px and wider): summary on the left, Previous / pages / Next on the right; the controls wrap below the summary when space runs out. **Compact** (under 560px): summary centered over icon-only arrows and a native "Page [5] of 32" select. This story switches between them with a container query; change **width** to see it.

- \`<nav aria-label="Pagination">\`; each page is a link with \`aria-label="Page 4"\`; the current page has \`aria-current="page"\`.
- Always show first, last, current ±1 and "…" for gaps (7 slots max). On the first or last page, keep Previous/Next in place with \`aria-disabled="true"\`.
- Announce the summary in a polite live region when results change. Tables show 10 per page.` } },
  },
};
