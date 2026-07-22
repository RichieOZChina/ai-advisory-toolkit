import { useState } from "react";

type P = { name: string; open: boolean; flagship: string; hq: string; founded: string; note: string };

const PROVIDERS: P[] = [
  { name: "OpenAI", open: false, flagship: "GPT-4o / GPT-5", hq: "San Francisco", founded: "2015", note: "Frontier closed models, deep integration with Microsoft." },
  { name: "Anthropic", open: false, flagship: "Claude Sonnet 5", hq: "San Francisco", founded: "2021", note: "Safety-first lab; strongest at long-context reasoning." },
  { name: "Google DeepMind", open: false, flagship: "Gemini 2.5 Pro", hq: "London / Mountain View", founded: "2010", note: "Native multimodal; embedded across Workspace." },
  { name: "Meta", open: true, flagship: "Llama 4", hq: "Menlo Park", founded: "2004", note: "Largest open-weight family. Self-hostable." },
  { name: "DeepSeek", open: true, flagship: "DeepSeek V4", hq: "Hangzhou", founded: "2023", note: "Frontier-adjacent quality at a fraction of the cost." },
  { name: "Mistral", open: true, flagship: "Mistral Large 3", hq: "Paris", founded: "2023", note: "European alternative, permissive licensing." },
  { name: "Qwen (Alibaba)", open: true, flagship: "Qwen 3", hq: "Hangzhou", founded: "2023", note: "Strong multilingual and coding performance." },
  { name: "xAI", open: false, flagship: "Grok 4", hq: "San Francisco", founded: "2023", note: "Real-time X integration." },
];

export function ProviderGrid() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      {PROVIDERS.map((p) => {
        const expanded = open === p.name;
        return (
          <button
            key={p.name}
            onClick={() => setOpen(expanded ? null : p.name)}
            className="slide-card text-left"
            style={{ transition: "all 160ms ease" }}
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[15px]">{p.name}</div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={p.open ? { background: "#dcfce7", color: "#166534" } : { background: "#0a2540", color: "#fff" }}>
                {p.open ? "OPEN" : "CLOSED"}
              </span>
            </div>
            <div className="slide-caption mt-2">{p.flagship}</div>
            {expanded && (
              <div className="mt-3 pt-3 border-t border-[color:var(--muted-line)] slide-body text-[13px]">
                <div><b>HQ</b> · {p.hq}</div>
                <div><b>Founded</b> · {p.founded}</div>
                <p className="mt-2">{p.note}</p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
