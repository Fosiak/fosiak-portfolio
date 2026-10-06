import { bentoSpan } from "@/components/bento/BentoGrid";
import { GlassCard } from "@/components/bento/GlassCard";
import { TechChipButton } from "@/components/stack/TechChipButton";
import { STACK } from "@/data/stack";

export function StackCard({ delay = 0 }: { delay?: number }) {
  return (
    <GlassCard glow="#6366f1" delay={delay} className={bentoSpan("1x2")}>
      <p className="font-mono text-xs text-indigo">{"// TECH STACK"}</p>
      <p className="mt-1 font-mono text-[10px] text-slate-500">
        kliknij technologię · Esc czyści
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {STACK.map((t) => (
          <TechChipButton key={t.id} id={t.id} />
        ))}
      </div>
    </GlassCard>
  );
}