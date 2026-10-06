import { bentoSpan } from "@/components/bento/BentoGrid";
import { GlassCard } from "@/components/bento/GlassCard";
import { PreviewMedia } from "@/components/projects/PreviewMedia";
import { TaglineTicker } from "@/components/projects/TaglineTicker";
import { TechChip } from "@/components/stack/TechChip";
import type { Project, ProjectStatus } from "@/data/projects";

const STATUS: Record<ProjectStatus, { label: string; cls: string }> = {
  live: { label: "LIVE", cls: "text-lime border-lime/40" },
  "in-progress": { label: "W TRAKCIE", cls: "text-cyan border-cyan/40" },
  planned: { label: "PLANOWANY", cls: "text-slate-400 border-slate-600" },
};

export function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const status = STATUS[project.status];
  const limit = project.size === "1x1" ? 4 : project.tech.length;
  const shown = project.tech.slice(0, limit);
  const hidden = project.tech.length - shown.length;

  return (
    <GlassCard
      glow={project.glow}
      delay={delay}
      className={`flex flex-col ${bentoSpan(project.size)}`}
    >
      <PreviewMedia preview={project.preview} />

      <div className="flex items-center justify-between">
        <span
          className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-widest ${status.cls}`}
        >
          {status.label}
        </span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-white"
          >
            GitHub ↗
          </a>
        )}
      </div>

      <h2 className="mt-3 text-xl font-semibold tracking-wide text-white">
        {project.title}
      </h2>

      <TaglineTicker
        tagline={project.tagline}
        endpoint={project.telemetry.endpoint}
        baseMs={project.telemetry.baseMs}
      />

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {shown.map((id) => (
          <TechChip key={id} id={id} />
        ))}
        {hidden > 0 && (
          <span className="px-1 py-1 font-mono text-[11px] text-slate-500">
            +{hidden}
          </span>
        )}
      </div>
    </GlassCard>
  );
}