import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

const optionsRouteur = [
  withComponentInputBinding(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
  withRouterConfig({ paramsInheritanceStrategy: 'always' }),
];

/**
 * Tant que `environment.firebase.apiKey` n'est pas renseigné (projet Firebase pas encore
 * créé, voir le README), on n'active pas les providers Firebase : les services qui en
 * dépendent (PoleDataService, AuthService) détectent leur absence et se dégradent
 * proprement (listes vides, connexion indisponible) plutôt que de faire planter le site.
 */
const providersFirebase = environment.firebase.apiKey
  ? [
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ]
  : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    environment.routageParFragment
      ? provideRouter(routes, ...optionsRouteur, withHashLocation())
      : provideRouter(routes, ...optionsRouteur),
    provideClientHydration(withEventReplay()),
    ...providersFirebase,
  ],
};
