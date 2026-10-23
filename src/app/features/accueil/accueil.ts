import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoleStore } from '../../core/store/pole.store';
import { BandeauActivites } from '../../shared/bandeau-activites';
import { CarteActualite } from '../../shared/carte-actualite';
import { CarteAxe } from '../../shared/carte-axe';
import { CoupeCernes } from '../../shared/coupe-cernes';
import { Logo } from '../../shared/logo';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, BandeauActivites, CarteActualite, CarteAxe, CoupeCernes, Logo],
  template: `
    <app-bandeau-activites />

    <section class="ouverture">
      <div class="conteneur grille-ouverture">
        <div>
          <app-logo [taille]="40" />
          <span class="statut"><i aria-hidden="true"></i>Pôle en création · CENAREST</span>
          <h1>De la forêt de production au <em>matériau bois</em></h1>
          <p class="chapeau">
            Un pôle de recherche conjoint de l'IRAF et de l'IRT pour étudier le bois gabonais de la parcelle au produit fini.
          </p>
          <div class="actions">
            <a class="bouton plein" routerLink="/axes">Nos axes de recherche</a>
            <a class="bouton" routerLink="/chercheurs">Rencontrer les chercheurs</a>
          </div>
        </div>
        <app-coupe-cernes class="coupe" />
      </div>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Suivre le pôle</p>
            <h2>Actualités</h2>
          </div>
          <p>Résumés de travaux, vidéos de séminaires, comptes-rendus de réunion et publications des cinq axes.</p>
        </div>
        <div class="grille-actus">
          @for (a of store.actualitesTriees().slice(0, 4); track a.id) {
            <app-carte-actualite [actualite]="a" />
          }
        </div>
        <a class="toutes-actus" routerLink="/actualites">Toutes les actualités →</a>
      </div>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Programme scientifique</p>
            <h2>Cinq axes de recherche</h2>
          </div>
          <p>
            Du peuplement forestier à la chimie de la paroi cellulaire, chaque axe porte sur un maillon de la chaîne du bois.
            <span class="legende-tons">
              <span class="ton-foret pastille">forêt</span>
              <span class="ton-bois pastille">bois</span>
              <span class="ton-science pastille">science et technologie</span>
            </span>
          </p>
        </div>
        <div class="grille-axes">
          @for (axe of store.axes(); track axe.slug) {
            <app-carte-axe [axe]="axe" />
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="conteneur bandeau">
        <div>
          <p class="surtitre">L'équipe</p>
          <h2>{{ store.chercheurs().length }} membres répartis sur les cinq axes</h2>
          <p>Retrouvez chaque chercheur et son secteur de recherche, et filtrez l'équipe par axe.</p>
        </div>
        <a class="bouton plein" routerLink="/chercheurs">Voir les chercheurs</a>
      </div>
    </section>
  `,
  styles: `
    .grille-ouverture {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: clamp(28px, 5vw, 64px);
      align-items: center;
      padding-block: clamp(40px, 7vw, 88px) 0;
    }
    app-logo {
      margin-bottom: 14px;
    }
    h1 {
      margin-top: 18px;
    }
    h1 em {
      font-style: normal;
      color: var(--marron);
    }
    .chapeau {
      margin-top: 20px;
      max-width: 36ch;
    }
    .statut {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      border: 1px solid var(--filet);
      border-radius: 999px;
      padding: 4px 12px;
      color: var(--encre-douce);
    }
    .statut i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--bleu);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 30px;
    }
    .coupe {
      justify-self: center;
    }
    .legende-tons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }
    .grille-actus {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
      gap: 18px;
    }
    .toutes-actus {
      display: inline-block;
      margin-top: 24px;
      font-family: var(--f-titre);
      font-weight: 700;
      color: var(--vert);
      text-decoration: none;
    }
    .toutes-actus:hover {
      text-decoration: underline;
    }
    .grille-axes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
      gap: 18px;
    }
    .bandeau {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .bandeau > div {
      display: grid;
      gap: 10px;
      max-width: 60ch;
    }
    .bandeau p:not(.surtitre) {
      color: var(--encre-douce);
    }
    @media (max-width: 820px) {
      .grille-ouverture {
        grid-template-columns: 1fr;
      }
      .coupe {
        max-width: 300px;
      }
    }
  `,
})
export class Accueil {
  protected readonly store = inject(PoleStore);
}
