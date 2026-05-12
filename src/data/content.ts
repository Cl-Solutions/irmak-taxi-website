import type { ModeContent } from '../types';

// ── Real brand colors extracted via browser DevTools ────────────────────────
// krankenfahrten-irmak.de: h1/accent = #009418 (rgb 0,148,24), bg = #d9ffdd
// taxi-bretten.de:         h2/links  = #e9c704 (rgb 233,199,4), hero bg-image available

export const IMAGES = {
  krankenHero: 'https://u.jimcdn.com/cms/o/sd5b20d1df9ec4b7e/emotion/crop/header.jpg?t=1459890516',
  krankenContent: 'https://image.jimcdn.com/app/cms/image/transf/dimension=200x1024:format=jpg/path/sd5b20d1df9ec4b7e/image/i19faa002ecc1d03a/version/1705244932/image.jpg',
  taxiHero: 'https://assets.coco-online.de/39021717533041-9oAk9PZS/header-taxi-bretten_full_w.jpg',
  taxiLogo: 'https://assets.coco-online.de/39021717533044-K1tN6Yza/taxi-logo.jpg',
  taxiBretten: 'https://assets.coco-online.de/39021717533037-mqHqAEYZ/Visitenkarte_Bretten.jpg',
  taxiOberderdingen: 'https://assets.coco-online.de/39021717533037-svJ6udP0/Visitenkarte_Oberderdingen.jpg',
  taxiVaihingen: 'https://assets.coco-online.de/39021717533037-RiQjwb3V/Visitenkarte_Vaihingen.jpg',
};

export const krankenfahrtenContent: ModeContent = {
  tagline: 'Ihr zuverlässiger Partner für medizinische Fahrten',
  headline: 'Krankenfahrten\nmit Herz',
  subheadline:
    'Professioneller Patientenbeförderungsdienst im Enzkreis und Kraichgau — sitzend, liegend, oder im Rollstuhl. Qualifiziertes Fachpersonal, direkte Krankenkassenabrechnung.',
  ctaPrimary: 'Jetzt anrufen',
  ctaSecondary: 'Leistungen entdecken',
  heroImage: IMAGES.krankenHero,

  stats: [
    { value: '15+', label: 'Jahre Erfahrung' },
    { value: '24/7', label: 'Erreichbar' },
    { value: '100%', label: 'Krankenkassen' },
    { value: '2', label: 'Standorte' },
  ],

  testimonials: [
    {
      text: 'Pünktlich, freundlich und professionell. Das Team von Krankenfahrten Irmak begleitet mich seit Jahren zu meinen Dialyseterminen.',
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
      description: 'Komfortabler Transport zu Arzt, Krankenhaus oder Reha — durch ausgebildetes Fachpersonal begleitet.',
    },
    {
      icon: 'Accessibility',
      title: 'Rollstuhltaxi',
      description: 'Barrierefreie Fahrzeuge für Rollstuhlfahrer. Abholung direkt an der Tür, Begleitung bis ans Ziel.',
    },
    {
      icon: 'Zap',
      title: 'Dialysefahrten',
      description: 'Regelmäßige, pünktliche Fahrten zu Dialyseterminen — wir passen uns Ihrem Zeitplan an.',
    },
    {
      icon: 'Heart',
      title: 'Bestrahlungsfahrten',
      description: 'Einfühlsame Begleitung zu Bestrahlung und Chemotherapie. Ihre Sicherheit hat oberste Priorität.',
    },
    {
      icon: 'Building2',
      title: 'Hospitaltransfer',
      description: 'Kosteneffiziente Alternative zum Krankenwagen — Abholung direkt aus dem Krankenzimmer.',
    },
    {
      icon: 'MapPin',
      title: 'Kurfahrten & Reha',
      description: 'Bequeme Langstreckenfahrten zu Kurorten und Rehabilitationszentren bundesweit.',
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
    primary: '#0a1a0d',
    secondary: '#0f2214',
    accent: '#009418',
    accentLight: '#00b81e',
    bg: '#060f08',
    surface: '#0f1f12',
    text: '#e8f5ea',
    muted: '#6b9b72',
  },
};

export const taxiContent: ModeContent = {
  tagline: 'Rund um die Uhr für Sie da!',
  headline: 'Taxi & Transfer\nim Kraichgau',
  subheadline:
    'Maxi Car & Enz Taxi GmbH — Ihr zuverlässiger Fahrservice in Bretten, Oberderdingen und Vaihingen/Enz. 24 Stunden, 365 Tage.',
  ctaPrimary: 'Jetzt Taxi rufen',
  ctaSecondary: 'Alle Services',
  heroImage: IMAGES.taxiHero,

  stats: [
    { value: '24/7', label: '365 Tage' },
    { value: '3', label: 'Standorte' },
    { value: '2016', label: 'Gegründet' },
    { value: '∞', label: 'Verfügbar' },
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
    primary: '#0d0c00',
    secondary: '#151300',
    accent: '#e9c704',
    accentLight: '#f5d800',
    bg: '#080700',
    surface: '#121000',
    text: '#f5f0d0',
    muted: '#8a7e40',
  },
};
