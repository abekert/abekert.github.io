The site remains plain HTML/CSS/JavaScript. Node dependencies are for verification only.

From `roundel/`, use Node 24 and run:

```sh
npm ci
npx playwright install chromium
npm run check
npm test
```

`npm run check` validates analytics, JavaScript syntax and local links. The link
checker includes HTML/SVG references, fragments, responsive image candidates,
CSS assets, manifests and sitemap entries. Browser tests fail on console errors
and uncaught exceptions, including malformed SVG paths. The site tests cover
responsive portraits, delayed YouTube loading and the no-JavaScript fallback.

The suite starts `scripts/serve-site.cjs` using Node's built-in HTTP server, so
preview startup uses the same runtime locally and on CI. `TEST_PORT` selects
an alternate port. Clipboard permissions use the same origin.
`CHROME_PATH` is an explicit diagnostic override; normal runs
use Chromium 149.0.7827.55 installed by the locked Playwright 1.61.1 package.
CI runs the checks on macOS 15 with Node 24. macOS and Linux font rendering are
different, so the existing `-darwin.png` visual baselines must not be copied to
Linux without review.

Visual tests use reduced motion to disable both CSS and JavaScript transitions.
Their UI font is bundled under `roundel/tests/fonts/` so local font installations
and macOS system-font updates cannot change panel snapshots. Sign artwork keeps
its normal font choices. The early startup frame test advances a controlled
browser clock, independently of runner load and navigation latency.
Startup and gesture tests separately exercise animation and normal interaction.
Review expected/actual/diff images in `roundel/test-results/` before updating
baselines. Never increase tolerances simply to hide a failure.

For a reviewed visual change:

```sh
npx playwright test tests/visual.spec.js --update-snapshots=changed
npx playwright test tests/visual.spec.js
```

Outgoing links have an optional network check, run from the repository root:

```sh
python3 scripts/check-links.py --external
```

That check reports HTTP failures and suspended-host redirects. It is separate
from deterministic CI because remote services may block bots or change their
responses. The old App Store and review links identified in the September audit
remain an archive-content follow-up; do not silently allow-list them as healthy.

Portrait variants can be regenerated with `python3 scripts/optimize-portrait.py`
using ImageMagick with AVIF/WebP support. The original JPEG remains the source
and fallback. Local YouTube thumbnail sources are recorded in
`pushout/img/video/README.md`.

Before publishing, run the checks, inspect the affected pages at desktop and
phone sizes, verify mobile zoom and keyboard focus, and review the final diff.
