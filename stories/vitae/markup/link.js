// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc } from '../_shared.js';
import { icon } from '../icons.js';

export const link = ({ label = 'View plan details', type = 'inline', state = 'rest', trailingIcon = 'arrow-right' } = {}) => {
  const cls = ['vitae-link', type === 'standalone' ? 'vitae-link--standalone' : '', state !== 'rest' ? `is-${state}` : ''].join(' ').trim();
  return `<a href="#" class="${cls}">${esc(label)}${type === 'standalone' && trailingIcon ? icon(trailingIcon, 20, 'filled') : ''}</a>`;
};
