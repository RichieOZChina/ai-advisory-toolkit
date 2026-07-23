import { useState } from "react";

const CHUNKS = [
  { id: 1, text: "Customer concentration: top 3 clients = 62% of FY24 revenue.", score: 0.91, hit: true },
  { id: 2, text: "Founder / CEO holds all key supplier relationships (key-person risk).", score: 0.42, hit: false },
  { id: 3, text: "Gross margin compressed 340bps YoY on higher input costs.", score: 0.38, hit: false },
  { id: 4, text: "Appendix B, p.47 — quantified concentration risk scenarios.", score: 0.78, hit: true },
];

export function RagFlow() {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="mt-4 space-y-8">
      {/* Framing */}
      <div className="grid md:grid-cols-[1.15fr_1fr] gap-5">
        <div className="slide-card">
          <div className="slide-chip">Why RAG exists</div>
          <p className="slide-body mt-3">
            An LLM only knows what it was trained on — <b>public internet up to a cut-off date</b>. It has never seen
            your VDR, your CIM, your comps, or your models. Ask it about the Northstar deal and it will either say
            "I don't know" or, worse, <b>invent</b> something plausible.
          </p>
          <p className="slide-body mt-3">
            <b>Retrieval-Augmented Generation</b> fixes this. Before the model answers, we <i>fetch</i> the
            most relevant passages from your own documents and hand them to the model as context. The model then
            answers <b>from those passages</b>, not from memory.
          </p>
        </div>
        <div className="slide-card-dark">
          <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>The mental model</div>
          <p className="mt-3 text-lg leading-snug">
            Closed-book exam → <span className="text-slate-400">the model guesses.</span>
          </p>
          <p className="mt-2 text-lg leading-snug">
            Open-book exam → <span className="text-emerald-300">the model quotes.</span>
          </p>
          <p className="slide-body mt-4 text-slate-300">
            RAG turns every LLM into an open-book exam over <b>your firm's</b> documents.
          </p>
        </div>
      </div>

      {/* Phase 1: Indexing */}
      <div>
        <div className="slide-caption uppercase tracking-widest">Phase 1 · Indexing — done once, ahead of time</div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[
            { t: "Documents", d: "PDFs, VDRs, memos", icon: "📄" },
            { t: "Chunk", d: "Split into ~500-token pieces", icon: "✂️" },
            { t: "Embed", d: "Each chunk → vector", icon: "🧭" },
            { t: "Vector DB", d: "Store for similarity search", icon: "🗄️" },
          ].map((s, i, a) => (
            <div key={s.t} className="relative">
              <div className="slide-card h-full">
                <div className="text-2xl">{s.icon}</div>
                <div className="mt-2 font-semibold">{s.t}</div>
                <div className="slide-caption mt-1">{s.d}</div>
              </div>
              {i < a.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 text-[color:var(--accent)] text-xl z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2: Query */}
      <div>
        <div className="slide-caption uppercase tracking-widest">Phase 2 · Query — every time a user asks something</div>
        <div className="mt-3 grid md:grid-cols-[1.1fr_1.4fr] gap-4">
          <div className="slide-card">
            <div className="slide-caption">User question</div>
            <div className="mt-2 font-medium">"What's the biggest revenue risk on Northstar?"</div>
            <div className="slide-caption mt-4">↓ embed the question, search the vector DB (cosine similarity), return the <b>top-k</b> most similar chunks</div>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
              style={{background:"var(--accent)",color:"#fff"}}
            >
              {showAnswer ? "Reset" : "Run retrieval →"}
            </button>
          </div>
          <div className="slide-card">
            <div className="slide-caption">Vector DB — chunks ranked by similarity</div>
            <div className="mt-3 space-y-2">
              {[...CHUNKS].sort((a,b)=>b.score-a.score).map((c) => (
                <div
                  key={c.id}
                  className="flex items-start gap-3 p-2 rounded-md transition-all"
                  style={{
                    background: showAnswer && c.hit ? "rgba(0,92,255,0.08)" : "transparent",
                    borderLeft: showAnswer && c.hit ? "3px solid var(--accent)" : "3px solid transparent",
                  }}
                >
                  <div className="font-mono text-xs w-12 shrink-0 mt-1" style={{color: c.hit?"var(--accent)":"#94a3b8"}}>
                    {c.score.toFixed(2)}
                  </div>
                  <div className="slide-body text-sm">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAnswer && (
          <div className="mt-4 slide-card-dark animate-fade-in">
            <div className="slide-chip" style={{background:"rgba(34,197,94,0.2)",color:"#86efac"}}>LLM answer, grounded in retrieved chunks</div>
            <p className="mt-3 text-lg leading-relaxed">
              "The largest revenue risk is <b>customer concentration</b> — the top 3 clients account for
              <b> 62% of FY24 revenue</b>. Quantified scenarios are in <b>Appendix B, p.47</b>."
            </p>
            <div className="slide-caption mt-3 text-slate-400">Sources: chunk #1 (score 0.91), chunk #4 (score 0.78)</div>
          </div>
        )}
      </div>
    </div>
  );
}
