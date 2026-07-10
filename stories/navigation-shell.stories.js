export default {
  title: 'Components/Navigation/Header, Footer & LeftNav',
};

export const Header = {
  render: () => `
    <div class="ea-header">
      <div class="ea-header__row">
        <div class="ea-header__logo">EA</div>
        <span class="ea-header__brand">Enroll App</span>
        <div class="ea-header__divider"></div>
        <span class="ea-header__tagline">IdeaCrew's State Based Marketplace</span>
      </div>
      <div class="ea-header__border"></div>
    </div>`,
};

export const Footer = {
  render: () => `
    <footer class="ea-footer">
      <div class="ea-footer__lang">
        <span>English</span>
        <a href="#">Español</a>
        <a href="#">Amharic</a>
      </div>
      <div class="ea-footer__details">
        <div>
          <p><strong>© 2013-2026 Enroll App</strong></p>
          <p>All Rights Reserved.</p>
          <p>Powered by IdeaCrew, Inc.</p>
        </div>
        <div>
          <p><strong>Get Help</strong></p>
          <p>(000) 000-0000 / TTY 000</p>
          <p>info@enrollapp.com</p>
        </div>
      </div>
    </footer>`,
};

export const LeftNav = {
  argTypes: { type: { control: 'select', options: ['Individual', 'Employee', 'Employer'] } },
  args: { type: 'Individual' },
  render: ({ type }) => {
    const items = {
      Individual: ['Home', 'My Household', 'Documents', 'Messages'],
      Employee: ['Home', 'My Household', 'Documents', 'My Experts', 'Cost Savings', 'Messages'],
      Employer: ['Home', 'Business Info', 'Employees', 'Benefits', 'Experts', 'Documents', 'Billing', 'Messages'],
    }[type];
    return `<nav class="ea-left-nav">${items.map(i => `<a href="#">${i}</a>`).join('')}</nav>`;
  },
};
