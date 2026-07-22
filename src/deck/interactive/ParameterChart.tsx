const MODELS = [
  { year: "2018", name: "GPT-1", params: 0.117 },
  { year: "2018", name: "BERT", params: 0.34 },
  { year: "2019", name: "GPT-2", params: 1.5 },
  { year: "2020", name: "GPT-3", params: 175 },
  { year: "2022", name: "PaLM", params: 540 },
  { year: "2023", name: "GPT-4", params: 1700 },
  { year: "2025", name: "GPT-5 / Claude 5", params: 3200 },
  { year: "2026", name: "Frontier '26", params: 6500 },
];

export function ParameterChart() {
  const maxLog = Math.log10(MODELS[MODELS.length - 1].params * 1000); // billions
  return (
    <div className="mt-6">
      <div className="grid grid-cols-8 gap-4 items-end h-80">
        {MODELS.map((m) => {
          const pct = (Math.log10(m.params * 1000) / maxLog) * 100;
          return (
            <div key={m.name} className="flex flex-col items-center justify-end h-full">
              <div className="text-[10px] font-mono text-slate-500 mb-1">{fmt(m.params)}</div>
              <div className="w-full bg-[color:var(--accent)] rounded-t" style={{ height: `${pct}%`, opacity: 0.35 + (pct / 100) * 0.65, transition: "height 600ms ease" }} />
              <div className="slide-caption mt-2 font-semibold text-center leading-tight">{m.name}</div>
              <div className="slide-caption text-[10px]">{m.year}</div>
            </div>
          );
        })}
      </div>
      <div className="slide-caption mt-4">Parameters, in billions. Log scale — otherwise GPT-1 wouldn't be visible next to today's models.</div>
    </div>
  );
}

function fmt(b: number) {
  if (b < 1) return `${Math.round(b * 1000)}M`;
  if (b < 1000) return `${b}B`;
  return `${(b / 1000).toFixed(1)}T`;
}
