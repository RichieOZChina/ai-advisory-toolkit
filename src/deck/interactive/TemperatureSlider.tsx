import { useState } from "react";

const PRICING = [
  { m: "OpenAI GPT-4o", in: "$2.50", out: "$10.00" },
  { m: "Anthropic Claude Sonnet 5", in: "$2.00", out: "$10.00" },
  { m: "DeepSeek-V4-Flash", in: "$0.14", out: "$0.28" },
  { m: "Zhipu GLM-5", in: "~$1.00", out: "~$3.20" },
  { m: "Kimi K3", in: "$3.00", out: "$15.00" },
];

export function TemperatureSlider() {
  const [t, setT] = useState(0.2);
  const behaviour = t < 0.25 ? "Precise · deterministic · same output every time"
    : t < 0.55 ? "Balanced · minor variation between runs"
    : t < 0.8 ? "Creative · noticeable variation, unexpected phrasing"
    : "Wild · high variance, occasional off-topic responses";
  const label = t < 0.25 ? "Precise / Factual" : t < 0.55 ? "Balanced" : t < 0.8 ? "Creative" : "Wild";
  return (
    <div className="mt-4">
      <div className="slide-card">
        <div className="flex items-baseline justify-between">
          <div className="slide-caption uppercase tracking-widest">Temperature</div>
          <div className="font-mono text-2xl text-[color:var(--accent)]">{t.toFixed(2)}</div>
        </div>
        <input type="range" min={0} max={1} step={0.01} value={t} onChange={(e) => setT(parseFloat(e.target.value))} className="w-full mt-4 accent-[color:var(--accent)]" />
        <div className="flex justify-between slide-caption uppercase mt-1"><span>Precise · 0.0</span><span>Creative · 1.0</span></div>
        <div className="mt-4 flex items-center gap-3">
          <span className="slide-chip">{label}</span>
          <span className="slide-body">{behaviour}</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
        <table className="w-full slide-body">
          <thead className="bg-[color:var(--secondary)]">
            <tr><th className="text-left px-4 py-3">Model</th><th className="text-right px-4 py-3">Input / 1M tokens</th><th className="text-right px-4 py-3">Output / 1M tokens</th></tr>
          </thead>
          <tbody>
            {PRICING.map((p) => (
              <tr key={p.m} className="border-t border-[color:var(--muted-line)]"><td className="px-4 py-3 font-medium">{p.m}</td><td className="px-4 py-3 text-right font-mono">{p.in}</td><td className="px-4 py-3 text-right font-mono">{p.out}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 slide-card-dark max-w-2xl">For M&amp;A work, keep temperature low. You want accuracy, not creativity.</div>
      <div className="slide-caption mt-3">Prices as of July 2026.</div>
    </div>
  );
}
