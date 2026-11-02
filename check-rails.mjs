// Rails parity gate: renders each Vitae Rails component (rails/vitae_components) and the Storybook markup
// function for the same options, and fails if the HTML differs. Also fails if the gem's copies of the CSS
// and icons are stale (run `npm run sync:rails`).
//
//   npm run check:rails
//
// The Ruby side runs with a small ViewComponent stand-in (rails/test/view_component_shim.rb), so it needs
// Ruby but no gems. Ids are generated differently in each, so they are normalized before comparing.
import { createServer } from 'vite';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';

// ---- 1. Gem copies are current ----
const GEM = 'rails/vitae_components';
const same = (a, b) => readFileSync(a, 'utf8') === readFileSync(b, 'utf8');
const stale = [];
if (!same('dist/v2/css/vitae.css', `${GEM}/app/assets/stylesheets/vitae/tokens.css`)) stale.push('tokens.css');
if (!same('stories/vitae/vitae.css', `${GEM}/app/assets/stylesheets/vitae/components.css`)) stale.push('components.css');
const icons = readdirSync('stories/vitae/icons');
if (icons.some((f) => { try { return !same(`stories/vitae/icons/${f}`, `${GEM}/lib/vitae_components/icons/${f}`); } catch { return true; } })) stale.push('icons');
if (stale.length) { console.error(`check-rails: the gem's ${stale.join(', ')} are out of date. Run npm run sync:rails and commit.`); process.exit(1); }

// ---- 2. Markup parity ----
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', configFile: false, optimizeDeps: { noDiscovery: true, entries: [] } });
const load = (m) => vite.ssrLoadModule(`/stories/vitae/markup/${m}.js`);
const { button } = await load('button');
const { link } = await load('link');
const { alert, tag, metalBadge } = await load('feedback');
const { field } = await load('field');
const { checkbox, toggle } = await load('selection');

const cases = [];
const add = (component, rb, html) => cases.push({ component, args: rb, html });
const ICONS = ['', 'add', 'arrow-right'];
for (const style of ['solid', 'outline', 'ghost']) for (const level of ['primary', 'secondary', 'tertiary', 'destructive']) for (const state of ['rest', 'hover', 'pressed', 'focus', 'disabled']) {
  add('ButtonComponent', { label: 'Continue', style, level, state: ['hover', 'pressed', 'focus'].includes(state) ? state : null, disabled: state === 'disabled' }, button({ label: 'Continue', style, level, state }));
}
for (const [l, r] of [['add', ''], ['', 'arrow-right'], ['print', '']]) add('ButtonComponent', { label: 'Add & "go"', icon_left: l || null, icon_right: r || null }, button({ label: 'Add & "go"', iconLeft: l, iconRight: r }));
for (const type of ['inline', 'standalone']) for (const state of ['rest', 'hover', 'pressed', 'focus']) for (const ic of ['arrow-right', 'external-link', '']) {
  add('LinkComponent', { label: 'View plan details', standalone: type === 'standalone', state, icon: ic || null }, link({ label: 'View plan details', type, state, trailingIcon: ic }));
}
for (const type of ['info', 'success', 'warning', 'error']) for (const [title, linkText, dismissible] of [['Your application was submitted', 'View your application', true], ['', '', false]]) {
  add('AlertComponent', { type, title, message: "We'll email you <soon>.", link: linkText || null, dismissible }, alert({ type, title, message: "We'll email you <soon>.", link: linkText, dismissible }));
}
for (const type of ['neutral', 'brand', 'info', 'success', 'warning', 'error', 'current-plan', 'dc-healthy', 'dc-essential', 'me-clear-choice', 'me-current-plan', 'ma-premium-value']) for (const showIcon of [true, false]) {
  add('TagComponent', { label: 'In review', type, show_icon: showIcon }, tag({ label: 'In review', type, showIcon }));
}
for (const level of ['Bronze', 'Silver', 'Gold', 'Platinum', 'Catastrophic']) add('MetalBadgeComponent', { level }, metalBadge(level));
const FIELD = [
  { label: 'Annual income', placeholder: '$0', helper: 'Before taxes, for everyone in your household.', required: true, info: true },
  { label: 'First name', placeholder: 'Placeholder text', value: 'Marcus', error: 'Enter your first name.' },
  { label: 'Email', placeholder: 'name@example.com', leadingIcon: 'mail', showLabel: false },
  { label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar', helper: 'MM/DD/YYYY', error: 'Enter a real date.' },
];
const rbField = (o) => ({ label: o.label, placeholder: o.placeholder, value: o.value ?? null, helper: o.helper ?? null, error: o.error ?? null, required: !!o.required, info: !!o.info, show_label: o.showLabel ?? true, leading_icon: o.leadingIcon ?? null, trailing_icon: o.trailingIcon ?? null });
for (const state of ['rest', 'hover', 'active', 'focus', 'error', 'disabled']) for (const o of FIELD) {
  add('InputComponent', { ...rbField(o), state: state === 'rest' ? null : state }, field({ ...o, state }));
}
const OPTS = ['Single', 'Married filing jointly', 'Head of household'];
for (const state of ['rest', 'hover', 'focus', 'error', 'disabled']) for (const value of ['', 'Single']) {
  const o = { kind: 'select', label: 'Tax filing status', placeholder: 'Select', value, options: OPTS, required: true, error: state === 'error' ? 'Choose a filing status.' : '' };
  add('DropdownComponent', { label: o.label, placeholder: 'Select', value: value || null, options: OPTS, required: true, error: o.error || null, state: state === 'rest' ? null : state }, field({ ...o, state }));
}
for (const radio of [false, true]) for (const checked of radio ? ['false', 'true'] : ['false', 'true', 'indeterminate']) for (const state of ['rest', 'hover', 'active', 'focus', 'error', 'disabled']) for (const extra of [{}, { description: "We'll ask a few questions.", error: 'Choose one.' }]) {
  add(radio ? 'RadioComponent' : 'CheckboxComponent', { label: 'Silver', checked: checked === 'indeterminate' ? 'indeterminate' : checked === 'true', state: state === 'rest' ? null : state, description: extra.description ?? null, error: extra.error ?? null, name: radio ? 'g' : null },
    checkbox({ label: 'Silver', checked, state, radio, ...extra }));
}
for (const on of [false, true]) for (const state of ['rest', 'hover', 'focus', 'disabled']) for (const description of ['', 'We send a reminder 30 days before open enrollment ends.']) {
  add('ToggleComponent', { label: 'Paperless notices', on, state: state === 'rest' ? null : state, description: description || null }, toggle({ label: 'Paperless notices', on, state, description }));
}
await vite.close();

const rendered = JSON.parse(execFileSync('ruby', ['rails/test/render.rb'], { input: JSON.stringify(cases.map(({ component, args }) => ({ component, args }))), maxBuffer: 64 * 1024 * 1024 }).toString());

// Normalize: whitespace between tags, attribute order, generated ids.
const norm = (html) => {
  const ids = new Map();
  const idOf = (v) => { if (!ids.has(v)) ids.set(v, `ID${ids.size}`); return ids.get(v); };
  return html.replace(/&#39;/g, "'").replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/\s+>/g, '>').trim()
    .replace(/<([a-z][\w-]*)((?:\s+[\w:-]+(?:="[^"]*")?)*)\s*(\/?)>/gi, (m, tagName, attrs, slash) => {
      const list = [...attrs.matchAll(/([\w:-]+)(?:="([^"]*)")?/g)].map(([, k, v]) => {
        if (v !== undefined && ['id', 'for', 'aria-describedby', 'aria-labelledby', 'aria-controls'].includes(k)) v = v.split(' ').map(idOf).join(' ');
        return v === undefined ? k : `${k}="${v}"`;
      }).sort();
      return `<${tagName}${list.length ? ` ${list.join(' ')}` : ''}${slash}>`;
    });
};
const failures = cases.filter((c, i) => norm(c.html) !== norm(rendered[i])).map((c) => ({ c, rb: rendered[cases.indexOf(c)] }));
if (failures.length) {
  console.error(`${failures.length} of ${cases.length} Rails components differ from the Storybook markup:\n`);
  for (const { c, rb } of failures.slice(0, 8)) {
    const a = norm(c.html), b = norm(rb); let i = 0; while (a[i] === b[i]) i++;
    console.error(`✗ ${c.component} ${JSON.stringify(c.args)}\n  storybook: …${a.slice(Math.max(0, i - 60), i + 120)}\n  rails:     …${b.slice(Math.max(0, i - 60), i + 120)}\n`);
  }
  process.exit(1);
}
const comps = [...new Set(cases.map((c) => c.component))];
console.log(`All ${cases.length} cases match: ${comps.length} Rails components render the same HTML as Storybook (${comps.join(', ')}).`);
