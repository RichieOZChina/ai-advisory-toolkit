const SEGMENTS = [
  { label: "Use daily", pct: 20, color: "#005cff" },
  { label: "Tried once or twice", pct: 50, color: "#7dd3fc" },
  { label: "Never used", pct: 30, color: "#cbd5e1" },
];

export function SurveyBar() {
  return (
    <div className="mt-8 max-w-3xl">
      <div className="slide-caption uppercase tracking-widest">Current AI usage · placeholder</div>
      <div className="mt-3 h-14 rounded-lg overflow-hidden flex">
        {SEGMENTS.map((s) => (
          <div key={s.label} className="flex items-center justify-center text-white font-semibold" style={{ width: `${s.pct}%`, background: s.color, color: s.pct > 25 ? "#fff" : "#0a2540" }}>
            {s.pct}%
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between slide-caption">
        {SEGMENTS.map((s) => <span key={s.label}>{s.label}</span>)}
      </div>
    </div>
  );
}
