import { useState } from "react";

const ZONES = [
  { id: "ai", label: "AI only", def: "Rule-based systems and expert systems — logic without learning." },
  { id: "ml", label: "ML ∩ AI", def: "Systems that learn from data — but not necessarily using neural networks." },
  { id: "dl", label: "DL ∩ ML ∩ AI", def: "Deep neural networks — the engine behind modern LLMs and computer vision." },
];

export function VennDiagram() {
  const [hover, setHover] = useState<string>("dl");
  const sel = ZONES.find((z) => z.id === hover)!;
  return (
    <div className="mt-4 grid md:grid-cols-[1fr_320px] gap-8 items-center">
      <svg viewBox="0 0 500 340" className="w-full h-auto">
        <circle cx={180} cy={170} r={140} fill="#005cff" fillOpacity={0.08} stroke="#005cff" strokeWidth={1.5} onMouseEnter={() => setHover("ai")} style={{ cursor: "pointer" }} />
        <circle cx={280} cy={170} r={110} fill="#005cff" fillOpacity={0.12} stroke="#005cff" strokeWidth={1.5} onMouseEnter={() => setHover("ml")} style={{ cursor: "pointer" }} />
        <circle cx={340} cy={170} r={72} fill="#005cff" fillOpacity={0.2} stroke="#005cff" strokeWidth={1.5} onMouseEnter={() => setHover("dl")} style={{ cursor: "pointer" }} />
        <text x={80} y={90} fontSize={13} fontWeight={600} fill="#0a2540">AI</text>
        <text x={230} y={80} fontSize={13} fontWeight={600} fill="#0a2540">ML</text>
        <text x={340} y={100} fontSize={13} fontWeight={600} fill="#005cff">DL</text>
      </svg>
      <div className="slide-card">
        <div className="slide-chip">{sel.label}</div>
        <p className="slide-body mt-4">{sel.def}</p>
        <div className="slide-caption mt-6">Hover any zone in the diagram.</div>
      </div>
    </div>
  );
}
