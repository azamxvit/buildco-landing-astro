import type { Locale } from "../../messages/types";
import {
  site,
  type CertificationItem,
  type ClientItem,
  type ProjectItem,
  type ServiceItem,
} from "../config/site";

export function getServices(_locale: Locale = "ru"): ServiceItem[] {
  return site.services;
}

export function getServiceBySlug(slug: string, _locale: Locale = "ru"): ServiceItem | undefined {
  return site.getServiceBySlug(slug);
}

export function getProjects(_locale: Locale = "ru"): ProjectItem[] {
  return site.projects;
}

export function getPartners(): ClientItem[] {
  return site.clients;
}

export function getCertificates(_locale: Locale = "ru"): CertificationItem[] {
  return site.certifications;
}
