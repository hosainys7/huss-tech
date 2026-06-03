import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Huss Tech",
    type: "Site de présentation",
    description:
      "Site de présentation pour une activité locale de création de sites web et support informatique à Marseille.",
    gradient: "linear-gradient(135deg, #0D0D0D 0%, #1a0a0a 50%, #0D0D0D 100%)",
    accent: "#5A0505",
    url: "https://huss-tech.fr",
  },
  {
    title: "Répare-Tontel13",
    type: "Site vitrine",
    description:
      "Interface moderne pour un service de réparation mobile à Marseille. Présentation claire des services, des tarifs et des moyens de contact.",
    gradient: "linear-gradient(135deg, #0a0f1a 0%, #0f1825 50%, #0a0f1a 100%)",
    accent: "#1a3a5c",
    url: null,
  },
  {
    title: "Répare-Tontel13",
    type: "Système de réservation",
    description:
      "Parcours de réservation interactif avec sélection du modèle, choix de réparation et demande de réservation en ligne.",
    gradient: "linear-gradient(135deg, #0a1a0f 0%, #0f2015 50%, #0a1a0f 100%)",
    accent: "#1a5c2a",
    url: null,
  },
];

export default function Realisations() {
  return (
    <section id="realisations" className="py-24 bg-background">
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
            Réalisations
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4 leading-[1.15]">
            Projets récents
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
            Quelques exemples de sites et interfaces réalisés.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="group rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Visual area */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: project.gradient }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute top-6 left-6 w-16 h-16 rounded-full opacity-20"
                  style={{ background: project.accent, filter: "blur(12px)" }}
                />
                <div
                  className="absolute bottom-4 right-6 w-10 h-10 rounded-full opacity-15"
                  style={{ background: project.accent, filter: "blur(8px)" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 rounded-full opacity-10"
                  style={{ background: "white" }}
                />
                {/* Type badge */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {project.type}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
