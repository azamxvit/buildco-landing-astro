export type Locale = "ru" | "en" | "kz";

export const locales: Locale[] = ["ru", "en", "kz"];

export type ServiceId =
  | "construction"
  | "reconstruction"
  | "lowRise"
  | "prefabricated"
  | "general"
  | "pipeSupply"
  | "materialsSupply"
  | "metalSupply"
  | "pipelineWelding"
  | "tankWelding"
  | "steelWelding"
  | "design"
  | "maintenance";

export interface ServiceCopy {
  title: string;
  description: string;
  features: string[];
}

export interface Messages {
  meta: {
    title: string;
    description: string;
  };
  pages: {
    about: { title: string; description: string };
    services: { title: string; description: string };
    projects: { title: string; description: string };
    certificates: { title: string; description: string };
    partners: { title: string; description: string };
    contact: { title: string; description: string };
  };
  brand: {
    name: string;
    legal: string;
    location: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    clients: string;
    certifications: string;
    contact: string;
  };
  cta: {
    primary: string;
    secondary: string;
    call: string;
    submit: string;
    more: string;
    apply: string;
    download: string;
    allServices: string;
    allProjects: string;
  };
  hero: {
    slogan: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    valuesTitle: string;
    values: string[];
    stats: {
      years: string;
      clients: string;
      projects: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    featuresTitle: string;
    items: Record<ServiceId, ServiceCopy>;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    items: Record<string, { title: string; category: string; description: string }>;
  };
  clients: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  certifications: {
    eyebrow: string;
    title: string;
    subtitle: string;
    licenseNote: string;
    download: string;
    items: {
      iso9001: string;
      iso14001: string;
      ohsas: string;
      license: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    mapTitle: string;
    labels: {
      phone: string;
      email: string;
      address: string;
    };
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      consent: string;
      success: string;
      error: string;
      network: string;
    };
  };
  ctaBand: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  floating: {
    whatsapp: string;
    call: string;
    whatsappMessage: string;
  };
}
