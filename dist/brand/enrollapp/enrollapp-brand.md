# EnrollApp brand: colors, type and buttons

Generated from the Vitae 27 design system (repo `alexrekas/enroll-design-system`, EA client), so it always matches the product. Don't edit these files by hand; change the tokens and run `npm run export:enrollapp`.

Files: `enrollapp-tokens.css` (CSS variables, light and dark), `enrollapp-tokens.json` (same values as data), `enrollapp-logo.svg` and `enrollapp-logo-dark.svg`.
Live reference: https://alexrekas.github.io/enroll-design-system/ (set Theme to EA, toggle Mode for dark).

## Palette

| Family | Brand color | Use |
|---|---|---|
| **Ink** | #0c264a | Headings, secondary buttons, form controls. The main brand dark. |
| **Green** | #00aa60 (logo green) | The logo and the call to action. Logo green itself is for the logo and graphics only (3.0:1 on white): never text, never a button fill with white text. |
| **Purple** | #5046e5 | Tertiary buttons and rare accents. Use sparingly; green should stay the thing people notice first. |

Each family has a ramp (`--enrollapp-ink-005` … `-190`, 100 = the brand color). Build with the **roles**, not the ramps.

## Roles (light / dark)

| Role | Light | Dark | Use |
|---|---|---|---|
| `--enrollapp-bg-page` | #f7fafd | #0f1112 | Page background |
| `--enrollapp-bg-raised` | #ffffff | #181b1d | Cards, panels, anything raised above the page |
| `--enrollapp-text-heading` | #0c264a | #f3f4f6 | Headings |
| `--enrollapp-text-body` | #24282d | #e8ebf0 | Body text |
| `--enrollapp-text-secondary` | #5a5f65 | #c1c7cc | Supporting text, captions |
| `--enrollapp-link` | #00663a | #99ddbf | Links (always underlined) |
| `--enrollapp-link-hover` | #005530 | #b2e6cf | Link hover |
| `--enrollapp-link-active` | #004426 | #cceedf | Link pressed |
| `--enrollapp-border-subtle` | #dbe0e5 | #24282d | Dividers, card borders |
| `--enrollapp-border-strong` | #838990 | #838990 | Stronger borders |
| `--enrollapp-focus-ring` | #1c1f23 | #f7fafd | Keyboard focus ring: 2px dashed, 2px offset |
| `--enrollapp-brand-rule` | #00aa60 | #33bb80 | Thin brand rule under the header (decorative) |
| `--enrollapp-cta` | #00884d | #00884d | Call-to-action button fill (solid primary) |
| `--enrollapp-cta-hover` | #007743 | #007743 | CTA hover |
| `--enrollapp-cta-active` | #00663a | #00663a | CTA pressed |
| `--enrollapp-on-cta` | #ffffff | #ffffff | CTA label |
| `--enrollapp-cta-text` | #00663a | #80d4b0 | Outline and ghost primary: label and border |
| `--enrollapp-cta-tint-hover` | #00aa6013 | #00aa601a | Outline and ghost primary hover fill (see-through) |
| `--enrollapp-cta-tint-active` | #00aa6021 | #00aa6029 | Outline and ghost primary pressed fill (see-through) |
| `--enrollapp-secondary` | #0c264a | #24487a | Secondary button fill (ink blue) |
| `--enrollapp-on-secondary` | #ffffff | #ffffff | Secondary button label |
| `--enrollapp-secondary-text` | #0c264a | #a9c6f0 | Outline and ghost secondary: label and border |
| `--enrollapp-secondary-tint-hover` | #0c264a13 | #a9c6f01a | Outline and ghost secondary hover fill (see-through) |
| `--enrollapp-tertiary` | #5046e5 | #5046e5 | Tertiary button fill (purple): use sparingly |
| `--enrollapp-on-tertiary` | #ffffff | #ffffff | Tertiary button label |
| `--enrollapp-tertiary-text` | #5046e5 | #a8a2f2 | Outline and ghost tertiary: label and border |
| `--enrollapp-control` | #0c264a | #9dbcf0 | Checked checkboxes and radios, toggles, selected tabs, progress |
| `--enrollapp-on-control` | #ffffff | #0c264a | Check marks on a control |
| `--enrollapp-error` | #a21e1f | #daa5a5 | Error text |
| `--enrollapp-success` | #027314 | #9ac7a1 | Success icon and text |
| `--enrollapp-info` | #005689 | #99bbd0 | Info icon and text |
| `--enrollapp-warning` | #896500 | #efcb66 | Warning icon |

## Contrast rules (WCAG 2.1 AA)

- **CTA green #00884d carries white text at 4.54:1. Never lighten it.** It's the lightest green that passes with white text. Hover and pressed go darker (#007743, #00663a).
- Green text and links use #00663a (light) and #99ddbf (dark). Logo green #00aa60 is never text.
- Every role pair above passes AA in both modes (checked by the design system's contrast test across 1,300+ pairs). The see-through hover tints were checked over every background.
- Links are always underlined. Focus is a 2px dashed ring in `--enrollapp-focus-ring` with a 2px offset, shown on keyboard focus (`:focus-visible`).

## Buttons

- Pills (`--enrollapp-radius-button`), 44px tall, Inter 16px semibold, 16px side padding, 8px gap to an icon.
- **Solid primary = the call to action.** Aim for one per page, the happy path; use two only when the page genuinely sends people one of two ways. Everything else is secondary (ink), outline or ghost.
- Solid: fill `--enrollapp-cta` / `-secondary` / `-tertiary`, label `--enrollapp-on-…`; hover and pressed use the `-hover` and `-active` fills.
- Outline: transparent, 2px border and label in `--enrollapp-cta-text` (or `secondary-text`, `tertiary-text`). Ghost: the same without the border.
- Outline and ghost hover and pressed: a see-through tint (`--enrollapp-cta-tint-hover`, `-tint-active`) plus the `-text-hover` / `-text-active` label. Don't fill them solid; they shouldn't look like the CTA.
- Disabled: avoid where you can (say what's missing instead).

```css
.btn { min-height: 44px; padding: 10px 16px; border: 2px solid transparent; border-radius: var(--enrollapp-radius-button);
  font: 600 16px/20px var(--enrollapp-font-family); cursor: pointer; }
.btn-cta { background: var(--enrollapp-cta); color: var(--enrollapp-on-cta); }
.btn-cta:hover { background: var(--enrollapp-cta-hover); } .btn-cta:active { background: var(--enrollapp-cta-active); }
.btn-outline { background: transparent; border-color: var(--enrollapp-cta-text); color: var(--enrollapp-cta-text); }
.btn-outline:hover { background: var(--enrollapp-cta-tint-hover); border-color: var(--enrollapp-cta-text-hover); color: var(--enrollapp-cta-text-hover); }
.btn-outline:active { background: var(--enrollapp-cta-tint-active); border-color: var(--enrollapp-cta-text-active); color: var(--enrollapp-cta-text-active); }
.btn:focus-visible { outline: 2px dashed var(--enrollapp-focus-ring); outline-offset: 2px; }
```

## Type and shape

- **Inter** everywhere (400 body, 600 labels and UI, 700 headings). Self-host it; don't load from Google Fonts in production.
- Corners: buttons are pills, tags and status labels 4px (so they never look like buttons), cards 8px.

## Logo

- `enrollapp-logo.svg`: green mark (#00aa60) with ink wordmark, for light backgrounds.
- `enrollapp-logo-dark.svg`: green mark with white wordmark, for dark backgrounds.
- Name: **EnrollApp** (one word, capital E and A). Give the image an accessible name (`alt="EnrollApp"` or `aria-label`).
- PNG copies (`enrollapp-logo.png`, `enrollapp-logo-dark.png`, 4× size, transparent) are for tools that won't take SVG. For the web, use the SVG.

### Logo source (SVG)

If the .svg files can't be attached, save each block below as an .svg file.

Light backgrounds (`enrollapp-logo.svg`):

```svg
<svg width="302" height="64" viewBox="0 0 302 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EnrollApp">
<path d="M24 56H28V64H21C18.2386 64 16 61.7614 16 59V28H24V56Z" fill="#00AA60"/>
<path d="M48 59C48 61.7614 45.7614 64 43 64H36V56H40V52H48V59Z" fill="#00AA60"/>
<path d="M8 40H12V48H5C2.23857 48 0 45.7614 0 43V36H8V40Z" fill="#00AA60"/>
<path d="M64 43C64 45.7614 61.7614 48 59 48H28V40H56V36H64V43Z" fill="#00AA60"/>
<path d="M43 0C45.7614 0 48 2.23857 48 5V36H40V8H36V0H43Z" fill="#00AA60"/>
<path d="M36 24H8V28H0V21C0 18.2386 2.23857 16 5 16H36V24Z" fill="#00AA60"/>
<path d="M59 16C61.7614 16 64 18.2386 64 21V28H56V24H52V16H59Z" fill="#00AA60"/>
<path d="M28 8H24V12H16V5C16 2.23857 18.2386 0 21 0H28V8Z" fill="#00AA60"/>
<path d="M262.347 24.04C264.523 24.04 266.411 24.5681 268.011 25.624C269.643 26.648 270.907 28.1042 271.803 29.9922C272.699 31.8802 273.148 34.1041 273.148 36.6641C273.148 39.2559 272.683 41.5117 271.755 43.4316C270.827 45.3516 269.532 46.8405 267.868 47.8965C266.204 48.9525 264.235 49.4805 261.963 49.4805C259.627 49.4805 257.723 48.9356 256.251 47.8477C255.254 47.0722 254.519 46.0972 254.043 44.9229V58.8398H247.996V24.5195H253.9V28.5723C254.454 27.3827 255.317 26.3995 256.492 25.624C258.092 24.5681 260.043 24.0401 262.347 24.04ZM291.2 24.04C293.376 24.04 295.264 24.5681 296.864 25.624C298.496 26.648 299.76 28.1042 300.656 29.9922C301.552 31.8802 302 34.1041 302 36.6641C302 39.2559 301.536 41.5117 300.608 43.4316C299.68 45.3516 298.384 46.8405 296.72 47.8965C295.056 48.9525 293.088 49.4805 290.816 49.4805C288.48 49.4805 286.576 48.9356 285.104 47.8477C284.107 47.0722 283.371 46.0972 282.896 44.9229V58.8398H276.848V24.5195H282.752V28.5723C283.306 27.3827 284.169 26.3995 285.344 25.624C286.944 24.5681 288.896 24.0401 291.2 24.04ZM174.19 24.04C176.814 24.04 179.102 24.5839 181.054 25.6719C183.006 26.7278 184.526 28.2 185.614 30.0879C186.702 31.9759 187.247 34.1681 187.247 36.6641C187.247 39.16 186.686 41.384 185.566 43.3359C184.478 45.2558 182.958 46.7597 181.006 47.8477C179.054 48.9357 176.782 49.4805 174.19 49.4805C171.598 49.4804 169.311 48.9355 167.327 47.8477C165.375 46.7597 163.854 45.2559 162.766 43.3359C161.678 41.384 161.134 39.16 161.134 36.6641C161.134 34.1681 161.678 31.9759 162.766 30.0879C163.854 28.1999 165.375 26.7279 167.327 25.6719C169.31 24.5841 171.598 24.0401 174.19 24.04ZM111.936 19.3838H93.8403V28.792H110.785V33.6396H93.8403V44.0557H112.464V49H87.6001V14.4404H111.936V19.3838ZM131.947 24.04C134.603 24.04 136.667 24.7919 138.139 26.2959C139.643 27.7999 140.395 29.8 140.395 32.2959V49H134.299V33.5439C134.299 32.04 133.915 30.9037 133.147 30.1357C132.379 29.3678 131.259 28.9844 129.787 28.9844C128.507 28.9844 127.355 29.2717 126.331 29.8477C125.339 30.4236 124.555 31.2241 123.979 32.248C123.435 33.272 123.163 34.4559 123.163 35.7998V49H117.115V24.5195H123.019V29.0244C123.815 27.6582 124.871 26.5403 126.187 25.6719C127.787 24.584 129.707 24.04 131.947 24.04ZM158.841 24.04C159.513 24.04 159.994 24.1044 160.282 24.2324V29.9443C160.122 29.8804 159.898 29.8477 159.61 29.8477C159.322 29.8157 158.969 29.7998 158.553 29.7998C156.217 29.7998 154.474 30.3121 153.322 31.3359C152.17 32.3599 151.593 33.9924 151.593 36.2324V49H145.545V24.5195H151.45V29.0225C152.034 27.6179 152.85 26.5007 153.898 25.6719C155.274 24.5841 156.922 24.0401 158.841 24.04ZM196.783 49H190.735V14.4404H196.783V49ZM208.292 49H202.244V14.4404H208.292V49ZM244.376 49H237.945L234.985 40.4082H220.996L218.024 49H211.88L224.6 14.4404H231.705L244.376 49ZM174.19 28.8877C172.238 28.8878 170.622 29.5762 169.342 30.9521C168.062 32.3281 167.422 34.2162 167.422 36.6162C167.422 38.2481 167.711 39.6718 168.287 40.8877C168.895 42.0716 169.694 42.9999 170.686 43.6719C171.71 44.3118 172.878 44.6318 174.19 44.6318C175.47 44.6318 176.622 44.3118 177.646 43.6719C178.67 42.9999 179.47 42.0717 180.046 40.8877C180.622 39.6718 180.911 38.248 180.911 36.6162C180.911 34.2162 180.27 32.3281 178.99 30.9521C177.742 29.5763 176.142 28.8877 174.19 28.8877ZM260.379 28.9844C258.459 28.9844 256.907 29.6719 255.723 31.0479C254.539 32.3918 253.948 34.2959 253.948 36.7598C253.948 39.2236 254.539 41.1277 255.723 42.4717C256.907 43.8156 258.475 44.4882 260.427 44.4883C262.379 44.4883 263.931 43.8157 265.083 42.4717C266.235 41.0957 266.811 39.1758 266.811 36.7119C266.811 34.248 266.22 32.344 265.036 31C263.884 29.656 262.331 28.9844 260.379 28.9844ZM289.232 28.9844C287.312 28.9844 285.76 29.6719 284.576 31.0479C283.392 32.3918 282.8 34.2959 282.8 36.7598C282.8 39.2236 283.392 41.1277 284.576 42.4717C285.76 43.8156 287.328 44.4882 289.28 44.4883C291.232 44.4883 292.784 43.8157 293.936 42.4717C295.088 41.0957 295.664 39.1758 295.664 36.7119C295.664 34.248 295.072 32.344 293.888 31C292.736 29.656 291.184 28.9844 289.232 28.9844ZM222.722 35.416H233.266L228.003 20.1416L222.722 35.416Z" fill="#0C264A"/>
</svg>
```

Dark backgrounds (`enrollapp-logo-dark.svg`):

```svg
<svg width="302" height="64" viewBox="0 0 302 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="EnrollApp">
<path d="M24 56H28V64H21C18.2386 64 16 61.7614 16 59V28H24V56Z" fill="#00AA60"/>
<path d="M48 59C48 61.7614 45.7614 64 43 64H36V56H40V52H48V59Z" fill="#00AA60"/>
<path d="M8 40H12V48H5C2.23857 48 0 45.7614 0 43V36H8V40Z" fill="#00AA60"/>
<path d="M64 43C64 45.7614 61.7614 48 59 48H28V40H56V36H64V43Z" fill="#00AA60"/>
<path d="M43 0C45.7614 0 48 2.23857 48 5V36H40V8H36V0H43Z" fill="#00AA60"/>
<path d="M36 24H8V28H0V21C0 18.2386 2.23857 16 5 16H36V24Z" fill="#00AA60"/>
<path d="M59 16C61.7614 16 64 18.2386 64 21V28H56V24H52V16H59Z" fill="#00AA60"/>
<path d="M28 8H24V12H16V5C16 2.23857 18.2386 0 21 0H28V8Z" fill="#00AA60"/>
<path d="M262.347 24.04C264.523 24.04 266.411 24.5681 268.011 25.624C269.643 26.648 270.907 28.1042 271.803 29.9922C272.699 31.8802 273.148 34.1041 273.148 36.6641C273.148 39.2559 272.683 41.5117 271.755 43.4316C270.827 45.3516 269.532 46.8405 267.868 47.8965C266.204 48.9525 264.235 49.4805 261.963 49.4805C259.627 49.4805 257.723 48.9356 256.251 47.8477C255.254 47.0722 254.519 46.0972 254.043 44.9229V58.8398H247.996V24.5195H253.9V28.5723C254.454 27.3827 255.317 26.3995 256.492 25.624C258.092 24.5681 260.043 24.0401 262.347 24.04ZM291.2 24.04C293.376 24.04 295.264 24.5681 296.864 25.624C298.496 26.648 299.76 28.1042 300.656 29.9922C301.552 31.8802 302 34.1041 302 36.6641C302 39.2559 301.536 41.5117 300.608 43.4316C299.68 45.3516 298.384 46.8405 296.72 47.8965C295.056 48.9525 293.088 49.4805 290.816 49.4805C288.48 49.4805 286.576 48.9356 285.104 47.8477C284.107 47.0722 283.371 46.0972 282.896 44.9229V58.8398H276.848V24.5195H282.752V28.5723C283.306 27.3827 284.169 26.3995 285.344 25.624C286.944 24.5681 288.896 24.0401 291.2 24.04ZM174.19 24.04C176.814 24.04 179.102 24.5839 181.054 25.6719C183.006 26.7278 184.526 28.2 185.614 30.0879C186.702 31.9759 187.247 34.1681 187.247 36.6641C187.247 39.16 186.686 41.384 185.566 43.3359C184.478 45.2558 182.958 46.7597 181.006 47.8477C179.054 48.9357 176.782 49.4805 174.19 49.4805C171.598 49.4804 169.311 48.9355 167.327 47.8477C165.375 46.7597 163.854 45.2559 162.766 43.3359C161.678 41.384 161.134 39.16 161.134 36.6641C161.134 34.1681 161.678 31.9759 162.766 30.0879C163.854 28.1999 165.375 26.7279 167.327 25.6719C169.31 24.5841 171.598 24.0401 174.19 24.04ZM111.936 19.3838H93.8403V28.792H110.785V33.6396H93.8403V44.0557H112.464V49H87.6001V14.4404H111.936V19.3838ZM131.947 24.04C134.603 24.04 136.667 24.7919 138.139 26.2959C139.643 27.7999 140.395 29.8 140.395 32.2959V49H134.299V33.5439C134.299 32.04 133.915 30.9037 133.147 30.1357C132.379 29.3678 131.259 28.9844 129.787 28.9844C128.507 28.9844 127.355 29.2717 126.331 29.8477C125.339 30.4236 124.555 31.2241 123.979 32.248C123.435 33.272 123.163 34.4559 123.163 35.7998V49H117.115V24.5195H123.019V29.0244C123.815 27.6582 124.871 26.5403 126.187 25.6719C127.787 24.584 129.707 24.04 131.947 24.04ZM158.841 24.04C159.513 24.04 159.994 24.1044 160.282 24.2324V29.9443C160.122 29.8804 159.898 29.8477 159.61 29.8477C159.322 29.8157 158.969 29.7998 158.553 29.7998C156.217 29.7998 154.474 30.3121 153.322 31.3359C152.17 32.3599 151.593 33.9924 151.593 36.2324V49H145.545V24.5195H151.45V29.0225C152.034 27.6179 152.85 26.5007 153.898 25.6719C155.274 24.5841 156.922 24.0401 158.841 24.04ZM196.783 49H190.735V14.4404H196.783V49ZM208.292 49H202.244V14.4404H208.292V49ZM244.376 49H237.945L234.985 40.4082H220.996L218.024 49H211.88L224.6 14.4404H231.705L244.376 49ZM174.19 28.8877C172.238 28.8878 170.622 29.5762 169.342 30.9521C168.062 32.3281 167.422 34.2162 167.422 36.6162C167.422 38.2481 167.711 39.6718 168.287 40.8877C168.895 42.0716 169.694 42.9999 170.686 43.6719C171.71 44.3118 172.878 44.6318 174.19 44.6318C175.47 44.6318 176.622 44.3118 177.646 43.6719C178.67 42.9999 179.47 42.0717 180.046 40.8877C180.622 39.6718 180.911 38.248 180.911 36.6162C180.911 34.2162 180.27 32.3281 178.99 30.9521C177.742 29.5763 176.142 28.8877 174.19 28.8877ZM260.379 28.9844C258.459 28.9844 256.907 29.6719 255.723 31.0479C254.539 32.3918 253.948 34.2959 253.948 36.7598C253.948 39.2236 254.539 41.1277 255.723 42.4717C256.907 43.8156 258.475 44.4882 260.427 44.4883C262.379 44.4883 263.931 43.8157 265.083 42.4717C266.235 41.0957 266.811 39.1758 266.811 36.7119C266.811 34.248 266.22 32.344 265.036 31C263.884 29.656 262.331 28.9844 260.379 28.9844ZM289.232 28.9844C287.312 28.9844 285.76 29.6719 284.576 31.0479C283.392 32.3918 282.8 34.2959 282.8 36.7598C282.8 39.2236 283.392 41.1277 284.576 42.4717C285.76 43.8156 287.328 44.4882 289.28 44.4883C291.232 44.4883 292.784 43.8157 293.936 42.4717C295.088 41.0957 295.664 39.1758 295.664 36.7119C295.664 34.248 295.072 32.344 293.888 31C292.736 29.656 291.184 28.9844 289.232 28.9844ZM222.722 35.416H233.266L228.003 20.1416L222.722 35.416Z" fill="#FFFFFF"/>
</svg>
```
