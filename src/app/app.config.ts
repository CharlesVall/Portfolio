import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SEO_DEFAULTS } from '@core/tokens/seo-defaults.token';
import { PersonJsonLd, SeoConfig } from '@core/models';
import { PERSON_JSON_LD } from '@core/tokens/json-ld.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: SEO_DEFAULTS,
      useValue: {
        title: 'Pierre-Charles Sénard--Vallois — Développeur web Angular',
        description:
          'Portfolio de Pierre-Charles Sénard--Vallois, développeur web spécialisé Angular, Java Spring Boot.',
        canonical: 'https://portfolio-charlesvall.vercel.app/',
        type: 'website',       
        image: 'https://portfolio-charlesvall.vercel.app/assets/images/portefolio-preview-resized.jpg',
        imageAlt: 'Aperçu du portfolio de Pierre-Charles Sénard--Vallois',
        imageWidth: 1200,
        imageHeight: 630,
        twitterCard: 'summary_large_image',
        noIndex: false,
      } satisfies SeoConfig,
    },
    {
      provide: PERSON_JSON_LD,
      useValue: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Pierre-Charles Sénard--Vallois',
        url: 'https://portfolio-charlesvall.vercel.app',
        jobTitle: 'Développeur web FullStack',
        description: 'Développeur web spécialisé Angular, Java Spring Boot',
        image: 'https://portfolio-charlesvall.vercel.app/assets/images/portefolio-preview-resized.jpg',
        email: 'charlessenardvallois@gmail.com',
        sameAs: [
          'https://github.com/CharlesVall',
          'https:/www.linkedin.com/in/pierre-charles-sénard-vallois',
        ],
      } satisfies PersonJsonLd,
    },
  ],
};