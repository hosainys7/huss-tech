import React, { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, Wrench, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "33773148264";

function waUrl(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ─── Types ─────────────────────────────────────────────────── */

export type ServiceOption = {
  id: string;
  title: string;
  description: string;
  pricePreview: string;
  price: string;
  includes: string[];
  whatsappMessage: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  options: ServiceOption[];
};

/* ─── Data ─────────────────────────────────────────────────── */

export const categories: ServiceCategory[] = [
  {
    id: "web",
    title: "Sites web",
    description:
      "Création de sites modernes pour présenter votre activité et faciliter le contact avec vos clients.",
    tags: ["Landing page", "Site vitrine", "Maintenance"],
    icon: <Globe size={26} strokeWidth={1.5} />,
    options: [
      {
        id: "landing",
        title: "Landing page",
        description:
          "Site 1 page pour présenter rapidement votre activité, vos services et vos contacts.",
        pricePreview: "300–500 €",
        price: "300–500 €",
        includes: [
          "Site 1 page",
          "Présentation de l'activité",
          "Design adapté mobile",
          "Bouton contact / WhatsApp",
          "Paiement possible en 2 fois",
        ],
        whatsappMessage:
          "Bonjour, je voudrais avoir plus d'informations pour une landing page pour mon activité.",
      },
      {
        id: "vitrine",
        title: "Site vitrine",
        description:
          "Site de 3 à 5 pages pour une présence plus complète et professionnelle.",
        pricePreview: "600–900 €",
        price: "600–900 €",
        includes: [
          "3 à 5 pages",
          "Présentation complète de l'activité",
          "Pages services / contact",
          "Design adapté mobile",
          "Paiement possible en 2 fois",
        ],
        whatsappMessage:
          "Bonjour, je suis intéressé par un site vitrine pour mon commerce à Marseille.",
      },
      {
        id: "maintenance",
        title: "Maintenance mensuelle",
        description:
          "Petites modifications, suivi du site et support de base.",
        pricePreview: "30 €/mois",
        price: "30 €/mois",
        includes: [
          "Petites modifications",
          "Suivi du site",
          "Support de base",
          "Ajout simple de contenu",
        ],
        whatsappMessage:
          "Bonjour, je voudrais des informations concernant la maintenance mensuelle du site.",
      },
      {
        id: "contenu",
        title: "Ajout de contenu",
        description:
          "Ajout de textes, images ou nouvelles sections sur un site existant.",
        pricePreview: "30–40 €/h",
        price: "30–40 €/h",
        includes: [
          "Ajout de textes",
          "Intégration d'images",
          "Nouvelles sections",
          "Facturation à l'heure",
        ],
        whatsappMessage:
          "Bonjour, je voudrais ajouter du contenu sur mon site existant. Est-ce possible d'avoir un devis ?",
      },
    ],
  },
  {
    id: "support",
    title: "Support informatique",
    description:
      "Dépannage pratique pour ordinateurs, logiciels, lenteurs, virus et remplacement de pièces.",
    tags: ["Logiciel", "Matériel", "Diagnostic"],
    icon: <Wrench size={26} strokeWidth={1.5} />,
    options: [
      {
        id: "diagnostic",
        title: "Diagnostic + devis",
        description:
          "Analyse du problème et proposition d'une solution claire avant intervention.",
        pricePreview: "25 €",
        price: "25 €",
        includes: [
          "Analyse du problème",
          "Vérification de l'état de l'ordinateur",
          "Devis clair avant intervention",
          "Déduit si réparation effectuée",
        ],
        whatsappMessage:
          "Bonjour, j'ai un problème avec mon ordinateur et je voudrais un diagnostic.",
      },
      {
        id: "depannage",
        title: "Dépannage logiciel / virus",
        description:
          "Suppression virus, résolution bugs logiciels, lenteurs et optimisation système.",
        pricePreview: "40–60 €",
        price: "40–60 €",
        includes: [
          "Suppression virus",
          "Résolution bugs logiciels",
          "Optimisation système",
          "Nettoyage logiciel",
        ],
        whatsappMessage:
          "Bonjour, mon ordinateur a un problème logiciel / virus. Est-ce possible d'avoir un devis ?",
      },
      {
        id: "windows",
        title: "Réinstallation Windows",
        description:
          "Réinstallation propre, configuration de base et préparation de l'ordinateur.",
        pricePreview: "60–80 €",
        price: "60–80 €",
        includes: [
          "Réinstallation propre",
          "Configuration de base",
          "Préparation de l'ordinateur",
          "Conseils d'utilisation",
        ],
        whatsappMessage:
          "Bonjour, je voudrais une réinstallation Windows pour mon ordinateur.",
      },
      {
        id: "piece",
        title: "Remplacement pièce",
        description:
          "Remplacement de pièce après diagnostic, main d'œuvre séparée du coût de la pièce.",
        pricePreview: "40–60 € + pièce",
        price: "40–60 € + pièce",
        includes: [
          "Diagnostic avant remplacement",
          "Main d'œuvre séparée du prix de la pièce",
          "Validation avant intervention",
          "Installation de la pièce",
        ],
        whatsappMessage:
          "Bonjour, je voudrais des informations pour un remplacement de pièce sur mon ordinateur.",
      },
    ],
  },
];

/* ─── Sub-components ────────────────────────────────────────── */

function ServiceCategoryCard({
  category,
  isSelected,
  onClick,
}: {
  category: ServiceCategory;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-7 border transition-all duration-200 hover:-translate-y-0.5 focus:outline-none ${
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-lg"
          : "bg-background border-border/60 shadow-sm hover:shadow-md hover:border-primary/30"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${
          isSelected ? "bg-white/15 text-white" : "bg-primary/8 text-primary"
        }`}
      >
        {category.icon}
      </div>

      <h3 className={`text-lg font-semibold mb-2 ${isSelected ? "text-white" : "text-foreground"}`}>
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

function ServiceOptionCard({
  option,
  isSelected,
  onClick,
}: {
  option: ServiceOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 focus:outline-none ${
        isSelected
          ? "bg-white border-primary shadow-md ring-1 ring-primary/30"
          : "bg-background border-border/60 shadow-sm hover:shadow-md hover:border-primary/25"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold mb-1 ${isSelected ? "text-primary" : "text-foreground"}`}>
            {option.title}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {option.description}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2">
          <span className="text-sm font-bold text-primary whitespace-nowrap">
            {option.pricePreview}
          </span>
          {isSelected && (
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check size={11} className="text-white" strokeWidth={3} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function ServiceDetailPanel({ option }: { option: ServiceOption }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white/70 backdrop-blur-md border border-border/50 rounded-2xl p-7 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-foreground">{option.title}</h4>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{option.description}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-muted-foreground font-medium mb-0.5">Prix</p>
          <p className="text-2xl font-bold text-primary tracking-tight">{option.price}</p>
        </div>
      </div>

      <div className="border-t border-border/40 pt-5 mb-7">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Inclus
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {option.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
              <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check size={10} className="text-primary" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm flex-1 sm:flex-none"
        >
          Demander un devis
          <ChevronRight size={15} />
        </a>
        <a
          href={waUrl(option.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-background border border-border text-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-foreground/5 transition-all hover:-translate-y-0.5 shadow-sm flex-1 sm:flex-none"
        >
          <FaWhatsapp size={16} className="text-[#25D366]" />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Props ─────────────────────────────────────────────────── */

type ServiceSelectorProps = {
  selectedCategoryId: string | null;
  selectedOptionId: string | null;
  onCategorySelect: (categoryId: string) => void;
  onOptionSelect: (optionId: string) => void;
  onReset: () => void;
};

/* ─── Main Component ────────────────────────────────────────── */

export default function ServiceSelector({
  selectedCategoryId,
  selectedOptionId,
  onCategorySelect,
  onOptionSelect,
  onReset,
}: ServiceSelectorProps) {
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) ?? null;
  const selectedOption = selectedCategory?.options.find((o) => o.id === selectedOptionId) ?? null;

  function handleCategoryClick(id: string) {
    onCategorySelect(id);
    setTimeout(() => {
      optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  function handleOptionClick(id: string) {
    onOptionSelect(selectedOptionId === id ? "" : id);
  }

  return (
    <section id="services" className="py-24 bg-card/60">
      <div className="container mx-auto px-4 max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Services simples pour les commerces à Marseille
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Choisissez un service pour voir les options et les tarifs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ServiceCategoryCard
                category={cat}
                isSelected={selectedCategoryId === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              key={selectedCategory.id}
              ref={optionsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Options — {selectedCategory.title}
                </p>
                <button
                  onClick={onReset}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-primary/6"
                >
                  ↩ Réinitialiser
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCategory.options.map((opt) => (
                  <ServiceOptionCard
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

        <AnimatePresence mode="wait">
          {selectedOption && (
            <ServiceDetailPanel key={selectedOption.id} option={selectedOption} />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
