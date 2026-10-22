import { icon } from './icons.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
const parse = (s) => { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s); if (!m) return null; const d = new Date(+m[3], +m[1] - 1, +m[2]); return d.getMonth() === +m[1] - 1 ? d : null; };
const same = (a, b) => a && b && a.toDateString() === b.toDateString();
let uid = 0;

/**
 * Text entry (MM/DD/YYYY) is the primary path; the calendar button is an optional assist.
 * Vitae's Date Picker page only explores input styles (no calendar grid yet), so the
 * popover below is built from existing tokens following the APG date-picker dialog pattern.
 */
const mount = ({ label, value, state, required, errorText, hint, today = new Date() }) => {
  const id = `ea-date-${uid++}`;
  const isError = state === 'error';
  const disabled = state === 'disabled';
  const root = document.createElement('div');
  root.className = `ea-field${disabled ? ' ea-field--disabled' : ''}`;
  root.style.minHeight = '420px';
  const described = [`${id}-hint`, isError ? `${id}-error` : ''].filter(Boolean).join(' ');
  root.innerHTML = `
    <span class="ea-field__label-row">
      <label class="ea-field__label" for="${id}">${label}</label>
      ${required ? '<span class="ea-field__required" aria-hidden="true">*</span>' : ''}
    </span>
    <span class="ea-input-wrap ea-datepicker">
      <input id="${id}" class="ea-input ea-input--with-icon ${isError ? 'ea-input--error' : ''}" placeholder="MM/DD/YYYY" inputmode="numeric" autocomplete="off"
             value="${value}" ${disabled ? 'disabled' : ''} ${required ? 'required aria-required="true"' : ''} aria-describedby="${described}" ${isError ? 'aria-invalid="true"' : ''}>
      <button type="button" class="ea-datepicker__trigger" aria-label="Choose date" aria-haspopup="dialog" aria-expanded="false" ${disabled ? 'disabled' : ''}>${icon.calendar()}</button>
    </span>
    <span class="ea-datepicker__hint" id="${id}-hint">${hint}</span>
    ${isError ? `<span class="ea-field__error" id="${id}-error">${errorText}</span>` : ''}`;

  const input = root.querySelector('input');
  const trigger = root.querySelector('.ea-datepicker__trigger');
  const wrap = root.querySelector('.ea-datepicker');
  let pop = null, view, focusDate;

  const render = () => {
    const y = view.getFullYear(), m = view.getMonth();
    const start = new Date(y, m, 1 - new Date(y, m, 1).getDay());
    const selected = parse(input.value);
    let rows = '';
    for (let w = 0; w < 6; w++) {
      rows += '<tr>';
      for (let d = 0; d < 7; d++) {
        const day = new Date(start); day.setDate(start.getDate() + w * 7 + d);
        const outside = day.getMonth() !== m;
        rows += `<td><button type="button" class="ea-calendar__day${outside ? ' ea-calendar__day--outside' : ''}" data-date="${fmt(day)}"
          tabindex="${same(day, focusDate) ? 0 : -1}" aria-label="${MONTHS[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}"
          ${same(day, today) ? 'aria-current="date"' : ''} aria-selected="${same(day, selected)}">${day.getDate()}</button></td>`;
      }
      rows += '</tr>';
    }
    pop.innerHTML = `
      <div class="ea-calendar__head">
        <span class="ea-calendar__title" aria-live="polite" id="${id}-month">${MONTHS[m]} ${y}</span>
        <span class="ea-calendar__navs">
          <button type="button" class="ea-calendar__nav ea-calendar__nav--up" data-nav="-1" aria-label="Go to previous month">${icon.chevronDown()}</button>
          <button type="button" class="ea-calendar__nav" data-nav="1" aria-label="Go to next month">${icon.chevronDown()}</button>
        </span>
      </div>
      <table role="grid" aria-labelledby="${id}-month">
        <thead><tr>${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => `<th scope="col" abbr="${d}"><span aria-hidden="true">${d[0]}</span></th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="ea-calendar__foot"><button type="button" class="ea-calendar__today" data-today>Go to today</button></div>`;
  };
  const focusDay = () => pop.querySelector(`[data-date="${fmt(focusDate)}"]`)?.focus();
  const close = (refocus = true) => { pop?.remove(); pop = null; trigger.setAttribute('aria-expanded', 'false'); if (refocus) trigger.focus(); };
  const open = () => {
    focusDate = parse(input.value) || new Date(today);
    view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1);
    pop = document.createElement('div');
    pop.className = 'ea-calendar';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-modal', 'true');
    pop.setAttribute('aria-label', `Choose ${label}`);
    wrap.append(pop);
    trigger.setAttribute('aria-expanded', 'true');
    render(); focusDay();
    pop.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) { view.setMonth(view.getMonth() + +nav.dataset.nav); focusDate = new Date(view); render(); return; }
      if (e.target.closest('[data-today]')) { focusDate = new Date(today); view = new Date(today.getFullYear(), today.getMonth(), 1); render(); focusDay(); return; }
      const day = e.target.closest('[data-date]');
      if (day) { input.value = day.dataset.date; close(); }
    });
    pop.addEventListener('keydown', (e) => {
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (!step && !['PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) return;
      if (!e.target.matches('[data-date]')) return;
      e.preventDefault();
      if (step) focusDate.setDate(focusDate.getDate() + step);
      if (e.key === 'PageUp') focusDate.setMonth(focusDate.getMonth() - 1);
      if (e.key === 'PageDown') focusDate.setMonth(focusDate.getMonth() + 1);
      if (e.key === 'Home') focusDate.setDate(focusDate.getDate() - focusDate.getDay());
      if (e.key === 'End') focusDate.setDate(focusDate.getDate() + (6 - focusDate.getDay()));
      view = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1);
      render(); focusDay();
    });
  };
  trigger.addEventListener('click', () => (pop ? close() : open()));
  document.addEventListener('mousedown', (e) => { if (pop && !wrap.contains(e.target)) close(false); });
  return root;
};

export default {
  title: 'Legacy (v1)/Components/Date Picker',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "Vitae · Date Picker (input)",
        "status": "figma",
        "url": "https://www.figma.com/design/1uhnWPqqgQQoMVFIgdbzoU/Vitae?node-id=1251-7675"
      },
      {
        "label": "Fluent 2 Calendar (stock)",
        "status": "adapted",
        "note": "Calendar popover follows stock Fluent 2 anatomy on Enroll tokens"
      }
    ],
    docs: {
      description: {
        component: `Date entry for DOB, coverage start, life-event dates. Source: **Vitae → Date Picker**, which shows the input styles only (Default / Alt 1 underline / Alt 2 floating label). This implements **Default** (it matches Text Input). The calendar popover uses the **stock Fluent 2 Calendar** anatomy (decided 10/14/26), mapped onto Enroll tokens: Month Year header with up/down arrows, single-letter weekdays, 28px day cells, today as a filled brand circle, selection as a brand tint, and a \"Go to today\" link.

**Anatomy:** Text Input with required marker · \`MM/DD/YYYY\` placeholder · trailing calendar button · format hint below · error-info box.

**Accessibility:** typing is the primary path (\`inputmode="numeric"\`). Many users, especially for birth dates, find that faster than paging through a calendar. The calendar button has \`aria-haspopup="dialog"\` / \`aria-expanded\`. The popover follows the APG date-picker dialog pattern: arrow keys move by day/week, PageUp/PageDown by month, Home/End to the week edges, Enter selects, Esc closes and returns focus. Today is marked with \`aria-current="date"\` and the selection with \`aria-selected\`.

**Do:** keep the format hint visible (not only in the placeholder).
**Don't:** force calendar-only entry for a date of birth.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'select', options: ['default', 'disabled', 'error'] },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    errorText: { control: 'text' },
  },
  args: { label: 'Date of birth', value: '', state: 'default', required: true, hint: 'For example: 04/28/1986', errorText: 'Enter a real date in MM/DD/YYYY format.' },
  render: (args) => mount(args),
};

export const Default = {};
export const Filled = { args: { label: 'Coverage start date', value: '01/01/2027', hint: 'Must be the first of a month' } };
export const Disabled = { args: { state: 'disabled', value: '03/15/1990' } };
export const Error = { args: { state: 'error', value: '02/30/1990' } };
