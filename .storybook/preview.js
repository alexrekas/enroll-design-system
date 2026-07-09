import './tokens.css';

/** Theme switcher: sets data-theme on the story root */
const withTheme = (storyFn, context) => {
  const theme = context.globals.theme || 'ea';
  document.documentElement.setAttribute('data-theme', theme);
  const root = storyFn();
  if (typeof root === 'string') {
    return `<div data-theme="${theme}" style="font-family: var(--ea-font-family-brand); color: var(--ea-color-text-primary);">${root}</div>`;
  }
  root.setAttribute?.('data-theme', theme);
  return root;
};

export default {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Client theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'ea', title: 'EA (default)' },
          { value: 'dc', title: 'DC HealthLink' },
          { value: 'ma', title: 'MA Health Connector' },
          { value: 'me', title: 'CoverME.gov' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'ea' },
  parameters: {
    backgrounds: { disable: true },
  },
};
