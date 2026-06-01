import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MapPin } from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

const navLinks = [
  { label: "Accueil",    id: "home" },
  { label: "Services",   id: "services" },
  { label: "À propos",   id: "apropos" },
  { label: "Processus",  id: "processus" },
  { label: "Contact",    id: "contact" },
  { label: "FAQ",        id: "faq" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground/95 text-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background/10 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Huss Tech" className="h-5 w-5 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-background/90 leading-none">Huss Tech</p>
              <p className="text-xs text-background/50 mt-0.5">
                Solutions informatiques &amp; création de sites web à Marseille.
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.replaceState(null, "", window.location.pathname);
                  } else {
                    scrollToId(id);
                  }
                }}
                className="text-sm text-background/60 hover:text-background/90 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <a
              href={`https://wa.me/33773148264?text=${encodeURIComponent("Bonjour, je voudrais avoir des informations sur vos services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background/90 transition-colors"
            >
              <FaWhatsapp size={15} className="text-[#25D366]" />
              WhatsApp
            </a>
            <a
              href="mailto:contact@huss-tech.fr"
              className="text-sm text-background/60 hover:text-background/90 transition-colors"
            >
              contact@huss-tech.fr
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm text-background/40">
              <MapPin size={13} />
              Marseille
            </span>
          </div>

        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">© 2025 Huss Tech — Marseille</p>
          <p className="text-xs text-background/40">Fait avec soin à Marseille</p>
        </div>
      </div>
    </footer>
  );
}
