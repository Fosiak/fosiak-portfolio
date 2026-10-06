"use client";

import { STACK_BY_ID, type TechId } from "@/data/stack";
import { CATEGORY_COLOR } from "./TechChip";
import { useStackFilter } from "./StackFilterContext";

export function TechChipButton({ id }: { id: TechId }) {
  const { selected, toggle } = useStackFilter();
  const tech = STACK_BY_ID[id];
  const color = CATEGORY_COLOR[tech.category];
  const on = selected === id;
  const off = selected !== null && !on;

  return (
    <button
      type="button"
      data-tech-chip={id}
      aria-pressed={on}
      onClick={() => toggle(id)}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[11px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        on ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
      } ${off ? "opacity-40" : "opacity-100"}`}
      style={{
        color,
        borderColor: on ? color : `${color}55`,
        boxShadow: on ? `0 0 14px ${color}88` : undefined,
        outlineColor: color,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {tech.label}
    </button>
  );
}