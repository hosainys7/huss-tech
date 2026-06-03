import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Smartphone, MessageCircle, Search } from "lucide-react";

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORBIT_R = 148;

const nodes = [
  { label: "Site web",   Icon: Globe,         angle: -90 },
  { label: "IA",         Icon: Sparkles,      angle: -18 },
  { label: "Mobile",     Icon: Smartphone,    angle: 54  },
  { label: "Contact",    Icon: MessageCircle, angle: 126 },
  { label: "Visibilité", Icon: Search,        angle: 198 },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }
function nodePos(angle: number) {
  return {
    x: CX + ORBIT_R * Math.cos(toRad(angle)),
    y: CY + ORBIT_R * Math.sin(toRad(angle)),
  };
}

function AnimatedDot({ angle, delay }: { angle: number; delay: number }) {
  const { x: nx, y: ny } = nodePos(angle);
  return (
    <motion.circle
      r={3.5}
      fill="rgba(200,55,55,0.95)"
      initial={{ cx: CX, cy: CY, opacity: 0 }}
      animate={{
        cx: [CX, nx],
        cy: [CY, ny],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: [0, 0.15, 0.82, 1],
      }}
    />
  );
}

export default function EcosystemSection() {
  return (
    <section
      className="py-24"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(90,5,5,0.1) 0%, transparent 70%), #0D0D0D",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: "rgba(200,55,55,0.85)" }}
            >
              Pourquoi ça compte
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-[1.15]"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              Pourquoi une présence en ligne claire compte&nbsp;?
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Chaque jour, de nouvelles entreprises se créent en France et à Marseille. Dans un
              marché local actif, un site clair permet à votre activité d'être trouvée plus
              facilement, de présenter vos services sans confusion et de faciliter le contact avec
              vos futurs clients.
            </p>
          </motion.div>

          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs md:max-w-sm">
              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" aria-hidden="true">
                <defs>
                  <filter id="dot-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Orbit ring */}
                <circle
                  cx={CX} cy={CY} r={ORBIT_R}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1}
                />

                {/* Lines center → nodes */}
                {nodes.map((n) => {
                  const { x, y } = nodePos(n.angle);
                  return (
                    <line
                      key={n.label}
                      x1={CX} y1={CY} x2={x} y2={y}
                      stroke="rgba(255,255,255,0.09)"
                      strokeWidth={1}
                      strokeDasharray="4 5"
                    />
                  );
                })}

                {/* Animated dots — burgundy crimson */}
                {nodes.map((n, i) => (
                  <AnimatedDot key={n.label} angle={n.angle} delay={i * 0.44} />
                ))}

                {/* Center circle */}
                <circle
                  cx={CX} cy={CY} r={46}
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(200,55,55,0.35)"
                  strokeWidth={1.5}
                />
                <foreignObject x={CX - 26} y={CY - 26} width={52} height={52}>
                  <div style={{
                    width: 52, height: 52,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img
                      src="/logo.png"
                      alt="Huss Tech"
                      style={{
                        width: 40, height: 40,
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                </foreignObject>

                {/* Node circles + icons */}
                {nodes.map((n) => {
                  const { x, y } = nodePos(n.angle);
                  const Icon = n.Icon;
                  return (
                    <g key={n.label}>
                      <circle
                        cx={x} cy={y} r={30}
                        fill="rgba(255,255,255,0.04)"
                        stroke="rgba(200,55,55,0.28)"
                        strokeWidth={1.2}
                      />
                      <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
                        <div style={{
                          width: 24, height: 24,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "rgba(210,75,75,0.9)",
                        }}>
                          <Icon size={14} strokeWidth={1.7} />
                        </div>
                      </foreignObject>
                      <text
                        x={x} y={y + 46}
                        textAnchor="middle"
                        fontSize={10} fontWeight={500}
                        fill="rgba(255,255,255,0.48)"
                        style={{ fontFamily: "inherit", letterSpacing: "0.03em" }}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
