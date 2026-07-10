/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  staticDirs: [{ from: '../dist', to: '/dist' }],
  addons: ['@storybook/addon-docs'],
};
