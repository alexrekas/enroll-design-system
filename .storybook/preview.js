import './tokens.css';
import '../dist/v2/css/vitae.css';

/**
 * Design-source badge. Every story declares `parameters.design`: one source or a list,
 * or a function of globals (e.g. theme) returning one. Each source is
 *   { label, url?, status: 'figma' | 'adapted' | 'reference' | 'projected', note? }
 *   figma     = built from this Figma frame (verified)
 *   adapted   = built from the frame but restyled onto Enroll tokens / anatomy
 *   reference = built from this frame in an earlier pass, not re-verified since
 *   projected = no Figma frame exists for this variant yet
 * Stories with no `design` parameter show a red "No design source recorded" badge.
 */
const STATUS = {
  figma: ['From Figma', '#027314'],
  adapted: ['Adapted from Figma', '#8a6800'],
  reference: ['Reference · not re-verified', '#5c5c5c'],
  projected: ['Projected · no Figma frame yet', '#a21e1f'],
};
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sourceBar = (ctx) => {
  let d = ctx.parameters.design;
  if (typeof d === 'function') d = d(ctx.globals || {});
  const list = d ? (Array.isArray(d) ? d : [d]) : [];
  const items = list.length
    ? list.map(({ label, url, status = 'figma', note }) => {
        const [txt, col] = STATUS[status] || STATUS.reference;
        const name = url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>` : esc(label);
        return `<li><span class="sb-src__pill" style="--c:${col}">${txt}</span>${name}${note ? ` <span class="sb-src__note">— ${esc(note)}</span>` : ''}</li>`;
      }).join('')
    : `<li><span class="sb-src__pill" style="--c:#a21e1f">No design source recorded</span>Add <code>parameters.design</code> to this story.</li>`;
  return `<aside class="sb-src" aria-label="Design source"><span class="sb-src__title">Source</span><ul>${items}</ul></aside>`;
};
const withSource = (storyFn, ctx) => {
  const out = storyFn();
  if (ctx.parameters.design === false) return out;
  if (typeof out === 'string') return `${out}${sourceBar(ctx)}`;
  const wrap = document.createElement('div');
  wrap.append(out);
  wrap.insertAdjacentHTML('beforeend', sourceBar(ctx));
  return wrap;
};

/** Theme switcher: sets data-theme on the story root */
const withTheme = (storyFn, context) => {
  const theme = context.globals.theme || 'ea';
  const mode = context.globals.mode || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  // Vitae 27 (tokens-v2) reads data-client + data-mode.
  document.documentElement.setAttribute('data-client', theme);
  document.documentElement.setAttribute('data-mode', mode);
  const root = storyFn();
  if (typeof root === 'string') {
    return `<div data-theme="${theme}" style="font-family: var(--ea-font-family-brand); color: var(--ea-color-text-primary);">${root}</div>`;
  }
  root.setAttribute?.('data-theme', theme);
  return root;
};

export default {
  decorators: [withSource, withTheme],
  globalTypes: {
    theme: {
      description: 'Client theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'ea', title: 'EA (default)' },
          { value: 'dc', title: 'DC HealthLink' },
          { value: 'ma', title: 'MA Health Connector' },
          { value: 'me', title: 'CoverME.gov' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Light or dark mode (Vitae 27 stories)',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'ea', mode: 'light' },
  parameters: {
    backgrounds: { disable: true },
    options: {
      // Vitae 27 first; the original v1 stories sit in a Legacy group at the bottom.
      storySort: {
        order: ['Vitae 27', ['Foundations', 'Icons', 'Logos', 'Components', 'Sample users'], 'Legacy (v1)'],
      },
    },
  },
};
