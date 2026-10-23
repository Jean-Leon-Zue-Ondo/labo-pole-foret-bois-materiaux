import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxeRecherche } from '../core/models/pole.models';

@Component({
  selector: 'app-carte-axe',
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/axes', axe().slug]" class="carte" [class]="'ton-' + axe().ton">
      <span class="pastille">{{ axe().institut }}</span>
      <h3>{{ axe().titre }}</h3>
      <p>{{ axe().accroche }}</p>
      <span class="suite">Découvrir l'axe →</span>
    </a>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .carte {
      height: 100%;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: 10px;
      padding: 22px 22px 20px;
      border-radius: var(--rayon);
      background: var(--surface);
      border: 1px solid var(--filet);
      border-top: 4px solid var(--ton);
      text-decoration: none;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .carte:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgb(0 0 0 / 0.08);
    }
    .pastille {
      justify-self: start;
    }
    h3 {
      color: var(--encre);
    }
    p {
      color: var(--encre-douce);
    }
    .suite {
      font-family: var(--f-titre);
      font-weight: 700;
      color: var(--ton);
    }
  `,
})
export class CarteAxe {
  readonly axe = input.required<AxeRecherche>();
}
