/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  // Token files are also served as plain downloads at /static/dist/... . Don't mount them at /dist:
  // in dev that path shadows Vite's own /dist module requests and the preview never loads.
  staticDirs: [{ from: '../dist', to: '/static/dist' }],
  addons: ['@storybook/addon-docs'],
};
