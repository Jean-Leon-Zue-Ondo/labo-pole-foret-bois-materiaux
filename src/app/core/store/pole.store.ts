import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Actualite, AxeRecherche, Chercheur } from '../models/pole.models';
import { PoleDataService } from '../services/pole-data.service';

interface PoleState {
  axes: AxeRecherche[];
  chercheurs: Chercheur[];
  actualites: Actualite[];
  /** Slug de l'axe sélectionné dans la page Chercheurs, null = tous. */
  secteur: string | null;
  recherche: string;
}

const etatInitial: PoleState = { axes: [], chercheurs: [], actualites: [], secteur: null, recherche: '' };

const normaliser = (t: string) => t.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export const PoleStore = signalStore(
  { providedIn: 'root' },
  withState(etatInitial),
  withComputed(({ axes, chercheurs, actualites, secteur, recherche }) => ({
    actualitesTriees: computed(() =>
      [...actualites()].sort((a, b) => b.date.localeCompare(a.date)),
    ),
    chercheursFiltres: computed(() => {
      const s = secteur();
      const q = normaliser(recherche().trim());
      return chercheurs().filter(
        (c) =>
          (!s || c.secteurs.includes(s)) &&
          (!q || normaliser([c.nom, c.role, c.institut, ...c.specialites].join(' ')).includes(q)),
      );
    }),
    effectifParSecteur: computed(() => {
      const compte: Record<string, number> = {};
      for (const a of axes()) compte[a.slug] = 0;
      for (const c of chercheurs()) for (const s of c.secteurs) compte[s] = (compte[s] ?? 0) + 1;
      return compte;
    }),
    titreParSlug: computed(() => Object.fromEntries(axes().map((a) => [a.slug, a.titre]))),
  })),
  withMethods((store) => ({
    axe(slug: string): AxeRecherche | undefined {
      return store.axes().find((a) => a.slug === slug);
    },
    chercheursDuSecteur(slug: string): Chercheur[] {
      return store.chercheurs().filter((c) => c.secteurs.includes(slug));
    },
    choisirSecteur(secteur: string | null): void {
      patchState(store, { secteur });
    },
    rechercher(recherche: string): void {
      patchState(store, { recherche });
    },
  })),
  withHooks({
    onInit(store, data = inject(PoleDataService)) {
      data.getAxes().subscribe((axes) => patchState(store, { axes }));
      data.getChercheurs().subscribe((chercheurs) => patchState(store, { chercheurs }));
      data.getActualites().subscribe((actualites) => patchState(store, { actualites }));
    },
  }),
);
