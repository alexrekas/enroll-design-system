// Builds the Vitae 27 tokens (tokens-v2/) into CSS custom properties.
// One block per client × mode: [data-client="dc"][data-mode="dark"] { --vitae-… }.
// EA light is also the :root default so a page without attributes still renders.
import StyleDictionary from 'style-dictionary';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

// Style Dictionary's css group, minus time/seconds: durations stay in ms as authored (70ms, not 0.07s).
const CSS_TRANSFORMS = StyleDictionary.hooks.transformGroups.css.filter((t) => t !== 'time/seconds');

const CLIENTS = ['ea', 'dc', 'ma', 'me'];
const MODES = ['light', 'dark'];
const OUT = 'dist/v2';
mkdirSync(`${OUT}/css`, { recursive: true });
mkdirSync(`${OUT}/docs`, { recursive: true });

const blocks = [];
for (const client of CLIENTS) {
  for (const mode of MODES) {
    const selector = client === 'ea' && mode === 'light'
      ? `:root, [data-client="ea"][data-mode="light"]`
      : `[data-client="${client}"][data-mode="${mode}"]`;
    const name = `vitae.${client}.${mode}`;
    const sd = new StyleDictionary({
      usesDtcg: true,
      log: { verbosity: 'silent', warnings: 'disabled' },
      source: ['tokens-v2/primitives.json', `tokens-v2/brand/${client}.json`, `tokens-v2/semantic/${mode}.json`],
      platforms: {
        css: {
          transforms: CSS_TRANSFORMS,
          prefix: 'vitae',
          buildPath: `${OUT}/css/`,
          files: [{ destination: `${name}.css`, format: 'css/variables', options: { selector, outputReferences: true } }],
        },
        json: {
          transformGroup: 'js',
          buildPath: `${OUT}/docs/`,
          files: [{ destination: `${name}.json`, format: 'json/flat' }],
        },
      },
    });
    await sd.buildAllPlatforms();
    blocks.push(readFileSync(`${OUT}/css/${name}.css`, 'utf8'));
    console.log(`built ${name}`);
  }
}
writeFileSync(`${OUT}/css/vitae.css`, blocks.join('\n'));
console.log(`wrote ${OUT}/css/vitae.css`);

// Manifest for Storybook docs: every token path with its CSS variable, type and description.
// Brand tokens are listed from ea.json (every client has the same paths).
const manifest = [];
const walk = (node, path, source, inheritedType) => {
  const type = node.$type ?? inheritedType;
  if (node.$value !== undefined) {
    manifest.push({ path: path.join('.'), cssVar: `--vitae-${path.join('-')}`, type, description: node.$description ?? '', source });
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (!k.startsWith('$') && v && typeof v === 'object') walk(v, [...path, k], source, type);
  }
};
for (const [file, source] of [['tokens-v2/primitives.json', 'primitive'], ['tokens-v2/brand/ea.json', 'brand'], ['tokens-v2/semantic/light.json', 'semantic']]) {
  walk(JSON.parse(readFileSync(file, 'utf8')), [], source);
}
writeFileSync(`${OUT}/docs/manifest.json`, JSON.stringify(manifest, null, 1));
console.log(`wrote ${OUT}/docs/manifest.json (${manifest.length} tokens)`);
