// Vitae 27 icons for Storybook. Fluent System Icons (copied exactly from github.com/microsoft/fluentui-system-icons)
// plus the Vitae-drawn Info, two-tone Warning, product and header icons exported from Figma.
// Every icon renders at its full square frame and inherits currentColor.
const files = import.meta.glob('./icons/*.svg', { query: '?raw', import: 'default', eager: true });
const ICONS = Object.fromEntries(Object.entries(files).map(([path, svg]) => [path.split('/').pop().replace('.svg', ''), svg]));

export const iconNames = [...new Set(Object.keys(ICONS).map((k) => k.replace(/-(16|20|24)-(regular|filled|heavy|two-tone)$/, '')))].sort();

/**
 * icon('chevron-down', 20, 'filled') → inline SVG string.
 * Two-tone warning keeps its own colors (fill + ink tokens); everything else uses currentColor.
 */
export function icon(name, size = 20, theme = 'filled', { className = 'vitae-icon', label } = {}) {
  const key = ICONS[`${name}-${size}-${theme}`] ? `${name}-${size}-${theme}` : ICONS[`${name}-${size}-regular`] ? `${name}-${size}-regular` : name;
  let svg = ICONS[key];
  if (!svg) return `<span class="${className}" style="display:inline-block;width:${size}px;height:${size}px"></span>`;
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  if (theme === 'two-tone') {
    svg = svg.replace(/fill="#F5C400"/g, 'fill="var(--vitae-support-warning-icon-fill)"')
      .replace(/stroke="#1C1F23"/g, 'stroke="var(--vitae-support-warning-icon-outline-color)"')
      .replace(/fill="#1C1F23"/g, 'fill="var(--vitae-support-warning-icon-ink)"');
  } else {
    svg = svg.replace(/fill="#(212121|23374D)"/gi, 'fill="currentColor"').replace(/stroke="#(212121|23374D)"/gi, 'stroke="currentColor"');
  }
  return svg.replace('<svg ', `<svg class="${className}" ${a11y} `);
}
