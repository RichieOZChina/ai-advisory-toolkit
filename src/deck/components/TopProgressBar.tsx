export function TopProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="no-print fixed top-0 left-0 right-0 z-40 h-[3px] bg-[color:var(--muted-line)]">
      <div className="h-full bg-[color:var(--accent)]" style={{ width: `${pct}%`, transition: "width 220ms ease" }} />
    </div>
  );
}
