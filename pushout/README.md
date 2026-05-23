# Push Out Site Maintenance Notes

This folder contains the legacy static website for **Push Out**, an indie iOS game originally published around 2014. The site is intentionally visual and handmade: it uses scanned/drawn artwork, textured backgrounds, simple HTML/CSS, and a small parallax script.

These notes are written for future humans and AI coding agents who may need to maintain or rewrite the site in a modern stack.

## Pages

- `index.html` is the main Push Out landing page.
  - Hero sea area with the Push Out logo, hanging video board, App Store giraffe artwork, social buttons, island transition, reviews, product copy, and navigation.
  - Styling lives in `style.css`.
  - Parallax behavior lives in `js/parallax.js`.

- `html/story.html` is the polished retrospective product story.
  - Uses the sea/island background assets from the main page.
  - Includes publication metadata, a small portrait figure, prototype/sketch artwork, and YouTube videos.
  - Styling lives in `css/story-style.css`.

- `html/contacts.html` and `html/privacy.html` are secondary text pages.
  - Styling lives in `css/secondary-style.css`.

- `html/trottoir.html` is a small cross-link page for the Trottoir game.
  - Styling lives in `css/trottoir-style.css`.

## Key Assets

- `img/sea-background-square.png` - repeating blue sea texture.
- `img/island.png` - transparent-top shoreline/grass island strip.
- `img/island-background.png` - repeating yellow island surface texture.
- `img/push-out-label.png` - main Push Out logo artwork.
- `img/board.png` - wooden video board frame.
- `img/giraffes-app-store-link.png` - App Store sign with giraffes.
- `img/social/*.png` - hand-drawn social buttons.
- `img/push-out-first-prototype.png`, `img/sketches.png`, `img/alexander-bekert-photo.png` - story page media.

## Main Page Layering

The landing page depends on careful visual stacking. Do not flatten these into one ordinary document flow without checking the transition artwork.

Layer order in the hero:

1. Sea background texture.
2. Rope shadows.
3. Board ropes.
4. Push Out logo.
5. Video board.
6. App Store giraffe artwork.
7. Island strip over the bottom of the giraffe artwork.
8. Island-background content section.

The island strip must use `img/island.png` with its transparent top. It should overlap the giraffe/App Store art enough that the giraffes do not appear to float above the ground. The transparent part should reveal the sea/giraffe layer below, not a solid color fill.

## Parallax

`js/parallax.js` drives the parallax effect with CSS custom properties on `.hero`.

Important direction rules:

- Foreground/content moves together:
  - Push Out logo
  - video board
  - App Store giraffe artwork
  - board ropes

- Background/shadow moves separately:
  - sea background
  - logo/board/App Store drop shadows
  - board rope shadows

This distinction matters: the board ropes are physically attached to the board, so the rope lines move with the board/content. Their shadows move with the shadow/background vector.

The script also measures the actual video board position and sets `--board-rope-height`. This keeps the rope bottoms tucked under the board frame across viewport widths. Avoid returning to viewport-only rope heights; that caused ropes to float above the board on wide screens or leak below the board on mobile.

## Board And Video

The video board should be treated as fixed-ratio artwork:

- `.video-board` uses the original `670 / 420` aspect ratio.
- The YouTube iframe is absolutely inset into the board opening.
- Avoid simple padding-only responsive embeds here; they can make the video spill outside the wooden frame.

YouTube embeds use the `/embed/VIDEO_ID` URL with `origin` and `widget_referrer` parameters. When opened via `file://`, YouTube may still show Error 153 because the browser does not provide a normal HTTP origin/referrer. Test video embeds via a local server or deployed GitHub Pages URL.

Local preview:

```sh
cd abekert.github.io
python3 -m http.server 8010
```

Then open:

```text
http://127.0.0.1:8010/pushout/
```

## Story Page Background

The story page uses the same visual language as the landing page:

1. `island.png` shoreline at the top.
2. `sea-background-square.png` constrained to the top transition area.
3. `island-background.png` repeating below as the main texture.

The story content starts after the shoreline, but should not have excessive empty island space above the title.

## Links

Internal links should be relative so they work from `file://`, localhost, and GitHub Pages:

- From pages inside `html/`, use `../index.html` or `../` to go back to Push Out.
- From pages inside `html/`, use `../../` to return to the main personal site.
- Avoid hard-coded old `win2l.github.io` links in Push Out HTML.

## Common Pitfalls

- Do not replace the island transition with a solid background color. It breaks the handmade sea-to-island edge.
- Do not put the island sea texture as a separate opaque layer over the giraffes. The transparent top of `island.png` should allow the giraffe/sea layer to show through.
- Do not make the rope layer a repeated sprite. The old `board-rope.png` is a small artifact-prone sprite; the current ropes are CSS-drawn lines with separate blurred CSS shadows.
- Do not make rope shadows part of the rope line itself. Ropes and rope shadows need independent parallax vectors.
- Do not use viewport-only heights for board ropes. Use the measured board position from `parallax.js`.
- Do not remove `overflow: hidden` from `.hero` without checking mobile horizontal overflow from parallax and rotated ropes.
- Do not rely on `file://` to validate YouTube iframes. Use a local server.
- Do not add card-like boxes around reviews/story text unless intentionally changing the handmade page style. The design should feel like text printed on the island texture, not a corporate case study.

## Future Rewrite Guidance

If this site is rewritten in React, Astro, Svelte, or another modern framework, preserve the visual model first:

- Build an explicit layered hero component.
- Keep parallax state as CSS variables or transform props.
- Measure the board position for rope height after layout.
- Treat the board/video as one framed media component.
- Treat the island transition as an overlapping transparent PNG layer.
- Keep the story page nostalgic and handmade, not corporate.

Before finishing any future rewrite, verify at least:

- Mobile: 390x844.
- Default desktop: 1280x720.
- Wide desktop: 1440x900 or wider.
- No horizontal overflow.
- Ropes reach under the board top and do not leak below the board.
- Giraffes sit behind/into the island shoreline and do not float.
- YouTube embeds work from an HTTP origin.
