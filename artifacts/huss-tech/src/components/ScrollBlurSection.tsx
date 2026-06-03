import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ScrollBlurSection({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Blur starts 60px after section top exits viewport top,
  // reaches max 6px over the next 220px — identical for every section
  const blurPx = useTransform(scrollY, () => {
    if (!ref.current) return 0;
    const top = ref.current.getBoundingClientRect().top;
    const pixels = Math.max(0, -top - 60);
    return Math.min(6, (pixels / 220) * 6);
  });

  const opacity = useTransform(scrollY, () => {
    if (!ref.current) return 1;
    const top = ref.current.getBoundingClientRect().top;
    const pixels = Math.max(0, -top - 60);
    return Math.max(0.45, 1 - (pixels / 220) * 0.55);
  });

  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div ref={ref} style={{ position: "relative" }} className={className}>
      <motion.div style={{ filter, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
