import type { ReactNode } from "react";

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid auto-rows-[minmax(190px,auto)] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

const SPANS = {
  "1x1": "",
  "2x1": "sm:col-span-2",
  "1x2": "lg:row-span-2",
  "2x2": "sm:col-span-2 lg:row-span-2",
} as const;

export type BentoSize = keyof typeof SPANS;

export const bentoSpan = (size: BentoSize) => SPANS[size];