import { canvas, figma, esc, id, matrix } from './_shared.js';
import { icon } from './icons.js';
import { button } from './button.stories.js';
import { field } from './field.stories.js';
import { checkbox } from './selection.stories.js';
import { tag } from './feedback.stories.js';

/* Small behaviours so the stories can be clicked through. */
const wire = (storyFn) => {
  const el = storyFn();
  setTimeout(() => {
    document.querySelectorAll('[data-indeterminate]').forEach((i) => { i.indeterminate = true; });
    document.querySelectorAll('.vitae-accordion__button').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', String(open)); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; });
    });
    document.querySelectorAll('.vitae-table-scroll').forEach((s) => {
      if (s.dataset.wired) return; s.dataset.wired = '1';
      s.addEventListener('scroll', () => s.classList.toggle('is-scrolled', s.scrollLeft > 0));
    });
  });
  return el;
};

export default {
  title: 'Vitae 27/Components/Layout and data',
  tags: ['autodocs'],
  excludeStories: /^[a-z]/,
  decorators: [wire, canvas],
};

/* ---------- Card ---------- */
const card = ({ type = 'static', state = 'rest', title = 'Health coverage', withTag = true, body = 'Marcus, Dana, Ava, Leo and Mia are covered through December 31, 2027.', footer = true, name = 'card' } = {}) => {
  const control = type === 'static' ? '' : `<span class="vitae-card__control">${checkbox({ radio: type === 'radio', name, label: '', checked: state.startsWith('selected') ? 'true' : 'false', state: state === 'disabled' ? 'disabled' : 'rest' }).replace(/<label[^>]*><\/label>/, '')}</span>`;
  const cls = `vitae-card${['hover', 'pressed', 'focus', 'error'].includes(state) ? ` is-${state}` : ''}${state === 'selected' ? ' is-selected' : ''}`;
  const inner = `<div class="vitae-card__header"><h4 class="vitae-card__title">${esc(title)}</h4>${control || (withTag ? tag({ type: 'success', label: 'Enrolled' }) : '')}</div><p style="margin:0">${esc(body)}</p>${type === 'static' && footer ? `<div class="vitae-card__footer">${button({ label: 'View details', style: 'outline' })}</div>` : ''}`;
  return type === 'static' ? `<section class="${cls}">${inner}</section>` : `<label class="${cls}">${inner}</label>`;
};

export const Card = {
  args: { type: 'static', state: 'rest', title: 'Health coverage', withTag: true, footer: true },
  argTypes: { type: { control: 'inline-radio', options: ['static', 'radio', 'checkbox'] }, state: { control: 'select', options: ['rest', 'hover', 'pressed', 'focus', 'selected', 'error', 'disabled'] } },
  render: (args) => card(args),
  parameters: {
    design: figma('183:349', 'Card'),
    docs: { description: { story: `
\`--vitae-card-surface\`, 1px \`--vitae-border-subtle\`, Elevation 8, card radius, 24px padding, 16px between sections. **Static** cards hold a title, optional tag, content and an optional footer with actions.

**Radio / Checkbox** cards are selectable: the whole card is the \`<label>\` for a real input, so it behaves like the form control. Selected: 2px \`--vitae-action-primary\` border on \`--vitae-nav-item-selected\`. Keep one interactive target per selectable card (no buttons inside). Use sparingly: most Enroll pages are forms, not card grids.` } },
  },
};

export const CardStates = {
  name: 'Card · selectable states',
  render: () => matrix(3, ['rest', 'hover', 'pressed', 'focus', 'selected', 'error', 'disabled'].map((s) => [s, card({ type: 'radio', state: s, title: 'Monthly payment', body: 'Pay $412.88 on the 1st of each month.', name: `c-${s}` })])),
  parameters: { design: figma('183:349', 'Card') },
};

/* ---------- Accordion ---------- */
const SECTIONS = [['Household', '5 people'], ['Income', '$68,400 / year'], ['Health coverage', ''], ['Review and sign', '']];
const accordion = (style = 'divided', open = [0], expandAll = true) => `<div class="vitae-accordion vitae-accordion--${style}">
  ${expandAll ? `<div class="vitae-accordion__toolbar"><button type="button" class="vitae-link vitae-link--standalone" style="background:none;border:0;padding:0;font:inherit;font-weight:var(--vitae-font-weight-semibold)">Expand all</button></div>` : ''}
  <div class="vitae-accordion__items">${SECTIONS.map(([t, s], i) => { const pid = id('acc'); const isOpen = open.includes(i); return `<div class="vitae-accordion__item"><h3 class="vitae-accordion__heading"><button type="button" class="vitae-accordion__button" aria-expanded="${isOpen}" aria-controls="${pid}"><span class="vitae-accordion__title">${esc(t)}</span>${s ? `<span class="vitae-accordion__summary">${esc(s)}</span>` : ''}${icon('chevron-down', 20, 'filled')}</button></h3>
    <div class="vitae-accordion__panel" id="${pid}" role="region"${isOpen ? '' : ' hidden'}><p style="margin:0 0 8px">Marcus Bennett (41), Dana Bennett (39), Ava (16), Leo (11) and Mia (4).</p><a href="#" class="vitae-link vitae-link--standalone">Edit household${icon('arrow-right', 20, 'filled')}</a></div></div>`; }).join('')}</div></div>`;

export const Accordion = {
  args: { style: 'divided', expandAll: true },
  argTypes: { style: { control: 'inline-radio', options: ['divided', 'bordered'] } },
  render: ({ style, expandAll }) => `<div style="max-width:720px">${accordion(style, [0], expandAll)}</div>`,
  parameters: {
    design: [figma('188:180', 'Accordion'), figma('188:90', 'Accordion/Item')],
    docs: { description: { story: `
Sections open independently; click a header here to toggle it. 56px headers with an optional summary (a price, "3 filters applied"). **Divided** for FAQs, plan details and filters; **Bordered** wraps the rows in one card for review pages.

- The header is a \`<button aria-expanded aria-controls>\` inside a heading (h2–h4 to fit the page outline); the panel is a region labelled by the button.
- On review pages put "Edit" links in the panel, never in the header, so the header stays one button.
- Opens over 150ms with the entrance easing; no motion under reduced motion.` } },
  },
};

/* ---------- Modal ---------- */
const MODAL_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'] };
const modal = ({ type = 'standard', title = 'Discard your changes?', body = "You haven't saved the changes to your household. If you leave now, they'll be lost.", secondary = true, close = true, primary = 'Discard changes', secondaryLabel = 'Keep editing' } = {}) => {
  const tid = id('modal'); const i = MODAL_ICON[type];
  const level = type === 'warning' ? 'destructive' : 'primary';
  return `<div class="vitae-modal-wrap"><div class="vitae-modal-scrim"><div class="vitae-modal vitae-modal--${type}" role="${['warning', 'error'].includes(type) ? 'alertdialog' : 'dialog'}" aria-modal="true" aria-labelledby="${tid}" aria-describedby="${tid}-d">
    <div class="vitae-modal__header">${i ? icon(i[0], 24, i[1]) : ''}<h2 class="vitae-modal__title" id="${tid}">${esc(title)}</h2>${close ? `<button type="button" class="vitae-modal__close" aria-label="Close">${icon('close', 20, 'filled')}</button>` : ''}</div>
    <p class="vitae-modal__body" id="${tid}-d">${esc(body)}</p>
    <div class="vitae-modal__footer">${secondary ? button({ label: secondaryLabel, style: 'outline', level: type === 'warning' ? 'destructive' : 'primary' }) : ''}${button({ label: primary, level })}</div></div></div></div>`;
};

export const Modal = {
  args: { type: 'warning', title: 'Discard your changes?', body: "You haven't saved the changes to your household. If you leave now, they'll be lost.", primary: 'Discard changes', secondaryLabel: 'Keep editing', secondary: true, close: true },
  argTypes: { type: { control: 'inline-radio', options: ['standard', 'info', 'success', 'warning', 'error'] } },
  render: (args) => modal(args),
  parameters: {
    design: figma('112:124', 'Modal'),
    docs: { description: { story: `
Blocking dialog for a decision or important status. 560px wide (full width minus 32px on small screens), title in Heading/Dialog, Outline + Solid buttons on the right; below 600px they stack full width with the primary on top. Warning uses Destructive buttons when the action loses data.

- Prefer the native \`<dialog>\` with \`showModal()\`. \`role="dialog"\` (\`alertdialog\` for Warning/Error), \`aria-modal="true"\`, labelled by the title and described by the body.
- On open move focus inside (the least destructive action, or the title for long content); trap Tab; Esc and Close dismiss except for required decisions; return focus to the trigger.
- Label buttons with verbs ("Discard changes"), never OK/Yes. Don't stack modals. Long bodies scroll inside the dialog.
- Opens with a fade and 96%→100% scale over 240ms; fade only under reduced motion.` } },
  },
};

export const ModalTypes = {
  name: 'Modal · types',
  render: () => `<div style="display:grid;gap:16px">${[
    ['standard', 'Submit your application?', "You can't change your answers after you submit.", 'Submit application', 'Go back'],
    ['success', 'Payment received', 'Your coverage starts January 1, 2027.', 'View coverage', ''],
    ['error', "We couldn't save your changes", 'Check your connection and try again.', 'Try again', 'Cancel'],
  ].map(([type, title, body, primary, sec]) => modal({ type, title, body, primary, secondaryLabel: sec, secondary: !!sec })).join('')}</div>`,
  parameters: { design: figma('112:124', 'Modal') },
};

/* ---------- Table ---------- */
const ROWS = [
  ['Marcus Bennett', '1004 2381', 'Active', 'success', '$412.88', '01/01/2027'],
  ['Dana Bennett', '1004 2382', 'Active', 'success', '$398.10', '01/01/2027'],
  ['James Whitaker', 'NB-0007', 'Pending', 'info', '$289.40', '02/01/2027'],
  ['Hannah Cole', 'NB-0001', 'Action needed', 'warning', '$0.00', '—'],
  ['Erin Whitaker', 'NB-0008', 'Terminated', 'neutral', '$0.00', '12/31/2026'],
];
const table = ({ layout = 'grid', selected = [1], bulk = true, width = '' } = {}) => {
  const grid = layout === 'grid';
  const all = selected.length === ROWS.length ? 'true' : selected.length ? 'indeterminate' : 'false';
  const th = (label, sort, numeric) => `<th scope="col"${numeric ? ' class="is-numeric"' : ''}${sort && sort !== 'none' ? ` aria-sort="${sort}"` : ''}>${sort ? `<button type="button" class="vitae-sort">${esc(label)}${icon(sort === 'ascending' ? 'arrow-up' : sort === 'descending' ? 'arrow-down' : 'chevron-expand', 16, 'filled')}</button>` : esc(label)}</th>`;
  return `<div class="vitae-table-wrap" style="${width ? `width:${width}px;` : ''}max-width:100%">
    ${grid && bulk && selected.length ? `<div class="vitae-bulkbar" role="region" aria-label="Bulk actions"><strong>${selected.length} selected</strong>${button({ label: 'Send reminder', style: 'outline' })}${button({ label: 'Export', style: 'ghost' })}</div>` : ''}
    <div class="vitae-table-scroll" tabindex="0" role="region" aria-label="${grid ? 'Employees' : 'Payment history'}">
    <table class="vitae-table${grid ? ' vitae-table--grid' : ''}"><caption class="vitae-visually-hidden">${grid ? 'Employees' : 'Payment history'}</caption><thead><tr>
      ${grid ? `<th scope="col" class="is-check is-pinned">${checkbox({ label: 'Select all rows', checked: all }).replace('class="vitae-check__label"', 'class="vitae-check__label vitae-visually-hidden"')}</th>` : ''}
      ${grid ? '<th scope="col" class="is-pinned is-edge">' + '<button type="button" class="vitae-sort">Name' + icon('arrow-up', 16, 'filled') + '</button></th>' : th('Member')}
      ${th('ID', grid ? 'none' : '')}${th('Status', grid ? 'none' : '')}${th('Premium', grid ? 'none' : '', true)}${th('Start date')}${grid ? '<th scope="col"><span class="vitae-visually-hidden">Actions</span></th>' : ''}
    </tr></thead><tbody>
      ${ROWS.map((r, i) => `<tr${grid && selected.includes(i) ? ' aria-selected="true"' : ''}>
        ${grid ? `<td class="is-check is-pinned">${checkbox({ label: `Select ${r[0]}`, checked: selected.includes(i) ? 'true' : 'false' }).replace('class="vitae-check__label"', 'class="vitae-check__label vitae-visually-hidden"')}</td>` : ''}
        <td class="${grid ? 'is-pinned is-edge' : ''}">${grid ? `<a href="#" class="vitae-link" style="font-size:14px">${esc(r[0])}</a>` : esc(r[0])}</td><td>${esc(r[1])}</td><td>${tag({ type: r[3], label: r[2], showIcon: r[3] !== 'neutral' })}</td><td class="is-numeric">${esc(r[4])}</td><td>${esc(r[5])}</td>
        ${grid ? '<td class="is-numeric"><a href="#" class="vitae-link" style="font-size:14px">View</a></td>' : ''}</tr>`).join('')}
    </tbody></table></div></div>`;
};

export const Table = {
  args: { layout: 'grid', bulk: true, width: '' },
  argTypes: { layout: { control: 'inline-radio', options: ['grid', 'summary'] }, width: { control: 'inline-radio', options: ['', '560', '375'] } },
  render: (args) => table({ ...args, selected: args.layout === 'grid' ? [1] : [] }),
  parameters: {
    design: [figma('255:2897', 'Table'), figma('190:47', 'Table/Header cell'), figma('190:88', 'Table/Cell')],
    docs: { description: { story: `
**Data grid** (admin, broker): select-all header checkbox, row checkboxes, sortable headers, a link to the record, status tags, right-aligned numbers, a row action and the bulk bar. **Summary** (plan details, payment history): read-only. Set **width** to 560 or 375 to see it scroll sideways with the pinned first column.

- A real \`<table>\` with a caption (can be visually hidden), inside a scroll container with \`tabindex="0"\`, \`role="region"\` and an \`aria-label\`.
- Columns never squeeze or wrap: the first column stretches, the rest keep their width, and the table scrolls sideways. Pin the checkbox + Name with \`position: sticky\` and show its edge shadow only while scrolled.
- Select all is labelled "Select all rows" (visually hidden), \`indeterminate\` with \`aria-checked="mixed"\` when some rows are checked; it selects the current page (offer "Select all 312" in the bulk bar).
- Sortable headers: a button inside \`<th scope="col">\`; \`aria-sort\` on the sorted column only (arrow in \`--vitae-icon-brand\`).
- Numbers use tabular figures. Row hover only when the row is clickable or selectable.` } },
  },
};

/* ---------- Menu + Search ---------- */
const menuItem = ({ label, secondary = '', lead = '', state = 'rest', match = '' }) => {
  const text = match ? esc(label).replace(new RegExp(`(${match})`, 'i'), '<mark>$1</mark>') : esc(label);
  return `<li role="option" class="vitae-menu__item${state === 'hover' || state === 'highlighted' ? ` is-${state}` : ''}"${state === 'selected' ? ' aria-selected="true"' : ''}${state === 'disabled' ? ' aria-disabled="true"' : ''}>${lead ? icon(lead, 20, 'filled') : ''}<span class="vitae-menu__text">${text}${secondary ? `<span class="vitae-menu__secondary">${esc(secondary)}</span>` : ''}</span>${state === 'selected' ? icon('checkmark', 20, 'filled') : ''}</li>`;
};

export const Menu = {
  render: () => matrix(2, [
    ['Item states', `<ul class="vitae-menu" role="listbox" aria-label="Plan">${[['Rest', 'rest'], ['Hover', 'hover'], ['Highlighted (keyboard)', 'highlighted'], ['Selected', 'selected'], ['Disabled', 'disabled']].map(([l, s]) => menuItem({ label: l, state: s })).join('')}</ul>`],
    ['Groups, secondary text and icons', `<ul class="vitae-menu" role="listbox" aria-label="Plan"><li class="vitae-menu__group" role="presentation">Gold</li>${menuItem({ label: 'CareFirst BlueChoice HMO Gold $0', secondary: '$442.07 per month', lead: 'health' })}${menuItem({ label: 'Kaiser Permanente Gold 0/20', secondary: '$468.30 per month', lead: 'health', state: 'selected' })}<li class="vitae-menu__divider" role="separator"></li><li class="vitae-menu__group" role="presentation">Silver</li>${menuItem({ label: 'Kaiser Permanente DC Silver 2500/40 HMO', secondary: '$389.15 per month', lead: 'health' })}</ul>`],
  ]),
  parameters: {
    design: [figma('86:50', 'Menu'), figma('86:43', 'Menu/Item')],
    docs: { description: { story: `
Floating list used by the custom Dropdown, Search suggestions and header menus. Same width as its trigger, 4px below it (flips above when there's no room), max 320px tall then scrolls. Items are 40px; **Highlighted** (keyboard, via \`aria-activedescendant\`) adds a dashed ring inside the item; **Selected** shows a check.

- \`role="listbox"\` / \`option\` for Dropdown and Search; \`role="menu"\` / \`menuitem\` for action menus.
- ↑/↓ move (wrapping), Home/End, Enter selects, Esc closes and returns focus to the trigger, typing jumps to matches.` } },
  },
};

const search = ({ value = 'kai', open = true } = {}) => {
  const sid = id('q');
  const results = [['Kaiser Permanente DC Silver 2500/40 HMO', 'highlighted'], ['Kaiser Permanente Gold 0/20', 'rest']];
  return `<div role="search" style="max-width:360px"><div class="vitae-field"><label for="${sid}" class="vitae-field__label vitae-visually-hidden">Search plans</label>
    <div class="vitae-field__control vitae-popover-anchor">${icon('search', 20, 'filled', { className: 'vitae-icon vitae-icon--leading' })}
      <input type="search" id="${sid}" class="vitae-input vitae-search" placeholder="Search plans" value="${esc(value)}" role="combobox" aria-expanded="${open}" aria-controls="${sid}-list" aria-autocomplete="list">
      ${value ? `<button type="button" class="vitae-search__clear" aria-label="Clear search">${icon('close', 20, 'filled')}</button>` : ''}
      ${open ? `<ul class="vitae-menu" role="listbox" id="${sid}-list" style="width:100%">${value.length >= 2 ? results.map(([l, s]) => menuItem({ label: l, state: s, match: value })).join('') : ''}</ul>` : ''}
    </div></div><p class="vitae-visually-hidden" role="status">2 results</p></div>`;
};

export const Search = {
  args: { value: 'kai', open: true },
  render: (args) => `<div style="min-height:220px">${search(args)}</div>`,
  parameters: {
    design: figma('87:3', 'Search'),
    docs: { description: { story: `
Input with a decorative leading Search icon and a Clear button once there's text. Keep a label for screen readers even when it's visually hidden; never rely on the placeholder. Hide the browser's own clear button for \`type="search"\`.

- Enter submits. Esc closes suggestions, or clears the text if they're closed. Clear empties the field and returns focus to it.
- Suggestions open after 2+ characters in a Menu (\`role="listbox"\`) with the matched text in SemiBold; "No results" uses the empty state. Announce result counts politely.` } },
  },
};

/* ---------- Date picker ---------- */
const calendar = () => {
  const days = []; // October 2026 starts on a Thursday
  for (let d = 1; d <= 31; d++) days.push(d);
  const lead = [27, 28, 29, 30];
  const cells = [...lead.map((d) => [d, 'outside']), ...days.map((d) => [d, d === 22 ? 'today' : d === 14 ? 'selected' : 'in'])];
  const weeks = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return `<div class="vitae-calendar" role="dialog" aria-modal="true" aria-label="Choose date">
    <div class="vitae-calendar__header"><span id="cal-m">October 2026</span><span class="vitae-calendar__nav"><button type="button" aria-label="Previous month">${icon('arrow-up', 20, 'regular')}</button><button type="button" aria-label="Next month">${icon('arrow-down', 20, 'regular')}</button></span></div>
    <table class="vitae-calendar__grid" role="grid" aria-labelledby="cal-m"><thead><tr>${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
    <tbody>${weeks.map((w) => `<tr>${w.map(([d, s]) => `<td><button type="button" class="vitae-day${s === 'outside' ? ' is-outside' : ''}"${s === 'today' ? ' aria-current="date"' : ''}${s === 'selected' ? ' aria-selected="true"' : ''} tabindex="${s === 'selected' ? 0 : -1}">${d}</button></td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="vitae-calendar__today"><a href="#" class="vitae-link vitae-link--standalone">Go to today</a></div></div>`;
};

export const DatePicker = {
  name: 'Date picker',
  args: { open: true },
  render: ({ open }) => {
    const did = id('date');
    return `<div style="min-height:${open ? 420 : 120}px"><div class="vitae-field"><div class="vitae-field__label-row"><label class="vitae-field__label" for="${did}">Date of birth</label></div>
      <div class="vitae-field__control vitae-popover-anchor"><input class="vitae-input has-trailing" id="${did}" inputmode="numeric" autocomplete="bday" placeholder="MM/DD/YYYY" value="10/14/2026" aria-describedby="${did}-hint">
        <button type="button" class="vitae-datepicker__button" aria-label="Choose date" aria-haspopup="dialog" aria-expanded="${open}">${icon('calendar', 20, 'filled')}</button>${open ? calendar() : ''}</div>
      <p class="vitae-field__helper" id="${did}-hint">MM/DD/YYYY</p></div></div>`;
  },
  parameters: {
    design: [figma('73:6441', 'Date picker'), figma('73:21', 'Calendar'), figma('73:20', 'Calendar/Day')],
    docs: { description: { story: `
Typed MM/DD/YYYY entry with an optional calendar. Typing always works, so date of birth never needs the calendar (\`inputmode="numeric"\`, \`autocomplete="bday"\`). Keep the format hint visible. Validate on blur; impossible dates (02/30) show the error state.

- The 44×44 calendar button has \`aria-label="Choose date"\`, \`aria-haspopup="dialog"\` and \`aria-expanded\`. The calendar opens 4px below; picking a day writes the date and returns focus to the input.
- Calendar: \`role="dialog"\` with a \`role="grid"\` labelled by the month. Arrows move a day or week, PageUp/PageDown a month (Shift for a year), Home/End the week, Enter/Space selects, Esc closes.
- Days: today is a filled brand circle (\`aria-current="date"\`), selected has a brand border (\`aria-selected="true"\`), outside days are secondary, disabled days \`aria-disabled="true"\`.` } },
  },
};

/* ---------- Choice group + Field-set ---------- */
export const ChoiceGroup = {
  name: 'Choice group',
  args: { type: 'radio', error: false, inline: false },
  argTypes: { type: { control: 'inline-radio', options: ['radio', 'checkbox'] } },
  render: ({ type, error, inline }) => {
    const gid = id('q'); const radio = type === 'radio';
    const opts = radio ? ['Yes', 'No'] : ['Medicare', 'Medicaid or CHIP', 'Coverage through a job', 'VA health care'];
    return `<fieldset class="vitae-choice-group${inline ? ' vitae-choice-group--inline' : ''}" aria-describedby="${gid}-help${error ? ` ${gid}-error` : ''}"${error ? ' aria-invalid="true"' : ''}>
      <legend>${radio ? 'Is anyone in your household pregnant?' : 'Does anyone have other health coverage?'} <span class="vitae-field__required" aria-hidden="true">*</span></legend>
      <p class="vitae-choice-group__helper" id="${gid}-help">${radio ? 'Pregnancy can affect what coverage people qualify for.' : 'Select all that apply.'}</p>
      <div class="vitae-choice-group__options">${opts.map((o) => checkbox({ radio, name: gid, label: o, state: error ? 'error' : 'rest' })).join('')}</div>
      ${error ? `<p class="vitae-field__error vitae-choice-group__error" id="${gid}-error">${icon('error', 16, 'filled')}<span>${radio ? 'Choose Yes or No.' : 'Choose at least one, or None of these.'}</span></p>` : ''}</fieldset>`;
  },
  parameters: {
    design: figma('74:800', 'Choice group'),
    docs: { description: { story: 'A question with Radio (choose one) or Checkbox (choose any) options. Legend styled like a field label with the required asterisk; optional helper. The error message sits below all the options so it reads as belonging to the question, and every option shows the error border. `<fieldset aria-describedby="q-help q-error" aria-invalid="true"><legend>…</legend>`. Inline layout is fine for 2–3 short options (24px gap).' } },
  },
};

export const FieldSet = {
  name: 'Field-set',
  args: { type: 'Address', width: 720 },
  argTypes: { type: { control: 'inline-radio', options: ['Name', 'Address', 'Contact'] }, width: { control: 'inline-radio', options: [720, 480, 320] } },
  render: ({ type, width }, { globals }) => {
    const client = globals.theme || 'ea';
    const f = (o) => field({ helper: '', info: false, required: true, placeholder: '', ...o });
    const rows = {
      Name: [[f({ label: 'First name', value: 'Marcus' }), f({ label: 'Last name', value: 'Bennett' })], [f({ label: 'Suffix (optional)', required: false, kind: 'select', placeholder: 'Select', options: ['Jr.', 'Sr.', 'II', 'III'] }), f({ label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar' })]],
      Address: [[f({ label: client === 'dc' ? 'Address line 1 (number, street, quadrant)' : 'Address line 1', value: client === 'dc' ? '1420 Example St NW' : '25 Sample Rd' }).replace('class="vitae-field"', 'class="vitae-field is-full"')], [f({ label: 'Address line 2 (optional)', required: false }).replace('class="vitae-field"', 'class="vitae-field is-full"')],
        [f({ label: 'City', value: client === 'dc' ? 'Washington' : 'Portland' }), `<div class="vitae-fieldset__pair">${f({ label: 'State', kind: 'select', value: client === 'dc' ? 'DC' : 'ME', options: ['DC', 'MA', 'ME'] })}${f({ label: 'ZIP code', value: client === 'dc' ? '20009' : '04101' })}</div>`],
        ...(client === 'me' ? [[f({ label: 'County', kind: 'select', placeholder: 'Select', options: ['Cumberland', 'York'] }).replace('class="vitae-field"', 'class="vitae-field is-half"')]] : [])],
      Contact: [[f({ label: 'Phone number', value: '(202) 555-0142' }), f({ label: 'Email', value: 'marcus.bennett@example.com' })]],
    }[type];
    return `<div style="width:${width}px;max-width:100%"><fieldset class="vitae-fieldset"><legend class="vitae-fieldset__legend">${type === 'Name' ? 'Your name' : type === 'Address' ? 'Home address' : 'Contact information'}</legend>
      <div class="vitae-fieldset__rows">${rows.map((r) => `<div class="vitae-fieldset__row">${r.join('')}</div>`).join('')}</div></fieldset></div>`;
  },
  parameters: {
    design: figma('242:2295', 'Field-set'),
    docs: { description: { story: `
A labeled group of related fields that reflows with width (change **width**). At 720px paired fields are half width and City | State | ZIP splits 6 / 3 / 3; below about 504px pairs stack; State and ZIP stay side by side until about 264px. Switch **Theme**: DC's Address line 1 label asks for the quadrant, and ME adds a required County.

- \`<fieldset class="vitae-fieldset">\` with \`<legend class="vitae-fieldset__legend">\`; build rows with \`flex-wrap\` and minimum widths (pairs 240px, City 240px, State + ZIP 240px, each 120px, County 240–348px).
- Use autocomplete tokens: given-name, family-name, honorific-suffix, bday, address-line1, address-level2, address-level1, postal-code, tel, email. County has none.
- Mark optional fields "(optional)"; required fields use the red asterisk.` } },
  },
};
