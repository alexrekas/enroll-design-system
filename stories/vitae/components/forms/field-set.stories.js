import { canvas, figma } from '../../_shared.js';
import { field } from '../../markup/field.js';
import { wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Field-set',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
};

export const Playground = {
  args: { type: 'Address', width: 720 },
  argTypes: { type: { control: 'inline-radio', options: ['Name', 'Address', 'Contact'] }, width: { control: 'inline-radio', options: [720, 480, 320] } },
  render: ({ type, width }, { globals }) => {
    const client = globals.theme || 'ea';
    const f = (o) => field({ helper: '', info: false, required: true, placeholder: '', ...o });
    const rows = {
      Name: [[f({ label: 'First name', value: 'Marcus' }), f({ label: 'Last name', value: 'Bennett' })], [f({ label: 'Suffix (optional)', required: false, kind: 'select', placeholder: 'Select', options: ['Jr.', 'Sr.', 'II', 'III'] }), f({ label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar' })]],
      Address: [[f({ label: client === 'dc' ? 'Address line 1 (number, street, quadrant)' : 'Address line 1', value: client === 'dc' ? '1420 Example St NW' : '25 Sample Rd' }).replace('class="vitae-field"', 'class="vitae-field is-full"')], [f({ label: 'Address line 2 (optional)', required: false }).replace('class="vitae-field"', 'class="vitae-field is-full"')],
        [f({ label: 'City', value: client === 'dc' ? 'Washington' : 'Portland' }), `<div class="vitae-fieldset__pair">${f({ label: 'State', kind: 'select', value: client === 'dc' ? 'DC' : 'ME', options: ['DC', 'MA', 'ME'] })}${f({ label: 'ZIP code', value: client === 'dc' ? '20009' : '04101' })}</div>`],
        ...(client === 'me' ? [[f({ label: 'County', kind: 'select', placeholder: 'Select', options: ['Cumberland', 'York'] }).replace('class="vitae-field"', 'class="vitae-field is-half"')]] : [])],
      Contact: [[f({ label: 'Phone number', value: '(202) 555-0142' }), f({ label: 'Email', value: 'marcus.bennett@example.com' })]],
    }[type];
    return `<div style="width:${width}px;max-width:100%"><fieldset class="vitae-fieldset"><legend class="vitae-fieldset__legend">${type === 'Name' ? 'Your name' : type === 'Address' ? 'Home address' : 'Contact information'}</legend>
      <div class="vitae-fieldset__rows">${rows.map((r) => `<div class="vitae-fieldset__row">${r.join('')}</div>`).join('')}</div></fieldset></div>`;
  },
  parameters: {
    design: figma('242:2295', 'Field-set'),
    docs: { description: { story: `
A labeled group of related fields that reflows with width (change **width**). At 720px paired fields are half width and City | State | ZIP splits 6 / 3 / 3; below about 504px pairs stack; State and ZIP stay side by side until about 264px. Switch **Theme**: DC's Address line 1 label asks for the quadrant, and ME adds a required County.

- \`<fieldset class="vitae-fieldset">\` with \`<legend class="vitae-fieldset__legend">\`; build rows with \`flex-wrap\` and minimum widths (pairs 240px, City 240px, State + ZIP 240px, each 120px, County 240–348px).
- Use autocomplete tokens: given-name, family-name, honorific-suffix, bday, address-line1, address-level2, address-level1, postal-code, tel, email. County has none.
- Mark optional fields "(optional)"; required fields use the red asterisk.` } },
  },
};
