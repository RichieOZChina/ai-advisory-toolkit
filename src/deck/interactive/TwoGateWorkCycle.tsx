const STAGES = ["Review", "Structure", "Create", "Challenge"];

export function TwoGateWorkCycle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mt-4" : "mt-5"}>
      <div className="grid grid-cols-[1fr_auto_2.4fr_auto_1fr] items-stretch gap-3">
        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 flex flex-col justify-center">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">Human gate · before</div>
          <div className="mt-2 text-xl font-bold text-[color:var(--navy)]">The data gate</div>
          <p className="mt-2 text-sm leading-snug text-slate-700">Is this data approved for this tool?</p>
        </div>
        <div className="self-center text-2xl text-[color:var(--accent)]">→</div>
        <div className="rounded-2xl bg-[color:var(--navy)] p-4 text-white">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">AI work cycle</div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {STAGES.map((stage, i) => (
              <div key={stage} className="rounded-xl border border-white/15 bg-white/5 px-2 py-4 text-center">
                <div className="text-xs font-mono text-blue-300">0{i + 1}</div>
                <div className="mt-1 font-semibold">{stage}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-slate-300">AI prepares and challenges the work. It cannot approve its own output.</p>
        </div>
        <div className="self-center text-2xl text-[color:var(--accent)]">→</div>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-4 flex flex-col justify-center">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">Human gate · after</div>
          <div className="mt-2 text-xl font-bold text-[color:var(--navy)]">The tie-out</div>
          <p className="mt-2 text-sm leading-snug text-slate-700">Do the numbers, claims, assumptions and presentation stand up?</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-[color:var(--accent)] px-5 py-3 text-center text-lg font-semibold text-white">
        If your name’s on it, you own it — AI or not.
      </div>
    </div>
  );
}
