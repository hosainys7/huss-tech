import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {

  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 100% 75% at 50% -10%, rgba(90,5,5,0.45) 0%, rgba(90,5,5,0.12) 45%, transparent 72%), #080808",
      }}
    >
      <style>{`
        @keyframes hero-in {
          from { opacity: 0; filter: blur(28px); transform: translateY(22px); }
          to   { opacity: 1; filter: blur(0px);  transform: translateY(0);   }
        }
        .h-eyebrow  { animation: hero-in 1.3s cubic-bezier(0.22,1,0.36,1) 0.1s  both; }
        .h-headline { animation: hero-in 1.7s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
        .h-sub      { animation: hero-in 1.5s cubic-bezier(0.22,1,0.36,1) 0.68s both; }
        .h-para     { animation: hero-in 1.4s cubic-bezier(0.22,1,0.36,1) 0.92s both; }
        .h-cta      { animation: hero-in 1.2s cubic-bezier(0.22,1,0.36,1) 1.15s both; }
      `}</style>

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-4xl py-28 text-center">

        {/* Eyebrow */}
        <p
          className="h-eyebrow text-xs font-semibold uppercase tracking-[0.22em] mb-8"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          Huss Tech — Marseille
        </p>

        {/* Headline */}
        <h1
          className="h-headline text-4xl md:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] tracking-tight mb-5"
          style={{ color: "rgba(255,255,255,0.93)" }}
        >
          Une présence en ligne
          <br />
          <span style={{ color: "rgba(255,255,255,0.48)" }}>simple et claire.</span>
        </h1>

        {/* Secondary line */}
        <p
          className="h-sub text-lg md:text-xl font-normal mb-6"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Attirer une clientèle locale.
        </p>

        {/* Paragraph */}
        <p
          className="h-para text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          Présentez votre entreprise, vos prestations et facilitez le contact avec votre
          clientèle grâce à un site web moderne, clair et conçu avec des outils récents, y
          compris l'intelligence artificielle.
        </p>

        {/* CTAs */}
        <div className="h-cta flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#5A0505",
              boxShadow: "0 0 28px rgba(90,5,5,0.5), 0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Découvrir les solutions
            <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(8px)",
            }}
          >
            Discuter du projet
          </a>
        </div>
      </div>
    </section>
  );
}
