import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, Wrench, Laptop, HardDrive, Check, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "33773148264";
function waUrl(msg: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ─── Situation data (web) ─────────────────────────────────── */

const situations = [
  {
    id: "landing",
    situation: "Je démarre une activité",
    service: "Landing page",
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
    situation: "Je veux développer ma présence",
    service: "Site vitrine",
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
    situation: "J'ai déjà un site",
    service: "Refonte / évolution de site web",
    description:
      "Votre site existe déjà mais il ne reflète plus votre activité ? Une refonte modernise son apparence, améliore ses performances et rend l'expérience plus claire.",
    includes: [
      "Actualiser l'apparence du site",
      "Améliorer la performance et la vitesse",
      "Simplifier la navigation",
      "Adapter l'expérience mobile",
    ],
    whatsappMessage:
      "Bonjour, je voudrais faire une refonte de mon site web existant.",
  },
];

/* ─── Support data ─────────────────────────────────────────── */

const supportSubCategories = [
  {
    id: "logiciel",
    title: "Logiciel",
    icon: <Laptop size={20} strokeWidth={1.5} />,
    description: "Lenteurs, virus, bugs logiciels, réinstallation Windows.",
    options: [
      {
        id: "diagnostic-log",
        title: "Diagnostic + devis",
        description: "Analyse du problème et proposition d'une solution claire avant toute intervention.",
        includes: ["Analyse complète du problème", "Vérification de l'état du système", "Devis clair avant intervention", "Déduit si réparation effectuée"],
        whatsappMessage: "Bonjour, j'ai un problème avec mon ordinateur et je voudrais faire un diagnostic.",
      },
      {
        id: "depannage",
        title: "Dépannage logiciel / virus",
        description: "Suppression virus, résolution de bugs, lenteurs et optimisation du système.",
        includes: ["Suppression virus et malwares", "Résolution de bugs logiciels", "Optimisation et nettoyage système", "Conseils de sécurité"],
        whatsappMessage: "Bonjour, mon ordinateur a un problème logiciel ou virus. Est-ce possible d'avoir un devis ?",
      },
      {
        id: "windows",
        title: "Réinstallation Windows",
        description: "Réinstallation propre, configuration de base et mise en route de l'ordinateur.",
        includes: ["Réinstallation propre de Windows", "Configuration de base", "Mise en route complète", "Conseils d'utilisation"],
        whatsappMessage: "Bonjour, je voudrais une réinstallation Windows pour mon ordinateur.",
      },
    ],
  },
  {
    id: "materiel",
    title: "Matériel",
    icon: <HardDrive size={20} strokeWidth={1.5} />,
    description: "Diagnostic et remplacement de composants défaillants.",
    options: [
      {
        id: "diagnostic-mat",
        title: "Diagnostic + devis",
        description: "Identification du composant défaillant et devis avant toute intervention.",
        includes: ["Analyse matérielle complète", "Identification de la panne", "Devis clair avant intervention", "Déduit si réparation effectuée"],
        whatsappMessage: "Bonjour, j'ai un problème matériel avec mon ordinateur et je voudrais faire un diagnostic.",
      },
      {
        id: "piece",
        title: "Remplacement pièce",
        description: "Remplacement de composant après diagnostic. Main d'œuvre séparée du coût de la pièce.",
        includes: ["Diagnostic avant remplacement", "Main d'œuvre incluse", "Prix de la pièce séparé", "Validation avant intervention"],
        whatsappMessage: "Bonjour, je voudrais des informations pour un remplacement de pièce sur mon ordinateur.",
      },
    ],
  },
];

/* ─── Props ─────────────────────────────────────────────────── */

export type ServiceSelectorProps = {
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;
  selectedOptionId: string | null;
  onReset: () => void;
};

/* ─── Main Component ────────────────────────────────────────── */

export default function ServiceSelector({
  selectedCategoryId,
  selectedSubCategoryId,
  selectedOptionId,
}: ServiceSelectorProps) {
  /* Web situation state */
  const [activeSituationId, setActiveSituationId] = useState<string | null>(null);

  /* Support state */
  const [supportOpen, setSupportOpen] = useState(false);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [activeSupportOptionId, setActiveSupportOptionId] = useState<string | null>(null);

  const supportRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  /* Sync from Nav dropdown */
  useEffect(() => {
    if (selectedCategoryId === "web" && selectedOptionId) {
      setActiveSituationId(selectedOptionId);
    }
    if (selectedCategoryId === "support") {
      setSupportOpen(true);
      if (selectedSubCategoryId) setActiveSubId(selectedSubCategoryId);
      if (selectedOptionId) setActiveSupportOptionId(selectedOptionId);
    }
    if (!selectedCategoryId) {
      setActiveSituationId(null);
    }
  }, [selectedCategoryId, selectedSubCategoryId, selectedOptionId]);

  function toggleSituation(id: string) {
    setActiveSituationId((prev) => (prev === id ? null : id));
  }

  function toggleSub(id: string) {
    setActiveSubId((prev) => (prev === id ? null : id));
    setActiveSupportOptionId(null);
    setTimeout(() => optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  function toggleSupportOption(id: string) {
    setActiveSupportOptionId((prev) => (prev === id ? null : id));
  }

  const activeSub = supportSubCategories.find((s) => s.id === activeSubId) ?? null;

  return (
    <section id="services" className="py-24 bg-[#F2F0EF]">
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
            Choisissez la situation qui correspond à votre activité.
          </p>
        </motion.div>

        {/* ── Web situation cards ── */}
        <div className="flex flex-col gap-4 mb-10">
          {situations.map((s, i) => {
            const isOpen = activeSituationId === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(8px)",
                  border: isOpen ? "1px solid rgba(90,5,5,0.2)" : "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isOpen
                    ? "0 8px 32px rgba(90,5,5,0.08), 0 2px 8px rgba(0,0,0,0.06)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Card header */}
                <button
                  onClick={() => toggleSituation(s.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          background: isOpen ? "rgba(90,5,5,0.1)" : "rgba(0,0,0,0.06)",
                          color: isOpen ? "#5A0505" : "rgba(0,0,0,0.4)",
                        }}
                      >
                        {s.service}
                      </span>
                    </div>
                    <p className={`text-base font-semibold transition-colors ${isOpen ? "text-[#5A0505]" : "text-foreground group-hover:text-[#5A0505]"}`}>
                      {s.situation}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-black/5 pt-4">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                          {s.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                          {s.includes.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-xs text-foreground/75">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: "rgba(90,5,5,0.1)" }}>
                                <Check size={9} strokeWidth={3} style={{ color: "#5A0505" }} />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                          <a
                            href="#contact"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all hover:-translate-y-0.5 shadow-sm flex-1"
                            style={{ background: "#5A0505" }}
                          >
                            Discuter du projet
                            <ChevronRight size={13} />
                          </a>
                          <a
                            href={waUrl(s.whatsappMessage)}
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
              </motion.div>
            );
          })}
        </div>

        {/* ── Support informatique ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          ref={supportRef}
        >
          {/* Support header */}
          <button
            onClick={() => { setSupportOpen((v) => !v); setActiveSubId(null); setActiveSupportOptionId(null); }}
            className="w-full text-left rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all focus:outline-none group mb-3"
            style={{
              background: supportOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              border: supportOpen ? "1px solid rgba(90,5,5,0.15)" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: supportOpen ? "rgba(90,5,5,0.1)" : "rgba(0,0,0,0.05)",
                  color: supportOpen ? "#5A0505" : "rgba(0,0,0,0.4)",
                }}
              >
                <Wrench size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className={`text-base font-semibold transition-colors ${supportOpen ? "text-[#5A0505]" : "text-foreground group-hover:text-[#5A0505]"}`}>
                  Support informatique
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Diagnostic, lenteurs, virus, réinstallation Windows ou remplacement de pièce.
                </p>
              </div>
            </div>
            <motion.span
              animate={{ rotate: supportOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 text-muted-foreground"
            >
              <ChevronDown size={18} />
            </motion.span>
          </button>

          {/* Support content */}
          <AnimatePresence initial={false}>
            {supportOpen && (
              <motion.div
                key="support-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {supportSubCategories.map((sub) => {
                    const isActive = activeSubId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => toggleSub(sub.id)}
                        className="w-full text-left rounded-2xl p-5 transition-all focus:outline-none hover:-translate-y-0.5"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                          border: isActive ? "1px solid rgba(90,5,5,0.2)" : "1px solid rgba(0,0,0,0.07)",
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isActive ? "rgba(90,5,5,0.1)" : "rgba(0,0,0,0.05)",
                              color: isActive ? "#5A0505" : "rgba(0,0,0,0.4)",
                            }}>
                            {sub.icon}
                          </div>
                          <p className={`text-sm font-semibold ${isActive ? "text-[#5A0505]" : "text-foreground"}`}>
                            {sub.title}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{sub.description}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Support options */}
                <AnimatePresence mode="wait">
                  {activeSub && (
                    <motion.div
                      key={activeSub.id}
                      ref={optionsRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {activeSub.options
                        .filter((opt) => !activeSupportOptionId || activeSupportOptionId === opt.id)
                        .map((opt) => {
                          const isSelected = activeSupportOptionId === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className="rounded-2xl overflow-hidden transition-all duration-200"
                              style={{
                                background: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                                border: isSelected ? "1px solid rgba(90,5,5,0.2)" : "1px solid rgba(0,0,0,0.07)",
                              }}
                            >
                              <button
                                onClick={() => toggleSupportOption(opt.id)}
                                className="w-full text-left p-5 focus:outline-none"
                              >
                                <p className={`text-sm font-semibold mb-1 ${isSelected ? "text-[#5A0505]" : "text-foreground"}`}>
                                  {opt.title}
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
                              </button>

                              <AnimatePresence initial={false}>
                                {isSelected && (
                                  <motion.div
                                    key="opt-expanded"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-5 pb-5 border-t border-black/5 pt-3">
                                      <ul className="flex flex-col gap-1.5 mb-4">
                                        {opt.includes.map((item) => (
                                          <li key={item} className="flex items-center gap-2 text-xs text-foreground/75">
                                            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                              style={{ background: "rgba(90,5,5,0.1)" }}>
                                              <Check size={9} strokeWidth={3} style={{ color: "#5A0505" }} />
                                            </span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                      <div className="flex flex-col sm:flex-row gap-2">
                                        <a
                                          href="#contact"
                                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white transition-all hover:-translate-y-0.5 shadow-sm flex-1"
                                          style={{ background: "#5A0505" }}
                                        >
                                          Discuter du problème
                                          <ChevronRight size={12} />
                                        </a>
                                        <a
                                          href={waUrl(opt.whatsappMessage)}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center gap-2 bg-background border border-border text-foreground px-4 py-2.5 rounded-xl font-semibold text-xs hover:bg-foreground/5 transition-all hover:-translate-y-0.5 shadow-sm flex-1"
                                        >
                                          <FaWhatsapp size={13} className="text-[#25D366]" />
                                          WhatsApp
                                        </a>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
