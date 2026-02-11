export interface SeoConfig {
  title: string;
  description: string;

  canonical?: string;

  image?: string;
  imageAlt?: string;

  noIndex?: boolean;

  type?: string;
}