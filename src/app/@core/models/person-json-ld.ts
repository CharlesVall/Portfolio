export interface PersonJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  sameAs?: string[];
}