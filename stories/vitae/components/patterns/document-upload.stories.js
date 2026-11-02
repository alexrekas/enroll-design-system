import { expect, userEvent, waitFor, within } from 'storybook/test';
import { canvas, figma } from '../../_shared.js';
import { button } from '../../markup/button.js';
import { alert } from '../../markup/feedback.js';
import { modal } from '../../markup/layout.js';
import { LIMITS, OK_TYPES, attachment, fileInput, fmtSize, historyRow, uploadPanel, verification } from '../../markup/upload.js';

export default {
  title: 'Vitae 27/Components/Patterns/Document upload',
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: {
    design: [figma('394:351', 'Upload/Panel'), figma('393:168', 'Upload/File input'), figma('394:109', 'Upload/Attachment'), figma('395:443', 'Upload/History row'), figma('395:654', 'Upload/Verification')],
    docs: { description: { component: `
A pattern for uploading one or more documents: verification documents (income, citizenship, residency), employer and broker files, and other supporting files. It's built from five parts that are used together:

1. **File input:** drop zone with Choose file and (on phones) Take a photo, plus an optional document type select.
2. **Attachment:** one row per file while it uploads, after it's attached, or when it fails.
3. **Panel:** the whole task: intro, file rows, Add another document, Cancel and Submit documents.
4. **History row:** a submitted file with its status, Download and Remove.
5. **Verification:** one request (for example Income for Marcus Bennett) with its status, due date and the panel inline.

Rules:

- **Never disable Submit documents.** Validate on submit and show an error summary (Alert) that lists the files to fix, then move focus to it.
- **Statuses use the existing Tag types:** Action needed = Warning, In review = Info, Accepted or Verified = Success, Rejected = Error. Rejected rows also show the reason in text.
- **Remove stays available after submitting** unless a program locks accepted documents.
- **Document type is optional per request.** When it matters and isn't chosen, the type-confirm dialog can ask before submitting; turn it off where it doesn't apply.
- **No card inside a card.** File rows are a divided list inside the panel; the panel sits inside the page's card or section.
- Long file names wrap. Actions sit on their own line and wrap on narrow screens; under 480px the panel's footer stacks full width with Submit first.` } },
  },
};

export const FileInput = {
  name: 'File input',
  args: { state: 'empty', docType: false, takePhoto: true, showPhotoOnDesktop: true, limits: LIMITS },
  argTypes: { state: { control: 'inline-radio', options: ['empty', 'dragover', 'error'] } },
  render: (args) => fileInput(args),
  parameters: {
    design: figma('393:168', 'Upload/File input'),
    docs: { description: { story: `
A drop zone around a real \`<input type="file" multiple accept="…">\`. The input is visually hidden but stays focusable; its \`<label>\` is styled as an Outline button and shows the focus ring.

- **Take a photo** is a second input with \`accept="image/*" capture="environment"\`, which opens the camera on phones. In product, show it only on touch devices (\`.vitae-photo-only\` does this with \`pointer: coarse\`); this story shows it everywhere.
- **Drag over:** add \`.is-dragover\` on \`dragenter\`/\`dragover\` and remove it on \`dragleave\`/\`drop\`. Drag and drop is an extra; the buttons always work.
- **Limits** are always visible and tied to the input with \`aria-describedby\`. Check type and size in the browser before uploading, and again on the server.
- **Error:** \`.is-error\` and an error message tied with \`aria-describedby\` and \`aria-invalid\`.
- **Document type** (optional): a required Dropdown above the drop zone when one upload covers one type.` } },
  },
};

export const Attachment = {
  args: { state: 'attached', type: 'Paystub', name: 'Bennett_paystub_September.pdf', meta: '', progress: 45, showType: true, changeType: true },
  argTypes: { state: { control: 'inline-radio', options: ['uploading', 'attached', 'error'] }, progress: { control: { type: 'range', min: 0, max: 100 } } },
  render: (args) => `<ul class="vitae-upload-list" style="max-width:560px">${attachment(args)}</ul>`,
  parameters: {
    design: figma('394:109', 'Upload/Attachment'),
    docs: { description: { story: `
One file in an upload list (\`<li>\` in a \`<ul class="vitae-upload-list">\`). Rows are separated by dividers, not cards.

- **Uploading:** Progress bar and Cancel. **Attached:** the file name is a download link, with type and size, Change type and Remove. **Error:** what went wrong and how to fix it, with Try again (connection problems) or Replace file (wrong type or too large), Change type and Remove.
- Action buttons are Ghost buttons with the file name in visually hidden text, so "Remove Bennett_paystub_September.pdf" is unique for screen readers.
- After Remove, move focus to the next row's first action (or to Add another document) and announce "Removed [file name]".
- Hide the document type when the request has no type select; hide Change type when there's only one type.` } },
  },
};

export const AttachmentStates = {
  name: 'Attachment states',
  render: () => `<ul class="vitae-upload-list" style="max-width:560px">${attachment({ state: 'uploading', type: 'Employer letter', name: 'Employer_letter.pdf' })}${attachment({ state: 'attached' })}${attachment({ state: 'error', name: 'Bennett_paystub_October.pdf' })}${attachment({ state: 'error', name: 'Tax_return_2025.pdf', type: 'Tax return', meta: 'That file is larger than 10 MB. Choose a smaller file.' })}</ul>`,
};

export const Panel = {
  args: { state: 'files', title: 'Upload documents', showActions: true, docType: false },
  argTypes: { state: { control: 'inline-radio', options: ['empty', 'files', 'error'] } },
  render: (args) => `<div class="vitae-card" style="max-width:640px">${uploadPanel(args)}</div>`,
  parameters: {
    design: figma('394:351', 'Upload/Panel'),
    docs: { description: { story: `
The whole upload task for one request. It has no card of its own; place it in the page's card or section.

- **Empty** shows the file input. After a file is added the input collapses into **Add another document** (Ghost, add-circle icon), which opens the file picker again.
- **Submit documents** (Solid, upload icon) is never disabled. On submit with problems, show the **error summary** Alert at the top, move focus to it, and mark each file that needs attention.
- Cancel is an Outline button. Under 480px the footer stacks full width with Submit first (\`column-reverse\`, so the DOM order stays Cancel, Submit).
- One polite live region in the panel announces "Bennett_paystub_September.pdf uploaded", "Upload failed" and "Removed …".
- **Show actions** off: use when the page supplies its own footer.` } },
  },
};

export const HistoryRow = {
  name: 'History row',
  args: { status: 'Rejected', type: 'Paystub', name: 'Paystub_Aug.jpg', submitted: '09/03/2026', remove: true },
  argTypes: { status: { control: 'inline-radio', options: ['In review', 'Accepted', 'Rejected'] } },
  render: (args) => `<ul class="vitae-upload-history" style="max-width:880px">${historyRow(args)}</ul>`,
  parameters: {
    design: figma('395:443', 'Upload/History row'),
    docs: { description: { story: `
A submitted file. The file name downloads it; **Download** and **Remove** are always visible (no Actions menu). Status uses existing Tag types: In review = Info, Accepted = Success, Rejected = Error, with the reason under the file name.

- \`<ul class="vitae-upload-history">\` of \`<li>\` rows. Under 600px the columns stack: document and status on top, date, then actions.
- Turn **Remove** off where a program locks accepted documents.` } },
  },
};

export const History = {
  name: 'History',
  render: () => `<div class="vitae-upload-page"><h2>Household documents</h2><p>Documents you and your household have uploaded. Download a copy or remove a file you uploaded by mistake.</p>
    <ul class="vitae-upload-history">${historyRow({ status: 'Accepted', type: 'Lease', name: 'Lease_2026.pdf', submitted: '09/03/2026' })}${historyRow({ status: 'Rejected', name: 'Paystub_Aug.jpg', submitted: '09/03/2026' })}${historyRow({ status: 'In review', name: 'Paystub_Sept.pdf' })}</ul>
    <div>${button({ label: 'Upload documents', style: 'outline', iconLeft: 'upload' })}</div></div>`,
  parameters: { design: figma('395:848', 'Example: DC household documents') },
};

export const Verification = {
  args: { state: 'Action needed', title: 'Income', member: 'Marcus Bennett', due: '12/01/2026' },
  argTypes: { state: { control: 'inline-radio', options: ['Action needed', 'Uploading', 'In review', 'Verified'] } },
  render: (args) => `<div style="max-width:880px">${verification(args)}</div>`,
  parameters: {
    design: figma('395:654', 'Upload/Verification'),
    docs: { description: { story: `
One verification request. **Action needed** shows the reason, due date and Upload documents (Outline), which opens the panel inline (**Uploading**; \`aria-expanded\` on the button, focus moves to the panel heading). **In review** lists the submitted files and offers Upload more documents. **Verified** needs no action.

- Tags: Action needed = Warning, In review = Info, Verified = Success.
- Under 520px the status and button move below the details.` } },
  },
};

export const ConfirmType = {
  name: 'Confirm document type (optional)',
  render: () => modal({ title: 'Is the document type right?', body: 'You’re submitting 2 paystubs and 1 employer letter. If any file is a different kind of document, go back and change its type before you submit.', primary: 'Submit documents', secondaryLabel: 'Go back' }),
  parameters: {
    design: figma('395:1013', 'Example: Confirm document type'),
    docs: { description: { story: 'Optional check before submitting, for requests where the document type matters. Turn it off per verification when it doesn’t apply. Summarize the types being submitted; Go back returns focus to the first Change type button.' } },
  },
};

export const MeDocumentsPage = {
  name: 'Example · documents we need',
  render: () => `<div class="vitae-upload-page"><h2>Documents we need</h2><p>Upload documents for each item below by the due date so your coverage isn’t interrupted. You can upload more than one file for each item.</p>
    ${verification({ state: 'Uploading' })}${verification({ state: 'In review', title: 'Citizenship', member: 'Dana Bennett' })}${verification({ state: 'Verified', title: 'Residency', message: 'Your residency is verified. No action needed.' })}</div>`,
  parameters: { design: figma('395:660', 'Example: ME verification documents') },
};

export const Mobile = {
  name: 'Example · mobile',
  render: () => `<div style="width:343px;max-width:100%" title="Card width on a 375px screen with 16px gutters"><div class="vitae-card" style="max-width:none;padding:16px">${uploadPanel({ state: 'files' })}</div></div>`,
  parameters: { design: figma('395:938', 'Example: Upload panel (mobile 375)') },
};

export const TryIt = {
  name: 'Try it',
  args: { confirmType: true },
  render: ({ confirmType }) => {
    const root = document.createElement('div');
    root.className = 'vitae-card';
    root.style.maxWidth = '640px';
    let files = [];
    const draw = (summary = '') => {
      root.innerHTML = `<section class="vitae-upload-panel" aria-label="Upload documents">
        <div class="vitae-upload-panel__intro"><h3 class="vitae-upload-panel__title">Upload documents</h3><p>Choose real files or drag them in. Nothing leaves your browser; uploads are simulated. Files over 10 MB or of other types show an error.</p></div>
        ${summary}
        ${files.length ? `<ul class="vitae-upload-list" aria-label="Files to submit">${files.map((f) => attachment(f)).join('')}</ul>` : ''}
        ${fileInput({ showPhotoOnDesktop: false })}
        <p class="vitae-visually-hidden" aria-live="polite" data-live></p>
        <div class="vitae-upload-panel__actions">${button({ label: 'Clear', style: 'outline' })}${button({ label: 'Submit documents', iconLeft: 'upload' })}</div>
      </section>`;
      if (files.length) root.querySelector('.vitae-upload-input').hidden = !root.dataset.adding;
      if (files.length && !root.dataset.adding) root.querySelector('.vitae-upload-list').insertAdjacentHTML('afterend', button({ label: 'Add another document', style: 'ghost', iconLeft: 'add-circle' }));
    };
    const say = (t) => { const l = root.querySelector('[data-live]'); if (l) l.textContent = t; };
    const add = (list) => {
      delete root.dataset.adding;
      for (const file of list) {
        const f = { state: 'uploading', type: 'Paystub', name: file.name, progress: 0, size: file.size };
        if (!OK_TYPES.test(file.name)) Object.assign(f, { state: 'error', meta: 'This file type can’t be uploaded. Save it as PDF, JPG, PNG or GIF and try again.' });
        else if (file.size > 10485760) Object.assign(f, { state: 'error', meta: 'That file is larger than 10 MB. Choose a smaller file.' });
        files.push(f);
        if (f.state === 'uploading') {
          const t = setInterval(() => {
            f.progress = Math.min(100, f.progress + 20);
            if (f.progress >= 100) { clearInterval(t); Object.assign(f, { state: 'attached', meta: `${file.name.split('.').pop().toUpperCase()}, ${fmtSize(file.size)}` }); draw(); say(`${file.name} uploaded`); } else draw();
          }, 400);
        }
      }
      draw();
    };
    root.addEventListener('change', (e) => { if (e.target.type === 'file' && e.target.files.length) add([...e.target.files]); });
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      const label = b.childNodes[b.childNodes.length - (b.querySelector('.vitae-visually-hidden') ? 2 : 1)]?.textContent?.trim();
      const li = b.closest('.vitae-attachment');
      const idx = li ? [...root.querySelectorAll('.vitae-attachment')].indexOf(li) : -1;
      if (label === 'Remove' || label === 'Cancel') { const [r] = files.splice(idx, 1); draw(); say(`Removed ${r.name}`); }
      else if (label === 'Replace file' || label === 'Try again') { files.splice(idx, 1); root.dataset.adding = '1'; draw(); root.querySelector('.vitae-file-trigger').focus(); }
      else if (label === 'Add another document') { root.dataset.adding = '1'; draw(); root.querySelector('.vitae-file-trigger').click(); }
      else if (label === 'Clear') { files = []; draw(); }
      else if (label === 'Submit documents') {
        const bad = files.filter((f) => f.state === 'error').length;
        if (!files.length || bad || files.some((f) => f.state === 'uploading')) {
          draw(alert({ type: 'error', title: !files.length ? 'Add at least one document' : bad ? `${bad} file${bad > 1 ? 's' : ''} need${bad > 1 ? '' : 's'} your attention` : 'Wait for uploads to finish', message: !files.length ? 'Choose a file or take a photo, then submit.' : 'Fix or remove these files, then submit again.', dismissible: false }));
          const a = root.querySelector('.vitae-alert'); a.tabIndex = -1; a.focus();
        } else if (confirmType && !root.dataset.confirmed) {
          const counts = files.reduce((m, f) => ({ ...m, [f.type]: (m[f.type] || 0) + 1 }), {});
          const list = Object.entries(counts).map(([t, n]) => `${n} ${t.toLowerCase()}${n > 1 ? 's' : ''}`).join(' and ');
          root.insertAdjacentHTML('beforeend', modal({ title: 'Is the document type right?', body: `You’re submitting ${list}. If any file is a different kind of document, go back and change its type before you submit.`, primary: 'Submit documents', secondaryLabel: 'Go back' }));
          const m = root.querySelector('.vitae-modal-wrap');
          m.querySelector('.vitae-btn--solid').addEventListener('click', (ev) => { ev.stopPropagation(); root.dataset.confirmed = '1'; m.remove(); b.click(); });
          m.addEventListener('click', (ev) => { if (ev.target.closest('.vitae-btn--outline, .vitae-modal__close')) { ev.stopPropagation(); m.remove(); } });
          m.querySelector('.vitae-btn--solid').focus();
        } else {
          delete root.dataset.confirmed;
          const n = files.length; files = [];
          draw(alert({ type: 'success', title: `${n} document${n > 1 ? 's' : ''} submitted`, message: 'We’ll review them within 10 business days.', dismissible: false }));
        }
      }
    });
    root.addEventListener('dragover', (e) => { const z = e.target.closest('.vitae-upload-input'); if (z) { e.preventDefault(); z.classList.add('is-dragover'); } });
    root.addEventListener('dragleave', (e) => { const z = e.target.closest('.vitae-upload-input'); if (z && !z.contains(e.relatedTarget)) z.classList.remove('is-dragover'); });
    root.addEventListener('drop', (e) => { if (e.target.closest('.vitae-upload-input')) { e.preventDefault(); add([...e.dataTransfer.files]); } });
    draw();
    return root;
  },
  parameters: { docs: { description: { story: 'A working demo of the behavior: choose or drop files, watch them upload, remove or replace them, and submit. Uploads are simulated in the browser. Turn off **confirmType** to skip the optional dialog.' } } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const live = () => canvasElement.querySelector('[data-live]');
    const choose = async (files) => {
      const input = canvasElement.querySelector('.vitae-upload-input input[type="file"]');
      const dt = new DataTransfer(); files.forEach((f) => dt.items.add(f));
      input.files = dt.files; input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    await step('Submitting with no files shows the error summary and moves focus to it', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Submit documents/ }));
      await expect(canvas.getByText('Add at least one document')).toBeInTheDocument();
      await expect(canvasElement.querySelector('.vitae-alert')).toHaveFocus();
    });
    await step('A good file uploads; an unsupported type shows an error row', async () => {
      await choose([new File(['%PDF-1.4'], 'Paystub_Oct.pdf', { type: 'application/pdf' }), new File(['x'], 'scan.heic', { type: 'image/heic' })]);
      await waitFor(() => expect(live()).toHaveTextContent('Paystub_Oct.pdf uploaded'), { timeout: 4000 });
      await expect(canvasElement.querySelectorAll('.vitae-attachment--error')).toHaveLength(1);
    });
    await step('Remove takes the file out and announces it', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Remove scan.heic' }));
      await expect(live()).toHaveTextContent('Removed scan.heic');
      await expect(canvasElement.querySelectorAll('.vitae-attachment')).toHaveLength(1);
    });
  },
};
