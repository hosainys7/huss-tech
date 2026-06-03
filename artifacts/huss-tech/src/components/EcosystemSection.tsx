import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Smartphone, MessageCircle, Search } from "lucide-react";

const ORBIT_PCT = 40; // % of container width

const nodes = [
  { label: "Site web",   Icon: Globe,         angle: -90  },
  { label: "IA",         Icon: Sparkles,      angle: -18  },
  { label: "Mobile",     Icon: Smartphone,    angle:  54  },
  { label: "Contact",    Icon: MessageCircle, angle: 126  },
  { label: "Visibilité", Icon: Search,        angle: 198  },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

function nodePosition(angle: number) {
  return {
    x: 50 + ORBIT_PCT * Math.cos(toRad(angle)),
    y: 50 + ORBIT_PCT * Math.sin(toRad(angle)),
  };
}

/* ── Animated dot using SVG (no foreignObject) ── */
function AnimatedDot({ angle, delay }: { angle: number; delay: number }) {
  const { x: tx, y: ty } = nodePosition(angle);
  return (
    <motion.circle
      r={1.2}
      fill="rgba(200,55,55,0.9)"
      initial={{ cx: "50%", cy: "50%", opacity: 0 }}
      animate={{
        cx: [`50%`, `${tx}%`],
        cy: [`50%`, `${ty}%`],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 3.8,
        repeat: Infinity,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.08, 0.92, 1],
      }}
    />
  );
}

export default function EcosystemSection() {
  return (
    <section
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(90,5,5,0.1) 0%, transparent 70%), #0D0D0D",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: "rgba(200,55,55,0.85)" }}>
              Pourquoi ça compte
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-[1.15]"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              Pourquoi une présence en ligne claire compte&nbsp;?
            </h2>
            <p className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              Chaque jour, de nouvelles entreprises se créent en France et à Marseille. Dans un
              marché local actif, un site clair permet à votre activité d'être trouvée plus
              facilement, de présenter vos services sans confusion et de faciliter le contact avec
              vos futurs clients.
            </p>
          </motion.div>

          {/* ── Diagram (CSS layout + SVG ring/dots only) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            {/* Square container with 1:1 aspect ratio */}
            <div className="relative w-full max-w-[320px] md:max-w-[360px]"
              style={{ aspectRatio: "1 / 1" }}>

              {/* SVG overlay: ring + dashed lines + animated dots */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* Orbit ring */}
                <circle
                  cx="50" cy="50" r={ORBIT_PCT}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />

                {/* Dashed lines from center to each node */}
                {nodes.map((n) => {
                  const { x, y } = nodePosition(n.angle);
                  return (
                    <line
                      key={n.label}
                      x1="50" y1="50"
                      x2={x} y2={y}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="0.4"
                      strokeDasharray="2 3"
                    />
                  );
                })}

                {/* Animated dots */}
                {nodes.map((n, i) => (
                  <AnimatedDot key={n.label} angle={n.angle} delay={i * 0.44} />
                ))}
              </svg>

              {/* Center node — absolutely centered */}
              <div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  width: "22%",
                  height: "22%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(200,55,55,0.3)",
                  boxShadow: "0 0 18px rgba(90,5,5,0.2)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Huss Tech"
                  style={{
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>

              {/* Outer nodes — CSS positioned at computed angles */}
              {nodes.map((n) => {
                const { x, y } = nodePosition(n.angle);
                const Icon = n.Icon;
                return (
                  <div
                    key={n.label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: "14.5%",
                        height: "14.5%",
                        minWidth: 40,
                        minHeight: 40,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(200,55,55,0.25)",
                        color: "rgba(210,75,75,0.9)",
                      }}
                    >
                      <Icon size={15} strokeWidth={1.7} />
                    </div>
                    {/* Label */}
                    <span
                      className="text-[9px] font-medium text-center leading-tight whitespace-nowrap"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                    >
                      {n.label}
                    </span>
                  </div>
                );
              })}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
