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

## Deployment

GitHub Pages serves this repository directly. Push changes to the default branch:

```sh
git add .gitignore index.html assets/css/main.css README.md favicon.svg site.webmanifest robots.txt sitemap.xml images/alexander-bekert.jpg images/meta-logo.svg images/og-image.svg images/og-image.png
git commit -m "Refresh personal homepage"
git push origin master
```

GitHub Pages will publish the updated static files automatically.
