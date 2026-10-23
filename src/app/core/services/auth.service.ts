import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { of } from 'rxjs';

/**
 * Authentification de l'espace membres (/admin), adossée à Firebase Authentication.
 * Tant que le projet Firebase n'est pas configuré, `auth` est indisponible : la
 * connexion échoue avec un message explicite plutôt que de planter le site.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth, { optional: true });

  /** undefined = état pas encore connu (premier chargement), null = déconnecté. */
  readonly utilisateur = toSignal(this.auth ? authState(this.auth) : of(null), { initialValue: undefined });
  readonly connecte = computed(() => !!this.utilisateur());
  readonly enCoursDeVerification = computed(() => this.utilisateur() === undefined);

  async connexion(email: string, motDePasse: string): Promise<void> {
    if (!this.auth) {
      throw new Error(
        "Firebase n'est pas configuré : renseigne src/environments/environment.ts (voir le README, section « Espace membres »).",
      );
    }
    await signInWithEmailAndPassword(this.auth, email, motDePasse);
  }

  async deconnexion(): Promise<void> {
    if (!this.auth) return;
    await signOut(this.auth);
  }
}
