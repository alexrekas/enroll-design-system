// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc } from '../_shared.js';
import { icon } from '../icons.js';

export const LEVELS = ['primary', 'secondary', 'tertiary', 'destructive'];

export const STATES = ['rest', 'hover', 'pressed', 'focus', 'disabled'];

export const button = ({ label = 'Continue', style = 'solid', level = 'primary', state = 'rest', iconLeft = '', iconRight = '' } = {}) => {
  const cls = ['vitae-btn', `vitae-btn--${style}`, `vitae-btn--${level}`, ['hover', 'pressed', 'focus'].includes(state) ? `is-${state}` : ''].join(' ').trim();
  return `<button type="button" class="${cls}"${state === 'disabled' ? ' disabled' : ''}>${iconLeft ? icon(iconLeft, 20, 'filled') : ''}${esc(label)}${iconRight ? icon(iconRight, 20, 'filled') : ''}</button>`;
};
