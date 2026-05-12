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
  services: Service[];
  usps: USP[];
  contact: ContactInfo;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    surface: string;
    text: string;
    muted: string;
  };
}
