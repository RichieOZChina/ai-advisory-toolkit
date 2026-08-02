import { useState } from "react";

const LEVELS = [
  {
    id: "ai",
    n: "01",
    label: "Artificial intelligence",
    short: "Machines performing tasks that normally require human intelligence.",
    examples: "Rules · search · planning · machine learning",
  },
  {
    id: "ml",
    n: "02",
    label: "Machine learning",
    short: "Systems learning patterns from data instead of fixed instructions.",
    examples: "Supervised · unsupervised · reinforcement · self-supervised",
  },
  {
    id: "dl",
    n: "03",
    label: "Deep learning",
    short: "Multi-layer neural networks learning complex representations.",
    examples: "Transformers · CNNs · diffusion models",
  },
  {
    id: "fm",
    n: "04",
    label: "Foundation models",
    short: "Large general-purpose models trained once, then adapted to many tasks.",
    examples: "Language · vision · audio · multimodal",
  },
  {
    id: "llm",
    n: "05",
    label: "Large language models",
    short: "Foundation models specialised in understanding and generating language.",
    examples: "GPT · Claude · Gemini · Llama · Qwen",
  },
];

export function AITree() {
  const [selected, setSelected] = useState("llm");
  const active = LEVELS.find((level) => level.id === selected) ?? LEVELS[4];

  return (
    <div className="mt-5 grid lg:grid-cols-[1.45fr_0.75fr] gap-5 items-stretch">
      <div className="rounded-2xl border border-[#0a2540]/12 bg-[#f7f9fc] p-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#0a2540]/50">Nested technology lineage</div>
          <div className="text-[11px] text-[#0a2540]/45">Click a layer</div>
        </div>
        <div className="grid gap-2">
          {LEVELS.map((level, index) => {
            const isActive = selected === level.id;
            const isLLM = level.id === "llm";
            return (
              <button
                key={level.id}
                onClick={() => setSelected(level.id)}
                className={`group grid grid-cols-[42px_1fr_auto] items-center gap-4 rounded-xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[#005cff] bg-[#0a2540] text-white shadow-[0_12px_30px_-18px_rgba(10,37,64,0.8)]"
                    : "border-[#0a2540]/10 bg-white hover:border-[#005cff]/45"
                }`}
                style={{ marginInline: `${index * 14}px` }}
              >
                <span className={`font-mono text-xs ${isActive ? "text-[#78adff]" : "text-[#005cff]"}`}>{level.n}</span>
                <span className="text-[clamp(15px,1.3vw,18px)] font-semibold leading-tight">{level.label}</span>
                <span className={`text-[10px] uppercase tracking-[0.14em] ${isActive ? "text-white/60" : "text-[#0a2540]/35"}`}>
                  {isLLM ? "Today’s focus" : index === 0 ? "Broadest" : "Inside"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3 px-1 text-[12px] text-[#0a2540]/55">
          <span className="h-px w-8 bg-[#005cff]/45" />
          Each step narrows the field; an LLM is one type of foundation model, not a synonym for all AI.
        </div>
      </div>

      <aside className="rounded-2xl bg-[#0a2540] p-6 text-white flex flex-col justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#78adff]">Selected layer · {active.n}</div>
          <h2 className="mt-3 text-[clamp(23px,2.2vw,31px)] font-semibold leading-tight tracking-tight">{active.label}</h2>
          <p className="mt-4 text-[clamp(14px,1.15vw,16px)] leading-relaxed text-slate-300">{active.short}</p>
        </div>
        <div className="mt-8 border-t border-white/15 pt-5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Examples / branches</div>
          <p className="mt-2 text-sm leading-relaxed text-white">{active.examples}</p>
        </div>
      </aside>
    </div>
  );
}
