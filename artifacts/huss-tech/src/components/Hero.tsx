import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-7"
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold w-fit tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              À partir de 300 €
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-foreground leading-[1.12] tracking-tight">
              Un site propre.<br />
              Un ordinateur qui marche.<br />
              <span className="text-primary">Un contact direct à Marseille.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg font-normal">
              Sites web modernes et support informatique pratique pour commerces, barbiers et petites entreprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                data-testid="btn-voir-services"
              >
                Voir mes services
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-background border border-border text-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-foreground/5 transition-all hover:-translate-y-0.5 shadow-sm"
                data-testid="btn-whatsapp-hero"
              >
                <FaWhatsapp size={17} className="text-[#25D366]" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/30">
                <img
                  src="/hero-workspace.png"
                  alt="Espace de travail tech moderne"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-md border border-border/60 rounded-2xl px-5 py-3.5 shadow-lg">
                <p className="text-xs text-muted-foreground font-medium">Déplacement à Marseille</p>
                <p className="text-sm font-bold text-primary mt-0.5">Gratuit</p>
              </div>
              <div className="absolute -top-4 -right-4 bg-background/90 backdrop-blur-md border border-border/60 rounded-2xl px-5 py-3.5 shadow-lg">
                <p className="text-xs text-muted-foreground font-medium">Réponse rapide</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Sous 24h</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
