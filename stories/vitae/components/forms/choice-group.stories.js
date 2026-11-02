import { canvas, figma, id } from '../../_shared.js';
import { icon } from '../../icons.js';
import { wireLayout } from '../../markup/layout.js';
import { checkbox } from '../../markup/selection.js';

export default {
  title: 'Vitae 27/Components/Forms/Choice group',
  tags: ['autodocs'],
  decorators: [wireLayout, canvas],
};

/* ---------- Choice group + Field-set ---------- */
export const Playground = {
  args: { type: 'radio', error: false, inline: false },
  argTypes: { type: { control: 'inline-radio', options: ['radio', 'checkbox'] } },
  render: ({ type, error, inline }) => {
    const gid = id('q'); const radio = type === 'radio';
    const opts = radio ? ['Yes', 'No'] : ['Medicare', 'Medicaid or CHIP', 'Coverage through a job', 'VA health care'];
    return `<fieldset class="vitae-choice-group${inline ? ' vitae-choice-group--inline' : ''}" aria-describedby="${gid}-help${error ? ` ${gid}-error` : ''}"${error ? ' aria-invalid="true"' : ''}>
      <legend>${radio ? 'Is anyone in your household pregnant?' : 'Does anyone have other health coverage?'} <span class="vitae-field__required" aria-hidden="true">*</span></legend>
      <p class="vitae-choice-group__helper" id="${gid}-help">${radio ? 'Pregnancy can affect what coverage people qualify for.' : 'Select all that apply.'}</p>
      <div class="vitae-choice-group__options">${opts.map((o) => checkbox({ radio, name: gid, label: o, state: error ? 'error' : 'rest' })).join('')}</div>
      ${error ? `<p class="vitae-field__error vitae-choice-group__error" id="${gid}-error">${icon('error', 16, 'filled')}<span>${radio ? 'Choose Yes or No.' : 'Choose at least one, or None of these.'}</span></p>` : ''}</fieldset>`;
  },
  parameters: {
    design: figma('74:800', 'Choice group'),
    docs: { description: { story: 'A question with Radio (choose one) or Checkbox (choose any) options. Legend styled like a field label with the required asterisk; optional helper. The error message sits below all the options so it reads as belonging to the question, and every option shows the error border. `<fieldset aria-describedby="q-help q-error" aria-invalid="true"><legend>…</legend>`. Inline layout is fine for 2–3 short options (24px gap).' } },
  },
};
