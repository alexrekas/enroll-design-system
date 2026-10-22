import { canvas, figma, esc, id, matrix } from './_shared.js';
import { icon } from './icons.js';

export const checkbox = ({ label = 'Bronze', description = '', checked = 'false', state = 'rest', error = '', radio = false, name = 'g' } = {}) => {
  const cid = id(radio ? 'radio' : 'cb');
  const errId = error ? `${cid}-error` : '';
  const mark = radio ? '<span class="vitae-check__dot"></span>' : checked === 'indeterminate' ? '<span class="vitae-check__dash"></span>' : icon('checkmark', 16, 'filled');
  return `<div class="vitae-check${radio ? ' vitae-check--radio' : ''}${['hover', 'active', 'focus', 'error'].includes(state) ? ` is-${state}` : ''}">
    <input class="vitae-check__input" type="${radio ? 'radio' : 'checkbox'}" id="${cid}"${radio ? ` name="${name}"` : ''}${checked === 'true' ? ' checked' : ''}${state === 'disabled' ? ' disabled' : ''}${error || state === 'error' ? ' aria-invalid="true"' : ''}${errId ? ` aria-describedby="${errId}"` : ''}${checked === 'indeterminate' ? ' data-indeterminate' : ''}>
    <span class="vitae-check__box" aria-hidden="true">${mark}</span>
    <label class="vitae-check__label" for="${cid}">${esc(label)}</label>
    ${description ? `<p class="vitae-check__description">${esc(description)}</p>` : ''}
    ${error ? `<p class="vitae-field__error vitae-check__error" id="${errId}">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}
  </div>`;
};

export const toggle = ({ label = 'Email me reminders', description = '', on = false, state = 'rest' } = {}) => {
  const tid = id('toggle');
  return `<div class="vitae-toggle${['hover', 'focus'].includes(state) ? ` is-${state}` : ''}">
    <button type="button" role="switch" aria-checked="${on}" id="${tid}" class="vitae-toggle__track"${state === 'disabled' ? ' disabled' : ''}><span class="vitae-toggle__knob"></span></button>
    <label class="vitae-toggle__label" for="${tid}">${esc(label)}</label>
    ${description ? `<p class="vitae-toggle__description">${esc(description)}</p>` : ''}
  </div>`;
};

/** Live behaviour in the canvas: indeterminate checkboxes and clickable switches. */
const wire = (storyFn) => {
  const el = storyFn();
  setTimeout(() => {
    document.querySelectorAll('[data-indeterminate]').forEach((i) => { i.indeterminate = true; });
    document.querySelectorAll('.vitae-toggle__track').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
    });
  });
  return el;
};

const STATES = ['rest', 'hover', 'active', 'focus', 'error', 'disabled'];

export default {
  title: 'Vitae 27/Components/Checkbox, Radio and Toggle',
  excludeStories: /^[a-z]/,
  decorators: [wire, canvas],
  parameters: {
    design: [figma('58:240', 'Checkbox'), figma('61:137', 'Radio'), figma('68:75', 'Toggle')],
    docs: { description: { component: `
Native inputs styled with a sibling box, so they keep keyboard, screen reader and form behaviour. Rows are 44px tall (10px top and bottom) with an 8px gap to the label; labels and descriptions wrap with the control aligned to the first line.

- **Checkbox:** 24px box, 2px border, radius 4. Checked and indeterminate use \`--vitae-action-primary\`. Indeterminate is set in JS (\`input.indeterminate = true\`) and announces "mixed". Hover on an unchecked box previews a faint checkmark.
- **Radio:** 24px circle with a 12px dot. Use for 2–4 options in a \`<fieldset>\` with a \`<legend>\`; arrow keys move between options.
- **Toggle:** \`<button role="switch" aria-checked>\`, for settings that apply immediately. Use Checkbox when the choice is submitted later. State shows by knob position as well as color; on hover the knob leans 6px toward the other side.
- **Error:** \`aria-invalid="true"\` and the message via \`aria-describedby\` (on the fieldset for radio groups).` } },
  },
};

export const Checkbox = {
  args: { label: 'Bronze', description: '', checked: 'false', state: 'rest', error: '' },
  argTypes: { checked: { control: 'inline-radio', options: ['false', 'true', 'indeterminate'] }, state: { control: 'select', options: STATES } },
  render: (args) => checkbox(args),
};

export const CheckboxStates = {
  name: 'Checkbox · all states',
  render: () => matrix(6, ['false', 'true', 'indeterminate'].flatMap((checked) => STATES.map((state) => [`${checked} · ${state}`, checkbox({ checked, state, label: 'Silver' })]))),
};

export const Radio = {
  args: { label: 'Yes', description: '', checked: 'false', state: 'rest' },
  argTypes: { checked: { control: 'inline-radio', options: ['false', 'true'] }, state: { control: 'select', options: STATES } },
  render: (args) => checkbox({ ...args, radio: true }),
};

export const RadioGroup = {
  name: 'Radio · group',
  render: () => `<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:var(--vitae-font-weight-semibold);margin-bottom:4px">Does anyone in your household have health coverage through a job?</legend>
    ${checkbox({ radio: true, name: 'job', label: 'Yes', checked: 'true' })}${checkbox({ radio: true, name: 'job', label: 'No' })}${checkbox({ radio: true, name: 'job', label: "I'm not sure", description: "We'll ask a few questions to find out." })}</fieldset>`,
};

export const RadioStates = {
  name: 'Radio · all states',
  render: () => matrix(6, ['false', 'true'].flatMap((checked) => STATES.map((state) => [`${checked} · ${state}`, checkbox({ radio: true, name: `r-${checked}-${state}`, checked, state, label: 'Yes' })]))),
};

export const Toggle = {
  args: { label: 'Email me reminders', description: 'We send a reminder 30 days before open enrollment ends.', on: false, state: 'rest' },
  argTypes: { state: { control: 'inline-radio', options: ['rest', 'hover', 'focus', 'disabled'] } },
  render: (args) => toggle(args),
};

export const ToggleStates = {
  name: 'Toggle · all states',
  render: () => matrix(4, [false, true].flatMap((on) => ['rest', 'hover', 'focus', 'disabled'].map((state) => [`${on ? 'on' : 'off'} · ${state}`, toggle({ on, state, label: 'Paperless notices' })]))),
};
