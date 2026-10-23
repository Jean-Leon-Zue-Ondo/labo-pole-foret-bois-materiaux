import { Component, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PoleStore } from '../../core/store/pole.store';
import { CarteChercheur } from '../../shared/carte-chercheur';

@Component({
  selector: 'app-chercheurs',
  imports: [RouterLink, CarteChercheur],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">L'équipe</p>
            <h1>Chercheurs</h1>
          </div>
          <p>
            Chercheurs, ingénieurs et techniciens de l'IRAF et de l'IRT. Choisissez un secteur pour voir qui y travaille,
            ou ouvrez la page d'un axe depuis la fiche d'un chercheur.
          </p>
        </div>

        <div class="outils">
          <div class="filtres" role="group" aria-label="Filtrer par secteur de recherche">
            <button type="button" class="filtre" [attr.aria-pressed]="!store.secteur()" (click)="choisir(null)">
              Tous <span class="donnee">{{ store.chercheurs().length }}</span>
            </button>
            @for (axe of store.axes(); track axe.slug) {
              <button
                type="button"
                class="filtre"
                [class]="'filtre ton-' + axe.ton"
                [attr.aria-pressed]="store.secteur() === axe.slug"
                (click)="choisir(axe.slug)"
              >
                {{ axe.titre }} <span class="donnee">{{ store.effectifParSecteur()[axe.slug] }}</span>
              </button>
            }
          </div>
          <label class="recherche" for="recherche-chercheur">
            <span>Rechercher</span>
            <input
              id="recherche-chercheur"
              type="search"
              placeholder="Nom, spécialité, institut…"
              [value]="store.recherche()"
              (input)="store.rechercher($any($event.target).value)"
            />
          </label>
        </div>

        @if (store.secteur(); as s) {
          <p class="contexte">
            Secteur : <strong>{{ store.titreParSlug()[s] }}</strong> ·
            <a [routerLink]="['/axes', s]">Présentation de l'axe</a>
          </p>
        }

        <div class="grille" aria-live="polite">
          @for (c of store.chercheursFiltres(); track c.id) {
            <app-carte-chercheur [chercheur]="c" />
          } @empty {
            <div class="vide">
              <p>Aucun membre ne correspond à cette recherche.</p>
              <button type="button" class="bouton" (click)="reinitialiser()">Afficher toute l'équipe</button>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    h1 {
      font-size: var(--t-2xl);
    }
    .outils {
      display: grid;
      gap: 16px;
      margin-bottom: 20px;
    }
    .filtres {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
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
      border-color: var(--ton, var(--vert));
    }
    .filtre[aria-pressed='true'] {
      background: var(--ton, var(--vert));
      border-color: var(--ton, var(--vert));
      color: var(--fond);
      font-weight: 700;
    }
    .filtre[aria-pressed='true'] .donnee {
      color: var(--fond);
    }
    .recherche {
      display: grid;
      gap: 6px;
      max-width: 420px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    input {
      font: inherit;
      font-family: var(--f-texte);
      font-size: 1rem;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--filet);
      background: var(--surface);
      color: var(--encre);
    }
    .contexte {
      margin-bottom: 16px;
      color: var(--encre-douce);
    }
    .contexte a {
      color: var(--bleu);
    }
    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr));
      gap: 16px;
    }
    .vide {
      display: grid;
      gap: 12px;
      justify-items: start;
    }
  `,
})
export class Chercheurs {
  protected readonly store = inject(PoleStore);
  private readonly router = inject(Router);

  /** Lié au paramètre d'URL ?secteur= (lien depuis une page d'axe). */
  readonly secteur = input<string | undefined>();

  constructor() {
    effect(() => {
      const s = this.secteur();
      this.store.choisirSecteur(s && this.store.axe(s) ? s : null);
    });
  }

  protected choisir(slug: string | null): void {
    this.router.navigate([], { queryParams: { secteur: slug }, replaceUrl: true });
  }

  protected reinitialiser(): void {
    this.store.rechercher('');
    this.choisir(null);
  }
}
