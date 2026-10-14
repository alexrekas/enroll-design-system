# Enroll App Design System — Component Reference

Documentation for all components. **Update (10/14/26):** Vitae pass. New: Accordion, Modal, Tooltip, Dropdown, Date Picker. Reworked to Vitae: Button (Solid/Outline/Ghost styles), Tag, Breadcrumbs, Alert surfaces, Text Input (required/info/trailing icons), Checkbox (error row + group). See the 10/14/26 sections at the end.

Previously: documentation for the 18 components built in the 7/10 cycle. Each entry covers variants, states, accessibility, and a code example matching the actual Storybook story markup (`stories/*.stories.js`) and reference CSS (`.storybook/tokens.css`).

**Update (7/10/26):** following a design review pass against the real EA-DesignSystem-2021 and EA-DesignSystem-Icons-2021 Figma files, Icons, Table, Field-Set, and Plan were substantially reworked — see each section below for what changed. Plan Compare is no longer a separate page/component; comparison is now a per-card `Compare` checkbox on Plan itself, matching the source file.

**A note on accessibility scope:** these Storybook stories are static visual references — they render markup and CSS classes but wire up no JavaScript interaction (no keyboard handlers, no state management). The ARIA attributes shown are the *intended* contract for whoever wires up real interactivity in the Enroll App; they are not proof that keyboard behavior works today. Gaps are called out explicitly below rather than assumed away.

---

## Button

### Description
Primary call-to-action control. Use for the main action on a screen or form step (Continue, Submit, Sign In).

### Variants
| Variant | Use When |
|---|---|
| Primary | The single main action on the screen |
| Secondary | A supporting action alongside a primary button |
| Tertiary | A lower-emphasis alternate action |
| Destructive | Actions that cancel, delete, or remove something |
| Outline | Any level, when a lower-visual-weight treatment is needed (not yet wired to a Figma variant — see Open Questions in the design system audit) |

### Props / Properties
| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | enum | `primary` | primary / secondary / tertiary / destructive |
| `label` | text | — | Button text |
| `disabled` | boolean | `false` | Disables interaction |
| `iconLeft` / `iconRight` | boolean | `false` | Shows the chevron icon slot before/after the label |

### States
| State | Visual | Behavior |
|---|---|---|
| Default | Solid fill per variant | — |
| Hover | Darker fill (`bg-hover` token) | Pointer cursor |
| Active | Darkest fill (`bg-active` token) | On press |
| Disabled | Flat gray (`button.disabled.bg`/`.text`, aliased to `color.gray.020`/`.055`) | `cursor: not-allowed`, no hover/active |
| Focus-visible | 2px outline ring (`--ea-focus-ring-*`) | Keyboard focus only |

### Accessibility
- **Role**: native `<button>` — no ARIA role needed.
- **Keyboard**: native button semantics give Tab focus and Enter/Space activation for free.
- **Screen reader**: announced as the button's text content. If an icon-only button is ever introduced, it will need an `aria-label`.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use one Primary button per screen/step | Use two Primary buttons side by side — pair Primary with Secondary or Outline |
| Use Destructive only for irreversible/removal actions | Use Destructive styling for a neutral "Cancel" |

### Code Example
```html
<button class="ea-btn ea-btn--primary">Continue</button>
<button class="ea-btn ea-btn--secondary">Back</button>
<button class="ea-btn ea-btn--primary" disabled>Continue</button>
```

---

## Icon

### Description
Single shared icon set — one source of truth referenced by every other component (Button, Input, Alert, Tag, Field-Set, Table, Plan), instead of each component hand-drawing its own inline SVG. In Figma this lives on the `Icons` page as individual `Icon/*` components; in code it's `stories/icons.js`, a module of small functions (`icon.calendar()`, `icon.dismiss()`, etc.) that each return an inline monochrome `<svg>` string using `currentColor`/`stroke="currentColor"` so color is controlled entirely by CSS, never baked into the icon.

### Glyphs
| Icon | Used in |
|---|---|
| `chevronDown` | Field-Set dropdown fields (Suffix, State) |
| `chevronRight` / `chevronLeft` | Button trailing-icon slot; Pagination arrows (circle variants) |
| `calendar` | Field-Set / Text Input date fields |
| `check` | Checkbox checked state |
| `dismiss` | Alert close button, Tag remove button |
| `info` / `warning` | Alert info/warning badges |
| `search` | Reserved for search inputs (not yet consumed by a story) |
| `sortArrow` | Reserved for Table sortable-column indicators |
| `health` / `dentist` | Plan benefit-type badge |
| `documentPdf` / `documentPdfSmall` | Plan's "View Complete Summary of Benefits and Coverage" link |

### Known limitation
These are hand-recreated to visually match the corresponding glyphs in EA-DesignSystem-Icons-2021 (observed via Figma screenshots), not literal byte-for-byte exports — the MCP asset-export pipeline's short-lived CDN URLs weren't reachable from the environment that built this pass. Swap for direct exports (or wire up Code Connect) when that pipeline is available. This is noted in a comment at the top of `icons.js`.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Import from `icons.js` (`import { icon } from './icons.js'`) whenever a component needs a glyph | Hand-roll a new inline SVG inside a story file — it fragments the icon set the moment a second component needs the same glyph |
| Style icon color via the parent's `color`/`currentColor` (CSS token) | Bake a fill color into the icon SVG itself |

---

## Text Input

### Description
Single-line text entry field with label, optional trailing icon, and error messaging.

### Variants
| Variant | Use When |
|---|---|
| Default | Standard entry |
| With trailing icon | Date fields, search, or any input needing an adornment (e.g. calendar icon) |

### Props / Properties
| Property | Type | Default | Description |
|---|---|---|---|
| `label` | text | — | Field label |
| `placeholder` | text | — | Placeholder text |
| `state` | enum | `default` | default / disabled / error |
| `errorText` | text | — | Shown under the field when `state="error"` |
| `icon` | boolean | `false` | Shows the trailing icon slot |

### States
| State | Visual | Behavior |
|---|---|---|
| Default | Gray border (`--ea-input-border`) | — |
| Hover | Darker border | — |
| Focus | Brand-colored border, no default outline | Native focus |
| Disabled | Gray fill, `not-allowed` cursor | Non-interactive |
| Error | Red border + error message row below | — |

### Accessibility
- **Role**: native `<label>` wraps the input, giving an implicit label association — no `for`/`id` pairing needed since the input is a descendant.
- **Keyboard**: native text input behavior.
- **Screen reader**: announces the label, then the field. **Known gap**: the error message (`.ea-field__error`) is not wired to the input via `aria-describedby`, so a screen reader user won't hear the error text when focusing the field — only if they read past it. Recommend adding `aria-describedby` + `aria-invalid="true"` when implementing real interactivity.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Always pair a visible label with every input | Rely on placeholder text as a substitute for a label |
| Show the error message immediately below the field it belongs to | Show a generic error summary far from the field |

### Code Example
```html
<label class="ea-field">
  <span class="ea-field__label">First name</span>
  <span class="ea-input-wrap">
    <input class="ea-input" placeholder="Jane">
  </span>
</label>
```

---

## Alert

### Description
Inline banner communicating success, error, warning, or informational messages tied to page or form state.

### Variants
| Variant | Use When |
|---|---|
| Success | Confirming a completed action |
| Error | Blocking or validation failures |
| Warning | Non-blocking issues needing attention |
| Info | Neutral, non-urgent information |

### Props / Properties
| Property | Type | Default | Description |
|---|---|---|---|
| `type` | enum | `success` | success / error / warning / info |
| `message` | text | — | Alert body text |
| `dismissible` | boolean | `true` | Shows the close (×) button |

### States
| State | Visual | Behavior |
|---|---|---|
| Default | Colored background/border/icon per type | — |
| Dismissible | Close button, top-right | — |

### Accessibility
- **Role**: `role="alert"` for the error type (assertive, interrupts screen reader), `role="status"` for success/warning/info (polite, doesn't interrupt).
- **Keyboard**: the dismiss button is a native `<button>` with `aria-label="Dismiss"` — focusable and activatable by default.
- **Screen reader**: icons are `aria-hidden="true"` (decorative only, message text carries the meaning).

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use `role="alert"` only for the error type, so success/info messages don't rudely interrupt | Use `role="alert"` on every type — it's disruptive for non-urgent messages |
| Keep alert text short and actionable | Bury the actual instruction inside a long paragraph |

### Code Example
```html
<div class="ea-alert ea-alert--error" role="alert">
  <span class="ea-alert__msg">SSN doesn't match our records.</span>
  <button class="ea-alert__close" aria-label="Dismiss">&#10005;</button>
</div>
```

---

## Toggle

### Description
Binary on/off control for settings that take effect immediately (no separate "submit" step).

### Props / Properties
| Property | Type | Default |
|---|---|---|
| `on` | boolean | `false` |
| `disabled` | boolean | `false` |
| `label` | text | `Label` |

### States
| State | Visual | Behavior |
|---|---|---|
| Off | Knob left, outline track | — |
| On | Knob right, filled track (`form.selected-bg`) | — |
| Disabled | Flat gray track/knob | Non-interactive |
| Focus | 2px outline around the row | Keyboard focus |

### Accessibility
- **Role**: `role="switch"` on the native `<button>` — the correct ARIA pattern for a toggle (not `checkbox`).
- **Keyboard**: `aria-checked` reflects state; native button gives Space/Enter activation once real toggle logic is wired up.
- **Screen reader**: announced as "Label, switch, on/off."

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use Toggle for settings that apply instantly | Use Toggle inside a form that needs an explicit Submit — use Checkbox instead |

### Code Example
```html
<div class="ea-toggle-row">
  <button class="ea-toggle" role="switch" aria-checked="true"></button>
  <span class="ea-toggle-label">Email notifications</span>
</div>
```

---

## Checkbox

### Description
Standard checkbox for form selections, including an indeterminate ("partial") state for parent/group checkboxes.

### States
| State | Visual | Behavior |
|---|---|---|
| Unchecked | Empty box | — |
| Checked | Check icon, filled | — |
| Partial (indeterminate) | Dash icon, filled | Used for "select all" parents when only some children are selected |
| Disabled | Flat gray | Non-interactive |

### Accessibility
- **Role**: `role="checkbox"` on the native `<button>`.
- **Keyboard**: `aria-checked` takes `"true"`, `"false"`, or `"mixed"` (for the partial state) — correct ARIA usage.
- **Screen reader**: announces "Label, checkbox, checked/not checked/partially checked."

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use the partial state only for a parent checkbox representing a mixed-selection group | Use partial as a generic "disabled but on" visual — that's a different state |

### Code Example
```html
<div class="ea-checkbox-row">
  <button class="ea-checkbox" role="checkbox" aria-checked="true">
    <svg class="ea-checkbox__check" ...></svg>
  </button>
  <span class="ea-checkbox-label">I agree to the terms</span>
</div>
```

---

## Radio Button

### Description
Single-select control within a mutually exclusive group (e.g. Individual / Employee / Employer).

### States
| State | Visual | Behavior |
|---|---|---|
| Unselected | Empty circle | — |
| Selected | Filled dot | — |
| Disabled | Flat gray | Non-interactive |

### Accessibility
- **Role**: `role="radio"` on each native `<button>`.
- **Keyboard**: `aria-checked` per item.
- **Known gap**: the group wrapper (`.ea-radio-row` repeated for each option) does **not** have a `role="radiogroup"` container with a group-level `aria-label`. Without it, screen reader users won't hear "N of M" group context, and arrow-key navigation between options (the standard radio-group keyboard pattern) isn't implementable as currently marked up. Recommend wrapping the group in `<div role="radiogroup" aria-label="...">` when wiring up real interactivity.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use Radio for 2–5 mutually exclusive options | Use Radio for a single yes/no choice — use Toggle or Checkbox instead |

### Code Example
```html
<div role="radiogroup" aria-label="Applicant type">
  <div class="ea-radio-row">
    <button class="ea-radio" role="radio" aria-checked="true"></button>
    <span class="ea-radio-label">Individual</span>
  </div>
  <div class="ea-radio-row">
    <button class="ea-radio" role="radio" aria-checked="false"></button>
    <span class="ea-radio-label">Employee</span>
  </div>
</div>
```
*(the `radiogroup` wrapper above is the recommended fix — current stories omit it, see gap noted above)*

---

## Breadcrumbs

### Description
Shows the user's location within a multi-level flow (e.g. Application / Section / Subsection).

### States
| State | Visual |
|---|---|
| Prior levels | Muted text (`nav.breadcrumb.text`) |
| Current level | Bold, primary-colored text |

### Accessibility
- **Role**: wrapped in `<nav aria-label="Breadcrumb">` — correct semantic pattern.
- **Keyboard**: prior-level items should be real links (`<a href>`) in production so they're keyboard-navigable; the reference story renders them as plain spans since there's no routing in Storybook.
- **Screen reader**: announces "Breadcrumb navigation," then each item in order.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Mark only the current page as non-link, bold text | Make the current page a clickable link to itself |

### Code Example
```html
<nav class="ea-breadcrumbs" aria-label="Breadcrumb">
  <span class="ea-breadcrumb-item">Application</span>
  <span class="ea-breadcrumb-item">Section</span>
  <span class="ea-breadcrumb-item--current">Subsection</span>
</nav>
```

---

## Pagination

### Description
Page-through control for tables and lists, showing current position and total.

### Props / Properties
| Property | Type |
|---|---|
| Current page | number |
| Total pages | number |

### States
| State | Visual | Behavior |
|---|---|---|
| Start | Left arrow disabled | Can't go before page 1 |
| Middle | Both arrows enabled | — |
| End | Right arrow disabled | Can't go past last page |

### Accessibility
- **Role**: arrow controls are native `<button>` elements with `aria-label="Previous page"` / `aria-label="Next page"`.
- **Keyboard**: disabled arrows use the native `disabled` attribute, which correctly removes them from the tab order.
- **Screen reader**: announces "Previous page, button" / "Next page, button," disabled state included automatically.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Disable (don't hide) the arrow at either end | Hide the arrow entirely — that shifts layout and removes a predictable landmark |

### Code Example
```html
<div class="ea-pagination">
  <button class="ea-pagination__arrow" aria-label="Previous page" disabled>‹</button>
  <span class="ea-pagination__label">Page</span>
  <span class="ea-pagination__box">1</span>
  <span class="ea-pagination__total">of 12</span>
  <button class="ea-pagination__arrow" aria-label="Next page">›</button>
</div>
```

---

## Header / Footer / LeftNav

### Description
Global page chrome, **latest Bootstrap style only**. Rebuilt 10/14/26 from Figma. The July version was hand-built with a placeholder logo and dummy text.

### Source of truth
| Piece | Figma |
|---|---|
| Header, all user types + Broker/Admin nav bars | ME-nuharbor-1 · `Navigation` (5958:25693) |
| Footer (desktop) | ME-nuharbor-1 · `Navigation/Footer/Desktop-1` (823:92866) |
| Mobile header, drawer, footer | ME-nuharbor-1 · `000 - Mobile` (790:64426) |
| Employer (building icon), cart count | EA-DesignSystem-2021 · `HeaderFooter-Desktop` (991:21766) |
| DC header (all user types incl. Employee) + nav bars | DC - Bootstrap Upgrade · `Navigation` (5958:25693) |
| DC footer (desktop) | DC - Bootstrap Upgrade · `Navigation/Footer/Desktop-0` (15640:6530) |
| Logos (EA, DC, MA, ME) | EA-DesignSystem-2021 `Logo/Domain`, ME-nuharbor-1 `coverme-logo` |

ME and DC are built directly from their frames. EA/MA use the ME anatomy with their own logo, contact details and brand tokens, marked **Projected** in Storybook until their latest-Bootstrap frames exist.

**DC differences** (tokens in `tokens/themes/dc.json` + `brand.dc.shell` in `stories/brand-assets.js`): no My Portal link; Employee user type; retail-building Employer icon; Notices in the Admin bar; header rule and both nav bars #00629D (`color.dc.navbar` — the DC file's Primary/120, not a step in the Vitae DC ramp); portal label, user icon and Log Out in secondary-100, portal not underlined; 35px logo; 24px gaps; single-row white footer with copyright and ghost phone / email / Get Help links.

### Variants
| User type | Header right side | Nav bar |
|---|---|---|
| Logged out | none | none |
| Individual & Family | consumer icon, name, ID / My Portal / Log Out (+ optional cart count) | none |
| Employer | building icon, company name, ID / My Portal / Log Out | none |
| Broker | expert icon, name, ID / My Portal / Log Out | brand-color bar: Home, Families, Mail (count) |
| Admin | settings icon, name, ID / My Portal / Log Out | light bar: Home, Families▾, User Accounts, Issuers, Brokers▾, Admin▾, Mail (count) |

Mobile: logo + menu button, then a right-side drawer with the marketplace label, portal, user, Home / My Portal (expandable) / Help, Call Customer Service and Logout. Footer: copyright and contact pill (desktop); the language row is off by default (`showLanguages`, a future option); Get Help and copyright (mobile).

### Accessibility
- `<header>`, `<nav aria-label>`, `<footer>` landmarks; current page uses `aria-current="page"`.
- Admin dropdown triggers are `<button aria-expanded aria-haspopup>`; the mail badge carries an `aria-label` with the count.
- The optional language row marks the active language with `aria-current` and each link with `lang`.
- Mobile menu button toggles `aria-expanded` / label, moves focus into the drawer, closes on Esc or scrim click and returns focus.

### Code Example
```html
<header class="ea-header">
  <div class="ea-header__bar"><div class="ea-shell-inner">
    <div class="ea-header__brand">
      <a class="ea-header__logo" href="/">…logo…</a>
      <span class="ea-header__divider" aria-hidden="true"></span>
      <a class="ea-header__portal" href="/broker">Broker</a>
    </div>
    <div class="ea-header__user">…icon… <div><p class="ea-header__user-name">Broker McCain</p>
      <div class="ea-header__user-meta"><span>ID: 2001953</span><a href="#">My Portal</a><a href="#">Log Out</a></div></div></div>
  </div></div>
  <nav class="ea-subnav ea-subnav--broker" aria-label="Broker"><ul class="ea-shell-inner">…</ul></nav>
</header>
```

**LeftNav** is unchanged this pass (EA-DesignSystem-2021 `Navigation/LeftNav`, not re-verified).

---

## Card

### Description
Generic content container with title, divider, and body — used as the base surface for other patterns (e.g. Plan cards).

### Accessibility
- **Role**: no special role — a plain container. If a Card is interactive (clickable as a whole), wrap it in a real `<button>` or `<a>` rather than adding a click handler to the `<div>`, so it's keyboard-reachable.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use `.ea-card__divider` between title and body when both are present | Stack more than one divider — one is sufficient to separate header from content |

### Code Example
```html
<div class="ea-card">
  <h3 class="ea-card__title">Account Settings</h3>
  <hr class="ea-card__divider">
  <p class="ea-card__body">Manage your notification preferences.</p>
</div>
```

---

## Tag

### Description
Compact status/category label. Default variant is neutral; status variants (info/success/warning/error) communicate state.

### Variants
| Variant | Use When |
|---|---|
| Default | Neutral categorization (e.g. a count or label with no status meaning) |
| Info / Success / Warning / Error | Communicating a specific state (e.g. "Pending," "Approved") |

### Accessibility
- **Role**: no special role for a static tag.
- **Dismissible tags**: the remove button has `aria-label="Remove"` — correct, though in a real implementation this should include the tag's label (e.g. `aria-label="Remove Gold plan"`) so screen reader users know *which* tag they're removing when multiple are present.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Reserve the Warning tag's gold color for its intended status meaning | Reuse the gold Warning tag color as a generic "featured" accent — it's aliased to the Metal/Gold plan-tier color, not a general warning color (see design system audit) |

### Code Example
```html
<span class="ea-tag ea-tag--success">
  <span class="ea-tag__dot"></span> Active
</span>
```

---

## Table

### Description
Row/column data display with optional row-selection via checkbox, an expandable-row mode, and a dedicated cell-level component. **Rebuilt (7/10/26)** to match EA-DesignSystem-2021's actual architecture: cells are their own component, organized by *column position* and *data type*, and Row/Header compose instances of that cell rather than each row hardcoding its own text frames.

### Figma structure
- `Table/Cell` (component set) — variants: `Position` (`First` / `Middle` / `Last`) × `Type` (`TableData` / `TableData-Numerical`). Numerical cells right-align their content; the rest left-align. This is the "define each cell type, organize by columns" piece that was previously missing — every column in a row is now an instance of one of these 6 variants, not a one-off text frame.
- `Table/Row` (component set) — variants: `Standard`, `Selectable` (`Selected=True/False`), `Expandable` (`Expanded=True/False`). Each variant's cells are `Table/Cell` instances; the leading checkbox/expand-chevron slot in Selectable/Expandable rows is preserved as its own control, not a cell.
- `Table/Header` (component set) — variants: `Standard`, `Selectable`. Same cell-instance composition as Row.

### Variants
| Variant | Use When |
|---|---|
| Standard | Read-only data display |
| Selectable | Bulk actions on rows (adds a checkbox column) |
| Expandable | Rows that reveal additional detail on expand (adds a chevron column) |

### Accessibility
- **Role**: real `<table>`/`<thead>`/`<tbody>`/`<th>`/`<td>` elements — correct, gives screen readers native table navigation.
- **Selectable rows**: reuse the Checkbox component's `role="checkbox"`/`aria-checked` pattern in the leading cell — consistent with the standalone Checkbox component.
- **Known gap**: sortable column headers are plain text, not a `<button>` with `aria-sort`. The shared `icon.sortArrow` glyph is available in `icons.js` for this but not yet wired into the header story — recommend pairing it with a real `<button aria-sort="...">` when sorting becomes interactive.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use the selected-row background (`table.row-bg-selected`) only when the row's checkbox is checked | Apply the selected style based on hover — that's a different state and should use a separate hover treatment |
| Build new columns as `Table/Cell` instances (pick the right `Position`/`Type`) | Hand-draw a new one-off cell frame — that's exactly the pattern this rebuild removed |

### Code Example
```html
<table class="ea-table">
  <thead><tr><th>Name ↓</th><th>Modified</th></tr></thead>
  <tbody>
    <tr class="ea-table__row--selected"><td>RowName</td><td>04/02/2021</td></tr>
  </tbody>
</table>
```

---

## Field-Set

### Description
A labeled group of related Text Input instances, matching the real field groupings from EA-DesignSystem-2021. **Rebuilt (7/10/26)** as a proper Figma component set — previously a single generic frame with placeholder fields; now a real `Type` × `Size` variant matrix, each populated with the actual fields for that group rather than generic placeholders.

### Variants
| `type` | `size` | Fields |
|---|---|---|
| `Name` | Desktop | First Name, Last Name, Suffix (dropdown), Date of Birth (calendar icon), Social Security Number, "I don't have a SSN" checkbox |
| `Name` | Mobile | Same fields, stacked single-column |
| `Address` | Desktop | Address Line 1, Address Line 2, City, State (dropdown), Zip Code |
| `Address` | Mobile | Same fields, stacked single-column |
| `Contact` | Desktop | Primary Phone, Secondary Phone, Primary Email, Secondary Email |
| `Contact` | Mobile | Same fields, stacked single-column |

### Props / Properties
| Property | Type | Default | Description |
|---|---|---|---|
| `type` | enum | `Name` | Name / Address / Contact — which field group to render |
| `size` | enum | `Desktop` | Desktop (2–3 column rows) / Mobile (single column, all fields stacked) |

### Accessibility
- Same as Text Input, inherited per field — see Text Input's accessibility notes above.
- **Recommend**: wrap each group in a `<fieldset>` with a `<legend>` matching its `type` (e.g. "Contact Information") — current markup renders a plain grouping `<div>`, fine visually but doesn't give screen reader users the "N fields in this group" context a real `<fieldset>` provides.

### Code Example
```html
<fieldset class="ea-field-set">
  <legend>Contact Information</legend>
  <label class="ea-field"><span class="ea-field__label">Primary Phone</span><input class="ea-input" placeholder="000-000-0000"></label>
  <label class="ea-field"><span class="ea-field__label">Primary Email</span><input class="ea-input" placeholder="chris@example.com"></label>
</fieldset>
```

---

## Progress Indicator

### Description
Horizontal bar showing completion percentage through a multi-step flow.

### Props / Properties
| Property | Type | Default |
|---|---|---|
| `percent` | number (10–100, step 10) | `50` |

### Accessibility
- **Known gap**: no `role="progressbar"` or `aria-valuenow`/`aria-valuemin`/`aria-valuemax` are present. A screen reader user currently gets no information about progress at all — this is the most consequential accessibility gap of any component in this set, since progress is otherwise purely visual. Recommend adding the full `progressbar` ARIA triad before shipping.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Pair Progress with a text label ("Step 3 of 5") for redundant, accessible context | Rely on the bar's fill alone to communicate progress |

### Code Example (recommended, with the ARIA gap addressed)
```html
<div class="ea-progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="ea-progress__complete" style="width:50%"></div>
  <div class="ea-progress__unfinished"></div>
</div>
```

---

## Log-In

### Description
Sign-in card: logo, title, email/password fields, Remember Me, Forgot Password link, and action buttons. **Scope note**: only the Sign-In screen is built. The legacy 2021 file's multi-step Register flow is explicitly deferred (flagged in the design system audit, not silently missing).

### Accessibility
- Inherits Text Input's label association and Checkbox's ARIA pattern for "Remember Me."
- **Recommend**: the whole card should be wrapped in a `<form>` with a submit handler on the "Sign In" button (`type="submit"`) rather than a bare `<button>`, so Enter-to-submit works from either field.

### Code Example
```html
<div class="ea-login-card">
  <h2 class="ea-login-card__title">Sign In</h2>
  <label class="ea-field">...</label>
  <div class="ea-login-card__buttons">
    <button class="ea-btn ea-btn--outline">Create Account</button>
    <button class="ea-btn ea-btn--primary">Sign In</button>
  </div>
</div>
```

---

## Plan

### Description
Displays a single enrolled/available plan's key details — benefit type, carrier, plan name, cost, deductible, and actions. **Rebuilt (7/10/26)** to match EA-DesignSystem-2021's Plan tile exactly. The standalone "Plan Compare" page/component has been **removed** — comparison is a per-card `Compare` checkbox on Plan itself (select the checkbox on any number of Plan tiles to compare them), not a separate composition of 3 cards side by side. If a dedicated compare view is needed later, it should be a page that arranges multiple Plan tiles, not a distinct component.

### Variants
| `benefitType` | `cost` | `cart` | `expanded` | Shows |
|---|---|---|---|---|
| Dental | Premium | Default | Collapsed | Dentist icon badge, single "Premium" cost |
| Health | Premium | Default | Collapsed | Health (cross) icon badge, single "Premium" cost |
| Health | EmployeeEmployer | Default | Collapsed | Split Employee/Employer monthly cost columns with a divider |
| Health | Premium | InCart | Collapsed | "Remove from Cart" button in the destructive/error color instead of "Add to Cart" |
| Health | Premium | Default | Expanded | Adds the full Summary of Benefits list (Primary Care, Urgent Care, Specialist, ER, Inpatient, etc.) plus a "View Complete Summary of Benefits and Coverage" PDF link |

### Anatomy
1. Header row: `Compare` checkbox (left) and a benefit-type badge — icon (Dentist/Health) + "Standard {type} Plan" label (right).
2. Carrier/plan row: carrier logo slot + bold plan name, and either a single Premium cost or a split Employee/Employer cost.
3. Detail row: Carrier/Network, Level/Type, Deductible (Individual/Family) — three label/value column pairs.
4. Action row: "View Plan Summary" (tertiary button, expands the panel) and "Add to Cart"/"Remove from Cart" (secondary button, color flips to error/red when in cart).
5. When expanded: divider, per-benefit copay/coverage list, then the PDF summary link.

### Accessibility
- No special roles — a static content card. The `Compare` control should be a real checkbox (`role="checkbox"`/`aria-checked`, same pattern as the standalone Checkbox component) once wired up. If "View Plan Summary" toggles the expanded panel, it should carry `aria-expanded` reflecting state.

### Do's and Don'ts
| ✅ Do | ❌ Don't |
|---|---|
| Use the `EmployeeEmployer` cost split only for Employer-sponsored contexts; use `Premium` for individual/employee-paid plans | Show both cost layouts on the same card |
| Flip the cart button to the error/red "Remove from Cart" treatment only once the plan is actually in the cart | Use the red treatment as a generic "cancel" style elsewhere — it's specific to the in-cart removal action |

### Code Example
```html
<div class="ea-plan">
  <div class="ea-plan__header">
    <label class="ea-checkbox-row"><input type="checkbox"> Compare</label>
    <span class="ea-plan__badge">Standard Health Plan</span>
  </div>
  <div class="ea-plan__summary">...</div>
  <div class="ea-plan__actions">
    <button class="ea-btn ea-btn--tertiary">View Plan Summary</button>
    <button class="ea-btn ea-btn--secondary">Add to Cart</button>
  </div>
</div>
```

---

## Vitae pass (10/14/26)

Source precedence for this pass: **Vitae** (component anatomy) → **EA-DesignSystem-2021** (button radius, metal colors, ramps, type scale) per Alex's decisions.

### Button — Style axis added
| Style | Look | Use when |
|---|---|---|
| Solid | Ramp-100 fill, 2px ramp-150 border, white text | The main action |
| Outline | White fill, 2px ramp-100 border + text; hover ramp-120 on 015 tint; active ramp-140 on 025 | The paired secondary action (e.g. modal "Cancel") |
| Ghost | Text only, light tint on hover | Low-emphasis actions in dense UI |

Markup: `ea-btn ea-btn--{primary|secondary|tertiary|destructive}` + optional `ea-btn--outline` / `ea-btn--ghost`. The old standalone `ea-btn--outline` (primary-only) is replaced: use `ea-btn--primary ea-btn--outline`. Focus ring is now **dashed** (Vitae focus-outline). Radius per theme from 2021: EA/ME 6px, DC 4px, MA 3px.

### Tag — rebuilt
24px pill, 1px status border, notification-tint fill, 16px Medium label, 16px leading icon. Types: success / info / warning / error / neutral, program tags (`--dc-healthy`, `--brand` for Current/Essential Plan, `--me-clear-choice`), metal tags (`--gold|silver|bronze|platinum|catastrophic`). Old dot-style and 12px tags are gone.

### Breadcrumbs — rebuilt
`<nav aria-label="Breadcrumb"><ol>` with `<li class="ea-breadcrumb-item">`; CSS-generated "/" separators; links underline on hover; current item SemiBold with `aria-current="page"`; deep trails collapse to an "…" button. 14/20 type (2021).

### Alert — Vitae surfaces
Same markup. Backgrounds now the Vitae notification tints (`#CCE5F3`, `#C6F1CD`, `#FFECB4`, `#F8C0C0`); optional hyperlink row. Warning border stays the AA-darkened `#A37A00` (Vitae's `#E5A900` fails 3:1 on the tint).

### Text Input — additions
Label row with red required `*` (`aria-hidden`; field gets `required`/`aria-required`), optional info button (pairs with Tooltip), trailing icon slot (calendar / search / chevron), Active state border `#333`.

### Checkbox — error + group
`ea-checkbox-row--error`: whole row tinted error with 12px radius, label + message in status-error, `aria-invalid` + `aria-describedby`. `ea-checkbox-group` is a `<fieldset>` + `<legend>`, vertical or `--horizontal`.

---

## Accordion

**Description:** Expandable section for progressive disclosure (FAQs, plan details).

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | text | — | Button text in the heading |
| `expanded` | boolean | `false` | Panel visible |

**Anatomy:** 1px input-rest border, 8px radius, 12px padding; 20px chevron + Bold 16/20 title; divider + content when expanded.

**Accessibility:** APG accordion: `<h3><button aria-expanded aria-controls>` → `<div role="region" aria-labelledby hidden>`. Enter/Space toggle natively. Stories include working toggle JS (multi-open and single-open).

| ✅ Do | ❌ Don't |
|---|---|
| Allow multiple panels open | Hide required fields or errors in a collapsed panel |

```html
<div class="ea-accordion">
  <div class="ea-accordion__item">
    <h3 class="ea-accordion__heading">
      <button class="ea-accordion__trigger" aria-expanded="false" aria-controls="p1" id="b1">…icon… What counts as income?</button>
    </h3>
    <div class="ea-accordion__panel" id="p1" role="region" aria-labelledby="b1" hidden>…</div>
  </div>
</div>
```

---

## Modal

**Description:** Blocking dialog for confirmations and important status.

| Variant | Use When |
|---|---|
| Standard | Neutral confirmation |
| Info / Success | Informational outcome |
| Warning / Error | Risky action or failure; uses `role="alertdialog"` |

**Anatomy:** 560px, 4px radius, Elevation64; header (20px status icon, 20/28 SemiBold title, X), body 16/24, right-aligned Outline + Solid buttons 6px apart.

**Accessibility:** `role="dialog"|"alertdialog"`, `aria-modal`, `aria-labelledby` (title), `aria-describedby` (body). Focus moves in (least destructive action), Tab trapped, Esc closes, focus returns to trigger. The **Interactive** story implements this.

| ✅ Do | ❌ Don't |
|---|---|
| Label buttons with verbs ("Discard changes") | Use "OK"/"Yes"; stack modals |

```html
<div class="ea-modal-scrim">
  <div class="ea-modal ea-modal--warning" role="alertdialog" aria-modal="true" aria-labelledby="t" aria-describedby="d">
    <div class="ea-modal__header">…icon…<h2 class="ea-modal__title" id="t">Unsaved changes</h2><button class="ea-modal__close" aria-label="Close">…</button></div>
    <div class="ea-modal__body" id="d"><p>…</p></div>
    <div class="ea-modal__footer"><button class="ea-btn ea-btn--destructive ea-btn--outline">Keep editing</button><button class="ea-btn ea-btn--destructive">Discard</button></div>
  </div>
</div>
```

---

## Tooltip

**Description:** One sentence of supplementary help on hover/focus, usually from an input label's info icon.

**Note:** Vitae's Tooltip page is still stock Fluent 2 (Segoe UI); mapped to Enroll tokens (brand font 12/16, white, 4px, 240px max, Shadow 08). Placements: `--top|bottom|left|right|none`.

**Accessibility:** trigger is a `<button>` with `aria-describedby` → `role="tooltip"`; show on hover **and** focus, dismiss on Esc (WCAG 1.4.13). No interactive content inside.

| ✅ Do | ❌ Don't |
|---|---|
| Keep it supplementary | Put task-critical info only in a tooltip |

---

## Dropdown

**Description:** Single choice from 5–15 options. Vitae's Dropdown = the input trunk + trailing chevron.

**Implementation:** native `<select class="ea-input ea-select">` + chevron icon, inheriting all Text Input states. Hidden disabled first option = placeholder (so `required` works). Vitae doesn't design the open option panel yet; the OS menu is used.

| ✅ Do | ❌ Don't |
|---|---|
| Use Radio for 2–4 options | Use for very long lists (use a searchable input) |

---

## Date Picker

**Description:** Typed `MM/DD/YYYY` entry with an optional calendar assist. Vitae's page only explores input styles (Default / Alt 1 underline / Alt 2 floating label). **Default** is implemented. The calendar popover follows the **stock Fluent 2 Calendar** (Month Year header + up/down arrows, single-letter weekdays, 28px cells, today = filled brand circle, selection = brand tint, "Go to today").

**Accessibility:** `inputmode="numeric"`, visible format hint wired via `aria-describedby`; calendar button `aria-haspopup="dialog"`/`aria-expanded`; APG date-picker dialog keyboard model (arrows, PageUp/Down, Home/End, Enter, Esc), `aria-current="date"` for today, `aria-selected` for the selection. Verified in a headless browser: keyboard selection writes the value; Esc returns focus.

| ✅ Do | ❌ Don't |
|---|---|
| Keep the format hint visible | Force calendar-only entry for date of birth |

---

## Summary of Accessibility Gaps Found While Writing This Doc

Documenting each component surfaced concrete gaps that the earlier contrast-only audit didn't catch (contrast checks only test color, not semantics/keyboard):

1. **Progress** has no `progressbar` ARIA role at all — the single most impactful gap, since progress is otherwise invisible to screen readers.
2. **Radio Button** group is missing a `radiogroup` wrapper — blocks correct group announcement and arrow-key navigation.
3. **Header** uses a `<div>` instead of the semantic `<header>` element (Footer and LeftNav got this right).
4. **Text Input** error messages aren't wired to the field via `aria-describedby`/`aria-invalid`.
5. Tag's dismiss button and Table's sortable headers need more specific labels/roles once real interactivity is added.

None of these block using the visual/token layer today, but they should be tracked before the components are wired up with real interaction logic in the Enroll App.
