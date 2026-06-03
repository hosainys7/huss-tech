import React from "react";
import { motion } from "framer-motion";
import { Eye, Info, Star } from "lucide-react";

const benefits = [
  {
    icon: <Eye size={18} strokeWidth={1.8} />,
    title: "Plus de visibilité",
    desc: "Vos clients trouvent plus facilement votre activité et vos informations.",
  },
  {
    icon: <Info size={18} strokeWidth={1.8} />,
    title: "Informations claires",
    desc: "Services, horaires et coordonnées accessibles rapidement.",
  },
  {
    icon: <Star size={18} strokeWidth={1.8} />,
    title: "Image professionnelle",
    desc: "Une présence en ligne cohérente qui inspire davantage confiance.",
  },
];

export default function AboutHussTech() {
  return (
    <section id="apropos" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              À propos
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6 leading-[1.15]">
              À propos de Huss Tech
            </h2>
            <div className="flex flex-col gap-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Aujourd'hui, beaucoup de commerces, restaurants, hôtels et indépendants s'appuient
                principalement sur les réseaux sociaux pour présenter leur activité.
              </p>
              <p>
                Mais les informations importantes sont souvent dispersées, difficiles à retrouver ou
                incomplètes pour les clients.
              </p>
              <p>
                Huss Tech aide les entreprises locales à Marseille à construire une présence en ligne
                simple, claire et professionnelle grâce à des sites modernes, adaptés aux besoins
                réels du terrain.
              </p>
              <p>
                L'objectif est simple : permettre à vos futurs clients de comprendre rapidement ce
                que vous proposez et de vous contacter facilement.
              </p>
            </div>
          </motion.div>

          {/* Benefit cards */}
          <div className="flex flex-col gap-4">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex items-start gap-4 bg-card border border-border/60 rounded-2xl px-5 py-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
