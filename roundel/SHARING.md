# Roundel sharing and embedded projects

Roundel exports are designed to remain useful both as artwork and as portable,
editable projects.

## PNG metadata

PNG exports add uncompressed UTF-8 `iTXt` chunks immediately before `IEND`:

- `Title`, `Description`, `Software`, `Creation Time`, and `Comment`
- `Roundel:URL` for the stateful edit link
- `Roundel:State` for the complete versioned project JSON
- `Roundel:Format` (`clean` or `card`)
- `XML:com.adobe.xmp` for XMP-aware tools

The description identifies Roundel Sign Maker as an application by Alexander
Bekert. Do not add device identifiers, geolocation, or other user tracking to
exported files. Social services may strip all metadata, so the Share card also
uses a visible remix footer.

## SVG metadata

SVG exports contain a human-readable `<title>` and `<desc>`, plus a
`#roundel-metadata` block in the namespace:

`https://abekert.github.io/roundel/metadata/1.0/`

The `roundel:state` element is the source used by **Remix from PNG or SVG**.
When the project state changes incompatibly, keep the current reader backward
compatible and increment the metadata schema.

## Share events

The app emits privacy-safe `roundel:analytics` browser events. Event detail
contains the event name and coarse mechanism/format only; it intentionally
excludes sign text and URLs. The current funnel is:

`share_opened` → `share_asset_ready` → `share_sheet_completed` →
`remix_opened` → `remix_created`

These events are hooks only. No analytics service or network request is loaded
by the static page.

## Static-hosting limitation

GitHub Pages cannot generate per-project Open Graph metadata or durable short
URLs. Those require an edge/server endpoint that stores or signs project state,
renders an OG image, serves crawler metadata, and redirects people to the
stateful editor URL.
