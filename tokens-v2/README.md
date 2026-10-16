# tokens-v2 (Vitae 27)

New token set for the Vitae 27 library. Built alongside the current `tokens/` folder, which stays in place and keeps the live Storybook working until v2 replaces it.

- `primitives.json` — Phase 1, signed off 10/16/26. Raw values only, no meaning: one cool neutral ramp (010–220), brand ramps for EA, DC, MA and ME (005–190, with 100 as each client's brand color), status ramps, metal and program colors, spacing, radius, border widths, type sizes, line heights, weights, families, motion and two elevations.
- Mirrors the **Primitives** collection in the [Vitae 27](https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F) Figma file. Figma code syntax uses `var(--vitae-<path>)`, for example `var(--vitae-color-dc-primary-100)`.
- `brand/{ea,dc,ma,me}.json`: Phase 2, signed off 10/16/26. Brand roles per client: the three ramps as `brand.*`, brand-tinted light-mode text, the dark-mode button picks, font family and radius. Phase 3 (Button, 10/16/26) added outline/ghost text colors per client and mode, the dark hover/pressed tints, and moved dark solid buttons to near-white fills (primary 010, secondary and tertiary 020). Mirrors the **Brand** collection (modes EA, DC, MA, ME) in Figma.
- `semantic/{light,dark}.json`: Phase 2, signed off 10/16/26. 81 color roles (background, field, border, text, icon, action, support). Phase 3 added 20 outline/ghost button roles (`action.*-text*`, `action.*-subtle-*`) and borders for every alert (`support.*-border`). Mirrors the **Color** collection (modes Light, Dark). Pick one brand file and one semantic file to get any of the 8 combinations.
- Text styles (16, from H1 to table text) live in Figma, with the font family bound to `brand/font/family`.

Status surfaces use step 015 of each status ramp (decided 10/16/26).
