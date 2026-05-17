import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl font-bold tracking-widest uppercase">
              HUSS TECH
            </h2>
            <p className="text-primary-foreground/80 font-medium">
              Solutions informatiques à Marseille
            </p>
            <p className="text-primary-foreground/60 text-sm max-w-sm leading-relaxed">
              Création de sites web et support informatique pour les commerces locaux.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <h3 className="font-serif text-xl tracking-wider mb-2">Navigation</h3>
            <nav className="flex flex-col md:items-end gap-3">
              <a href="#services" className="text-primary-foreground/80 hover:text-white hover:underline underline-offset-4 transition-colors">Services</a>
              <a href="#support" className="text-primary-foreground/80 hover:text-white hover:underline underline-offset-4 transition-colors">Support</a>
              <a href="#tarifs" className="text-primary-foreground/80 hover:text-white hover:underline underline-offset-4 transition-colors">Tarifs</a>
              <a href="#contact" className="text-primary-foreground/80 hover:text-white hover:underline underline-offset-4 transition-colors">Contact</a>
            </nav>
          </div>

        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Huss Tech — huss-tech.fr
          </p>
          <div className="text-primary-foreground/60 text-sm">
            Fait avec passion à Marseille
          </div>
        </div>
      </div>
    </footer>
  );
}
