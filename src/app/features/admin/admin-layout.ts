import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="barre">
      <div class="conteneur ligne">
        <div class="marque">
          <span class="badge">Admin</span>
          <span>Espace membres</span>
        </div>
        <nav aria-label="Sections de l'espace membres">
          <a routerLink="/admin/actualites" routerLinkActive="actif">Actualités</a>
          <a routerLink="/admin/chercheurs" routerLinkActive="actif">Chercheurs</a>
          <a routerLink="/admin/axes" routerLinkActive="actif">Axes de recherche</a>
        </nav>
        <div class="compte">
          <span class="courriel">{{ auth.utilisateur()?.email }}</span>
          <button type="button" class="bouton" (click)="deconnecter()">Se déconnecter</button>
        </div>
      </div>
    </header>

    <router-outlet />
  `,
  styles: `
    .barre {
      background: var(--encre);
      color: var(--fond);
    }
    .ligne {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding-block: 14px;
    }
    .marque {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--f-titre);
      font-weight: 700;
    }
    .badge {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      background: var(--vert);
      color: var(--sur-fonce);
      padding: 2px 8px;
      border-radius: 999px;
    }
    nav {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
    nav a {
      text-decoration: none;
      color: color-mix(in srgb, var(--fond) 75%, transparent);
      padding: 8px 12px;
      border-radius: 8px;
      font-family: var(--f-titre);
      font-weight: 500;
    }
    nav a:hover {
      background: rgb(255 255 255 / 0.08);
      color: var(--fond);
    }
    nav a.actif {
      color: var(--fond);
      background: rgb(255 255 255 / 0.14);
      font-weight: 700;
    }
    .compte {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .courriel {
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: color-mix(in srgb, var(--fond) 70%, transparent);
    }
    .compte .bouton {
      border-color: color-mix(in srgb, var(--fond) 40%, transparent);
      color: var(--fond);
      padding: 6px 14px;
      font-size: var(--t-s);
    }
    .compte .bouton:hover {
      background: rgb(255 255 255 / 0.08);
    }
  `,
})
export class AdminLayout {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected async deconnecter(): Promise<void> {
    await this.auth.deconnexion();
    this.router.navigateByUrl('/admin/connexion');
  }
}
