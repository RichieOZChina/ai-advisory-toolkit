import { useState } from "react";

const STEPS = [
  { l: "S", w: "Source", q: "Where did this come from? Is it a primary document or AI-generated?" },
  { l: "T", w: "Tie-out", q: "Does every number match the underlying source document?" },
  { l: "A", w: "Assumptions", q: "What's baked in that could be challenged?" },
  { l: "M", w: "Message", q: "Does it sound like us, or does it sound like a bot?" },
  { l: "P", w: "Permission", q: "Is it okay to put this specific data into this specific tool?" },
];

export function StampAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-4 rounded-xl border border-[color:var(--muted-line)] overflow-hidden">
      {STEPS.map((s, i) => (
        <div key={s.l} className="border-b border-[color:var(--muted-line)] last:border-b-0">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center gap-5 px-5 py-4 text-left hover:bg-[color:var(--secondary)] transition">
            <div className="w-11 h-11 rounded-lg bg-[color:var(--navy)] text-white flex items-center justify-center font-bold text-lg">{s.l}</div>
            <div className="flex-1">
              <div className="font-semibold text-lg">{s.w}</div>
            </div>
            <div className="text-[color:var(--accent)]">{open === i ? "−" : "+"}</div>
          </button>
          {open === i && <div className="px-5 pb-5 pl-[76px]"><p className="slide-body">{s.q}</p></div>}
        </div>
      ))}
    </div>
  );
}
