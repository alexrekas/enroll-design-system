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
const { card, accordionItems, modal, dataTable, menu, search, datePicker, calendar, choiceGroup, fieldset, fieldsetPair } = await load('layout');
const { progressBar } = await load('upload');
const H = (html) => `\u0000html:${html}`; // already-built HTML passed into a Rails component

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

// ---- Batch 2 ----
for (const v of [0, 45, 100]) for (const showLabel of [true, false]) {
  const label = v === 100 ? 'Upload complete' : `Uploading… ${v}%`;
  add('ProgressBarComponent', { value: v, label, name: 'Uploading Employer_letter.pdf', show_label: showLabel }, progressBar({ value: v, label, name: 'Uploading Employer_letter.pdf', showLabel }));
}
for (const state of ['rest', 'hover', 'pressed', 'focus', 'error']) {
  const js = card({ type: 'static', state, title: 'Health coverage', withTag: true, footer: true });
  // card() builds its tag and footer itself; pass the same HTML into the Rails slots
  const tagHtml = js.match(/<span class="vitae-tag[\s\S]*?<\/span>(?=<\/div>)/)[0];
  const footHtml = js.match(/<div class="vitae-card__footer">([\s\S]*?)<\/div><\/section>/)[1];
  cases.push({ component: 'CardComponent', args: { title: 'Health coverage', body: 'Marcus, Dana, Ava, Leo and Mia are covered through December 31, 2027.', state: ['hover', 'pressed', 'focus'].includes(state) ? state : null, error: state === 'error' }, slots: [{ name: 'tag', content: tagHtml }, { name: 'footer', content: footHtml }], html: js });
}
for (const type of ['radio', 'checkbox']) for (const state of ['rest', 'selected', 'disabled']) {
  add('CardComponent', { type, title: 'Monthly payment', body: 'Pay $412.88 on the 1st of each month.', name: 'card', checked: state === 'selected', disabled: state === 'disabled' },
    card({ type, state, title: 'Monthly payment', body: 'Pay $412.88 on the 1st of each month.', name: 'card' }));
}
const ITEMS = [{ title: 'Household', summary: '5 people', open: true, content: '<p>Marcus Bennett (41) &amp; family</p>' }, { title: 'Income', summary: '$68,400 / year', open: false, content: '<p>Jobs</p>' }, { title: 'Review and sign', open: false, content: '' }];
for (const style of ['divided', 'bordered']) for (const expandAll of [true, false]) for (const headingLevel of [2, 3]) {
  cases.push({ component: 'AccordionComponent', args: { style, expand_all: expandAll, heading_level: headingLevel }, slots: ITEMS.map((i) => ({ name: 'item', args: { title: i.title, summary: i.summary ?? null, open: i.open }, content: i.content })), html: accordionItems({ items: ITEMS, style, expandAll, headingLevel }) });
}
for (const [type, title, body, primary, sec] of [['warning', 'Discard your changes?', "You haven't saved the changes.", 'Discard changes', 'Keep editing'], ['standard', 'Submit your application?', "You can't change your answers after you submit.", 'Submit application', 'Go back'], ['success', 'Payment received', 'Your coverage starts January 1, 2027.', 'View coverage', ''], ['error', "We couldn't save", 'Try again.', 'Try again', 'Cancel'], ['info', 'Heads up', 'Info body', 'OK then', 'Cancel']]) for (const close of [true, false]) {
  add('ModalComponent', { type, title, body, primary, secondary_label: sec || 'Cancel', secondary: !!sec, close }, modal({ type, title, body, primary, secondaryLabel: sec, secondary: !!sec, close }));
}
const COLS = [{ label: 'Name', sort: 'ascending', pinned: true }, { label: 'ID', sort: 'none' }, { label: 'Status', sort: 'descending' }, { label: 'Premium', numeric: true }, { label: 'Start date' }, { label: 'Actions', hidden: true, numeric: true }];
const ROWS = [['Marcus Bennett', '1004 2381', '$412.88'], ['Dana <Bennett>', '1004 2382', '$398.10'], ['James Whitaker', 'NB-0007', '$289.40']];
const tableRows = (sel) => ROWS.map(([n, i, p], k) => ({ label: n, selected: sel.includes(k), cells: [`<a href="#" class="vitae-link">${n.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</a>`, i, '<span class="vitae-tag vitae-tag--success">Active</span>', p, '01/01/2027', '<a href="#" class="vitae-link">View</a>'] }));
for (const [selectable, sel, bulk, width] of [[true, [1], true, ''], [true, [], true, ''], [true, [0, 1, 2], false, '560'], [false, [], false, '']]) {
  const rows = tableRows(sel);
  const bulkHtml = bulk ? '<button type="button" class="vitae-btn vitae-btn--outline vitae-btn--primary">Send reminder</button>' : '';
  const jsRows = rows.map((r) => ({ ...r, cells: r.cells.map((c, i) => (i === 1 || i === 3 || i === 4 ? c.replace(/&/g, '&amp;').replace(/</g, '&lt;') : c)) }));
  cases.push({ component: 'TableComponent', args: { caption: 'Employees', selectable, width: width ? Number(width) : null, columns: COLS, rows: rows.map((r) => ({ ...r, cells: r.cells.map((c, i) => (i === 1 || i === 3 || i === 4 ? c : H(c))) })) },
    slots: bulk ? [{ name: 'bulk_actions', content: bulkHtml }] : [], html: dataTable({ caption: 'Employees', columns: COLS, rows: jsRows, selectable, bulkActions: bulkHtml, width }) });
}
const MENU = [{ group: 'Gold', items: [{ label: 'CareFirst Gold $0', secondary: '$442.07 per month', lead: 'health' }, { label: 'Kaiser Gold 0/20', state: 'selected' }] }, 'divider', { label: 'Kaiser Silver', state: 'highlighted' }, { label: 'Off plan', state: 'disabled' }, { label: 'Hover me', state: 'hover', match: 'over' }];
const rbMenu = (es) => es.map((e) => (e === 'divider' ? 'divider' : e.group ? { group: e.group, items: rbMenu(e.items) } : { label: e.label, secondary: e.secondary ?? null, icon: e.lead || null, state: e.state ?? null, match: e.match ?? null }));
for (const label of ['Plan', '']) add('MenuComponent', { label: label || null, entries: rbMenu(MENU) }, menu({ label, entries: MENU }));
const RESULTS = [{ label: 'Kaiser Permanente DC Silver 2500/40 HMO', state: 'highlighted' }, { label: 'Kaiser Permanente Gold 0/20', state: 'rest' }];
for (const [value, open] of [['kai', true], ['k', true], ['', false], ['kai', false]]) {
  add('SearchComponent', { label: 'Search plans', value, open, results: RESULTS }, search({ value, open, results: RESULTS }));
}
for (const [y, m, sel, today] of [[2026, 10, 14, 22], [2027, 2, 0, 3], [2026, 11, 30, 0]]) {
  const iso = (d) => (d ? `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` : null);
  add('CalendarComponent', { month: iso(1), selected: iso(sel), today: iso(today) || '1999-01-01' }, calendar({ year: y, month: m, selected: sel, today }));
  for (const open of [true, false]) add('DatePickerComponent', { label: 'Date of birth', value: '10/14/2026', open, month: iso(1), selected: iso(sel), today: iso(today) || '1999-01-01' }, datePicker({ label: 'Date of birth', value: '10/14/2026', open, year: y, month: m, selected: sel, today }));
}
for (const type of ['radio', 'checkbox']) for (const [error, helper] of [['', 'Pregnancy can affect what coverage people qualify for.'], ['Choose Yes or No.', ''], ['Pick one.', 'Select all that apply.']]) for (const inline of [false, true]) {
  const options = [{ label: 'Yes', checked: true }, { label: 'No', description: "We'll ask more." }];
  add('ChoiceGroupComponent', { legend: 'Is anyone pregnant?', type, name: 'preg', helper: helper || null, error: error || null, inline, options },
    choiceGroup({ legend: 'Is anyone pregnant?', type, name: 'preg', helper, error, inline, options }));
}
{
  const f1 = field({ label: 'Address line 1', value: '25 Sample Rd', required: true, width: 'full' });
  const pair = fieldsetPair(field({ label: 'State', kind: 'select', value: 'ME', options: ['DC', 'MA', 'ME'] }), field({ label: 'ZIP code', value: '04101' }));
  const f2 = field({ label: 'City', value: 'Portland' });
  cases.push({ component: 'FieldsetComponent', args: { legend: 'Home address' }, slots: [{ name: 'row', content: f1 }, { name: 'row', content: f2 + pair }], html: fieldset({ legend: 'Home address', rows: [[f1], [f2, pair]] }) });
  cases.push({ component: 'FieldsetComponent::PairComponent', args: {}, content: H('<b>x</b>'), html: fieldsetPair('<b>x</b>') });
  add('InputComponent', { label: 'County', width: 'half', placeholder: '' }, field({ label: 'County', width: 'half', placeholder: '' }));
}
await vite.close();

const rendered = JSON.parse(execFileSync('ruby', ['rails/test/render.rb'], { input: JSON.stringify(cases.map(({ component, args, slots, content }) => ({ component, args, slots, content }))), maxBuffer: 64 * 1024 * 1024 }).toString());

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
