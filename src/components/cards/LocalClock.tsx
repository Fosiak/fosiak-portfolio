"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/bento/GlassCard";
import { SITE } from "@/data/site";

export function LocalClock({ delay = 0 }: { delay?: number }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pl-PL", {
      timeZone: SITE.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassCard delay={delay} className="flex flex-col">
      <p className="font-mono text-xs text-cyan">{"// LOCATION"}</p>
      <p className="mt-3 font-mono text-3xl tabular-nums text-white">
        {time ?? "--:--:--"}
      </p>
      <p className="mt-auto font-mono text-xs text-slate-400">
        <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-lime" />
        {SITE.location} · {SITE.timezone}
      </p>
    </GlassCard>
  );
}