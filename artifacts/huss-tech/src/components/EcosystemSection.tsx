import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Smartphone, MessageCircle, Search } from "lucide-react";

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORBIT_R = 148;

const nodes = [
  { label: "Site web",    Icon: Globe,          angle: -90 },
  { label: "IA",          Icon: Sparkles,       angle: -18 },
  { label: "Mobile",      Icon: Smartphone,     angle: 54  },
  { label: "Contact",     Icon: MessageCircle,  angle: 126 },
  { label: "Visibilité",  Icon: Search,         angle: 198 },
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
      fill="#5A0505"
      initial={{ cx: CX, cy: CY, opacity: 0 }}
      animate={{
        cx: [CX, nx],
        cy: [CY, ny],
        opacity: [0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
        times: [0, 0.15, 0.85, 1],
      }}
    />
  );
}

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            Pourquoi ça compte
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-5 max-w-2xl mx-auto leading-[1.15]">
            Pourquoi une présence en ligne claire compte&nbsp;?
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
            Chaque jour, de nouvelles entreprises se créent en France et à Marseille. Dans un marché
            local actif, un site clair permet à votre activité d'être trouvée plus facilement, de
            présenter vos services sans confusion et de faciliter le contact avec vos futurs clients.
          </p>
        </motion.div>

        {/* Ecosystem diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm md:max-w-md">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full"
              aria-hidden="true"
            >
              {/* Outer ring */}
              <circle
                cx={CX} cy={CY} r={ORBIT_R}
                fill="none"
                stroke="#5A0505"
                strokeOpacity={0.1}
                strokeWidth={1.5}
              />

              {/* Lines from center to nodes */}
              {nodes.map((n) => {
                const { x, y } = nodePos(n.angle);
                return (
                  <line
                    key={n.label}
                    x1={CX} y1={CY}
                    x2={x}  y2={y}
                    stroke="#5A0505"
                    strokeOpacity={0.15}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Animated dots */}
              {nodes.map((n, i) => (
                <AnimatedDot key={n.label} angle={n.angle} delay={i * 0.44} />
              ))}

              {/* Center circle */}
              <circle cx={CX} cy={CY} r={46} fill="white" stroke="#5A0505" strokeOpacity={0.15} strokeWidth={1.5} />
              <foreignObject x={CX - 28} y={CY - 28} width={56} height={56}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Huss Tech"
                    style={{ width: 44, height: 44, objectFit: "contain", display: "block" }}
                  />
                </div>
              </foreignObject>

              {/* Node circles + icons */}
              {nodes.map((n, i) => {
                const { x, y } = nodePos(n.angle);
                const Icon = n.Icon;
                return (
                  <g key={n.label}>
                    <circle
                      cx={x} cy={y} r={30}
                      fill="white"
                      stroke="#5A0505"
                      strokeOpacity={0.18}
                      strokeWidth={1.5}
                    />
                    <foreignObject x={x - 12} y={y - 12} width={24} height={24}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#5A0505",
                          opacity: 0.75,
                        }}
                      >
                        <Icon size={15} strokeWidth={1.8} />
                      </div>
                    </foreignObject>
                    {/* Label */}
                    <text
                      x={x}
                      y={y + 46}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight={600}
                      fill="#5A0505"
                      opacity={0.65}
                      style={{ fontFamily: "inherit", letterSpacing: "0.02em" }}
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
    </section>
  );
}
