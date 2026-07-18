export default {
  kind: "collectionType",
  collectionName: "services",
  info: {
    singularName: "service",
    pluralName: "services",
    displayName: "Service",
    description: "Company services",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {
    i18n: {
      localized: true,
    },
  },
  attributes: {
    title: {
      type: "string",
      required: true,
      pluginOptions: { i18n: { localized: true } },
    },
    slug: {
      type: "uid",
      targetField: "title",
      required: true,
      pluginOptions: { i18n: { localized: false } },
    },
    description: {
      type: "text",
      pluginOptions: { i18n: { localized: true } },
    },
    features: {
      type: "json",
      pluginOptions: { i18n: { localized: true } },
    },
    icon: {
      type: "string",
    },
    order: {
      type: "integer",
      default: 0,
    },
    gallery: {
      type: "media",
      multiple: true,
      allowedTypes: ["images"],
    },
  },
};
