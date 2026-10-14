const crumb = (content, current = false) =>
  `<li class="ea-breadcrumb-item${current ? ' ea-breadcrumb-item--current' : ''}"${current ? ' aria-current="page"' : ''}>${content}</li>`;

const trail = ({ levels, collapse }) => {
  const names = ['Household', 'Application', 'Income', 'Job income', 'Employer details', 'Review'].slice(0, levels);
  const current = names.pop();
  let items = names.map(n => crumb(`<a href="#">${n}</a>`));
  if (collapse && items.length > 2) {
    items = [items[0], crumb('<button type="button" aria-label="Show hidden levels">…</button>'), items[items.length - 1]];
  }
  return `<nav class="ea-breadcrumbs" aria-label="Breadcrumb"><ol>${items.join('')}${crumb(current, true)}</ol></nav>`;
};

export default {
  title: 'Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Shows where the user is in a multi-level flow. Source: **Vitae → Breadcrumb** (Location = First / Sub / Current / Elipses, each with a Hover state); type size from the 2021 breadcrumb style (14/20).

**Anatomy:** First item has no separator; every later item is prefixed with "/". Links underline on hover. Current location is SemiBold, not a link. Deep trails collapse the middle into an "…" button.

**Accessibility:** \`<nav aria-label="Breadcrumb">\` + ordered list; the current item has \`aria-current="page"\`; the separator is CSS-generated so screen readers don't announce "slash". The "…" button needs an \`aria-label\` and should expand the hidden levels when activated.

**Do:** collapse anything deeper than 4 levels.
**Don't:** make the current page a link to itself.`,
      },
    },
  },
  argTypes: {
    levels: { control: { type: 'range', min: 2, max: 6 } },
    collapse: { control: 'boolean' },
  },
  args: { levels: 4, collapse: false },
  render: trail,
};

export const Default = {};
export const TwoLevels = { args: { levels: 2 } };
export const Collapsed = { args: { levels: 6, collapse: true } };
