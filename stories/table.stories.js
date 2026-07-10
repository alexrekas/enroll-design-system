import { icon } from './icons.js';

// Column position (First/Middle/Last) and type (TableData/TableData-Numerical) mirror the
// Figma `Table/Cell` variant set -- "File Size" is the numerical column and right-aligns.
const COLUMNS = ['Name', 'Date Created', 'Modified by', 'Shared', 'Modified', 'File Size', 'Owner'];
const ROW = ['RowName', '04/05/2021', 'John Doe', 'Private', '04/02/2021', '1.1MB', 'Jane Doe'];
const NUMERICAL_COLUMN = 'File Size';

function cellClass(i) {
  const position = i === 0 ? 'first' : i === COLUMNS.length - 1 ? 'last' : 'middle';
  const numerical = COLUMNS[i] === NUMERICAL_COLUMN ? ' ea-table__cell--numerical' : '';
  return `ea-table__cell--${position}${numerical}`;
}

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Row/column data display with optional row-selection via checkbox and an expandable-row mode. **Rebuilt 7/10/26** to match EA-DesignSystem-2021's actual architecture: cells are organized by column \`Position\` (first/middle/last) and \`Type\` (data/numerical, right-aligned) in Figma's \`Table/Cell\` component — this story mirrors that with matching CSS classes rather than one-off per-row markup.

**Modes:** Standard (read-only), Selectable (adds a checkbox column, bulk actions), Expandable (adds a chevron column that reveals more detail per row).

**Accessibility:** real \`<table>\`/\`<thead>\`/\`<tbody>\`/\`<th>\`/\`<td>\` elements give screen readers native table navigation. Selectable rows reuse the Checkbox component's \`role="checkbox"\`/\`aria-checked\` pattern. **Known gap:** the sortable column header uses the shared \`icon.sortArrow\` glyph but isn't yet a real \`<button aria-sort="...">\` — recommend pairing them when sorting becomes interactive.

**Do:** use the selected-row background only when the row's checkbox is checked.
**Don't:** apply the selected style based on hover — that's a different state.`,
      },
    },
  },
  argTypes: {
    mode: { control: 'select', options: ['standard', 'selectable', 'expandable'] },
    rows: { control: 'number' },
  },
  args: { mode: 'standard', rows: 3 },
  render: ({ mode, rows }) => `
    <table class="ea-table">
      <thead>
        <tr>
          ${mode === 'selectable' ? '<th class="ea-table__checkbox-cell"><button class="ea-checkbox" role="checkbox" aria-checked="false"></button></th>' : ''}
          ${mode === 'expandable' ? '<th class="ea-table__expand-cell"></th>' : ''}
          ${COLUMNS.map((c, i) => i === 0
            ? `<th aria-sort="ascending" class="${cellClass(i)}"><button class="ea-table__sort-btn">${c} ${icon.sortArrow('ea-table__sort-icon')}</button></th>`
            : `<th class="${cellClass(i)}">${c}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: rows }).map((_, i) => `
          <tr class="${mode === 'selectable' && i === 1 ? 'ea-table__row--selected' : ''}">
            ${mode === 'selectable' ? `<td class="ea-table__checkbox-cell"><button class="ea-checkbox" role="checkbox" aria-checked="${i === 1}"></button></td>` : ''}
            ${mode === 'expandable' ? `<td class="ea-table__expand-cell"><button class="ea-table__expand-btn" aria-expanded="${i === 1}" aria-label="Expand row">${icon.chevronRight('ea-table__expand-icon')}</button></td>` : ''}
            ${ROW.map((v, ci) => `<td class="${cellClass(ci)}">${v}</td>`).join('')}
          </tr>`).join('')}
      </tbody>
    </table>`,
};

export const Standard = { args: { mode: 'standard' } };
export const Selectable = { args: { mode: 'selectable' } };
export const Expandable = { args: { mode: 'expandable' } };
