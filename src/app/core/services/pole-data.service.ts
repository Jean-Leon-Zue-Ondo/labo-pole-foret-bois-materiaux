import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Actualite, AxeRecherche, Chercheur } from '../models/pole.models';

const ERREUR_NON_CONFIGURE = new Error(
  "Firebase n'est pas configuré : renseigne src/environments/environment.ts (voir le README, section « Espace membres »).",
);

/**
 * Accès aux données du pôle, stockées dans Firestore : collections `axes`, `chercheurs`
 * et `actualites`. Lecture publique (utilisée par tout le site, voir firestore.rules),
 * écriture réservée aux membres connectés (espace /admin).
 *
 * L'identifiant du document Firestore est toujours le même que le champ métier
 * (`slug` pour un axe, `id` pour un chercheur ou une actualité), ce qui garantit
 * l'unicité et évite les doublons.
 *
 * Tant que le projet Firebase n'est pas configuré, `firestore` est indisponible : les
 * lectures renvoient des listes vides (le site reste fonctionnel) et les écritures
 * échouent avec un message explicite plutôt que de planter.
 *
 * Pour amorcer ces collections à partir des contenus d'exemple du dépôt :
 * `npm run seed:firestore` (voir scripts/seed-firestore.ts et le README).
 */
@Injectable({ providedIn: 'root' })
export class PoleDataService {
  private readonly firestore = inject(Firestore, { optional: true });

  getAxes(): Observable<AxeRecherche[]> {
    if (!this.firestore) return of([]);
    return collectionData(collection(this.firestore, 'axes')) as Observable<AxeRecherche[]>;
  }

  getChercheurs(): Observable<Chercheur[]> {
    if (!this.firestore) return of([]);
    return collectionData(collection(this.firestore, 'chercheurs')) as Observable<Chercheur[]>;
  }

  getActualites(): Observable<Actualite[]> {
    if (!this.firestore) return of([]);
    return collectionData(collection(this.firestore, 'actualites')) as Observable<Actualite[]>;
  }

  enregistrerAxe(axe: AxeRecherche): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return setDoc(doc(this.firestore, 'axes', axe.slug), axe);
  }

  supprimerAxe(slug: string): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return deleteDoc(doc(this.firestore, 'axes', slug));
  }

  enregistrerChercheur(chercheur: Chercheur): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return setDoc(doc(this.firestore, 'chercheurs', chercheur.id), chercheur);
  }

  supprimerChercheur(id: string): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return deleteDoc(doc(this.firestore, 'chercheurs', id));
  }

  enregistrerActualite(actualite: Actualite): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return setDoc(doc(this.firestore, 'actualites', actualite.id), actualite);
  }

  supprimerActualite(id: string): Promise<void> {
    if (!this.firestore) return Promise.reject(ERREUR_NON_CONFIGURE);
    return deleteDoc(doc(this.firestore, 'actualites', id));
  }
}
