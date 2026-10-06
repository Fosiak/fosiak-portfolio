export function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b0f19,#030712_70%)]" />
      <div className="grid-bg absolute inset-0 animate-[grid-pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -top-40 left-1/4 size-[28rem] rounded-full bg-indigo/20 blur-3xl" />
      <div className="absolute right-0 top-1/3 size-[24rem] rounded-full bg-cyan/10 blur-3xl" />
    </div>
  );
}