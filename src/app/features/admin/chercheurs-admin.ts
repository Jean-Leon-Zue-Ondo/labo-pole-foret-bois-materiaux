import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chercheur, Institut } from '../../core/models/pole.models';
import { PoleDataService } from '../../core/services/pole-data.service';
import { StockageService } from '../../core/services/stockage.service';
import { PoleStore } from '../../core/store/pole.store';

interface ChercheurFormulaire extends Omit<Chercheur, 'specialites'> {
  specialites: string;
}

const VIDE = (): ChercheurFormulaire => ({
  id: crypto.randomUUID(),
  nom: '',
  titre: 'Chercheur·e',
  institut: 'IRAF',
  role: '',
  secteurs: [],
  specialites: '',
  aCompleter: false,
  email: '',
  photo: '',
});

const INSTITUTS: Institut[] = ['IRAF', 'IRT', 'IRAF et IRT'];

@Component({
  selector: 'app-chercheurs-admin',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Espace membres</p>
            <h1>Chercheurs</h1>
          </div>
          <button type="button" class="bouton plein" (click)="nouveau()">+ Ajouter un membre</button>
        </div>

        @if (edition(); as c) {
          <form class="fiche" (ngSubmit)="enregistrer()">
            <h2>{{ c.id && dejaExistant(c.id) ? 'Modifier' : 'Nouveau' }} membre</h2>

            <div class="photo">
              @if (c.photo) {
                <img [src]="c.photo" [alt]="'Photo de ' + c.nom" />
              } @else {
                <span class="photo-vide" aria-hidden="true">{{ c.nom ? c.nom[0] : '?' }}</span>
              }
              <div class="photo-actions">
                <label class="bouton">
                  {{ photoEnCours() ? 'Envoi…' : 'Choisir une photo' }}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    [disabled]="photoEnCours()"
                    (change)="surPhotoChoisie($event, c)"
                  />
                </label>
                @if (c.photo) {
                  <button type="button" class="bouton" (click)="c.photo = ''">Retirer</button>
                }
              </div>
            </div>

            <div class="deux">
              <label>
                <span>Nom</span>
                <input type="text" name="nom" required [(ngModel)]="c.nom" />
              </label>
              <label>
                <span>E-mail (compte de connexion)</span>
                <input type="email" name="email" [(ngModel)]="c.email" placeholder="prenom.nom@exemple.org" />
              </label>
            </div>

            <div class="deux">
              <label>
                <span>Titre</span>
                <input type="text" name="titre" required [(ngModel)]="c.titre" placeholder="Chercheur·e" />
              </label>
              <label>
                <span>Institut</span>
                <select name="institut" [(ngModel)]="c.institut">
                  @for (i of INSTITUTS; track i) {
                    <option [value]="i">{{ i }}</option>
                  }
                </select>
              </label>
            </div>

            <label>
              <span>Rôle</span>
              <input type="text" name="role" required [(ngModel)]="c.role" placeholder="Responsable de l'axe…" />
            </label>

            <label>
              <span>Spécialités (séparées par des virgules)</span>
              <input type="text" name="specialites" [(ngModel)]="c.specialites" placeholder="Sylviculture, Carbone" />
            </label>

            <fieldset>
              <legend>Secteurs (axes)</legend>
              @for (axe of store.axes(); track axe.slug) {
                <label class="case">
                  <input type="checkbox" [checked]="c.secteurs.includes(axe.slug)" (change)="basculerSecteur(c, axe.slug)" />
                  {{ axe.titre }}
                </label>
              }
            </fieldset>

            <label class="case">
              <input type="checkbox" name="aCompleter" [(ngModel)]="c.aCompleter" />
              Fiche provisoire (à compléter)
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
          @for (c of store.chercheurs(); track c.id) {
            <article class="ligne">
              <div>
                @if (c.photo) {
                  <img class="miniature" [src]="c.photo" [alt]="'Photo de ' + c.nom" />
                } @else {
                  <span class="miniature vide" aria-hidden="true">{{ c.nom[0] }}</span>
                }
                <strong>{{ c.nom }}</strong>
                <span class="meta donnee">{{ c.role }} · {{ c.institut }}</span>
                @if (c.aCompleter) {
                  <span class="pastille">à compléter</span>
                }
              </div>
              <div class="actions">
                <button type="button" class="bouton" (click)="editer(c)">Modifier</button>
                <button type="button" class="bouton danger" (click)="supprimer(c)">Supprimer</button>
              </div>
            </article>
          } @empty {
            <p class="vide">Aucun membre pour le moment.</p>
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
    .photo {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .photo img,
    .photo-vide {
      flex: none;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
    }
    .photo-vide {
      display: grid;
      place-items: center;
      background: var(--marron-pale);
      color: var(--marron);
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: var(--t-l);
    }
    .photo-actions {
      display: flex;
      gap: 10px;
    }
    .photo-actions .bouton {
      cursor: pointer;
      padding: 8px 14px;
      font-size: var(--t-s);
    }
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
    .miniature {
      flex: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .miniature.vide {
      display: grid;
      place-items: center;
      background: var(--marron-pale);
      color: var(--marron);
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: var(--t-s);
    }
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
export class ChercheursAdmin {
  protected readonly store = inject(PoleStore);
  private readonly data = inject(PoleDataService);
  private readonly stockage = inject(StockageService);

  protected readonly INSTITUTS = INSTITUTS;
  protected readonly edition = signal<ChercheurFormulaire | null>(null);
  protected readonly enCours = signal(false);
  protected readonly photoEnCours = signal(false);
  protected readonly erreur = signal<string | null>(null);

  protected dejaExistant(id: string): boolean {
    return this.store.chercheurs().some((c) => c.id === id);
  }

  protected nouveau(): void {
    this.erreur.set(null);
    this.edition.set(VIDE());
  }

  protected editer(c: Chercheur): void {
    this.erreur.set(null);
    this.edition.set({ ...c, secteurs: [...c.secteurs], specialites: c.specialites.join(', ') });
  }

  protected basculerSecteur(c: ChercheurFormulaire, slug: string): void {
    c.secteurs = c.secteurs.includes(slug) ? c.secteurs.filter((s) => s !== slug) : [...c.secteurs, slug];
  }

  protected async surPhotoChoisie(evenement: Event, c: ChercheurFormulaire): Promise<void> {
    const fichier = (evenement.target as HTMLInputElement).files?.[0];
    if (!fichier) return;
    this.erreur.set(null);
    this.photoEnCours.set(true);
    try {
      const extension = fichier.name.split('.').pop() || 'jpg';
      c.photo = await this.stockage.deposerPhoto(`chercheurs/${c.id}.${extension}`, fichier);
    } catch {
      this.erreur.set("Échec de l'envoi de la photo. Réessayez.");
    } finally {
      this.photoEnCours.set(false);
    }
  }

  protected annuler(): void {
    this.edition.set(null);
  }

  protected async enregistrer(): Promise<void> {
    const c = this.edition();
    if (!c) return;
    this.erreur.set(null);
    this.enCours.set(true);
    try {
      const id = c.id || crypto.randomUUID();
      const specialites = c.specialites
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const chercheur: Chercheur = { ...c, id, specialites };
      await this.data.enregistrerChercheur(chercheur);
      this.edition.set(null);
    } catch {
      this.erreur.set("Échec de l'enregistrement. Réessayez.");
    } finally {
      this.enCours.set(false);
    }
  }

  protected async supprimer(c: Chercheur): Promise<void> {
    if (!confirm(`Supprimer la fiche de « ${c.nom} » ?`)) return;
    await this.data.supprimerChercheur(c.id);
  }
}
