# Pôle Forêt-Bois-Matériaux — site web

Application Angular 20 du pôle de recherche conjoint IRAF-IRT (CENAREST).
Même architecture que le site IRAF : composants standalone, état en NgRx Signals,
routes chargées à la demande (lazy loading), rendu serveur (SSR) avec pré-rendu des pages.

## Démarrer

```bash
npm install
npm start                 # développement : http://localhost:4200
npm run build             # production SSR + pages pré-rendues dans dist/pole-foret-bois
npm run serve:ssr:pole-foret-bois   # sert la version de production (port 4000)
```

Aperçu statique sans serveur (routage par `#/`, pour un hébergement simple) :

```bash
npx ng build --configuration apercu   # sortie : dist/apercu/browser
```

## Organisation du code

```
src/app/
  app.ts, app.config.ts, app.routes.ts      coquille, configuration, routes (lazy)
  app.routes.server.ts                      pages pré-rendues (dont les 5 axes)
  core/
    models/pole.models.ts                   types AxeRecherche, Chercheur
    data/axes.data.ts                       contenu des 5 axes de recherche
    data/chercheurs.data.ts                 équipe (fiches à compléter)
    services/pole-data.service.ts           accès aux données (point de branchement API)
    store/pole.store.ts                     NgRx signalStore : axes, chercheurs, filtres
  layout/entete.ts                          en-tête, menu déroulant « Axes de recherche »
  layout/pied-de-page.ts
  shared/                                   logo, coupe de cernes (canvas), cartes axe / chercheur
  features/
    accueil/  pole/  contact/  introuvable/
    axes/     axes.ts (vue d'ensemble), axe-detail.ts (/axes/:slug), axes.routes.ts
    chercheurs/chercheurs.ts                annuaire filtrable (?secteur=slug) + recherche
```

## Mettre à jour le contenu

- **Chercheurs** : éditer `core/data/chercheurs.data.ts`. Renseigner `nom`, `titre`,
  `specialites`, puis passer `aCompleter` à `false`. `secteurs` contient les slugs d'axes :
  `foret-bois`, `structure-du-bois`, `preservation-du-bois`, `lignine-et-cellulose`,
  `materiaux-biosources`.
- **Axes** : éditer `core/data/axes.data.ts`. Un nouvel axe apparaît automatiquement dans le
  menu, l'accueil, l'annuaire et le pré-rendu.
- **Brancher une API ou un CMS** : remplacer les `of(...)` de `pole-data.service.ts` par des
  appels `HttpClient` (ajouter `provideHttpClient(withFetch())` dans `app.config.ts`).
  Le store et les pages ne changent pas.

## Charte

Variables CSS dans `src/styles.scss` : vert (forêt), bleu (science et technologie),
marron (bois), avec un thème clair et un thème sombre automatiques.
Polices : Bricolage Grotesque (titres), Literata (texte), IBM Plex Mono (données).

Note : l'intégration des polices Google au build est désactivée
(`optimization.fonts.inline: false` dans `angular.json`) ; la réactiver si le serveur de
build a accès à Internet.
