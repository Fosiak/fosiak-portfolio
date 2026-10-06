"use client";

import { useEffect, useState } from "react";
import { useCardHover } from "@/hooks/useCardHover";

type Props = { tagline: string; endpoint: string; baseMs: number };

export function TaglineTicker({ tagline, endpoint, baseMs }: Props) {
  const [ref, active] = useCardHover<HTMLDivElement>();
  const [latency, setLatency] = useState(baseMs);
  const [pool, setPool] = useState(3);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setLatency(
        Math.max(4, Math.round(baseMs + (Math.random() - 0.4) * baseMs * 0.5)),
      );
      setPool(2 + Math.floor(Math.random() * 5));
    }, 900);
    return () => clearInterval(id);
  }, [active, baseMs]);

  return (
    <div ref={ref} className="relative mt-2 min-h-[84px]">
      <p
        className={`text-sm leading-relaxed text-slate-400 transition-opacity duration-300 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        {tagline}
      </p>

      <div
        aria-hidden
        className={`absolute inset-0 space-y-1 font-mono text-[11px] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="truncate text-slate-500">{`> ${endpoint}`}</p>
        <p className="flex justify-between text-slate-300">
          <span>API Status</span>
          <span className="text-lime">200 OK</span>
        </p>
        <p className="flex justify-between text-slate-300">
          <span>Response</span>
          <span className="tabular-nums text-cyan">{latency}ms</span>
        </p>
        <p className="flex justify-between text-slate-300">
          <span>DB Pool</span>
          <span className="tabular-nums text-lime">active {pool}/10</span>
        </p>
        <p className="text-slate-600">{"// simulated telemetry"}</p>
      </div>
    </div>
  );
}