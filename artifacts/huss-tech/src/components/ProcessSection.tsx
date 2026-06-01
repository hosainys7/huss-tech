import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PenLine, CheckCircle, PackageCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MessageSquare size={20} strokeWidth={1.7} />,
    title: "Diagnostic du besoin",
    text: "On échange sur votre activité, vos objectifs et les informations à mettre en avant.",
  },
  {
    number: "02",
    icon: <PenLine size={20} strokeWidth={1.7} />,
    title: "Création",
    text: "Huss Tech prépare la structure, le design et les contenus du site.",
  },
  {
    number: "03",
    icon: <CheckCircle size={20} strokeWidth={1.7} />,
    title: "Validation",
    text: "Vous vérifiez le rendu, puis les ajustements nécessaires sont appliqués.",
  },
  {
    number: "04",
    icon: <PackageCheck size={20} strokeWidth={1.7} />,
    title: "Livraison clé en main",
    text: "Votre site est finalisé, prêt à être utilisé et partagé avec vos clients.",
  },
];

export default function ProcessSection() {
  return (
    <section id="processus" className="py-24 bg-card/50">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Processus
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4 leading-[1.15]">
            Comment se déroule un projet&nbsp;?
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Un processus simple, clair et sans complication.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.09,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative bg-background border border-border/60 rounded-2xl p-6 shadow-sm cursor-default group"
            >
              {/* Step number */}
              <p className="text-xs font-bold text-primary/30 tracking-widest mb-4 uppercase">
                {step.number}
              </p>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                {step.icon}
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.text}
              </p>

              {/* Connector line (not on last card) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-px bg-border/60" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
