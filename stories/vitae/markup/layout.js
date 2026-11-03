// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc, id } from '../_shared.js';
import { MEMBERS } from '../data.js';
import { icon } from '../icons.js';
import { button } from './button.js';
import { tag } from './feedback.js';
import { checkbox } from './selection.js';

/* Small behaviours so the stories can be clicked through. */
export const wireLayout = (storyFn) => {
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

/* ---------- Card ---------- */
export const card = ({ type = 'static', state = 'rest', title = 'Health coverage', withTag = true, body = 'Marcus, Dana, Ava, Leo and Mia are covered through December 31, 2027.', footer = true, name = 'card' } = {}) => {
  const control = type === 'static' ? '' : `<span class="vitae-card__control">${checkbox({ radio: type === 'radio', name, label: null, checked: state.startsWith('selected') ? 'true' : 'false', state: state === 'disabled' ? 'disabled' : 'rest' })}</span>`;
  const cls = `vitae-card${['hover', 'pressed', 'focus', 'error'].includes(state) ? ` is-${state}` : ''}${state === 'selected' ? ' is-selected' : ''}`;
  const inner = `<div class="vitae-card__header"><h4 class="vitae-card__title">${esc(title)}</h4>${control || (withTag ? tag({ type: 'success', label: 'Enrolled' }) : '')}</div><p style="margin:0">${esc(body)}</p>${type === 'static' && footer ? `<div class="vitae-card__footer">${button({ label: 'View details', style: 'outline' })}</div>` : ''}`;
  return type === 'static' ? `<section class="${cls}">${inner}</section>` : `<label class="${cls}">${inner}</label>`;
};

/* ---------- Accordion ---------- */
export const SECTIONS = [['Household', '5 people'], ['Income', '$68,400 / year'], ['Health coverage', ''], ['Review and sign', '']];
const SECTION_PANEL = `<p style="margin:0 0 8px">Marcus Bennett (41), Dana Bennett (39), Ava (16), Leo (11) and Mia (4).</p><a href="#" class="vitae-link vitae-link--standalone">Edit household${icon('arrow-right', 20, 'filled')}</a>`;
// items: [{ title, summary, open, content (HTML) }]
export const accordionItems = ({ items, style = 'divided', expandAll = true, headingLevel = 3 }) => {
  const h = `h${headingLevel}`;
  return `<div class="vitae-accordion vitae-accordion--${style}">
  ${expandAll ? `<div class="vitae-accordion__toolbar"><button type="button" class="vitae-link vitae-link--standalone" style="background:none;border:0;padding:0;font:inherit;font-weight:var(--vitae-font-weight-semibold)">Expand all</button></div>` : ''}
  <div class="vitae-accordion__items">${items.map(({ title, summary = '', open = false, content = '' }) => { const pid = id('acc'); return `<div class="vitae-accordion__item"><${h} class="vitae-accordion__heading"><button type="button" class="vitae-accordion__button" aria-expanded="${open}" aria-controls="${pid}"><span class="vitae-accordion__title">${esc(title)}</span>${summary ? `<span class="vitae-accordion__summary">${esc(summary)}</span>` : ''}${icon('chevron-down', 20, 'filled')}</button></${h}>
    <div class="vitae-accordion__panel" id="${pid}" role="region"${open ? '' : ' hidden'}>${content}</div></div>`; }).join('')}</div></div>`;
};
export const accordion = (style = 'divided', open = [0], expandAll = true) => accordionItems({ style, expandAll, items: SECTIONS.map(([title, summary], i) => ({ title, summary, open: open.includes(i), content: SECTION_PANEL })) });

/* ---------- Modal ---------- */
export const MODAL_ICON = { info: ['info', 'filled'], success: ['success', 'filled'], warning: ['warning', 'two-tone'], error: ['error', 'filled'] };

export const modal = ({ type = 'standard', title = 'Discard your changes?', body = "You haven't saved the changes to your household. If you leave now, they'll be lost.", secondary = true, close = true, primary = 'Discard changes', secondaryLabel = 'Keep editing' } = {}) => {
  const tid = id('modal'); const i = MODAL_ICON[type];
  const level = type === 'warning' ? 'destructive' : 'primary';
  return `<div class="vitae-modal-wrap"><div class="vitae-modal-scrim"><div class="vitae-modal vitae-modal--${type}" role="${['warning', 'error'].includes(type) ? 'alertdialog' : 'dialog'}" aria-modal="true" aria-labelledby="${tid}" aria-describedby="${tid}-d">
    <div class="vitae-modal__header">${i ? icon(i[0], 24, i[1]) : ''}<h2 class="vitae-modal__title" id="${tid}">${esc(title)}</h2>${close ? `<button type="button" class="vitae-modal__close" aria-label="Close">${icon('close', 20, 'filled')}</button>` : ''}</div>
    <p class="vitae-modal__body" id="${tid}-d">${esc(body)}</p>
    <div class="vitae-modal__footer">${secondary ? button({ label: secondaryLabel, style: 'outline', level: type === 'warning' ? 'destructive' : 'primary' }) : ''}${button({ label: primary, level })}</div></div></div></div>`;
};

/* ---------- Table ---------- */
// columns: [{ label, sort: 'ascending' | 'descending' | 'none' | undefined (not sortable), numeric, pinned, hidden (visually hidden header) }]
// rows: [{ cells: [HTML…], selected, label (name used in "Select …") }]
export const dataTable = ({ caption, columns, rows, selectable = false, bulkActions = '', width = '' }) => {
  const nSel = rows.filter((r) => r.selected).length;
  const all = selectable && nSel === rows.length ? 'true' : nSel ? 'indeterminate' : 'false';
  const pin = (c, i) => [c.numeric ? 'is-numeric' : '', c.pinned ? 'is-pinned' : '', c.pinned && !columns[i + 1]?.pinned ? 'is-edge' : ''].filter(Boolean).join(' ');
  const th = (c, i) => { const cls = pin(c, i); return `<th scope="col"${cls ? ` class="${cls}"` : ''}${c.sort && c.sort !== 'none' ? ` aria-sort="${c.sort}"` : ''}>${c.hidden ? `<span class="vitae-visually-hidden">${esc(c.label)}</span>` : c.sort ? `<button type="button" class="vitae-sort">${esc(c.label)}${icon(c.sort === 'ascending' ? 'arrow-up' : c.sort === 'descending' ? 'arrow-down' : 'chevron-expand', 16, 'filled')}</button>` : esc(c.label)}</th>`; };
  return `<div class="vitae-table-wrap" style="${width ? `width:${width}px;` : ''}max-width:100%">
    ${selectable && bulkActions && nSel ? `<div class="vitae-bulkbar" role="region" aria-label="Bulk actions"><strong>${nSel} selected</strong>${bulkActions}</div>` : ''}
    <div class="vitae-table-scroll" tabindex="0" role="region" aria-label="${esc(caption)}">
    <table class="vitae-table${selectable ? ' vitae-table--grid' : ''}"><caption class="vitae-visually-hidden">${esc(caption)}</caption><thead><tr>
      ${selectable ? `<th scope="col" class="is-check is-pinned">${checkbox({ label: 'Select all rows', checked: all, hideLabel: true })}</th>` : ''}
      ${columns.map(th).join('')}
    </tr></thead><tbody>
      ${rows.map((r) => `<tr${selectable && r.selected ? ' aria-selected="true"' : ''}>
        ${selectable ? `<td class="is-check is-pinned">${checkbox({ label: `Select ${r.label}`, checked: r.selected ? 'true' : 'false', hideLabel: true })}</td>` : ''}
        ${r.cells.map((cell, i) => { const cls = pin(columns[i], i); return `<td${cls ? ` class="${cls}"` : ''}>${cell}</td>`; }).join('')}</tr>`).join('')}
    </tbody></table></div></div>`;
};

// The Storybook example: employees (data grid) or payment history (summary), from MEMBERS in data.js.
export const table = ({ layout = 'grid', selected = [1], bulk = true, width = '' } = {}) => {
  const grid = layout === 'grid';
  const rowLink = (t) => `<a href="#" class="vitae-link" style="font-size:14px">${esc(t)}</a>`;
  return dataTable({
    caption: grid ? 'Employees' : 'Payment history', selectable: grid, width,
    bulkActions: bulk ? `${button({ label: 'Send reminder', style: 'outline' })}${button({ label: 'Export', style: 'ghost' })}` : '',
    columns: [
      { label: grid ? 'Name' : 'Member', sort: grid ? 'ascending' : undefined, pinned: grid },
      { label: 'ID', sort: grid ? 'none' : undefined }, { label: 'Status', sort: grid ? 'none' : undefined },
      { label: 'Premium', sort: grid ? 'none' : undefined, numeric: true }, { label: 'Start date' },
      ...(grid ? [{ label: 'Actions', hidden: true, numeric: true }] : []),
    ],
    rows: MEMBERS.map((r, i) => ({
      label: r[0], selected: grid && selected.includes(i),
      cells: [grid ? rowLink(r[0]) : esc(r[0]), esc(r[1]), tag({ type: r[3], label: r[2], showIcon: r[3] !== 'neutral' }), esc(r[4]), esc(r[5]), ...(grid ? [rowLink('View')] : [])],
    })),
  });
};

/* ---------- Menu + Search ---------- */
export const menuItem = ({ label, secondary = '', lead = '', state = 'rest', match = '' }) => {
  const text = match ? esc(label).replace(new RegExp(`(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i'), '<mark>$1</mark>') : esc(label);
  return `<li role="option" class="vitae-menu__item${state === 'hover' || state === 'highlighted' ? ` is-${state}` : ''}"${state === 'selected' ? ' aria-selected="true"' : ''}${state === 'disabled' ? ' aria-disabled="true"' : ''}>${lead ? icon(lead, 20, 'filled') : ''}<span class="vitae-menu__text">${text}${secondary ? `<span class="vitae-menu__secondary">${esc(secondary)}</span>` : ''}</span>${state === 'selected' ? icon('checkmark', 20, 'filled') : ''}</li>`;
};

// A labelled group of options: screen readers announce "Gold, group" before its options.
export const menuGroup = (label, gid, items) => `<li role="none"><ul class="vitae-menu__group-list" role="group" aria-labelledby="${gid}"><li class="vitae-menu__group" id="${gid}" role="presentation">${esc(label)}</li>${items}</ul></li>`;

// entries: item objects (see menuItem), { group, items: [...] } or 'divider'
export const menu = ({ label = '', entries, id: mid = '', style = '' }) => `<ul class="vitae-menu" role="listbox"${mid ? ` id="${mid}"` : ''}${label ? ` aria-label="${esc(label)}"` : ''}${style ? ` style="${style}"` : ''}>${entries.map((e) => (e === 'divider' ? '<li class="vitae-menu__divider" role="none"></li>' : e.group ? menuGroup(e.group, id('menu-group'), e.items.map(menuItem).join('')) : menuItem(e))).join('')}</ul>`;

// results: [{ label, state }] shown once there are 2+ characters
export const search = ({ value = 'kai', open = true, label = 'Search plans', placeholder = 'Search plans', results = [{ label: 'Kaiser Permanente DC Silver 2500/40 HMO', state: 'highlighted' }, { label: 'Kaiser Permanente Gold 0/20', state: 'rest' }] } = {}) => {
  const sid = id('q');
  const shown = value.length >= 2 ? results : [];
  return `<div role="search" style="max-width:360px"><div class="vitae-field"><label for="${sid}" class="vitae-field__label vitae-visually-hidden">${esc(label)}</label>
    <div class="vitae-field__control vitae-popover-anchor">${icon('search', 20, 'filled', { className: 'vitae-icon vitae-icon--leading' })}
      <input type="search" id="${sid}" class="vitae-input vitae-search" placeholder="${esc(placeholder)}" value="${esc(value)}" role="combobox" aria-expanded="${open}" aria-controls="${sid}-list" aria-autocomplete="list">
      ${value ? `<button type="button" class="vitae-search__clear" aria-label="Clear search">${icon('close', 20, 'filled')}</button>` : ''}
      ${open ? menu({ id: `${sid}-list`, style: 'width:100%', entries: shown.map((r) => ({ ...r, match: value })) }) : ''}
    </div></div><p class="vitae-visually-hidden" role="status">${shown.length} result${shown.length === 1 ? '' : 's'}</p></div>`;
};

/* ---------- Date picker ---------- */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// year, month (1–12), selected and today are day numbers in that month (or 0 for none).
export const calendar = ({ year = 2026, month = 10, selected = 14, today = 22 } = {}) => {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const prevDays = new Date(Date.UTC(year, month - 1, 0)).getUTCDate();
  const cells = [
    ...Array.from({ length: first }, (_, i) => [prevDays - first + 1 + i, 'outside']),
    ...Array.from({ length: days }, (_, i) => [i + 1, i + 1 === today ? 'today' : i + 1 === selected ? 'selected' : 'in']),
  ];
  for (let d = 1; cells.length % 7; d++) cells.push([d, 'outside']);
  const weeks = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const mid = id('cal');
  return `<div class="vitae-calendar" role="dialog" aria-modal="true" aria-label="Choose date">
    <div class="vitae-calendar__header"><span id="${mid}">${MONTHS[month - 1]} ${year}</span><span class="vitae-calendar__nav"><button type="button" aria-label="Previous month">${icon('arrow-up', 20, 'regular')}</button><button type="button" aria-label="Next month">${icon('arrow-down', 20, 'regular')}</button></span></div>
    <table class="vitae-calendar__grid" role="grid" aria-labelledby="${mid}"><thead><tr>${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
    <tbody>${weeks.map((w) => `<tr>${w.map(([d, s]) => `<td${s === 'selected' ? ' aria-selected="true"' : ''}><button type="button" class="vitae-day${s === 'outside' ? ' is-outside' : ''}"${s === 'today' ? ' aria-current="date"' : ''} tabindex="${s === 'selected' ? 0 : -1}">${d}</button></td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="vitae-calendar__today"><a href="#" class="vitae-link vitae-link--standalone">Go to today</a></div></div>`;
};

export const datePicker = ({ label = 'Date of birth', value = '10/14/2026', open = true, ...cal } = {}) => {
  const did = id('date');
  return `<div class="vitae-field"><div class="vitae-field__label-row"><label class="vitae-field__label" for="${did}">${esc(label)}</label></div>
      <div class="vitae-field__control vitae-popover-anchor"><input class="vitae-input has-trailing" id="${did}" inputmode="numeric" autocomplete="bday" placeholder="MM/DD/YYYY" value="${esc(value)}" aria-describedby="${did}-hint">
        <button type="button" class="vitae-datepicker__button" aria-label="Choose date" aria-haspopup="dialog" aria-expanded="${open}">${icon('calendar', 20, 'filled')}</button>${open ? calendar(cal) : ''}</div>
      <p class="vitae-field__helper" id="${did}-hint">MM/DD/YYYY</p></div>`;
};

/* ---------- Choice group ---------- */
// options: [{ label, checked, description }]; type 'radio' (choose one) or 'checkbox' (choose any)
export const choiceGroup = ({ legend, helper = '', options, type = 'radio', error = '', inline = false, required = true, name = '' }) => {
  const gid = id('q'); const radio = type === 'radio';
  return `<fieldset class="vitae-choice-group${inline ? ' vitae-choice-group--inline' : ''}"${helper || error ? ` aria-describedby="${[helper ? `${gid}-help` : '', error ? `${gid}-error` : ''].filter(Boolean).join(' ')}"` : ''}${error ? ' aria-invalid="true"' : ''}>
      <legend>${esc(legend)}${required ? ' <span class="vitae-field__required" aria-hidden="true">*</span>' : ''}</legend>
      ${helper ? `<p class="vitae-choice-group__helper" id="${gid}-help">${esc(helper)}</p>` : ''}
      <div class="vitae-choice-group__options">${options.map((o) => checkbox({ radio, name: name || gid, label: o.label, description: o.description || '', checked: o.checked ? 'true' : 'false', state: error ? 'error' : 'rest' })).join('')}</div>
      ${error ? `<p class="vitae-field__error vitae-choice-group__error" id="${gid}-error">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}</fieldset>`;
};

/* ---------- Field-set ---------- */
// rows: [[fieldHTML, …], …]; wrap a State + ZIP pair with fieldsetPair()
export const fieldset = ({ legend, rows }) => `<fieldset class="vitae-fieldset"><legend class="vitae-fieldset__legend">${esc(legend)}</legend>
      <div class="vitae-fieldset__rows">${rows.map((r) => `<div class="vitae-fieldset__row">${r.join('')}</div>`).join('')}</div></fieldset>`;
export const fieldsetPair = (...fields) => `<div class="vitae-fieldset__pair">${fields.join('')}</div>`;
