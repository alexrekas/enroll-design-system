/**
 * Shared icon set — single source referenced by every component's stories.
 *
 * Source note: these are recreated to visually match the corresponding glyphs in
 * EA-DesignSystem-Icons-2021 (Health, Dentist, Chevron, Document PDF, Calendar, etc.),
 * observed via Figma screenshots/renders. The MCP asset-export pipeline could not
 * deliver the literal vector path data into this environment (short-lived CDN URLs
 * that this sandbox has no network path to fetch), so exact byte-for-byte path
 * parity with the source file is NOT guaranteed — visual intent and monochrome
 * currentColor/variable-bound color usage is. When Code Connect or a real asset
 * pipeline is available, swap these for direct exports from the source file.
 *
 * All icons: monochrome, `stroke="currentColor"` or `fill="currentColor"`, no
 * baked-in brand color (this was the #1 problem flagged in the 2021 file's
 * Environment=EA/DC/MA/ME icon variants — colored via CSS, not the icon itself).
 */

export const icon = {
  chevronDown: (cls = '') => `<svg class="${cls}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7.5l5 5 5-5"/></svg>`,

  chevronRight: (cls = '') => `<svg class="${cls}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10h12M11 5l5 5-5 5"/></svg>`,

  chevronLeft: (cls = '') => `<svg class="${cls}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 10H4M9 5l-5 5 5 5"/></svg>`,

  chevronRightCircle: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10.5"/><path d="M9 4L17 12L9 20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  chevronLeftCircle: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10.5"/><path d="M15 4L7 12L15 20" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  info: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><rect x="11" y="10" width="2" height="7" rx="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.2" r="1.2" fill="currentColor" stroke="none"/></svg>`,

  warning: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3L22 20H2L12 3Z"/><rect x="11" y="9.5" width="2" height="6" rx="1" fill="currentColor" stroke="none"/><circle cx="12" cy="17.2" r="1.1" fill="currentColor" stroke="none"/></svg>`,

  search: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M16.2 16.2L21 21" stroke-linecap="round"/></svg>`,

  calendar: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>`,

  dismiss: (cls = '') => `<svg class="${cls}" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L11 11M11 1L1 11"/></svg>`,

  check: (cls = '') => `<svg class="${cls}" viewBox="0 0 14 11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5.5L5 9.5L13 1.5"/></svg>`,

  sortArrow: (cls = '') => `<svg class="${cls}" viewBox="0 0 12 12" fill="currentColor"><path d="M6 9L2 4h8z"/></svg>`,

  health: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2 5 5.4 5c2 0 3.4 1.1 4.1 2.3C10.2 6.1 11.6 5 13.6 5 17 5 18.5 8.4 17 11.7 14.5 16.4 12 21 12 21z"/></svg>`,

  dentist: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-2 0-3.3 1-4.3 1-1.2 0-2.2-.6-3-.6C3 3.4 2 5.3 2 8c0 3 1.2 6 2 9 .5 1.9 1 3.5 2 3.5s1.3-2.2 1.6-3.9c.3-1.7.7-3.3 2.4-3.3s2.1 1.6 2.4 3.3c.3 1.7.6 3.9 1.6 3.9s1.5-1.6 2-3.5c.8-3 2-6 2-9 0-2.7-1-4.6-2.7-4.6-.8 0-1.8.6-3 .6C15.3 4 14 3 12 3z"/></svg>`,

  documentPdf: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 2h9l4 4v16H6z"/><path d="M15 2v4h4"/><path d="M8.5 14v5M8.5 14h1.2a1.4 1.4 0 010 2.8H8.5M12.5 19v-5h1a2.5 2.5 0 010 5h-1zM17 14v5M17 16.5h2"/></svg>`,

  documentPdfSmall: (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h9l4 4v16H6z" opacity="0.15"/><path d="M6 2h9l4 4v16H6zm9 0v4h4" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="7.5" y="17" font-size="7" font-weight="700">PDF</text></svg>`,
};
