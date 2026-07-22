export function OpenClosedTree() {
  const closed = ["OpenAI · GPT-4o / GPT-5", "Anthropic · Claude Sonnet 5", "Google · Gemini 2.5"];
  const open = ["Meta · Llama 4", "DeepSeek · V4", "Mistral · Large 3", "Qwen · 3"];
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <div className="slide-card">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[color:var(--navy)] text-white">CLOSED</span>
          <div className="font-semibold">API-only, hosted by the vendor</div>
        </div>
        <ul className="mt-4 space-y-2 slide-body">{closed.map((c) => <li key={c} className="flex gap-2"><span className="text-[color:var(--accent)]">·</span>{c}</li>)}</ul>
      </div>
      <div className="slide-card">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: "#dcfce7", color: "#166534" }}>OPEN</span>
          <div className="font-semibold">Downloadable weights, self-hostable</div>
        </div>
        <ul className="mt-4 space-y-2 slide-body">{open.map((c) => <li key={c} className="flex gap-2"><span className="text-[color:var(--accent)]">·</span>{c}</li>)}</ul>
      </div>
    </div>
  );
}
