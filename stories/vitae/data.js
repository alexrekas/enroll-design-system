// Shared sample data for Vitae 27 stories: the same people, plans and records everywhere (see Sample users).


export const MEMBERS = [
  ['Marcus Bennett', '1004 2381', 'Active', 'success', '$412.88', '01/01/2027'],
  ['Dana Bennett', '1004 2382', 'Active', 'success', '$398.10', '01/01/2027'],
  ['James Whitaker', 'NB-0007', 'Pending', 'info', '$289.40', '02/01/2027'],
  ['Hannah Cole', 'NB-0001', 'Action needed', 'warning', '$0.00', '—'],
  ['Erin Whitaker', 'NB-0008', 'Terminated', 'neutral', '$0.00', '12/31/2026'],
];

export const SIGNED_IN = { 'Individual & Family': ['Marcus Bennett', '1004 2381'], Employer: ['Northside Bakery & Café', '2001953'], Employee: ['James Whitaker', 'NB-0007'], Broker: ['Gregory Hale', '2001953'], Admin: ['Priya Raman', 'ADM-0042'] };

export const PLANS = [
  { name: 'CareFirst BlueChoice HMO Healthy DC Plan Gold $0 Deductible', level: 'Gold', type: 'HMO', premium: '$442.07', ded: '$0', moop: '$4,500', visit: '$15 copay', employer: '$331.55', employee: '$110.52' },
  { name: 'Taro Health Gold 0000 $0 Direct Primary Care + $0 Copays 50% Coinsurance', level: 'Gold', type: 'PPO', premium: '$468.30', ded: '$1,500', moop: '$6,000', visit: '$0 copay', employer: '$351.23', employee: '$117.07' },
  { name: 'Kaiser Permanente DC Silver 2500/40 HMO', level: 'Silver', type: 'HMO', premium: '$389.15', ded: '$2,500', moop: '$7,500', visit: '$40 copay', employer: '$291.86', employee: '$97.29' },
];

export const DOC_TYPES = ['Paystub', 'Employer letter', 'Tax return', 'Unemployment benefits letter', 'Social Security statement'];

export const FILES_ADDED = [
  { state: 'attached', name: 'Bennett_paystub_September.pdf', meta: 'PDF, 1.2 MB' },
  { state: 'attached', name: 'Bennett_paystub_October.jpg', meta: 'JPG, 840 KB' },
  { state: 'uploading', type: 'Employer letter', name: 'Employer_letter.pdf' },
];

export const FILES_ERROR = [
  { state: 'attached', name: 'Bennett_paystub_September.pdf', meta: 'PDF, 1.2 MB' },
  { state: 'error', name: 'Bennett_paystub_October.heic', meta: 'HEIC files can’t be uploaded. Save it as JPG or PDF and try again.' },
  { state: 'error', name: 'Tax_return_2025.pdf', type: 'Tax return', meta: 'That file is larger than 10 MB. Choose a smaller file.' },
];
