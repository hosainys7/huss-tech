import React from "react";
import { motion } from "framer-motion";
import { Globe, Wrench } from "lucide-react";

const webChips = ["Landing page", "Site vitrine", "Mobile friendly", "À partir de 300 €"];
const supportChips = ["Virus", "Windows", "Diagnostic", "Réparation"];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-card/60">
      <div className="container mx-auto px-4 max-w-6xl">

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
            Sites web modernes et support informatique rapide pour petites entreprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-background rounded-2xl p-8 border border-border/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="bg-primary/8 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Globe size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Sites web</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Landing pages modernes et sites vitrines simples pour présenter votre activité.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {webChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium bg-foreground/5 border border-border/60 text-foreground/80 px-3 py-1 rounded-full hover:bg-primary/8 hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
            <a
              href="#tarifs"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
            >
              Voir les détails →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-background rounded-2xl p-8 border border-border/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="bg-primary/8 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Wrench size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Support informatique</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Dépannage pratique pour ordinateurs personnels et professionnels.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {supportChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium bg-foreground/5 border border-border/60 text-foreground/80 px-3 py-1 rounded-full hover:bg-primary/8 hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
            <a
              href="#tarifs"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
            >
              Voir les tarifs →
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
