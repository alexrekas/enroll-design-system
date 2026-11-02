import { canvas, esc, figma } from '../../_shared.js';
import { icon } from '../../icons.js';
import { STEP_NAMES, progressLine, steps } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Progress',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { current: 1 },
  argTypes: { current: { control: { type: 'range', min: 0, max: 3 } } },
  render: ({ current }) => `<div style="display:flex;gap:48px;align-items:flex-start">
    <nav class="vitae-progress" aria-label="Progress"><div class="vitae-progress__card"><h3 class="vitae-progress__title">Create New Employer</h3>${progressLine(Math.round(((current + 0.5) / 4) * 100), false, `Step ${current + 1} of 4`)}${steps(current)}</div>
      <div class="vitae-progress__links"><a href="#" class="vitae-link vitae-link--standalone">Save &amp; Exit</a><a href="#" class="vitae-link vitae-link--standalone">Get Help</a><a href="#" class="vitae-link vitae-link--standalone">Return Home</a></div></nav>
    <div style="width:375px"><div class="vitae-demo-label">Mobile (under 640px)</div>
      <button type="button" class="vitae-navtoggle" aria-expanded="false"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">Create New Employer, </span>Step ${current + 1} of 4: ${esc(STEP_NAMES[current])}</span>${icon('chevron-down', 20, 'filled')}</span>${progressLine(Math.round(((current + 0.5) / 4) * 100), true)}</button></div></div>`,
  parameters: {
    design: [figma('161:205', 'Progress'), figma('161:68', 'Progress/Step'), figma('159:996', 'Progress line')],
    docs: { description: { story: `
Multi-step flows. Desktop: 280px card with the flow title, a progress line and the step list; links below. Switch **Theme** to see the client difference: EA, MA and ME use gapped connectors and an open ring for the current step; DC uses continuous connectors and a center dot (\`progress.connector-*\`, \`progress.current-center-dot\`).

- Steps the person has reached (Complete, Visited) are links; Current and Upcoming are not. Current has \`aria-current="step"\`; completed steps get hidden text "completed".
- \`<nav aria-label="Progress">\` with an \`<ol>\`. The progress line is a \`progressbar\` with \`aria-valuetext="Step 2 of 4"\` (round the width to a whole percent).
- Under 640px the Mobile nav toggle shows "Step 2 of 4: Business Information" over a flush progress line and opens the same content as an overlay panel.` } },
  },
};
