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
  const control = type === 'static' ? '' : `<span class="vitae-card__control">${checkbox({ radio: type === 'radio', name, label: '', checked: state.startsWith('selected') ? 'true' : 'false', state: state === 'disabled' ? 'disabled' : 'rest' }).replace(/<label[^>]*><\/label>/, '')}</span>`;
  const cls = `vitae-card${['hover', 'pressed', 'focus', 'error'].includes(state) ? ` is-${state}` : ''}${state === 'selected' ? ' is-selected' : ''}`;
  const inner = `<div class="vitae-card__header"><h4 class="vitae-card__title">${esc(title)}</h4>${control || (withTag ? tag({ type: 'success', label: 'Enrolled' }) : '')}</div><p style="margin:0">${esc(body)}</p>${type === 'static' && footer ? `<div class="vitae-card__footer">${button({ label: 'View details', style: 'outline' })}</div>` : ''}`;
  return type === 'static' ? `<section class="${cls}">${inner}</section>` : `<label class="${cls}">${inner}</label>`;
};

/* ---------- Accordion ---------- */
export const SECTIONS = [['Household', '5 people'], ['Income', '$68,400 / year'], ['Health coverage', ''], ['Review and sign', '']];

export const accordion = (style = 'divided', open = [0], expandAll = true) => `<div class="vitae-accordion vitae-accordion--${style}">
  ${expandAll ? `<div class="vitae-accordion__toolbar"><button type="button" class="vitae-link vitae-link--standalone" style="background:none;border:0;padding:0;font:inherit;font-weight:var(--vitae-font-weight-semibold)">Expand all</button></div>` : ''}
  <div class="vitae-accordion__items">${SECTIONS.map(([t, s], i) => { const pid = id('acc'); const isOpen = open.includes(i); return `<div class="vitae-accordion__item"><h3 class="vitae-accordion__heading"><button type="button" class="vitae-accordion__button" aria-expanded="${isOpen}" aria-controls="${pid}"><span class="vitae-accordion__title">${esc(t)}</span>${s ? `<span class="vitae-accordion__summary">${esc(s)}</span>` : ''}${icon('chevron-down', 20, 'filled')}</button></h3>
    <div class="vitae-accordion__panel" id="${pid}" role="region"${isOpen ? '' : ' hidden'}><p style="margin:0 0 8px">Marcus Bennett (41), Dana Bennett (39), Ava (16), Leo (11) and Mia (4).</p><a href="#" class="vitae-link vitae-link--standalone">Edit household${icon('arrow-right', 20, 'filled')}</a></div></div>`; }).join('')}</div></div>`;

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

export const table = ({ layout = 'grid', selected = [1], bulk = true, width = '' } = {}) => {
  const grid = layout === 'grid';
  const all = selected.length === MEMBERS.length ? 'true' : selected.length ? 'indeterminate' : 'false';
  const th = (label, sort, numeric) => `<th scope="col"${numeric ? ' class="is-numeric"' : ''}${sort && sort !== 'none' ? ` aria-sort="${sort}"` : ''}>${sort ? `<button type="button" class="vitae-sort">${esc(label)}${icon(sort === 'ascending' ? 'arrow-up' : sort === 'descending' ? 'arrow-down' : 'chevron-expand', 16, 'filled')}</button>` : esc(label)}</th>`;
  return `<div class="vitae-table-wrap" style="${width ? `width:${width}px;` : ''}max-width:100%">
    ${grid && bulk && selected.length ? `<div class="vitae-bulkbar" role="region" aria-label="Bulk actions"><strong>${selected.length} selected</strong>${button({ label: 'Send reminder', style: 'outline' })}${button({ label: 'Export', style: 'ghost' })}</div>` : ''}
    <div class="vitae-table-scroll" tabindex="0" role="region" aria-label="${grid ? 'Employees' : 'Payment history'}">
    <table class="vitae-table${grid ? ' vitae-table--grid' : ''}"><caption class="vitae-visually-hidden">${grid ? 'Employees' : 'Payment history'}</caption><thead><tr>
      ${grid ? `<th scope="col" class="is-check is-pinned">${checkbox({ label: 'Select all rows', checked: all }).replace('class="vitae-check__label"', 'class="vitae-check__label vitae-visually-hidden"')}</th>` : ''}
      ${grid ? '<th scope="col" class="is-pinned is-edge">' + '<button type="button" class="vitae-sort">Name' + icon('arrow-up', 16, 'filled') + '</button></th>' : th('Member')}
      ${th('ID', grid ? 'none' : '')}${th('Status', grid ? 'none' : '')}${th('Premium', grid ? 'none' : '', true)}${th('Start date')}${grid ? '<th scope="col"><span class="vitae-visually-hidden">Actions</span></th>' : ''}
    </tr></thead><tbody>
      ${MEMBERS.map((r, i) => `<tr${grid && selected.includes(i) ? ' aria-selected="true"' : ''}>
        ${grid ? `<td class="is-check is-pinned">${checkbox({ label: `Select ${r[0]}`, checked: selected.includes(i) ? 'true' : 'false' }).replace('class="vitae-check__label"', 'class="vitae-check__label vitae-visually-hidden"')}</td>` : ''}
        <td class="${grid ? 'is-pinned is-edge' : ''}">${grid ? `<a href="#" class="vitae-link" style="font-size:14px">${esc(r[0])}</a>` : esc(r[0])}</td><td>${esc(r[1])}</td><td>${tag({ type: r[3], label: r[2], showIcon: r[3] !== 'neutral' })}</td><td class="is-numeric">${esc(r[4])}</td><td>${esc(r[5])}</td>
        ${grid ? '<td class="is-numeric"><a href="#" class="vitae-link" style="font-size:14px">View</a></td>' : ''}</tr>`).join('')}
    </tbody></table></div></div>`;
};

/* ---------- Menu + Search ---------- */
export const menuItem = ({ label, secondary = '', lead = '', state = 'rest', match = '' }) => {
  const text = match ? esc(label).replace(new RegExp(`(${match})`, 'i'), '<mark>$1</mark>') : esc(label);
  return `<li role="option" class="vitae-menu__item${state === 'hover' || state === 'highlighted' ? ` is-${state}` : ''}"${state === 'selected' ? ' aria-selected="true"' : ''}${state === 'disabled' ? ' aria-disabled="true"' : ''}>${lead ? icon(lead, 20, 'filled') : ''}<span class="vitae-menu__text">${text}${secondary ? `<span class="vitae-menu__secondary">${esc(secondary)}</span>` : ''}</span>${state === 'selected' ? icon('checkmark', 20, 'filled') : ''}</li>`;
};

// A labelled group of options: screen readers announce "Gold, group" before its options.
export const menuGroup = (label, gid, items) => `<li role="none"><ul class="vitae-menu__group-list" role="group" aria-labelledby="${gid}"><li class="vitae-menu__group" id="${gid}" role="presentation">${esc(label)}</li>${items}</ul></li>`;

export const search = ({ value = 'kai', open = true } = {}) => {
  const sid = id('q');
  const results = [['Kaiser Permanente DC Silver 2500/40 HMO', 'highlighted'], ['Kaiser Permanente Gold 0/20', 'rest']];
  return `<div role="search" style="max-width:360px"><div class="vitae-field"><label for="${sid}" class="vitae-field__label vitae-visually-hidden">Search plans</label>
    <div class="vitae-field__control vitae-popover-anchor">${icon('search', 20, 'filled', { className: 'vitae-icon vitae-icon--leading' })}
      <input type="search" id="${sid}" class="vitae-input vitae-search" placeholder="Search plans" value="${esc(value)}" role="combobox" aria-expanded="${open}" aria-controls="${sid}-list" aria-autocomplete="list">
      ${value ? `<button type="button" class="vitae-search__clear" aria-label="Clear search">${icon('close', 20, 'filled')}</button>` : ''}
      ${open ? `<ul class="vitae-menu" role="listbox" id="${sid}-list" style="width:100%">${value.length >= 2 ? results.map(([l, s]) => menuItem({ label: l, state: s, match: value })).join('') : ''}</ul>` : ''}
    </div></div><p class="vitae-visually-hidden" role="status">2 results</p></div>`;
};

/* ---------- Date picker ---------- */
export const calendar = () => {
  const days = []; // October 2026 starts on a Thursday
  for (let d = 1; d <= 31; d++) days.push(d);
  const lead = [27, 28, 29, 30];
  const cells = [...lead.map((d) => [d, 'outside']), ...days.map((d) => [d, d === 22 ? 'today' : d === 14 ? 'selected' : 'in'])];
  const weeks = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return `<div class="vitae-calendar" role="dialog" aria-modal="true" aria-label="Choose date">
    <div class="vitae-calendar__header"><span id="cal-m">October 2026</span><span class="vitae-calendar__nav"><button type="button" aria-label="Previous month">${icon('arrow-up', 20, 'regular')}</button><button type="button" aria-label="Next month">${icon('arrow-down', 20, 'regular')}</button></span></div>
    <table class="vitae-calendar__grid" role="grid" aria-labelledby="cal-m"><thead><tr>${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
    <tbody>${weeks.map((w) => `<tr>${w.map(([d, s]) => `<td${s === 'selected' ? ' aria-selected="true"' : ''}><button type="button" class="vitae-day${s === 'outside' ? ' is-outside' : ''}"${s === 'today' ? ' aria-current="date"' : ''} tabindex="${s === 'selected' ? 0 : -1}">${d}</button></td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="vitae-calendar__today"><a href="#" class="vitae-link vitae-link--standalone">Go to today</a></div></div>`;
};
