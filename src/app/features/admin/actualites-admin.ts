import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Actualite, TypeActualite } from '../../core/models/pole.models';
import { PoleDataService } from '../../core/services/pole-data.service';
import { PoleStore } from '../../core/store/pole.store';

const VIDE = (): Actualite => ({
  id: '',
  type: 'resume',
  titre: '',
  date: new Date().toISOString().slice(0, 10),
  auteur: '',
  resume: '',
  axes: [],
  lien: '',
  libelleLien: '',
  aCompleter: false,
});

const TYPES: { valeur: TypeActualite; libelle: string }[] = [
  { valeur: 'resume', libelle: 'Résumé de travaux' },
  { valeur: 'video', libelle: 'Vidéo' },
  { valeur: 'compte-rendu', libelle: 'Compte-rendu de réunion' },
  { valeur: 'publication', libelle: 'Publication' },
  { valeur: 'annonce', libelle: 'Annonce' },
];

@Component({
  selector: 'app-actualites-admin',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Espace membres</p>
            <h1>Actualités</h1>
          </div>
          <button type="button" class="bouton plein" (click)="nouvelle()">+ Ajouter une actualité</button>
        </div>

        @if (edition(); as a) {
          <form class="fiche" (ngSubmit)="enregistrer()">
            <h2>{{ a.id && dejaExistante(a.id) ? 'Modifier' : 'Nouvelle' }} actualité</h2>

            <label>
              <span>Type</span>
              <select name="type" [(ngModel)]="a.type">
                @for (t of TYPES; track t.valeur) {
                  <option [value]="t.valeur">{{ t.libelle }}</option>
                }
              </select>
            </label>

            <label>
              <span>Titre</span>
              <input type="text" name="titre" required [(ngModel)]="a.titre" />
            </label>

            <div class="deux">
              <label>
                <span>Date</span>
                <input type="date" name="date" required [(ngModel)]="a.date" />
              </label>
              <label>
                <span>Auteur / axe</span>
                <input type="text" name="auteur" required [(ngModel)]="a.auteur" placeholder="Axe Forêt-bois" />
              </label>
            </div>

            <label>
              <span>Résumé</span>
              <textarea name="resume" rows="4" required [(ngModel)]="a.resume"></textarea>
            </label>

            <fieldset>
              <legend>Axes concernés</legend>
              @for (axe of store.axes(); track axe.slug) {
                <label class="case">
                  <input type="checkbox" [checked]="a.axes.includes(axe.slug)" (change)="basculerAxe(a, axe.slug)" />
                  {{ axe.titre }}
                </label>
              }
            </fieldset>

            <div class="deux">
              <label>
                <span>Lien (optionnel)</span>
                <input type="url" name="lien" [(ngModel)]="a.lien" placeholder="https://…" />
              </label>
              <label>
                <span>Texte du lien (optionnel)</span>
                <input type="text" name="libelleLien" [(ngModel)]="a.libelleLien" placeholder="Voir la vidéo" />
              </label>
            </div>

            @if (erreur()) {
              <p class="erreur" role="alert">{{ erreur() }}</p>
            }

            <div class="actions">
              <button type="submit" class="bouton plein" [disabled]="enCours()">
                {{ enCours() ? 'Enregistrement…' : 'Enregistrer' }}
              </button>
              <button type="button" class="bouton" (click)="annuler()">Annuler</button>
            </div>
          </form>
        }

        <div class="liste">
          @for (a of store.actualitesTriees(); track a.id) {
            <article class="ligne">
              <div>
                <span class="pastille">{{ etiquette(a.type) }}</span>
                <strong>{{ a.titre }}</strong>
                <span class="meta donnee">{{ a.date }} · {{ a.auteur }}</span>
              </div>
              <div class="actions">
                <button type="button" class="bouton" (click)="editer(a)">Modifier</button>
                <button type="button" class="bouton danger" (click)="supprimer(a)">Supprimer</button>
              </div>
            </article>
          } @empty {
            <p class="vide">Aucune actualité pour le moment.</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    h1 { font-size: var(--t-2xl); }
    .fiche {
      display: grid;
      gap: 16px;
      padding: 24px;
      margin-bottom: 28px;
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
    }
    .fiche h2 { font-size: var(--t-l); }
    label {
      display: grid;
      gap: 6px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    input, select, textarea {
      font: inherit;
      font-family: var(--f-texte);
      font-size: 1rem;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--filet);
      background: var(--fond);
      color: var(--encre);
    }
    .deux {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    fieldset {
      border: 1px solid var(--filet);
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    legend {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
      padding: 0 6px;
    }
    .case {
      flex-direction: row;
      align-items: center;
      gap: 6px;
      font-family: var(--f-texte);
      font-size: var(--t-s);
      color: var(--encre);
    }
    .erreur { color: #b3261e; font-size: var(--t-s); }
    .actions { display: flex; gap: 10px; }
    .liste { display: grid; gap: 10px; }
    .ligne {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 18px;
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
    }
    .ligne > div:first-child {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .meta { color: var(--encre-douce); }
    .bouton.danger {
      border-color: #b3261e;
      color: #b3261e;
    }
    .bouton.danger:hover {
      background: color-mix(in srgb, #b3261e 10%, transparent);
    }
    .vide { color: var(--encre-douce); }
    @media (max-width: 640px) {
      .deux { grid-template-columns: 1fr; }
    }
  `,
})
export class ActualitesAdmin {
  protected readonly store = inject(PoleStore);
  private readonly data = inject(PoleDataService);

  protected readonly TYPES = TYPES;
  protected readonly edition = signal<Actualite | null>(null);
  protected readonly enCours = signal(false);
  protected readonly erreur = signal<string | null>(null);

  protected etiquette(type: TypeActualite): string {
    return TYPES.find((t) => t.valeur === type)?.libelle ?? type;
  }

  protected dejaExistante(id: string): boolean {
    return this.store.actualitesTriees().some((a) => a.id === id);
  }

  protected nouvelle(): void {
    this.erreur.set(null);
    this.edition.set(VIDE());
  }

  protected editer(a: Actualite): void {
    this.erreur.set(null);
    this.edition.set({ ...a, axes: [...a.axes] });
  }

  protected basculerAxe(a: Actualite, slug: string): void {
    a.axes = a.axes.includes(slug) ? a.axes.filter((s) => s !== slug) : [...a.axes, slug];
  }

  protected annuler(): void {
    this.edition.set(null);
  }

  protected async enregistrer(): Promise<void> {
    const a = this.edition();
    if (!a) return;
    this.erreur.set(null);
    this.enCours.set(true);
    try {
      const id = a.id || crypto.randomUUID();
      await this.data.enregistrerActualite({ ...a, id });
      this.edition.set(null);
    } catch {
      this.erreur.set("Échec de l'enregistrement. Réessayez.");
    } finally {
      this.enCours.set(false);
    }
  }

  protected async supprimer(a: Actualite): Promise<void> {
    if (!confirm(`Supprimer « ${a.titre} » ?`)) return;
    await this.data.supprimerActualite(a.id);
  }
}
