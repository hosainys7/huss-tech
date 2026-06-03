import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Wrench, Laptop, HardDrive, Check, ChevronRight, ChevronDown } from "lucide-react";
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
    service: "Présence Locale",
    description:
      "Vous avez besoin d'une présence en ligne simple pour présenter votre activité et permettre à vos clients de vous contacter facilement.",
    pitch:
      "Une solution simple pour être visible, présenter vos services et centraliser vos informations importantes.",
    includes: [
      "Être visible en ligne rapidement",
      "Présenter vos services clairement",
      "Permettre aux clients de vous contacter",
      "Adapté à tous les mobiles",
      "Paiement possible en 2 fois",
    ],
    whatsappMessage:
      "Bonjour, je voudrais avoir plus d'informations pour créer une présence en ligne pour mon activité.",
  },
  {
    id: "vitrine",
    situation: "Je veux renforcer mon image professionnelle",
    service: "Présence Professionnelle",
    description:
      "Présentez vos services, vos réalisations et les informations importantes de votre entreprise dans un espace professionnel complet.",
    pitch:
      "Une présence en ligne plus complète pour inspirer confiance et valoriser votre activité.",
    includes: [
      "Image professionnelle soignée",
      "Présentation complète de l'activité",
      "Pages services et réalisations",
      "Adapté à tous les mobiles",
      "Paiement possible en 2 fois",
    ],
    whatsappMessage:
      "Bonjour, je voudrais renforcer l'image professionnelle de mon commerce à Marseille avec un site complet.",
  },
  {
    id: "refonte",
    situation: "Mon site ne reflète plus mon activité",
    service: "Modernisation de votre site",
    description:
      "Votre site existe déjà mais il ne correspond plus à votre image actuelle ou aux attentes de vos visiteurs.",
    pitch:
      "Modernisez votre image, améliorez l'expérience de vos visiteurs et adaptez votre site aux usages actuels.",
    includes: [
      "Actualiser votre image en ligne",
      "Améliorer l'expérience de vos visiteurs",
      "Optimiser la prise de contact",
      "Adapter votre site aux usages actuels",
    ],
    whatsappMessage:
      "Bonjour, mon site ne correspond plus à mon activité actuelle et je voudrais le moderniser.",
  },
];

/* ─── Support data ─────────────────────────────────────────── */

const supportSubCategories = [
  {
    id: "logiciel",
    title: "Logiciel",
    icon: <Laptop size={18} strokeWidth={1.5} />,
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
    icon: <HardDrive size={18} strokeWidth={1.5} />,
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

/* ─── Card styles ───────────────────────────────────────────── */

const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(200,55,55,0.18)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 0 22px rgba(90,5,5,0.18)",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const cardOpen: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(200,55,55,0.42)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 0 36px rgba(90,5,5,0.32)",
};

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
  const [activeSituationId, setActiveSituationId] = useState<string | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [activeSupportOptionId, setActiveSupportOptionId] = useState<string | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCategoryId === "web" && selectedOptionId) setActiveSituationId(selectedOptionId);
    if (selectedCategoryId === "support") {
      setSupportOpen(true);
      if (selectedSubCategoryId) setActiveSubId(selectedSubCategoryId);
      if (selectedOptionId) setActiveSupportOptionId(selectedOptionId);
    }
    if (!selectedCategoryId) setActiveSituationId(null);
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
    <section
      id="services"
      className="py-24"
      style={{
        background: "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(90,5,5,0.14) 0%, transparent 65%), #080808",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(200,55,55,0.85)" }}>
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
            style={{ color: "rgba(255,255,255,0.92)" }}>
            Comment votre site peut aider votre activité&nbsp;?
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.42)" }}>
            Choisissez la situation qui correspond le mieux à votre entreprise.
          </p>
        </motion.div>

        {/* ── Web situation cards ── */}
        <div className="flex flex-col gap-3 mb-8">
          {situations.map((s, i) => {
            const isOpen = activeSituationId === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={isOpen ? cardOpen : cardBase}
              >
                <button
                  onClick={() => toggleSituation(s.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2"
                      style={{
                        background: isOpen ? "rgba(200,55,55,0.18)" : "rgba(255,255,255,0.08)",
                        color: isOpen ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {s.service}
                    </span>
                    <p className="text-base font-semibold"
                      style={{ color: isOpen ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.85)" }}>
                      {s.situation}
                    </p>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
                    style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

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
                      <div className="px-6 pb-6 pt-3"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <p className="text-sm leading-relaxed mb-3"
                          style={{ color: "rgba(255,255,255,0.5)" }}>
                          {s.description}
                        </p>
                        <p className="text-xs leading-relaxed mb-5 italic"
                          style={{ color: "rgba(200,55,55,0.75)" }}>
                          {s.pitch}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                          {s.includes.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-xs"
                              style={{ color: "rgba(255,255,255,0.65)" }}>
                              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: "rgba(200,55,55,0.25)" }}>
                                <Check size={9} strokeWidth={3} style={{ color: "rgba(220,90,90,0.9)" }} />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                          <a href="#contact"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all hover:-translate-y-0.5 flex-1"
                            style={{ background: "#5A0505", boxShadow: "0 0 16px rgba(90,5,5,0.4)" }}>
                            Discuter du projet
                            <ChevronRight size={13} />
                          </a>
                          <a href={waUrl(s.whatsappMessage)} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all hover:-translate-y-0.5 flex-1"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: "rgba(255,255,255,0.75)",
                            }}>
                            <FaWhatsapp size={14} style={{ color: "#25D366" }} />
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
        >
          <button
            onClick={() => { setSupportOpen((v) => !v); setActiveSubId(null); setActiveSupportOptionId(null); }}
            className="w-full text-left rounded-2xl px-6 py-5 flex items-center justify-between gap-4 focus:outline-none mb-3 transition-all"
            style={supportOpen
              ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,55,55,0.3)", boxShadow: "0 0 24px rgba(90,5,5,0.12)" }
              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                style={{
                  background: supportOpen ? "rgba(200,55,55,0.18)" : "rgba(255,255,255,0.07)",
                  color: supportOpen ? "rgba(220,90,90,0.9)" : "rgba(255,255,255,0.45)",
                }}>
                <Wrench size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold"
                  style={{ color: supportOpen ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.85)" }}>
                  Support informatique
                </p>
                <p className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.38)" }}>
                  Diagnostic, lenteurs, virus, réinstallation Windows ou remplacement de pièce.
                </p>
              </div>
            </div>
            <motion.span animate={{ rotate: supportOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
              style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>
              <ChevronDown size={18} />
            </motion.span>
          </button>

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
                      <button key={sub.id}
                        onClick={() => toggleSub(sub.id)}
                        className="w-full text-left rounded-2xl p-5 transition-all focus:outline-none hover:-translate-y-0.5"
                        style={isActive ? {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(200,55,55,0.3)",
                        } : {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isActive ? "rgba(200,55,55,0.18)" : "rgba(255,255,255,0.07)",
                              color: isActive ? "rgba(220,90,90,0.9)" : "rgba(255,255,255,0.4)",
                            }}>
                            {sub.icon}
                          </div>
                          <p className="text-sm font-semibold"
                            style={{ color: isActive ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.82)" }}>
                            {sub.title}
                          </p>
                        </div>
                        <p className="text-xs leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.38)" }}>
                          {sub.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {activeSub && (
                    <motion.div key={activeSub.id} ref={optionsRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.22 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {activeSub.options
                        .filter((opt) => !activeSupportOptionId || activeSupportOptionId === opt.id)
                        .map((opt) => {
                          const isSel = activeSupportOptionId === opt.id;
                          return (
                            <div key={opt.id} className="rounded-2xl overflow-hidden transition-all"
                              style={isSel ? {
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(200,55,55,0.3)",
                              } : {
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                              }}>
                              <button onClick={() => toggleSupportOption(opt.id)}
                                className="w-full text-left p-5 focus:outline-none">
                                <p className="text-sm font-semibold mb-1"
                                  style={{ color: isSel ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.82)" }}>
                                  {opt.title}
                                </p>
                                <p className="text-xs leading-relaxed"
                                  style={{ color: "rgba(255,255,255,0.4)" }}>
                                  {opt.description}
                                </p>
                              </button>
                              <AnimatePresence initial={false}>
                                {isSel && (
                                  <motion.div key="opt-exp"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-5 pb-5 pt-3"
                                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                      <ul className="flex flex-col gap-1.5 mb-4">
                                        {opt.includes.map((item) => (
                                          <li key={item} className="flex items-center gap-2 text-xs"
                                            style={{ color: "rgba(255,255,255,0.62)" }}>
                                            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                              style={{ background: "rgba(200,55,55,0.22)" }}>
                                              <Check size={9} strokeWidth={3} style={{ color: "rgba(220,90,90,0.9)" }} />
                                            </span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                      <div className="flex flex-col sm:flex-row gap-2">
                                        <a href="#contact"
                                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white transition-all hover:-translate-y-0.5 flex-1"
                                          style={{ background: "#5A0505", boxShadow: "0 0 14px rgba(90,5,5,0.35)" }}>
                                          Discuter du problème
                                          <ChevronRight size={12} />
                                        </a>
                                        <a href={waUrl(opt.whatsappMessage)} target="_blank" rel="noopener noreferrer"
                                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all hover:-translate-y-0.5 flex-1"
                                          style={{
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            color: "rgba(255,255,255,0.75)",
                                          }}>
                                          <FaWhatsapp size={13} style={{ color: "#25D366" }} />
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
