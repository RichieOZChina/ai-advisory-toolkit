const MODELS = [
  { year: "2018", name: "GPT-1", params: 0.117, source: "disclosed" },
  { year: "2018", name: "BERT-Large", params: 0.34, source: "disclosed" },
  { year: "2019", name: "GPT-2", params: 1.5, source: "disclosed" },
  { year: "2020", name: "GPT-3", params: 175, source: "disclosed" },
  { year: "2022", name: "PaLM", params: 540, source: "disclosed" },
  { year: "2024", name: "Llama 3.1", params: 405, source: "disclosed" },
  { year: "2023", name: "GPT-4", params: 1760, source: "leaked" },
];

export function ParameterChart() {
  const sorted = [...MODELS].sort((a, b) => a.params - b.params);
  const maxLog = Math.log10(sorted[sorted.length - 1].params * 1000);
  return (
    <div className="mt-6">
      <div className={`grid gap-4 items-end h-80`} style={{ gridTemplateColumns: `repeat(${sorted.length}, minmax(0, 1fr))` }}>
        {sorted.map((m) => {
          const pct = (Math.log10(m.params * 1000) / maxLog) * 100;
          const leaked = m.source === "leaked";
          return (
            <div key={m.name} className="flex flex-col items-center justify-end h-full">
              <div className="text-[10px] font-mono text-slate-500 mb-1">
                {fmt(m.params)}{leaked ? "*" : ""}
              </div>
              <div
                className="w-full rounded-t"
                style={{
                  height: `${pct}%`,
                  background: leaked
                    ? "repeating-linear-gradient(45deg, var(--accent), var(--accent) 4px, transparent 4px, transparent 8px)"
                    : "var(--accent)",
                  opacity: 0.35 + (pct / 100) * 0.65,
                  transition: "height 600ms ease",
                }}
              />
              <div className="slide-caption mt-2 font-semibold text-center leading-tight">{m.name}</div>
              <div className="slide-caption text-[10px]">{m.year}</div>
            </div>
          );
        })}
      </div>
      <div className="slide-caption mt-4">
        Parameters, in billions. Log scale — otherwise GPT-1 wouldn't be visible next to GPT-3.
        <br />
        <span className="text-[10px]">* GPT-4 parameter count is an estimate; OpenAI has not officially disclosed it. Anthropic and Google do not publish parameter counts for Claude or Gemini.</span>
      </div>
    </div>
  );
}

function fmt(b: number) {
  if (b < 1) return `${Math.round(b * 1000)}M`;
  if (b < 1000) return `${b}B`;
  return `${(b / 1000).toFixed(2)}T`;
}
