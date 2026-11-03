import { canvas, figma } from '../../_shared.js';
import { search } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Search',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::SearchComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::SearchComponent.new(label: "Search plans", name: "q", value: params[:q], open: @suggestions.any?,
      results: @suggestions.map { |p| { label: p.name } }) %>
\`\`\`` } } },
};

export const Playground = {
  args: { value: 'kai', open: true },
  render: (args) => `<div style="min-height:220px">${search(args)}</div>`,
  parameters: {
    design: figma('87:3', 'Search'),
    docs: { description: { story: `
Input with a decorative leading Search icon and a Clear button once there's text. Keep a label for screen readers even when it's visually hidden; never rely on the placeholder. Hide the browser's own clear button for \`type="search"\`.

- Enter submits. Esc closes suggestions, or clears the text if they're closed. Clear empties the field and returns focus to it.
- Suggestions open after 2+ characters in a Menu (\`role="listbox"\`) with the matched text in SemiBold; "No results" uses the empty state. Announce result counts politely.` } },
  },
};
