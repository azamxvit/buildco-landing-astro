export default {
  kind: "collectionType",
  collectionName: "vacancies",
  info: {
    singularName: "vacancy",
    pluralName: "vacancies",
    displayName: "Vacancy",
  },
  options: { draftAndPublish: true },
  pluginOptions: {
    i18n: { localized: true },
  },
  attributes: {
    title: {
      type: "string",
      required: true,
      pluginOptions: { i18n: { localized: true } },
    },
    requirements: {
      type: "json",
      pluginOptions: { i18n: { localized: true } },
    },
    contact: { type: "string" },
    active: { type: "boolean", default: true },
  },
};
