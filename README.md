# hamzaam.com — Personal Brand Site

React 19 + Tailwind 4 + Vite static site for [hamzaam.com](https://hamzaam.com).

## Stack

- **React 19** with TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Vite** (dev server + build)
- **Wouter** (client-side routing)
- **Framer Motion** (animations)
- **pnpm** (package manager)

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Project Structure

```
client/
  src/
    pages/
      Home.tsx          ← Homepage (hero, companies, about, work, photography, footer)
      About.tsx         ← About page
      REPhotography.tsx ← Real estate photography portfolio
      Travelogue.tsx    ← Travel photo journal
      Merch.tsx         ← Statements merch (links to shop.hamzaam.com)
    components/
      Navigation.tsx    ← Top nav bar
      Footer.tsx        ← Site footer
    index.css           ← Global styles + design tokens
  index.html            ← Google Fonts loaded here
```

---

## Images — Replace These

All images are currently served from `/manus-storage/...` URLs which only work on Manus hosting.

**For self-hosting on GitHub Pages / Vercel / Netlify / your own server:**

1. Add your images to `client/public/images/`
2. Reference them as `/images/your-photo.jpg` in the code

### Images to Replace in `client/src/pages/Home.tsx`

| Constant | Current placeholder | What it should be |
|---|---|---|
| `HERO_IMG` | Stock dark portrait | Hamza's actual moody/professional portrait |
| `REALTY_IMG` | Luxury interior | Real estate listing photo |
| `CYBER_IMG` | Circuit board | P² Cyber Solutions branded image |
| `HOODIE_IMG` | B&W portrait | Statements hoodie / product photo |
| `WRITING_IMG` | Writing at desk | Hamza writing or working |
| `SKYLINE_IMG` | NYC skyline | NYC skyline or personal travel photo |
| `HOUSE_IMG` | House exterior | Actual listing photo |
| `BOOK_IMG` | Book cover | "Chapters of Growth" book cover |
| `STREET_IMG` | Street at night | Personal photography work |
| `BRIDGE_IMG` | Brooklyn Bridge | Brooklyn Bridge or personal photo |

### Quick swap example

```tsx
// Before (Manus storage):
const HERO_IMG = "/manus-storage/hero_man_dark_e068b48c.jpg";

// After (self-hosted):
const HERO_IMG = "/images/hamza-hero.jpg";
```

---

## Design System

| Token | Value |
|---|---|
| Gold accent | `#C8A96E` |
| Black | `#0D0D0D` |
| Dark section | `#111111` |
| White | `#FFFFFF` |
| Off-white | `#F8F6F2` |
| Border | `#E5E5E5` |

**Fonts** (loaded via Google Fonts in `client/index.html`):
- `Barlow Condensed` — nav, labels, buttons
- `DM Sans` — headlines, body
- `Playfair Display` — signature (italic)
- `Space Mono` — small caps metadata labels

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/re-photography` | RE Photography |
| `/travelogue` | Travelogue |
| `/merch` | Merch (redirects to shop.hamzaam.com) |

---

## Deploying to GitHub Pages

```bash
# Install gh-pages
pnpm add -D gh-pages

# Add to package.json scripts:
# "deploy": "pnpm build && gh-pages -d dist/public"

pnpm deploy
```

For **Vercel** or **Netlify**, just connect the repo — both auto-detect Vite and build with `pnpm build`, output dir `dist/public`.

---

## Sub-brands

| Brand | URL |
|---|---|
| Real Estate | [realty.hamzaam.com](https://realty.hamzaam.com) |
| Statements Merch | [shop.hamzaam.com](https://shop.hamzaam.com) |
