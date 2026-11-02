// Vitae 27 markup: pure functions that return the HTML contract for each component.
// Stories render these; the Rails components should produce the same markup.
import { esc, id } from '../_shared.js';
import { PLANS } from '../data.js';
import { icon } from '../icons.js';
import { button } from './button.js';
import { alert, metalBadge, tag } from './feedback.js';
import { field } from './field.js';
import { checkbox } from './selection.js';

export const NETWORK_LOCAL = { ea: 'Regional', dc: 'DC Metro', ma: 'Massachusetts / Regional', me: 'Maine / Regional' };

export const PROGRAM_TAG = { dc: [['dc-healthy', 'Healthy DC Plan']], me: [['me-clear-choice', 'Clear Choice Plan']], ma: [['ma-premium-value', 'Premium Value Plan']], ea: [] };

export const CURRENT_TAG = (c) => (c === 'me' ? ['me-current-plan', 'Your current plan'] : ['current-plan', 'Current plan']);

export const clientOf = (g) => g.theme || 'ea';

export const wireShopping = (storyFn) => {
  const el = storyFn();
  setTimeout(() => {
    document.querySelectorAll('.vitae-compare__section button').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', String(open)); b.closest('tbody').querySelectorAll('tr:not(.vitae-compare__section)').forEach((r) => { r.hidden = !open; }); });
    });
    document.querySelectorAll('.vitae-carrier-trigger').forEach((b) => {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      b.addEventListener('click', () => { const list = document.getElementById(b.getAttribute('aria-controls')); const open = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', String(open)); list.hidden = !open; });
    });
  });
  return el;
};

export const planTile = ({ client = 'ea', context = 'shopping', compare = false, plan = PLANS[0], current = false, program = true, limit = false, width = '' }) => {
  const cid = id('cmp');
  const tags = [...(current ? [CURRENT_TAG(client)] : []), ...(program ? PROGRAM_TAG[client] : [])];
  const bar = context === 'enrolled'
    ? `<span class="vitae-plan__product">${icon('health', 20, 'regular')}Health</span>`
    : checkbox({ label: compare ? 'Added to compare' : 'Compare', checked: compare ? 'true' : 'false' }).replace('class="vitae-check"', 'class="vitae-check" style="padding:10px 0"');
  const premium = context === 'employer'
    ? `<div class="vitae-plan__split"><div><div class="vitae-plan__premium-label">You pay</div><div class="vitae-plan__amount">${plan.employee}</div><div class="vitae-plan__per">per month</div></div><div><div class="vitae-plan__premium-label">Employer pays</div><div class="vitae-plan__amount" style="font-size:var(--vitae-font-size-18);line-height:var(--vitae-font-line-height-27)">${plan.employer}</div></div></div>`
    : `<div class="vitae-plan__premium"><div class="vitae-plan__premium-label">Premium</div><div class="vitae-plan__amount">${plan.premium}</div><div class="vitae-plan__per">per month</div></div>`;
  return `<article class="vitae-plan${compare ? ' is-compared' : ''}" style="${width ? `width:${width}px;` : ''}" aria-labelledby="${cid}-n">
    <div class="vitae-plan__bar">${bar}${tags.length ? `<div class="vitae-plan__tags">${tags.map(([t, l]) => tag({ type: t, label: l, showIcon: t !== 'current-plan' && t !== 'ma-premium-value' })).join('')}</div>` : ''}</div>
    ${limit ? `<div style="padding:12px 24px 0">${alert({ type: 'info', title: '', message: 'You can compare up to 3 plans. Remove one to add this plan.', dismissible: false })}</div>` : ''}
    <div class="vitae-plan__body"><div class="vitae-plan__top"><div class="vitae-plan__plan"><div class="vitae-plan__logo" role="img" aria-label="Carrier logo">Carrier logo</div><h3 class="vitae-plan__name" id="${cid}-n">${esc(plan.name)}</h3></div>${premium}</div>
      <div class="vitae-plan__facts">
        <dl class="vitae-facts"><dt>Network:</dt><dd>${NETWORK_LOCAL[client]}</dd><dt>Deductible:</dt><dd>${plan.ded}</dd><dt>Max out-of-pocket:</dt><dd>${plan.moop}</dd></dl>
        <dl class="vitae-facts"><dt>Level:</dt><dd>${metalBadge(plan.level)}</dd><dt>Type:</dt><dd>${plan.type}</dd><dt>Doctor visit:</dt><dd>${plan.visit}</dd></dl>
      </div></div>
    <div class="vitae-plan__footer"><div class="vitae-plan__links"><a href="#" class="vitae-link vitae-link--standalone">Plan summary${icon('arrow-right', 20, 'filled')}</a><a href="#" class="vitae-link vitae-link--standalone">View plan details${icon('arrow-right', 20, 'filled')}</a></div>
      ${context === 'enrolled' ? button({ label: 'Actions', style: 'outline', iconRight: 'chevron-down' }) : button({ label: 'Select plan' })}</div></article>`;
};

/* ---------- Filter ---------- */
export const filterLabel = (title, { clear = false, info = false } = {}) => `<legend class="vitae-filter-label"><span class="vitae-filter-label__title">${esc(title)}${info ? `<button type="button" class="vitae-info-button" aria-expanded="false">${icon('info', 16, 'filled')}<span class="vitae-visually-hidden">About ${esc(title)}</span></button>` : ''}</span>${clear ? `<button type="button" class="vitae-link" style="background:none;border:0;padding:0;font:inherit;font-size:14px">Clear<span class="vitae-visually-hidden"> ${esc(title)}</span></button>` : ''}</legend>`;

export const group = (title, options, checked = [], opts = {}) => `<fieldset class="vitae-filter-group">${filterLabel(title, { ...opts, clear: checked.length > 0 })}${options.map((o) => checkbox({ label: o, checked: checked.includes(o) ? 'true' : 'false' })).join('')}</fieldset>`;

export const range = (title, max, error = false) => {
  const rid = id('rng');
  return `<fieldset class="vitae-filter-group">${filterLabel(title, { info: title.startsWith('Premium') })}<div class="vitae-range__inputs">
    ${field({ label: `Minimum ${title.toLowerCase()}`, showLabel: false, placeholder: '$0', value: error ? '$500' : '', helper: '', required: false, info: false }).replace('type="text"', 'type="text" inputmode="decimal"')}
    <span class="vitae-range__to" aria-hidden="true">to</span>
    ${field({ label: `Maximum ${title.toLowerCase()}`, showLabel: false, placeholder: max, value: error ? '$200' : '', helper: '', required: false, info: false, error: error ? 'Max must be more than min.' : '' }).replace('type="text"', 'type="text" inputmode="decimal"')}</div></fieldset>`.replace(/id="field/g, `id="${rid}-field`);
};

export const carrierField = (open = false, chosen = ['CareFirst BlueChoice', 'Kaiser Permanente']) => {
  const lid = id('carriers');
  const summary = chosen.length === 0 ? 'All carriers' : chosen.length === 1 ? chosen[0] : `${chosen.length} carriers`;
  return `<fieldset class="vitae-filter-group">${filterLabel('Carrier', { clear: chosen.length > 0 })}<div class="vitae-carrier-field vitae-field__control">
    <button type="button" class="vitae-input vitae-carrier-trigger${open ? ' is-active' : ''}" aria-expanded="${open}" aria-controls="${lid}">${esc(summary)}<span class="vitae-visually-hidden">, Carrier</span></button>${icon('chevron-down', 20, 'filled', { className: 'vitae-icon vitae-icon--trailing' })}
    <div class="vitae-carrier-list" id="${lid}"${open ? '' : ' hidden'}>${['CareFirst BlueChoice', 'Kaiser Permanente', 'Taro Health', 'UnitedHealthcare'].map((c) => checkbox({ label: c, checked: chosen.includes(c) ? 'true' : 'false' })).join('')}</div></div></fieldset>`;
};

export const PROGRAM_FEATURES = { ea: [], dc: ['Healthy DC Plan', 'Essential Plan'], ma: [], me: ['Clear Choice Plan'] };

export const filterPanel = ({ client = 'ea', layout = 'expanded', carrierOpen = false, rangeError = false }) => {
  if (layout === 'collapsed') return `<div class="vitae-filter-panel vitae-filter-panel--collapsed"><button type="button" class="vitae-filter-panel__toggle" aria-expanded="false" aria-controls="filters">Show filters${icon('chevron-down', 20, 'filled')}</button><span class="vitae-filter-panel__summary">Plan level: Silver, Gold · Carrier: 2 carriers · Premium up to $500</span><button type="button" class="vitae-link" style="background:none;border:0;padding:0;font:inherit">Clear all</button></div>`;
  const groups = {
    level: group('Plan level', ['Bronze', 'Silver', 'Gold', 'Platinum', 'Catastrophic'], ['Silver', 'Gold'], { info: true }),
    type: group('Plan type', ['HMO', 'POS', 'PPO'], [], { info: true }),
    network: group('Network', ['Nationwide', NETWORK_LOCAL[client]], [], { info: true }),
    features: group('Plan features', ['HSA eligible', ...PROGRAM_FEATURES[client]], [], { info: true }),
  };
  if (layout === 'sheet') {
    return `<div class="vitae-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-t"><div class="vitae-sheet__header"><h2 class="vitae-sheet__title" id="sheet-t">Filters</h2><button type="button" class="vitae-sheet__close" aria-label="Close filters">${icon('close', 24, 'regular')}</button></div>
      <div class="vitae-sheet__content">${groups.level}${groups.type}${groups.network}${groups.features}${group('Carrier', ['CareFirst BlueChoice', 'Kaiser Permanente', 'Taro Health', 'UnitedHealthcare'], ['CareFirst BlueChoice', 'Kaiser Permanente'])}${range('Premium (monthly)', '$1,000')}${range('Deductible', '$10,000')}</div>
      <div class="vitae-sheet__footer">${button({ label: 'Reset filters', style: 'outline' })}${button({ label: 'Apply filters' })}</div></div>`;
  }
  return `<div class="vitae-filter-panel" id="filters"><button type="button" class="vitae-filter-panel__toggle" aria-expanded="true" aria-controls="filters-body">Hide filters${icon('chevron-up', 20, 'filled')}</button>
    <div class="vitae-filter-panel__grid" id="filters-body">${groups.level}${groups.type}<div class="vitae-filter-panel__stack">${groups.network}${groups.features}</div>${carrierField(carrierOpen)}${range('Premium (monthly)', '$1,000', rangeError)}${range('Deductible', '$10,000')}</div>
    <div class="vitae-filter-panel__actions">${button({ label: 'Reset filters', style: 'outline' })}${button({ label: 'Apply filters' })}</div></div>`;
};

/* ---------- Plan compare ---------- */
export const chip = (name) => `<span class="vitae-chip" title="${esc(name)}"><span class="vitae-chip__name">${esc(name)}</span><button type="button" class="vitae-chip__remove" aria-label="Remove ${esc(name)} from comparison">${icon('close', 16, 'filled')}</button></span>`;

export const tray = (count = 2) => `<div class="vitae-tray"><div class="vitae-tray__content"><div class="vitae-tray__selected"><p class="vitae-tray__count">${count} of 3 plans selected</p><div class="vitae-tray__chips">${PLANS.slice(0, count).map((p) => chip(p.name)).join('')}</div></div>
  <div class="vitae-tray__actions"><button type="button" class="vitae-link" style="background:none;border:0;padding:0;font:inherit">Clear all</button>${button({ label: 'Compare plans' })}</div>${count === 1 ? '<p class="vitae-tray__helper" id="tray-help">Add at least one more plan to compare.</p>' : ''}</div><p class="vitae-visually-hidden" aria-live="polite">${esc(PLANS[count - 1].name)} added to compare. ${count} of 3 plans selected.</p></div>`;

export const COMPARE_ROWS = {
  Costs: [['Monthly premium', ['$442.07', '$468.30', '$389.15']], ['Deductible (individual / family)', ['$0 / $0', '$1,500 / $3,000', '$2,500 / $5,000']], ['Out-of-pocket maximum (individual / family)', ['$4,500 / $9,000', '$6,000 / $12,000', '$7,500 / $15,000']]],
  'Doctor visits and services': [['Primary care visit', ['$15 copay', '$0 copay', '$40 copay']], ['Specialist visit', ['$30 copay', '$50 copay', '$60 copay']], ['Emergency room', ['$250 copay after deductible', '$350 copay', '30% after deductible']]],
  Documents: [['Summary of benefits and coverage', ['View PDF', 'View PDF', 'View PDF']]],
};

export const compareTable = ({ plans = 3, compact = false } = {}) => {
  const ps = PLANS.slice(0, plans);
  const head = (p) => `<th scope="col"><div class="vitae-plan-head"><div class="vitae-plan-head__details"><div class="vitae-plan-head__top"><div class="vitae-plan__logo" role="img" aria-label="Carrier logo" style="width:80px;height:56px">Logo</div><button type="button" class="vitae-plan-head__remove" aria-label="Remove ${esc(p.name)} from comparison">${icon('close', 20, 'filled')}</button></div>
    <span class="vitae-plan-head__name" title="${esc(p.name)}">${esc(p.name)}</span>${metalBadge(p.level)}<span><strong>${p.premium}</strong> <span class="vitae-plan__per">per month</span></span></div>${button({ label: 'Select plan' })}</div></th>`;
  return `<div class="vitae-compare-scroll" tabindex="0" role="region" aria-label="Plan comparison"><table class="vitae-compare${compact ? ' is-compact' : ''}"><caption class="vitae-visually-hidden">Comparing ${plans} plans</caption>
    <colgroup><col class="is-label">${ps.map(() => '<col>').join('')}</colgroup>
    <thead><tr><td style="vertical-align:top;padding:16px;color:var(--vitae-text-secondary);background:var(--vitae-card-surface);border-bottom:1px solid var(--vitae-border-strong);position:sticky;top:0">${plans} plans compared</td>${ps.map(head).join('')}</tr></thead>
    ${Object.entries(COMPARE_ROWS).map(([section, rows]) => `<tbody><tr class="vitae-compare__section"><th colspan="${plans + 1}" scope="colgroup"><button type="button" aria-expanded="true">${esc(section)}${icon('chevron-up', 20, 'regular')}</button></th></tr>
      ${rows.map(([label, vals]) => `<tr><th scope="row">${esc(label)}</th>${vals.slice(0, plans).map((v) => `<td>${v === 'View PDF' ? '<a href="#" class="vitae-link">View PDF</a>' : esc(v)}</td>`).join('')}</tr>`).join('')}</tbody>`).join('')}
  </table></div>`;
};
