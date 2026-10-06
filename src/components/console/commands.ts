import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { SKILLS } from "@/data/skills";
import { STACK_BY_ID } from "@/data/stack";

export type Tone = "out" | "ok" | "err" | "muted" | "accent";
export type Line = { text: string; tone?: Tone };
export type Result = { lines: Line[]; action?: "clear" | "glitch" };

export const COMMAND_NAMES = [
  "about",
  "clear",
  "contact",
  "help",
  "projects",
  "skills",
];

const line = (text: string, tone: Tone = "out"): Line => ({ text, tone });
const lines = (texts: string[], tone: Tone = "out") =>
  texts.map((t) => line(t, tone));

const BAR_WIDTH = 20;

function skillsChart(): Line[] {
  return [
    line("Skills (self-assessed):", "accent"),
    ...SKILLS.map((s) => {
      const filled = Math.round((s.level / 100) * BAR_WIDTH);
      const bar = "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled);
      return line(
        `${s.label.padEnd(11)} ${bar} ${String(s.level).padStart(3)}%`,
        "ok",
      );
    }),
  ];
}

function projectsTree(): Line[] {
  const out: string[] = ["{"];
  PROJECTS.forEach((p, i) => {
    const stack = JSON.stringify(p.tech.map((id) => STACK_BY_ID[id].label)).replace(
      /,/g,
      ", ",
    );
    const last = i === PROJECTS.length - 1;
    out.push(`  "${p.id}": {`);
    out.push(`    "status": "${p.status}",`);
    out.push(`    "stack": ${stack}${p.repo ? "," : ""}`);
    if (p.repo) out.push(`    "repo": "${p.repo}"`);
    out.push(`  }${last ? "" : ","}`);
  });
  out.push("}");
  return lines(out, "ok");
}

export function runCommand(raw: string): Result {
  const input = raw.trim().replace(/\s+/g, " ");
  const lower = input.toLowerCase();
  const [cmd = ""] = lower.split(" ");

  if (lower === "sudo rm -rf /") {
    return {
      action: "glitch",
      lines: [
        line("[sudo] password for guest: ********", "muted"),
        line("rm: removing /  ...", "err"),
        line("rm: wiping portfolio.", "err"),
      ],
    };
  }

  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: lines([
          "Available commands:",
          "  help       list commands",
          "  skills     skill levels chart",
          "  projects   project tree",
          "  about      who am I",
          "  contact    where to find me",
          "  clear      clear screen (Ctrl+L)",
          "",
          "Tab completes, ↑/↓ browse history, Esc leaves the terminal.",
        ], "ok"),
      };
    case "skills":
      return { lines: skillsChart() };
    case "projects":
      return { lines: projectsTree() };
    case "about":
      return {
        lines: lines([
          "Fosiak - full-stack developer (Python, Django, React).",
          "I build apps with a focus on security and clean code.",
          "Working on: Finance Tracker, fosiak.pl",
        ]),
      };
    case "contact":
      return {
        lines: lines([
          `github   ${SITE.github}`,
          `site     ${SITE.url}`,
          "form     contact card below (coming soon)",
        ]),
      };
    case "clear":
      return { lines: [], action: "clear" };
    case "sudo":
      return {
        lines: [line("guest is not in the sudoers file. This incident will be reported.", "err")],
      };
    case "rm":
      return { lines: [line("rm: permission denied. Nice try.", "err")] };
    default:
      return {
        lines: [line(`${cmd}: command not found. Type 'help'.`, "err")],
      };
  }
}