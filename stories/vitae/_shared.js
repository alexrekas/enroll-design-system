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
