import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Combien de temps pour créer un site ?",
    answer:
      "En général, une landing page peut être prête en 5 à 10 jours ouvrés selon le contenu fourni. Un site vitrine peut prendre plus de temps selon le nombre de pages et les modifications demandées.",
  },
  {
    question: "Qu'est-ce que je dois fournir pour créer mon site ?",
    answer:
      "Il faut généralement votre logo, vos textes, vos photos si vous en avez, vos services et vos informations de contact. Si vous n'avez pas tout, je peux vous aider à organiser le contenu simplement.",
  },
  {
    question: "Peut-on payer en plusieurs fois ?",
    answer:
      "Oui, le paiement en 2 fois est possible pour les projets web. Les modalités sont définies avant le début du projet.",
  },
  {
    question: "Faites-vous les modifications après livraison ?",
    answer:
      "Oui. Deux modifications simples sont incluses après la livraison. Pour les demandes supplémentaires, un tarif clair est appliqué selon le besoin.",
  },
  {
    question: "Pouvez-vous supprimer les virus ou réinstaller Windows ?",
    answer:
      "Oui. Je peux faire un diagnostic, supprimer les virus, optimiser le système ou réinstaller Windows si nécessaire. Un devis clair est donné avant l'intervention.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-24"
      style={{
        background: "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(90,5,5,0.08) 0%, transparent 60%), #0D0D0D",
      }}
    >
      <div className="container mx-auto px-4 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(200,55,55,0.85)" }}>
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
            style={{ color: "rgba(255,255,255,0.92)" }}>
            Questions fréquentes
          </h2>
          <p className="text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Tout ce que vous voulez savoir avant de me contacter.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={openIndex === i ? {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,55,55,0.42)",
                boxShadow: "0 0 32px rgba(90,5,5,0.3)",
              } : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,55,55,0.18)",
                boxShadow: "0 0 20px rgba(90,5,5,0.18)",
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none group"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold transition-colors"
                  style={{ color: openIndex === i ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.82)" }}>
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="shrink-0"
                  style={{ color: openIndex === i ? "rgba(220,90,90,0.8)" : "rgba(255,255,255,0.3)" }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed mx-4 mb-1 pt-3"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                      }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
