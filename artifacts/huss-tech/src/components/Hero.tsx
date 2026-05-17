import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#514640" />
              <circle cx="10" cy="90" r="1.5" fill="#D8C777" />
              <path d="M50 50 L10 90" stroke="#514640" strokeWidth="0.5" fill="none" opacity="0.5" />
              <path d="M50 50 L90 10" stroke="#514640" strokeWidth="0.5" fill="none" opacity="0.5" />
              <circle cx="90" cy="10" r="1" fill="#514640" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-wide leading-tight">
              Helping Marseille businesses <span className="text-primary italic">look professional.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl font-sans">
              Sites web modernes et support informatique pratique pour les commerces, barbiers et petites entreprises à Marseille.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="#services"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium text-center hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                data-testid="btn-voir-services"
              >
                Voir mes services
              </a>
              <a
                href="https://wa.me/33600000000" 
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-8 py-3.5 rounded-full font-medium text-center flex items-center justify-center gap-2 hover:bg-primary/5 transition-all shadow-sm hover:-translate-y-0.5"
                data-testid="btn-whatsapp-hero"
              >
                <FaWhatsapp className="text-xl" />
                Me contacter sur WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="bg-primary rounded-3xl p-8 md:p-12 w-full max-w-md aspect-[4/5] relative overflow-hidden shadow-2xl flex flex-col justify-end">
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 100 Q 150 50 250 150 T 350 200" stroke="#D8C777" strokeWidth="1" fill="none" />
                  <path d="M100 250 Q 200 350 300 250 T 380 400" stroke="#D8C777" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="100" r="3" fill="#D8C777" />
                  <circle cx="250" cy="150" r="2" fill="#D8C777" />
                  <circle cx="350" cy="200" r="4" fill="#D8C777" />
                  <circle cx="100" cy="250" r="2" fill="#D8C777" />
                  <circle cx="300" cy="250" r="3" fill="#D8C777" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-1 bg-accent mb-6"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground tracking-widest uppercase mb-2">
                  HUSS TECH
                </h2>
                <p className="text-accent font-medium tracking-wider text-sm font-sans">
                  huss-tech.fr
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
