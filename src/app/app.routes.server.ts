import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Pages pré-rendues au build (contenu fixe, sans dépendance à Firestore) ; pages dont le
 * contenu vient de Firestore (donc modifiable depuis l'espace membres) rendues côté
 * client, pour rester compatibles aussi bien avec le serveur SSR qu'avec l'aperçu
 * statique sans serveur (`ng build --configuration apercu`). Les URL inconnues sont
 * rendues par le serveur (page 404) en mode SSR.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'le-pole', renderMode: RenderMode.Prerender },
  { path: 'axes', renderMode: RenderMode.Client },
  { path: 'axes/:slug', renderMode: RenderMode.Client },
  { path: 'actualites', renderMode: RenderMode.Client },
  { path: 'chercheurs', renderMode: RenderMode.Client },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
