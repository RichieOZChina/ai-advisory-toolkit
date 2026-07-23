import { useState } from "react";

const SENTENCE = ["The", "vendor", "flagged", "three", "risks", "to", "EBITDA", "in", "Appendix", "B"];

// Attention weights from each word to every other. Higher = more attention.
// Hand-curated to reflect real semantic dependencies.
const WEIGHTS: Record<number, number[]> = {
  0: [0, 0.2, 0.1, 0.05, 0.15, 0.05, 0.05, 0.05, 0.1, 0.05],
  1: [0.3, 0, 0.5, 0.1, 0.35, 0.05, 0.15, 0.05, 0.05, 0.05],
  2: [0.05, 0.6, 0, 0.4, 0.9, 0.15, 0.35, 0.1, 0.15, 0.05],
  3: [0.05, 0.1, 0.3, 0, 0.85, 0.05, 0.15, 0.05, 0.05, 0.05],
  4: [0.1, 0.3, 0.75, 0.7, 0, 0.4, 0.95, 0.15, 0.25, 0.15],
  5: [0.05, 0.1, 0.15, 0.05, 0.6, 0, 0.85, 0.05, 0.1, 0.05],
  6: [0.05, 0.15, 0.35, 0.1, 0.9, 0.6, 0, 0.15, 0.4, 0.15],
  7: [0.05, 0.05, 0.1, 0.05, 0.15, 0.05, 0.15, 0, 0.7, 0.4],
  8: [0.05, 0.05, 0.05, 0.05, 0.15, 0.05, 0.25, 0.35, 0, 0.9],
  9: [0.05, 0.05, 0.05, 0.05, 0.15, 0.05, 0.2, 0.45, 0.85, 0],
};

export function AttentionDiagram() {
  const [focus, setFocus] = useState(4); // "risks"
  const W = WEIGHTS[focus];
  const cx = (i: number) => 60 + i * 74;

  return (
    <div className="mt-4">
      <div className="slide-caption mb-3">Click any word to see what it "attends to". Line opacity + thickness = attention weight.</div>
      <div className="rounded-xl p-6" style={{ background: "linear-gradient(180deg, rgba(0,92,255,0.04), transparent)", border: "1px solid var(--muted-line)" }}>
        <svg viewBox="0 0 800 220" className="w-full">
          <defs>
            <linearGradient id="attgrad" x1="0" x2="1">
              <stop offset="0" stopColor="#005cff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#005cff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Curved attention arcs */}
          {SENTENCE.map((_, i) => {
            if (i === focus) return null;
            const x1 = cx(focus), x2 = cx(i);
            const midX = (x1 + x2) / 2;
            const dist = Math.abs(x2 - x1);
            const midY = 110 - Math.min(70, dist * 0.35);
            return (
              <path
                key={i}
                d={`M ${x1} 110 Q ${midX} ${midY} ${x2} 110`}
                fill="none"
                stroke="#005cff"
                strokeOpacity={0.15 + W[i] * 0.75}
                strokeWidth={1 + W[i] * 5}
                strokeLinecap="round"
              />
            );
          })}
          {/* Word chips */}
          {SENTENCE.map((w, i) => {
            const isFocus = i === focus;
            const weight = W[i];
            return (
              <g key={i} onClick={() => setFocus(i)} style={{ cursor: "pointer" }}>
                <rect
                  x={cx(i) - 34}
                  y={94}
                  width={68}
                  height={32}
                  rx={8}
                  fill={isFocus ? "#005cff" : "#ffffff"}
                  stroke={isFocus ? "#005cff" : "rgba(0,92,255," + (0.25 + weight * 0.7) + ")"}
                  strokeWidth={isFocus ? 2 : 1 + weight * 2}
                />
                <text
                  x={cx(i)}
                  y={114}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={600}
                  fill={isFocus ? "#ffffff" : "#0a2540"}
                >{w}</text>
                {!isFocus && weight > 0.5 && (
                  <text x={cx(i)} y={148} textAnchor="middle" fontSize={10} fill="#005cff" fontWeight={600}>
                    {weight.toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="slide-caption mt-3 text-center">
          Focus word: <b style={{ color: "var(--accent)" }}>{SENTENCE[focus]}</b> — the model reads this by looking hardest at{" "}
          <b>{SENTENCE.map((w, i) => ({ w, s: W[i] })).sort((a, b) => b.s - a.s).slice(0, 2).map(x => `"${x.w}"`).join(" and ")}</b>.
        </div>
      </div>
    </div>
  );
}
