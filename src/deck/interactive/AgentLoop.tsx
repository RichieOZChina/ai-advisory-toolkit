export function AgentLoop() {
  const nodes = [
    { t: "Observe", angle: 270 },
    { t: "Decide", angle: 0 },
    { t: "Act", angle: 90 },
  ];
  const tools = ["Email", "Calendar", "Database", "Files", "Browser"];
  return (
    <div className="mt-6 grid md:grid-cols-[1fr_320px] gap-8 items-center">
      <svg viewBox="0 0 400 360" className="w-full">
        <circle cx={200} cy={180} r={110} fill="none" stroke="#cbd5e1" strokeDasharray="4 4" />
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 110;
          const y = 180 + Math.sin(rad) * 110;
          return (
            <g key={n.t}>
              <circle cx={x} cy={y} r={40} fill="#005cff" />
              <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontWeight={600} fontSize={13}>{n.t}</text>
            </g>
          );
        })}
        {/* Arrows around */}
        <path d="M 200 70 A 110 110 0 0 1 310 180" fill="none" stroke="#005cff" strokeWidth={1.5} markerEnd="url(#a)" />
        <path d="M 310 180 A 110 110 0 0 1 200 290" fill="none" stroke="#005cff" strokeWidth={1.5} markerEnd="url(#a)" />
        <path d="M 200 290 A 110 110 0 0 1 90 180" fill="none" stroke="#005cff" strokeWidth={1.5} markerEnd="url(#a)" />
        <path d="M 90 180 A 110 110 0 0 1 200 70" fill="none" stroke="#005cff" strokeWidth={1.5} markerEnd="url(#a)" />
        <defs><marker id="a" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#005cff" /></marker></defs>
      </svg>
      <div>
        <div className="slide-caption uppercase tracking-widest">Tools it can reach</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tools.map((t) => <span key={t} className="slide-chip">{t}</span>)}
        </div>
        <p className="slide-body mt-6">An agent is an LLM in a loop, with access to tools and a goal. Every consequential action should sit behind a human approval.</p>
      </div>
    </div>
  );
}
