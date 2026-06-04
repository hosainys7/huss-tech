import React from "react";

const items = [
  "Présence en ligne",
  "Replit AI",
  "Visibilité",
  "Image professionnelle",
  "Conversion",
  "Réparation Ordinateur",
  "Dépannage logiciel",
  "Marseille",
];

export default function TickerBanner() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 30s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="text-xs font-medium tracking-wide whitespace-nowrap px-6"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: "rgba(218,150,31,0.85)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
