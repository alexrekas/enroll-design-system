import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { iconNames } from '../../icons.js';
import { LEVELS, STATES, button } from '../../markup/button.js';

export default {
  title: 'Vitae 27/Components/Actions/Button',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    design: [figma('5:989', 'Button/Solid'), figma('5:1188', 'Button/Outline'), figma('5:1373', 'Button/Ghost')],
    docs: { description: { component: `
Three styles × four levels. **Solid** leads; **Outline** and **Ghost** are lower emphasis (Ghost for Cancel or inline tools). **Destructive** is for irreversible actions. All are 44px tall.

\`<button class="vitae-btn vitae-btn--solid vitae-btn--primary">\`

- Icons: 20px Filled, 8px gap. Never icon-only without an \`aria-label\`.
- Focus: 2px dashed ring, 2px offset, appears instantly.
- Motion: background, border and text color ease over \`--vitae-motion-duration-fast-02\` with \`--vitae-motion-easing-productive-standard\`; none under \`prefers-reduced-motion\`.
- Disabled: prefer keeping actions enabled and explaining what's missing; use \`aria-disabled="true"\` if it must stay focusable.

### Rails

\`Vitae::ButtonComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::ButtonComponent.new(label: "Continue") %>
<%= render Vitae::ButtonComponent.new(label: "Cancel", style: :outline) %>
<%= render Vitae::ButtonComponent.new(label: "Remove", style: :ghost, level: :destructive, icon_left: "delete") %>
<%= render Vitae::ButtonComponent.new(label: "Submit documents", type: "submit", icon_left: "upload") %>
<%= render Vitae::ButtonComponent.new(label: "(855) 532-5465", href: "tel:+18555325465", style: :ghost, icon_left: "phone") %>
\`\`\`` } },
  },
  argTypes: argDocs({
    label: ["Button text. Start with a verb that says what happens (\"Continue\", \"Upload documents\"). Rails: `label:`", undefined, "string"],
    style: ["Emphasis. Solid for the main action on a page, Outline for secondary actions, Ghost for Cancel or inline tools. Rails: `style:`", "solid"],
    level: ["Color role. Destructive is only for irreversible actions like Remove or Delete. Rails: `level:`", "primary"],
    state: ["Preview a state. In real use hover, pressed and focus come from the browser. Disabled maps to `disabled: true` in Rails.", "rest"],
    iconLeft: ["Fluent icon before the label (20px Filled). Empty for none. Rails: `icon_left:`", "(none)", "icon name"],
    iconRight: ["Fluent icon after the label, e.g. arrow-right for Next. Rails: `icon_right:`", "(none)", "icon name"],
  }, {
    style: { control: 'inline-radio', options: ['solid', 'outline', 'ghost'] },
    level: { control: 'inline-radio', options: LEVELS },
    state: { control: 'select', options: STATES },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
    iconRight: { control: 'select', options: ['', ...iconNames] },
  }),
  args: { label: 'Continue', style: 'solid', level: 'primary', state: 'rest', iconLeft: '', iconRight: '' },
  render: (args) => button(args),
};

export const Playground = {};

export const AllStates = {
  name: 'All styles, levels and states',
  render: () => ['solid', 'outline', 'ghost'].map((style) => `<h3 style="margin:24px 0 8px">${style[0].toUpperCase() + style.slice(1)}</h3>` +
    matrix(STATES.length, LEVELS.flatMap((level) => STATES.map((state) => [`${level} · ${state}`, button({ style, level, state, label: 'Continue' })])))).join(''),
};

export const WithIcons = {
  render: () => matrix(3, [
    ['Leading icon', button({ label: 'Add member', iconLeft: 'add' })],
    ['Trailing icon', button({ label: 'Next', style: 'outline', iconRight: 'arrow-right' })],
    ['Ghost + icon', button({ label: 'Print', style: 'ghost', iconLeft: 'print' })],
  ]),
};
