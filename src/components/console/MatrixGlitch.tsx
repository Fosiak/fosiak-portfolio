"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const CHARS = "アイウエオカキクケコサシスセソ0123456789ABCDEF<>/{}$#";
const FONT_SIZE = 16;

export function MatrixGlitch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"glitch" | "reboot">("glitch");

  // sekwencja: 3 s glitcha, potem "reboot" i prawdziwe przeładowanie
  useEffect(() => {
    document.documentElement.classList.add("glitching");
    const t1 = setTimeout(() => setPhase("reboot"), 3000);
    const t2 = setTimeout(() => window.location.reload(), 3900);
    return () => {
      document.documentElement.classList.remove("glitching");
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const cols = Math.ceil(w / FONT_SIZE);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 50) return;
      last = t;

      ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = Math.random() > 0.97 ? "#ffffff" : "#00ff66";
        ctx.fillText(ch, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return createPortal(
    <div role="status" className="fixed inset-0 z-[100] bg-obsidian">
      <canvas ref={canvasRef} className="size-full" />
      {phase === "reboot" && (
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian font-mono text-lime">
          {"> rebooting fosiak.pl"}
          <span className="animate-pulse">...</span>
        </div>
      )}
    </div>,
    document.body,
  );
}