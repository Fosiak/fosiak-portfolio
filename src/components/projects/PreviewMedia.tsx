"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { useCardHover } from "@/hooks/useCardHover";

const BARS = [40, 65, 30, 80, 55, 90, 45, 70, 35, 85, 50, 75, 60, 95];

function PlaceholderArt({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-3/5 items-end gap-2 px-5 pb-5">
      {BARS.map((h, i) => (
        <div
          key={i}
          className="flex-1 origin-bottom animate-[bar_2.4s_ease-in-out_infinite] rounded-t-sm"
          style={{
            height: `${h}%`,
            background: "linear-gradient(to top, transparent, var(--glow))",
            animationDelay: `${i * 0.15}s`,
            animationPlayState: active ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}

export function PreviewMedia({ preview }: { preview: Project["preview"] }) {
  const [ref, active] = useCardHover<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          active ? "opacity-60" : "opacity-25"
        }`}
      >
        {preview?.video ? (
          <video
            ref={videoRef}
            src={preview.video}
            poster={preview.poster}
            muted
            loop
            playsInline
            preload="none"
            className="size-full object-cover"
          />
        ) : preview?.iframe ? (
          active && (
            <iframe
              src={preview.iframe}
              title=""
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              className="size-full border-0"
            />
          )
        ) : (
          <PlaceholderArt active={active} />
        )}
      </div>

      {/* scrim: tekst zostaje czytelny */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/80" />

      {/* neonowa linia skanująca */}
      {active && (
        <div
          className="absolute inset-0 animate-[scan_2.2s_linear_infinite]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 75%, color-mix(in srgb, var(--glow) 22%, transparent) 97%, var(--glow) 100%)",
          }}
        />
      )}
    </div>
  );
}