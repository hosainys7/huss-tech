import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Dropdown data ─────────────────────────────────────────── */

const servicesDropdown = [
  {
    group: "Sites web",
    categoryId: "web",
    icon: <Globe size={13} strokeWidth={1.8} />,
    items: [
      { label: "Landing page",          optionId: "landing" },
      { label: "Site vitrine",          optionId: "vitrine" },
      { label: "Maintenance mensuelle", optionId: "maintenance" },
      { label: "Ajout de contenu",      optionId: "contenu" },
    ],
  },
  {
    group: "Support informatique",
    categoryId: "support",
    icon: <Wrench size={13} strokeWidth={1.8} />,
    items: [
      { label: "Diagnostic + devis",         optionId: "diagnostic" },
      { label: "Dépannage logiciel / virus", optionId: "depannage" },
      { label: "Réinstallation Windows",     optionId: "windows" },
      { label: "Remplacement pièce",         optionId: "piece" },
    ],
  },
];

const sectionIds = ["home", "services", "contact", "faq"];

/* ─── Scroll helper ─────────────────────────────────────────── */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Props ─────────────────────────────────────────────────── */

type NavProps = {
  onServiceSelect: (categoryId: string, optionId: string) => void;
  onReset: () => void;
};

/* ─── Component ─────────────────────────────────────────────── */

export default function Nav({ onServiceSelect, onReset }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll shadow + active section via IntersectionObserver */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function openDropdown() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setDropdownOpen(true);
  }

  function closeDropdown() {
    hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 130);
  }

  function handleReset() {
    onReset();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    setDropdownOpen(false);
  }

  function handleDropdownItem(categoryId: string, optionId: string) {
    onServiceSelect(categoryId, optionId);
    setDropdownOpen(false);
    setIsOpen(false);
    setMobileServicesOpen(false);
    setTimeout(() => scrollToId("services"), 60);
  }

  const linkClass = (section: string) =>
    `text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
      activeSection === section
        ? "text-foreground bg-foreground/8"
        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3">
      <div
        className={`max-w-5xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-background/88 backdrop-blur-xl shadow-md border border-border/60"
            : "bg-background/65 backdrop-blur-md border border-border/40"
        }`}
      >
        <div className="px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={handleReset}
            aria-label="Huss Tech — Accueil"
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="h-9 w-9 rounded-full bg-background border border-border/60 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
              <img src="/logo.png" alt="Huss Tech logo" className="h-6 w-6 object-contain" />
            </div>
            <span className="font-semibold text-foreground tracking-tight text-sm">Huss Tech</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">

            <button onClick={handleReset} className={linkClass("home")}>
              Accueil
            </button>

            {/* Services + dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`inline-flex items-center gap-1 ${linkClass("services")}`}
                onClick={() => { setDropdownOpen(false); scrollToId("services"); }}
                aria-expanded={dropdownOpen}
              >
                Services
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl p-4 z-50"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="flex flex-col gap-4">
                      {servicesDropdown.map((group) => (
                        <div key={group.group}>
                          <div className="flex items-center gap-1.5 mb-1.5 px-1">
                            <span className="text-primary">{group.icon}</span>
                            <span className="text-xs font-semibold text-foreground/45 uppercase tracking-widest">
                              {group.group}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((item) => (
                              <button
                                key={item.optionId}
                                onClick={() => handleDropdownItem(group.categoryId, item.optionId)}
                                className="text-left text-sm text-foreground/75 hover:text-primary hover:bg-primary/6 px-3 py-2 rounded-xl transition-all w-full"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => scrollToId("contact")} className={linkClass("contact")}>
              Contact
            </button>

            <button onClick={() => scrollToId("faq")} className={linkClass("faq")}>
              FAQ
            </button>

          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu — animated */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden"
            >
              <div className="border-t border-border/40 px-5 py-4 flex flex-col gap-1">
                <button
                  onClick={handleReset}
                  className="text-left text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  Accueil
                </button>

                {/* Mobile Services accordion */}
                <div>
                  <button
                    className="w-full text-left flex items-center justify-between text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    Services
                    <motion.span
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        key="mobile-services"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 mt-1 flex flex-col gap-3 pb-1">
                          {servicesDropdown.map((group) => (
                            <div key={group.group}>
                              <div className="flex items-center gap-1.5 mb-1 px-3">
                                <span className="text-primary">{group.icon}</span>
                                <span className="text-xs font-semibold text-foreground/45 uppercase tracking-widest">
                                  {group.group}
                                </span>
                              </div>
                              {group.items.map((item) => (
                                <button
                                  key={item.optionId}
                                  onClick={() => handleDropdownItem(group.categoryId, item.optionId)}
                                  className="w-full text-left text-sm text-foreground/70 hover:text-primary py-2 px-3 rounded-lg hover:bg-primary/6 transition-all"
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => { scrollToId("contact"); setIsOpen(false); }}
                  className="text-left text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  Contact
                </button>

                <button
                  onClick={() => { scrollToId("faq"); setIsOpen(false); }}
                  className="text-left text-sm font-medium text-foreground/80 py-2.5 px-3 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  FAQ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
