# tokens-v2 (Vitae 27)

New token set for the Vitae 27 library. Built alongside the current `tokens/` folder, which stays in place and keeps the live Storybook working until v2 replaces it.

- `primitives.json` — Phase 1, signed off 10/16/26. Raw values only, no meaning: one cool neutral ramp (010–220), brand ramps for EA, DC, MA and ME (005–190, with 100 as each client's brand color), status ramps, metal and program colors, spacing, radius, border widths, type sizes, line heights, weights, families, motion and two elevations.
- Mirrors the **Primitives** collection in the [Vitae 27](https://www.figma.com/design/FgVdwGszfnY0vz75yxfJ7F) Figma file. Figma code syntax uses `var(--vitae-<path>)`, for example `var(--vitae-color-dc-primary-100)`.
- Next: a Brand layer (EA, DC, MA, ME) and a Semantic layer (Light, Dark).

Status surfaces use step 015 of each status ramp (decided 10/16/26).
