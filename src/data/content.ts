import type { ModeContent } from '../types';

// Real brand colors extracted via browser DevTools:
// krankenfahrten-irmak.de: green #009418 (text/links), red #b70009 (dividers), dark-red #830000 (hero bg)
// taxi-bretten.de: yellow #e9c704 (links/headers)

export const IMAGES = {
  krankenHero: '/images/hero-kranken.jpg',
  taxiHero: '/images/hero-taxi.jpg',
  taxiBretten: '/images/location-bretten.jpg',
  taxiOberderdingen: '/images/location-oberderdingen.jpg',
  taxiVaihingen: '/images/location-vaihingen.jpg',
};

export const krankenfahrtenContent: ModeContent = {
  tagline: 'Direkt. Fürsorglich. Pünktlich.',
  headline: 'Krankenfahrten\nmit Herz',
  subheadline: 'Sicher ans Ziel — sitzend, liegend oder im Rollstuhl. Alle Kassen, direkte Abrechnung.',
  ctaPrimary: 'Jetzt anrufen',
  ctaSecondary: 'Unsere Leistungen',
  heroImage: IMAGES.krankenHero,

  stats: [
    { value: '15+', label: 'Jahre Erfahrung' },
    { value: '100%', label: 'GKV direkt' },
    { value: '24/7', label: 'Notfälle' },
    { value: '2', label: 'Standorte' },
  ],

  testimonials: [
    {
      text: 'Pünktlich, freundlich und professionell. Das Team begleitet mich seit Jahren zu meinen Dialyseterminen.',
      author: 'Heinz M., Patient',
      stars: 5,
    },
    {
      text: 'Die Fahrer sind medizinisch geschult — das gibt mir als Rollstuhlfahrerin ein sicheres Gefühl. Absolute Empfehlung!',
      author: 'Ingrid K., Patientin',
      stars: 5,
    },
    {
      text: 'Unkomplizierte Abrechnung mit der Krankenkasse. Ich musste mich um nichts kümmern.',
      author: 'Thomas R., Patient',
      stars: 5,
    },
  ],

  services: [
    {
      icon: 'Stethoscope',
      title: 'Krankentransport',
      description: 'Transport zu Arzt, Krankenhaus oder Reha — durch ausgebildetes Fachpersonal begleitet.',
    },
    {
      icon: 'Accessibility',
      title: 'Rollstuhltaxi',
      description: 'Barrierefreie Fahrzeuge für Rollstuhlfahrer. Abholung an der Tür, Begleitung bis ans Ziel.',
    },
    {
      icon: 'Zap',
      title: 'Dialysefahrten',
      description: 'Regelmäßige, pünktliche Fahrten zu Dialyseterminen — wir passen uns Ihrem Zeitplan an.',
    },
    {
      icon: 'Heart',
      title: 'Bestrahlungsfahrten',
      description: 'Einfühlsame Begleitung zu Bestrahlung und Chemotherapie. Ihre Sicherheit hat Priorität.',
    },
    {
      icon: 'Building2',
      title: 'Hospitaltransfer',
      description: 'Günstige Alternative zum Krankenwagen — Abholung direkt aus dem Krankenzimmer.',
    },
    {
      icon: 'MapPin',
      title: 'Kurfahrten & Reha',
      description: 'Langstreckenfahrten zu Kurorten und Rehabilitationszentren bundesweit.',
    },
  ],

  usps: [
    {
      icon: 'ShieldCheck',
      title: 'Ausgebildetes Fachpersonal',
      description: 'Krankenpfleger & med. Fachangestellte — Ihre Gesundheit in besten Händen.',
    },
    {
      icon: 'Clock',
      title: '24/7 Erreichbarkeit',
      description: 'Tag und Nacht, 365 Tage. Notfallfahrten jederzeit möglich.',
    },
    {
      icon: 'CreditCard',
      title: 'Alle Krankenkassen',
      description: 'Direkte Abrechnung — keine Formulare, kein Aufwand für Sie.',
    },
    {
      icon: 'Star',
      title: 'Seit über 10 Jahren',
      description: 'Erfahrung seit 2010. Hunderte zufriedene Patienten vertrauen uns.',
    },
  ],

  contact: {
    phones: [
      { label: 'Hauptnummer', number: '07041 816743' },
      { label: 'Mobil', number: '07041 8185213' },
    ],
    email: 'info@krankenfahrten-irmak.de',
    address: 'Helene-Lange-Weg 20, 75417 Mühlacker',
    hours: 'Mo–Fr 8–16 Uhr · Notfälle 24/7',
  },

  colors: {
    primary: '#f8faf8',
    secondary: '#f2f2f2',
    accent: '#009418',
    accent2: '#b70009',
    accentLight: '#00b81e',
    bg: '#ffffff',
    surface: '#eef7ee',
    text: '#1a1a1a',
    muted: '#5c5c5c',
  },
};

export const taxiContent: ModeContent = {
  tagline: '24/7 · Bretten · Oberderdingen · Vaihingen/Enz',
  headline: 'Taxi & Transfer\nim Kraichgau',
  subheadline: 'Immer da, wenn Sie uns brauchen. Einfach anrufen — in Minuten bei Ihnen.',
  ctaPrimary: 'Jetzt Taxi rufen',
  ctaSecondary: 'Alle Services',
  heroImage: IMAGES.taxiHero,

  stats: [
    { value: '24/7', label: '365 Tage' },
    { value: '3', label: 'Standorte' },
    { value: '2016', label: 'Gegründet' },
    { value: '10 Min', label: 'Ø Wartezeit' },
  ],

  testimonials: [
    {
      text: 'Immer pünktlich, immer freundlich. Fliege regelmäßig von Stuttgart ab — Taxi Bretten bringt mich zuverlässig hin.',
      author: 'Sandra W., Stammkundin',
      stars: 5,
    },
    {
      text: 'Mitten in der Nacht angerufen und innerhalb von 10 Minuten war das Taxi da. Unglaublicher Service!',
      author: 'Klaus B., Kunde',
      stars: 5,
    },
    {
      text: 'Für Firmenevents buchen wir immer den Shuttleservice. Professionell und absolut zuverlässig.',
      author: 'Petra L., Firmenkundin',
      stars: 5,
    },
  ],

  services: [
    {
      icon: 'Car',
      title: 'Stadtfahrten',
      description: 'Schnell durch Bretten und Umgebung. Kurze Wartezeiten, faire Taxameter-Preise.',
    },
    {
      icon: 'Plane',
      title: 'Flughafentransfer',
      description: 'Transfer zu Stuttgart, Frankfurt, KA/Baden-Baden — pünktlich, garantiert.',
    },
    {
      icon: 'Package',
      title: 'Kurierfahrten',
      description: 'Eilige Pakete, wichtige Dokumente — schnell und sicher ans Ziel.',
    },
    {
      icon: 'Users',
      title: 'Shuttleservice',
      description: 'Gruppen für Events, Firmenfeiern oder Hochzeiten. Bis zu 8 Personen komfortabel.',
    },
    {
      icon: 'Navigation',
      title: 'Pilotfahrten',
      description: 'Begleitfahrten für Sondertransporte. Professionell und diskret.',
    },
    {
      icon: 'PawPrint',
      title: 'Tierbeförderung',
      description: 'Ihr Vierbeiner ist willkommen. Tierfreundliche Fahrten zum Tierarzt.',
    },
  ],

  usps: [
    {
      icon: 'Clock',
      title: '24/7 — 365 Tage',
      description: 'Kein Feiertag, kein Wochenende — wir sind immer erreichbar.',
    },
    {
      icon: 'MapPin',
      title: '3 Standorte',
      description: 'Bretten, Oberderdingen und Vaihingen/Enz — kurze Anfahrtswege.',
    },
    {
      icon: 'Award',
      title: 'Seit 2016 bewährt',
      description: 'Erfahrene Fahrercrew, komfortable Fahrzeugflotte.',
    },
    {
      icon: 'Zap',
      title: 'Schnell & unkompliziert',
      description: 'Einfach anrufen — wir sind in Minuten bei Ihnen.',
    },
  ],

  contact: {
    phones: [
      { label: 'Bretten', number: '07252 94940' },
      { label: 'Oberderdingen', number: '07045 201035' },
      { label: 'Vaihingen/Enz', number: '07042 1020010' },
    ],
    email: 'info@taxi-bretten.de',
    address: 'Melanchthonstr. 113, 75015 Bretten',
    hours: '24 Stunden täglich — 365 Tage im Jahr',
  },

  colors: {
    primary: '#0a0900',
    secondary: '#100f00',
    accent: '#e9c704',
    accent2: '#c4a800',
    accentLight: '#f5d800',
    bg: '#060500',
    surface: '#111000',
    text: '#ffffff',
    muted: '#9a8e48',
  },
};
