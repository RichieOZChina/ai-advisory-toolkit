export function RagFlow() {
  return (
    <div className="mt-6 space-y-8">
      <div>
        <div className="slide-caption uppercase tracking-widest">Phase 1 · Indexing (once)</div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {["Documents","Chunk","Embed","Vector DB"].map((t, i, a) => (
            <div key={t} className="flex items-center gap-3">
              <div className="slide-card px-5 py-3 font-medium text-sm">{t}</div>
              {i < a.length - 1 && <div className="text-[color:var(--accent)] text-xl">→</div>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="slide-caption uppercase tracking-widest">Phase 2 · Query (every time)</div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {["User question","Embed","Retrieve top-k chunks","LLM + chunks","Answer with sources"].map((t, i, a) => (
            <div key={t} className="flex items-center gap-3">
              <div className="slide-card px-5 py-3 font-medium text-sm">{t}</div>
              {i < a.length - 1 && <div className="text-[color:var(--accent)] text-xl">→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
