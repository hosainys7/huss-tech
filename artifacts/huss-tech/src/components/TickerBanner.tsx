import React from "react";

const items = [
  "IA intégrée",
  "Création de site web",
  "Refonte de site",
  "Landing page",
  "Site vitrine",
  "Mobile friendly",
  "WhatsApp",
  "Support informatique",
  "Réparation tech",
  "Marseille",
  "Présence en ligne claire",
];

export default function TickerBanner() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3.5"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 32s linear infinite;
          display: flex;
          width: max-content;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="text-xs font-medium tracking-wide whitespace-nowrap px-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: "rgba(90,5,5,0.7)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
