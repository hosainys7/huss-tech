import React from "react";
import { motion } from "framer-motion";
import { LayoutList, Phone, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: <LayoutList size={18} strokeWidth={1.8} />,
    title: "Présenter ses services clairement",
    desc: "Expliquez ce que vous faites sans répéter les mêmes informations à chaque appel.",
  },
  {
    icon: <Phone size={18} strokeWidth={1.8} />,
    title: "Faciliter la prise de contact",
    desc: "WhatsApp, téléphone ou formulaire accessibles en quelques secondes.",
  },
  {
    icon: <ShieldCheck size={18} strokeWidth={1.8} />,
    title: "Renforcer la confiance",
    desc: "Une présence professionnelle qui rassure les visiteurs avant même le premier contact.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 items-start">

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
              style={{ color: "rgba(255,255,255,0.48)" }}>
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
                réels du terrain, sans jargon ni complication.
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
                whileHover={{ y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex items-start gap-4 rounded-2xl px-5 py-4 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,55,55,0.18)",
                  boxShadow: "0 0 20px rgba(90,5,5,0.18)",
                  willChange: "transform",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(200,55,55,0.15)", color: "rgba(200,55,55,0.9)" }}>
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
