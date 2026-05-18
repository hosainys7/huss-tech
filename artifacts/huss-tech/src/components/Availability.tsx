import React from "react";
import { motion } from "framer-motion";

const rows = [
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
    value: "Marseille",
    dot: false,
  },
];

export default function Availability() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">

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
          className="bg-white/60 backdrop-blur-md border border-border/50 rounded-3xl p-6 shadow-lg flex flex-col gap-3"
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between bg-background/70 rounded-2xl px-6 py-4 shadow-sm border border-border/40"
            >
              <div className="flex items-center gap-3">
                {row.dot ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 blink-dot shrink-0" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-foreground/20 shrink-0" />
                )}
                <span className="text-sm font-medium text-muted-foreground">
                  {row.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-foreground tracking-tight">
                {row.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
