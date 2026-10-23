import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="conteneur grille">
        <div class="intro">
          <p class="surtitre">Contact</p>
          <h1>Travailler avec le pôle</h1>
          <p class="chapeau">
            Le pôle cherche ses premiers partenaires : universités et instituts pour des projets en consortium, concessions
            certifiées pour accueillir des sites d'étude, industriels pour des essais et prestations.
          </p>
          <a class="bouton" routerLink="/chercheurs">Trouver le bon interlocuteur</a>
        </div>
        <div class="carte">
          <h2>Coordonnées</h2>
          <dl>
            <div><dt>Structure</dt><dd>IRAF et IRT, CENAREST</dd></div>
            <div><dt>Ville</dt><dd>Libreville, Gabon</dd></div>
            <div><dt>Courriel</dt><dd>À communiquer</dd></div>
          </dl>
          <p class="note">Les coordonnées seront publiées à la création officielle du pôle.</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grille {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      gap: 40px;
      align-items: start;
    }
    .intro {
      display: grid;
      gap: 18px;
      justify-items: start;
    }
    h1 {
      font-size: var(--t-2xl);
    }
    .carte {
      background: var(--surface);
      border: 1px solid var(--filet);
      border-top: 4px solid var(--marron);
      border-radius: var(--rayon);
      padding: 26px;
      display: grid;
      gap: 16px;
    }
    h2 {
      font-size: var(--t-l);
    }
    dl {
      margin: 0;
      display: grid;
      gap: 12px;
    }
    dl div {
      display: grid;
      grid-template-columns: 100px minmax(0, 1fr);
      gap: 12px;
    }
    dt {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
      padding-top: 3px;
    }
    dd {
      margin: 0;
    }
    .note {
      font-size: var(--t-s);
      color: var(--encre-douce);
    }
    @media (max-width: 820px) {
      .grille {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Contact {}
