import { STACK_BY_ID, type TechCategory, type TechId } from "@/data/stack";

export const CATEGORY_COLOR: Record<TechCategory, string> = {
  language: "#00ff66",
  frontend: "#00f0ff",
  backend: "#6366f1",
  data: "#00ff66",
  devops: "#6366f1",
};

export function TechChip({ id }: { id: TechId }) {
  const tech = STACK_BY_ID[id];
  const color = CATEGORY_COLOR[tech.category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm border bg-white/5 px-2 py-1 font-mono text-[11px]"
      style={{ color, borderColor: `${color}55` }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {tech.label}
    </span>
  );
}