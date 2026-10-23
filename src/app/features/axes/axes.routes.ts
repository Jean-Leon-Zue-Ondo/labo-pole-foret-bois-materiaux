import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { PoleStore } from '../../core/store/pole.store';

const titreAxe: ResolveFn<string> = (route) => {
  const axe = inject(PoleStore).axe(route.paramMap.get('slug') ?? '');
  return `${axe?.titre ?? 'Axe introuvable'} · Pôle Forêt-Bois-Matériaux`;
};

export const AXES_ROUTES: Routes = [
  {
    path: '',
    title: 'Axes de recherche · Pôle Forêt-Bois-Matériaux',
    loadComponent: () => import('./axes').then((m) => m.Axes),
  },
  {
    path: ':slug',
    title: titreAxe,
    loadComponent: () => import('./axe-detail').then((m) => m.AxeDetail),
  },
];
