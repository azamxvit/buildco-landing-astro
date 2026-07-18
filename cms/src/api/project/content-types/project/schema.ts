export default {
  kind: "collectionType",
  collectionName: "projects",
  info: {
    singularName: "project",
    pluralName: "projects",
    displayName: "Project",
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
    slug: {
      type: "uid",
      targetField: "title",
      required: true,
    },
    category: {
      type: "string",
      pluginOptions: { i18n: { localized: true } },
    },
    description: {
      type: "text",
      pluginOptions: { i18n: { localized: true } },
    },
    client: { type: "string" },
    photos: {
      type: "media",
      multiple: true,
      allowedTypes: ["images"],
    },
    service: {
      type: "relation",
      relation: "manyToOne",
      target: "api::service.service",
    },
    span: {
      type: "enumeration",
      enum: ["normal", "tall", "wide"],
      default: "normal",
    },
  },
};
