import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chercheur } from '../core/models/pole.models';
import { PoleStore } from '../core/store/pole.store';

@Component({
  selector: 'app-carte-chercheur',
  imports: [RouterLink],
  template: `
    <article class="carte">
      <div class="haut">
        @if (chercheur().photo) {
          <img class="photo" [src]="chercheur().photo" [alt]="'Photo de ' + chercheur().nom" />
        } @else {
          <span class="initiales" aria-hidden="true">{{ initiales() }}</span>
        }
        <div class="ident">
          <h3>{{ chercheur().nom }}</h3>
          <p class="titre">{{ chercheur().titre }} · {{ chercheur().institut }}</p>
        </div>
      </div>
      <p class="role">{{ chercheur().role }}</p>
      @if (chercheur().specialites.length) {
        <p class="specialites">{{ chercheur().specialites.join(' · ') }}</p>
      }
      <div class="secteurs" aria-label="Secteurs de recherche">
        @for (s of secteurs(); track s.slug) {
          <a class="pastille" [class]="'pastille ton-' + s.ton" [routerLink]="['/axes', s.slug]">{{ s.titre }}</a>
        }
      </div>
      @if (chercheur().aCompleter) {
        <p class="provisoire">Fiche à compléter</p>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .carte {
      height: 100%;
      display: grid;
      align-content: start;
      gap: 12px;
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
      padding: 20px;
    }
    .haut {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .initiales,
    .photo {
      flex: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    .photo {
      object-fit: cover;
    }
    .initiales {
      display: grid;
      place-items: center;
      background: var(--marron-pale);
      color: var(--marron);
      font-family: var(--f-titre);
      font-weight: 800;
    }
    .ident {
      min-width: 0;
    }
    h3 {
      font-size: 1.08rem;
    }
    .titre {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    .role {
      font-weight: 600;
    }
    .specialites {
      color: var(--encre-douce);
      font-size: var(--t-s);
    }
    .secteurs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .provisoire {
      font-family: var(--f-donnee);
      font-size: 0.74rem;
      color: var(--marron);
    }
  `,
})
export class CarteChercheur {
  private readonly store = inject(PoleStore);
  readonly chercheur = input.required<Chercheur>();

  protected readonly secteurs = computed(() =>
    this.chercheur()
      .secteurs.map((slug) => this.store.axes().find((a) => a.slug === slug))
      .filter((a) => !!a),
  );

  protected readonly initiales = computed(() => {
    const c = this.chercheur();
    if (c.aCompleter) return '?';
    return c.nom
      .split(/\s+/)
      .filter((m) => /^\p{Lu}/u.test(m))
      .map((m) => m[0])
      .slice(0, 2)
      .join('');
  });
}
