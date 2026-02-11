import { InjectionToken } from "@angular/core";
import { SeoConfig } from "@core/models/seo-config";

export const SEO_DEFAULTS = new InjectionToken<Partial<SeoConfig>>(
  'SEO_DEFAULTS'
);