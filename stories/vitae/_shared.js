import './vitae.css';

export const FIGMA_FILE = 'https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F/Vitae-27';
export const figma = (nodeId, label) => ({ label: `Vitae 27 · ${label}`, url: `${FIGMA_FILE}?node-id=${nodeId.replace(':', '-')}`, status: 'figma' });

/** Wraps every Vitae story in the page background + brand font, so Theme and Mode switch the whole canvas. */
export const canvas = (storyFn) => {
  const out = storyFn();
  const wrap = document.createElement('div');
  wrap.className = 'vitae-canvas';
  if (typeof out === 'string') wrap.innerHTML = out; else wrap.append(out);
  return wrap;
};

/** Keyboard-only focus ring for text fields (see the Input description): html.vitae-kbd while tabbing. */
if (typeof window !== 'undefined' && !window.__vitaeKbd) {
  window.__vitaeKbd = true;
  window.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.documentElement.classList.add('vitae-kbd'); });
  window.addEventListener('pointerdown', () => document.documentElement.classList.remove('vitae-kbd'));
}

export const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let uid = 0;
export const id = (p = 'v') => `${p}-${++uid}`;

/** Row of labelled examples, used by the "All states" stories. */
export const matrix = (cols, cells) => `<div class="vitae-demo-grid" style="grid-template-columns:repeat(${cols},max-content)">${cells.map(([label, html]) => `<div style="display:flex;flex-direction:column;gap:6px"><span class="vitae-demo-label">${esc(label)}</span>${html}</div>`).join('')}</div>`;

/**
 * Fills the Description, Default and type columns of the Docs table (and the Controls panel) for each arg.
 * docs: { argName: [description, default, typeSummary, extraArgType] }; default and type are optional.
 * When no type is given, an arg with a short list of options shows them ("solid | outline | ghost").
 */
export const argDocs = (docs, argTypes = {}) => {
  const out = { ...argTypes };
  for (const [k, [description, dflt, type, extra = {}]] of Object.entries(docs)) {
    const at = { ...(argTypes[k] || {}), ...extra };
    const opts = at.options;
    const summary = type ?? (opts && opts.length <= 12 ? opts.map((o) => (o === '' ? '(none)' : String(o))).join(' | ') : undefined);
    out[k] = { ...at, description, table: { ...(at.table || {}), ...(summary ? { type: { summary } } : {}), ...(dflt !== undefined ? { defaultValue: { summary: String(dflt) } } : {}) } };
  }
  return out;
};
