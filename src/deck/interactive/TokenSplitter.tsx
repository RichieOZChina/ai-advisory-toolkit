import { useState } from "react";

const SENTENCE = "The vendor DD flagged three material risks to EBITDA.";
// simple faux-tokenization
const TOKENS = ["The", " vendor", " DD", " flagged", " three", " material", " risks", " to", " E", "BIT", "DA", "."];
const TOKEN_IDS = [791, 3628, 17462, 20771, 1024, 4009, 7085, 311, 36, 16621, 6857, 13];
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
            {showIds ? TOKEN_IDS[i] : t.replace(" ", "␣")}
          </div>
        ))}
      </div>
      <button onClick={() => setShowIds((s) => !s)} className="mt-4 text-sm text-[color:var(--accent)] font-medium underline underline-offset-4">
        {showIds ? "Show tokens" : "Show token IDs"}
      </button>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="slide-card">
          <div className="slide-caption uppercase">What is a token?</div>
          <div className="mt-2 slide-body">
            The <b>smallest meaningful unit of text</b> the model can process. Usually a word or piece of a word — not a letter.
          </div>
        </div>
        <div className="slide-card">
          <div className="slide-caption uppercase">Why tokens matter</div>
          <div className="mt-2 slide-body">
            <b>Pricing</b> is charged per token, and <b>context length</b> limits how many tokens a model can handle at once.
          </div>
        </div>
        <div className="slide-card">
          <div className="slide-caption uppercase">What are token IDs?</div>
          <div className="mt-2 slide-body">
            Each token is mapped to a <b>unique number</b>. The model does not read words — it reads these IDs.
          </div>
        </div>
      </div>

      <div className="mt-4 slide-card">
        <div className="slide-caption uppercase">Rule of thumb</div>
        <div className="mt-2 slide-body">
          <b>~100 tokens ≈ 75 words</b> (roughly <b>words × 1.33</b>). A word like "hamburgers" can split into three tokens: <span className="font-mono text-[color:var(--accent)]">h</span>, <span className="font-mono text-[color:var(--accent)]">amburg</span>, <span className="font-mono text-[color:var(--accent)]">ers</span>.
        </div>
      </div>
    </div>
  );
}
