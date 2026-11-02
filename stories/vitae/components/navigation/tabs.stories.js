import { expect, userEvent, within } from 'storybook/test';
import { canvas, figma, matrix } from '../../_shared.js';
import { TAB_LABELS, tabsHtml, wireTabs } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Tabs',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  decorators: [wireTabs],
  render: () => `<div style="display:grid;gap:32px">
    <div><div class="vitae-demo-label">Wide · all tabs fit</div>${tabsHtml({ labels: TAB_LABELS, counts: { Documents: 2 } })}</div>
    <div style="width:375px"><div class="vitae-demo-label">Narrow · scrolls sideways, cue on the right</div>${tabsHtml({ labels: TAB_LABELS, counts: { Documents: 2 }, cues: 'right' })}</div></div>`,
  parameters: {
    design: [figma('248:566', 'Tabs'), figma('175:37', 'Tabs/Item')],
    docs: { description: { story: `
Sections within a page. 44px tabs on a 1px rule; selected tab has a 4px \`--vitae-action-primary\` indicator and SemiBold label (width reserved so tabs don't shift); hover previews a 2px indicator at 40%, pressed 70%. Click a tab or use the arrow keys here.

- \`role="tablist"\` with \`role="tab"\` buttons (\`aria-selected\`, \`aria-controls\`) and \`role="tabpanel"\` content. Left/Right move, Home/End jump, only the selected tab is in the tab order. If each tab is its own URL, use a nav of links with \`aria-current="page"\` instead.
- One row that scrolls sideways (\`overflow-x: auto\`), never wraps. Show the chevron + fade cue only on the side with more tabs; chevrons are \`aria-hidden="true"\` and \`tabindex="-1"\` (pointer and touch aid only). Scroll the selected tab into view on load.
- Count pills need hidden text, e.g. "Documents, 2 new".` } },
  },
  play: async ({ canvasElement, step }) => {
    await new Promise((r) => setTimeout(r, 0)); // let the wiring decorator attach its listeners
    const canvas = within(canvasElement.querySelector('.vitae-tabs'));
    await step('Click selects a tab', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: 'Household' }));
      await expect(canvas.getByRole('tab', { name: 'Household' })).toHaveAttribute('aria-selected', 'true');
    });
    await step('Arrow keys move the selection; only the selected tab is in the tab order', async () => {
      await userEvent.keyboard('{ArrowRight}');
      const docs = canvas.getByRole('tab', { name: /Documents/ });
      await expect(docs).toHaveAttribute('aria-selected', 'true');
      await expect(docs).toHaveFocus();
      await expect(canvas.getByRole('tab', { name: 'Household' })).toHaveAttribute('tabindex', '-1');
      await userEvent.keyboard('{End}');
      await expect(canvas.getByRole('tab', { name: 'Payments' })).toHaveAttribute('aria-selected', 'true');
      await userEvent.keyboard('{Home}');
      await expect(canvas.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    });
  },
};

export const ItemStates = {
  name: 'Item states',
  render: () => matrix(7, ['rest', 'hover', 'pressed', 'focus', 'selected', 'selected focus', 'disabled'].map((s) => [s, `<div class="vitae-tabs" style="border:0"><div class="vitae-tabs__list" role="tablist" aria-label="${s}"><button type="button" role="tab" class="vitae-tab${['hover', 'pressed', 'focus'].includes(s) || s === 'selected focus' ? ` is-${s.replace('selected ', '')}` : ''}" aria-selected="${s.startsWith('selected')}"${s === 'disabled' ? ' disabled' : ''}><span class="vitae-tab__label"><span class="vitae-tab__text" data-label="Documents">Documents</span></span></button></div></div>`])),
  parameters: { design: figma('175:37', 'Tabs/Item') },
};
