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
    <footer
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(67,8,8,0.14) 0%, transparent 65%), #080808",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden shrink-0"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <img src="/logo.png" alt="Huss Tech" className="h-5 w-5 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none"
                style={{ color: "rgba(255,255,255,0.88)" }}>
                Huss Tech
              </p>
              <p className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.38)" }}>
                Création de sites web & support informatique à Marseille.
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
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.42)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`https://wa.me/33773148264?text=${encodeURIComponent("Bonjour, je voudrais avoir des informations sur vos services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <FaWhatsapp size={15} style={{ color: "#25D366" }} />
              WhatsApp
            </a>
            <a
              href="mailto:contact@huss-tech.fr"
              className="text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              contact@huss-tech.fr
            </a>
            <span className="inline-flex items-center gap-1.5 text-sm"
              style={{ color: "rgba(255,255,255,0.28)" }}>
              <MapPin size={13} />
              Marseille
            </span>
          </div>

        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2025 Huss Tech — Marseille
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            Fait avec soin à Marseille
          </p>
        </div>
      </div>
    </footer>
  );
}
