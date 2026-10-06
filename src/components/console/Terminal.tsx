"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { bentoSpan } from "@/components/bento/BentoGrid";
import { GlassCard } from "@/components/bento/GlassCard";
import { COMMAND_NAMES, runCommand, type Line, type Tone } from "./commands";

const MatrixGlitch = dynamic(() =>
  import("./MatrixGlitch").then((m) => m.MatrixGlitch),
);

type Entry = Line & { echo?: boolean };

const BANNER: Entry[] = [
  { text: "fosiak.pl terminal v1.0", tone: "accent" },
  { text: "Type 'help' to list commands.", tone: "muted" },
];

const TONE: Record<Tone, string> = {
  out: "text-slate-300",
  ok: "text-lime",
  err: "text-[#ff4d6d]",
  muted: "text-slate-500",
  accent: "text-cyan",
};

function Prompt() {
  return (
    <span className="mr-2 shrink-0 select-none">
      <span className="text-lime">guest@fosiak</span>
      <span className="text-slate-500">:</span>
      <span className="text-indigo">~</span>
      <span className="text-slate-500">$</span>
    </span>
  );
}

export function Terminal({ delay = 0 }: { delay?: number }) {
  const [entries, setEntries] = useState<Entry[]>(BANNER);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  function submit() {
    const input = value.trim();
    setValue("");
    cursor.current = -1;

    if (input && history.current.at(-1) !== input) history.current.push(input);

    const result = runCommand(input);
    if (result.action === "clear") {
      setEntries([]);
      return;
    }
    setEntries((prev) =>
      [...prev, { text: value, echo: true }, ...result.lines].slice(-200),
    );
    if (result.action === "glitch") setGlitch(true);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const h = history.current;

    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!h.length) return;
      cursor.current =
        cursor.current === -1 ? h.length - 1 : Math.max(0, cursor.current - 1);
      setValue(h[cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor.current === -1) return;
      cursor.current += 1;
      if (cursor.current >= h.length) {
        cursor.current = -1;
        setValue("");
      } else {
        setValue(h[cursor.current]);
      }
    } else if (e.key === "Tab") {
      const typed = value.trim().toLowerCase();
      const matches = typed
        ? COMMAND_NAMES.filter((c) => c.startsWith(typed))
        : [];
      if (matches.length === 1) {
        e.preventDefault();
        setValue(matches[0]);
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setEntries([]);
    } else if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }

  return (
    <>
      <GlassCard
        glow="#00ff66"
        delay={delay}
        className={`flex flex-col ${bentoSpan("2x1")}`}
      >
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-lime">{"// TERMINAL"}</span>
          <span className={focused ? "text-lime" : "text-slate-600"}>
            {focused ? "● input active" : "click to focus"}
          </span>
        </div>

        <div
          onClick={() => inputRef.current?.focus()}
          className="mt-3 flex min-h-0 flex-1 cursor-text flex-col rounded-sm bg-black/40 p-3 font-mono text-xs leading-relaxed"
        >
          <div ref={logRef} className="min-h-[150px] flex-1 overflow-y-auto">
            {entries.map((e, i) =>
              e.echo ? (
                <div key={i} className="flex">
                  <Prompt />
                  <span className="whitespace-pre-wrap break-all text-white">
                    {e.text}
                  </span>
                </div>
              ) : (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${TONE[e.tone ?? "out"]}`}
                >
                  {e.text || "\u00a0"}
                </div>
              ),
            )}
          </div>

          <div className="relative flex items-center pt-1">
            <Prompt />
            <span className="whitespace-pre text-white">{value}</span>
            <span
              className={`ml-px inline-block h-[1.1em] w-[0.6em] bg-lime ${
                focused ? "animate-[blink_1s_steps(2)_infinite]" : "opacity-40"
              }`}
            />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onSelect={(e) => {
                const t = e.currentTarget;
                t.setSelectionRange(t.value.length, t.value.length);
              }}
              aria-label="Terminal input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="absolute inset-0 size-full cursor-text opacity-0"
            />
          </div>
        </div>
      </GlassCard>

      {glitch && <MatrixGlitch />}
    </>
  );
}