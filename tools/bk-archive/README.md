# Hamza.AM private Brooklyn archive

This is the native `/bk-archive` page for the existing Cloudflare Pages website. It preserves archive browsing, shoot planning, original photo uploads, notes, attribution, comparison modes, and saved alignment. The private Sites deployment remains available during migration.

## One-time Cloudflare setup before merging

1. In the Pages project serving `hamza.am`, create and bind a D1 database as `BK_ARCHIVE_DB`. Execute `tools/bk-archive/schema.sql` once in that database.
2. Create and bind an R2 bucket as `BK_ARCHIVE_PHOTOS`.
3. In Cloudflare Zero Trust / Access, create a self-hosted application protecting `hamza.am/bk-archive` and `hamza.am/bk-archive/*`. Allow only the owner's chosen sign-in email. Use the owner's existing identity provider or email one-time PIN.
4. Set these Pages environment variables for production and any preview environment being tested:
   - `BK_ARCHIVE_ACCESS_TEAM_DOMAIN`: the team hostname, for example `your-team.cloudflareaccess.com` (no scheme).
   - `BK_ARCHIVE_ACCESS_AUD`: this Access application's audience value.
   - `BK_ARCHIVE_OWNER_EMAIL`: the exact owner sign-in email allowed by the Access policy.
5. Choose **Fail closed** for Pages Functions. Do not allow a quota or function error to serve protected static assets without the middleware. The application also verifies the signed Access JWT and owner email for every archive route, including assets and API requests. No other website routes are included in `_routes.json`.
6. Deploy and verify a signed-out visit cannot read the page, records, or image endpoints; verify the owner can upload, save a comparison, reload, and retrieve the original image.

Without the access variables, the archive returns 503. Without a verified owner identity it returns 401/403. The remainder of the website keeps its existing static delivery.

## Build and maintenance

The compiled frontend under `/bk-archive` and the bundled JWT verifier under `/functions/_lib` are committed so the current Python-only Cloudflare build command can remain in use. Pages automatically compiles the root `/functions` directory. The Python build includes `/bk-archive` and `_routes.json` in `dist`.

After changing the source in this directory:

```sh
pnpm --dir tools/bk-archive install --frozen-lockfile
pnpm --dir tools/bk-archive build
node --test tests/bk_archive.test.mjs
python -m unittest discover -s tests -v
node tests/test_photography_hover.cjs
python scripts/build_collections.py
```

The seed dataset contains only previously verified archive previews and source records. Personal notes, pairings, and uploaded originals must never be committed to this public repository.

Migration check on 2026-11-02: the private Sites workspace table had no saved records to transfer. Recheck before live migration if the owner continues using that workspace.

## Source archives

All item credits, dates, identifiers, rights notes, and original-record links are retained in `src/data.ts`. The six Library of Congress previews have the source advisory “No known restrictions on publication.” The NYPL entry remains a source-only lead with its separate rights note. Source attribution does not convert archival material into work by Hamza.AM.
