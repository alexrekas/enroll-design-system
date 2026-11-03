import { canvas, esc, figma, argDocs } from '../../_shared.js';

export default {
  title: 'Vitae 27/Components/Feedback/Tooltip',
  tags: ['autodocs'],
  decorators: [canvas],
};

export const Playground = {
  args: { message: 'Include income from jobs, self-employment and unemployment for everyone in your tax household.', placement: 'top' },
  argTypes: argDocs({
    message: ["Tooltip text. Short supporting help; never the only place essential information appears.", undefined, "string"],
    placement: ["Which side of the trigger the tooltip sits on, which sets where the arrow points. None has no arrow.", "top"],
  }, { placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right', 'none'] } }),
  render: ({ message, placement }) => `<div style="padding:24px"><div role="tooltip" class="vitae-tooltip vitae-tooltip--${placement}">${esc(message)}</div></div>`,
  parameters: {
    design: figma('101:33', 'Tooltip'),
    docs: { description: { story: `
One or two sentences of extra help. The field-label info button opens it as a **toggletip** (click, tap, Enter or Space; Esc, a second click or a click outside closes it) and the text is announced through a polite live region. Hover and focus tooltips are only for short labels on icon-only buttons. No links or buttons inside, and nothing the person needs to finish the task.` } },
  },
};
