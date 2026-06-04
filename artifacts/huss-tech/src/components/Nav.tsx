import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Globe, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Dropdown data ─────────────────────────────────────────── */

type DropdownItem = {
  label: string;
  categoryId: string;
  subCategoryId: string | null;
  optionId: string | null;
};

type DropdownSubGroup = {
  label: string;
  items: DropdownItem[];
};

type DropdownGroup = {
  group: string;
  icon: React.ReactNode;
  items?: DropdownItem[];
  subGroups?: DropdownSubGroup[];
};

const servicesDropdown: DropdownGroup[] = [
  {
    group: "Sites web",
    icon: <Globe size={13} strokeWidth={1.8} />,
    items: [
      { label: "Site portfolio",   categoryId: "web", subCategoryId: null, optionId: "portfolio" },
      { label: "Site vitrine",     categoryId: "web", subCategoryId: null, optionId: "vitrine" },
      { label: "Site e-commerce",  categoryId: "web", subCategoryId: null, optionId: "ecommerce" },
      { label: "Modernisation",    categoryId: "web", subCategoryId: null, optionId: "refonte" },
    ],
  },
  {
    group: "Support informatique",
    icon: <Wrench size={13} strokeWidth={1.8} />,
    subGroups: [
      {
        label: "Logiciel",
        items: [
          { label: "Diagnostic + devis",        categoryId: "support", subCategoryId: "logiciel", optionId: "diagnostic-log" },
          { label: "Dépannage logiciel / virus", categoryId: "support", subCategoryId: "logiciel", optionId: "depannage" },
          { label: "Réinstallation Windows",    categoryId: "support", subCategoryId: "logiciel", optionId: "windows" },
        ],
      },
      {
        label: "Matériel",
        items: [
          { label: "Diagnostic + devis",  categoryId: "support", subCategoryId: "materiel", optionId: "diagnostic-mat" },
          { label: "Remplacement pièce",  categoryId: "support", subCategoryId: "materiel", optionId: "piece" },
        ],
      },
    ],
  },
];

const sectionIds = ["home", "services", "apropos", "processus", "contact", "faq"];

/* ─── Scroll helper ─────────────────────────────────────────── */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── Props ─────────────────────────────────────────────────── */

type NavProps = {
  onServiceSelect: (
    categoryId: string,
    subCategoryId: string | null,
    optionId: string | null
  ) => void;
  onReset: () => void;
};

/* ─── Component ─────────────────────────────────────────────── */

export default function Nav({ onServiceSelect, onReset }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDesktopSub, setActiveDesktopSub] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
    hoverTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
      setActiveDesktopSub(null);
    }, 130);
  }

  function handleReset() {
    onReset();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
    setIsOpen(false);
    setDropdownOpen(false);
    setActiveDesktopSub(null);
  }

  function handleDropdownItem(item: DropdownItem) {
    onServiceSelect(item.categoryId, item.subCategoryId, item.optionId);
    setDropdownOpen(false);
    setActiveDesktopSub(null);
    setIsOpen(false);
    setMobileServicesOpen(false);
    setActiveMobileSub(null);
    setTimeout(() => scrollToId("services"), 60);
  }

  const linkClass = (section: string) =>
    `text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
      activeSection === section
        ? "text-white bg-white/12"
        : "text-white/52 hover:text-white/90 hover:bg-white/8"
    }`;

  /* ── Dark dropdown content (desktop) ── */
  function renderDropdownContent() {
    return servicesDropdown.map((group) => (
      <div key={group.group}>
        <div className="flex items-center gap-1.5 mb-1.5 px-2">
          <span style={{ color: "rgba(200,55,55,0.85)" }}>{group.icon}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            {group.group}
          </span>
        </div>

        {group.items && (
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <button
                key={item.optionId}
                onClick={() => handleDropdownItem(item)}
                className="text-left text-sm px-3 py-2 rounded-xl transition-all w-full"
                style={{ color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(220,90,90,0.95)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,55,55,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {group.subGroups && (
          <div className="flex flex-col gap-0.5">
            {group.subGroups.map((sub) => {
              const isExpanded = activeDesktopSub === sub.label;
              return (
                <div key={sub.label}>
                  <button
                    onClick={() => setActiveDesktopSub(isExpanded ? null : sub.label)}
                    className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all"
                    style={{
                      color: isExpanded ? "rgba(220,90,90,0.95)" : "rgba(255,255,255,0.55)",
                      background: isExpanded ? "rgba(200,55,55,0.1)" : "transparent",
                      fontWeight: isExpanded ? 500 : 400,
                    }}
                  >
                    {sub.label}
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.18 }} className="inline-flex">
                      <ChevronDown size={12} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key={sub.label + "-items"}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 flex flex-col gap-0.5 py-1">
                          {sub.items.map((item) => (
                            <button
                              key={`${item.subCategoryId}-${item.optionId}`}
                              onClick={() => handleDropdownItem(item)}
                              className="text-left text-sm px-3 py-1.5 rounded-xl transition-all w-full"
                              style={{ color: "rgba(255,255,255,0.52)" }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.color = "rgba(220,90,90,0.9)";
                                (e.currentTarget as HTMLElement).style.background = "rgba(200,55,55,0.1)";
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.52)";
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    ));
  }

  const mobileLinkStyle = { color: "rgba(255,255,255,0.78)" };
  const mobileLinkClass = "text-left text-base font-medium py-3.5 px-4 rounded-xl hover:bg-white/6 transition-colors w-full";

  return (
    <>
      {/* ── Sticky nav bar ── */}
      <header className="sticky top-0 z-40 w-full px-4 pt-3">
        <div
          className="max-w-5xl mx-auto rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? "rgba(28,28,33,0.96)" : "rgba(20,20,26,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${scrolled ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.07)"}`,
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
          }}
        >
          <div className="px-5 h-16 flex items-center justify-between">

            {/* Logo */}
            <button onClick={handleReset} aria-label="Huss Tech — Accueil"
              className="flex items-center gap-3 focus:outline-none">
              <div className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <img src="/logo.png" alt="Huss Tech logo" className="h-6 w-6 object-contain" />
              </div>
              <span className="font-semibold tracking-tight text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                Huss Tech
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={handleReset} className={linkClass("home")}>Accueil</button>

              {/* Services dropdown */}
              <div ref={dropdownRef} className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <button
                  className={`inline-flex items-center gap-1 ${linkClass("services")}`}
                  onClick={() => { setDropdownOpen(false); scrollToId("services"); }}
                  aria-expanded={dropdownOpen}
                >
                  Services
                  <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
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
                      className="absolute top-full right-0 mt-2 w-64 rounded-2xl shadow-2xl p-4 z-50"
                      style={{
                        background: "rgba(17,17,20,0.98)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.55)",
                      }}
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <div className="flex flex-col gap-4">{renderDropdownContent()}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => scrollToId("apropos")} className={linkClass("apropos")}>À propos</button>
              <button onClick={() => scrollToId("processus")} className={linkClass("processus")}>Processus</button>
              <button onClick={() => scrollToId("contact")} className={linkClass("contact")}>Contact</button>
              <button onClick={() => scrollToId("faq")} className={linkClass("faq")}>FAQ</button>
            </nav>

            {/* Mobile burger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/8 transition-colors"
              style={{ color: "rgba(255,255,255,0.75)" }}
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu — fixed full-screen overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 md:hidden flex flex-col"
            style={{ background: "#111114" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 h-16 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={handleReset} className="flex items-center gap-3 focus:outline-none">
                <div className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <img src="/logo.png" alt="Huss Tech logo" className="h-6 w-6 object-contain" />
                </div>
                <span className="font-semibold tracking-tight text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  Huss Tech
                </span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/8 transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                aria-label="Fermer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable nav items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-0.5">

                <button onClick={handleReset} className={mobileLinkClass} style={mobileLinkStyle}>
                  Accueil
                </button>

                {/* Services accordion */}
                <div>
                  <button
                    className={`${mobileLinkClass} flex items-center justify-between`}
                    style={mobileLinkStyle}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    Services
                    <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                      <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.35)" }} />
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
                        <div className="ml-4 mt-1 mb-2 flex flex-col gap-1 rounded-xl p-3"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          {servicesDropdown.map((group) => (
                            <div key={group.group} className="mb-2 last:mb-0">
                              <div className="flex items-center gap-1.5 px-2 py-1 mb-1">
                                <span style={{ color: "rgba(200,55,55,0.85)" }}>{group.icon}</span>
                                <span className="text-[10px] font-semibold uppercase tracking-widest"
                                  style={{ color: "rgba(255,255,255,0.3)" }}>
                                  {group.group}
                                </span>
                              </div>

                              {group.items && group.items.map((item) => (
                                <button
                                  key={item.optionId}
                                  onClick={() => handleDropdownItem(item)}
                                  className="w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all"
                                  style={{ color: "rgba(255,255,255,0.62)" }}
                                  onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = "rgba(220,90,90,0.9)";
                                    (e.currentTarget as HTMLElement).style.background = "rgba(200,55,55,0.1)";
                                  }}
                                  onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)";
                                    (e.currentTarget as HTMLElement).style.background = "transparent";
                                  }}
                                >
                                  {item.label}
                                </button>
                              ))}

                              {group.subGroups && group.subGroups.map((sub) => (
                                <div key={sub.label}>
                                  <button
                                    className="w-full text-left flex items-center justify-between text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                    onClick={() => setActiveMobileSub(activeMobileSub === sub.label ? null : sub.label)}
                                  >
                                    {sub.label}
                                    <motion.span animate={{ rotate: activeMobileSub === sub.label ? 180 : 0 }} transition={{ duration: 0.18 }} className="inline-flex">
                                      <ChevronDown size={12} />
                                    </motion.span>
                                  </button>
                                  <AnimatePresence initial={false}>
                                    {activeMobileSub === sub.label && (
                                      <motion.div
                                        key={sub.label}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-hidden"
                                      >
                                        {sub.items.map((item) => (
                                          <button
                                            key={`${item.subCategoryId}-${item.optionId}`}
                                            onClick={() => handleDropdownItem(item)}
                                            className="w-full text-left text-sm py-2 px-5 rounded-lg transition-all"
                                            style={{ color: "rgba(255,255,255,0.5)" }}
                                            onMouseEnter={e => {
                                              (e.currentTarget as HTMLElement).style.color = "rgba(220,90,90,0.9)";
                                              (e.currentTarget as HTMLElement).style.background = "rgba(200,55,55,0.1)";
                                            }}
                                            onMouseLeave={e => {
                                              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                                              (e.currentTarget as HTMLElement).style.background = "transparent";
                                            }}
                                          >
                                            {item.label}
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button onClick={() => { scrollToId("apropos"); setIsOpen(false); }} className={mobileLinkClass} style={mobileLinkStyle}>
                  À propos
                </button>
                <button onClick={() => { scrollToId("processus"); setIsOpen(false); }} className={mobileLinkClass} style={mobileLinkStyle}>
                  Processus
                </button>
                <button onClick={() => { scrollToId("contact"); setIsOpen(false); }} className={mobileLinkClass} style={mobileLinkStyle}>
                  Contact
                </button>
                <button onClick={() => { scrollToId("faq"); setIsOpen(false); }} className={mobileLinkClass} style={mobileLinkStyle}>
                  FAQ
                </button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
