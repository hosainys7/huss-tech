import React from "react";

export default function Footer() {
  return (
    <footer className="bg-foreground/95 text-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background/10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Huss Tech" className="h-5 w-5 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-background/90 leading-none">Huss Tech</p>
              <p className="text-xs text-background/50 mt-0.5">Solutions informatiques à Marseille</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {["#services", "#tarifs", "#pourquoi", "#contact"].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-sm text-background/60 hover:text-background/90 transition-colors"
              >
                {["Services", "Tarifs", "Pourquoi moi", "Contact"][i]}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            <a href="mailto:contact@huss-tech.fr" className="text-sm text-background/60 hover:text-background/90 transition-colors">
              contact@huss-tech.fr
            </a>
            <a href="tel:+33600000000" className="text-sm text-background/60 hover:text-background/90 transition-colors">
              +33 6 00 00 00 00
            </a>
          </div>

        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © 2025 Huss Tech — Marseille
          </p>
          <p className="text-xs text-background/40">
            Fait avec soin à Marseille
          </p>
        </div>
      </div>
    </footer>
  );
}
