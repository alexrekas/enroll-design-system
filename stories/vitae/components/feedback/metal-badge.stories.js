import { canvas, figma, matrix } from '../../_shared.js';
import { metalBadge } from '../../markup/feedback.js';

export default {
  title: 'Vitae 27/Components/Feedback/Metal badge',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::MetalBadgeComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::MetalBadgeComponent.new(level: plan.metal_level) %>   <%# "Bronze", "Silver", "Gold", "Platinum", "Catastrophic" %>
\`\`\`` } }, design: figma('180:32', 'Metal badge') },
};

export const AllLevels = {
  name: 'All levels',
  render: () => matrix(5, ['Bronze', 'Silver', 'Gold', 'Platinum', 'Catastrophic'].map((l) => [l, metalBadge(l)])),
  parameters: { docs: { description: { story: 'ACA plan level. Same colors in every client and mode; black text on Bronze, Silver and Gold, white on Platinum and Catastrophic (all 4.5:1 or better). Always shows the level name. `<span class="vitae-metal-badge vitae-metal-badge--gold">Gold</span>`' } } },
};
