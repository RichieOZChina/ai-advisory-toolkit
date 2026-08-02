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
  { name: "OpenAI", flagship: "GPT-5.1", hq: "San Francisco, US", note: "Frontier quality; deep Microsoft integration." },
  { name: "Anthropic", flagship: "Claude Opus 4.5", hq: "San Francisco, US", note: "Safety-first lab; strong long-context reasoning." },
  { name: "Google DeepMind", flagship: "Gemini 3 Pro", hq: "London / Mountain View", note: "Native multimodal; embedded across Workspace." },
  { name: "xAI", flagship: "Grok 5", hq: "San Francisco, US", note: "Real-time X integration." },
];

const OPEN_PROVIDERS: Provider[] = [
  { name: "Meta", flagship: "Llama 4", hq: "Menlo Park, US", note: "Largest open-weight family in the West." },
  { name: "Mistral", flagship: "Mistral Large 3", hq: "Paris, France", note: "European alternative, permissive licensing." },
  { name: "DeepSeek", flagship: "DeepSeek R2", hq: "Hangzhou, China", note: "Frontier-adjacent quality at a fraction of the training cost." },
  { name: "Qwen (Alibaba)", flagship: "Qwen 3 Max", hq: "Hangzhou, China", note: "Strong multilingual and coding performance." },
  { name: "Moonshot AI", flagship: "Kimi K2", hq: "Beijing, China", note: "Long-context specialist; open-weight release." },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What are \"weights\"?",
    a: (
      <>
        Weights are the billions of tuned numbers the model learned during training — the model's <span className="font-semibold text-[#0a2540]">secret recipe</span>. Closed vendors keep the recipe in-house and sell access via API; open-source vendors publish the recipe so you can run the model yourself.
      </>
    ),
  },
  {
    q: "What is an API?",
    a: (
      <>
        An <span className="font-semibold text-[#0a2540]">API</span> (Application Programming Interface) is a way for one piece of software to call another over the internet. With a closed model you send your prompt to the vendor's API, their servers run the model, and they send the answer back — you pay per token used. You never touch the model itself.
      </>
    ),
  },
  {
    q: "What does \"per-token\" pricing mean?",
    a: (
      <>
        Models don't read words, they read <span className="font-semibold text-[#0a2540]">tokens</span> — chunks of text roughly ¾ of a word each. Closed vendors charge a fraction of a cent per 1,000 tokens sent in and generated out, so cost scales directly with usage.
      </>
    ),
  },
  {
    q: "What does \"fine-tuning\" mean?",
    a: (
      <>
        Fine-tuning is taking an existing model and continuing training on your own data so it picks up your firm's tone, terminology or workflows. It's much easier with open-source models because you have the weights; closed vendors offer a limited, hosted version.
      </>
    ),
  },
];

type PanelKey = "closed" | "open";

export function OpenClosedAccordion() {
  return (
    <div className="mt-2 grid grid-cols-2 gap-5">
      {[
        { label: "Closed-source", badge: "Hosted by vendor", definition: "API-only. The provider hosts the model, controls updates and charges for usage.", strengths: ["Turnkey deployment", "Frontier models arrive first", "Managed safety and uptime"], tradeoffs: ["Data goes to the provider", "Usage-linked cost", "Less customisation and more lock-in"], closed: true },
        { label: "Open-weight", badge: "Run it yourself", definition: "Downloadable model weights. You choose the infrastructure, controls and customisation.", strengths: ["Keep data in your environment", "Full fine-tuning", "More control over cost and tooling"], tradeoffs: ["Requires engineering", "You own safety and uptime", "Licences and quality vary"], closed: false },
      ].map((item) => (
        <section key={item.label} className="rounded-2xl border border-[#0a2540]/12 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#0a2540]">{item.label}</h2>
            <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${item.closed ? "bg-[#0a2540] text-white" : "bg-emerald-100 text-emerald-800"}`}>{item.badge}</span>
          </div>
          <p className="mt-3 text-[16px] leading-relaxed text-[#0a2540]/75">{item.definition}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50 p-3"><div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Strengths</div><ul className="mt-2 space-y-1.5 text-[14px] leading-snug text-[#0a2540]/80">{item.strengths.map((point) => <li key={point}>• {point}</li>)}</ul></div>
            <div className="rounded-xl bg-rose-50 p-3"><div className="text-xs font-bold uppercase tracking-wider text-rose-700">Trade-offs</div><ul className="mt-2 space-y-1.5 text-[14px] leading-snug text-[#0a2540]/80">{item.tradeoffs.map((point) => <li key={point}>• {point}</li>)}</ul></div>
          </div>
        </section>
      ))}
    </div>
  );
}

export function JargonBuster({ start = 0 }: { start?: number }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-4">
      {FAQS.slice(start, start + 2).map((item, index) => (
        <section key={item.q} className="rounded-2xl border border-[#0a2540]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2540] text-sm font-semibold text-white">
              {start + index + 1}
            </span>
            <h2 className="text-xl font-bold text-[#0a2540]">{item.q}</h2>
          </div>
          <div className="mt-4 text-[16px] leading-relaxed text-[#0a2540]/80">{item.a}</div>
        </section>
      ))}
    </div>
  );
}

export function ProviderLandscape({ kind }: { kind: "closed" | "open" }) {
  const providers = (kind === "closed" ? CLOSED_PROVIDERS : OPEN_PROVIDERS).map((provider) => ({ ...provider, type: kind === "closed" ? "Closed" : "Open weight" }));

  return (
    <div className={`mt-3 grid gap-4 ${kind === "closed" ? "grid-cols-2" : "grid-cols-3"}`}>
      {providers.map((provider) => (
        <section key={provider.name} className="rounded-xl border border-[#0a2540]/10 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#0a2540]">{provider.name}</h2>
              <div className="mt-0.5 text-sm font-semibold text-[#005cff]">{provider.flagship}</div>
            </div>
            <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${provider.type === "Closed" ? "bg-[#0a2540] text-white" : "bg-emerald-100 text-emerald-800"}`}>
              {provider.type}
            </span>
          </div>
          <p className="mt-2 text-[14px] leading-snug text-[#0a2540]/75">{provider.note}</p>
          <div className="mt-2 text-[11px] uppercase tracking-wider text-[#0a2540]/45">{provider.hq}</div>
        </section>
      ))}
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
}: {
  tone: PanelKey;
  active: boolean;
  onToggle: () => void;
  label: string;
  oneLiner: string;
  definition: string;
  pros: string[];
  cons: string[];
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
        className="w-full text-left px-5 py-3.5 flex items-start gap-4 hover:bg-[#0a2540]/[0.02] focus:outline-none focus:ring-2 focus:ring-[#005cff]/40"
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
        <div className="max-h-[calc(100vh-390px)] overflow-y-auto px-5 pb-4 pt-1">
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
        </div>
      )}
    </div>
  );
}
