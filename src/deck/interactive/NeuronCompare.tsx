export function NeuronCompare() {
  return (
    <div className="mt-6 grid md:grid-cols-[1fr_120px_1fr] gap-6 items-center">
      {/* Biological */}
      <div className="slide-card">
        <div className="slide-chip">Biological</div>
        <svg viewBox="0 0 320 180" className="mt-4 w-full">
          <circle cx={180} cy={90} r={30} fill="#e6efff" stroke="#005cff" strokeWidth={1.5} />
          <text x={180} y={94} textAnchor="middle" fontSize={11} fill="#0a2540">soma</text>
          {[0, 30, -30, 60, -60].map((a, i) => (
            <line key={i} x1={180 - 30 - Math.cos((a * Math.PI) / 180) * 5} y1={90 + Math.sin((a * Math.PI) / 180) * 25} x2={40} y2={90 + a * 1.5} stroke="#94a3b8" strokeWidth={1.5} />
          ))}
          <line x1={210} y1={90} x2={300} y2={90} stroke="#005cff" strokeWidth={2} />
          <text x={90} y={30} fontSize={11} fill="#64748b">dendrites</text>
          <text x={250} y={80} fontSize={11} fill="#64748b">axon</text>
        </svg>
      </div>
      <div className="text-center">
        <div className="text-3xl text-[color:var(--accent)]">→</div>
        <div className="slide-caption mt-2 max-w-[120px] mx-auto">inspired by, not copied from</div>
      </div>
      {/* Artificial */}
      <div className="slide-card">
        <div className="slide-chip">Artificial</div>
        <svg viewBox="0 0 320 180" className="mt-4 w-full">
          {[40, 90, 140].map((y, i) => (
            <g key={i}>
              <circle cx={30} cy={y} r={10} fill="#fff" stroke="#94a3b8" />
              <text x={30} y={y + 4} textAnchor="middle" fontSize={10}>x{i + 1}</text>
              <line x1={40} y1={y} x2={140} y2={90} stroke="#94a3b8" />
              <text x={80} y={y - 4} fontSize={10} fill="#005cff">w{i + 1}</text>
            </g>
          ))}
          <circle cx={155} cy={90} r={16} fill="#e6efff" stroke="#005cff" />
          <text x={155} y={94} textAnchor="middle" fontSize={10}>Σ</text>
          <line x1={172} y1={90} x2={220} y2={90} stroke="#005cff" />
          <rect x={220} y={78} width={40} height={24} rx={4} fill="#0a2540" />
          <text x={240} y={94} textAnchor="middle" fontSize={10} fill="#fff">act</text>
          <line x1={260} y1={90} x2={310} y2={90} stroke="#005cff" strokeWidth={2} />
          <text x={295} y={82} textAnchor="middle" fontSize={10} fill="#005cff">y</text>
        </svg>
      </div>
    </div>
  );
}
