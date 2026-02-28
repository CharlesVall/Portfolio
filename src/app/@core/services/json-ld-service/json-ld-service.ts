import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { PERSON_JSON_LD } from '@core/tokens/json-ld.token';

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly doc = inject(DOCUMENT);
  private readonly person = inject(PERSON_JSON_LD);

  public injectPersonSchema(): void {
    if (this.doc.querySelector('script[data-schema="person"]')) return;

    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'person');
    script.textContent = JSON.stringify(this.person);
    this.doc.head.appendChild(script);
  }
}