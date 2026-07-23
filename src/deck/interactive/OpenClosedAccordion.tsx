import { useState } from "react";

/**
 * Merged from slides 11 + 12. Sourced from AI Landscape p.14 and LLM History pp.19–20.
 * Two accordion panels — Closed vs Open — each with definition, pros, cons,
 * and a nested list of the providers that sit under it.
 */

type Provider = {
  name: string;
  flagship: string;
  hq: string;
  note: string;
};

const CLOSED_PROVIDERS: Provider[] = [
  { name: "OpenAI", flagship: "GPT-5 / GPT-4o", hq: "San Francisco, US", note: "Frontier quality; deep Microsoft integration." },
  { name: "Anthropic", flagship: "Claude Sonnet 4.5", hq: "San Francisco, US", note: "Safety-first lab; strong long-context reasoning." },
  { name: "Google DeepMind", flagship: "Gemini 2.5 Pro", hq: "London / Mountain View", note: "Native multimodal; embedded across Workspace." },
  { name: "xAI", flagship: "Grok 4", hq: "San Francisco, US", note: "Real-time X integration." },
];

const OPEN_PROVIDERS: Provider[] = [
  { name: "Meta", flagship: "Llama 4", hq: "Menlo Park, US", note: "Largest open-weight family in the West." },
  { name: "Mistral", flagship: "Mistral Large 3", hq: "Paris, France", note: "European alternative, permissive licensing." },
  { name: "DeepSeek", flagship: "DeepSeek V3.2", hq: "Hangzhou, China", note: "Frontier-adjacent quality at a fraction of the training cost." },
  { name: "Qwen (Alibaba)", flagship: "Qwen 3", hq: "Hangzhou, China", note: "Strong multilingual and coding performance." },
  { name: "Moonshot AI", flagship: "Kimi K2", hq: "Beijing, China", note: "Long-context specialist; open-weight release." },
];

type PanelKey = "closed" | "open";

export function OpenClosedAccordion() {
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("closed");

  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-xl border border-[#0a2540]/10 bg-[#f7f9fc] p-4 flex items-start gap-4">
        <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0a2540] text-white text-xs font-semibold shrink-0">
          ?
        </div>
        <div>
          <div className="text-sm font-semibold text-[#0a2540]">What are "weights"?</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#0a2540]/75">
            Weights are the billions of tuned numbers the model learned during training. Think of them as the model's <span className="font-semibold text-[#0a2540]">secret recipe</span>. Closed vendors keep the recipe in-house and sell access via API; open-source vendors publish the recipe so you can run the model yourself.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Panel
          tone="closed"
          active={openPanel === "closed"}
          onToggle={() => setOpenPanel(openPanel === "closed" ? null : "closed")}
          label="Closed-source"
          oneLiner="API-only. The vendor hosts the model; you send data to their servers."
          definition="You never see the weights. Access is metered by API call, pricing is per-token, and the provider controls versioning, updates and deprecation."
          pros={[
            "Turnkey — no infrastructure to run",
            "Frontier-quality models, first",
            "Managed safety, evals and uptime",
          ]}
          cons={[
            "Data leaves your environment",
            "Per-token cost scales with usage",
            "Limited customisation & fine-tuning",
            "Vendor lock-in on prompts and tooling",
          ]}
          providers={CLOSED_PROVIDERS}
        />
        <Panel
          tone="open"
          active={openPanel === "open"}
          onToggle={() => setOpenPanel(openPanel === "open" ? null : "open")}
          label="Open-source"
          oneLiner="Downloadable weights. You run the model in your own environment."
          definition="The model file is published under a permissive or research licence. You can host it on your own infrastructure, fine-tune it on private data, and keep every prompt inside your perimeter."
          pros={[
            "Data never leaves your environment",
            "Fixed infra cost — no per-token bill",
            "Full fine-tuning and customisation",
            "No vendor lock-in",
          ]}
          cons={[
            "Requires ML engineering to run well",
            "Peak quality still trails frontier closed models",
            "You own safety, evals and uptime",
          ]}
          providers={OPEN_PROVIDERS}
        />
      </div>
    </div>
  );
}

function Panel({
  tone,
  active,
  onToggle,
  label,
  oneLiner,
  definition,
  pros,
  cons,
  providers,
}: {
  tone: PanelKey;
  active: boolean;
  onToggle: () => void;
  label: string;
  oneLiner: string;
  definition: string;
  pros: string[];
  cons: string[];
  providers: Provider[];
}) {
  const isClosed = tone === "closed";
  return (
    <div
      className={[
        "rounded-2xl border bg-white overflow-hidden transition-all",
        active
          ? "border-[#0a2540] shadow-[0_20px_60px_-30px_rgba(10,37,64,0.35)]"
          : "border-[#0a2540]/12 shadow-[0_1px_0_rgba(10,37,64,0.04)]",
      ].join(" ")}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-[#0a2540]/[0.02] focus:outline-none focus:ring-2 focus:ring-[#005cff]/40"
      >
        <span
          className={[
            "mt-0.5 inline-flex items-center justify-center text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider uppercase",
            isClosed ? "bg-[#0a2540] text-white" : "bg-[#dcfce7] text-[#166534]",
          ].join(" ")}
        >
          {isClosed ? "Closed" : "Open"}
        </span>
        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#0a2540]/50">
            {isClosed ? "Hosted by the vendor" : "Weights you can download"}
          </div>
          <div className="mt-1 text-xl font-semibold text-[#0a2540] leading-tight tracking-tight">
            {label}
          </div>
          <p className="mt-1.5 text-[14px] leading-snug text-[#0a2540]/75">{oneLiner}</p>
        </div>
        <span
          aria-hidden
          className={`ml-2 mt-1 text-[#0a2540]/45 transition-transform ${active ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {active && (
        <div className="px-6 pb-6 pt-1">
          <p className="text-[14px] leading-relaxed text-[#0a2540]/80">{definition}</p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#0a2540]/10 bg-[#f7f9fc] p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 font-semibold">Pros</div>
              <ul className="mt-2 space-y-1.5">
                {pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-[#0a2540]/85">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-[#0a2540]/10 bg-[#f7f9fc] p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-rose-700 font-semibold">Cons</div>
              <ul className="mt-2 space-y-1.5">
                {cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[13px] leading-snug text-[#0a2540]/85">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-rose-600" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0a2540]/50 font-semibold">
              Providers
            </div>
            <div className="mt-2 grid sm:grid-cols-2 gap-2">
              {providers.map((p) => (
                <div
                  key={p.name}
                  className="rounded-md border border-[#0a2540]/10 bg-white p-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-semibold text-[13px] text-[#0a2540]">{p.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#0a2540]/45">
                      {p.hq}
                    </div>
                  </div>
                  <div className="text-[12px] text-[#005cff] mt-0.5">{p.flagship}</div>
                  <p className="text-[12px] leading-snug text-[#0a2540]/70 mt-1">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
