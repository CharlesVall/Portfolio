export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
  // OG / Twitter
  type?: 'website' | 'article' | 'product';
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number
  author?: string;
  // Twitter
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}