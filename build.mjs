import StyleDictionary from 'style-dictionary';

const THEMES = ['ea', 'dc', 'ma', 'me'];

for (const theme of THEMES) {
  const selector = theme === 'ea'
    ? `:root, [data-theme="ea"]`
    : `[data-theme="${theme}"]`;

  const sd = new StyleDictionary({
    usesDtcg: true,
    log: { verbosity: 'silent' },
    source: [
      'tokens/primitives/*.json',
      'tokens/semantic/*.json',
      'tokens/component/*.json',
      `tokens/themes/${theme}.json`,
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'ea',
        buildPath: 'dist/css/',
        files: [{
          destination: `tokens.${theme}.css`,
          format: 'css/variables',
          options: { selector, outputReferences: true },
        }],
      },
      scss: {
        transformGroup: 'scss',
        prefix: 'ea',
        buildPath: 'dist/scss/',
        files: [{ destination: `_tokens.${theme}.scss`, format: 'scss/variables' }],
      },
      json: {
        transformGroup: 'js',
        buildPath: 'dist/docs/',
        files: [{ destination: `tokens.${theme}.json`, format: 'json/flat' }],
      },
    },
  });
  await sd.buildAllPlatforms();
  console.log(`built theme: ${theme}`);
}
console.log('done');
