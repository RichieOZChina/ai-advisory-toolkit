import { useState } from "react";

const SAMPLES: Record<string, string[]> = {
  low:  [
    "The company generated A$42.3m of revenue in FY24.",
    "The company generated A$42.3m of revenue in FY24.",
    "The company generated A$42.3m of revenue in FY24.",
  ],
  mid:  [
    "The company generated A$42.3m of revenue in FY24, up 18% YoY.",
    "In FY24, revenue reached A$42.3m — an 18% year-on-year increase.",
    "The business posted A$42.3m in FY24 revenue, growing 18% YoY.",
  ],
  high: [
    "FY24 revenue landed at a punchy A$42.3m — nearly a fifth up on last year.",
    "A$42.3m of top-line in FY24, riding an 18% growth wave.",
    "Revenue surged to A$42.3m in FY24, marking a stellar 18% climb.",
  ],
};

export function TemperatureSlider() {
  const [t, setT] = useState(0.2);
  const bucket = t < 0.35 ? "low" : t < 0.75 ? "mid" : "high";
  const label = bucket === "low" ? "Precise / Factual" : bucket === "mid" ? "Balanced" : "Creative";
  const behaviour =
    bucket === "low"  ? "Near-identical output on every run. Use for numbers, extraction, compliance."
    : bucket === "mid" ? "Minor rewording between runs. Use for drafting memos and summaries."
    :                    "Noticeably different every run. Use for brainstorming — never for numbers.";

  return (
    <div className="mt-4 space-y-6">
      {/* Framing */}
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-5">
        <div className="slide-card">
          <div className="slide-chip">Why the same prompt gives different answers</div>
          <p className="slide-body mt-3">
            LLMs don't pick the single "best" next token — they <b>sample</b> from a probability distribution.
            Put plainly: LLMs are <b>inherently non-deterministic</b>. Even at temperature 0 there is a small
            chance of variation.
          </p>
          <p className="slide-caption mt-3">This control normally sits in an API or model workbench. The chat apps used by most bankers generally do not expose it.</p>
          <p className="slide-body mt-3">
            <b>Temperature</b> is the dial that decides how much of that distribution the model is allowed to explore.
            Low = the model picks the most likely word almost every time. High = it happily picks less likely words.
          </p>
        </div>
        <div className="slide-card-dark">
          <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>For M&A work</div>
          <p className="mt-3 text-lg">Keep temperature <b>≤ 0.3</b>.</p>
          <p className="slide-body mt-3 text-slate-300">
            You want reproducible numbers and defensible language, not surprise phrasing. Reserve high
            temperature for the one moment you actually want variety — brainstorming pitch angles.
          </p>
        </div>
      </div>

      {/* Dial */}
      <div className="slide-card">
        <div className="flex items-baseline justify-between">
          <div className="slide-caption uppercase tracking-widest">Temperature</div>
          <div className="font-mono text-2xl text-[color:var(--accent)]">{t.toFixed(2)}</div>
        </div>
        <input type="range" min={0} max={1} step={0.01} value={t} onChange={(e) => setT(parseFloat(e.target.value))} className="w-full mt-4 accent-[color:var(--accent)]" />
        <div className="flex justify-between slide-caption uppercase mt-1"><span>Precise · 0.0</span><span>Creative · 1.0</span></div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <span className="slide-chip">{label}</span>
          <span className="slide-body">{behaviour}</span>
        </div>

        <div className="mt-5">
          <div className="slide-caption uppercase tracking-widest">Same prompt, three runs</div>
          <div className="mt-2 space-y-2">
            {SAMPLES[bucket].map((s, i) => (
              <div key={i} className="slide-body px-3 py-2 rounded-md" style={{background:"rgba(0,92,255,0.05)", border:"1px solid var(--muted-line)"}}>
                <span className="font-mono text-xs text-slate-500 mr-2">run {i+1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model choice */}
      <div>
        <div className="slide-caption uppercase tracking-widest mb-2">The other lever: model choice</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Complexity", "Use the strongest model when judgement and ambiguity matter."],
            ["Volume", "Use a faster, cheaper model for repeatable extraction and classification."],
            ["Sensitivity", "Use an approved private environment for confidential deal material."],
          ].map(([title, detail], i) => (
            <div key={title} className="rounded-xl border border-[color:var(--muted-line)] bg-white p-4">
              <div className="font-mono text-xs text-[color:var(--accent)]">0{i + 1}</div>
              <div className="mt-1 font-semibold">{title}</div>
              <p className="mt-1 text-sm leading-snug text-slate-600">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
