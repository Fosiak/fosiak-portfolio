"use client";

import { useEffect, useRef, useState } from "react";

export function useCardHover<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const card = ref.current?.closest(".glass-card");
    if (!card) return;

    const on = () => setActive(true);
    const off = () => setActive(false);

    card.addEventListener("pointerenter", on);
    card.addEventListener("pointerleave", off);
    card.addEventListener("focusin", on);
    card.addEventListener("focusout", off);
    return () => {
      card.removeEventListener("pointerenter", on);
      card.removeEventListener("pointerleave", off);
      card.removeEventListener("focusin", on);
      card.removeEventListener("focusout", off);
    };
  }, []);

  return [ref, active] as const;
}