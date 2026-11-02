// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc, id } from '../_shared.js';
import { DOC_TYPES, FILES_ADDED, FILES_ERROR } from '../data.js';
import { icon } from '../icons.js';
import { button } from './button.js';
import { alert, tag } from './feedback.js';
import { field } from './field.js';

export const progressBar = ({ value = 45, label = `Uploading… ${value}%`, name = 'Upload progress', showLabel = true } = {}) => {
  const lid = id('pb');
  return `<div class="vitae-progress-bar">
    <div class="vitae-progress-bar__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}" aria-label="${esc(name)}"${showLabel ? ` aria-describedby="${lid}"` : ''}><div class="vitae-progress-bar__fill" style="width:${value}%"></div></div>
    ${showLabel ? `<p class="vitae-progress-bar__label" id="${lid}">${esc(label)}</p>` : ''}
  </div>`;
};

export const LIMITS = 'PDF, JPG, PNG or GIF, up to 10 MB';

export const ACCEPT = '.pdf,.jpg,.jpeg,.png,.gif';

export const fileInput = ({ state = 'empty', docType = false, takePhoto = true, limits = LIMITS, error = 'That file is larger than 10 MB. Choose a smaller file or a different file type.', showPhotoOnDesktop = true } = {}) => {
  const fid = id('file'); const pid = id('photo');
  const cls = ['vitae-upload-input', state === 'dragover' ? 'is-dragover' : '', state === 'error' ? 'is-error' : '', showPhotoOnDesktop ? 'vitae-upload-input--show-photo' : ''].join(' ').trim();
  return `<div class="${cls}">
    ${docType ? field({ kind: 'select', label: 'Document type', placeholder: 'Select a document type', required: true, options: DOC_TYPES }) : ''}
    <div class="vitae-dropzone">
      ${icon('upload', 24, 'regular')}
      <p class="vitae-dropzone__prompt">Drag a file here, or</p>
      <div class="vitae-dropzone__actions">
        <input type="file" id="${fid}" class="vitae-file-trigger" accept="${ACCEPT}" multiple aria-describedby="${fid}-limits${state === 'error' ? ` ${fid}-error` : ''}"${state === 'error' ? ' aria-invalid="true"' : ''}>
        <label for="${fid}" class="vitae-btn vitae-btn--outline vitae-btn--primary">${icon('upload', 20, 'filled')}Choose file</label>
        ${takePhoto ? `<span class="vitae-photo-only"><input type="file" id="${pid}" class="vitae-file-trigger" accept="image/*" capture="environment">
        <label for="${pid}" class="vitae-btn vitae-btn--ghost vitae-btn--primary">${icon('camera', 20, 'filled')}Take a photo</label></span>` : ''}
      </div>
      <p class="vitae-dropzone__limits" id="${fid}-limits">${esc(limits)}</p>
    </div>
    ${state === 'error' ? `<p class="vitae-field__error" id="${fid}-error">${icon('error', 16, 'filled')}<span>${esc(error)}</span></p>` : ''}
  </div>`;
};

export const ghost = (label, iconName, level = 'primary', hidden = '') => `<button type="button" class="vitae-btn vitae-btn--ghost vitae-btn--${level}">${icon(iconName, 20, 'filled')}${esc(label)}${hidden ? `<span class="vitae-visually-hidden"> ${esc(hidden)}</span>` : ''}</button>`;

export const attachment = ({ state = 'attached', type = 'Paystub', name = 'Bennett_paystub_September.pdf', meta = '', progress = 45, showType = true, changeType = true } = {}) => {
  const defaults = { uploading: `Uploading… ${progress}%`, attached: 'PDF, 1.2 MB', error: 'Upload failed. Check your connection and try again.' };
  const m = meta || defaults[state];
  const fixable = state === 'error' && !/connection/i.test(m);
  const actions = state === 'uploading'
    ? ghost('Cancel', 'close', 'secondary', `upload of ${name}`)
    : [state === 'error' ? ghost(fixable ? 'Replace file' : 'Try again', 'upload', 'primary', name) : '',
      changeType ? ghost('Change type', 'edit', 'primary', `for ${name}`) : '',
      ghost('Remove', 'delete', 'destructive', name)].join('');
  return `<li class="vitae-attachment vitae-attachment--${state}">
    ${state === 'error' ? icon('error', 24, 'filled') : icon('document', 24, 'regular')}
    <div class="vitae-attachment__details">
      ${showType ? `<p class="vitae-attachment__type">${esc(type)}</p>` : ''}
      ${state === 'attached' ? `<a class="vitae-link vitae-attachment__name" href="#" download>${esc(name)}</a>` : `<p class="vitae-attachment__name">${esc(name)}</p>`}
      ${state === 'uploading' ? progressBar({ value: progress, label: m, name: `Uploading ${name}` }) : `<p class="vitae-attachment__meta">${esc(m)}</p>`}
    </div>
    <div class="vitae-attachment__actions">${actions}</div>
  </li>`;
};

export const uploadPanel = ({ state = 'files', title = 'Upload documents', intro = 'Upload a document that shows your income for the last 30 days, such as pay stubs or a letter from your employer. You can add more than one file.', showActions = true, docType = false, headingLevel = 3 } = {}) => {
  const files = state === 'error' ? FILES_ERROR : state === 'files' ? FILES_ADDED : [];
  const h = `h${headingLevel}`;
  return `<section class="vitae-upload-panel" aria-label="${esc(title)}">
    <div class="vitae-upload-panel__intro"><${h} class="vitae-upload-panel__title">${esc(title)}</${h}><p>${esc(intro)}</p></div>
    ${state === 'error' ? alert({ type: 'error', title: '2 files need your attention', message: 'Fix or remove these files, then submit again.', dismissible: false }) : ''}
    ${files.length ? `<ul class="vitae-upload-list" aria-label="Files to submit">${files.map((f) => attachment(f)).join('')}</ul>${button({ label: 'Add another document', style: 'ghost', iconLeft: 'add-circle' })}` : fileInput({ docType })}
    <p class="vitae-visually-hidden" aria-live="polite"></p>
    ${showActions ? `<div class="vitae-upload-panel__actions">${button({ label: 'Cancel', style: 'outline' })}${button({ label: 'Submit documents', iconLeft: 'upload' })}</div>` : ''}
  </section>`;
};

export const HISTORY_TAG = { 'In review': 'info', Accepted: 'success', Rejected: 'error' };

export const historyRow = ({ status = 'In review', type = 'Paystub', name = 'Bennett_paystub_September.pdf', submitted = '10/12/2026', reason = 'The pay stub doesn’t show your name. Upload a pay stub with your name and the pay period.', remove = true } = {}) => `
  <li class="vitae-history-row">
    <div class="vitae-attachment__details">
      <p class="vitae-attachment__type">${esc(type)}</p>
      <a class="vitae-link vitae-attachment__name" href="#" download>${esc(name)}</a>
      ${status === 'Rejected' ? `<p class="vitae-history-row__reason">Reason: ${esc(reason)}</p>` : ''}
    </div>
    <p class="vitae-history-row__date"><span>Submitted:</span>${esc(submitted)}</p>
    <div class="vitae-history-row__status">${tag({ label: status, type: HISTORY_TAG[status] })}</div>
    <div class="vitae-history-row__actions">${ghost('Download', 'download', 'primary', name)}${remove ? ghost('Remove', 'delete', 'destructive', name) : ''}</div>
  </li>`;

export const VERIFY = {
  'Action needed': { tag: 'warning', msg: 'We couldn’t verify the income you reported. Upload proof of income for the last 30 days.' },
  Uploading: { tag: 'warning', msg: 'We couldn’t verify the income you reported. Upload proof of income for the last 30 days.' },
  'In review': { tag: 'info', msg: 'We received your documents. We’ll review them within 10 business days.' },
  Verified: { tag: 'success', msg: 'Your income is verified. No action needed.' },
};

export const verification = ({ state = 'Action needed', title = 'Income', member = 'Marcus Bennett', due = '12/01/2026', message = '' } = {}) => {
  const v = VERIFY[state]; const tid = id('verify');
  const needs = state === 'Action needed' || state === 'Uploading';
  return `<section class="vitae-verification${state === 'Uploading' ? ' is-open' : ''}" aria-labelledby="${tid}">
    <div class="vitae-verification__summary">
      <div class="vitae-verification__details">
        <h3 class="vitae-verification__title" id="${tid}">${esc(title)}</h3>
        <p class="vitae-verification__member">${esc(member)}</p>
        <p>${esc(message || v.msg)}</p>
        ${needs ? `<p class="vitae-verification__due">Due by: ${esc(due)}</p>` : ''}
      </div>
      <div class="vitae-verification__side">${tag({ label: needs ? 'Action needed' : state, type: v.tag })}${state === 'Action needed' ? `<button type="button" class="vitae-btn vitae-btn--outline vitae-btn--primary" aria-expanded="false">${icon('upload', 20, 'filled')}Upload documents<span class="vitae-visually-hidden"> for ${esc(title)}</span></button>` : ''}</div>
    </div>
    ${state === 'Uploading' ? uploadPanel({ title: `Upload proof of ${title.toLowerCase()}`, headingLevel: 4 }) : ''}
    ${state === 'In review' ? `<ul class="vitae-upload-history" aria-label="Submitted files">${historyRow({ name: 'Bennett_paystub_September.pdf' })}${historyRow({ name: 'Bennett_paystub_October.pdf' })}</ul>${button({ label: 'Upload more documents', style: 'ghost', iconLeft: 'add-circle' })}` : ''}
  </section>`;
};

// ---------- Interactive demo ----------
export const fmtSize = (b) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export const OK_TYPES = /\.(pdf|jpe?g|png|gif)$/i;
