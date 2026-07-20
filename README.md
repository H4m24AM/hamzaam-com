# Hamza AM — Website Source Code

Pure HTML / CSS / JavaScript. No build step required. Push to GitHub, deploy anywhere.

---

## File Structure

```
hamzaam-html/
├── index.html          ← Homepage
├── about.html          ← About page
├── companies.html      ← Companies (Realty, P² Cyber, Statements)
├── photography.html    ← RE Photography + Travel gallery
├── travelogue.html     ← Travelogue photo journal
├── projects.html       ← Projects / portfolio with filter
├── contact.html        ← Contact form
├── css/
│   └── style.css       ← All styles (design tokens, components, pages)
├── js/
│   ├── main.js         ← Nav toggle, carousel, scroll animations
│   └── components.js   ← Shared nav + footer injected on every page
└── images/             ← ADD YOUR IMAGES HERE (see list below)
```

---

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → Create a project → Connect to Git
3. Build settings:
   - **Build command:** *(leave blank — no build needed)*
   - **Build output directory:** `/` (root)
4. Click **Save and Deploy**
5. Connect `hamzaam.com` under **Custom Domains**

---

## Images to Add

Place your images in the `images/` folder. Name them exactly as listed below,
or update the `src` / `background-image` references in the HTML files.

| Filename | Used On | What It Should Be |
|---|---|---|
| `hero.jpg` | Homepage hero | Dark, moody portrait of Hamza — seated, professional |
| `card-realty.jpg` | Companies grid | Luxury NYC real estate interior |
| `card-cyber.jpg` | Companies grid | Dark server room or circuit board |
| `card-statements.jpg` | Companies grid | Statements hoodie or apparel product shot |
| `who-writing.jpg` | Who I Am section | Hamza writing or working at a desk |
| `who-skyline.jpg` | Who I Am section | NYC skyline or personal travel photo |
| `work-realty.jpg` | Recent Work | Real estate listing photo |
| `work-statements.jpg` | Recent Work | Statements product / drop photo |
| `work-cyber.jpg` | Recent Work | Cybersecurity / tech abstract |
| `work-book.jpg` | Recent Work | "Chapters of Growth" book cover |
| `work-photo.jpg` | Recent Work | Street or personal photography |
| `photography.jpg` | Photography split | Brooklyn Bridge or dramatic landscape |
| `about-bg.jpg` | About hero | Dark architectural or cityscape |
| `about-portrait.jpg` | About bio | Hamza portrait — B&W preferred |
| `re-photography-hero.jpg` | Photography hero | Dramatic real estate or skyline shot |
| `re-1.jpg` … `re-6.jpg` | RE gallery | Property interior/exterior photos |
| `travel-1.jpg` … `travel-8.jpg` | Travelogue | Travel photos with location labels |
| `travelogue-hero.jpg` | Travelogue hero | Dramatic travel landscape |
| `companies-hero.jpg` | Companies hero | Cityscape or business environment |
| `projects-hero.jpg` | Projects hero | Dark abstract or workspace |

---

## Links to Update

Search for these placeholders and replace with real values:

| Placeholder | File | Replace With |
|---|---|---|
| `YOUR-EMAIL` | `contact.html`, `js/components.js` | `hello@hamzaam.com` |
| `YOUR-INSTAGRAM-URL` | `contact.html`, `js/components.js` | `https://instagram.com/yourhandle` |
| `YOUR-LINKEDIN-URL` | `contact.html`, `js/components.js` | `https://linkedin.com/in/yourprofile` |
| `href="#"` | Various | Real page URLs once content is ready |

---

## Contact Form

The contact form in `contact.html` currently shows a success message on submit.
To make it actually send emails, replace the `handleContactForm` function with one of:

- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `netlify` attribute to the `<form>` tag
- **[Web3Forms](https://web3forms.com)** — free, no backend needed

---

## Design Tokens

All colors and fonts are defined as CSS variables in `css/style.css` under `:root {}`.
Edit once there and all pages inherit the values.

| Token | Value | Used For |
|---|---|---|
| `--gold` | `#C8A96E` | Accents, labels, CTAs |
| `--black` | `#0D0D0D` | Backgrounds, text |
| `--dark` | `#111111` | Dark sections |
| `--white` | `#FFFFFF` | Light sections |
| `--offwhite` | `#F8F6F2` | Card backgrounds |

**Fonts:** Barlow Condensed · DM Sans · Playfair Display · Space Mono (Google Fonts, loaded in `style.css`)
