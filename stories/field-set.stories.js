const textField = (label, placeholder = '') => `
  <label class="ea-field">
    <span class="ea-field__label">${label}</span>
    <input class="ea-input" placeholder="${placeholder}">
  </label>`;

export default {
  title: 'Components/Field-Set',
  render: () => `
    <div class="ea-field-set">
      ${textField('Legal Name *')}
      ${textField('DBA (Doing Business As)')}
      ${textField('FEIN', 'MM/DD/YYYY')}
    </div>`,
};

export const Default = {};
