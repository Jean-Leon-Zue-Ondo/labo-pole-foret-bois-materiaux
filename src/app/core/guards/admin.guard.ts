import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

/** Protège /admin : attend la résolution de l'état de connexion Firebase avant de trancher. */
export const adminGuard: CanActivateFn = async () => {
  const auth = inject(Auth, { optional: true });
  const router = inject(Router);
  if (!auth) return router.createUrlTree(['/admin/connexion']);
  const utilisateur = await firstValueFrom(authState(auth));
  return utilisateur ? true : router.createUrlTree(['/admin/connexion']);
};
