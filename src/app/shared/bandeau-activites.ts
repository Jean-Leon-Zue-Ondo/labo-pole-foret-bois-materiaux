import { Component } from '@angular/core';

interface Tuile {
  legende: string;
  fichier: string;
}

/**
 * Bandeau d'images de référence des activités (type « UMR Silva »), avec le nom du
 * pôle en médaillon central. Les photos viennent de `public/assets/bandeau/` ; pour
 * les remplacer, déposer un nouveau fichier du même nom (ou ajuster `TUILES`
 * ci-dessous) — aucune autre modification n'est nécessaire.
 */
@Component({
  selector: 'app-bandeau-activites',
  template: `
    <div class="bandeau" role="img" aria-label="Aperçus des activités du pôle : sciage, anatomie et chimie du bois">
      @for (t of TUILES; track t.fichier) {
        <div class="tuile">
          <img [src]="'/assets/bandeau/' + t.fichier" [alt]="t.legende" loading="lazy" />
          <span class="voile" aria-hidden="true"></span>
          <span class="legende">{{ t.legende }}</span>
        </div>
      }
      <div class="medaillon">
        <span>Pôle Forêt-Bois-Matériaux</span>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .bandeau {
      position: relative;
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      height: clamp(200px, 32vw, 340px);
    }
    .tuile {
      position: relative;
      overflow: hidden;
    }
    .tuile img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    .voile {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgb(0 0 0 / 0.55), transparent 55%);
    }
    .legende {
      position: absolute;
      left: 10px;
      bottom: 10px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: #fff;
      text-shadow: 0 1px 3px rgb(0 0 0 / 0.55);
    }
    .medaillon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      border: 1px solid var(--filet);
      border-radius: 999px;
      padding: 14px 28px;
      box-shadow: 0 10px 30px rgb(0 0 0 / 0.18);
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: var(--t-m);
      color: var(--encre);
      white-space: nowrap;
    }
    @media (max-width: 760px) {
      .bandeau {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(2, 1fr);
      }
      .medaillon {
        padding: 10px 18px;
        font-size: var(--t-s);
      }
    }
  `,
})
export class BandeauActivites {
  protected readonly TUILES: Tuile[] = [
    { legende: 'Sciage et transformation', fichier: 'sciage.jpg' },
    { legende: 'Anatomie du bois', fichier: 'anatomie.jpg' },
    { legende: 'Paroi cellulaire du bois', fichier: 'paroi-cellulaire.jpg' },
    { legende: 'Extraction de la lignine', fichier: 'extraction-lignine.jpg' },
    { legende: 'Essais de durabilité', fichier: 'essais-durabilite.jpg' },
    { legende: 'Cernes de croissance', fichier: 'cernes-croissance.jpg' },
  ];
}
