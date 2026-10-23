import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entete } from './layout/entete';
import { PiedDePage } from './layout/pied-de-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Entete, PiedDePage],
  template: `
    <a class="evitement" href="#contenu">Aller au contenu</a>
    <app-entete />
    <main id="contenu" tabindex="-1">
      <router-outlet />
    </main>
    <app-pied-de-page />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    main {
      flex: 1;
      outline: none;
    }
    .evitement {
      position: absolute;
      left: 12px;
      top: -48px;
      z-index: 20;
      background: var(--vert);
      color: var(--sur-fonce);
      padding: 8px 14px;
      border-radius: 8px;
      font-family: var(--f-titre);
    }
    .evitement:focus {
      top: calc(env(safe-area-inset-top, 0px) + 8px);
    }
  `,
})
export class App {}
