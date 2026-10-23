import { Routes } from '@angular/router';

/** Toutes les pages sont chargées à la demande (lazy loading). */
export const routes: Routes = [
  {
    path: '',
    title: 'Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/accueil/accueil').then((m) => m.Accueil),
  },
  {
    path: 'le-pole',
    title: 'Le pôle · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/pole/pole').then((m) => m.Pole),
  },
  {
    path: 'axes',
    loadChildren: () => import('./features/axes/axes.routes').then((m) => m.AXES_ROUTES),
  },
  {
    path: 'actualites',
    title: 'Actualités · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/actualites/actualites').then((m) => m.Actualites),
  },
  {
    path: 'chercheurs',
    title: 'Chercheurs · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/chercheurs/chercheurs').then((m) => m.Chercheurs),
  },
  {
    path: 'contact',
    title: 'Contact · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    title: 'Page introuvable · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./features/introuvable/introuvable').then((m) => m.Introuvable),
  },
];
