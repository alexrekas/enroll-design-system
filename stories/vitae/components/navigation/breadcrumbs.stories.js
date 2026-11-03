import { canvas, figma, matrix, argDocs } from '../../_shared.js';
import { backLink, crumbs } from '../../markup/navigation.js';

export default {
  title: 'Vitae 27/Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
};

export const Playground = {
  args: { depth: '3' },
  argTypes: argDocs({
    depth: ["How many levels to show. Collapsed keeps the first, parent and current page and hides the middle behind a \"…\" button.", undefined, "2 | 3 | 4 | Collapsed (example)"],
  }, { depth: { control: 'inline-radio', options: ['2', '3', '4', 'Collapsed'] } }),
  render: ({ depth }) => crumbs(depth),
  parameters: {
    design: figma('135:101', 'Breadcrumbs'),
    docs: { description: { story: 'Where the page sits in a multi-level flow. Prior levels are links in `--vitae-text-secondary` (14/20); the current page is SemiBold text with `aria-current="page"`. Separators come from CSS (`li + li::before`) so screen readers skip them. Collapsed keeps the first level, an "…" button that expands the middle, the parent and the current page. Under 768px use Back link instead. Not for step-by-step flows (use Progress).' } },
  },
};

export const BackLink = {
  name: 'Back link',
  render: () => matrix(4, ['rest', 'hover', 'pressed', 'focus'].map((s) => [s, backLink('Back to Income', s)])),
  parameters: {
    design: figma('309:3052', 'Back link'),
    docs: { description: { story: 'A single "Back to {parent}" link, built from Link / Standalone with a leading Arrow Left. Replaces Breadcrumbs under 768px (keep the `<nav aria-label="Breadcrumb">` landmark) and works on its own, e.g. "Back to plans" on Compare. Always name the destination; link to the parent page rather than `history.back()`.' } },
  },
};
