export type TechCategory =
  | "language"
  | "frontend"
  | "backend"
  | "data"
  | "devops";

export const TECH_IDS = [
  "python",
  "typescript",
  "django",
  "drf",
  "fastapi",
  "jwt",
  "react",
  "nextjs",
  "tailwind",
  "framermotion",
  "postgresql",
  "pgvector",
  "redis",
  "celery",
  "websockets",
  "llm",
  "docker",
  "githubactions",
] as const;

export type TechId = (typeof TECH_IDS)[number];

export type Tech = { id: TechId; label: string; category: TechCategory };

export const STACK: Tech[] = [
  { id: "python", label: "Python", category: "language" },
  { id: "typescript", label: "TypeScript", category: "language" },
  { id: "django", label: "Django", category: "backend" },
  { id: "drf", label: "DRF", category: "backend" },
  { id: "fastapi", label: "FastAPI", category: "backend" },
  { id: "jwt", label: "JWT / Auth", category: "backend" },
  { id: "react", label: "React", category: "frontend" },
  { id: "nextjs", label: "Next.js", category: "frontend" },
  { id: "tailwind", label: "Tailwind", category: "frontend" },
  { id: "framermotion", label: "Framer Motion", category: "frontend" },
  { id: "postgresql", label: "PostgreSQL", category: "data" },
  { id: "pgvector", label: "pgvector", category: "data" },
  { id: "redis", label: "Redis", category: "data" },
  { id: "celery", label: "Celery", category: "data" },
  { id: "websockets", label: "WebSockets", category: "backend" },
  { id: "llm", label: "LLM / RAG", category: "backend" },
  { id: "docker", label: "Docker", category: "devops" },
  { id: "githubactions", label: "GitHub Actions", category: "devops" },
];

export const STACK_BY_ID = Object.fromEntries(
  STACK.map((t) => [t.id, t]),
) as Record<TechId, Tech>;