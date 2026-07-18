export default {
  kind: "collectionType",
  collectionName: "partners",
  info: {
    singularName: "partner",
    pluralName: "partners",
    displayName: "Partner",
  },
  options: { draftAndPublish: true },
  attributes: {
    name: { type: "string", required: true },
    logo: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
    },
    order: { type: "integer", default: 0 },
  },
};
