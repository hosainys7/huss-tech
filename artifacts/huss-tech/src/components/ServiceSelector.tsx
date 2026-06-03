import React, { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, Wrench, Laptop, HardDrive, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "33773148264";
function waUrl(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ─── Types ────────────────────────────────────────────────── */

export type ServiceOption = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  whatsappMessage: string;
};

export type ServiceSubCategory = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  options: ServiceOption[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  subCategories?: ServiceSubCategory[];
  options?: ServiceOption[];
};

/* ─── Data ─────────────────────────────────────────────────── */

export const categories: ServiceCategory[] = [
  {
    id: "web",
    title: "Création de site web",
    description:
      "Présentez votre activité avec un site professionnel accessible sur mobile, permettant à vos clients de trouver rapidement vos services, vos informations et vos coordonnées.",
    tags: ["Landing page", "Site vitrine", "Refonte"],
    icon: <Globe size={26} strokeWidth={1.5} />,
    options: [
      {
        id: "landing",
        title: "Landing page",
        description:
          "Une page claire pour présenter rapidement votre activité, vos services et vos moyens de contact.",
        includes: [
          "Site 1 page",
          "Design adapté mobile",
          "Présentation de l'activité",
          "Bouton WhatsApp / contact",
          "Paiement possible en 2 fois",
        ],
        whatsappMessage:
          "Bonjour, je voudrais avoir plus d'informations pour une landing page pour mon activité.",
      },
      {
        id: "vitrine",
        title: "Site vitrine",
        description:
          "Un site plus complet pour présenter votre entreprise, vos prestations et vos informations importantes sur plusieurs pages.",
        includes: [
          "3 à 5 pages",
          "Design adapté mobile",
          "Pages services / contact",
          "Présentation complète de l'activité",
          "Paiement possible en 2 fois",
        ],
        whatsappMessage:
          "Bonjour, je suis intéressé par un site vitrine pour mon commerce à Marseille.",
      },
      {
        id: "refonte",
        title: "Refonte / évolution de site web",
        description:
          "Votre site existe déjà mais il ne reflète plus votre activité ? Une refonte permet de moderniser son apparence, d'améliorer ses performances et de rendre l'expérience plus claire pour vos visiteurs.",
        includes: [
          "Actualiser l'apparence du site",
          "Améliorer la performance et la vitesse",
          "Simplifier la navigation",
          "Adapter l'expérience mobile",
        ],
        whatsappMessage:
          "Bonjour, je voudrais faire une refonte de mon site web existant.",
      },
    ],
  },
  {
    id: "support",
    title: "Support informatique",
    description:
      "Un service local pour résoudre les problèmes courants : diagnostic, lenteurs, virus, réinstallation Windows ou remplacement de pièce.",
    tags: ["Logiciel", "Matériel", "Diagnostic"],
    icon: <Wrench size={26} strokeWidth={1.5} />,
    subCategories: [
      {
        id: "logiciel",
        title: "Logiciel",
        description: "Résolution des problèmes logiciels, lenteurs système, virus et réinstallation Windows afin de retrouver un ordinateur stable et fonctionnel.",
        icon: <Laptop size={22} strokeWidth={1.5} />,
        options: [
          {
            id: "diagnostic-log",
            title: "Diagnostic + devis",
            description:
              "Analyse du problème et proposition d'une solution claire avant toute intervention.",
            includes: [
              "Analyse complète du problème",
              "Vérification de l'état du système",
              "Devis clair avant intervention",
              "Déduit si réparation effectuée",
            ],
            whatsappMessage:
              "Bonjour, j'ai un problème avec mon ordinateur et je voudrais faire un diagnostic.",
          },
          {
            id: "depannage",
            title: "Dépannage logiciel / virus",
            description:
              "Suppression virus, résolution de bugs, lenteurs et optimisation du système.",
            includes: [
              "Suppression virus et malwares",
              "Résolution de bugs logiciels",
              "Optimisation et nettoyage système",
              "Conseils de sécurité",
            ],
            whatsappMessage:
              "Bonjour, mon ordinateur a un problème logiciel ou virus. Est-ce possible d'avoir un devis ?",
          },
          {
            id: "windows",
            title: "Réinstallation Windows",
            description:
              "Réinstallation propre, configuration de base et mise en route de l'ordinateur.",
            includes: [
              "Réinstallation propre de Windows",
              "Configuration de base",
              "Mise en route complète",
              "Conseils d'utilisation",
            ],
            whatsappMessage:
              "Bonjour, je voudrais une réinstallation Windows pour mon ordinateur.",
          },
        ],
      },
      {
        id: "materiel",
        title: "Matériel",
        description: "Diagnostic et remplacement de composants pour prolonger la durée de vie de votre ordinateur et éviter les interruptions de travail.",
        icon: <HardDrive size={22} strokeWidth={1.5} />,
        options: [
          {
            id: "diagnostic-mat",
            title: "Diagnostic + devis",
            description:
              "Identification du composant défaillant et devis avant toute intervention matérielle.",
            includes: [
              "Analyse matérielle complète",
              "Identification de la panne",
              "Devis clair avant intervention",
              "Déduit si réparation effectuée",
            ],
            whatsappMessage:
              "Bonjour, j'ai un problème avec mon ordinateur et je voudrais faire un diagnostic.",
          },
          {
            id: "piece",
            title: "Remplacement pièce",
            description:
              "Remplacement de composant après diagnostic. Main d'œuvre séparée du coût de la pièce.",
            includes: [
              "Diagnostic avant remplacement",
              "Main d'œuvre incluse",
              "Prix de la pièce séparé",
              "Validation avant intervention",
            ],
            whatsappMessage:
              "Bonjour, je voudrais des informations pour un remplacement de pièce sur mon ordinateur.",
          },
        ],
      },
    ],
  },
];

/* ─── CategoryCard ─────────────────────────────────────────── */

function CategoryCard({
  category,
  isSelected,
  onClick,
  featured,
}: {
  category: ServiceCategory;
  isSelected: boolean;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 focus:outline-none ${
        featured ? "p-7" : "p-5"
      } ${
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-lg"
          : "bg-background border-border/60 shadow-sm hover:shadow-md hover:border-primary/30"
      }`}
    >
      <div
        className={`rounded-xl flex items-center justify-center mb-5 transition-colors ${
          featured ? "w-12 h-12" : "w-10 h-10"
        } ${
          isSelected ? "bg-white/15 text-white" : "bg-primary/8 text-primary"
        }`}
      >
        {category.icon}
      </div>
      <h3 className={`font-semibold mb-2 ${featured ? "text-lg" : "text-base"} ${isSelected ? "text-white" : "text-foreground"}`}>
        {category.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-5 ${isSelected ? "text-white/75" : "text-muted-foreground"}`}>
        {category.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              isSelected
                ? "bg-white/15 border-white/20 text-white"
                : "bg-foreground/5 border-border/60 text-foreground/70"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ─── SubCategoryCard ──────────────────────────────────────── */

function SubCategoryCard({
  sub,
  isSelected,
  onClick,
}: {
  sub: ServiceSubCategory;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5 focus:outline-none ${
        isSelected
          ? "bg-primary/8 border-primary/40 shadow-md ring-1 ring-primary/20"
          : "bg-background border-border/60 shadow-sm hover:shadow-md hover:border-primary/25"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
          isSelected ? "bg-primary/15 text-primary" : "bg-foreground/5 text-foreground/60"
        }`}
      >
        {sub.icon}
      </div>
      <p className={`text-base font-semibold mb-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
        {sub.title}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">{sub.description}</p>
      {isSelected && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
          <Check size={12} strokeWidth={3} />
          Sélectionné
        </div>
      )}
    </button>
  );
}

/* ─── OptionCard ──────────────────────────────────────────── */

function OptionCard({
  option,
  isSelected,
  onClick,
}: {
  option: ServiceOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isSelected
          ? "bg-white border-primary/30 shadow-lg ring-1 ring-primary/20"
          : "bg-background border-border/60 shadow-sm"
      }`}
    >
      {/* Card header — always visible */}
      <button
        onClick={onClick}
        className="w-full text-left p-5 focus:outline-none"
      >
        <p className={`text-sm font-semibold mb-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
          {option.title}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {option.description}
        </p>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border/30 pt-4">
              <ul className="grid grid-cols-1 gap-2 mb-4">
                {option.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs text-foreground/80">
                    <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check size={9} className="text-primary" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm flex-1"
                >
                  Discuter du projet
                  <ChevronRight size={13} />
                </a>
                <a
                  href={waUrl(option.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-background border border-border text-foreground px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-foreground/5 transition-all hover:-translate-y-0.5 shadow-sm flex-1"
                >
                  <FaWhatsapp size={14} className="text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Props ─────────────────────────────────────────────────── */

export type ServiceSelectorProps = {
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;
  selectedOptionId: string | null;
  onCategorySelect: (categoryId: string) => void;
  onSubCategorySelect: (subCategoryId: string) => void;
  onOptionSelect: (optionId: string) => void;
  onReset: () => void;
};

/* ─── Main Component ────────────────────────────────────────── */

export default function ServiceSelector({
  selectedCategoryId,
  selectedSubCategoryId,
  selectedOptionId,
  onCategorySelect,
  onSubCategorySelect,
  onOptionSelect,
  onReset,
}: ServiceSelectorProps) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;
  const selectedSubCategory =
    selectedCategory?.subCategories?.find((s) => s.id === selectedSubCategoryId) ?? null;

  function handleCategoryClick(id: string) {
    onCategorySelect(id);
    setTimeout(() => {
      subRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  function handleSubCategoryClick(id: string) {
    onSubCategorySelect(id);
    setTimeout(() => {
      optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  function handleOptionClick(id: string) {
    onOptionSelect(selectedOptionId === id ? "" : id);
  }

  const hasSelection = !!selectedCategoryId;
  const webCategory = categories.find((c) => c.id === "web")!;
  const supportCategory = categories.find((c) => c.id === "support")!;

  return (
    <section id="services" className="py-24 bg-card/60">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Que souhaitez-vous améliorer&nbsp;?
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Choisissez une solution adaptée à votre activité.
          </p>
        </motion.div>

        {/* Step 1 — Category cards: show both when none selected, only selected when one is active */}
        <div className="flex flex-col gap-5 mb-10">

          <AnimatePresence initial={false}>
            {(!selectedCategoryId || selectedCategoryId === "web") && (
              <motion.div
                key="web-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CategoryCard
                  category={webCategory}
                  isSelected={selectedCategoryId === "web"}
                  onClick={() => handleCategoryClick("web")}
                  featured
                />
              </motion.div>
            )}

            {(!selectedCategoryId || selectedCategoryId === "support") && (
              <motion.div
                key="support-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <CategoryCard
                  category={supportCategory}
                  isSelected={selectedCategoryId === "support"}
                  onClick={() => handleCategoryClick("support")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 2 — SubCategory (support) or Options (web) */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory.id}
              ref={subRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {selectedCategory.subCategories ? "Type d'intervention" : `Options — ${selectedCategory.title}`}
                </p>
                {hasSelection && (
                  <button
                    onClick={onReset}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-primary/6"
                  >
                    Réinitialiser le choix
                  </button>
                )}
              </div>

              {/* SubCategory cards (support) */}
              {selectedCategory.subCategories && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.subCategories.map((sub) => (
                    <SubCategoryCard
                      key={sub.id}
                      sub={sub}
                      isSelected={selectedSubCategoryId === sub.id}
                      onClick={() => handleSubCategoryClick(sub.id)}
                    />
                  ))}
                </div>
              )}

              {/* Web options — show all when none selected, only selected when one is active */}
              {selectedCategory.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.options
                    .filter((opt) => !selectedOptionId || selectedOptionId === opt.id)
                    .map((opt) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        isSelected={selectedOptionId === opt.id}
                        onClick={() => handleOptionClick(opt.id)}
                      />
                    ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 — Options after subcategory selection (support) */}
        <AnimatePresence mode="wait">
          {selectedSubCategory && (
            <motion.div
              key={selectedSubCategory.id}
              ref={optionsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center px-1 mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Services — {selectedSubCategory.title}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedSubCategory.options
                  .filter((opt) => !selectedOptionId || selectedOptionId === opt.id)
                  .map((opt) => (
                    <OptionCard
                      key={opt.id}
                      option={opt}
                      isSelected={selectedOptionId === opt.id}
                      onClick={() => handleOptionClick(opt.id)}
                    />
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
