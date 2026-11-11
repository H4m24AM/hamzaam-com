# Real Estate Photography — adding property photos

This folder contains the portfolio at `/photography/real-estate/` and its individual project galleries. The site uses HTML and CSS; there is no image uploader or content management system. Upload photos to this GitHub repository, then update the image paths in the HTML files.

## Which files to edit

Paths below start at the repository root.

| File | Purpose |
| --- | --- |
| `photography/real-estate/index.html` | Project cards, cover photographs, names, and locations |
| `photography/real-estate/townhouse/index.html` | Brooklyn Townhouse sample gallery |
| `photography/real-estate/loft/index.html` | City Loft sample gallery |
| `photography/real-estate/workspace/index.html` | Creative Workspace sample gallery |
| `photography/real-estate/residence/index.html` | Garden Residence sample gallery |
| `css/real-estate.css` | Portfolio layout and styling |
| `photography.html` | Main Photography page and its real estate CTA/card |

Each sample gallery currently has one hero image and six gallery images. You can add or remove gallery images as needed. All images initially use `/images/real-estate-placeholder.svg`; replace each occurrence individually with the photograph for that position. Do not overwrite the shared placeholder file to upload a photograph.

## 1. Prepare the photographs

- Use approved photographs you have permission to publish.
- Export as JPG or WebP in sRGB. Keep the original aspect ratio.
- A useful starting point is 2,000–2,400 pixels on the long edge for hero photos and 1,400–1,800 pixels for gallery photos. Compress exports while checking that architectural details remain clear; aim for about 200–600 KB per image when practical.
- Use lowercase filenames with hyphens, for example `townhouse-living-room.jpg`. Avoid spaces. File paths and capitalization must match exactly.
- Keep full-resolution originals outside this website repository. Upload the web exports.

Suggested folder structure (create these folders when uploading):

```text
images/real-estate/
  townhouse/
    cover.jpg
    hero.jpg
    living-room.jpg
    kitchen.jpg
    exterior.jpg
  loft/
    cover.jpg
    hero.jpg
```

## 2. Upload through GitHub

1. Open [the repository](https://github.com/H4m24AM/hamzaam-com).
2. Create a branch from `main`, for example `content/townhouse-photos`. This keeps the update reviewable before publishing.
3. Open the `images` folder and choose **Add file → Upload files**. Drag in a folder named `real-estate` containing your property folders and exported photos. For an existing property folder, open that folder and upload the new photos there instead.
4. Check the destination paths in GitHub before committing. For the example above, the cover must appear at `images/real-estate/townhouse/cover.jpg`.
5. Commit the uploaded files to your content branch. Stay on that same branch for the HTML edits below.

Uploading alone does **not** put photographs on the page. The HTML must point to the new files.

## 3. Replace the portfolio cover

Open `photography/real-estate/index.html` on your branch and select the pencil/edit button. Find the project card by its title, then replace the image inside that card. Example:

```html
<figure class="re-photo">
  <img
    src="/images/real-estate/townhouse/cover.jpg"
    alt="Front entrance of a Brooklyn townhouse"
    width="1600"
    height="1067"
    loading="lazy"
  >
</figure>
```

Use the actual exported image's pixel dimensions for `width` and `height`; the values above are only an example. The starting `/` in `src` means the path begins at the website root.

For this card:

- Replace the sample title and `Location to be confirmed` with approved details.
- Change `Residential · Sample project` or `Commercial · Sample project` to the appropriate category.
- Remove the placeholder `<figcaption>` after installing the real photograph. Keep a caption only if you want visitors to see it.
- Remove `re-photo--warm` from the figure if present. That class adds a sepia treatment intended for the sample illustrations.
- Keep the card's project link pointing to the corresponding gallery.

Keep the collection's preview notice while any sample projects remain. Remove or revise it once the whole collection contains approved real projects.

## 4. Replace the project hero and gallery photos

Open the corresponding project `index.html`, for example `photography/real-estate/townhouse/index.html`.

Replace the image in the `re-photo--hero` figure:

```html
<figure class="re-photo re-photo--hero">
  <img
    src="/images/real-estate/townhouse/hero.jpg"
    alt="Living room with large windows overlooking the garden"
    width="2400"
    height="1600"
    loading="eager"
    fetchpriority="high"
  >
</figure>
```

Replace each figure inside `<div class="re-gallery">` with its own photograph. For example:

```html
<figure class="re-photo">
  <img
    src="/images/real-estate/townhouse/kitchen.jpg"
    alt="Kitchen with oak cabinetry and a marble island"
    width="1600"
    height="1067"
    loading="lazy"
  >
</figure>
```

Again, use each image's actual dimensions and write an accurate description in `alt`. The default image styling preserves natural proportions. The `re-photo--portrait` modifier currently also preserves natural proportions; it is optional. Remove `re-photo--warm` to avoid tinting your photographs.

To add a photo, copy a complete `<figure>...</figure>` block **inside** `re-gallery` and update its image path, dimensions, and description. To remove a photo, remove its complete figure block. Keep the opening and closing gallery `<div>` tags.

Update the project title in `<title>` and `<h1>`, location, category, and photo-collection `aria-label`. Remove the project's sample notice and placeholder captions only after that project is fully populated. If you rename a project, also update its card and the previous/next link labels on neighboring project pages. You can keep the existing folder name; changing it requires updating every link to that project.

## 5. Optional: update the main Photography card

The main page's hero button already links to `/photography/real-estate/`. To change its featured real estate cover, edit `photography.html` and find `<!-- Card 2: Real Estate & Architecture -->`.

Change the card's background image to your selected cover:

```html
style="background-image: url('/images/real-estate/townhouse/cover.jpg');"
```

## 6. Review and publish

1. Commit the HTML updates to the same branch as the images.
2. Open a pull request into `main` with a short description of the property and photos added.
3. If Cloudflare provides a branch preview, open the preview's `/photography/real-estate/` page.
4. Check the portfolio and the updated gallery on desktop and mobile: all photos load, captions and locations are correct, images retain their proportions, and previous/next links work.
5. Confirm no unintended `Photo placeholder`, `Sample project`, or `Location to be confirmed` text remains in the completed project. Leave labels on any unfinished projects.
6. Merge the reviewed pull request. The existing Cloudflare Pages integration deploys updates from `main`. Wait for its successful deployment check, then verify the live page.

The confirmed Cloudflare site is [hamzaam.pages.dev](https://hamzaam.pages.dev/photography/real-estate/). The custom-domain Photography URLs returned 404 during the latest deployment verification; verify the intended custom domain separately before sharing it.

## If a photograph does not appear

- Confirm the image was committed on the same branch as the page changes.
- Compare the HTML `src` with the actual repository path, including filename case and extension (`.jpg`, `.jpeg`, and `.webp` are different).
- Open the image directly on the same preview or live host, for example `/images/real-estate/townhouse/kitchen.jpg`. A 404 indicates a path or deployment problem.
- Confirm Cloudflare deployed the latest commit, then refresh the page.
- If an image appears tinted, remove the `re-photo--warm` class from its figure.
