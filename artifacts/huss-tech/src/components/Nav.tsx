import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#pourquoi", label: "Pourquoi moi" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3">
      <div
        className={`max-w-5xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-md border border-border/60"
            : "bg-background/60 backdrop-blur-md border border-border/40"
        }`}
      >
        <div className="px-5 h-16 flex items-center justify-between">
          <a href="#" aria-label="Huss Tech — Accueil" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-background border border-border/60 shadow-sm flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Huss Tech logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="font-semibold text-foreground tracking-tight text-sm">Huss Tech</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-foreground/5 transition-all"
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border/40 px-5 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
