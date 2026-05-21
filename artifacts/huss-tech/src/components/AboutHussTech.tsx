import React from "react";
import { motion } from "framer-motion";

export default function AboutHussTech() {
  return (
    <section id="apropos" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

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
                Huss Tech accompagne les commerces, salons de coiffure, restaurants, hôtels et
                petites entreprises de Marseille dans leur présence en ligne et leurs besoins
                informatiques du quotidien.
              </p>
              <p>
                L'objectif est simple : rendre votre activité plus visible, plus professionnelle
                et plus facile à contacter.
              </p>
              <p>
                Qu'il s'agisse d'une landing page, d'un site vitrine ou d'un dépannage
                informatique, Huss Tech privilégie des solutions simples, rapides et adaptées aux
                besoins réels des petites entreprises.
              </p>
            </div>
          </motion.div>

          {/* Visual card stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {[
              { label: "Commerces & boutiques", emoji: "🛍️" },
              { label: "Salons de coiffure & barbiers", emoji: "✂️" },
              { label: "Restaurants & hôtels", emoji: "🍽️" },
              { label: "Petites entreprises locales", emoji: "🏢" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-4 bg-card border border-border/60 rounded-2xl px-5 py-4 shadow-sm"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
