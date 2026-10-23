import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  template: `
    <section class="section">
      <div class="conteneur etroit">
        <p class="surtitre">Espace membres</p>
        <h1>Connexion</h1>
        <p class="aide">
          Réservé aux chercheurs du pôle. Votre compte est créé par un administrateur du site
          dans la console Firebase ; contactez la cellule projets si vous n'en avez pas encore.
        </p>

        <form (ngSubmit)="connecter()">
          <label>
            <span>E-mail</span>
            <input type="email" name="email" required autocomplete="username" [(ngModel)]="email" />
          </label>
          <label>
            <span>Mot de passe</span>
            <input type="password" name="motDePasse" required autocomplete="current-password" [(ngModel)]="motDePasse" />
          </label>

          @if (erreur()) {
            <p class="erreur" role="alert">{{ erreur() }}</p>
          }

          <button type="submit" class="bouton plein" [disabled]="enCours()">
            {{ enCours() ? 'Connexion…' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </section>
  `,
  styles: `
    .etroit {
      max-width: 420px;
      padding-block: clamp(48px, 8vw, 96px);
    }
    h1 {
      font-size: var(--t-2xl);
      margin-top: 6px;
    }
    .aide {
      margin-top: 14px;
      color: var(--encre-douce);
    }
    form {
      margin-top: 28px;
      display: grid;
      gap: 16px;
    }
    label {
      display: grid;
      gap: 6px;
      font-family: var(--f-donnee);
      font-size: var(--t-xs);
      color: var(--encre-douce);
    }
    input {
      font: inherit;
      font-family: var(--f-texte);
      font-size: 1rem;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--filet);
      background: var(--surface);
      color: var(--encre);
    }
    .erreur {
      color: #b3261e;
      font-size: var(--t-s);
    }
    button {
      justify-self: start;
    }
  `,
})
export class Connexion {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected motDePasse = '';
  protected readonly enCours = signal(false);
  protected readonly erreur = signal<string | null>(null);

  protected async connecter(): Promise<void> {
    this.erreur.set(null);
    this.enCours.set(true);
    try {
      await this.auth.connexion(this.email, this.motDePasse);
      this.router.navigateByUrl('/admin');
    } catch (e) {
      const message = e instanceof Error && e.message.includes('Firebase') ? e.message : null;
      this.erreur.set(message ?? 'E-mail ou mot de passe incorrect.');
    } finally {
      this.enCours.set(false);
    }
  }
}
