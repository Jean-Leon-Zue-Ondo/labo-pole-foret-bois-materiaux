import { Component } from '@angular/core';

interface Tuile {
  legende: string;
  ton: 'foret' | 'science' | 'bois';
}

/**
 * Bandeau d'images de référence des activités (type « UMR Silva »), avec le nom du
 * pôle en médaillon central. En l'absence de photographies, chaque tuile affiche
 * une texture CSS tenant lieu d'aperçu.
 *
 * Pour brancher de vraies photos : déposer des fichiers dans `public/assets/bandeau/`
 * (un par tuile, même ordre que `TUILES` ci-dessous) puis, dans le template, remplacer
 * `class="texture ton-{{ t.ton }}"` par `[style.background-image]="'url(/assets/bandeau/' + i + '.jpg)'"`.
 */
@Component({
  selector: 'app-bandeau-activites',
  template: `
    <div class="bandeau" role="img" aria-label="Aperçus des activités du pôle : terrain, laboratoire et matériaux">
      @for (t of TUILES; track t.legende) {
        <div class="tuile">
          <div class="texture" [class]="'ton-' + t.ton"></div>
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
    .texture {
      position: absolute;
      inset: -10%;
    }
    .texture.ton-foret {
      background:
        radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--vert) 55%, transparent), transparent 60%),
        radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--vert-fonce) 65%, transparent), transparent 55%),
        var(--vert-pale);
    }
    .texture.ton-science {
      background:
        repeating-linear-gradient(
          115deg,
          color-mix(in srgb, var(--bleu) 35%, transparent) 0 10px,
          transparent 10px 22px
        ),
        radial-gradient(circle at 75% 25%, color-mix(in srgb, var(--bleu) 55%, transparent), transparent 60%),
        var(--bleu-pale);
    }
    .texture.ton-bois {
      background:
        repeating-radial-gradient(
          circle at 50% 50%,
          var(--cerne-initial) 0 6px,
          var(--cerne-final) 6px 10px
        ),
        var(--marron-pale);
      opacity: 0.9;
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
    { legende: 'Inventaires et placettes', ton: 'foret' },
    { legende: 'Anatomie du bois', ton: 'bois' },
    { legende: 'Chimie et polymères', ton: 'science' },
    { legende: 'Essais et durabilité', ton: 'bois' },
    { legende: 'Télédétection et SIG', ton: 'science' },
    { legende: 'Matériaux biosourcés', ton: 'foret' },
  ];
}
