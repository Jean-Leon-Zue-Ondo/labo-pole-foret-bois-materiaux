import { Component, computed, inject, signal } from '@angular/core';
import { PoleStore } from '../../core/store/pole.store';
import { TypeActualite } from '../../core/models/pole.models';
import { CarteActualite } from '../../shared/carte-actualite';

interface Filtre {
  type: TypeActualite | null;
  libelle: string;
}

const FILTRES: Filtre[] = [
  { type: null, libelle: 'Toutes' },
  { type: 'resume', libelle: 'Résumés de travaux' },
  { type: 'video', libelle: 'Vidéos' },
  { type: 'compte-rendu', libelle: 'Comptes-rendus' },
  { type: 'publication', libelle: 'Publications' },
  { type: 'annonce', libelle: 'Annonces' },
];

@Component({
  selector: 'app-actualites',
  imports: [CarteActualite],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Suivre le pôle</p>
            <h1>Actualités</h1>
          </div>
          <p>
            Résumés de travaux, vidéos de séminaires, comptes-rendus de réunion, publications et annonces : tout ce que
            publient les cinq axes de recherche, au fil de l'eau.
          </p>
        </div>

        <div class="filtres" role="group" aria-label="Filtrer par type d'actualité">
          @for (f of FILTRES; track f.libelle) {
            <button
              type="button"
              class="filtre"
              [attr.aria-pressed]="type() === f.type"
              (click)="type.set(f.type)"
            >
              {{ f.libelle }} <span class="donnee">{{ compte(f.type) }}</span>
            </button>
          }
        </div>

        <div class="grille" aria-live="polite">
          @for (a of filtrees(); track a.id) {
            <app-carte-actualite [actualite]="a" />
          } @empty {
            <p class="vide">Aucune actualité de ce type pour le moment.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    h1 {
      font-size: var(--t-2xl);
    }
    .filtres {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }
    .filtre {
      font-family: var(--f-titre);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1.5px solid var(--filet);
      background: var(--surface);
      color: var(--encre);
      cursor: pointer;
      display: inline-flex;
      gap: 8px;
      align-items: center;
    }
    .filtre .donnee {
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    .filtre:hover {
      border-color: var(--vert);
    }
    .filtre[aria-pressed='true'] {
      background: var(--vert);
      border-color: var(--vert);
      color: var(--sur-fonce);
      font-weight: 700;
    }
    .filtre[aria-pressed='true'] .donnee {
      color: var(--sur-fonce);
    }
    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
      gap: 18px;
    }
    .vide {
      color: var(--encre-douce);
    }
  `,
})
export class Actualites {
  protected readonly store = inject(PoleStore);
  protected readonly FILTRES = FILTRES;

  protected readonly type = signal<TypeActualite | null>(null);

  protected readonly filtrees = computed(() => {
    const t = this.type();
    return this.store.actualitesTriees().filter((a) => !t || a.type === t);
  });

  protected compte(type: TypeActualite | null): number {
    const toutes = this.store.actualitesTriees();
    return type ? toutes.filter((a) => a.type === type).length : toutes.length;
  }
}
