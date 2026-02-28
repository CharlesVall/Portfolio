import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { SeoConfig } from '@core/models/';
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
    this.applyMetaTags(seo);
    this.setCanonical(seo.canonical);
  }

  private applyMetaTags(seo: SeoConfig): void {
    const tags: MetaDefinition[] = [
      ...this.buildCoreTags(seo),
      ...this.buildOpenGraphTags(seo),
      ...this.buildTwitterTags(seo),
    ];

    tags.forEach((tag) => this.meta.updateTag(tag));
  }

  private buildCoreTags(seo: SeoConfig): MetaDefinition[] {
    return [
      { name: 'description', content: seo.description },
      {
        name: 'robots',
        content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
      },
    ];
  }

  private buildOpenGraphTags(seo: SeoConfig): MetaDefinition[] {
    const canonical = seo.canonical ?? this.doc.URL;

    const tags: MetaDefinition[] = [
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: seo.type ?? 'website' },
      { property: 'og:url', content: canonical },
    ];

    if (seo.image) {
      tags.push(
        { property: 'og:image', content: seo.image },
        { property: 'og:image:alt', content: seo.imageAlt ?? seo.title },
      );

      if (seo.imageWidth) {
        tags.push({ property: 'og:image:width', content: String(seo.imageWidth) });
      }
      if (seo.imageHeight) {
        tags.push({ property: 'og:image:height', content: String(seo.imageHeight) });
      }
    }

    return tags;
  }

  private buildTwitterTags(seo: SeoConfig): MetaDefinition[] {
    const tags: MetaDefinition[] = [
      { name: 'twitter:card', content: seo.twitterCard ?? 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
    ];

    if (seo.image) {
      tags.push(
        { name: 'twitter:image', content: seo.image },
        { name: 'twitter:image:alt', content: seo.imageAlt ?? seo.title },
      );
    }

    return tags;
  }

  private setCanonical(url?: string): void {
    if (!url) return;

    const link =
      this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
      this.createCanonicalLink();

    link.setAttribute('href', url);
  }

  private createCanonicalLink(): HTMLLinkElement {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    return link;
  }
}