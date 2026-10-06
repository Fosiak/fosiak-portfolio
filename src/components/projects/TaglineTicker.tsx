"use client";

import { useEffect, useState } from "react";
import { useCardHover } from "@/hooks/useCardHover";

type Props = { tagline: string; endpoint: string; url?: string };

type Reading = {
  ok: boolean;
  status: string;
  ms: number;
  uptimeSec?: number;
  commit?: string;
};

async function probe(url: string): Promise<Reading | null> {
  const t0 = performance.now();
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    const ms = Math.round(performance.now() - t0);
    const data = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      status: `${res.status} ${res.statusText || (res.ok ? "OK" : "ERROR")}`,
      ms,
      uptimeSec: data.uptimeSec,
      commit: data.commit,
    };
  } catch {
    return null;
  }
}

function formatUptime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec % 60}s`;
}

export function TaglineTicker({ tagline, endpoint, url }: Props) {
  const [ref, active] = useCardHover<HTMLDivElement>();
  const [reading, setReading] = useState<Reading | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active || !url) return;
    let cancelled = false;

    const run = async () => {
      const r = await probe(url);
      if (cancelled) return;
      setReading(r);
      setFailed(r === null);
    };

    run();
    const id = setInterval(run, 2000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [active, url]);

  const row = "flex justify-between text-slate-300";

  return (
    <div ref={ref} className="relative mt-2 min-h-[112px]">
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

        {!url ? (
          <>
            <p className={row}>
              <span>API Status</span>
              <span className="text-slate-500">not deployed</span>
            </p>
            <p className={row}>
              <span>Response</span>
              <span className="text-slate-500">-</span>
            </p>
            <p className="text-slate-600">{"// no live backend yet"}</p>
          </>
        ) : (
          <>
            <p className={row}>
              <span>API Status</span>
              <span className={failed || reading?.ok === false ? "text-[#ff4d6d]" : "text-lime"}>
                {failed ? "unreachable" : (reading?.status ?? "...")}
              </span>
            </p>
            <p className={row}>
              <span>Response</span>
              <span className="tabular-nums text-cyan">
                {reading ? `${reading.ms}ms` : "..."}
              </span>
            </p>
            <p className={row}>
              <span>Uptime</span>
              <span className="tabular-nums text-lime">
                {reading?.uptimeSec != null ? formatUptime(reading.uptimeSec) : "-"}
              </span>
            </p>
            <p className={row}>
              <span>Build</span>
              <span className="text-indigo">{reading?.commit ?? "-"}</span>
            </p>
            <p className="text-slate-600">{"// live, measured in your browser"}</p>
          </>
        )}
      </div>
    </div>
  );
}