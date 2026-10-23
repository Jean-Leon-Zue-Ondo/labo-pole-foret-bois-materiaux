import { Component, inject } from '@angular/core';
import { PoleStore } from '../../core/store/pole.store';
import { CarteAxe } from '../../shared/carte-axe';

@Component({
  selector: 'app-axes',
  imports: [CarteAxe],
  template: `
    <section class="section">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="surtitre">Programme scientifique</p>
            <h1>Axes de recherche</h1>
          </div>
          <p>
            Le pôle organise ses travaux en cinq axes. L'IRAF porte les axes liés à la ressource forestière, l'IRT ceux liés
            à la technologie du bois ; la structure du bois est étudiée conjointement.
          </p>
        </div>
        <div class="grille">
          @for (axe of store.axes(); track axe.slug) {
            <app-carte-axe [axe]="axe" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    h1 {
      font-size: var(--t-2xl);
    }
    .grille {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
      gap: 18px;
    }
  `,
})
export class Axes {
  protected readonly store = inject(PoleStore);
}
