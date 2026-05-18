import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    label: "Disponible",
    value: "24h / 24",
    dot: true,
  },
  {
    label: "Intervention",
    value: "7j / 7",
    dot: true,
  },
  {
    label: "Zone",
    value: "Marseille & alentours",
    dot: false,
  },
];

export default function Availability() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Disponibilité
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Toujours là quand vous en avez besoin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 py-6 sm:py-0 sm:px-6 first:pt-0 last:pb-0 sm:first:pl-0 sm:last:pr-0"
              >
                <div className="flex items-center gap-2">
                  {item.dot && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 blink-dot inline-block" />
                  )}
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <span className="text-xl font-semibold text-foreground tracking-tight">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
