"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STACK_BY_ID } from "@/data/stack";
import { useStackFilter } from "./StackFilterContext";
import { CATEGORY_COLOR } from "./TechChip";

type Edge = { d: string; x: number; y: number };

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export function DependencyGraph() {
  const { selected } = useStackFilter();
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root || !selected) return;

    const compute = () => {
      const chip = root.querySelector<HTMLElement>(
        `[data-tech-chip="${selected}"]`,
      );
      if (!chip) return setEdges([]);

      const base = root.getBoundingClientRect();
      const c = chip.getBoundingClientRect();
      const sx = c.left + c.width / 2 - base.left;
      const sy = c.top + c.height / 2 - base.top;

      const cards = root.querySelectorAll<HTMLElement>(
        '[data-filter="match"]',
      );
      setEdges(
        Array.from(cards).map((card) => {
          const r = card.getBoundingClientRect();
          // najbliższy punkt na krawędzi karty
          const x = clamp(sx, r.left - base.left, r.right - base.left);
          const y = clamp(sy, r.top - base.top, r.bottom - base.top);
          const mx = (sx + x) / 2;
          return { d: `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${y}, ${x} ${y}`, x, y };
        }),
      );
    };

    compute();
    const t = setTimeout(compute, 800);
    const ro = new ResizeObserver(compute);
    ro.observe(root);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [selected]);

  const color = selected
    ? CATEGORY_COLOR[STACK_BY_ID[selected].category]
    : "#00f0ff";
  const visible = selected ? edges : [];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
    >
      <svg
        className="size-full overflow-visible"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      >
        {visible.map((e, i) => (
          <g key={`${selected}-${i}`}>
            <motion.path
              d={e.d}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={e.x}
              cy={e.y}
              fill={color}
              initial={{ r: 0 }}
              animate={{ r: 4 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}