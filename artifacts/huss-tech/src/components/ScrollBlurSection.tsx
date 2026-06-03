import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ScrollBlurSection({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const blurPx  = useTransform(scrollYProgress, [0.5, 0.85], [0, 6]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0.45]);
  const filter  = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      <motion.div style={{ filter, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
