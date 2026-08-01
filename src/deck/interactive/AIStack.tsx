import { useState } from "react";

type Layer = {
  name: string;
  short: string;
  description: string;
  examples: string;
  relevance: string;
  color: string;
  tint: string;
  deployment?: { label: string; detail: string }[];
};

const LAYERS: Layer[] = [
  {
    name: "Applications",
    short: "Where people use AI",
    description: "The products and interfaces that turn AI capability into a task someone can complete.",
    examples: "ChatGPT · Claude · Gemini · Microsoft 365 Copilot",
    relevance: "For most firms, this is the first build-versus-buy decision — and where users experience the value.",
    color: "#0f766e",
    tint: "#e7f7f4",
  },
  {
    name: "Orchestration",
    short: "How the work gets done",
    description: "Agent harnesses that give models tools, memory, context and a loop for planning and completing multi-step work.",
    examples: "Claude Code · Codex · OpenClaw · Hermes Agent",
    relevance: "A harness turns a model from a response engine into an operator that can navigate files, use tools and execute workflows.",
    color: "#0d9488",
    tint: "#ecfdf8",
  },
  {
    name: "Models",
    short: "The reasoning engines",
    description: "Neural networks trained to interpret and generate language, images, code and analysis.",
    examples: "GPT · Claude · Gemini · Llama · Mistral · Qwen",
    relevance: "The same model family can be consumed through different hosts; the route changes control, cost, privacy and operating responsibility.",
    color: "#2563eb",
    tint: "#eff6ff",
    deployment: [
      { label: "Model company", detail: "OpenAI · Anthropic · Google" },
      { label: "Third-party host", detail: "Azure AI · AWS Bedrock · Vertex AI · Together · Fireworks" },
      { label: "Self-hosted", detail: "Open-weight Llama · Mistral · Qwen on your own or private cloud" },
    ],
  },
  {
    name: "Cloud & platforms",
    short: "Where AI is hosted",
    description: "Managed environments that provide model access, storage, security and enterprise AI services.",
    examples: "AWS · Microsoft Azure · Google Cloud · Oracle Cloud · CoreWeave · Nebius · Crusoe · Lambda",
    relevance: "The platform determines how models connect to enterprise systems and how access, data and spend are governed.",
    color: "#475569",
    tint: "#f1f5f9",
  },
  {
    name: "Compute",
    short: "What runs the models",
    description: "Specialised chips and servers used to train models and produce answers when users make requests.",
    examples: "NVIDIA GPUs · Google TPUs · AMD Instinct · AWS Trainium · inference servers · high-speed networking",
    relevance: "Most firms rent this capacity indirectly through a cloud or model provider rather than owning it.",
    color: "#334155",
    tint: "#f1f5f9",
  },
  {
    name: "Physical infrastructure",
    short: "What keeps compute alive",
    description: "The physical estate required to house, power, cool and connect large-scale computing systems.",
    examples: "Equinix · Digital Realty · Vertiv · Schneider Electric · Eaton · utilities and fibre networks",
    relevance: "Essential to AI economics and availability, but rarely a direct operating decision for an advisory firm.",
    color: "#1e293b",
    tint: "#f1f5f9",
  },
];

export function AIStack() {
  const [selected, setSelected] = useState(0);
  const layer = LAYERS[selected];

  return (
    <div className="mt-3 max-[1500px]:mt-2 grid h-[510px] max-[1500px]:h-[488px] grid-cols-[minmax(310px,0.86fr)_minmax(470px,1.14fr)] gap-5 max-[1500px]:gap-4 items-stretch">
      <div className="relative rounded-2xl bg-[color:var(--navy)] px-5 py-4 max-[1500px]:px-4 max-[1500px]:py-3 h-full">
        <div className="flex items-center justify-between mb-2 max-[1500px]:mb-1.5">
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-300">Closer to the user</span>
          <span className="text-slate-400 text-sm">↑</span>
        </div>
        <div className="space-y-2 max-[1500px]:space-y-1.5">
          {LAYERS.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className="w-full rounded-lg border px-4 py-2.5 max-[1500px]:py-2 text-left transition flex items-center justify-between gap-3"
                style={{
                  background: active ? item.color : "rgba(255,255,255,0.075)",
                  borderColor: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.13)",
                  boxShadow: active ? "0 8px 22px rgba(0,0,0,0.22)" : "none",
                  transform: active ? "translateX(5px)" : "none",
                }}
              >
                <span>
                  <span className="block text-white font-semibold text-[15px] leading-tight">{item.name}</span>
                  <span className="block text-slate-300 text-[11px] mt-0.5">{item.short}</span>
                </span>
                <span className="text-white/70 text-lg">{active ? "→" : "+"}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2 max-[1500px]:mt-1.5">
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-400">Closer to the infrastructure</span>
          <span className="text-slate-400 text-sm">↓</span>
        </div>
      </div>

      <div className="rounded-2xl border border-[color:var(--muted-line)] bg-white p-6 max-[1500px]:p-[14px] h-full flex flex-col" aria-live="polite">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="slide-caption uppercase tracking-widest" style={{ color: layer.color }}>Selected layer</div>
            <h2 className="mt-1 text-[clamp(24px,2.5vw,35px)] font-bold tracking-tight">{layer.name}</h2>
          </div>
          <span className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: layer.tint, color: layer.color }}>
            Layer {selected + 1} of 6
          </span>
        </div>

        <p className="mt-3 max-[1500px]:mt-2 text-[16px] max-[1500px]:text-[14px] leading-relaxed text-slate-700">{layer.description}</p>

        <div className="mt-4 max-[1500px]:mt-3 rounded-xl p-4 max-[1500px]:p-3" style={{ background: layer.tint }}>
          <div className="slide-caption uppercase tracking-widest" style={{ color: layer.color }}>Familiar examples</div>
          <div className="mt-1.5 font-semibold text-[14px] leading-relaxed">{layer.examples}</div>
        </div>

        {layer.deployment && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {layer.deployment.map((route) => (
              <div key={route.label} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
                <div className="text-[10px] uppercase tracking-widest font-bold text-blue-700">{route.label}</div>
                <div className="mt-1 text-[11px] leading-snug font-medium text-blue-950">{route.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 max-[1500px]:pt-3">
          <div className="slide-caption uppercase tracking-widest">Why it matters</div>
          <p className="mt-1.5 max-[1500px]:mt-1 text-[14px] max-[1500px]:text-[12px] leading-relaxed font-medium text-slate-800">{layer.relevance}</p>
        </div>

        <div className="mt-4 max-[1500px]:mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-3.5 py-2.5 max-[1500px]:py-2">
            <div className="text-[10px] uppercase tracking-widest font-bold text-cyan-800">Data & integrations</div>
            <div className="text-[11px] mt-1 text-cyan-950">Documents, systems and APIs feed value up the stack.</div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 max-[1500px]:py-2">
            <div className="text-[10px] uppercase tracking-widest font-bold text-amber-800">Controls & accountability</div>
            <div className="text-[11px] mt-1 text-amber-950">Security, governance and human ownership span every layer.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
