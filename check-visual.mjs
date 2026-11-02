// Visual regression gate: screenshots every Vitae 27 story and compares it with the approved
// baseline in visual-baselines/. Fails if any story looks different, and writes a report
// (visual-report/index.html) with the baseline, the new screenshot and a diff for each change.
//
//   npm run build-storybook && npm run check:visual
//   npm run check:visual -- --update        accept the current look as the new baseline
//   npm run check:visual -- --only=button   story ids containing these words
//
// Baselines are made in CI (Linux Chromium), so compare there: Actions → Design System CI →
// Run workflow → tick "Accept the current look…" to approve intended changes. A Mac renders
// text slightly differently, so local runs on a Mac will show differences that CI won't.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const ROOT = 'storybook-static';
const BASE = 'visual-baselines';
const REPORT = 'visual-report';
if (!existsSync(`${ROOT}/index.json`)) {
  console.error(`check-visual: ${ROOT}/index.json not found. Run npm run build-storybook first.`);
  process.exit(1);
}
const args = process.argv.slice(2);
const update = args.includes('--update');
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
// One light and one dark mode per pair of clients keeps the baselines small but covers every
// client and both modes. Contrast in all 8 combinations is checked by check:stories.
const COMBOS = [['ea', 'light'], ['dc', 'dark'], ['ma', 'light'], ['me', 'dark']];
// A story counts as changed when more than this share of its pixels differ (anti-aliasing noise is ignored).
const MAX_DIFF_RATIO = 0.0005;

const stories = Object.values(JSON.parse(readFileSync(`${ROOT}/index.json`, 'utf8')).entries)
  .filter((e) => e.type === 'story' && e.id.startsWith('vitae-27-'))
  .filter((e) => !only.length || only.some((w) => e.id.includes(w)));

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
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await context.route((url) => !url.href.startsWith(base), (route) => route.abort());

if (update) { rmSync(BASE, { recursive: true, force: true }); mkdirSync(BASE, { recursive: true }); }
rmSync(REPORT, { recursive: true, force: true });
mkdirSync(`${REPORT}/img`, { recursive: true });

const name = (id, client, mode) => `${id}__${client}-${mode}.png`;
const results = [];
const jobs = stories.flatMap((s) => COMBOS.map(([client, mode]) => ({ s, client, mode })));

async function shoot({ s, client, mode }) {
  const page = await context.newPage();
  try {
    await page.goto(`${base}/iframe.html?id=${s.id}&viewMode=story&globals=theme:${client};mode:${mode}`);
    await page.waitForFunction(() => {
      const r = window.__STORYBOOK_PREVIEW__?.storyRenders?.at(-1);
      return document.body.classList.contains('sb-show-errordisplay') || ['finished', 'completed', 'errored', 'aborted'].includes(r?.phase);
    }, null, { timeout: 20000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
    await page.waitForTimeout(100);
    const png = await page.locator('#storybook-root').screenshot({ animations: 'disabled', caret: 'hide' });
    const file = name(s.id, client, mode);
    if (update) { writeFileSync(`${BASE}/${file}`, png); return; }
    const entry = { id: s.id, title: `${s.title} › ${s.name}`, client, mode, file };
    if (!existsSync(`${BASE}/${file}`)) { writeFileSync(`${REPORT}/img/new-${file}`, png); results.push({ ...entry, status: 'new' }); return; }
    const a = PNG.sync.read(readFileSync(`${BASE}/${file}`));
    const b = PNG.sync.read(png);
    if (a.width !== b.width || a.height !== b.height) {
      writeFileSync(`${REPORT}/img/new-${file}`, png);
      writeFileSync(`${REPORT}/img/old-${file}`, PNG.sync.write(a));
      results.push({ ...entry, status: 'changed', detail: `size ${a.width}×${a.height} → ${b.width}×${b.height}` });
      return;
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
    if (n / (a.width * a.height) > MAX_DIFF_RATIO) {
      writeFileSync(`${REPORT}/img/new-${file}`, png);
      writeFileSync(`${REPORT}/img/old-${file}`, PNG.sync.write(a));
      writeFileSync(`${REPORT}/img/diff-${file}`, PNG.sync.write(diff));
      results.push({ ...entry, status: 'changed', detail: `${n} pixels differ` });
    } else results.push({ ...entry, status: 'same' });
  } catch (e) {
    results.push({ id: s.id, title: s.title, client, mode, status: 'error', detail: e.message.split('\n')[0] });
  } finally { await page.close(); }
}

const queue = [...jobs];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await shoot(queue.shift()); }));
await browser.close();
server.close();

if (update) {
  console.log(`Saved ${readdirSync(BASE).length} baselines to ${BASE}/ (${stories.length} stories × ${COMBOS.length} client/mode combinations).`);
  process.exit(0);
}

const wanted = new Set(jobs.map(({ s, client, mode }) => name(s.id, client, mode)));
const orphans = existsSync(BASE) && !only.length ? readdirSync(BASE).filter((f) => !wanted.has(f)) : [];
const changed = results.filter((r) => r.status === 'changed' || r.status === 'error');
const added = results.filter((r) => r.status === 'new');
const hasBaselines = existsSync(BASE) && readdirSync(BASE).length > 0;

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const row = (r) => `<section><h2>${esc(r.title)} <small>${r.client.toUpperCase()} ${r.mode} · ${esc(r.status)}${r.detail ? ` · ${esc(r.detail)}` : ''}</small></h2><div class="imgs">
  ${r.status === 'changed' ? `<figure><figcaption>Baseline</figcaption><img src="img/old-${r.file}"></figure>` : ''}
  ${r.status !== 'error' ? `<figure><figcaption>${r.status === 'new' ? 'New story' : 'Now'}</figcaption><img src="img/new-${r.file}"></figure>` : ''}
  ${existsSync(`${REPORT}/img/diff-${r.file}`) ? `<figure><figcaption>Difference (red)</figcaption><img src="img/diff-${r.file}"></figure>` : ''}</div></section>`;
writeFileSync(`${REPORT}/index.html`, `<!doctype html><meta charset="utf-8"><title>Visual changes</title>
<style>body{font:14px/1.5 system-ui,sans-serif;margin:24px;color:#1c1f23}h1{font-size:20px}h2{font-size:15px;margin:32px 0 8px}small{font-weight:400;color:#5a5f65}.imgs{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}figure{margin:0;max-width:640px}img{max-width:100%;border:1px solid #dbe0e5}figcaption{color:#5a5f65;margin-bottom:4px}</style>
<h1>${changed.length} changed, ${added.length} new, ${orphans.length} removed</h1>
<p>Approve intended changes with Actions → Design System CI → Run workflow → “Accept the current look of every story as the new visual baseline”.</p>
${changed.map(row).join('')}${added.map(row).join('')}${orphans.length ? `<h2>Baselines with no story any more</h2><ul>${orphans.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}`);

if (!hasBaselines) {
  console.log(`No visual baselines yet (${jobs.length} screenshots taken). Create them with Actions → Design System CI → Run workflow → tick "Accept the current look…", or run npm run check:visual -- --update in CI.`);
  process.exit(0);
}
for (const r of changed) console.error(`✗ ${r.id} [${r.client} ${r.mode}] ${r.detail || r.status}`);
for (const r of added) console.log(`+ ${r.id} [${r.client} ${r.mode}] new story, no baseline yet`);
for (const o of orphans) console.log(`- ${o} has no story any more`);
if (changed.length || orphans.length) {
  console.error(`\n${changed.length} visual change(s)${orphans.length ? `, ${orphans.length} removed` : ''}. See ${REPORT}/index.html (in CI: the visual-report artifact). If they're intended, accept them as the new baseline.`);
  process.exit(1);
}
console.log(`All ${results.length - added.length} screenshots match their baselines${added.length ? `; ${added.length} new screenshot(s) will be added on the next baseline update` : ''}.`);
