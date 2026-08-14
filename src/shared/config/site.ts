import type { ServiceId } from "../../messages/types";

export type ServiceIcon =
  | "crane"
  | "rebuild"
  | "home"
  | "warehouse"
  | "draft"
  | "wrench"
  | "layers"
  | "pipe"
  | "box"
  | "metal"
  | "pipeline"
  | "tank"
  | "steel";

export class ContactInfo {
  constructor(
    public readonly phone: string,
    public readonly phoneHref: string,
    public readonly whatsappPhone: string,
    public readonly email: string,
    public readonly addressRu: string,
    public readonly addressEn: string,
    public readonly addressKz: string,
    public readonly mapEmbedUrl: string,
    public readonly mapUrl: string,
  ) {}

  whatsappUrl(text: string): string {
    return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(text)}`;
  }
}

export class ProjectItem {
  constructor(
    public readonly id: string,
    public readonly image: string,
    public readonly categoryKey: string,
    public readonly serviceId: ServiceId,
    public readonly span: "normal" | "tall" | "wide" = "normal",
    public readonly clientId: string | null = null,
    /** Shown in the shortlist on the home page */
    public readonly featured: boolean = false,
  ) {}
}

export class ClientItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly logo: string | null = null,
    public readonly shortName: string | null = null,
    /** Display scale for compact marks that need more visual weight */
    public readonly logoLarge: boolean = false,
  ) {}

  get label(): string {
    return this.shortName ?? this.name;
  }
}

export class CertificationItem {
  constructor(
    public readonly id: keyof import("../../messages/types").Messages["certifications"]["items"],
    public readonly code: string,
    public readonly pdf: string | null = null,
    public readonly kind: "certificate" | "award" = "certificate",
    public readonly image: string | null = null,
  ) {}
}

export class ServiceItem {
  constructor(
    public readonly id: ServiceId,
    public readonly icon: ServiceIcon,
    public readonly slug: string,
  ) {}
}

export class DeveloperCredit {
  constructor(
    public readonly name: string,
    public readonly legal: string,
    public readonly bin: string,
    public readonly logo: string,
    public readonly phone: string | null = null,
    public readonly phoneHref: string | null = null,
    public readonly url: string | null = null,
  ) {}
}

export class SiteConfig {
  readonly brand = "REAL CONSTRUCTION CO";
  readonly siteUrl = "https://realconstruction.kz";

  readonly developer = new DeveloperCredit(
    "SULTAN SMART SYSTEM",
    "ТОО «SULTAN SMART SYSTEM»",
    "260640036619",
    "/images/sss-logo.svg",
    "+7 778 102 6710",
    "tel:+77781026710",
  );

  get formEndpoint(): string {
    const formspreeId = import.meta.env.PUBLIC_FORMSPREE_ID;
    if (formspreeId && formspreeId !== "your-form-id") {
      return `https://formspree.io/f/${formspreeId}`;
    }
    return `https://formsubmit.co/ajax/${this.contact.email}`;
  }

  readonly contact = new ContactInfo(
    "+7 (701) 777-94-05",
    "tel:+77017779405",
    "77017779405",
    "rcc@rcckz.kz",
    "г. Атырау, улица Байтурсынова 47А, офис 207",
    "Atyrau, Baitursynov street 47A, office 207",
    "Атырау қ., Байтурсынов көшесі 47А, офис 207",
    "https://www.openstreetmap.org/export/embed.html?bbox=51.90172%2C47.09774%2C51.91172%2C47.10774&layer=mapnik&marker=47.10274%2C51.90672",
    "https://2gis.kz/atyrau/geo/70030076163996775",
  );

  readonly nav = [
    { href: "/about", key: "about" as const },
    { href: "/services", key: "services" as const },
    { href: "/projects", key: "projects" as const },
    { href: "/partners", key: "clients" as const },
    { href: "/certificates", key: "certifications" as const },
    { href: "/contact", key: "contact" as const },
  ];

  readonly stats = [
    { value: "20+", labelKey: "years" as const },
    { value: "500K+", labelKey: "manHours" as const },
    { value: "100+", labelKey: "projects" as const },
  ];

  readonly services: ServiceItem[] = [
    new ServiceItem("construction", "crane", "construction"),
    new ServiceItem("reconstruction", "rebuild", "reconstruction"),
    new ServiceItem("lowRise", "steel", "industrial"),
    new ServiceItem("prefabricated", "warehouse", "prefabricated"),
    new ServiceItem("general", "layers", "general-construction"),
    new ServiceItem("pipeSupply", "pipe", "pipe-supply"),
    new ServiceItem("materialsSupply", "box", "materials-supply"),
    new ServiceItem("metalSupply", "metal", "metal-supply"),
    new ServiceItem("pipelineWelding", "pipeline", "pipeline-welding"),
    new ServiceItem("tankWelding", "tank", "tank-welding"),
    new ServiceItem("steelWelding", "steel", "steel-welding"),
    new ServiceItem("design", "draft", "design"),
    new ServiceItem("maintenance", "wrench", "maintenance"),
  ];

  readonly heroSlides = [
    "/images/hero/rcc-1.jpg",
    "/images/hero/rcc-2.jpg",
    "/images/hero/rcc-3.jpg",
    "/images/hero/rcc-4.jpg",
    "/images/hero/rcc-5.jpg",
  ];

  readonly projects: ProjectItem[] = [
    new ProjectItem("p1", "/images/projects/rcc/rcc-01.jpg", "construction", "steelWelding", "normal", "mcdonalds"),
    new ProjectItem("p2", "/images/projects/rcc/rcc-02.jpg", "construction", "steelWelding", "wide", "mcdonalds"),
    new ProjectItem("p3", "/images/projects/rcc/rcc-03.jpg", "construction", "general", "tall", "mcdonalds"),
    new ProjectItem("p4", "/images/projects/rcc/rcc-04.jpg", "construction", "steelWelding", "tall", "sicim"),
    new ProjectItem("p5", "/images/projects/rcc/rcc-05.jpg", "installation", "pipelineWelding", "normal", "mcdonalds"),
    new ProjectItem("p6", "/images/projects/rcc/rcc-06.jpg", "installation", "steelWelding", "wide", "mcdonalds"),
    new ProjectItem("p7", "/images/projects/rcc/rcc-07.jpg", "installation", "pipelineWelding", "tall", "tengiz"),
    new ProjectItem("p8", "/images/projects/rcc/rcc-08.jpg", "installation", "tankWelding", "tall", "tengiz"),
    new ProjectItem("p9", "/images/projects/rcc/rcc-09.jpg", "installation", "pipelineWelding", "tall", "kentech", true),
    new ProjectItem("p10", "/images/projects/rcc/rcc-10.jpg", "construction", "lowRise", "tall", "ncoc", true),
    new ProjectItem("p11", "/images/projects/rcc/rcc-11.jpg", "installation", "pipelineWelding", "tall", "sicim", true),
    new ProjectItem("p12", "/images/projects/rcc/rcc-12.jpg", "installation", "steelWelding", "tall", "sicim"),
    new ProjectItem("p13", "/images/projects/rcc/rcc-13.jpg", "installation", "tankWelding", "tall", "zamanquantor", true),
    new ProjectItem("p14", "/images/projects/rcc/rcc-14.jpg", "construction", "construction", "wide", "kto"),
    new ProjectItem("p15", "/images/projects/rcc/rcc-15.jpg", "installation", "pipelineWelding", "normal", "metso"),
    new ProjectItem("p16", "/images/projects/rcc/rcc-16.jpg", "installation", "steelWelding", "tall", "metso", true),
    new ProjectItem("p17", "/images/projects/rcc/rcc-17.jpg", "maintenance", "maintenance", "tall", "mimas"),
    new ProjectItem("p18", "/images/projects/rcc/rcc-18.jpg", "installation", "pipelineWelding", "tall", "tyanshan"),
    new ProjectItem("p19", "/images/projects/rcc/rcc-19.jpg", "installation", "tankWelding", "tall", "bonatti"),
    new ProjectItem("p20", "/images/projects/rcc/rcc-20.jpg", "construction", "general", "tall", "foodpackaging"),
    new ProjectItem("p21", "/images/projects/rcc/rcc-21.jpg", "installation", "pipelineWelding", "wide", "bigroup"),
    new ProjectItem("p22", "/images/projects/rcc/rcc-22.jpg", "installation", "steelWelding", "normal", "cct"),
    new ProjectItem("p23", "/images/projects/rcc/rcc-23.jpg", "installation", "pipelineWelding", "tall", "pnhz", true),
    new ProjectItem("p24", "/images/projects/rcc/rcc-24.jpg", "construction", "construction", "normal", "anpz"),
    new ProjectItem("p25", "/images/projects/rcc/rcc-25.jpg", "installation", "tankWelding", "tall", "tengiz"),
    new ProjectItem("p26", "/images/projects/rcc/rcc-26.jpg", "installation", "pipelineWelding", "tall", "ncoc"),
    new ProjectItem("p27", "/images/projects/rcc/rcc-27.jpg", "installation", "steelWelding", "tall", "kpo"),
    new ProjectItem("p28", "/images/projects/rcc/rcc-28.jpg", "construction", "general", "normal", "airliquide"),
    new ProjectItem("p29", "/images/projects/rcc/rcc-29.jpg", "installation", "pipelineWelding", "tall", "sicim"),
    new ProjectItem("p30", "/images/projects/rcc/rcc-30.jpg", "construction", "construction", "normal", "kentech"),
    new ProjectItem("p31", "/images/projects/rcc/rcc-31.jpg", "construction", "general", "tall", "hyundai"),
    new ProjectItem("p32", "/images/projects/rcc/rcc-32.jpg", "construction", "steelWelding", "tall", "mcdonalds"),
    new ProjectItem("p33", "/images/projects/rcc/rcc-33.jpg", "construction", "construction", "tall", "metso"),
    new ProjectItem("p34", "/images/projects/rcc/rcc-34.jpg", "construction", "steelWelding", "wide", "kto"),
    new ProjectItem("p35", "/images/projects/rcc/rcc-35.jpg", "construction", "general", "normal", "zamanquantor"),
    new ProjectItem("p36", "/images/projects/rcc/rcc-36.jpg", "construction", "construction", "normal", "cct"),
    new ProjectItem("p37", "/images/projects/rcc/rcc-37.jpg", "construction", "general", "tall", "pnhz"),
    new ProjectItem("p38", "/images/projects/rcc/rcc-38.jpg", "construction", "general", "tall", "anpz"),
    new ProjectItem("p39", "/images/projects/rcc/rcc-39.jpg", "construction", "materialsSupply", "normal", "mimas"),
    new ProjectItem("p40", "/images/projects/rcc/rcc-40.jpg", "construction", "materialsSupply", "wide", "tyanshan"),
    new ProjectItem("p41", "/images/projects/rcc/rcc-41.jpg", "construction", "general", "normal", "bonatti"),
    new ProjectItem("p42", "/images/projects/rcc/rcc-42.jpg", "construction", "construction", "tall", "foodpackaging"),
    new ProjectItem("p43", "/images/projects/rcc/rcc-43.jpg", "construction", "construction", "tall", "bigroup"),
    new ProjectItem("p44", "/images/projects/rcc/rcc-44.jpg", "construction", "general", "tall", "cpc"),
    new ProjectItem("p45", "/images/projects/rcc/rcc-45.jpg", "construction", "steelWelding", "wide", "tengiz"),
  ];

  readonly clients: ClientItem[] = [
    new ClientItem("tengiz", "Tengizchevroil LLP", "/images/clients/tengizchevroil.svg", "Tengizchevroil"),
    new ClientItem("ncoc", "NCOC", "/images/clients/ncoc.png", "NCOC", true),
    new ClientItem("kpo", "Karachaganak Petroleum Operating B.V.", "/images/clients/kpo.png", "KPO", true),
    new ClientItem("pnhz", "ПНХЗ", "/images/clients/pnhz.png", "ПНХЗ"),
    new ClientItem("anpz", "АНПЗ", "/images/clients/anpz.png", "АНПЗ"),
    new ClientItem("kto", "АО «Казтрансойл»", "/images/clients/kaztransoil.svg", "Казтрансойл"),
    new ClientItem("hyundai", "Hyundai", "/images/clients/hyundai.svg", "Hyundai"),
    new ClientItem("bigroup", "BI Group", "/images/clients/bigroup.png", "BI Group"),
    new ClientItem("mcdonalds", "McDonald's Kazakhstan", "/images/clients/mcdonalds.svg", "McDonald's"),
    new ClientItem("airliquide", "Air Liquide", "/images/clients/airliquide.svg", "Air Liquide"),
    new ClientItem("metso", "Metso Kazakhstan LLP", "/images/clients/metso.svg", "Metso"),
    new ClientItem("cpc", "CPC-Kazakhstan", "/images/clients/cpc.svg", "CPC"),
    new ClientItem("foodpackaging", "Food Packaging KZ LLP", "/images/clients/foodpackaging.png", "Food Packaging"),
    new ClientItem("zamanquantor", "ZamanQuantor LLP", "/images/clients/zamanquantor.png", "ZamanQuantor", true),
    new ClientItem("sicim", "Sicim S.p.A. Kazakhstan", "/images/clients/sicim.svg", "Sicim"),
    new ClientItem("cct", "ТОО «Caspian Contractors Trust»", "/images/clients/cct.png", "CCT"),
    new ClientItem("bonatti", "Bonatti S.p.A.", "/images/clients/bonatti.png", "Bonatti"),
    new ClientItem("mimas", "Mimas Muhendislik Insaat LLP", "/images/clients/mimas.png", "Mimas"),
    new ClientItem("tyanshan", "Tyan-Shan Engineering LLP", "/images/clients/tyanshan.svg", "Tyan-Shan"),
    new ClientItem("kentech", "Kentech LLP", "/images/clients/kentech.svg", "Kentech"),
  ];

  readonly certifications: CertificationItem[] = [
    new CertificationItem(
      "hpuRecognition",
      "500 000 M.H.",
      "/certificates/hpu-500000-mh-recognition.pdf",
      "award",
      "/images/awards/hpu-500000-mh.jpg",
    ),
    new CertificationItem("iso9001", "ISO 9001", "/certificates/iso-9001.pdf"),
    new CertificationItem("iso14001", "ISO 14001", "/certificates/iso-14001.pdf"),
    new CertificationItem("iso45001", "ISO 45001", "/certificates/iso-45001.pdf"),
    new CertificationItem("license", "ГСЛ №0002796", "/certificates/license-gsl.pdf"),
    new CertificationItem("containex", "Containex", "/certificates/containex-certificate.pdf"),
    new CertificationItem("zqRecommendation", "ZamanQuantor", "/certificates/zq-recommendation.pdf"),
    new CertificationItem(
      "containexRecommendation",
      "Containex MA",
      "/certificates/containex-recommendation-ma.pdf",
    ),
    new CertificationItem("containexLetter", "Containex", "/certificates/containex-letter.pdf"),
  ];

  get featuredProjects(): ProjectItem[] {
    const featured = this.projects.filter((project) => project.featured);
    return featured.length > 0 ? featured : this.projects;
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.services.find((s) => s.slug === slug);
  }
}

export const site = new SiteConfig();
