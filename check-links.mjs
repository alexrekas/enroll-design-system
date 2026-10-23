// Fails the build if a Storybook page that Figma links to no longer exists.
// Reads figma-links.json and the index.json that `npm run build-storybook` writes to storybook-static/.
import { readFileSync, existsSync } from 'node:fs';

const INDEX = 'storybook-static/index.json';
if (!existsSync(INDEX)) {
  console.error(`check-links: ${INDEX} not found. Run npm run build-storybook first.`);
  process.exit(1);
}
const entries = JSON.parse(readFileSync(INDEX, 'utf8')).entries;
const links = JSON.parse(readFileSync('figma-links.json', 'utf8'));
const wanted = [
  ...Object.entries(links.pages).map(([name, docs]) => ({ name, docs })),
  ...links.components,
];
const missing = wanted.filter((l) => !entries[l.docs]);
if (missing.length) {
  console.error('Figma links point at Storybook pages that no longer exist:');
  for (const m of missing) console.error(`  ${m.name}${m.figma ? ` (Figma ${m.figma})` : ''} -> ${m.docs}`);
  console.error('Fix the Storybook title or update figma-links.json and the Figma documentation links.');
  process.exit(1);
}
const pages = new Set(wanted.map((l) => l.docs));
console.log(`All ${wanted.length} Figma links resolve (${pages.size} Storybook pages).`);
