import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeuix/themes/material';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ThemeState } from './core/store/theme.state';
import { provideStates, provideStore } from '@ngxs/store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          cssLayer: {
            name: 'primeng',
            // order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    MessageService,
    ConfirmationService,
    provideStore([]),
    provideStates([ThemeState]),
  ],
};
