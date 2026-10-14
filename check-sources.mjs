// Fails the build if any story file has no `parameters.design` (Figma source) declared.
// Keeps the "where did this come from?" question answerable for every story.
import { readdirSync, readFileSync } from 'fs';
const files = readdirSync('stories').filter((f) => f.endsWith('.stories.js'));
const missing = files.filter((f) => !/\bdesign\s*:/.test(readFileSync(`stories/${f}`, 'utf8')));
for (const f of files) console.log(`${missing.includes(f) ? 'MISSING' : 'ok     '} ${f}`);
if (missing.length) { console.error(`\n${missing.length} story file(s) without a design source`); process.exit(1); }
console.log('\nEvery story file declares a design source.');
