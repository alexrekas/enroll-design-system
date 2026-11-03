// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc, id } from '../_shared.js';
import { icon } from '../icons.js';

export const field = ({
  kind = 'input', label = 'Annual income', placeholder = '$0', value = '', helper = '', error = '', required = false,
  info = false, showLabel = true, leadingIcon = '', trailingIcon = '', state = 'rest', width = '', options = ['Single', 'Married filing jointly', 'Married filing separately', 'Head of household'],
} = {}) => {
  const fid = id('field');
  const describedby = [helper && `${fid}-help`, error && `${fid}-error`].filter(Boolean).join(' ');
  const cls = ['vitae-input', kind === 'select' ? 'vitae-select' : '', leadingIcon ? 'has-leading' : '', trailingIcon ? 'has-trailing' : '', ['hover', 'active', 'focus'].includes(state) ? `is-${state}` : ''].join(' ').trim();
  const attrs = `id="${fid}" class="${cls}"${describedby ? ` aria-describedby="${describedby}"` : ''}${error || state === 'error' ? ' aria-invalid="true"' : ''}${required ? ' required' : ''}${state === 'disabled' ? ' disabled' : ''}`;
  const control = kind === 'select'
    ? `<select ${attrs}><option value="" disabled hidden${value ? '' : ' selected'}>${esc(placeholder || 'Select')}</option>${options.map((o) => `<option${o === value ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>${icon('chevron-down', 20, 'filled', { className: 'vitae-icon vitae-icon--trailing' })}`
    : `<input type="text" ${attrs} placeholder="${esc(placeholder)}" value="${esc(value)}">${leadingIcon ? icon(leadingIcon, 20, 'filled', { className: 'vitae-icon vitae-icon--leading' }) : ''}${trailingIcon ? icon(trailingIcon, 20, 'filled', { className: 'vitae-icon vitae-icon--trailing' }) : ''}`;
  return `<div class="vitae-field${width ? ` is-${width}` : ''}">
    <div class="vitae-field__label-row${showLabel ? '' : ' vitae-visually-hidden'}">
      <label class="vitae-field__label" for="${fid}">${esc(label)}${required ? ' <span class="vitae-field__required" aria-hidden="true">*</span>' : ''}</label>
      ${info ? `<button type="button" class="vitae-info-button" aria-expanded="false">${icon('info', 16, 'filled')}<span class="vitae-visually-hidden">More about ${esc(label)}</span></button>` : ''}
    </div>
    <div class="vitae-field__control">${control}</div>
    ${helper ? `<p class="vitae-field__helper" id="${fid}-help">${esc(helper)}</p>` : ''}
    ${error ? `<p class="vitae-field__error" id="${fid}-error">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}
  </div>`;
};

export const STATES = ['rest', 'hover', 'active', 'focus', 'error', 'disabled'];
