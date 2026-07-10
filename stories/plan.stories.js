import { icon } from './icons.js';

const BENEFITS = [
  ['Primary Care Visit to Treat an Injury or Illness', '$15 copay after deductible', 'No charge after deductible'],
  ['Urgent Care Centers or Facilities', '$15 copay after deductible', 'No charge after deductible'],
  ['Specialist Visit', '$15 copay after deductible', 'No charge after deductible'],
  ['Emergency Room Services', '$15 copay after deductible', 'No charge after deductible'],
  ['Inpatient Hospital Services (e.g., Hospital Stay)', '$15 copay after deductible', 'No charge after deductible'],
];

function planCard({ benefitType, cost, cart, expanded }) {
  const isDental = benefitType === 'Dental';
  const badgeIcon = isDental ? icon.dentist('ea-plan__badge-icon') : icon.health('ea-plan__badge-icon');
  const carrierName = isDental ? 'Altus Dental' : 'Aetna';
  const carrierColor = isDental ? '#2E7D32' : '#7B2D8E';
  const planName = isDental
    ? 'Standard Family High: Altus Dental High Plan'
    : 'Aetna Gold HN Only 6000 80% $15/50 E';
  const level = isDental ? 'High' : 'Gold';
  const typeCode = isDental ? 'PPO' : 'HMO';
  const deductInd = isDental ? '$50 Individual' : '$2,000 Individual';
  const deductFam = isDental ? '$150 Family' : '$4,000 Family';

  const costHtml = cost === 'EmployeeEmployer'
    ? `
      <div class="ea-plan__cost-split">
        <div class="ea-plan__cost-col"><span class="ea-plan__cost-label">Employee</span><span class="ea-plan__cost-value">$221.42</span><span class="ea-plan__cost-sub">Monthly</span></div>
        <div class="ea-plan__cost-divider"></div>
        <div class="ea-plan__cost-col"><span class="ea-plan__cost-label">Employer</span><span class="ea-plan__cost-value">$278.58</span><span class="ea-plan__cost-sub">Monthly</span></div>
      </div>`
    : `
      <div class="ea-plan__cost-col">
        <span class="ea-plan__cost-label">Premium</span><span class="ea-plan__cost-value">$150.00</span><span class="ea-plan__cost-sub">Monthly</span>
      </div>`;

  const cartBtnClass = cart === 'InCart' ? 'ea-btn--secondary ea-btn--in-cart' : 'ea-btn--secondary';
  const cartLabel = cart === 'InCart' ? 'Remove from Cart' : 'Add to Cart';

  return `
    <div class="ea-plan">
      <div class="ea-plan__header">
        <div class="ea-checkbox-row">
          <button class="ea-checkbox" role="checkbox" aria-checked="false"></button>
          <span class="ea-checkbox-label">Compare</span>
        </div>
        <div class="ea-plan__badge">${badgeIcon}<span>Standard ${benefitType} Plan</span></div>
      </div>
      <div class="ea-plan__summary">
        <div class="ea-plan__identity">
          <div class="ea-plan__logo" style="color:${carrierColor};">${carrierName}</div>
          <h3 class="ea-plan__title">${planName}</h3>
        </div>
        ${costHtml}
      </div>
      <div class="ea-plan__details">
        <div class="ea-plan__detail-group">
          <div class="ea-plan__labels"><span>Carrier</span><span>Network</span></div>
          <div class="ea-plan__values"><span>${carrierName}</span><span>&nbsp;</span></div>
        </div>
        <div class="ea-plan__detail-group">
          <div class="ea-plan__labels"><span>Level</span><span>Type</span></div>
          <div class="ea-plan__values"><span>${level}</span><span>${typeCode}</span></div>
        </div>
        <div class="ea-plan__detail-group">
          <div class="ea-plan__labels"><span>Deductible</span></div>
          <div class="ea-plan__values"><span>${deductInd}</span><span>${deductFam}</span></div>
        </div>
      </div>
      <div class="ea-plan__actions">
        <button class="ea-btn ea-btn--tertiary" aria-expanded="${expanded}">View Plan Summary ${icon.chevronDown()}</button>
        <button class="ea-btn ${cartBtnClass}">${cartLabel}</button>
      </div>
      ${expanded ? `
        <hr class="ea-plan__divider">
        ${BENEFITS.map(([h, l1, l2]) => `
          <div class="ea-plan__benefit">
            <p class="ea-plan__benefit-title">${h}</p>
            <ul><li>${l1}</li><li>${l2}</li></ul>
          </div>`).join('')}
        <div class="ea-plan__pdf-link">
          <a href="#">View Complete Summary of Benefits and Coverage</a>
          ${icon.documentPdf()}
        </div>` : ''}
    </div>`;
}

export default {
  title: 'Components/Flow/Plan',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Displays a single enrolled/available plan's key details — benefit type, carrier, plan name, cost, deductible, and actions. **Rebuilt 7/10/26** to match EA-DesignSystem-2021's Plan tile exactly. The standalone "Plan Compare" composition has been **removed** — comparison is a per-card \`Compare\` checkbox on Plan itself (select the checkbox on any number of Plan tiles to compare them), not a separate 3-cards-side-by-side component.

**Variants:** \`benefitType\` (Dental/Health) × \`cost\` (Premium / EmployeeEmployer split) × \`cart\` (Default / InCart, flips the cart button to a red "Remove from Cart") × \`expanded\` (adds the full Summary of Benefits list and a PDF link).

**Accessibility:** no special roles — a static content card. The \`Compare\` control should carry \`role="checkbox"\`/\`aria-checked\` (same pattern as the standalone Checkbox component) once wired up; "View Plan Summary" should carry \`aria-expanded\` reflecting the panel state.

**Do:** use the EmployeeEmployer split only for Employer-sponsored contexts; flip to the red "Remove from Cart" treatment only once the plan is actually in the cart.
**Don't:** show both cost layouts on the same card, or reuse the red treatment as a generic "cancel" style elsewhere.`,
      },
    },
  },
  argTypes: {
    benefitType: { control: 'select', options: ['Dental', 'Health'] },
    cost: { control: 'select', options: ['Premium', 'EmployeeEmployer'] },
    cart: { control: 'select', options: ['Default', 'InCart'] },
    expanded: { control: 'boolean' },
  },
  args: { benefitType: 'Dental', cost: 'Premium', cart: 'Default', expanded: false },
  render: planCard,
};

export const DentalPremium = { args: { benefitType: 'Dental', cost: 'Premium', cart: 'Default', expanded: false } };
export const HealthPremium = { args: { benefitType: 'Health', cost: 'Premium', cart: 'Default', expanded: false } };
export const HealthEmployeeEmployerSplit = { args: { benefitType: 'Health', cost: 'EmployeeEmployer', cart: 'Default', expanded: false } };
export const HealthInCart = { args: { benefitType: 'Health', cost: 'Premium', cart: 'InCart', expanded: false } };
export const HealthExpanded = { args: { benefitType: 'Health', cost: 'Premium', cart: 'Default', expanded: true } };
