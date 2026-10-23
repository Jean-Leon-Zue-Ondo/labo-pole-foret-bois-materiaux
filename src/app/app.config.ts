import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    environment.routageParFragment
      ? provideRouter(routes, ...optionsRouteur, withHashLocation())
      : provideRouter(routes, ...optionsRouteur),
    provideClientHydration(withEventReplay()),
  ],
};
