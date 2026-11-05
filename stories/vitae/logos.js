// Client logos with light and dark versions, matching Log-in/Logo and Logo/* in Vitae 27
// (logo/show-color in light mode, logo/show-white in dark mode).
// The white logos in Figma (Logo/EA white 121:1244, DC 121:1251, MA 121:1281, ME 121:1270)
// use the same geometry as the color logos with every fill and stroke set to white;
// MA's white logo is a white alpha mask of the same PNG. So the white version is derived
// here from the exported color artwork instead of shipping a second copy of the path data.
import { logos as legacyLogos, enrollAppLogo } from '../brand-assets.js';

// EA uses the EnrollApp logo (Enroll Microsite file); DC, MA and ME use their client logos.
const colorLogos = { ...legacyLogos, ea: enrollAppLogo };

const toWhite = (html) => html
  .replace(/(fill|stroke)="#[0-9A-Fa-f]{3,8}"/g, '$1="#FFFFFF"')
  .replace(/id="([^"]+)"/g, 'id="$1-white"')
  .replace(/url\(#([^)]+)\)/g, 'url(#$1-white)');

const white = {
  // EnrollApp in dark mode keeps its green mark (6.1:1 on the dark page) and turns only the ink wordmark white,
  // matching the dark lockup in the microsite file.
  ea: colorLogos.ea.replace(/fill="#0C264A"/g, 'fill="#FFFFFF"'),
  dc: toWhite(colorLogos.dc),
  me: toWhite(colorLogos.me),
  ma: colorLogos.ma.replace('<img ', '<img data-white '), // CSS turns the PNG into a white mask
};

/** Both versions; CSS shows the color one in light mode and the white one in dark mode. */
export const logo = (client) => `<span class="vitae-logo vitae-logo--color">${colorLogos[client]}</span><span class="vitae-logo vitae-logo--white">${white[client]}</span>`;
export const logoColor = (client) => colorLogos[client];
export const logoWhite = (client) => white[client];
