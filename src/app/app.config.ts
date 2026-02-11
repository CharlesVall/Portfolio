import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { SEO_DEFAULTS } from '@core/tokens/seo-defaults.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: SEO_DEFAULTS,
      useValue: {
        title: 'Pierre-Charles Sénard--Vallois - Développeur web',
        description: 'Portfolio professionnel | Angular . PixiJS . GSAP',
        image: 'portefolio-preview-resized.jpg',
        imageAlt: 'Une preview du portfolio du développeur.jpg',
        type: 'portfolio'
      }
    }
  ]
};
