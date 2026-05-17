import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#support", label: "Support" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <a href="#" className="font-serif text-2xl font-bold tracking-widest text-foreground leading-none">
            HUSS TECH
          </a>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mt-1">
            Solutions informatiques à Marseille
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            data-testid="button-me-contacter"
          >
            Me contacter
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg">
          <nav className="flex flex-col px-4 py-6 gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-medium mt-4 shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Me contacter
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
