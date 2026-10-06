import { BentoGrid, bentoSpan } from "@/components/bento/BentoGrid";
import { GlassCard } from "@/components/bento/GlassCard";
import { GithubCard } from "@/components/cards/GithubCard";
import { LocalClock } from "@/components/cards/LocalClock";
import { StackCard } from "@/components/cards/StackCard";
import { GridBackground } from "@/components/fx/GridBackground";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

export default function Home() {
  const [featured, docmind, syncboard, pulsewatch, portfolio] = PROJECTS;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <GridBackground />

      <header className="mb-10">
        <p className="font-mono text-sm text-lime">{"> fosiak.pl"}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[0.05em] text-white sm:text-6xl">
          Fullstack Developer
        </h1>
        <p className="mt-3 max-w-xl text-slate-400">
          Python, Django i React. Buduję aplikacje z naciskiem na bezpieczeństwo i
          jakość kodu.
        </p>
      </header>

      <BentoGrid>
        <ProjectCard project={featured} delay={0} />
        <StackCard delay={0.08} />
        <GithubCard delay={0.16} />
        <LocalClock delay={0.24} />

        <ProjectCard project={docmind} delay={0.1} />
        <ProjectCard project={syncboard} delay={0.18} />
        <ProjectCard project={pulsewatch} delay={0.26} />

        <GlassCard glow="#00ff66" className={bentoSpan("2x1")} delay={0.1}>
          <p className="font-mono text-xs text-lime">{"// TERMINAL"}</p>
          <p className="mt-3 font-mono text-sm text-slate-500">
            guest@fosiak:~$ (warstwa 6)
          </p>
        </GlassCard>

        <ProjectCard project={portfolio} delay={0.18} />

        <GlassCard glow="#6366f1" delay={0.26} className="flex flex-col">
          <p className="font-mono text-xs text-indigo">{"// CONTACT"}</p>
          <p className="mt-3 text-sm text-slate-400">
            Formularz kontaktowy pojawi się w warstwie 9.
          </p>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto font-mono text-sm text-indigo transition-opacity hover:opacity-70"
          >
            GitHub ↗
          </a>
        </GlassCard>
      </BentoGrid>
    </main>
  );
}