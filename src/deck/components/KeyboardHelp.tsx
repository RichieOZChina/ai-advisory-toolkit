export function KeyboardHelp({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const rows: [string, string][] = [
    ["←  →", "Previous / next slide"],
    ["M", "Toggle sidebar"],
    ["Esc", "Close sidebar / this overlay"],
    ["1 – 7", "Jump to section"],
    ["?", "Toggle this help"],
    ["N", "Toggle speaker notes"],
  ];
  return (
    <div className="no-print fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl border border-[color:var(--muted-line)] max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="slide-kicker">Keyboard shortcuts</div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800">×</button>
        </div>
        <div className="mt-4 space-y-2">
          {rows.map(([k, l]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-[color:var(--muted-line)] last:border-b-0">
              <div className="flex gap-1">{k.split(/\s+/).map((c, i) => <span key={i} className="kbd">{c}</span>)}</div>
              <div className="slide-body text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
