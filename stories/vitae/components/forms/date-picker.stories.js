import { canvas, figma, id } from '../../_shared.js';
import { icon } from '../../icons.js';
import { calendar } from '../../markup/layout.js';

export default {
  title: 'Vitae 27/Components/Forms/Date picker',
  tags: ['autodocs'],
  decorators: [canvas],
};

export const Playground = {
  args: { open: true },
  render: ({ open }) => {
    const did = id('date');
    return `<div style="min-height:${open ? 420 : 120}px"><div class="vitae-field"><div class="vitae-field__label-row"><label class="vitae-field__label" for="${did}">Date of birth</label></div>
      <div class="vitae-field__control vitae-popover-anchor"><input class="vitae-input has-trailing" id="${did}" inputmode="numeric" autocomplete="bday" placeholder="MM/DD/YYYY" value="10/14/2026" aria-describedby="${did}-hint">
        <button type="button" class="vitae-datepicker__button" aria-label="Choose date" aria-haspopup="dialog" aria-expanded="${open}">${icon('calendar', 20, 'filled')}</button>${open ? calendar() : ''}</div>
      <p class="vitae-field__helper" id="${did}-hint">MM/DD/YYYY</p></div></div>`;
  },
  parameters: {
    design: [figma('73:6441', 'Date picker'), figma('73:21', 'Calendar'), figma('73:20', 'Calendar/Day')],
    docs: { description: { story: `
Typed MM/DD/YYYY entry with an optional calendar. Typing always works, so date of birth never needs the calendar (\`inputmode="numeric"\`, \`autocomplete="bday"\`). Keep the format hint visible. Validate on blur; impossible dates (02/30) show the error state.

- The 44×44 calendar button has \`aria-label="Choose date"\`, \`aria-haspopup="dialog"\` and \`aria-expanded\`. The calendar opens 4px below; picking a day writes the date and returns focus to the input.
- Calendar: \`role="dialog"\` with a \`role="grid"\` labelled by the month. Arrows move a day or week, PageUp/PageDown a month (Shift for a year), Home/End the week, Enter/Space selects, Esc closes.
- Days: today is a filled brand circle (\`aria-current="date"\`), selected has a brand border (\`aria-selected="true"\`), outside days are secondary, disabled days \`aria-disabled="true"\`.` } },
  },
};
