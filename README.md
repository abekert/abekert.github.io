# abekert.github.io

Static GitHub Pages site for [abekert.github.io](https://abekert.github.io/).

## Local preview

The site is plain HTML and CSS. From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Editing content

Homepage content lives in `index.html`, with clear sections for:

- Hero
- Core expertise
- Selected experience
- Contact

Styles live in `assets/css/main.css`.

Homepage assets live in `images/`:

- `alexander-bekert.jpg`
- `meta-logo.svg`
- `og-image.svg`
- `og-image.png`

The root favicon lives in `favicon.svg`, with install metadata in `site.webmanifest`.

The legacy Push Out page remains available at `/pushout/`.

## Maintenance notes for AI/editor passes

Keep the homepage and social preview in sync. When updating the hero/header
positioning in `index.html`, also review and update `images/og-image.svg`:

- name/title
- current company or role wording
- headline/subheader
- location
- profile image treatment

After editing `images/og-image.svg`, regenerate `images/og-image.png`. The
homepage metadata points social platforms at the PNG, while the SVG is the
maintainable source artwork.

Current OG portrait settings:

- mask: `circle cx="960" cy="276" r="98"`
- photo: `x="808" y="150" width="316" height="316"`
- `preserveAspectRatio="xMidYMid slice"`
- the mask is applied directly to the photo with `mask="url(#portraitMask)"`

These settings intentionally zoom the homepage portrait around the face while
keeping the full face/head visible inside the circular frame.

## Deployment

GitHub Pages serves this repository directly. Push changes to the default branch:

```sh
git add .gitignore index.html assets/css/main.css README.md favicon.svg site.webmanifest robots.txt sitemap.xml images/alexander-bekert.jpg images/meta-logo.svg images/og-image.svg images/og-image.png
git commit -m "Refresh personal homepage"
git push origin master
```

GitHub Pages will publish the updated static files automatically.
