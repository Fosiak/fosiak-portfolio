"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TechId } from "@/data/stack";

type StackFilter = {
  selected: TechId | null;
  toggle: (id: TechId) => void;
  clear: () => void;
};

const StackFilterContext = createContext<StackFilter>({
  selected: null,
  toggle: () => {},
  clear: () => {},
});

export function StackFilterProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<TechId | null>(null);

  const toggle = useCallback(
    (id: TechId) => setSelected((cur) => (cur === id ? null : id)),
    [],
  );
  const clear = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({ selected, toggle, clear }),
    [selected, toggle, clear],
  );

  return (
    <StackFilterContext.Provider value={value}>
      {children}
    </StackFilterContext.Provider>
  );
}

export const useStackFilter = () => useContext(StackFilterContext);