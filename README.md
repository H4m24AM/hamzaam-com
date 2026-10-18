# Hamza AM — Website Source Code

Static HTML / CSS / JavaScript with a Python build step for folder-managed photography collections. See [collection instructions](content/photography/README.md).

---

## Architecture

This is a **one-page website** with two supporting subpages.

| File | Description |
|---|---|
| `index.html` | **Homepage** — all main sections in one page (Hero, Companies, Work, Photography Preview, Contact, Footer) |
| `about.html` | About subpage |
| `photography.html` | RE Photography + Travel gallery subpage |
| `css/style.css` | All styles — design tokens, components, page-specific |
| `js/main.js` | Nav toggle, scroll spy, work carousel, scroll animations |
| `images/` | Add your images here (see list below) |

---

## Navigation Behavior

| Nav Link | Behavior |
|---|---|
| **Home** | Smooth scrolls to `#home` on `index.html` |
| **Companies** | Smooth scrolls to `#companies` on `index.html` |
| **Work** | Smooth scrolls to `#work` on `index.html` |
| **Photography** | Opens `photography.html` |
| **About** | Opens `about.html` |
| **Contact** | Smooth scrolls to `#contact` on `index.html` |

On `about.html` and `photography.html`, nav links point back to `index.html#section` so smooth scroll still works when returning to the homepage.

---

## Section IDs (index.html)

| Section | ID |
|---|---|
| Hero | `#home` |
| Companies | `#companies` |
| Featured Work | `#work` |
| Photography Preview | `#photography-preview` |
| Contact | `#contact` |

---

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → Create a project → Connect to Git
3. Build settings:
   - **Build command:** `python -m pip install -r requirements.txt && python scripts/build_collections.py`
   - **Build output directory:** `dist` (set `PYTHON_VERSION=3.12`)
4. Click **Save and Deploy**
5. Connect `hamzaam.com` under **Custom Domains**

---

## Images to Add

Place your images in the `images/` folder. Name them exactly as listed, or update the `background-image: url(...)` references in the HTML/CSS.

| Filename | Used On | What It Should Be |
|---|---|---|
| `hero.jpg` | Homepage hero | Dark, moody portrait of Hamza — seated, professional |
| `card-realty.jpg` | Companies grid | Luxury NYC real estate interior |
| `card-cyber.jpg` | Companies grid | Dark server room or circuit board |
| `card-statements.jpg` | Companies grid | Statements hoodie or apparel product shot |
| `who-writing.jpg` | Who I Am section | Hamza writing or working at a desk |
| `who-skyline.jpg` | Who I Am section | NYC skyline or personal travel photo |
| `work-realty.jpg` | Featured Work | Real estate listing photo |
| `work-statements.jpg` | Featured Work | Statements product / drop photo |
| `work-cyber.jpg` | Featured Work | Cybersecurity / tech abstract |
| `work-book.jpg` | Featured Work | "Chapters of Growth" book cover |
| `work-photo.jpg` | Featured Work | Street or personal photography |
| `photography.jpg` | Photography split | Brooklyn Bridge or dramatic landscape |
| `about-bg.jpg` | About hero | Dark architectural or cityscape |
| `about-portrait.jpg` | About bio | Hamza portrait — B&W preferred |
| `re-photography-hero.jpg` | Photography page hero | Dramatic real estate or skyline shot |
| `re-1.jpg` … `re-6.jpg` | RE gallery | Property interior/exterior photos |
| `travel-1.jpg` … `travel-6.jpg` | Travel gallery | Travel photos with location labels |

---

## Links to Update

Search for these placeholders and replace with real values:

| Placeholder | Replace With |
|---|---|
| `YOUR-EMAIL` | `hello@hamzaam.com` (or your actual email) |
| `YOUR-INSTAGRAM-URL` | `https://instagram.com/yourhandle` |
| `YOUR-LINKEDIN-URL` | `https://linkedin.com/in/yourprofile` |

---

## Contact Form

The contact form in `index.html` currently shows a success message on submit.
To make it actually send emails, replace the `handleContactForm` function with one of:

- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag, remove the `onsubmit` handler
- **[Web3Forms](https://web3forms.com)** — free, no backend needed
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `netlify` attribute to the `<form>` tag (Netlify hosting only)

---

## Design Tokens

All colors and fonts are defined as CSS variables in `css/style.css` under `:root {}`.

| Token | Value | Used For |
|---|---|---|
| `--gold` | `#C8A96E` | Accents, labels, CTAs |
| `--black` | `#0D0D0D` | Dark backgrounds, body text |
| `--dark` | `#111111` | Dark sections |
| `--white` | `#FFFFFF` | Light sections |
| `--offwhite` | `#F8F6F2` | Card backgrounds |

**Fonts:** Barlow Condensed · DM Sans · Playfair Display · Space Mono (loaded from Google Fonts in `style.css`)

## Real Estate Photography portfolio

The static directory route at /photography/real-estate/ contains a two-column portfolio and four individual project galleries. Directory index hosting serves the requested /photography/real-estate path without a framework or build step. All assets and navigation use root-relative paths.

These are clearly labeled sample projects, with local architectural SVG illustrations instead of unverified property photos. Replace sample names, locations, images, alt text, and captions in the five HTML pages with approved content. Keep real gallery images at their natural proportions (remove the portrait modifier when appropriate). No category filters are included for this small preview collection. Inquiries use the existing admin@hamza.am address and link to the homepage contact section.

Validate locally with a static server that supports directory indexes. Check desktop and mobile grids, each project and previous/next navigation, keyboard focus, the mobile menu and Escape, and inquiry links before merging.

## Photography collections

Collection photos and optional metadata live under `content/photography/collections/<slug>/`. The build discovers photos, creates optimized public variants, generates pages and indexes, and adds featured published collections to Photography. See [the complete guide](content/photography/README.md) for local previews and the required one-time Cloudflare build-setting change. Do not deploy the source root or `preview-dist`.
