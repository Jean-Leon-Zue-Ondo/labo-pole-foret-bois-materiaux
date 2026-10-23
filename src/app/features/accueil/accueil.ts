import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoleStore } from '../../core/store/pole.store';
import { CarteAxe } from '../../shared/carte-axe';
import { CoupeCernes } from '../../shared/coupe-cernes';

interface Constat {
  chiffre: string;
  texte: string;
  source: string;
  lien: string;
}

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, CarteAxe, CoupeCernes],
  template: `
    <section class="ouverture">
      <div class="conteneur grille-ouverture">
        <div>
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
            <p class="surtitre">Pourquoi ce pôle</p>
            <h2>La filière s'est industrialisée, la recherche doit suivre</h2>
          </div>
          <p>
            Aucune structure nationale ne couvre aujourd'hui toute la chaîne, de l'arbre sur pied au produit transformé.
            Industriels, État et bailleurs attendent des données et des solutions sur cette chaîne.
          </p>
        </div>
        <div class="constats">
          @for (c of constats; track c.chiffre) {
            <div class="constat">
              <span class="chiffre donnee">{{ c.chiffre }}</span>
              <p>{{ c.texte }}</p>
              <a class="source" [href]="c.lien" target="_blank" rel="noopener">{{ c.source }}</a>
            </div>
          }
        </div>
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
    .constats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      border-top: 2px solid var(--encre);
    }
    .constat {
      padding: 22px 24px 24px 0;
      display: grid;
      gap: 10px;
      align-content: start;
    }
    .constat + .constat {
      padding-left: 24px;
      border-left: 1px solid var(--filet);
    }
    .chiffre {
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: var(--t-2xl);
      color: var(--vert);
      line-height: 1;
    }
    .source {
      font-family: var(--f-donnee);
      font-size: 0.78rem;
      color: var(--encre-douce);
    }
    .legende-tons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
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
      .constats {
        grid-template-columns: 1fr;
      }
      .constat + .constat {
        padding-left: 0;
        border-left: 0;
        border-top: 1px solid var(--filet);
      }
    }
  `,
})
export class Accueil {
  protected readonly store = inject(PoleStore);

  protected readonly constats: Constat[] = [
    {
      chiffre: '85 → 217',
      texte: "unités de transformation du bois entre 2010 et 2023, après l'interdiction d'exporter les grumes.",
      source: 'EcoMatin, ministère des Forêts',
      lien: 'https://ecomatin.net/au-gabon-le-nombre-dunites-de-transformation-du-bois-a-augmente-de-61-en-10-ans',
    },
    {
      chiffre: '3,1 Mm³',
      texte: 'de bois prévus en 2026, en baisse : la valeur ajoutée par mètre cube devient le levier principal.',
      source: 'Prévisions BEAC, 2026',
      lien: 'https://gabonmediatime.com/gabon-la-beac-anticipe-un-nouveau-coup-de-frein-de-la-filiere-bois-en-2026/',
    },
    {
      chiffre: '2026-2035',
      texte: 'nouvelle stratégie CAFI, orientée vers des financements liés aux résultats mesurés en forêt.',
      source: 'Gabonreview, mai 2026',
      lien: 'https://www.gabonreview.com/cafi-2026-2035-le-gabon-defend-ses-priorites-forestieres-et-climatiques-a-brazzaville/',
    },
  ];
}
