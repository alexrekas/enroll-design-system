const COLUMNS = ['Name', 'Date Created', 'Modified by', 'Shared', 'Modified', 'File Size', 'Owner'];
const ROW = ['RowName', '04/05/2021', 'John Doe', 'Private', '04/02/2021', '1.1MB', 'Jane Doe'];

export default {
  title: 'Components/Table',
  argTypes: { selectable: { control: 'boolean' }, rows: { control: 'number' } },
  args: { selectable: false, rows: 3 },
  render: ({ selectable, rows }) => `
    <table class="ea-table">
      <thead>
        <tr>
          ${selectable ? '<th class="ea-table__checkbox-cell"><button class="ea-checkbox" role="checkbox" aria-checked="false"></button></th>' : ''}
          ${COLUMNS.map((c, i) => `<th>${c}${i === 0 ? ' ↓' : ''}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${Array.from({ length: rows }).map((_, i) => `
          <tr class="${selectable && i === 1 ? 'ea-table__row--selected' : ''}">
            ${selectable ? `<td class="ea-table__checkbox-cell"><button class="ea-checkbox" role="checkbox" aria-checked="${i === 1}"></button></td>` : ''}
            ${ROW.map(v => `<td>${v}</td>`).join('')}
          </tr>`).join('')}
      </tbody>
    </table>`,
};

export const Standard = {};
export const Selectable = { args: { selectable: true } };
