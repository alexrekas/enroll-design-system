export default {
  title: 'Components/Navigation/Progress Indicator',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Horizontal bar showing completion percentage through a multi-step flow.

**Known gap — the most consequential accessibility gap in this set:** the ARIA \`progressbar\` role and \`aria-valuenow\`/\`aria-valuemin\`/\`aria-valuemax\` triad are shown in this story, but if you copy this markup elsewhere, keep them — without them a screen reader user gets zero information about progress, since it's otherwise purely visual.

**Do:** pair Progress with a text label ("Step 3 of 5") for redundant, accessible context.
**Don't:** rely on the bar's fill alone to communicate progress.`,
      },
    },
  },
  argTypes: { percent: { control: { type: 'range', min: 10, max: 100, step: 10 } } },
  args: { percent: 50 },
  render: ({ percent }) => `
    <div class="ea-progress" style="width:390px;" role="progressbar" aria-label="Application progress" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
      <div class="ea-progress__complete" style="width:${percent}%;"></div>
      <div class="ea-progress__unfinished"></div>
    </div>`,
};

export const Percent25 = { args: { percent: 25 } };
export const Percent50 = { args: { percent: 50 } };
export const Percent75 = { args: { percent: 75 } };
export const Percent100 = { args: { percent: 100 } };
