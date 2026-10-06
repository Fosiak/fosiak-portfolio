"use client";

import { motion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: string;
  delay?: number;
};

export function GlassCard({
  children,
  className = "",
  glow = "#00f0ff",
  delay = 0,
}: GlassCardProps) {
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ "--glow": glow } as React.CSSProperties}
      className={`glass-card p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}