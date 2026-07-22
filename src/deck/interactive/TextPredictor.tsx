import { useEffect, useState } from "react";

const SENTENCE = ["The", "vendor", "flagged", "three", "material", "risks", "to", "EBITDA."];

export function TextPredictor() {
  const [i, setI] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v >= SENTENCE.length ? 1 : v + 1)), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-8 slide-card-dark max-w-3xl">
      <div className="slide-caption text-slate-400 uppercase tracking-widest">Next word →</div>
      <div className="mt-2 font-mono text-xl md:text-2xl leading-relaxed">
        {SENTENCE.slice(0, i).map((w, k) => (
          <span key={k} className={k === i - 1 ? "bg-[color:var(--accent)] px-1.5 rounded" : ""}>{k > 0 ? " " : ""}{w}</span>
        ))}
        <span className="animate-pulse text-[color:var(--accent)]">▍</span>
      </div>
    </div>
  );
}
