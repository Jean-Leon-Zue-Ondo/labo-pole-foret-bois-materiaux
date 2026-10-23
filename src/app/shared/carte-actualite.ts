import { Component, input } from '@angular/core';
import { Actualite, TypeActualite } from '../core/models/pole.models';

const ETIQUETTE: Record<TypeActualite, string> = {
  resume: 'Résumé de travaux',
  video: 'Vidéo',
  'compte-rendu': 'Compte-rendu de réunion',
  publication: 'Publication',
  annonce: 'Annonce',
};

const LIEN_PAR_DEFAUT: Record<TypeActualite, string> = {
  resume: 'Lire le résumé',
  video: 'Voir la vidéo',
  'compte-rendu': 'Voir le compte-rendu',
  publication: 'Voir la publication',
  annonce: "Voir l'annonce",
};

/** Teinte de la charte (vert, bleu, marron) associée à chaque type d'actualité. */
const TON: Record<TypeActualite, 'foret' | 'science' | 'bois'> = {
  resume: 'foret',
  video: 'science',
  'compte-rendu': 'bois',
  publication: 'science',
  annonce: 'bois',
};

@Component({
  selector: 'app-carte-actualite',
  template: `
    <article class="carte" [class]="'ton-' + TON[actualite().type]">
      <div class="entete">
        <span class="pastille">{{ ETIQUETTE[actualite().type] }}</span>
        <time class="donnee" [attr.datetime]="actualite().date">{{ dateAffichee() }}</time>
      </div>
      <h3>{{ actualite().titre }}</h3>
      <p class="resume">{{ actualite().resume }}</p>
      <div class="pied">
        <span class="auteur">{{ actualite().auteur }}</span>
        @if (actualite().lien) {
          <a class="suite" [href]="actualite().lien" target="_blank" rel="noopener">
            {{ actualite().libelleLien || LIEN_PAR_DEFAUT[actualite().type] }} →
          </a>
        }
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
      height: 100%;
    }
    .carte {
      height: 100%;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: 10px;
      padding: 22px;
      border-radius: var(--rayon);
      background: var(--surface);
      border: 1px solid var(--filet);
      border-top: 4px solid var(--ton);
    }
    .entete {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    time {
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    h3 {
      color: var(--encre);
    }
    .resume {
      color: var(--encre-douce);
    }
    .pied {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding-top: 4px;
    }
    .auteur {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    .suite {
      font-family: var(--f-titre);
      font-weight: 700;
      font-size: var(--t-s);
      color: var(--ton);
      text-decoration: none;
      white-space: nowrap;
    }
    .suite:hover {
      text-decoration: underline;
    }
  `,
})
export class CarteActualite {
  readonly actualite = input.required<Actualite>();

  protected readonly ETIQUETTE = ETIQUETTE;
  protected readonly LIEN_PAR_DEFAUT = LIEN_PAR_DEFAUT;
  protected readonly TON = TON;

  protected dateAffichee(): string {
    return new Date(this.actualite().date + 'T00:00:00').toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
