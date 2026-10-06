import type { BentoSize } from "@/components/bento/BentoGrid";
import { SITE } from "./site";
import type { TechId } from "./stack";

export type ProjectStatus = "live" | "in-progress" | "planned";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  size: BentoSize;
  glow: string;
  tech: TechId[];
  repo?: string;
  demo?: string;
  telemetry: { endpoint: string; url?: string };
  preview?: { poster?: string; video?: string; iframe?: string };
};

export const PROJECTS: Project[] = [
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    tagline:
      "Aplikacja do zarządzania finansami z uwierzytelnianiem klasy produkcyjnej: rotacja refresh tokenów z wykrywaniem reuse, ciasteczka HttpOnly, CSRF, hashowane tokeny jednorazowe.",
    status: "in-progress",
    size: "2x2",
    glow: "#00f0ff",
    tech: ["python", "django", "drf", "jwt", "react", "tailwind", "postgresql"],
    telemetry: { endpoint: "POST /api/auth/token/refresh" },
  },
  {
    id: "docmind",
    title: "DocMind",
    tagline:
      "Pytania do własnych dokumentów (PDF/MD): RAG z wyszukiwaniem wektorowym i odpowiedziami streamowanymi na żywo z cytowaniem źródeł.",
    status: "planned",
    size: "2x1",
    glow: "#00ff66",
    tech: ["python", "fastapi", "llm", "pgvector", "postgresql", "nextjs", "docker"],
    telemetry: { endpoint: "POST /v1/query (SSE)"},
  },
  {
    id: "syncboard",
    title: "SyncBoard",
    tagline:
      "Tablica współpracy w czasie rzeczywistym: kursory innych osób, edycja bez konfliktów, WebSockets.",
    status: "planned",
    size: "1x1",
    glow: "#6366f1",
    tech: ["django", "websockets", "redis", "react", "typescript"],
    telemetry: { endpoint: "WS /board/sync"},
  },
  {
    id: "pulsewatch",
    title: "PulseWatch",
    tagline:
      "Monitoring uptime i alerty: zadania w tle, wykresy opóźnień, status page.",
    status: "planned",
    size: "1x1",
    glow: "#00ff66",
    tech: ["django", "celery", "redis", "postgresql", "docker", "githubactions"],
    telemetry: { endpoint: "GET /api/checks"},
  },
  {
    id: "fosiak-portfolio",
    title: "fosiak.pl",
    tagline:
      "Ta strona: bento grid, filtr stacku z grafem zależności, terminal, API kontaktowe i live dane z GitHuba.",
    status: "in-progress",
    size: "1x1",
    glow: "#00f0ff",
    tech: ["nextjs", "typescript", "tailwind", "framermotion", "docker"],
    repo: SITE.repo,
    telemetry: { endpoint: "GET /api/health", url: "/api/health" },
  },
];