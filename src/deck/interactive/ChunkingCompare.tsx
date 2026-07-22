export function ChunkingCompare() {
  const doc = "The vendor DD identified three material risks: customer concentration, key-person dependency, and margin compression from input costs. Each risk was quantified in Appendix B, page 47.";
  const options = [
    { label: "Too small · 30 chars", size: 30, verdict: "Loses context — chunks split mid-sentence.", tone: "warn" },
    { label: "Right size · 180 chars", size: 180, verdict: "Preserves meaning; one idea per chunk.", tone: "good" },
    { label: "Too large · full doc", size: 999, verdict: "Retrieval matches everything → dilutes relevance.", tone: "warn" },
  ];
  return (
    <div className="mt-6 grid md:grid-cols-3 gap-4">
      {options.map((o) => {
        const chunks = chunk(doc, o.size);
        return (
          <div key={o.label} className="slide-card">
            <div className="font-semibold">{o.label}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {chunks.map((c, i) => (
                <span key={i} className="px-2 py-1 rounded text-[11px] font-mono text-white" style={{ background: i % 2 ? "#0a2540" : "#005cff" }}>{c.length}</span>
              ))}
            </div>
            <div className="slide-caption mt-4">{o.verdict}</div>
          </div>
        );
      })}
    </div>
  );
}

function chunk(s: string, size: number) {
  if (size >= s.length) return [s];
  const out: string[] = [];
  for (let i = 0; i < s.length; i += size) out.push(s.slice(i, i + size));
  return out;
}
