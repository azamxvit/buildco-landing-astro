export type ServiceIcon = "crane" | "rebuild" | "home" | "warehouse" | "draft" | "wrench";

export class ContactInfo {
  constructor(
    public readonly phone: string,
    public readonly phoneHref: string,
    public readonly email: string,
    public readonly addressRu: string,
    public readonly addressEn: string,
    public readonly addressKz: string,
  ) {}
}

export class ProjectItem {
  constructor(
    public readonly id: string,
    public readonly image: string,
    public readonly span: "normal" | "tall" | "wide" = "normal",
  ) {}
}

export class ClientItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly logo: string,
  ) {}
}

export class CertificationItem {
  constructor(
    public readonly id: keyof import("../messages/types").Messages["certifications"]["items"],
    public readonly code: string,
  ) {}
}

export class ServiceItem {
  constructor(
    public readonly id: keyof import("../messages/types").Messages["services"]["items"],
    public readonly icon: ServiceIcon,
  ) {}
}

export class SiteConfig {
  readonly brand = "REAL CONSTRUCTION";
  readonly formspreeEndpoint = "https://formspree.io/f/your-form-id";

  readonly contact = new ContactInfo(
    "+7 (701) 777-94-05",
    "tel:+77017779405",
    "7779405@mail.ru",
    "г. Атырау, мкр. Атырау №188А",
    "Atyrau, Atyrau microdistrict No. 188A",
    "Атырау қ., Атырау ықшамауданы №188А",
  );

  readonly nav = [
    { href: "#about", key: "about" as const },
    { href: "#services", key: "services" as const },
    { href: "#projects", key: "projects" as const },
    { href: "#clients", key: "clients" as const },
    { href: "#certifications", key: "certifications" as const },
    { href: "#contact", key: "contact" as const },
  ];

  readonly stats = [
    { value: "18+", labelKey: "years" as const },
    { value: "50+", labelKey: "clients" as const },
    { value: "100+", labelKey: "projects" as const },
  ];

  readonly services: ServiceItem[] = [
    new ServiceItem("construction", "crane"),
    new ServiceItem("reconstruction", "rebuild"),
    new ServiceItem("lowRise", "home"),
    new ServiceItem("prefabricated", "warehouse"),
    new ServiceItem("design", "draft"),
    new ServiceItem("maintenance", "wrench"),
  ];

  readonly heroSlides = [
    "/images/hero/t1.jpg",
    "/images/hero/t2.jpg",
    "/images/hero/f1.jpg",
    "/images/hero/l1.jpg",
    "/images/hero/f4.jpg",
  ];

  readonly projects: ProjectItem[] = [
    new ProjectItem("p1", "/images/projects/t1.jpg", "tall"),
    new ProjectItem("p2", "/images/projects/t2.jpg"),
    new ProjectItem("p3", "/images/projects/f1.jpg", "wide"),
    new ProjectItem("p4", "/images/projects/f2.jpg"),
    new ProjectItem("p5", "/images/projects/f4.jpg", "tall"),
    new ProjectItem("p6", "/images/projects/l1.jpg"),
    new ProjectItem("p7", "/images/projects/l2.jpg"),
    new ProjectItem("p8", "/images/projects/t3.jpg", "wide"),
  ];

  readonly clients: ClientItem[] = [
    new ClientItem("emba", "АО «Эмбамунайгаз»", "/images/clients/embamunaigas.png"),
    new ClientItem("mmg", "АО «Мангистаумунайгаз»", "/images/clients/mangistaumunaigaz.png"),
    new ClientItem("kto", "АО «Казтрансойл»", "/images/clients/kaztransoil.png"),
    new ClientItem("nasar", "ТОО «NASAR Solutions»", "/images/clients/nasar-solutions.jpg"),
    new ClientItem("green", "ТОО «GREEN ATYRAU»", "/images/clients/green-atyrau.png"),
  ];

  readonly certifications: CertificationItem[] = [
    new CertificationItem("iso9001", "ISO 9001"),
    new CertificationItem("iso14001", "ISO 14001"),
    new CertificationItem("ohsas", "OHSAS 18001"),
    new CertificationItem("license", "ГСЛ №0002796"),
  ];
}

export const site = new SiteConfig();
