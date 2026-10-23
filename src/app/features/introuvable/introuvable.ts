import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-introuvable',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="conteneur boite">
        <p class="surtitre donnee">Erreur 404</p>
        <h1>Page introuvable</h1>
        <p>Cette adresse ne correspond à aucune page du site.</p>
        <a class="bouton plein" routerLink="/">Retour à l'accueil</a>
      </div>
    </section>
  `,
  styles: `
    .boite {
      display: grid;
      gap: 16px;
      justify-items: start;
    }
    h1 {
      font-size: var(--t-2xl);
    }
  `,
})
export class Introuvable {}
