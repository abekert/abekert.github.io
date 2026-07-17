# Roundel test plan

## Purpose

This document defines a regression test strategy for the Roundel editor. It is
based on bugs and design regressions found while developing text ornaments,
presets, responsive panels, touch interactions, startup animation, sharing, and
scene rendering.

The project is a standalone static page. Tests should preserve that property:
the production page must not require a framework or test runtime.

## Current implementation status

The Playwright harness and high-value regression suite are implemented in
`tests/`. The current suite contains 63 tests and 15 visual baselines, covering
the P0 geometry, sizing, preset, panel, touch, landscape, startup, and sharing
scenarios, plus Bar grip dragging, Heritage caret placement, Transport preset
contracts, PNG format exports, and Wall Style cast geometry.

The remaining backlog is limited to deeper P1 coverage: exact startup frame
captures at fixed timestamps, PNG import round-trips, clean/scene metadata
inspection, safe-area inset checks, and pixel-level Wall Style shadow
invariants. These can be added without changing the production page.

## Recommended test stack

- Use Playwright for browser interaction, layout assertions, touch gestures,
  responsive checks, and visual snapshots.
- Use a small local static HTTP server in the test command.
- Run deterministic visual tests with animations disabled and fonts fully
  loaded.
- Prefer numeric SVG and DOM geometry assertions for bounds and alignment.
  Use screenshots for appearance that cannot be described reliably with
  attributes alone.
- Extract pure geometry helpers from `app.js` only when a browser test would be
  unnecessarily slow or fragile. Keep browser-visible behaviour covered by an
  end-to-end test.

Suggested structure:

```text
roundel/
  tests/
    geometry.spec.js
    presets.spec.js
    panels.spec.js
    gestures.spec.js
    startup.spec.js
    sharing.spec.js
    visual.spec.js
  test-results/
```

## Viewport matrix

At minimum, responsive tests should cover:

| Mode | Viewport | Purpose |
| --- | --- | --- |
| Desktop | 1440 x 900 | Full desktop layout and active-button centring |
| Phone portrait | 390 x 844 | Main mobile layout |
| Narrow phone portrait | 320 x 844 | Dock and label overflow |
| Phone landscape | 844 x 390 | Vertical dock and side panels |
| Narrow phone landscape | 667 x 375 | Limited landscape space |

Useful text fixtures:

- `UNDERGROUND`
- `TAP TO START`
- `TAP TO STAR T`
- `HELLO\nWORLD`
- `TAP  TO  START`
- text with leading and trailing spaces
- glyph-boundary cases such as `TUTOR`, `UNDERGROUND`, `OSRU`, and `TT`

## P0: text ornaments and Letter rules

These tests protect the most sensitive SVG geometry.

1. Ordinary Letter rules start at the first eligible glyph and end at the last
   eligible glyph, not the second and penultimate glyphs.
2. Outer lines are limited to the width of the rendered line and do not extend
   to the edge of the SVG or Bar.
3. Each line of multiline text receives independent rule geometry.
4. The upper rule aligns with the upper ink bound of the first glyph, including
   a capital `T`.
5. The lower rule aligns with the lower ink bound of the glyphs.
6. Upper and lower rules have visually symmetric offsets.
7. Ordinary and hexagonal rules use the same vertical reference system.
8. Hexagonal rules create an independent ornament for every non-space glyph.
9. No hexagonal ornament is rendered above or below a space.
10. Hexagon points face the historically correct direction.
11. Hexagon fill matches the current text colour.
12. Heritage central glyphs retain enough vertical breathing room between
    ornaments.
13. `Join spaces` joins ordinary rules across spaces.
14. With `Join spaces` disabled, ordinary rules break at spaces.
15. `Join spaces` is unavailable or ignored for hexagonal rules.
16. Leading, trailing, single, and repeated spaces do not create stray rules.
17. First and last visual gaps are balanced for glyphs with different ink
    bounds, including `T`, `U`, `O`, `S`, and `R`.
18. Small and large Space dots replace spaces only.
19. Space dots add sufficient advance around themselves so adjacent letters do
    not look cramped.
20. Large dots are disabled when Space dots are disabled.

Where possible, compare calculated SVG bounds with a tolerance of approximately
one screen pixel. Add cropped visual snapshots for Heritage and multiline rules.

## P0: text sizing and Bar independence

1. Changing Bar Thickness does not change the text size.
2. Bar Thickness cannot go below the minimum height needed by the current text.
3. Changing Bar length does not change the text size.
4. Dragging Bar grips changes only the Bar geometry.
5. Font Size scales width and height continuously without threshold jumps.
6. Font Height changes only the vertical scale.
7. Font Width changes only the horizontal scale.
8. Size, Height, and Width are monotonic across their complete slider ranges.
9. Font measurement bounds follow the visible glyphs after Width scaling.
10. Enlarged font bounds do not prevent later Bar expansion by dragging.
11. The editing caret aligns with transformed text, especially in Heritage.
12. Reset restores the exact preset or default value.
13. Reset buttons always reserve layout space and are disabled at defaults.
14. Starting a slider drag does not resize or shift the slider row.

## P0: preset contracts

Every important preset should have a state contract that records font, text
size, text proportions, Bar geometry, scene, inset, outlines, Letter rules, and
dots.

Required contracts and visual snapshots:

- Heritage: hexagons enabled, White inset disabled, compact vertical spacing.
- Modern rules: White inset, Outer lines, and Join spaces enabled; outer lines
  sit outside the inset outline.
- Red Disc: text is not vertically cramped.
- Signboard: text is not vertically cramped.
- Air Line: large Space dot enabled.
- Dial-a-Ride: small Space dots enabled.
- TfL Rail: small Space dots enabled.
- Remaining Transport presets: Ring, Bar, and text proportions match the
  reference family.

Also test:

1. Switching `Heritage -> another preset -> Heritage` restores the original
   geometry exactly.
2. Custom changes from one preset do not leak into the next preset.
3. URL/share state round-trips Size, Height, Width, dots, and every Letter rules
   option.
4. Applying the same preset twice is idempotent.

## P0: panels and dock

1. In portrait and desktop modes, panels render above the dock without covering
   it.
2. On a wide desktop, a panel centres on its active dock button.
3. Panels are clamped inside the viewport near screen edges.
4. The panel pointer appears outside the panel and targets the active button.
5. The pointer hides when the panel closes.
6. Switching tabs moves the pointer to the newly active button.
7. The dock remains visible and clickable while a panel is open.
8. Clicking the active button closes its panel.
9. Clicking it again reopens the panel.
10. A panel closed by click does not reopen immediately because of hover.
11. The close button closes the panel.
12. The close button has a hit area of at least 44 x 44 CSS pixels.
13. Only one settings panel is open at a time.
14. Font contains only typeface selection.
15. Size contains only Size, Height, and Width.
16. Style contains Capitalise, Space dots, and Letter rules.
17. Scene renders as a three-column tile grid.
18. Font renders as a two-column grid on phones.
19. The dock fits at 320 px and 390 px without clipped labels.
20. Dock order is Font, Size, Style, Scene, Ring, Bar.
21. During slider adjustment, non-active panel content becomes nearly
    transparent.
22. Backdrop blur is disabled during slider adjustment.
23. Moving directly between adjacent sliders does not leave the transparency
    state stuck.

## P0: touch gestures and preset carousel

1. A horizontal swipe over presets does not select the element under the
   finger.
2. Movement beyond the gesture threshold enters scroll mode.
3. Entering scroll mode clears preview and highlight immediately.
4. The cell under the finger does not retain `:hover` after the swipe ends.
5. A tap without significant movement selects the preset.
6. Selecting a preset on a phone does not change carousel `scrollLeft`.
7. Initial carousel `scrollLeft` is always zero.
8. Desktop selection may continue centring the active preset.
9. The carousel retains `touch-action: pan-x`.
10. Long press does not select buttons, labels, panels, or preset cells.
11. The text input still allows normal selection and editing.
12. Panels and the dock do not make the document scroll.
13. Pinch zoom and double-tap zoom are disabled.
14. The preset carousel remains horizontally scrollable after page scrolling is
    disabled.

Use real touch pointer events for these tests. Programmatic `click()` alone is
not sufficient because it bypasses browser gesture recognition.

## P0: landscape layout

1. At 844 x 390 and 667 x 375, the dock is vertical and positioned at the lower
   left.
2. Dock buttons form one non-overlapping column.
3. Settings panels open to the right of the dock.
4. The pointer faces left and aligns vertically with the active button.
5. Panel top is never above the viewport.
6. A panel may extend to the bottom edge and cover presets.
7. A panel may cover the preset rail but not the dock.
8. Tall panels scroll internally instead of leaving the viewport.
9. Rotating with a panel open clears stale desktop or portrait coordinates.
10. Rotating back to portrait places the panel above the dock again.
11. Share opens to the left of the Share button.
12. Share remains completely inside the viewport.
13. Safe-area insets do not cover controls.

## P1: startup and animation

1. The first visible frame after reload contains the expected `MAKE` state and
   never flashes the final `TAP TO START` Roundel.
2. The dark background gradient is present on the first frame.
3. The background does not change during the intro.
4. Controls remain hidden during boot and appear at the intended point.
5. `prefers-reduced-motion` removes intro transitions.
6. Opening a panel after intro uses final viewport coordinates, not transformed
   boot-scene coordinates.
7. The Roundel is geometrically centred in desktop, portrait, and landscape
   modes.

For the startup flash, capture frames immediately after `DOMContentLoaded` and
at approximately 50 ms, 150 ms, and 500 ms.

## P1: UI visual regressions

1. Panels retain the intended transparency and backdrop blur.
2. The outline pointer looks like a continuation of the panel border.
3. The close control remains flat and visually consistent with the UI.
4. Share remains visually distinct from settings buttons.
5. The dock has one shared border without individual outlines or stray red
   accents.
6. The active dock button is highlighted in blue.
7. Dependent controls for Large dots and Letter rules have the correct connector
   line, indentation, and disabled state.
8. Scene previews remain large and labels do not break the grid.
9. The page background retains the dark red-black-blue treatment.

## P1: Wall Style visual invariants

The Wall Style requirements in `AGENTS.md` should become high-zoom visual
regression tests:

1. Ring and Bar shadow crossings do not form a darker band.
2. The upper-right and lower-left Bar diagonals are single continuous lines.
3. Rounded corners have no square fins, forks, wedges, or light slivers.
4. No shadow pixel protrudes above or left of the opaque outline.
5. The gray Bar outline remains opaque and hides the red Ring beneath it.
6. The Ring has one continuous cast without extra concentric contours.

## P1: sharing and export

1. Share opens and closes without changing editor state.
2. Share capability detection enables only supported actions.
3. Clean and scene exports use the selected format.
4. PNG and SVG exports contain the current text and colours.
5. Copy/edit links restore the complete editor state.
6. Share stays within the viewport in desktop, portrait, and landscape modes.
7. Closing Share restores the stage and HUD state.

## Visual test stability

Before taking screenshots:

1. Wait for `document.fonts.ready`.
2. Disable CSS animations and transitions through a Playwright stylesheet or
   reduced-motion context.
3. Wait for any SVG update frame to complete.
4. Use a fixed browser version and device scale factor.
5. Snapshot the SVG/stage and the UI separately where possible.
6. Use numeric geometry assertions for one-pixel alignment; do not rely solely
   on full-page image diffs.

## Implementation phases

### Phase 1: test harness and critical smoke coverage

1. Add Playwright and the local static-server command.
2. Add shared helpers for loading the editor, completing intro, waiting for
   fonts, selecting a preset, opening a panel, and reading SVG bounds.
3. Add the viewport matrix.
4. Add smoke tests that load the page, edit text, change a preset, open every
   panel, and export state.

### Phase 2: high-value regression suite

Implement these first:

1. Heritage visual snapshot.
2. Modern rules visual snapshot.
3. Multiline Letter rules bounds.
4. Hexagons, spaces, direction, and colour.
5. Bar size does not alter text size.
6. Size, Height, and Width monotonicity.
7. Preset state contracts.
8. Mobile preset swipe versus tap.
9. Portrait panel, dock, and pointer geometry.
10. Landscape panel, dock, and pointer geometry.
11. Startup first-frame regression.
12. Initial and preserved preset carousel scroll.

### Phase 3: visual preset matrix

Add stable snapshots for Heritage, Modern rules, Red Disc, Signboard, selected
Transport presets, and each Scene option. Include multiline and space-dot text
fixtures.

### Phase 4: advanced geometry and interaction coverage

Add caret geometry, grip dragging, orientation changes with open panels, slider
handoff behaviour, Share/export round-trips, and Wall Style high-zoom tests.

## Required checks for every Roundel change

Keep the existing static checks:

```sh
node --check roundel/app.js
perl -0777 -ne 'if (/<svg\b[^>]*id="roundel-svg"[\s\S]*?<\/svg>/) { print $& }' roundel/index.html | xmllint --noout -
git diff --check
```

Once the harness exists, add the Playwright smoke suite to this minimum set.
