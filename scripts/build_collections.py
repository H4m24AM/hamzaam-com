"""Build folder-managed photographic collections without changing source pages.

Production: python scripts/build_collections.py
Local drafts: python scripts/build_collections.py --preview
"""
from __future__ import annotations
import argparse
import html
import json
import re
import shutil
import tempfile
from pathlib import Path
from string import Template
from urllib.parse import quote
from PIL import Image, ImageOps

SUPPORTED = {'.jpg', '.jpeg', '.png', '.webp'}
SITE = 'https://hamza.am'
ROOT = Path(__file__).resolve().parents[1]


def esc(value):
    return html.escape(str(value), quote=True)


def natural(name):
    return [(0, int(part)) if part.isdigit() else (1, part.casefold())
            for part in re.split(r'(\d+)', name)]


def read_text(path):
    return path.read_text(encoding='utf-8-sig')


def shared(root):
    source = read_text(root / 'photography.html')
    home = read_text(root / 'index.html')
    nav = re.search(r'<nav class="nav".*?</nav>', source, re.S).group()
    footer = re.search(r'<footer class="footer".*?</footer>', home, re.S).group()
    def absolute(match):
        attr, url = match.groups()
        if url.startswith('#'):
            url = '/index.html' + url
        elif not url.startswith(('/', 'https:', 'http:', 'mailto:', 'tel:')):
            url = '/' + url
        return f'{attr}="{url}"'
    return tuple(re.sub(r'(href|src)="([^"]+)"', absolute, block)
                 for block in (nav, footer))


def load_collections(root, preview=False):
    items = []
    content = root / 'content/photography/collections'
    if not content.exists():
        return items
    for folder in sorted(content.iterdir(), key=lambda p: natural(p.name)):
        if not folder.is_dir() or not (folder / 'collection.json').exists():
            continue
        if folder.is_symlink() or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', folder.name):
            raise ValueError(f'Invalid collection folder: {folder.name}')
        data = json.loads(read_text(folder / 'collection.json'))
        if not isinstance(data, dict):
            raise ValueError(f'{folder.name}: collection.json must be an object')
        for flag in ('published', 'featured'):
            if flag in data and type(data[flag]) is not bool:
                raise ValueError(f'{folder.name}: {flag} must be true or false')
        if not data.get('published', False) and not preview:
            continue
        for field in ('title', 'description'):
            if not isinstance(data.get(field), str) or not data[field].strip():
                raise ValueError(f'{folder.name}: supply {field}')
        images = sorted((p for p in folder.iterdir() if p.suffix.lower() in SUPPORTED),
                        key=lambda p: (natural(p.name), p.name))
        if any(p.is_symlink() or not p.is_file() for p in images):
            raise ValueError(f'{folder.name}: images must be regular files')
        if not images and data.get('published'):
            raise ValueError(f'{folder.name}: published collections need at least one photograph')
        metadata = data.get('images', {})
        if not isinstance(metadata, dict) or any(not isinstance(v, dict) for v in metadata.values()):
            raise ValueError(f'{folder.name}: images metadata must contain objects')
        cover = data.get('coverImage') or (images[0].name if images else None)
        if images and cover not in [p.name for p in images]:
            raise ValueError(f'{folder.name}: coverImage does not match a photograph')
        data.update(slug=folder.name, files=images, cover=cover)
        items.append(data)
    return sorted(items, key=lambda d: (d.get('order', 0), natural(d['slug'])))


def export_photo(source, output, slug, number):
    target = output / 'images/photography/collections' / slug
    target.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        if getattr(raw, 'n_frames', 1) != 1:
            raise ValueError(f'Animated images are unsupported: {source.name}')
        oriented = ImageOps.exif_transpose(raw)
        # Convert embedded profiles for predictable browser color, then strip metadata.
        if raw.info.get('icc_profile'):
            from PIL import ImageCms
            import io
            oriented = ImageCms.profileToProfile(oriented, ImageCms.ImageCmsProfile(
                io.BytesIO(raw.info['icc_profile'])), ImageCms.createProfile('sRGB'), outputMode='RGB')
        elif oriented.mode not in ('RGB', 'RGBA'):
            oriented = oriented.convert('RGB')
        width, height = oriented.size
        widths = sorted({min(width, size) for size in (640, 1280, 1920)})
        variants = []
        for size in widths:
            image = oriented.copy()
            image.thumbnail((size, max(1, round(height * size / width))), Image.Resampling.LANCZOS)
            filename = f'{number:03d}-{image.width}.webp'
            image.save(target / filename, 'WEBP', quality=88, method=6)
            variants.append((f'/images/photography/collections/{quote(slug)}/{filename}', image.width))
        return {'src': variants[-1][0], 'srcset': ', '.join(f'{u} {w}w' for u, w in variants),
                'width': min(width, 1920), 'height': round(height * min(width, 1920) / width)}


def image_tag(photo, alt, first=False, card=False):
    sizes = '(max-width: 700px) 90vw, 44vw' if card else '(max-width: 1280px) 90vw, 1152px'
    return (f'<img src="{esc(photo["src"])}" srcset="{esc(photo["srcset"])}" sizes="{sizes}" '
            f'width="{photo["width"]}" height="{photo["height"]}" alt="{esc(alt)}" '
            f'loading="{"eager" if first else "lazy"}" decoding="async"'
            + (' fetchpriority="high"' if first else '') + '>')


def caption(meta):
    bits = []
    if meta.get('title'):
        bits.append(f'<strong>{esc(meta["title"])}</strong>')
    details = [str(meta[k]) for k in ('location', 'date') if meta.get(k)]
    if details:
        bits.append('<p>' + esc(' · '.join(details)) + '</p>')
    if meta.get('description'):
        bits.append(f'<p>{esc(meta["description"])}</p>')
    return '<figcaption>' + ''.join(bits) + '</figcaption>' if bits else ''


def render(template, nav, footer, title, description, body, path, photo=None, draft=False):
    seo = '<meta name="robots" content="noindex,nofollow">' if draft else f'<link rel="canonical" href="{SITE}{path}">'
    seo += (f'<meta property="og:type" content="website"><meta property="og:title" content="{esc(title)}">'
            f'<meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{SITE}{path}">'
            '<meta name="twitter:card" content="summary_large_image">')
    if photo:
        seo += f'<meta property="og:image" content="{SITE}{esc(photo["src"])}">'
    return Template(template).substitute(page_title=esc(title + ' — Hamza AM'), description=esc(description),
                                         seo=seo, nav=nav, footer=footer, body=body)


def card(data, featured=False):
    cover = data['photos'][data['cover']]
    if featured:
        return (f'<a class="ph-proj-card ph-collection-card" href="/photography/collections/{data["slug"]}/">'
                + image_tag(cover, data['title'], card=True)
                + f'<p class="ph-proj-card__meta">{esc(data.get("category", "Photography"))}</p>'
                + f'<h2 class="ph-proj-card__title">{esc(data["title"])}</h2>'
                + '<span class="ph-proj-card__cta">View collection →</span></a>')
    return (f'<a class="collection-card" href="/photography/collections/{data["slug"]}/">'
            + image_tag(cover, data['title'], card=True)
            + f'<h2>{esc(data["title"])}</h2><p>{esc(data.get("category", "Photography"))}</p></a>')


def generate(root, output, preview):
    collections = load_collections(root, preview)
    # Copy existing public site only. Never expose source masters or editorial metadata.
    for source in root.iterdir():
        if source.is_file() and (source.suffix.lower() in {'.html', '.ico', '.svg', '.xml', '.webmanifest'}
                                or source.name in {'_headers', '_redirects', 'robots.txt'}):
            shutil.copy2(source, output / source.name)
    for name in ('css', 'js', 'images', 'photography'):
        source = root / name
        if source.exists():
            shutil.copytree(source, output / name)
    template = read_text(root / 'templates/collection.html')
    nav, footer = shared(root)
    published = [c for c in collections if c.get('published')]
    for data in collections:
        data['photos'] = {p.name: export_photo(p, output, data['slug'], n)
                          for n, p in enumerate(data['files'], 1)}
        pieces = ['<header class="collection-intro"><a class="collection-back" href="/photography.html">← All photography</a>',
                  f'<p class="collection-category">{esc(data.get("category", "Photography"))}</p>',
                  f'<h1>{esc(data["title"])}</h1>']
        if data.get('subtitle'):
            pieces.append(f'<p class="collection-subtitle">{esc(data["subtitle"])}</p>')
        pieces.append(f'<p class="collection-description">{esc(data["description"])}</p>')
        info = [str(data[k]) for k in ('location', 'year') if data.get(k)]
        if info:
            pieces.append(f'<p class="collection-meta">{esc(" · ".join(info))}</p>')
        pieces.append('</header>')
        if not data.get('published'):
            pieces.append('<p class="collection-draft">Local editorial preview — not published. '
                          + ('Photographs have not been supplied yet.' if not data['files'] else 'Draft collection.') + '</p>')
        if data['files']:
            pieces.append('<div class="collection-gallery">')
            for n, source in enumerate(data['files']):
                meta = data.get('images', {}).get(source.name, {})
                alt = meta.get('alt') or meta.get('title') or f'{data["title"]} — photograph {n + 1}'
                pieces.append('<figure class="collection-photo">' + image_tag(data['photos'][source.name], alt, n == 0)
                              + caption(meta) + '</figure>')
            pieces.append('</div>')
        pieces.append('<nav class="collection-nav" aria-label="Collection navigation"><a href="/photography.html">← Back to All Photography</a>')
        if data in published:
            index = published.index(data)
            for offset, label in ((-1, 'Previous collection'), (1, 'Next collection')):
                if 0 <= index + offset < len(published):
                    other = published[index + offset]
                    pieces.append(f'<a href="/photography/collections/{other["slug"]}/">{label}<span>{esc(other["title"])}</span></a>')
        pieces.append('</nav>')
        directory = output / 'photography/collections' / data['slug']
        directory.mkdir(parents=True, exist_ok=True)
        (directory / 'index.html').write_text(render(template, nav, footer, data['title'], data['description'],
            ''.join(pieces), f'/photography/collections/{data["slug"]}/', data['photos'].get(data['cover']),
            draft=not data.get('published')), encoding='utf-8')
    index_body = ('<header class="collection-intro"><a class="collection-back" href="/photography.html">← All photography</a>'
                  '<p class="collection-category">Photography</p><h1>Collections</h1></header>')
    index_body += '<div class="collection-index-grid">' + ''.join(card(c) for c in published) + '</div>'
    if not published:
        index_body += '<p class="collection-description">New photographic collections are being prepared.</p>'
    index_body += '<nav class="collection-nav"><a href="/photography.html">← Back to All Photography</a></nav>'
    directory = output / 'photography/collections'
    directory.mkdir(parents=True, exist_ok=True)
    (directory / 'index.html').write_text(render(template, nav, footer, 'Photography Collections',
        'Photographic collections by Hamza AM.', index_body, '/photography/collections/'), encoding='utf-8')
    source = read_text(root / 'photography.html')
    for marker in ('<!-- COLLECTION_FEATURES -->', '<!-- COLLECTION_ARCHIVE -->'):
        if source.count(marker) != 1:
            raise ValueError('Missing or duplicated collection integration marker')
    source = source.replace('<!-- COLLECTION_FEATURES -->', ''.join(card(c, True) for c in published if c.get('featured')))
    archive = ''
    if published:
        archive = ('<h2 class="ph-archive__title" id="archive-title">Photography collections</h2>'
                   '<p class="ph-archive__message"><a href="/photography/collections/">Explore all collections →</a></p>')
        source = source.replace('Full archive coming soon', '<a href="/photography/collections/">View collections →</a>')
    else:
        archive = ('<h2 class="ph-archive__title" id="archive-title">Coming soon.</h2>'
                   '<p class="ph-archive__message">I’m preparing more of my photography to share here. Explore the featured projects above while the full collection takes shape.</p>')
    source = source.replace('<!-- COLLECTION_ARCHIVE -->', archive)
    (output / 'photography.html').write_text(source, encoding='utf-8')
    return len(published), len(collections)


def build(root=ROOT, preview=False):
    root = Path(root).resolve()
    destination = root / ('preview-dist' if preview else 'dist')
    if destination.resolve().parent != root:
        raise ValueError('Build destination must stay inside the repository')
    if destination.is_symlink():
        raise ValueError('Build destination must not be a symlink')
    # Build in staging; a failed build never overwrites the last successful output.
    with tempfile.TemporaryDirectory(prefix='.collection-build-', dir=root) as temp:
        count, total = generate(root, Path(temp), preview)
        if destination.exists():
            shutil.rmtree(destination)
        shutil.copytree(temp, destination)
    print(f'Built {count} published collections ({total} including local drafts) into {destination.name}')
    return destination


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--preview', action='store_true', help='Local only: include unpublished editorial previews')
    args = parser.parse_args()
    build(preview=args.preview)
