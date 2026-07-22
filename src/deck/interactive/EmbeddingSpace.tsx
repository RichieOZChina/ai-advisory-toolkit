const POINTS = [
  { w: "king", x: 0.72, y: 0.72 },
  { w: "queen", x: 0.55, y: 0.78 },
  { w: "man", x: 0.75, y: 0.5 },
  { w: "woman", x: 0.58, y: 0.55 },
  { w: "prince", x: 0.68, y: 0.85 },
  { w: "apple", x: 0.18, y: 0.22 },
  { w: "orange", x: 0.24, y: 0.28 },
  { w: "banana", x: 0.14, y: 0.32 },
];

export function EmbeddingSpace() {
  return (
    <div className="mt-4 grid md:grid-cols-[1fr_320px] gap-8 items-start">
      <div className="relative bg-[color:var(--secondary)] rounded-xl aspect-[4/3] border border-[color:var(--muted-line)]">
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          {/* king - man + woman = queen arrows */}
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#005cff" /></marker>
          </defs>
          <line x1={POINTS[0].x * 400} y1={POINTS[0].y * 300} x2={POINTS[2].x * 400} y2={POINTS[2].y * 300} stroke="#005cff" strokeDasharray="4 3" markerEnd="url(#arr)" />
          <line x1={POINTS[3].x * 400} y1={POINTS[3].y * 300} x2={POINTS[1].x * 400} y2={POINTS[1].y * 300} stroke="#005cff" strokeDasharray="4 3" markerEnd="url(#arr)" />
        </svg>
        {POINTS.map((p) => (
          <div key={p.w} className="absolute" style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, transform: "translate(-50%,-50%)" }}>
            <div className="w-2.5 h-2.5 rounded-full bg-[color:var(--navy)]" />
            <div className="text-xs font-medium mt-1 whitespace-nowrap">{p.w}</div>
          </div>
        ))}
      </div>
      <div className="slide-card">
        <div className="slide-chip">Vector math</div>
        <div className="mt-3 font-mono text-sm">king − man + woman ≈ queen</div>
        <p className="slide-body mt-4">Words with similar meaning cluster together in high-dimensional space. Relationships are directions in that space.</p>
      </div>
    </div>
  );
}
