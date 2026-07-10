export default {
  title: 'Components/Card',
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
