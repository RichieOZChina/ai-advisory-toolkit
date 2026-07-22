export function WorkflowTimeline() {
  const OLD = [
    ["Research","1d"],["Draft","1d"],["Review","0.5d"],["Revise","0.5d"],["Format","0.5d"],
  ];
  const NEW = [
    ["Set direction","15m"],["AI drafts","30m"],["Review","1h"],["AI iterates","30m"],["Sign off","30m"],
  ];
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-8">
      <div>
        <div className="slide-caption uppercase tracking-widest">Old · 3–4 days</div>
        <div className="mt-3 space-y-2">
          {OLD.map(([t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-24 slide-caption">{t}</div>
              <div className="h-6 bg-slate-300 rounded" style={{ width: d.endsWith("d") ? parseFloat(d) * 60 + "px" : "20px" }} />
              <div className="slide-caption">{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="slide-caption uppercase tracking-widest" style={{ color: "var(--accent)" }}>New · 4–6 hours</div>
        <div className="mt-3 space-y-2">
          {NEW.map(([t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-24 slide-caption">{t}</div>
              <div className="h-6 bg-[color:var(--accent)] rounded" style={{ width: (d.endsWith("h") ? parseFloat(d) * 20 : 15) + "px" }} />
              <div className="slide-caption">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
