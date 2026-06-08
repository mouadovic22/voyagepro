# VoyagesPro — Project Memory for Claude Code

## What this project is

Single-page React travel planner at **voyagespro.fr**. Users pick a destination + origin + dates + budget → get a personalized day-by-day itinerary with hotels, restaurants, attractions, map, and PDF export. 65 destinations worldwide. No backend, no auth, 100% static.

## Tech stack

- **React 18 + Vite 4** — entire app is `src/App.jsx` (2400+ lines) + `src/main.jsx`
- **GitHub Actions** → builds `npm run build` → deploys `dist/` to **GitHub Pages**
- **Custom domain**: `voyagespro.fr` (CNAME in `public/CNAME`)
- **Capacitor** — Android APK build configured (separate workflow, currently failing — not critical)

## Architecture: single file

All logic, data, and UI is in **`src/App.jsx`**. No component files, no separate data files.

Key sections in order:
1. `BASE` / `IMG(id)` — Wikimedia Commons direct thumbnail URLs for 65 destination photos (MD5-computed paths)
2. `WIKI_TITLES` — overrides for Wikipedia article titles per destination
3. `_imgCache` / `_saveImgCache` — localStorage cache for all image URLs
4. `fetchWikiImage(id, name, width)` — Wikipedia REST API image fetcher with localStorage cache
5. `wikiError` — img `onError` handler that falls back to Wikipedia API
6. `getFoodWikiTitle(type)` — maps French cuisine type string → Wikipedia article title
7. `getFoodEmoji(type)` — maps cuisine type → emoji
8. `DESTINATIONS[]` — 65 entries with id, name, country, flag, emoji, temp, currency, mapCenter, continent, photo
9. `WIKI_TITLES{}` — destination id → Wikipedia article title for hero images
10. `LANG{}` — translations for FR / EN / AR
11. `STEP1{}` / `THEMES{}` / `BUDGET_LABELS{}` — theme tokens
12. `getDestData(dest)` — returns full data object for a destination (hotels, restaurants, attractions, transport, itinerary)
13. React component with states, useEffects, JSX

## Image loading strategy

### Destination cards (heroImgs)
- **Primary**: `IMG(id)` = hardcoded Wikimedia Commons direct URL (instant, computed via MD5)
- **Loaded async**: Wikipedia API `/api/rest_v1/page/summary/{title}` → cached in localStorage
- **Key**: `{id}_600` in localStorage (`vp_imgs`)

### Attraction cards
- **Source**: `heroImgs[destination.id] || destination.photo` = the city's own photo (already loaded)
- **Fallback**: `picsum.photos/seed/{attractionName}/600/400` via `onError`
- Dark overlay + name/type/duration text on top

### Restaurant cards
- **Primary**: `foodTypeImgs[getFoodWikiTitle(r.type)]` = Wikipedia API food article thumbnail
- **State**: `foodTypeImgs` seeded from localStorage on mount (key pattern: `food_{title}_400`)
- **Immediate fallback**: `picsum.photos/seed/{foodTitle}/600/400` (never blank on first visit)
- **onError fallback**: `picsum.photos/seed/{restaurantName}/600/400`
- Food images fetched on step 3 mount via `useEffect([step, destination])`

### Hotel cards
- **Source**: `heroImgs[destination.id] || destination.photo` = city photo (dark overlay)
- **Fallback**: `picsum.photos/seed/hotel-{name}/600/400` via `onError`

## Themes

- **Dark mode** (default): deep navy `#0A1426`, purple accents `#8B5CF6`, gold `#D4A574`
- **Light mode**: warm cream `#FFF8F0`, purple accents
- Toggle: `theme` state → `isLight = theme === "light"`
- Step 1 uses `ST = STEP1[theme]` tokens
- Steps 2 & 3 use `S2` object (computed from `isLight`)

## Languages

FR / EN / AR — `lang` state, `T = LANG[lang]`, `isRTL = lang === "ar"`

## Steps

- **Step 1**: Landing page with hero carousel, destination cards, search, guides, FAQ, about
- **Step 2**: Destination selection / confirmation  
- **Step 3**: Full itinerary view with tabs: Attractions | Restaurants | Itinéraire | Carte | Transport | Hébergements

## Budget tiers

`serré` (budget) / `moyen` (mid) / `riche` (luxury) — affects hotel/restaurant/attraction display and price info

## Affiliate / booking links

`BOOK` object contains link generators for:
- Booking.com, Airbnb, Hotels.com
- Google Flights, Skyscanner, Kayak
- GetYourGuide, TheFork, TripAdvisor
- Google Maps

## Monetization

- **Google AdSense**: `ca-pub-4784252483646348` — script in `index.html` `<head>`
- **ads.txt**: `public/ads.txt` → `google.com, pub-4784252483646348, DIRECT, f08c47fec0942fa0`
- **CJ Affiliate**: publisher ID `7982811`

## SEO

- Full structured data in `index.html`: WebSite, WebApplication, Organization, ItemList, FAQPage
- Google Search Console verification: `kI4X7q0ym0JfievbhwK29UoL6TYhnVdOubxUqzs_ZaQ`
- `<noscript>` block with full static HTML content (all 65 destinations) for crawlers
- `public/sitemap.xml` and `public/robots.txt`

## Deployment

```yaml
# .github/workflows/deploy.yml
on: push to main
steps: npm ci → npm run build → upload dist/ → deploy to GitHub Pages
```

**Important**: `dist/` is in `.gitignore`. GitHub Actions always rebuilds from source. Never commit `dist/` manually (except `index.html` which is outside dist).

## Key rules for future edits

1. **All changes go in `src/App.jsx`** — no new component files needed
2. **After every change**: run `npm run build` to verify no errors before committing
3. **Push to `main`** to trigger automatic deployment to voyagespro.fr
4. **Wikimedia Commons URLs** must use exact MD5-computed paths — use Node.js to compute:
   ```js
   const h = require('crypto').createHash('md5').update('filename.jpg').digest('hex');
   const url = BASE + h[0] + '/' + h[0]+h[1] + '/' + 'filename.jpg' + '/600px-filename.jpg';
   ```
5. **Avoid filenames with commas/special chars** in Wikimedia URLs — they fail in the CDN
6. **picsum.photos** is the guaranteed last-resort fallback for all images — always add `onError` handlers
7. **Never remove the `<noscript>` block** in `index.html` — it's critical for SEO
8. **Never remove the AdSense script** from `index.html`

## Common pitfalls

- Wikimedia Commons filenames with commas (e.g. `Ramen,_Tokyo.jpg`) → URL encoding issues → image fails
- `CUISINE_PHOTO` was deleted — do not reference it
- `extraImgs` state still exists but hotel Wikipedia lookup was removed — hotels use destination photo now
- `foodTypeImgs` is keyed by **Wikipedia article title** (e.g. `"Pizza"`), not by `r.type` string

## Owner

- Email: mouad.ouhaddou@gmail.com
- Domain: voyagespro.fr
- GitHub: mouadovic22/voyagepro
