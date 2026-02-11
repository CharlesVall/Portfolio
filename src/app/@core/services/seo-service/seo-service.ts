import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { SeoConfig } from '@core/models/seo-config';
import { SEO_DEFAULTS } from '@core/tokens/seo-defaults.token';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly defaults = inject(SEO_DEFAULTS);

  public update(config: Partial<SeoConfig>): void {
    const seo = { ...this.defaults, ...config } as SeoConfig;

    this.title.setTitle(seo.title);
    
    const tags: MetaDefinition[] = [
      { name: 'description', content: seo.description },
      { name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow' },
      // Open Graph
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: seo.canonical ?? this.doc.URL },
      // Twitter card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
    ];

    if (seo.image) {
      tags.push(
        { property: 'og:image', content: seo.image },
        { name: 'twitter:image', content: seo.image }
      );
      if (seo.imageAlt) {
        tags.push({ property: 'og:image:alt', content: seo.imageAlt });
      }
    }

    tags.forEach((tag) => this.meta.updateTag(tag));
    this.setCanonical(seo.canonical);
  }

  private setCanonical(url?: string): void {
    if (!url) return;
    
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }
}