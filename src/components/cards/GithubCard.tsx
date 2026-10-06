import { GlassCard } from "@/components/bento/GlassCard";
import { SITE } from "@/data/site";

export function GithubCard({ delay = 0 }: { delay?: number }) {
  return (
    <GlassCard glow="#00ff66" delay={delay} className="flex flex-col">
      <p className="font-mono text-xs text-lime">{"// GITHUB"}</p>
      <p className="mt-3 font-mono text-2xl text-white">@{SITE.githubUser}</p>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto font-mono text-sm text-lime transition-opacity hover:opacity-70"
      >
        github.com/{SITE.githubUser} ↗
      </a>
    </GlassCard>
  );
}