const planCard = () => `
  <div class="ea-plan">
    <div class="ea-plan__body">
      <h3 class="ea-plan__title">Aetna Gold HN Only 6000 80% $15/50 E</h3>
      <div class="ea-plan__details">
        <div class="ea-plan__col">
          <div class="ea-plan__labels"><span>Status:</span><span>Coverage Start:</span><span>Plan Selected:</span><span>Plan ID:</span></div>
          <div class="ea-plan__values"><span>Starting Soon</span><span>07/01/2026</span><span>05/30/2026</span><span>1406017</span></div>
        </div>
        <div class="ea-plan__col">
          <div class="ea-plan__labels"><span>Premium</span><span>Coverage:</span><span>Level:</span><span>Type:</span></div>
          <div class="ea-plan__values"><span>$272.81</span><span>Health</span><span>Gold</span><span>HMO</span></div>
        </div>
      </div>
      <div class="ea-plan__col">
        <div class="ea-plan__labels"><span>Covered:</span></div>
        <div class="ea-plan__values"><span>Cheryl (42)</span></div>
      </div>
    </div>
    <div class="ea-plan__footer">
      <span>Summary of Benefits &amp; Coverage</span>
      <span>Actions ⌄</span>
    </div>
  </div>`;

export default {
  title: 'Components/Flow/Plan',
};

export const SinglePlan = { render: planCard };

export const PlanCompare = {
  render: () => `<div class="ea-plan-compare">${planCard()}${planCard()}${planCard()}</div>`,
};
