import { canvas, figma, argDocs } from '../../_shared.js';
import { choiceGroup, wireLayout } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Choice group',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
  parameters: { docs: { description: { component: `### Rails

\`Vitae::ChoiceGroupComponent\` in \`rails/vitae_components\` renders this markup (CI checks they match).

\`\`\`erb
<%= render Vitae::ChoiceGroupComponent.new(legend: "Is anyone in your household pregnant?", name: "pregnant",
      helper: "Pregnancy can affect what coverage people qualify for.",
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
      error: @form.errors[:pregnant].first) %>
\`\`\`` } } },
};

/* ---------- Choice group + Field-set ---------- */
export const Playground = {
  args: { type: 'radio', error: false, inline: false },
  argTypes: argDocs({
    type: ["Radio for one answer, checkbox for any number of answers. Rails: `type:`", "radio"],
    error: ["Show the group error. In Rails `error:` takes the message text.", "false", "boolean"],
    inline: ["Options side by side. Only for two or three short options like Yes / No. Rails: `inline:`", "false", "boolean"],
  }, { type: { control: 'inline-radio', options: ['radio', 'checkbox'] } }),
  render: ({ type, error, inline }) => {
    const radio = type === 'radio';
    return choiceGroup({
      type, inline,
      legend: radio ? 'Is anyone in your household pregnant?' : 'Does anyone have other health coverage?',
      helper: radio ? 'Pregnancy can affect what coverage people qualify for.' : 'Select all that apply.',
      options: (radio ? ['Yes', 'No'] : ['Medicare', 'Medicaid or CHIP', 'Coverage through a job', 'VA health care']).map((label) => ({ label })),
      error: error ? (radio ? 'Choose Yes or No.' : 'Choose at least one, or None of these.') : '',
    });
  },
  parameters: {
    design: figma('74:800', 'Choice group'),
    docs: { description: { story: 'A question with Radio (choose one) or Checkbox (choose any) options. Legend styled like a field label with the required asterisk; optional helper. The error message sits below all the options so it reads as belonging to the question, and every option shows the error border. `<fieldset aria-describedby="q-help q-error" aria-invalid="true"><legend>…</legend>`. Inline layout is fine for 2–3 short options (24px gap).' } },
  },
};
