import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&q=85&fit=crop",
    alt: "Création de site web moderne sur laptop",
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85&fit=crop",
    alt: "Réparation d'ordinateur portable en atelier",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop",
    alt: "Espace de travail moderne pour commerce local",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Background carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center gap-7"
        >
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white leading-[1.1] tracking-tight max-w-3xl">
            Une présence en ligne simple et claire.
          </h1>

          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl font-normal">
            Aujourd'hui, de nombreux commerces dépendent uniquement des réseaux sociaux ou d'informations dispersées.
            Huss Tech aide les commerces, restaurants, hôtels, salons de coiffure et petites entreprises à présenter leurs
            services clairement, renforcer leur image professionnelle et faciliter le contact avec leurs clients grâce à un
            site web moderne.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md"
            >
              Découvrir les solutions
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Parler de mon projet
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
