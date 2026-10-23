import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PoleStore } from '../core/store/pole.store';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-pied-de-page',
  imports: [RouterLink, Logo],
  template: `
    <footer>
      <div class="conteneur grille">
        <div class="identite">
          <app-logo [taille]="36" />
          <p><strong>Pôle Forêt-Bois-Matériaux</strong><br />IRAF · IRT · CENAREST, Libreville</p>
        </div>
        <nav aria-label="Axes de recherche">
          <h2>Axes de recherche</h2>
          <ul>
            @for (axe of store.axes(); track axe.slug) {
              <li><a [routerLink]="['/axes', axe.slug]">{{ axe.titre }}</a></li>
            }
          </ul>
        </nav>
        <nav aria-label="Le pôle">
          <h2>Le pôle</h2>
          <ul>
            <li><a routerLink="/le-pole">Organisation et feuille de route</a></li>
            <li><a routerLink="/actualites">Actualités</a></li>
            <li><a routerLink="/chercheurs">Chercheurs</a></li>
            <li><a routerLink="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div class="conteneur mention">
        <span>Pôle en création · contenus provisoires</span>
        <span>© {{ annee }} IRAF – IRT, CENAREST · <a routerLink="/admin">Espace membres</a></span>
      </div>
    </footer>
  `,
  styles: `
    footer {
      margin-top: var(--espace-section);
      background: var(--vert-fonce);
      color: #e8f0ea;
    }
    .grille {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr);
      gap: 32px;
      padding-block: 48px 32px;
    }
    .identite {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      --vert: #9fd3ae;
      --bleu: #9cc8e6;
      --marron: #d9a77f;
    }
    h2 {
      font-size: var(--t-xs);
      font-family: var(--f-donnee);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 500;
      color: #a9c4b0;
      margin-bottom: 12px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 6px;
    }
    a {
      text-decoration: none;
      color: #e8f0ea;
    }
    a:hover {
      text-decoration: underline;
    }
    .mention {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px;
      padding-block: 18px 28px;
      border-top: 1px solid rgb(255 255 255 / 0.14);
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: #a9c4b0;
    }
    @media (max-width: 760px) {
      .grille {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class PiedDePage {
  protected readonly store = inject(PoleStore);
  protected readonly annee = new Date().getFullYear();
}
