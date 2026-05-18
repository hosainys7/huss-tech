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
      "Il faut généralement votre logo, vos textes, vos photos si vous en avez, vos services, vos tarifs si vous voulez les afficher, et vos informations de contact. Si vous n'avez pas tout, je peux vous aider à structurer le contenu.",
  },
  {
    question: "Est-ce que le déplacement est gratuit ?",
    answer:
      "Oui, le déplacement est gratuit pour les professionnels à Marseille, sur rendez-vous. Le prix est toujours annoncé avant l'intervention.",
  },
  {
    question: "Peut-on payer en plusieurs fois ?",
    answer:
      "Oui, le paiement en 2 fois est possible pour les projets web. Les conditions sont définies avant le début du projet.",
  },
  {
    question: "Faites-vous les modifications après livraison ?",
    answer:
      "Oui. Deux modifications simples sont incluses après la livraison. Pour les modifications supplémentaires, le tarif est clair : 30–40 €/h selon la demande.",
  },
  {
    question: "Est-ce que je suis propriétaire de mon site ?",
    answer:
      "Oui. Une fois le projet payé, le site vous appartient. Je peux aussi vous accompagner pour le nom de domaine, l'hébergement et les petites mises à jour.",
  },
  {
    question: "Intervenez-vous seulement à Marseille ?",
    answer:
      "Oui, pour l'instant les interventions physiques sont uniquement à Marseille. Certaines demandes peuvent être traitées à distance selon le problème.",
  },
  {
    question: "Pouvez-vous supprimer les virus ou réinstaller Windows ?",
    answer:
      "Oui. Je peux faire un diagnostic, supprimer les virus, optimiser le système ou réinstaller Windows si nécessaire. Un devis clair est donné avant l'intervention.",
  },
  {
    question: "Est-ce que mes données sont conservées pendant une réparation ?",
    answer:
      "Je fais attention aux données existantes, mais une sauvegarde est toujours recommandée avant toute intervention importante comme une réinstallation Windows ou un remplacement de pièce.",
  },
  {
    question: "Comment demander un devis ?",
    answer:
      "Vous pouvez envoyer un message via WhatsApp ou le formulaire de contact. Expliquez simplement votre besoin, et je vous réponds avec une solution claire.",
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
              transition={{ delay: i * 0.04 }}
              className={`rounded-2xl border overflow-hidden transition-colors ${
                openIndex === i
                  ? "bg-background border-primary/25 shadow-sm"
                  : "bg-background border-border/60"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    openIndex === i
                      ? "text-primary"
                      : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className={`shrink-0 transition-colors ${
                    openIndex === i ? "text-primary" : "text-muted-foreground"
                  }`}
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
                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3 mx-4 mb-1">
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
