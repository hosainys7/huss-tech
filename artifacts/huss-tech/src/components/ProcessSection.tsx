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
    <section
      id="processus"
      className="py-24"
      style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(90,5,5,0.1) 0%, transparent 60%), #080808",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(90,5,5,0.9)" }}>
            Processus
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 leading-[1.15]"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            Comment se déroule un projet&nbsp;?
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Un processus simple, clair et sans complication.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl p-6 cursor-default group transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(90,5,5,0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(90,5,5,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <p className="text-2xl font-bold tracking-tight mb-4"
                style={{ color: "rgba(200,55,55,0.75)" }}>
                {step.number}
              </p>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200"
                style={{ background: "rgba(90,5,5,0.15)", color: "rgba(255,255,255,0.6)" }}
              >
                {step.icon}
              </div>

              <h3 className="text-sm font-semibold mb-2 leading-snug"
                style={{ color: "rgba(255,255,255,0.85)" }}>
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.38)" }}>
                {step.text}
              </p>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }} />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
