const WORDS = ["The", "vendor", "DD", "flagged", "three", "risks", "to", "EBITDA"];
// attention weights from "risks" (index 5) to every other word
const WEIGHTS = [0.1, 0.4, 0.7, 0.8, 0.3, 1.0, 0.05, 0.9];

export function AttentionDiagram() {
  const focusIdx = 5;
  return (
    <div className="mt-6">
      <svg viewBox="0 0 800 200" className="w-full">
        {WORDS.map((w, i) => {
          const x = 60 + i * 90;
          return (
            <g key={i}>
              <rect x={x - 35} y={80} width={70} height={36} rx={6} fill={i === focusIdx ? "#005cff" : "#fff"} stroke="#005cff" />
              <text x={x} y={104} textAnchor="middle" fontSize={13} fontWeight={600} fill={i === focusIdx ? "#fff" : "#0a2540"}>{w}</text>
              {i !== focusIdx && (
                <line
                  x1={60 + focusIdx * 90}
                  y1={80}
                  x2={x}
                  y2={116}
                  stroke="#005cff"
                  strokeOpacity={WEIGHTS[i]}
                  strokeWidth={WEIGHTS[i] * 4}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div className="slide-caption mt-2">Each word attends to every other word. Thicker lines = stronger attention weight. Shown from "risks".</div>
    </div>
  );
}
