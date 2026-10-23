import { canvas, figma, esc, matrix } from './_shared.js';
import { icon, iconNames } from './icons.js';

const LEVELS = ['primary', 'secondary', 'tertiary', 'destructive'];
const STATES = ['rest', 'hover', 'pressed', 'focus', 'disabled'];

export const button = ({ label = 'Continue', style = 'solid', level = 'primary', state = 'rest', iconLeft = '', iconRight = '' } = {}) => {
  const cls = ['vitae-btn', `vitae-btn--${style}`, `vitae-btn--${level}`, ['hover', 'pressed', 'focus'].includes(state) ? `is-${state}` : ''].join(' ').trim();
  return `<button type="button" class="${cls}"${state === 'disabled' ? ' disabled' : ''}>${iconLeft ? icon(iconLeft, 20, 'filled') : ''}${esc(label)}${iconRight ? icon(iconRight, 20, 'filled') : ''}</button>`;
};

export default {
  title: 'Vitae 27/Components/Button',
  tags: ['autodocs'],
  excludeStories: /^[a-z]/,
  decorators: [canvas],
  parameters: {
    design: [figma('5:989', 'Button/Solid'), figma('5:1188', 'Button/Outline'), figma('5:1373', 'Button/Ghost')],
    docs: { description: { component: `
Three styles × four levels. **Solid** leads; **Outline** and **Ghost** are lower emphasis (Ghost for Cancel or inline tools). **Destructive** is for irreversible actions. All are 44px tall.

\`<button class="vitae-btn vitae-btn--solid vitae-btn--primary">\`

- Icons: 20px Filled, 8px gap. Never icon-only without an \`aria-label\`.
- Focus: 2px dashed ring, 2px offset, appears instantly.
- Motion: background, border and text color ease over \`--vitae-motion-duration-fast-02\` with \`--vitae-motion-easing-productive-standard\`; none under \`prefers-reduced-motion\`.
- Disabled: prefer keeping actions enabled and explaining what's missing; use \`aria-disabled="true"\` if it must stay focusable.` } },
  },
  argTypes: {
    style: { control: 'inline-radio', options: ['solid', 'outline', 'ghost'] },
    level: { control: 'inline-radio', options: LEVELS },
    state: { control: 'select', options: STATES },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
    iconRight: { control: 'select', options: ['', ...iconNames] },
  },
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
