import { canvas, argDocs } from '../_shared.js';
import { wireLayout } from '../markup/layout.js';
import { wireSelection } from '../markup/selection.js';
import { clientOf } from '../markup/navigation.js';

export const WIDTHS = { Desktop: '', Tablet: 768, Phone: 375 };

/** Decorators for page templates: wire interactive parts, then the Theme/Mode canvas. */
export const TEMPLATE_DECORATORS = [wireLayout, wireSelection, canvas];

export const frame = (html, width) => `<div class="vitae-bleed vitae-template-frame"${WIDTHS[width] ? ` style="width:${WIDTHS[width]}px;max-width:100%;margin-inline:auto;border-inline:1px solid var(--vitae-border-subtle)"` : ''}>${html}</div>`;

export const widthArg = {
  args: { width: 'Desktop' },
  argTypes: argDocs({ width: ['Frame width. Under 768px the page switches to the phone header and the side column collapses into a toggle.', 'Desktop'] }, { width: { control: 'inline-radio', options: Object.keys(WIDTHS) } }),
};

export { clientOf };
