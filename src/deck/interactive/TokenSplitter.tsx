import { useState } from "react";

const SENTENCE = "The vendor DD flagged three material risks to EBITDA.";
// simple faux-tokenization
const TOKENS = ["The", " vendor", " DD", " flagged", " three", " material", " risks", " to", " E", "BIT", "DA", "."];
const COLORS = ["#005cff","#7c3aed","#059669","#d97706","#0891b2","#dc2626","#0a2540","#4338ca","#065f46","#a16207","#9333ea","#334155"];

export function TokenSplitter() {
  const [showIds, setShowIds] = useState(false);
  return (
    <div className="mt-4">
      <div className="slide-card">
        <div className="slide-caption uppercase tracking-widest">Input sentence</div>
        <div className="mt-2 font-mono text-lg">"{SENTENCE}"</div>
      </div>
      <div className="text-center text-2xl text-[color:var(--accent)] my-4">↓</div>
      <div className="flex flex-wrap gap-1">
        {TOKENS.map((t, i) => (
          <div key={i} className="px-2.5 py-1.5 rounded font-mono text-[13px] text-white" style={{ background: COLORS[i % COLORS.length] }}>
            {showIds ? Math.floor(Math.random() * 50000 + 1000) : t.replace(" ", "␣")}
          </div>
        ))}
      </div>
      <button onClick={() => setShowIds((s) => !s)} className="mt-4 text-sm text-[color:var(--accent)] font-medium underline underline-offset-4">
        {showIds ? "Show tokens" : "Show token IDs"}
      </button>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="slide-card"><div className="slide-caption uppercase">Rule of thumb</div><div className="mt-2 slide-body"><b>~100 tokens ≈ 75 words.</b></div></div>
        <div className="slide-card"><div className="slide-caption uppercase">Pricing</div><div className="mt-2 slide-body">You pay per token — <b>input + output</b>.</div></div>
      </div>
    </div>
  );
}
