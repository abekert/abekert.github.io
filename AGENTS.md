# Repository maintenance instructions

These instructions apply to the entire repository. Keep `README.md` concise and
public-facing: it is the repository's GitHub landing page and should advertise
the finished CV, Roundel, and Push Out pages rather than document implementation
or deployment details.

More specific instructions take precedence within their directories:

- `roundel/AGENTS.md` documents Roundel visual invariants and verification.
- `roundel/SHARING.md` documents export metadata, sharing, remixing, and the
  analytics event contract.
- `pushout/README.md` documents the Push Out archive's product intent, visual
  layering, assets, parallax behavior, and known pitfalls.

## Project shape

This is a static GitHub Pages repository built with plain HTML, CSS, and
JavaScript. There is no site generator or package installation step.

- `/` is the CV and engineering profile.
- `/roundel/` is the Roundel Sign Maker.
- `/pushout/` is the archived Push Out site.
- `/cross-promo/` is the small legacy games cross-promotion page.
- `/privacy/` contains the website privacy notice and analytics opt-out.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`. Use an HTTP preview rather than `file://`,
especially when checking absolute asset paths, storage, analytics behavior, or
YouTube embeds.

## Homepage

Homepage content lives in `index.html`; its styles live in
`assets/css/main.css`. The page has a small inline `theme-color` updater that
samples the visible background near the top of the viewport. Keep it so Safari
and mobile browser chrome continue to match the page while scrolling.

The root `html` element has `background: var(--bg)` so Safari/iOS rubber-band
overscroll does not fall back to browser white.

Homepage assets include:

- `images/alexander-bekert.jpg`
- `images/meta-logo.svg`
- `images/og-image.svg`
- `images/og-image.png`
- `favicon.svg`
- `site.webmanifest`

### Social preview maintenance

Keep homepage copy and the social preview in sync. When changing hero/header
positioning or identity content in `index.html`, review and update
`images/og-image.svg`, including:

- name and title;
- current company or role wording;
- headline and subheader;
- location;
- profile-image treatment.

After changing `images/og-image.svg`, regenerate `images/og-image.png`. The
homepage metadata serves the PNG while the SVG remains the editable source.

Current OG portrait settings:

- mask: `circle cx="960" cy="276" r="98"`;
- photo: `x="808" y="150" width="316" height="316"`;
- `preserveAspectRatio="xMidYMid slice"`;
- the mask is applied directly to the photo with
  `mask="url(#portraitMask)"`.

These settings intentionally zoom around the face while keeping the full head
visible in the circular frame.

## Privacy-first analytics

The GA4 integration lives in `assets/js/analytics.js` and uses measurement ID
`G-50YJXSVRJ4`.

Preserve these guarantees:

- Consent Mode defaults are sent before `config`.
- `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`
  remain `denied`.
- Google Signals and advertising-personalisation signals remain disabled.
- Page locations and referrers exclude query strings and fragments.
- Roundel forwards only explicitly allow-listed event names and coarse values;
  never send sign text, project state, filenames, file contents, or share URLs.
- Analytics does not contact Google on localhost, on unsupported hostnames,
  after opt-out, or when GPC/DNT is enabled.
- `/privacy/` must not load the analytics module because it hosts the opt-out.

The opt-out is stored as the functional local-storage preference
`abekert_analytics_disabled`. Roundel separately uses local storage for its own
functional editor state; that state must never be sent to analytics.

Run the analytics regression checks after changing this integration:

```sh
node scripts/test-analytics.js
```

## Verification

Run checks proportional to the edited area. At minimum for general changes:

```sh
git diff --check
```

For analytics changes:

```sh
node scripts/test-analytics.js
node --check assets/js/analytics.js
```

For Roundel changes, also follow `roundel/AGENTS.md`, update cache-busting query
values when rendered CSS or runtime JS changes, and run its required checks.

When adding or removing public pages, keep `sitemap.xml`, navigation, privacy
links, canonical URLs, and analytics coverage consistent.

## Deployment

GitHub Pages serves the default branch directly. Review the diff, stage only
the intended files, commit, and push `master` to `origin`. Avoid broad staging
when unrelated user changes are present in the working tree.
