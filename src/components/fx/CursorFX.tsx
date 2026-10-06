"use client";

import { useEffect, useRef } from "react";

export function CursorFX() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const glow = glowRef.current!;
    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let targetScale = 1;
    let scale = 1;
    let raf = 0;
    let visible = false;
    let first = true;

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      const o = v ? "1" : "0";
      glow.style.opacity = o;
      ring.style.opacity = o;
      dot.style.opacity = o;
    };

    const place = (el: HTMLElement, x: number, y: number, s = 1) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s})`;
    };

    const tick = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      place(ring, rx, ry, scale);
      place(glow, rx, ry);
      const moving =
        Math.abs(tx - rx) > 0.1 ||
        Math.abs(ty - ry) > 0.1 ||
        Math.abs(targetScale - scale) > 0.01;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (first) {
        rx = tx;
        ry = ty;
        first = false;
      }
      const target = e.target as Element | null;
      setVisible(!target?.closest(".glass-card"));
      targetScale = target?.closest("a, button, [data-cursor]") ? 1.8 : 1;
      place(dot, tx, ty);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base =
    "pointer-events-none fixed left-0 top-0 opacity-0 transition-opacity duration-300";

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className={`${base} -z-[5] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.13),rgba(99,102,241,0.06)_45%,transparent_70%)]`}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`${base} z-50 size-9 rounded-full border border-cyan/60`}
      />
      <div
        ref={dotRef}
        aria-hidden
        className={`${base} z-50 size-1.5 rounded-full bg-lime shadow-[0_0_8px_#00ff66]`}
      />
    </>
  );
}