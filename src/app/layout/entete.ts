import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { PoleStore } from '../core/store/pole.store';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-entete',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    <header class="barre">
      <div class="conteneur ligne">
        <a routerLink="/" class="marque" (click)="fermerTout()">
          <app-logo [taille]="30" />
          <span>Pôle Forêt-Bois-Matériaux</span>
        </a>

        <button
          type="button"
          class="burger"
          [attr.aria-expanded]="menuMobile()"
          aria-controls="navigation-principale"
          (click)="menuMobile.set(!menuMobile())"
        >
          <span class="burger-traits" aria-hidden="true"></span>
          <span class="burger-texte">Menu</span>
        </button>

        <nav id="navigation-principale" class="nav" [class.ouverte]="menuMobile()" aria-label="Navigation principale">
          <a routerLink="/" routerLinkActive="actif" [routerLinkActiveOptions]="{ exact: true }">Accueil</a>
          <a routerLink="/le-pole" routerLinkActive="actif">Le pôle</a>

          <div class="deroulant" [class.ouvert]="axesOuvert()">
            <button
              type="button"
              class="declencheur"
              [class.actif]="dansAxes()"
              [attr.aria-expanded]="axesOuvert()"
              aria-controls="menu-axes"
              (click)="axesOuvert.set(!axesOuvert())"
            >
              Axes de recherche
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div id="menu-axes" class="panneau" [hidden]="!axesOuvert()">
              <ul>
                @for (axe of store.axes(); track axe.slug) {
                  <li>
                    <a [routerLink]="['/axes', axe.slug]" routerLinkActive="actif" [class]="'ton-' + axe.ton">
                      <span class="puce" aria-hidden="true"></span>
                      <span class="texte">
                        <strong>{{ axe.titre }}</strong>
                        <small>{{ axe.accroche }}</small>
                      </span>
                    </a>
                  </li>
                }
              </ul>
              <a routerLink="/axes" class="tous">Vue d'ensemble des axes →</a>
            </div>
          </div>

          <a routerLink="/chercheurs" routerLinkActive="actif">Chercheurs</a>
          <a routerLink="/contact" routerLinkActive="actif">Contact</a>
        </nav>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: env(safe-area-inset-top, 0px);
      z-index: 10;
    }
    .barre {
      background: color-mix(in srgb, var(--fond) 94%, transparent);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--filet);
    }
    .ligne {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-block: 12px;
    }
    .marque {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font-family: var(--f-titre);
      font-weight: 800;
      font-size: 1.05rem;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--f-titre);
      font-weight: 500;
    }
    .nav > a,
    .declencheur {
      text-decoration: none;
      color: var(--encre-douce);
      padding: 8px 12px;
      border-radius: 8px;
      font: inherit;
      background: none;
      border: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .nav > a:hover,
    .declencheur:hover {
      color: var(--encre);
      background: var(--vert-pale);
    }
    .nav > a.actif,
    .declencheur.actif {
      color: var(--vert);
      font-weight: 700;
    }
    .deroulant {
      position: relative;
    }
    .deroulant.ouvert svg {
      transform: rotate(180deg);
    }
    svg {
      transition: transform 0.15s;
    }
    .panneau {
      position: absolute;
      top: calc(100% + 8px);
      left: -12px;
      width: min(420px, calc(100vw - 32px));
      background: var(--surface);
      border: 1px solid var(--filet);
      border-radius: var(--rayon);
      box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
      padding: 8px;
    }
    .panneau ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .panneau li a {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 10px 12px;
      border-radius: 8px;
      text-decoration: none;
    }
    .panneau li a:hover,
    .panneau li a.actif {
      background: var(--ton-pale);
    }
    .puce {
      flex: none;
      width: 10px;
      height: 10px;
      margin-top: 6px;
      border-radius: 50%;
      background: var(--ton);
    }
    .texte {
      display: grid;
      gap: 2px;
    }
    .texte strong {
      font-weight: 700;
      color: var(--encre);
    }
    .texte small {
      font-family: var(--f-texte);
      font-size: var(--t-s);
      color: var(--encre-douce);
      line-height: 1.4;
    }
    .tous {
      display: block;
      margin-top: 4px;
      padding: 10px 12px;
      border-top: 1px solid var(--filet);
      text-decoration: none;
      color: var(--bleu);
      font-weight: 700;
    }
    .burger {
      display: none;
      align-items: center;
      gap: 8px;
      background: none;
      border: 1px solid var(--filet);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: var(--f-titre);
      color: var(--encre);
      cursor: pointer;
    }
    .burger-traits,
    .burger-traits::before,
    .burger-traits::after {
      display: block;
      width: 16px;
      height: 2px;
      background: currentColor;
      position: relative;
    }
    .burger-traits::before,
    .burger-traits::after {
      content: '';
      position: absolute;
      left: 0;
    }
    .burger-traits::before {
      top: -5px;
    }
    .burger-traits::after {
      top: 5px;
    }
    @media (max-width: 900px) {
      .ligne {
        flex-wrap: wrap;
      }
      .burger {
        display: inline-flex;
      }
      .nav {
        display: none;
        flex-basis: 100%;
        flex-direction: column;
        align-items: stretch;
        padding-block: 8px 4px;
      }
      .nav.ouverte {
        display: flex;
      }
      .panneau {
        position: static;
        width: auto;
        box-shadow: none;
        margin: 4px 0 8px;
      }
    }
  `,
})
export class Entete {
  protected readonly store = inject(PoleStore);
  private readonly router = inject(Router);
  private readonly hote = inject(ElementRef<HTMLElement>);

  protected readonly axesOuvert = signal(false);
  protected readonly menuMobile = signal(false);
  protected readonly dansAxes = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        this.dansAxes.set(e.urlAfterRedirects.includes('/axes'));
        this.fermerTout();
      });
  }

  protected fermerTout(): void {
    this.axesOuvert.set(false);
    this.menuMobile.set(false);
  }

  @HostListener('document:keydown.escape')
  protected surEchap(): void {
    this.axesOuvert.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected surClic(evt: MouseEvent): void {
    if (!this.hote.nativeElement.contains(evt.target as Node)) this.fermerTout();
  }
}
