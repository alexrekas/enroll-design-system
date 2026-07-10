import { icon } from './icons.js';

let uid = 0;
const field = (label, placeholder, { trailingIcon } = {}) => {
  const id = `ea-fs-${uid++}`;
  return `
  <label class="ea-field" for="${id}">
    <span class="ea-field__label">${label}</span>
    <span class="ea-input-wrap">
      <input class="ea-input ${trailingIcon ? 'ea-input--with-icon' : ''}" id="${id}" placeholder="${placeholder}">
      ${trailingIcon === 'chevron' ? icon.chevronDown('ea-input__icon') : ''}
      ${trailingIcon === 'calendar' ? icon.calendar('ea-input__icon') : ''}
    </span>
  </label>`;
};
const checkboxRow = (label) => `
  <div class="ea-checkbox-row">
    <button class="ea-checkbox" role="checkbox" aria-checked="false"></button>
    <span class="ea-checkbox-label">${label}</span>
  </div>`;

const GROUPS = {
  Name: {
    legend: 'Name',
    fields: [
      ['First Name', 'placeholder'],
      ['Last Name', 'placeholder'],
      ['Suffix', 'Selector', { trailingIcon: 'chevron' }],
      ['Date of Birth', 'MM/DD/YYYY', { trailingIcon: 'calendar' }],
      ['Social Security Number', '000-00-0000'],
    ],
    extra: () => checkboxRow("I don't have a SSN"),
  },
  Address: {
    legend: 'Address',
    fields: [
      ['Address Line 1', 'placeholder'],
      ['Address Line 2', 'placeholder'],
      ['City', 'placeholder'],
      ['State', 'Selector', { trailingIcon: 'chevron' }],
      ['Zip Code', '00000-0000'],
    ],
  },
  Contact: {
    legend: 'Contact Information',
    fields: [
      ['Primary Phone', '000-000-0000'],
      ['Secondary Phone', '000-000-0000'],
      ['Primary Email', 'chris@example.com'],
      ['Secondary Email', 'chris@example.com'],
    ],
  },
};

function render({ type, size }) {
  const group = GROUPS[type];
  const cols = size === 'Desktop' ? 3 : 1;
  return `
    <fieldset class="ea-field-set" style="border:none; padding:0; margin:0; display:grid; grid-template-columns: repeat(${cols}, minmax(160px, 1fr)); gap: 16px 12px; max-width:${size === 'Desktop' ? '534px' : '288px'};">
      <legend style="grid-column: 1 / -1; font-family:var(--ea-font-family-brand); font-weight:var(--ea-font-weight-bold); margin-bottom:4px;">${group.legend}</legend>
      ${group.fields.map(([label, placeholder, opts]) => field(label, placeholder, opts)).join('')}
      ${group.extra ? `<div style="grid-column: 1 / -1;">${group.extra()}</div>` : ''}
    </fieldset>`;
}

export default {
  title: 'Components/Field-Set',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A labeled group of related Text Input instances, matching the real field groupings from EA-DesignSystem-2021. **Rebuilt 7/10/26** — previously a single generic frame with placeholder fields (Legal Name / DBA / FEIN); now a real \`type\` × \`size\` variant matrix, each populated with the actual fields for that group.

**Variants:** \`type\` (Name / Address / Contact) × \`size\` (Desktop — 2–3 column rows / Mobile — single column, stacked). Name includes a Suffix dropdown, calendar-icon Date of Birth, and an "I don't have a SSN" checkbox; Address includes a State dropdown; Contact is two phone/email pairs.

**Accessibility:** same as Text Input, inherited per field. **Recommend:** wrap each group in a real \`<fieldset>\`/\`<legend>\` matching its \`type\` — current markup uses a grouping element but doesn't yet give screen reader users the "N fields in this group" context a proper \`fieldset\` provides.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['Name', 'Address', 'Contact'] },
    size: { control: 'select', options: ['Desktop', 'Mobile'] },
  },
  args: { type: 'Name', size: 'Desktop' },
  render,
};

export const NameDesktop = { args: { type: 'Name', size: 'Desktop' } };
export const NameMobile = { args: { type: 'Name', size: 'Mobile' } };
export const AddressDesktop = { args: { type: 'Address', size: 'Desktop' } };
export const AddressMobile = { args: { type: 'Address', size: 'Mobile' } };
export const ContactDesktop = { args: { type: 'Contact', size: 'Desktop' } };
export const ContactMobile = { args: { type: 'Contact', size: 'Mobile' } };
