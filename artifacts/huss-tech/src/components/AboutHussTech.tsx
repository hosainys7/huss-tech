import React from "react";
import { motion } from "framer-motion";
import { Eye, Info, MessageCircle, Star } from "lucide-react";

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
    icon: <MessageCircle size={18} strokeWidth={1.8} />,
    title: "Contact simplifié",
    desc: "WhatsApp ou formulaire de contact facilement accessibles depuis le site.",
  },
  {
    icon: <Star size={18} strokeWidth={1.8} />,
    title: "Image professionnelle",
    desc: "Une présence en ligne cohérente qui inspire davantage confiance.",
  },
];

export default function AboutHussTech() {
  return (
    <section
      id="apropos"
      className="py-24"
      style={{
        background: "radial-gradient(ellipse 80% 55% at 20% 50%, rgba(90,5,5,0.1) 0%, transparent 65%), #0D0D0D",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: "rgba(200,55,55,0.85)" }}>
              À propos
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-[1.15]"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              À propos de Huss Tech
            </h2>
            <div className="flex flex-col gap-4 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}>
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
                réels du terrain et renforcés par des outils récents comme l'intelligence artificielle.
              </p>
              <p>
                L'objectif est simple : permettre à vos futurs clients de comprendre rapidement ce
                que vous proposez et de vous contacter facilement.
              </p>
            </div>
          </motion.div>

          {/* Benefit cards */}
          <div className="flex flex-col gap-3">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex items-start gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,55,55,0.18)",
                  boxShadow: "0 0 20px rgba(90,5,5,0.18)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,55,55,0.38)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(90,5,5,0.3)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,55,55,0.18)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(90,5,5,0.18)";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(200,55,55,0.15)", color: "rgba(210,75,75,0.9)" }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1"
                    style={{ color: "rgba(255,255,255,0.85)" }}>
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.42)" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
