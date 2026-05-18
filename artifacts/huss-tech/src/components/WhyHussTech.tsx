import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: <ShieldCheck size={20} strokeWidth={1.8} />,
    title: "Solutions simples",
    desc: "Pas de contrat compliqué. Un problème, une solution, un prix clair.",
  },
  {
    icon: <Zap size={20} strokeWidth={1.8} />,
    title: "Support rapide",
    desc: "Réponse sous 24h. Intervention possible sur place à Marseille.",
  },
];

export default function WhyHussTech() {
  return (
    <section id="pourquoi" className="py-24 bg-card/60">
      <div className="container mx-auto px-4 max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Pourquoi travailler avec moi ?
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Une approche locale, simple et honnête.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background rounded-2xl border border-border/60 p-7 hover:-translate-y-1 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center text-primary mb-4">
                {point.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{point.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
