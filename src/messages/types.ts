export type Locale = "ru" | "en" | "kz";

export const locales: Locale[] = ["ru", "en", "kz"];

export interface Messages {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    legal: string;
    location: string;
  };
  nav: {
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
    items: {
      construction: { title: string; description: string };
      reconstruction: { title: string; description: string };
      lowRise: { title: string; description: string };
      prefabricated: { title: string; description: string };
      design: { title: string; description: string };
      maintenance: { title: string; description: string };
    };
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, { title: string; category: string }>;
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
}
