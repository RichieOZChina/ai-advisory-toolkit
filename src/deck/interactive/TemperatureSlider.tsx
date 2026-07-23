import { useState } from "react";

const PRICING = [
  { m: "OpenAI GPT-5.1", in: "$1.25", out: "$10.00", best: "Frontier reasoning" },
  { m: "Anthropic Claude Opus 4.5", in: "$5.00", out: "$25.00", best: "Long-form analysis" },
  { m: "Google Gemini 3 Pro", in: "$2.00", out: "$12.00", best: "Multimodal + long context" },
  { m: "DeepSeek R2", in: "$0.55", out: "$2.19", best: "High-volume, cost-sensitive" },
  { m: "Llama 4 (self-hosted)", in: "infra only", out: "infra only", best: "Full data privacy" },
];

const SAMPLES: Record<string, string[]> = {
  low:  [
    "The company generated £42.3m of revenue in FY24.",
    "The company generated £42.3m of revenue in FY24.",
    "The company generated £42.3m of revenue in FY24.",
  ],
  mid:  [
    "The company generated £42.3m of revenue in FY24, up 18% YoY.",
    "In FY24, revenue reached £42.3m — an 18% year-on-year increase.",
    "The business posted £42.3m in FY24 revenue, growing 18% YoY.",
  ],
  high: [
    "FY24 revenue landed at a punchy £42.3m — nearly a fifth up on last year.",
    "£42.3m of top-line in FY24, riding an 18% growth wave.",
    "Revenue surged to £42.3m in FY24, marking a stellar 18% climb.",
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
            Put plainly: GPT models are <b>inherently non-deterministic</b>. Even at temperature 0 there is a small
            chance of variation.
          </p>
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

      {/* Model landscape */}
      <div>
        <div className="slide-caption uppercase tracking-widest mb-2">The other lever: model choice</div>
        <div className="overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
          <table className="w-full slide-body">
            <thead className="bg-[color:var(--secondary)]">
              <tr>
                <th className="text-left px-4 py-3">Model</th>
                <th className="text-left px-4 py-3">Best for</th>
                <th className="text-right px-4 py-3">Input / 1M</th>
                <th className="text-right px-4 py-3">Output / 1M</th>
              </tr>
            </thead>
            <tbody>
              {PRICING.map((p) => (
                <tr key={p.m} className="border-t border-[color:var(--muted-line)]">
                  <td className="px-4 py-3 font-medium">{p.m}</td>
                  <td className="px-4 py-3">{p.best}</td>
                  <td className="px-4 py-3 text-right font-mono">{p.in}</td>
                  <td className="px-4 py-3 text-right font-mono">{p.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="slide-caption mt-2">Published rates as of July 2026. Output tokens are typically 3–5× the price of input.</div>
      </div>
    </div>
  );
}
