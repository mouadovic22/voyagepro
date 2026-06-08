# VoyagesPro ✈️

**Planificateur de voyage gratuit — 65 destinations mondiales**

> Créez votre itinéraire personnalisé jour par jour : hôtels, restaurants, attractions, carte interactive et export PDF. 100% gratuit, sans inscription.

🌐 **[voyagespro.fr](https://voyagespro.fr)**

---

## Fonctionnalités

- **65 destinations** — Europe, Asie, Maghreb, Moyen-Orient, Amériques, Océanie
- **Itinéraire jour par jour** personnalisé selon la durée et le budget
- **3 niveaux de budget** — Économique / Moyen / Premium
- **Hôtels recommandés** avec liens de réservation (Booking.com, Airbnb)
- **Restaurants locaux** avec photos réelles par type de cuisine
- **Attractions incontournables** avec prix et liens GetYourGuide
- **Carte interactive** (Leaflet / OpenStreetMap)
- **Transport** — vols, trains, bus avec comparateurs de prix
- **Export PDF** du programme complet
- **3 langues** — Français, English, العربية
- **Mode clair / sombre**
- **Responsive** — mobile, tablette, desktop

---

## Stack technique

| Outil | Usage |
|-------|-------|
| React 18 | UI |
| Vite 4 | Build |
| GitHub Actions | CI/CD |
| GitHub Pages | Hébergement |
| Wikipedia REST API | Photos destinations & restaurants |
| Leaflet | Carte interactive |
| Capacitor | Build Android APK |

---

## Structure du projet

```
voyagepro/
├── src/
│   ├── App.jsx          # Application complète (2400+ lignes)
│   └── main.jsx         # Point d'entrée React
├── public/
│   ├── CNAME            # voyagespro.fr
│   ├── ads.txt          # Google AdSense
│   ├── robots.txt
│   └── sitemap.xml
├── index.html           # SEO complet + AdSense + noscript
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml   # Build + déploiement GitHub Pages
```

---

## Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## Déploiement

Le déploiement est **automatique** à chaque push sur `main` :

```
git push origin main
# → GitHub Actions build + deploy vers voyagespro.fr (~2 min)
```

Le workflow `.github/workflows/deploy.yml` :
1. `npm ci`
2. `npm run build`
3. Upload `dist/` → GitHub Pages

---

## Destinations disponibles

| Région | Destinations |
|--------|-------------|
| 🇪🇺 Europe | Paris, Londres, Rome, Barcelone, Amsterdam, Prague, Vienne, Lisbonne, Athènes, Santorin, Berlin, Munich, Dublin, Copenhague, Stockholm, Budapest, Florence, Venise, Séville, Édimbourg, Bruxelles, Reykjavik, Varsovie, Zagreb, Sofia, Belgrade, Bucarest, Zurich, La Valette, Helsinki, Oslo |
| 🌏 Asie | Tokyo, Kyoto, Bali, Bangkok, Singapour, Hong Kong, Séoul, Pékin, Shanghai, Mumbai, New Delhi, Maldives, Phuket |
| 🌍 Maghreb & Moyen-Orient | Marrakech, Casablanca, Alger, Tunis, Le Caire, Dubaï, Abu Dhabi, Doha, Istanbul |
| 🌎 Amériques | New York, Los Angeles, Miami, Rio de Janeiro, Buenos Aires, Mexico, La Havane, Toronto, Montréal |
| 🌏 Afrique & Océanie | Nairobi, Le Cap, Sydney |

---

## Images

- **Destinations** : Wikimedia Commons (URLs directes MD5-calculées) + Wikipedia API + cache localStorage
- **Restaurants** : Wikipedia API par type de cuisine + cache localStorage
- **Attractions & hôtels** : Photo de la ville sélectionnée + fallback picsum.photos

---

## SEO & Monétisation

- Structured data JSON-LD : WebSite, WebApplication, Organization, ItemList, FAQPage
- Google AdSense : `ca-pub-4784252483646348`
- `ads.txt` : `google.com, pub-4784252483646348, DIRECT, f08c47fec0942fa0`
- Google Search Console vérifié
- Sitemap XML complet
- Contenu statique `<noscript>` pour les crawlers

---

## Licence

Projet privé — © 2026 VoyagesPro
