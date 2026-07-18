export default {
  kind: "collectionType",
  collectionName: "certificates",
  info: {
    singularName: "certificate",
    pluralName: "certificates",
    displayName: "Certificate",
  },
  options: { draftAndPublish: true },
  pluginOptions: {
    i18n: { localized: true },
  },
  attributes: {
    code: { type: "string", required: true },
    title: {
      type: "string",
      required: true,
      pluginOptions: { i18n: { localized: true } },
    },
    issuedAt: { type: "date" },
    file: {
      type: "media",
      multiple: false,
      allowedTypes: ["files"],
    },
  },
};
