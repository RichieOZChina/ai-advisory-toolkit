import { useState } from "react";

type Defect = { id: string; text: string; check: string; why: string };

const DEFECTS: Defect[] = [
  { id: "growth", text: "industry growth of 8.3%", check: "Reference", why: "No citation — this figure has no source attribution." },
  { id: "generic", text: "leveraging its best-in-class platform to unlock transformational value", check: "Readability", why: "Generic consulting-speak — no analyst would write this." },
  { id: "number", text: "revenue of A$142m (per FY26 accounts)", check: "Number tie-out", why: "Underlying FY26 accounts show A$138m — number doesn't tie." },
  { id: "date", text: "cash balance of A$14m", check: "Reference date", why: "No as-of date on this financial figure." },
  { id: "share", text: "with ~40% market share", check: "Assumption", why: "Unstated assumption about the market definition used." },
];

const CONTEXT = `Acme Foods is a leading Australian food manufacturer with revenue of A$142m (per FY26 accounts), leveraging its best-in-class platform to unlock transformational value in a sector experiencing industry growth of 8.3%. The business has a cash balance of A$14m and operates in a defensive category with ~40% market share.`;

export function StampExercise() {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<string | null>(null);

  const renderText = () => {
    let out: (string | { d: Defect; start: number; end: number })[] = [CONTEXT];
    for (const d of DEFECTS) {
      const next: typeof out = [];
      for (const seg of out) {
        if (typeof seg !== "string") { next.push(seg); continue; }
        const idx = seg.indexOf(d.text);
        if (idx === -1) { next.push(seg); continue; }
        next.push(seg.slice(0, idx));
        next.push({ d, start: idx, end: idx + d.text.length });
        next.push(seg.slice(idx + d.text.length));
      }
      out = next;
    }
    return out.map((seg, i) =>
      typeof seg === "string" ? <span key={i}>{seg}</span> :
        <button
          key={i}
          onClick={() => { setSel(seg.d.id); setFound((f) => new Set(f).add(seg.d.id)); }}
          className="underline decoration-wavy decoration-[color:var(--warn)] underline-offset-4 hover:bg-yellow-100 rounded px-0.5"
        >{seg.d.text}</button>
    );
  };

  const selDef = DEFECTS.find((d) => d.id === sel);
  return (
    <div className="mt-4 grid md:grid-cols-[1fr_320px] gap-6">
      <div className="slide-card">
        <div className="slide-caption uppercase tracking-widest">AI-generated overview</div>
        <p className="slide-body mt-3 leading-relaxed">{renderText()}</p>
        <div className="slide-caption mt-4">Click each underlined issue to reveal what the human tie-out should catch.</div>
      </div>
      <div className="slide-card">
        <div className="flex items-center justify-between">
          <div className="slide-caption uppercase tracking-widest">Found</div>
          <div className="font-mono text-lg text-[color:var(--accent)]">{found.size} / {DEFECTS.length}</div>
        </div>
        {selDef ? (
          <div className="mt-4">
            <div className="slide-chip">{selDef.check}</div>
            <div className="mt-2 font-semibold">"{selDef.text}"</div>
            <p className="slide-body mt-3">{selDef.why}</p>
          </div>
        ) : (
          <p className="slide-body mt-4">Select an issue to see what the human tie-out should catch.</p>
        )}
      </div>
    </div>
  );
}
