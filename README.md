# Pôle Forêt-Bois-Matériaux — site web

Application Angular 20 du pôle de recherche conjoint IRAF-IRT (CENAREST).
Même architecture que le site IRAF : composants standalone, état en NgRx Signals,
routes chargées à la demande (lazy loading), rendu serveur (SSR).

Le contenu (axes, chercheurs, actualités) vit dans une base Firestore : les pages
publiques le lisent (rendu serveur à chaque requête, voir `app.routes.server.ts`),
et les chercheurs du pôle le modifient depuis l'espace membres **/admin**
(connexion requise). Voir la section « Espace membres » ci-dessous pour la mise en
route — **tant que Firebase n'est pas configuré, le site fonctionne quand même**
(pages vides, connexion indisponible), aucune étape n'est bloquante pour démarrer.

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
  app.ts, app.config.ts, app.routes.ts      coquille, configuration (dont Firebase), routes (lazy)
  app.routes.server.ts                      pré-rendu / SSR par requête / client-only (/admin) par page
  core/
    models/pole.models.ts                   types AxeRecherche, Chercheur, Actualite
    data/axes.data.ts                       contenu d'exemple des 5 axes (sert à amorcer Firestore)
    data/chercheurs.data.ts                 équipe d'exemple (sert à amorcer Firestore)
    data/actualites.data.ts                 actualités d'exemple (sert à amorcer Firestore)
    services/pole-data.service.ts           lecture/écriture Firestore (axes, chercheurs, actualites)
    services/auth.service.ts                connexion / déconnexion (Firebase Authentication)
    services/stockage.service.ts            dépôt des photos de chercheurs (Firebase Storage)
    guards/admin.guard.ts                   protège /admin : redirige vers /admin/connexion
    store/pole.store.ts                     NgRx signalStore : axes, chercheurs, actualités, filtres
  layout/entete.ts                          en-tête, menu déroulant « Axes de recherche »
  layout/pied-de-page.ts                    pied de page, lien « Espace membres »
  shared/                                   logo, bandeau d'activités, coupe de cernes (canvas),
                                             cartes axe / chercheur / actualité
  features/
    accueil/  pole/  contact/  introuvable/
    axes/     axes.ts (vue d'ensemble), axe-detail.ts (/axes/:slug), axes.routes.ts
    chercheurs/chercheurs.ts                annuaire filtrable (?secteur=slug) + recherche
    actualites/actualites.ts                fil complet, filtrable par type (/actualites)
    admin/                                  espace membres (/admin, connexion requise)
      connexion.ts                          formulaire de connexion (/admin/connexion)
      admin-layout.ts                       barre + onglets de l'espace membres
      actualites-admin.ts                   liste + formulaire d'ajout/modification/suppression
      chercheurs-admin.ts                   idem pour les fiches chercheurs
      axes-admin.ts                         idem pour les axes de recherche
scripts/seed-firestore.ts                   amorce Firestore à partir des contenus d'exemple
firestore.rules                             règles de sécurité Firestore à coller dans la console
storage.rules                               règles de sécurité Storage (photos) à coller dans la console
```

## Espace membres (/admin)

Chaque chercheur du pôle dispose d'un compte pour se connecter sur `/admin` et y gérer
le contenu : actualités (ajout/modification/suppression), fiches chercheurs
(ajout/modification/suppression) et axes de recherche (ajout/modification/suppression).
Les données sont stockées dans **Firebase** (Authentication + Firestore), un service
gratuit pour ce volume. Mise en route, à faire une fois :

1. **Créer le projet** sur [console.firebase.google.com](https://console.firebase.google.com)
   (plan gratuit « Spark » suffisant) → *Ajouter une application* → icône `</>` (Web).
2. **Copier la configuration** affichée (`apiKey`, `authDomain`, `projectId`,
   `storageBucket`, `messagingSenderId`, `appId`) dans `src/environments/environment.ts`
   (et `environment.apercu.ts` si l'aperçu statique est utilisé). Ces valeurs ne sont pas
   secrètes — Firebase les documente comme publiques par conception, la sécurité vient des
   règles Firestore ci-dessous — elles peuvent donc rester dans le dépôt.
3. **Activer l'authentification** : Firebase Console → *Authentication* → *Sign-in method*
   → activer *E-mail/Mot de passe*.
4. **Créer un compte par chercheur** : *Authentication* → onglet *Users* → *Add user*
   (e-mail + mot de passe provisoire à communiquer, à changer ensuite via « Mot de passe
   oublié » — non encore câblé côté site, ou directement en Console). Reporter la même
   adresse dans le champ `email` de la fiche du chercheur (depuis `/admin/chercheurs`, ou
   dans `core/data/chercheurs.data.ts` avant le seed).
5. **Activer Firestore** : *Firestore Database* → *Créer une base de données* (mode
   production, région au choix). Puis onglet *Règles* : coller le contenu de
   `firestore.rules` (lecture publique, écriture réservée aux membres connectés) et publier.
6. **Activer Storage** (photos des chercheurs) : *Storage* → *Commencer*. Puis onglet
   *Règles* : coller le contenu de `storage.rules` (même principe : lecture publique,
   écriture réservée aux membres connectés, limitée aux images de moins de 5 Mo) et publier.
7. **Amorcer les données** une fois l'étape 2 faite : `npm run seed:firestore` (demande
   l'e-mail/mot de passe d'un compte créé à l'étape 4) importe les contenus d'exemple du
   dépôt (`core/data/*.data.ts`) dans Firestore. Les photos s'ajoutent ensuite une par une
   depuis `/admin/chercheurs` (bouton « Choisir une photo » sur la fiche de chaque membre).

Ensuite, se connecter sur `/admin/connexion` avec un des comptes créés. Tout membre
connecté peut tout modifier (actualités, chercheurs, axes), conformément au fonctionnement
collaboratif voulu pour une petite équipe.

## Mettre à jour le contenu

Le contenu se gère désormais depuis `/admin` (voir ci-dessus), pas en éditant le code.
Les fichiers `core/data/*.data.ts` ne servent plus qu'à amorcer Firestore une première fois.

- **Bandeau d'images de l'accueil** : les 6 photos viennent de `public/assets/bandeau/`.
  Pour les remplacer, déposer un fichier du même nom (ou modifier la liste `TUILES` dans
  `shared/bandeau-activites.ts` pour changer noms de fichiers/légendes/nombre de tuiles).

## Charte

Variables CSS dans `src/styles.scss` : vert (forêt), bleu (science et technologie),
marron (bois), avec un thème clair et un thème sombre automatiques.
Polices : Bricolage Grotesque (titres), Literata (texte), IBM Plex Mono (données).

Note : l'intégration des polices Google au build est désactivée
(`optimization.fonts.inline: false` dans `angular.json`) ; la réactiver si le serveur de
build a accès à Internet.
