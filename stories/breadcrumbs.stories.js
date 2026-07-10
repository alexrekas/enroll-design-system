export default {
  title: 'Components/Navigation/Breadcrumbs',
  render: () => `
    <nav class="ea-breadcrumbs" aria-label="Breadcrumb">
      <span class="ea-breadcrumb-item">…</span>
      <span class="ea-breadcrumb-item">/ Section</span>
      <span class="ea-breadcrumb-item">/ Subsection</span>
      <span class="ea-breadcrumb-item ea-breadcrumb-item--current">/ Current Page</span>
    </nav>`,
};

export const Default = {};
