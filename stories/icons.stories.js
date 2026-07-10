import { icon } from './icons.js';

const usedIn = {
  chevronDown: 'Field-Set dropdown fields (Suffix, State)',
  chevronRight: "Button trailing-icon slot; also aliased as the pagination arrow's straight variant",
  chevronLeft: 'Reserved (mirror of chevronRight)',
  chevronRightCircle: 'Pagination next-page arrow',
  chevronLeftCircle: 'Pagination previous-page arrow',
  calendar: 'Field-Set / Text Input date fields',
  dismiss: 'Alert close button, Tag remove button',
  check: 'Checkbox checked state',
  sortArrow: 'Reserved for Table sortable-column indicators (not yet wired into a story)',
  info: 'Alert info badge',
  warning: 'Alert warning badge',
  search: 'Reserved for search inputs (not yet consumed by a story)',
  health: 'Plan benefit-type badge (Health)',
  dentist: 'Plan benefit-type badge (Dental)',
  documentPdf: "Plan's Summary of Benefits and Coverage link",
  documentPdfSmall: 'Compact document/PDF reference',
};

export default {
  title: 'Foundations/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Single shared icon set — one source of truth referenced by every other component (Button, Input, Alert, Tag, Field-Set, Table, Plan), instead of each component hand-drawing its own inline SVG.

In Figma this lives on the \`Icons\` page as individual \`Icon/*\` components; in code it's \`stories/icons.js\`, a module of small functions (\`icon.calendar()\`, \`icon.dismiss()\`, etc.) that each return an inline monochrome \`<svg>\` string using \`currentColor\`/\`stroke="currentColor"\` so color is controlled entirely by CSS, never baked into the icon.

**Known limitation:** these are hand-recreated to visually match the corresponding glyphs in EA-DesignSystem-Icons-2021 (observed via Figma screenshots), not literal byte-for-byte exports — the MCP asset-export pipeline's short-lived CDN URLs weren't reachable from the environment that built this pass. Swap for direct exports (or wire up Code Connect) when that pipeline is available.

**Do:** import from \`icons.js\` (\`import { icon } from './icons.js'\`) whenever a component needs a glyph, and style its color via the parent's \`color\`/\`currentColor\` (CSS token).
**Don't:** hand-roll a new inline SVG inside a story file — it fragments the icon set the moment a second component needs the same glyph. Don't bake a fill color into the icon SVG itself.`,
      },
    },
  },
  render: () => `
    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:20px; font-family:var(--ea-font-family-brand);">
      ${Object.keys(icon).map(name => `
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; padding:16px; border:1px solid var(--ea-color-gray-with-alpha, #e2e2e2); border-radius:6px;">
          <div style="width:28px; height:28px; color: var(--ea-color-text-primary);">${icon[name]('').replace('viewBox', 'width="28" height="28" viewBox')}</div>
          <code style="font-size:12px;">${name}</code>
        </div>`).join('')}
    </div>`,
};

export const AllIcons = {};

export const UsageReference = {
  render: () => `
    <table style="border-collapse:collapse; font-size:13px; font-family:var(--ea-font-family-brand);">
      <thead>
        <tr>
          <th style="text-align:left; padding:6px 16px 6px 0; border-bottom:1px solid var(--ea-color-gray-with-alpha, #e2e2e2);">Icon</th>
          <th style="text-align:left; padding:6px 0; border-bottom:1px solid var(--ea-color-gray-with-alpha, #e2e2e2);">Used in</th>
        </tr>
      </thead>
      <tbody>
        ${Object.keys(icon).map(name => `
          <tr>
            <td style="padding:6px 16px 6px 0; vertical-align:top;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="width:18px; height:18px; color: var(--ea-color-text-primary);">${icon[name]('').replace('viewBox', 'width="18" height="18" viewBox')}</div>
                <code>${name}</code>
              </div>
            </td>
            <td style="padding:6px 0; color: var(--ea-color-text-secondary); vertical-align:top;">${usedIn[name] || ''}</td>
          </tr>`).join('')}
      </tbody>
    </table>`,
};
