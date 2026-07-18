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
    public readonly whatsapp: string,
    public readonly email: string,
    public readonly emailAlt: string,
    public readonly addressRu: string,
    public readonly addressEn: string,
    public readonly addressKz: string,
    public readonly mapEmbedUrl: string,
  ) {}
}

export class ProjectItem {
  constructor(
    public readonly id: string,
    public readonly image: string,
    public readonly categoryKey: string,
    public readonly serviceId: ServiceId,
    public readonly span: "normal" | "tall" | "wide" = "normal",
  ) {}
}

export class ClientItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly logo: string | null = null,
  ) {}
}

export class CertificationItem {
  constructor(
    public readonly id: keyof import("../../messages/types").Messages["certifications"]["items"],
    public readonly code: string,
    public readonly pdf: string | null = null,
  ) {}
}

export class ServiceItem {
  constructor(
    public readonly id: ServiceId,
    public readonly icon: ServiceIcon,
    public readonly slug: string,
  ) {}
}

export class SiteConfig {
  readonly brand = "REAL CONSTRUCTION";
  readonly siteUrl = "https://realconstruction.kz";

  get formspreeEndpoint(): string {
    const id = import.meta.env.PUBLIC_FORMSPREE_ID || "your-form-id";
    return `https://formspree.io/f/${id}`;
  }

  readonly contact = new ContactInfo(
    "+7 (701) 777-94-05",
    "tel:+77017779405",
    "https://wa.me/77017779405",
    "7779405@mail.ru",
    "mn@realconstruction.kz",
    "060026, г. Атырау, микрорайон Атырау, 188А",
    "060026, Atyrau, Atyrau microdistrict, 188A",
    "060026, Атырау қ., Атырау ықшамауданы, 188А",
    "https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22firmId%22%3A%22realconstruction%22%2C%22borderColor%22%3A%22%23f5a623%22%7D",
  );

  readonly nav = [
    { href: "/about", key: "about" as const },
    { href: "/services", key: "services" as const },
    { href: "/projects", key: "projects" as const },
    { href: "/partners", key: "clients" as const },
    { href: "/certificates", key: "certifications" as const },
    { href: "/vacancies", key: "vacancies" as const },
    { href: "/contact", key: "contact" as const },
  ];

  readonly stats = [
    { value: "18+", labelKey: "years" as const },
    { value: "50+", labelKey: "clients" as const },
    { value: "100+", labelKey: "projects" as const },
  ];

  readonly services: ServiceItem[] = [
    new ServiceItem("construction", "crane", "construction"),
    new ServiceItem("reconstruction", "rebuild", "reconstruction"),
    new ServiceItem("lowRise", "home", "low-rise"),
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
    "/images/hero/t1.jpg",
    "/images/hero/t2.jpg",
    "/images/hero/f1.jpg",
    "/images/hero/l1.jpg",
    "/images/hero/f4.jpg",
  ];

  readonly projects: ProjectItem[] = [
    new ProjectItem("p1", "/images/projects/t1.jpg", "construction", "steelWelding", "tall"),
    new ProjectItem("p2", "/images/projects/t2.jpg", "installation", "construction"),
    new ProjectItem("p3", "/images/projects/f1.jpg", "prefabricated", "prefabricated", "wide"),
    new ProjectItem("p4", "/images/projects/f2.jpg", "reconstruction", "reconstruction"),
    new ProjectItem("p5", "/images/projects/f4.jpg", "construction", "construction", "tall"),
    new ProjectItem("p6", "/images/projects/l1.jpg", "installation", "pipelineWelding"),
    new ProjectItem("p7", "/images/projects/l2.jpg", "construction", "general"),
    new ProjectItem("p8", "/images/projects/t3.jpg", "maintenance", "maintenance", "wide"),
  ];

  readonly clients: ClientItem[] = [
    new ClientItem("emba", "АО «Эмбамунайгаз»", "/images/clients/embamunaigas.png"),
    new ClientItem("mmg", "АО «Мангистаумунайгаз»", "/images/clients/mangistaumunaigaz.png"),
    new ClientItem("kto", "Западный филиал АО «Казтрансойл»", "/images/clients/kaztransoil.png"),
    new ClientItem("uas", "ТОО «У-А-С Сервис»"),
    new ClientItem("nasar", "ТОО «NASAR Solutions»", "/images/clients/nasar-solutions.jpg"),
    new ClientItem("green", "ТОО «GREEN ATYRAU»", "/images/clients/green-atyrau.png"),
    new ClientItem("smart", "ТОО «SMART TRANS»"),
    new ClientItem("supra", "ТОО «SUPRA OIL MARKET»"),
    new ClientItem("caspian", "ТОО «CASPIAN CONTRACTORS TRUST»"),
    new ClientItem("kendirli", "ТОО «Кендирли Курылыс»"),
    new ClientItem("aps", "ТОО «ATYRAU PIPELINE SERVICE»"),
    new ClientItem("amggs", "ТОО «Атыраумунайгазгеология-Сервис»"),
    new ClientItem("kami", "ТОО «Камистройсервис»"),
  ];

  readonly certifications: CertificationItem[] = [
    new CertificationItem("iso9001", "ISO 9001", "/certificates/iso-9001.pdf"),
    new CertificationItem("iso14001", "ISO 14001", "/certificates/iso-14001.pdf"),
    new CertificationItem("ohsas", "OHSAS 18001", "/certificates/ohsas-18001.pdf"),
    new CertificationItem("license", "ГСЛ №0002796", "/certificates/license-gsl.pdf"),
  ];

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.services.find((s) => s.slug === slug);
  }
}

export const site = new SiteConfig();
