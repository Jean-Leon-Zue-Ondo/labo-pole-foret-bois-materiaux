import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AxeRecherche, Institut, TonAxe } from '../../core/models/pole.models';
import { PoleDataService } from '../../core/services/pole-data.service';
import { PoleStore } from '../../core/store/pole.store';

interface AxeFormulaire extends Omit<AxeRecherche, 'description' | 'themes' | 'methodes' | 'applications'> {
  description: string;
  themes: string;
  methodes: string;
  applications: string;
}

const VIDE = (): AxeFormulaire => ({
  slug: '',
  titre: '',
  accroche: '',
  description: '',
  institut: 'IRAF',
  ton: 'foret',
  themes: '',
  methodes: '',
  applications: '',
});

const INSTITUTS: Institut[] = ['IRAF', 'IRT', 'IRAF et IRT'];
const TONS: { valeur: TonAxe; libelle: string }[] = [
  { valeur: 'foret', libelle: 'Forêt (vert)' },
  { valeur: 'bois', libelle: 'Bois (marron)' },
  { valeur: 'science', libelle: 'Science et technologie (bleu)' },
];

const versLignes = (texte: string): string[] =>
  texte
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const versListe = (texte: string): string[] =>
  texte
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);

@Component({
  selector: 'app-axes-admin',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Espace membres</p>
            <h1>Axes de recherche</h1>
          </div>
          <button type="button" class="bouton plein" (click)="nouveau()">+ Ajouter un axe</button>
        </div>

        @if (edition(); as a) {
          <form class="fiche" (ngSubmit)="enregistrer()">
            <h2>{{ modifieExistant() ? 'Modifier' : 'Nouvel' }} axe</h2>

            <div class="deux">
              <label>
                <span>Identifiant (slug, URL /axes/…)</span>
                <input
                  type="text"
                  name="slug"
                  required
                  pattern="[a-z0-9-]+"
                  [disabled]="modifieExistant()"
                  [(ngModel)]="a.slug"
                  placeholder="foret-bois"
                />
              </label>
              <label>
                <span>Institut</span>
                <select name="institut" [(ngModel)]="a.institut">
                  @for (i of INSTITUTS; track i) {
                    <option [value]="i">{{ i }}</option>
                  }
                </select>
              </label>
            </div>

            <label>
              <span>Titre</span>
              <input type="text" name="titre" required [(ngModel)]="a.titre" />
            </label>

            <label>
              <span>Accroche (menu et cartes)</span>
              <input type="text" name="accroche" required [(ngModel)]="a.accroche" />
            </label>

            <label>
              <span>Description (un paragraphe par ligne)</span>
              <textarea name="description" rows="4" required [(ngModel)]="a.description"></textarea>
            </label>

            <label>
              <span>Couleur de la charte</span>
              <select name="ton" [(ngModel)]="a.ton">
                @for (t of TONS; track t.valeur) {
                  <option [value]="t.valeur">{{ t.libelle }}</option>
                }
              </select>
            </label>

            <label>
              <span>Thèmes (séparés par des virgules)</span>
              <input type="text" name="themes" [(ngModel)]="a.themes" />
            </label>
            <label>
              <span>Méthodes (séparées par des virgules)</span>
              <input type="text" name="methodes" [(ngModel)]="a.methodes" />
            </label>
            <label>
              <span>Applications (séparées par des virgules)</span>
              <input type="text" name="applications" [(ngModel)]="a.applications" />
            </label>

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
          @for (axe of store.axes(); track axe.slug) {
            <article class="ligne" [class]="'ton-' + axe.ton">
              <div>
                <span class="pastille">{{ axe.institut }}</span>
                <strong>{{ axe.titre }}</strong>
                <span class="meta donnee">/axes/{{ axe.slug }}</span>
              </div>
              <div class="actions">
                <button type="button" class="bouton" (click)="editer(axe)">Modifier</button>
                <button type="button" class="bouton danger" (click)="supprimer(axe)">Supprimer</button>
              </div>
            </article>
          } @empty {
            <p class="vide">Aucun axe pour le moment.</p>
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
    input:disabled {
      color: var(--encre-douce);
      background: var(--sur-fonce);
    }
    .deux {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
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
      border-left: 4px solid var(--ton);
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
export class AxesAdmin {
  protected readonly store = inject(PoleStore);
  private readonly data = inject(PoleDataService);

  protected readonly INSTITUTS = INSTITUTS;
  protected readonly TONS = TONS;
  protected readonly edition = signal<AxeFormulaire | null>(null);
  protected readonly enCours = signal(false);
  protected readonly erreur = signal<string | null>(null);
  private slugOriginal: string | null = null;

  protected modifieExistant(): boolean {
    return this.slugOriginal !== null;
  }

  protected nouveau(): void {
    this.erreur.set(null);
    this.slugOriginal = null;
    this.edition.set(VIDE());
  }

  protected editer(axe: AxeRecherche): void {
    this.erreur.set(null);
    this.slugOriginal = axe.slug;
    this.edition.set({
      ...axe,
      description: axe.description.join('\n'),
      themes: axe.themes.join(', '),
      methodes: axe.methodes.join(', '),
      applications: axe.applications.join(', '),
    });
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
      const axe: AxeRecherche = {
        slug: a.slug,
        titre: a.titre,
        accroche: a.accroche,
        institut: a.institut,
        ton: a.ton,
        description: versLignes(a.description),
        themes: versListe(a.themes),
        methodes: versListe(a.methodes),
        applications: versListe(a.applications),
      };
      await this.data.enregistrerAxe(axe);
      this.edition.set(null);
    } catch {
      this.erreur.set("Échec de l'enregistrement. Réessayez.");
    } finally {
      this.enCours.set(false);
    }
  }

  protected async supprimer(axe: AxeRecherche): Promise<void> {
    if (!confirm(`Supprimer l'axe « ${axe.titre} » ? Les chercheurs qui y sont rattachés ne seront pas modifiés.`)) return;
    await this.data.supprimerAxe(axe.slug);
  }
}
