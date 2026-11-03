import { canvas, figma, argDocs } from '../../_shared.js';
import { icon } from '../../icons.js';
import { leftnav } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Left nav',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { icons: true },
  argTypes: argDocs({
    icons: ["Show an icon before each item. Use icons on every item or on none.", "true", "boolean"],
  }),
  render: ({ icons }) => `<div style="display:flex;gap:48px;align-items:flex-start">${leftnav(0, icons)}
    <div style="width:375px"><div class="vitae-demo-label">Mobile (under 640px), open</div>
      <button type="button" class="vitae-navtoggle vitae-navtoggle--rule" aria-expanded="true" aria-controls="acct-panel"><span class="vitae-navtoggle__row"><span><span class="vitae-visually-hidden">My Account: </span>My Coverage</span>${icon('chevron-down', 20, 'filled')}</span></button>
      <div class="vitae-navpanel" id="acct-panel"><div class="vitae-navpanel__surface">${leftnav(0, icons).replace('vitae-leftnav"', 'vitae-leftnav" style="width:100%"')}</div></div></div></div>`,
  parameters: {
    design: [figma('145:149', 'Left nav'), figma('145:43', 'Left nav/Item'), figma('154:1078', 'Mobile nav toggle')],
    docs: { description: { story: `
Account and portal sections, one level. Desktop: 256px column, 44px rows with 1px dividers; selected item has a 4px \`--vitae-action-primary\` bar, \`--vitae-nav-item-selected\` fill and SemiBold label; hover previews a 2px bar at 40%. Badges need hidden text ("Messages, 3 unread").

Under 640px the Mobile nav toggle shows the current page; tapping it opens the list as an overlay panel under the toggle with a scrim (150ms entrance). Toggle: \`<button aria-expanded aria-controls>\` with a hidden prefix ("My Account:"). Close on Esc, scrim tap or link selection and return focus to the toggle. \`<nav aria-label="My Account">\` with a list of links, current one \`aria-current="page"\`.` } },
  },
};
