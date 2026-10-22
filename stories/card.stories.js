export default {
  title: 'Legacy (v1)/Components/Card',
  tags: ['autodocs'],
  parameters: {
    design: [
      {
        "label": "EA-DesignSystem-2021 · Card",
        "status": "reference",
        "url": "https://www.figma.com/design/pwv7np3TmLIWuBxO7Bz1go/EA-DesignSystem-2021?node-id=1089-15191",
        "note": "Built 7/10; not re-verified"
      }
    ],
    docs: {
      description: {
        component: `Generic content container with title, divider, and body — used as the base surface for other patterns (e.g. Plan cards).

**Accessibility:** no special role — a plain container. If a Card is interactive (clickable as a whole), wrap it in a real \`<button>\` or \`<a>\` rather than adding a click handler to the \`<div>\`, so it's keyboard-reachable.

**Do:** use \`.ea-card__divider\` between title and body when both are present.
**Don't:** stack more than one divider — one is sufficient to separate header from content.`,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
  },
  args: { title: 'Card Title', body: 'Content goes here\nMore content' },
  render: ({ title, body }) => `
    <div class="ea-card">
      <h3 class="ea-card__title">${title}</h3>
      <hr class="ea-card__divider">
      <p class="ea-card__body">${body.split('\n').join('<br>')}</p>
      <button class="ea-btn ea-btn--primary">Button</button>
    </div>`,
};

export const Default = {};
