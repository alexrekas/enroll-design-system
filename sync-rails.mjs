// Copies the shared pieces into the Rails gem (rails/vitae_components) so the components render
// exactly what Storybook shows: tokens CSS, component CSS and the icon SVGs. Runs as part of `npm run build`.
// CI fails if the gem's copies are out of date (npm run check:rails).
import { cpSync, mkdirSync, rmSync, readdirSync } from 'node:fs';

const GEM = 'rails/vitae_components';
mkdirSync(`${GEM}/app/assets/stylesheets/vitae`, { recursive: true });
cpSync('dist/v2/css/vitae.css', `${GEM}/app/assets/stylesheets/vitae/tokens.css`);
cpSync('stories/vitae/vitae.css', `${GEM}/app/assets/stylesheets/vitae/components.css`);
rmSync(`${GEM}/lib/vitae_components/icons`, { recursive: true, force: true });
cpSync('stories/vitae/icons', `${GEM}/lib/vitae_components/icons`, { recursive: true });
console.log(`Synced tokens.css, components.css and ${readdirSync(`${GEM}/lib/vitae_components/icons`).length} icons into ${GEM}.`);
