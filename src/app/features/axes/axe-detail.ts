import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoleStore } from '../../core/store/pole.store';
import { CarteChercheur } from '../../shared/carte-chercheur';

@Component({
  selector: 'app-axe-detail',
  imports: [RouterLink, CarteChercheur],
  template: `
    @if (axe(); as a) {
      <article [class]="'ton-' + a.ton">
        <header class="tete">
          <div class="conteneur">
            <nav class="fil" aria-label="Fil d'Ariane">
              <a routerLink="/axes">Axes de recherche</a> <span aria-hidden="true">/</span> <span>{{ a.titre }}</span>
            </nav>
            <h1>{{ a.titre }}</h1>
            <p class="chapeau">{{ a.accroche }}</p>
            <p class="meta donnee">Chef de file : {{ a.institut }} · {{ chercheurs().length }} membre{{ chercheurs().length > 1 ? 's' : '' }} de l'équipe</p>
          </div>
        </header>

        <div class="conteneur corps">
          <div class="texte">
            @for (para of a.description; track $index) {
              <p>{{ para }}</p>
            }
          </div>

          <div class="colonnes">
            <section>
              <h2>Thèmes de recherche</h2>
              <ul class="liste">
                @for (t of a.themes; track t) { <li>{{ t }}</li> }
              </ul>
            </section>
            <section>
              <h2>Méthodes</h2>
              <ul class="liste">
                @for (m of a.methodes; track m) { <li>{{ m }}</li> }
              </ul>
            </section>
            <section>
              <h2>Applications</h2>
              <ul class="liste">
                @for (ap of a.applications; track ap) { <li>{{ ap }}</li> }
              </ul>
            </section>
          </div>

          <section class="equipe">
            <div class="ligne-titre">
              <h2>Chercheurs de cet axe</h2>
              <a class="bouton" routerLink="/chercheurs" [queryParams]="{ secteur: a.slug }">Voir dans l'annuaire</a>
            </div>
            <div class="grille-chercheurs">
              @for (c of chercheurs(); track c.id) {
                <app-carte-chercheur [chercheur]="c" />
              } @empty {
                <p>Aucun chercheur n'est encore rattaché à cet axe.</p>
              }
            </div>
          </section>

          <nav class="voisins" aria-label="Autres axes">
            @if (precedent(); as p) {
              <a [routerLink]="['/axes', p.slug]" class="prec">← {{ p.titre }}</a>
            } @else {
              <span></span>
            }
            @if (suivant(); as s) {
              <a [routerLink]="['/axes', s.slug]" class="suiv">{{ s.titre }} →</a>
            }
          </nav>
        </div>
      </article>
    } @else {
      <section class="section">
        <div class="conteneur introuvable">
          <h1>Axe introuvable</h1>
          <p>Cet axe de recherche n'existe pas ou a été renommé.</p>
          <a class="bouton" routerLink="/axes">Voir tous les axes</a>
        </div>
      </section>
    }
  `,
  styles: `
    .tete {
      background: var(--ton-pale);
      padding-block: clamp(36px, 6vw, 72px) clamp(32px, 5vw, 56px);
      border-bottom: 4px solid var(--ton);
    }
    .tete .conteneur {
      display: grid;
      gap: 14px;
    }
    .fil {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    .fil a {
      color: var(--ton);
    }
    h1 {
      font-size: var(--t-3xl);
      color: var(--ton);
    }
    .meta {
      font-size: var(--t-s);
      color: var(--encre-douce);
    }
    .corps {
      display: grid;
      gap: 48px;
      padding-top: 48px;
    }
    .texte {
      display: grid;
      gap: 14px;
      max-width: 68ch;
      font-size: 1.08rem;
    }
    .colonnes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .colonnes section {
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
      padding: 22px;
      display: grid;
      gap: 12px;
      align-content: start;
    }
    h2 {
      font-size: var(--t-l);
    }
    .colonnes h2 {
      color: var(--ton);
    }
    .ligne-titre {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }
    .grille-chercheurs {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
      gap: 16px;
    }
    .voisins {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      border-top: 1px solid var(--filet);
      padding-top: 20px;
      font-family: var(--f-titre);
      font-weight: 700;
    }
    .voisins a {
      text-decoration: none;
      color: var(--bleu);
    }
    .introuvable {
      display: grid;
      gap: 16px;
      justify-items: start;
    }
    @media (max-width: 820px) {
      .colonnes {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class AxeDetail {
  private readonly store = inject(PoleStore);
  /** Lié automatiquement au paramètre de route :slug. */
  readonly slug = input.required<string>();

  protected readonly axe = computed(() => this.store.axes().find((a) => a.slug === this.slug()));
  protected readonly chercheurs = computed(() =>
    this.store.chercheurs().filter((c) => c.secteurs.includes(this.slug())),
  );
  private readonly index = computed(() => this.store.axes().findIndex((a) => a.slug === this.slug()));
  protected readonly precedent = computed(() => this.store.axes()[this.index() - 1]);
  protected readonly suivant = computed(() => {
    const i = this.index();
    return i >= 0 ? this.store.axes()[i + 1] : undefined;
  });
}
