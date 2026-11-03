// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc, id } from '../_shared.js';
import { icon } from '../icons.js';

// label: null renders no <label> (the whole selectable card is the label); hideLabel keeps it for screen readers only.
export const checkbox = ({ label = 'Bronze', description = '', checked = 'false', state = 'rest', error = '', radio = false, name = '', hideLabel = false } = {}) => {
  const cid = id(radio ? 'radio' : 'cb');
  const errId = error ? `${cid}-error` : '';
  const mark = radio ? '<span class="vitae-check__dot"></span>' : checked === 'indeterminate' ? '<span class="vitae-check__dash"></span>' : icon('checkmark', 16, 'filled');
  return `<div class="vitae-check${radio ? ' vitae-check--radio' : ''}${['hover', 'active', 'focus', 'error'].includes(state) ? ` is-${state}` : ''}">
    <input class="vitae-check__input" type="${radio ? 'radio' : 'checkbox'}" id="${cid}"${radio || name ? ` name="${name || 'g'}"` : ''}${checked === 'true' ? ' checked' : ''}${state === 'disabled' ? ' disabled' : ''}${error || state === 'error' ? ' aria-invalid="true"' : ''}${errId ? ` aria-describedby="${errId}"` : ''}${checked === 'indeterminate' ? ' data-indeterminate' : ''}>
    <span class="vitae-check__box" aria-hidden="true">${mark}</span>
    ${label === null ? '' : `<label class="vitae-check__label${hideLabel ? ' vitae-visually-hidden' : ''}" for="${cid}">${esc(label)}</label>`}
    ${description ? `<p class="vitae-check__description">${esc(description)}</p>` : ''}
    ${error ? `<p class="vitae-field__error vitae-check__error" id="${errId}">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}
  </div>`;
};

export const toggle = ({ label = 'Email me reminders', description = '', on = false, state = 'rest' } = {}) => {
  const tid = id('toggle');
  return `<div class="vitae-toggle${['hover', 'focus'].includes(state) ? ` is-${state}` : ''}">
    <button type="button" role="switch" aria-checked="${on}" id="${tid}" class="vitae-toggle__track"${state === 'disabled' ? ' disabled' : ''}><span class="vitae-toggle__knob"></span></button>
    <label class="vitae-toggle__label" for="${tid}">${esc(label)}</label>
    ${description ? `<p class="vitae-toggle__description">${esc(description)}</p>` : ''}
  </div>`;
};

/** Live behaviour in the canvas: indeterminate checkboxes and clickable switches. */
export const wireSelection = (storyFn) => {
  const el = storyFn();
  setTimeout(() => {
    document.querySelectorAll('[data-indeterminate]').forEach((i) => { i.indeterminate = true; });
    document.querySelectorAll('.vitae-toggle__track').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
    });
  });
  return el;
};

export const STATES = ['rest', 'hover', 'active', 'focus', 'error', 'disabled'];
