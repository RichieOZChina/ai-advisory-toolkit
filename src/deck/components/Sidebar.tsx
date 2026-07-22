import { SECTIONS, SLIDES } from "@/deck/slidesData";

export function Sidebar({
  currentSlide,
  onSelect,
  onSelectSection,
  onClose,
}: {
  currentSlide: number;
  onSelect: (n: number) => void;
  onSelectSection: (idx: number) => void;
  onClose: () => void;
}) {
  return (
    <aside
      className="no-print h-full flex flex-col bg-[color:var(--navy)] text-slate-100 border-r border-black/40"
      style={{ transition: "width 180ms ease" }}
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400">Tenet × Sentia</div>
          <div className="text-sm font-semibold text-white">AI for the M&amp;A Team</div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-slate-300"
          aria-label="Close sidebar"
          title="Close (Esc / M)"
        >×</button>
      </div>

      {/* Section shortcut row */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Jump to section</div>
        <div className="flex gap-1.5">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onSelectSection(i)}
              className="group relative w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white/90"
              style={{ background: s.color }}
              title={s.title}
            >
              {i + 1}
              <span className="absolute top-full mt-2 whitespace-nowrap text-[10px] bg-black/80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Slide list */}
      <div className="flex-1 overflow-y-auto pb-8">
        {SECTIONS.map((sec, sIdx) => {
          const slides = SLIDES.filter((sl) => sl.section === sIdx);
          return (
            <div key={sec.id}>
              <div className="sb-section-label">
                <span className="sb-section-bar" style={{ background: sec.color }} />
                {sIdx + 1}. {sec.title}
              </div>
              {slides.map((sl) => (
                <button
                  key={sl.id}
                  onClick={() => onSelect(sl.id)}
                  className={"sb-item " + (currentSlide === sl.id ? "active" : "")}
                >
                  <span className="sb-num">{String(sl.id).padStart(2, "0")}</span>
                  <span className="flex-1">{sl.title}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
