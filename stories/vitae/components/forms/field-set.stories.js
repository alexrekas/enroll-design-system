import { canvas, figma, argDocs } from '../../_shared.js';
import { field } from '../../markup/field.js';
import { fieldset, fieldsetPair, wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Field-set',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::FieldsetComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::FieldsetComponent.new(legend: "Home address") do |fs| %>
  <% fs.with_row { render Vitae::InputComponent.new(label: "Address line 1", name: "address1", width: :full, autocomplete: "address-line1") } %>
  <% fs.with_row do %>
    <%= render Vitae::InputComponent.new(label: "City", name: "city", autocomplete: "address-level2") %>
    <%= render Vitae::FieldsetComponent::PairComponent.new do %>
      <%= render Vitae::DropdownComponent.new(label: "State", name: "state", options: %w[DC MA ME]) %>
      <%= render Vitae::InputComponent.new(label: "ZIP code", name: "zip", autocomplete: "postal-code") %>
    <% end %>
  <% end %>
<% end %>
\`\`\`` } } },
};

export const Playground = {
  args: { type: 'Address', width: 720 },
  argTypes: argDocs({
    type: ["Which example group to show.", undefined, "Name | Address | Contact (example)"],
    width: ["Container width in px, to see how paired fields stack on narrow screens.", undefined, "number (example)"],
  }, { type: { control: 'inline-radio', options: ['Name', 'Address', 'Contact'] }, width: { control: 'inline-radio', options: [720, 480, 320] } }),
  render: ({ type, width }, { globals }) => {
    const client = globals.theme || 'ea';
    const f = (o) => field({ helper: '', info: false, required: true, placeholder: '', ...o });
    const rows = {
      Name: [[f({ label: 'First name', value: 'Marcus' }), f({ label: 'Last name', value: 'Bennett' })], [f({ label: 'Suffix (optional)', required: false, kind: 'select', placeholder: 'Select', options: ['Jr.', 'Sr.', 'II', 'III'] }), f({ label: 'Date of birth', placeholder: 'MM/DD/YYYY', trailingIcon: 'calendar' })]],
      Address: [[f({ label: client === 'dc' ? 'Address line 1 (number, street, quadrant)' : 'Address line 1', value: client === 'dc' ? '1420 Example St NW' : '25 Sample Rd', width: 'full' })], [f({ label: 'Address line 2 (optional)', required: false, width: 'full' })],
        [f({ label: 'City', value: client === 'dc' ? 'Washington' : 'Portland' }), fieldsetPair(f({ label: 'State', kind: 'select', value: client === 'dc' ? 'DC' : 'ME', options: ['DC', 'MA', 'ME'] }), f({ label: 'ZIP code', value: client === 'dc' ? '20009' : '04101' }))],
        ...(client === 'me' ? [[f({ label: 'County', kind: 'select', placeholder: 'Select', options: ['Cumberland', 'York'], width: 'half' })]] : [])],
      Contact: [[f({ label: 'Phone number', value: '(202) 555-0142' }), f({ label: 'Email', value: 'marcus.bennett@example.com' })]],
    }[type];
    return `<div style="width:${width}px;max-width:100%">${fieldset({ legend: type === 'Name' ? 'Your name' : type === 'Address' ? 'Home address' : 'Contact information', rows })}</div>`;
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
