/**
 * Strapi REST client with static fallback to site.ts / messages.
 */
import {
  site,
  ServiceItem,
  ProjectItem,
  ClientItem,
  CertificationItem,
  type ServiceIcon,
} from "../config/site";
import type { Locale, ServiceId } from "../../messages/types";
import { messages } from "../../messages";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL as string | undefined;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN as string | undefined;

type StrapiListResponse<T> = {
  data: Array<{ id: number; documentId?: string; attributes?: T } & T>;
};

async function strapiFetch<T>(path: string, locale: Locale = "ru"): Promise<T | null> {
  if (!STRAPI_URL) return null;
  const localeMap: Record<Locale, string> = { ru: "ru", en: "en", kz: "kk" };
  const url = new URL(`${STRAPI_URL}/api/${path}`);
  if (!path.includes("partners")) {
    url.searchParams.set("locale", localeMap[locale]);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function unwrap<T extends Record<string, unknown>>(row: { attributes?: T } & T): T {
  return (row.attributes ?? row) as T;
}

export async function getServices(locale: Locale = "ru"): Promise<ServiceItem[]> {
  const json = await strapiFetch<StrapiListResponse<Record<string, unknown>>>(
    "services?sort=order:asc&populate=*",
    locale,
  );
  if (!json?.data?.length) return site.services;

  return json.data.map((row, index) => {
    const a = unwrap(row);
    const slug = String(a.slug ?? `service-${index}`);
    const local = site.services.find((s) => s.slug === slug);
    const id = (local?.id ?? "construction") as ServiceId;
    const icon = (String(a.icon ?? local?.icon ?? "crane") as ServiceIcon);
    return new ServiceItem(id, icon, slug);
  });
}

export async function getServiceBySlug(
  slug: string,
  locale: Locale = "ru",
): Promise<ServiceItem | undefined> {
  const services = await getServices(locale);
  return services.find((s) => s.slug === slug) ?? site.getServiceBySlug(slug);
}

export async function getProjects(locale: Locale = "ru"): Promise<ProjectItem[]> {
  const json = await strapiFetch<StrapiListResponse<Record<string, unknown>>>(
    "projects?populate=*",
    locale,
  );
  if (!json?.data?.length) return site.projects;

  return json.data.map((row, index) => {
    const a = unwrap(row);
    const id = String(a.slug ?? `p${index + 1}`);
    const photos = a.photos as
      | { data?: Array<{ attributes?: { url?: string }; url?: string }> }
      | Array<{ url?: string }>
      | undefined;
    let image = site.projects[index % site.projects.length]?.image ?? "/images/projects/t1.jpg";
    if (Array.isArray(photos) && photos[0]?.url) {
      image = photos[0].url.startsWith("http") ? photos[0].url : `${STRAPI_URL}${photos[0].url}`;
    } else if (photos && "data" in photos && photos.data?.[0]) {
      const u = photos.data[0].attributes?.url ?? photos.data[0].url;
      if (u) image = u.startsWith("http") ? u : `${STRAPI_URL}${u}`;
    }
    const span = String(a.span ?? "normal") as ProjectItem["span"];
    return new ProjectItem(id, image, String(a.category ?? "construction"), "construction", span);
  });
}

export async function getPartners(): Promise<ClientItem[]> {
  const json = await strapiFetch<StrapiListResponse<Record<string, unknown>>>(
    "partners?sort=order:asc&populate=*",
    "ru",
  );
  if (!json?.data?.length) return site.clients;

  return json.data.map((row, index) => {
    const a = unwrap(row);
    const logoField = a.logo as
      | { data?: { attributes?: { url?: string }; url?: string }; url?: string }
      | undefined;
    let logo: string | null = null;
    if (logoField?.url) {
      logo = logoField.url.startsWith("http") ? logoField.url : `${STRAPI_URL}${logoField.url}`;
    } else if (logoField?.data) {
      const u = logoField.data.attributes?.url ?? logoField.data.url;
      if (u) logo = u.startsWith("http") ? u : `${STRAPI_URL}${u}`;
    }
    return new ClientItem(`p-${index}`, String(a.name ?? "Partner"), logo);
  });
}

export async function getCertificates(locale: Locale = "ru"): Promise<CertificationItem[]> {
  const json = await strapiFetch<StrapiListResponse<Record<string, unknown>>>(
    "certificates?populate=*",
    locale,
  );
  if (!json?.data?.length) return site.certifications;

  return json.data.map((row, index) => {
    const a = unwrap(row);
    const file = a.file as
      | { data?: { attributes?: { url?: string }; url?: string }; url?: string }
      | undefined;
    let pdf: string | null = null;
    if (file?.url) {
      pdf = file.url.startsWith("http") ? file.url : `${STRAPI_URL}${file.url}`;
    } else if (file?.data) {
      const u = file.data.attributes?.url ?? file.data.url;
      if (u) pdf = u.startsWith("http") ? u : `${STRAPI_URL}${u}`;
    }
    const id = (["iso9001", "iso14001", "ohsas", "license"] as const)[index % 4];
    return new CertificationItem(id, String(a.code ?? "CERT"), pdf);
  });
}

export async function getVacancies(locale: Locale = "ru") {
  const json = await strapiFetch<StrapiListResponse<Record<string, unknown>>>(
    "vacancies?filters[active][$eq]=true",
    locale,
  );
  if (!json?.data?.length) {
    return Object.entries(messages[locale].vacancies.items).map(([id, item]) => ({
      id,
      title: item.title,
      requirements: item.requirements,
    }));
  }

  return json.data.map((row, index) => {
    const a = unwrap(row);
    return {
      id: String(index),
      title: String(a.title ?? ""),
      requirements: Array.isArray(a.requirements) ? (a.requirements as string[]) : [],
    };
  });
}

export function isStrapiEnabled(): boolean {
  return Boolean(STRAPI_URL);
}
