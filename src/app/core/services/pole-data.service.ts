import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ACTUALITES } from '../data/actualites.data';
import { AXES } from '../data/axes.data';
import { CHERCHEURS } from '../data/chercheurs.data';
import { Actualite, AxeRecherche, Chercheur } from '../models/pole.models';

/**
 * Accès aux données du pôle.
 * Aujourd'hui les données sont embarquées dans l'application (rendu SSR immédiat).
 * Pour brancher une API ou un CMS, remplacer `of(...)` par des appels HttpClient
 * (provideHttpClient(withFetch()) dans app.config.ts) sans toucher au store ni aux pages.
 */
@Injectable({ providedIn: 'root' })
export class PoleDataService {
  getAxes(): Observable<AxeRecherche[]> {
    return of(AXES);
  }

  getChercheurs(): Observable<Chercheur[]> {
    return of(CHERCHEURS);
  }

  getActualites(): Observable<Actualite[]> {
    return of(ACTUALITES);
  }
}
