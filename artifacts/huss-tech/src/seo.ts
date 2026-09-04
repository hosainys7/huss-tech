export type PageMetadata = {
  path: string;
  title: string;
  description: string;
};

export const SITE_URL = "https://www.huss-tech.fr";

export const PUBLIC_PAGES: PageMetadata[] = [
  {
    path: "/",
    title: "Huss Tech — Sites web & informatique à Marseille",
    description:
      "Huss Tech accompagne les commerces et petites entreprises à Marseille avec des sites web professionnels et un support informatique fiable.",
  },
  {
    path: "/services",
    title: "Services web & informatique à Marseille | Huss Tech",
    description:
      "Découvrez les prestations Huss Tech : sites vitrines, e-commerce, support, dépannage informatique et solutions numériques sur mesure à Marseille.",
  },
  {
    path: "/a-propos",
    title: "À propos de Huss Tech | Partenaire numérique à Marseille",
    description:
      "Découvrez Huss Tech, un partenaire local, humain et réactif qui accompagne les petites entreprises marseillaises dans leurs projets numériques.",
  },
  {
    path: "/processus",
    title: "Notre méthode de travail | Huss Tech Marseille",
    description:
      "Découvrez la méthode Huss Tech : échange, proposition claire, réalisation soignée et accompagnement pour concrétiser votre projet numérique.",
  },
  {
    path: "/contact",
    title: "Contact & devis gratuit | Huss Tech Marseille",
    description:
      "Contactez Huss Tech à Marseille pour discuter de votre site web ou besoin informatique. Réponse rapide, conseils clairs et devis gratuit.",
  },
  {
    path: "/faq",
    title: "Questions fréquentes | Services Huss Tech Marseille",
    description:
      "Retrouvez les réponses aux questions fréquentes sur les tarifs, délais, sites web, dépannage et accompagnement informatique proposés par Huss Tech.",
  },
];

export function metadataForPath(pathname: string): PageMetadata {
  const normalized =
    pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return PUBLIC_PAGES.find((page) => page.path === normalized) ?? PUBLIC_PAGES[0];
}