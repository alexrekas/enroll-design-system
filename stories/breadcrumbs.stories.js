export default {
  title: 'Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Shows the user's location within a multi-level flow (e.g. Application / Section / Subsection).

**Accessibility:** wrapped in \`<nav aria-label="Breadcrumb">\` — correct semantic pattern. Prior-level items should be real links (\`<a href>\`) in production so they're keyboard-navigable; this reference story renders them as plain spans since there's no routing in Storybook.

**Do:** mark only the current page as non-link, bold text.
**Don't:** make the current page a clickable link to itself.

**Known limitation:** only a single baseline is built — no truncation/overflow variant for deep flows yet.`,
      },
    },
  },
  render: () => `
    <nav class="ea-breadcrumbs" aria-label="Breadcrumb">
      <span class="ea-breadcrumb-item">…</span>
      <span class="ea-breadcrumb-item">/ Section</span>
      <span class="ea-breadcrumb-item">/ Subsection</span>
      <span class="ea-breadcrumb-item ea-breadcrumb-item--current">/ Current Page</span>
    </nav>`,
};

export const Default = {};
