import { GlassCard } from "@/components/bento/GlassCard";
import { bentoSpan } from "@/components/bento/BentoGrid";
import { TechChip } from "@/components/stack/TechChip";
import { STACK } from "@/data/stack";

export function StackCard({ delay = 0 }: { delay?: number }) {
  return (
    <GlassCard glow="#6366f1" delay={delay} className={bentoSpan("1x2")}>
      <p className="font-mono text-xs text-indigo">{"// TECH STACK"}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {STACK.map((t) => (
          <TechChip key={t.id} id={t.id} />
        ))}
      </div>
    </GlassCard>
  );
}