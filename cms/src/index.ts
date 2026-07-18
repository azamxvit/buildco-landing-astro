import type { Core } from "@strapi/strapi";
import seed from "../seed/data";

async function seedIfEmpty(strapi: Core.Strapi) {
  try {
    const existing = await strapi.documents("api::service.service").findMany({ limit: 1 });
    if (existing?.length) {
      strapi.log.info("Seed skipped: content already present");
      return;
    }
  } catch (err) {
    strapi.log.warn("Seed check failed, skipping");
    strapi.log.warn(String(err));
    return;
  }

  strapi.log.info("Seeding REAL CONSTRUCTION content…");

  for (const item of seed.services) {
    await strapi.documents("api::service.service").create({
      data: {
        title: item.title,
        slug: item.slug,
        description: item.description,
        features: item.features,
        icon: item.icon,
        order: item.order,
      },
      locale: "ru",
      status: "published",
    });
  }

  for (const item of seed.projects) {
    await strapi.documents("api::project.project").create({
      data: {
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: item.description,
        span: item.span,
      },
      locale: "ru",
      status: "published",
    });
  }

  for (const item of seed.partners) {
    await strapi.documents("api::partner.partner").create({
      data: {
        name: item.name,
        order: item.order,
      },
      status: "published",
    });
  }

  for (const item of seed.certificates) {
    await strapi.documents("api::certificate.certificate").create({
      data: {
        code: item.code,
        title: item.title,
      },
      locale: "ru",
      status: "published",
    });
  }

  for (const item of seed.vacancies) {
    await strapi.documents("api::vacancy.vacancy").create({
      data: {
        title: item.title,
        requirements: item.requirements,
        contact: item.contact,
        active: item.active,
      },
      locale: "ru",
      status: "published",
    });
  }

  strapi.log.info("Seed completed");
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedIfEmpty(strapi);
  },
};
