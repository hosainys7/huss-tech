import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Combien de temps pour créer un site ?",
    answer:
      "En général, entre 5 et 10 jours ouvrés selon la complexité du projet. Un site vitrine simple peut être livré en moins d'une semaine. Je vous donne toujours un délai précis avant de commencer.",
  },
  {
    question: "Est-ce que le déplacement est gratuit ?",
    answer:
      "Oui, le déplacement est gratuit pour toute intervention à Marseille et dans les communes proches. Pas de frais cachés, le prix annoncé est le prix final.",
  },
  {
    question: "Peut-on payer en plusieurs fois ?",
    answer:
      "Oui, un paiement en 2 ou 3 fois est possible pour les projets web. On en discute ensemble avant de commencer.",
  },
  {
    question: "Faites-vous les modifications après livraison ?",
    answer:
      "Oui. Une période de retouches est incluse après chaque livraison. Pour des modifications ultérieures, je propose des tarifs simples et transparents.",
  },
  {
    question: "Intervenez-vous à Marseille et alentours ?",
    answer:
      "Oui, j'interviens à Marseille et dans les communes voisines (Aix-en-Provence, Aubagne, Vitrolles, etc.). Le déplacement est compris dans le tarif.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-card/60">
      <div className="container mx-auto px-4 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
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
              transition={{ delay: i * 0.07 }}
              className="bg-background rounded-2xl border border-border/60 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="shrink-0 text-muted-foreground"
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
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
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
