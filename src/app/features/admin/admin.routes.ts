import { Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'connexion',
    title: 'Connexion · Espace membres',
    loadComponent: () => import('./connexion').then((m) => m.Connexion),
  },
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () => import('./admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'actualites' },
      {
        path: 'actualites',
        title: 'Actualités · Espace membres',
        loadComponent: () => import('./actualites-admin').then((m) => m.ActualitesAdmin),
      },
      {
        path: 'chercheurs',
        title: 'Chercheurs · Espace membres',
        loadComponent: () => import('./chercheurs-admin').then((m) => m.ChercheursAdmin),
      },
      {
        path: 'axes',
        title: 'Axes de recherche · Espace membres',
        loadComponent: () => import('./axes-admin').then((m) => m.AxesAdmin),
      },
    ],
  },
];
