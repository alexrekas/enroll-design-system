export default {
  title: 'Components/Navigation/Progress Indicator',
  argTypes: { percent: { control: { type: 'range', min: 10, max: 100, step: 10 } } },
  args: { percent: 50 },
  render: ({ percent }) => `
    <div class="ea-progress" style="width:390px;">
      <div class="ea-progress__complete" style="width:${percent}%;"></div>
      <div class="ea-progress__unfinished"></div>
    </div>`,
};

export const Percent25 = { args: { percent: 25 } };
export const Percent50 = { args: { percent: 50 } };
export const Percent75 = { args: { percent: 75 } };
export const Percent100 = { args: { percent: 100 } };
