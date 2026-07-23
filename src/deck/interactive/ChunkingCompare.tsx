import { useState } from "react";

const DOC = "The vendor DD identified three material risks on Project Northstar. First, customer concentration — the top three clients account for 62% of FY24 revenue, quantified in Appendix B, page 47. Second, key-person dependency: the founder holds every material supplier relationship personally. Third, gross margin compression of 340bps year-on-year, driven by input cost inflation not yet passed through to price.";

type Strategy = "tiny" | "right" | "huge";

const STRATEGIES: Record<Strategy, { label: string; size: number; verdict: string; tone: "warn"|"good"; explain: string }> = {
  tiny:  { label: "Too small",  size: 60,  tone: "warn", verdict: "Sentences split mid-thought. Retrieval loses meaning.", explain: "Chunks are too short to carry a complete idea, so similarity search matches fragments instead of arguments." },
  right: { label: "Right-sized",size: 180, tone: "good", verdict: "One idea per chunk. Retrieval is sharp and quotable.", explain: "Each chunk holds a self-contained thought — this is the sweet spot the PDF calls semantic chunking." },
  huge:  { label: "Too large",  size: 999, tone: "warn", verdict: "The whole doc is one chunk. Everything matches → nothing is specific.", explain: "Vector similarity averages across the entire document, diluting relevance and burning context window." },
};

function chunk(s: string, size: number) {
  if (size >= s.length) return [s];
  const words = s.split(" ");
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).length > size) { out.push(cur.trim()); cur = w; }
    else cur = cur ? cur + " " + w : w;
  }
  if (cur) out.push(cur.trim());
  return out;
}

export function ChunkingCompare() {
  const [active, setActive] = useState<Strategy>("right");
  const s = STRATEGIES[active];
  const chunks = chunk(DOC, s.size);
  return (
    <div className="mt-4 space-y-6">
      {/* Framing */}
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-5">
        <div className="slide-card">
          <div className="slide-chip">Why chunking exists</div>
          <p className="slide-body mt-3">
            You cannot embed a 300-page CIM as a single vector — the meaning would be an unusable average.
            Before anything goes into the vector database, every document is <b>sliced into small, focused pieces</b>
            (a paragraph, a section) so each piece captures <b>one idea</b>.
          </p>
          <p className="slide-body mt-3">
            Chunk size is the <b>quiet knob</b> that decides whether retrieval is sharp or useless.
            Too small and chunks lose context. Too large and every chunk matches everything.
          </p>
        </div>
        <div className="slide-card-dark">
          <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>Rule of thumb</div>
          <p className="mt-3 slide-body text-slate-200">
            <b>~500 tokens</b> per chunk, with a small <b>overlap</b> so ideas that straddle a boundary aren't cut in half.
          </p>
          <p className="slide-body mt-3 text-slate-300">
            Long documents get chunked <b>hierarchically</b> — section → paragraph → sentence — so retrieval can zoom in.
          </p>
        </div>
      </div>

      {/* Interactive */}
      <div className="slide-card">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="slide-caption uppercase tracking-widest mr-2">Try each strategy →</span>
          {(Object.keys(STRATEGIES) as Strategy[]).map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active === k ? "var(--accent)" : "transparent",
                color: active === k ? "#fff" : "var(--foreground)",
                border: "1px solid " + (active === k ? "var(--accent)" : "var(--muted-line)"),
              }}
            >{STRATEGIES[k].label}</button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {chunks.map((c, i) => (
            <span
              key={i}
              className="px-2.5 py-1.5 rounded text-[12px] leading-tight max-w-[260px]"
              style={{
                background: i % 2 ? "rgba(0,92,255,0.08)" : "rgba(0,92,255,0.16)",
                border: "1px solid rgba(0,92,255,0.3)",
                color: "var(--foreground)",
              }}
            >{c}</span>
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={"inline-block w-2 h-2 rounded-full"} style={{background: s.tone === "good" ? "var(--good)" : "var(--warn)"}} />
              <span className="font-semibold">{s.verdict}</span>
            </div>
            <p className="slide-body mt-2 text-sm">{s.explain}</p>
          </div>
          <div className="slide-caption">
            <b>{chunks.length}</b> chunk{chunks.length===1?"":"s"} · avg <b>{Math.round(chunks.reduce((a,c)=>a+c.length,0)/chunks.length)}</b> chars each
          </div>
        </div>
      </div>
    </div>
  );
}
