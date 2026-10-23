import { RenderMode, ServerRoute } from '@angular/ssr';
import { AXES } from './core/data/axes.data';

/** Pages pré-rendues au build ; les URL inconnues sont rendues par le serveur (page 404). */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'le-pole', renderMode: RenderMode.Prerender },
  { path: 'axes', renderMode: RenderMode.Prerender },
  { path: 'actualites', renderMode: RenderMode.Prerender },
  {
    path: 'axes/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => AXES.map((a) => ({ slug: a.slug })),
  },
  { path: 'chercheurs', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
