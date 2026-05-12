export type Mode = 'krankenfahrten' | 'taxi';

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface USP {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  text: string;
  author: string;
  stars: number;
}

export interface ContactInfo {
  phones: { label: string; number: string }[];
  email: string;
  address: string;
  hours: string;
}

export interface ModeContent {
  tagline: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: string;
  stats: Stat[];
  testimonials: Testimonial[];
  services: Service[];
  usps: USP[];
  contact: ContactInfo;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    accentLight: string;
    bg: string;
    surface: string;
    text: string;
    muted: string;
  };
}
