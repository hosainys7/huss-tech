import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe, Wrench } from "lucide-react";

const servicesDropdown = [
  {
    group: "Sites web",
    icon: <Globe size={14} strokeWidth={1.8} />,
    items: [
      "Landing page",
      "Site vitrine",
      "Maintenance mensuelle",
      "Ajout de contenu",
    ],
  },
  {
    group: "Support informatique",
    icon: <Wrench size={14} strokeWidth={1.8} />,
    items: [
      "Diagnostic + devis",
      "Dépannage logiciel / virus",
      "Réinstallation Windows",
      "Remplacement pièce",
    ],
  },
];

const topLinks = [
  { href: "#", label: "Accueil" },
  { href: "#disponibilite", label: "Disponibilité" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function onMouseEnter() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setDropdownOpen(true);
  }

  function onMouseLeave() {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  function handleDropdownItemClick() {
    setDropdownOpen(false);
    setIsOpen(false);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3">
      <div
        className={`max-w-5xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-md border border-border/60"
            : "bg-background/65 backdrop-blur-md border border-border/40"
        }`}
      >
        <div className="px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" aria-label="Huss Tech — Accueil" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-background border border-border/60 shadow-sm flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Huss Tech logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="font-semibold text-foreground tracking-tight text-sm">Huss Tech</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Accueil */}
            <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-foreground/5 transition-all"
            >
              Accueil
            </a>

            {/* Services with dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <button
                className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                  dropdownOpen
                    ? "text-primary bg-primary/6"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-background/90 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl p-4 z-50"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <div className="flex flex-col gap-4">
                    {servicesDropdown.map((group) => (
                      <div key={group.group}>
                        <div className="flex items-center gap-1.5 mb-2 px-1">
                          <span className="text-primary">{group.icon}</span>
                          <span className="text-xs font-semibold text-foreground/60 uppercase tracking-widest">
                            {group.group}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {group.items.map((item) => (
                            <button
                              key={item}
                              onClick={handleDropdownItemClick}
                              className="text-left text-sm text-foreground/80 hover:text-primary hover:bg-primary/6 px-3 py-2 rounded-xl transition-all w-full"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {topLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-foreground/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40 px-5 py-4 flex flex-col gap-1">
            <a
              href="#"
              className="text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </a>

            {/* Mobile Services accordion */}
            <div>
              <button
                className="w-full text-left flex items-center justify-between text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-3 mt-1 flex flex-col gap-3">
                  {servicesDropdown.map((group) => (
                    <div key={group.group}>
                      <div className="flex items-center gap-1.5 mb-1 px-3">
                        <span className="text-primary">{group.icon}</span>
                        <span className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
                          {group.group}
                        </span>
                      </div>
                      {group.items.map((item) => (
                        <button
                          key={item}
                          onClick={handleDropdownItemClick}
                          className="w-full text-left text-sm text-foreground/70 hover:text-primary py-2 px-3 rounded-lg hover:bg-primary/6 transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {topLinks.slice(1).map((link) => (
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
