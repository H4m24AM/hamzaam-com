# Photography collections

Collections are managed through folders. Page layouts do not need editing.

## Add the Faith in Brooklyn photographs

Place the three actual photographs in:

`content/photography/collections/faith-in-brooklyn/`

Use these names (the existing captions and cover selection match them):

1. `01-muadhin.jpg` — The Muadhin, Barclays Center, Brooklyn; Black Lives Matter protest.
2. `02-young-worshipper.jpg` — The Young Worshipper, Masjid At-Taqwa, Brooklyn; Eid prayer.
3. `03-child.jpg` — The Child, Masjid At-Taqwa, Brooklyn; Eid prayer.

No dates have been assumed. The collection is currently `published: false` because the photographs have not been supplied. Once the photographs and captions have been reviewed, change this to `true` in `collection.json`. The designated cover is `03-child.jpg`.

## Update a collection

1. Open its folder in `content/photography/collections/`.
2. Add, remove, replace, or rename photos. Supported extensions: JPG, JPEG, PNG, WebP (case-insensitive). Animated images are rejected.
3. Use filenames such as `01.jpg`, `02.jpg`, `10.jpg` to control order. Numeric sorting also handles `1.jpg`, `2.jpg`, `10.jpg` correctly.
4. Commit and push your changes. Once the build configuration below is enabled, Cloudflare automatically rebuilds the gallery.

The folder determines the images shown. The optional `images` object only adds captions; images do not need entries there. If you remove or rename the selected cover, update `coverImage` or delete that field to use the first photo. Invalid cover names fail the build instead of publishing a broken image.

## Create a collection

Create a folder with a lowercase, hyphenated name, add photos, and add `collection.json`:

```json
{
  "title": "Your collection title",
  "description": "Your introduction.",
  "category": "Documentary",
  "location": "Brooklyn, New York",
  "published": true,
  "featured": true
}
```

The folder name becomes the URL: `/photography/collections/your-folder-name/`.

- `published: true`: generates the page and adds it to the collections index.
- `featured: true`: also adds a card to the existing Photography featured grid.
- `published: false` (or omitted): excludes the page, images, and card from the production build.
- Optional `order` number controls collection sequence (default 0; ties use folder-name order).
- Optional `coverImage` selects a filename; otherwise the first image is the cover.
- Optional `subtitle` and `year` display only when supplied. Never guess capture dates.
- Unknown future metadata fields are retained in source but not displayed automatically.

Optional photo metadata example:

```json
"images": {
  "01.jpg": {
    "title": "Photograph title",
    "alt": "Describe what is visible in the photograph",
    "location": "Verified location",
    "date": "Verified capture date",
    "description": "Optional caption"
  }
}
```

Omit any unknown fields. With no caption metadata, the photo has no empty caption area. Provide descriptive `alt` text when possible; otherwise the builder uses the title or collection name and sequence number.

## Build and preview

Requires Python 3.12+ and Pillow:

```text
python -m pip install -r requirements.txt
python scripts/build_collections.py
python -m http.server 8765 --directory dist
```

Open `http://localhost:8765/photography.html` and `/photography/collections/`.

For local editorial review of unpublished collections:

```text
python scripts/build_collections.py --preview
python -m http.server 8766 --directory preview-dist
```

The Faith in Brooklyn local preview is at `http://localhost:8766/photography/collections/faith-in-brooklyn/`. Until the actual photos arrive it displays the approved introduction and an explicit missing-photo notice, with no broken images. Draft pages have `noindex,nofollow` and never appear in public indexes. Never deploy `preview-dist`.

The generator writes only to `dist` or `preview-dist`; source HTML is not overwritten. Each build replaces the generated output, so deleted files and unpublished routes disappear. Images are EXIF-oriented, proportionally resized without cropping, converted to WebP at up to 1920px wide, and stripped of original metadata. Embedded color profiles are converted to sRGB. Original masters stay out of the generated public output. Existing website assets and real estate pages are copied unchanged.

## Cloudflare Pages — one-time setting, after approval

The current site has no build command. Before merging/deploying this system, update the **hamzaam** Pages project's build configuration:

- Framework preset: None.
- Root directory: repository root.
- Build command: `python -m pip install -r requirements.txt && python scripts/build_collections.py`
- Build output directory: `dist`.
- Python version: 3.12 (set `PYTHON_VERSION=3.12` in the build environment).

Apply to preview and production environments when deployment is approved. Keep the existing GitHub integration, domain, and production branch. No DNS changes are needed. Do not merge this PR while Cloudflare still serves the repository root: the new collection pages only exist in the built output, and root serving would expose editorial source files.

The GitHub workflow runs behavioral tests and a production build, then saves `dist` as a downloadable review artifact. It does not deploy or commit generated files. Faith in Brooklyn remains unpublished until real photos and publication approval are available.

Cloudflare build settings reference: https://developers.cloudflare.com/pages/configuration/build-configuration/

## Verification

```text
python -m unittest discover -s tests -v
python scripts/build_collections.py
```

Tests use temporary synthetic images solely for validation, never in published collections. They check add/remove discovery, natural ordering, mixed aspect ratios, EXIF orientation, captions and escaping, cover selection, draft exclusion, previous/next links, build failures for invalid published collections, and existing gallery preservation.
