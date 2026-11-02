// Story test gate: opens every Vitae 27 story in the built Storybook, in every client and mode,
// and fails if a story errors, its play function (interaction test) fails, or axe finds a
// WCAG 2.0/2.1 A or AA violation.
//
//   npm run build-storybook && npm run check:stories
//   npm run check:stories -- --only=button,upload   (story ids containing these words)
//   npm run check:stories -- --quick                (EA light only, for local runs)
//
// Needs Chromium for Playwright (`npx playwright install chromium`, done in CI).
// Rules match the Accessibility panel in Storybook (.storybook/preview.js → parameters.a11y).
// A story can opt out of a rule with parameters.a11y.config.rules = [{ id, enabled: false }]
// and must say why in a comment next to it.
import { readFileSync, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = 'storybook-static';
if (!existsSync(`${ROOT}/index.json`)) {
  console.error(`check-stories: ${ROOT}/index.json not found. Run npm run build-storybook first.`);
  process.exit(1);
}
const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const quick = args.includes('--quick');
const COMBOS = quick ? [['ea', 'light']] : ['ea', 'dc', 'ma', 'me'].flatMap((c) => [[c, 'light'], [c, 'dark']]);
const RULES = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const stories = Object.values(JSON.parse(readFileSync(`${ROOT}/index.json`, 'utf8')).entries)
  .filter((e) => e.type === 'story' && e.id.startsWith('vitae-27-'))
  .filter((e) => !only.length || only.some((w) => e.id.includes(w)));

// Small static server for storybook-static (no extra dependency).
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
  if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
// Fonts come from Google Fonts on the live site; skip external requests so runs are fast and offline-safe.
await context.route((url) => !url.href.startsWith(base), (route) => route.abort());

// Storybook reports play-function failures on its channel, not in the render phase, so listen for them.
await context.addInitScript(() => {
  window.__vitae = { errors: [], finished: null };
  const hook = () => {
    const ch = window.__STORYBOOK_ADDONS_CHANNEL__;
    if (!ch) { setTimeout(hook, 5); return; }
    ch.on('playFunctionThrewException', (e) => window.__vitae.errors.push(`Play function failed: ${e?.message || e}`));
    ch.on('storyThrewException', (e) => window.__vitae.errors.push(`Story threw: ${e?.message || e}`));
    ch.on('storyErrored', (e) => window.__vitae.errors.push(`Story errored: ${e?.title || ''} ${e?.description || ''}`.trim()));
    ch.on('storyFinished', (e) => { window.__vitae.finished = e?.status || 'finished'; });
  };
  hook();
});

const jobs = stories.flatMap((s) => COMBOS.map(([client, mode]) => ({ s, client, mode })));
const failures = [];
let done = 0;

async function run({ s, client, mode }) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  try {
    await page.goto(`${base}/iframe.html?id=${s.id}&viewMode=story&globals=theme:${client};mode:${mode}`);
    // Wait for render + play function to finish.
    const phase = await page.waitForFunction(() => {
      // Storybook 10 keeps the active render in storyRenders; 'finished' means render and play are done.
      const r = window.__STORYBOOK_PREVIEW__?.storyRenders?.at(-1);
      if (document.body.classList.contains('sb-show-errordisplay')) return 'errored';
      return r && ['finished', 'completed', 'errored', 'aborted'].includes(r.phase) ? r.phase : false;
    }, null, { timeout: 20000 }).then((h) => h.jsonValue());
    errors.push(...await page.evaluate(() => window.__vitae.errors));
    const status = await page.evaluate(() => window.__vitae.finished);
    if (status && status !== 'success' && status !== 'finished') errors.push(`Story finished with status ${status}`);
    const shownError = await page.evaluate(() => document.body.classList.contains('sb-show-errordisplay') ? document.querySelector('#error-message')?.textContent?.trim() || 'Story errored' : '');
    if (!['finished', 'completed'].includes(phase) || shownError) errors.push(`Render/play ${phase}${shownError ? `: ${shownError}` : ''}`);
    await page.addScriptTag({ content: AXE });
    const params = await page.evaluate(() => window.__STORYBOOK_PREVIEW__.storyRenders.at(-1).story.parameters.a11y || {});
    const result = await page.evaluate(async ({ rules, config }) => {
      if (config) window.axe.configure(config);
      const r = await window.axe.run({ include: ['#storybook-root'], exclude: ['.sb-src'] }, { runOnly: { type: 'tag', values: rules }, resultTypes: ['violations'] });
      return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => `${n.target.join(' ')}${n.any[0]?.message ? ` (${n.any[0].message})` : ''}`), count: v.nodes.length }));
    }, { rules: RULES, config: params.config ? { rules: params.config.rules } : null });
    if (errors.length || result.length) failures.push({ id: s.id, client, mode, errors, violations: result });
  } catch (e) {
    failures.push({ id: s.id, client, mode, errors: [e.message.split('\n')[0]], violations: [] });
  } finally {
    await page.close();
    done += 1;
    if (process.stdout.isTTY) process.stdout.write(`\r${done}/${jobs.length}`);
  }
}

const queue = [...jobs];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await run(queue.shift()); }));
await browser.close();
server.close();
if (process.stdout.isTTY) process.stdout.write('\n');

if (failures.length) {
  console.error(`${failures.length} of ${jobs.length} story checks failed:\n`);
  for (const f of failures) {
    console.error(`✗ ${f.id}  [${f.client} ${f.mode}]`);
    for (const e of f.errors) console.error(`    error: ${e}`);
    for (const v of f.violations) console.error(`    ${v.impact} ${v.id}: ${v.help} (${v.count})\n      ${v.nodes.join('\n      ')}`);
  }
  process.exit(1);
}
console.log(`All ${stories.length} Vitae 27 stories pass in ${COMBOS.length} client/mode combinations (${jobs.length} checks): no errors, play functions pass, no WCAG 2.1 A/AA violations.`);
