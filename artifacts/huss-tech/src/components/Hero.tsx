import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(90,5,5,0.18) 0%, transparent 65%), #080808",
      }}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl py-24 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-8"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Huss Tech — Marseille
        </motion.p>

        {/* Main headline — blur-to-clear */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] tracking-tight mb-5"
          style={{ color: "rgba(255,255,255,0.93)" }}
        >
          Une présence en ligne
          <br />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>simple et claire.</span>
        </motion.h1>

        {/* Secondary line */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl font-normal mb-6"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          Attirer une clientèle locale.
        </motion.p>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Présentez votre entreprise, vos prestations et facilitez le contact avec votre clientèle
          grâce à un site web moderne, clair et conçu avec des outils récents, y compris
          l'intelligence artificielle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: "#5A0505",
              color: "white",
              boxShadow: "0 0 24px rgba(90,5,5,0.4)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6e0606")}
            onMouseLeave={e => (e.currentTarget.style.background = "#5A0505")}
          >
            Découvrir les solutions
            <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            Discuter du projet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
