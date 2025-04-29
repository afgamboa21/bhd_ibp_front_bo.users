import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';

import { TestIdKitModule } from '@bhd/test-id-kit';
import { provideDataAccess } from '@bhd/data-access';
import {
  ConfigHttpLoader,
  ConfigStaticLoader,
  provideAppConfig,
} from '@bhd/config';

import BhdPreset from './bhd-preset';
import { routes } from './app.routes';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

const appInitializerFn = (): ConfigStaticLoader => {
  return new ConfigHttpLoader('/config/config.json');
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: BhdPreset,
        options: {
          darkModeSelector: '.bhd-dark',
        },
      },
    }),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    importProvidersFrom(
      TestIdKitModule.forRoot({
        isWeb: true,
      }),
    ),
    provideAppConfig(appInitializerFn()),
    provideDataAccess({
      notCancelRequestUrls: ['/i18n/es.json'],
    }),
  ],
};
