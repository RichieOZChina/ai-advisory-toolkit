import { useEffect, useState, useCallback, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopProgressBar } from "./components/TopProgressBar";
import { KeyboardHelp } from "./components/KeyboardHelp";
import { NotesDrawer } from "./components/NotesDrawer";
import { useSidebar } from "./hooks/useSidebar";
import { useDeckNav } from "./hooks/useDeckNav";
import { useHotkeys } from "./hooks/useHotkeys";
import { SLIDES } from "./slidesData";

const SIDEBAR_WIDTH = 268;

export function Deck() {
  const { open, setOpen, toggle } = useSidebar();
  const nav = useDeckNav();
  const [helpOpen, setHelpOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useHotkeys({
    ArrowRight: () => nav.next(),
    ArrowLeft: () => nav.prev(),
    " ": (e) => { e.preventDefault(); nav.next(); },
    m: () => toggle(),
    M: () => toggle(),
    n: () => setNotesOpen((v) => !v),
    N: () => setNotesOpen((v) => !v),
    "?": () => setHelpOpen((v) => !v),
    Escape: () => { if (helpOpen) setHelpOpen(false); else if (open) setOpen(false); },
    "1": () => nav.goToSection(0),
    "2": () => nav.goToSection(1),
    "3": () => nav.goToSection(2),
    "4": () => nav.goToSection(3),
    "5": () => nav.goToSection(4),
    "6": () => nav.goToSection(5),
    "7": () => nav.goToSection(6),
  });

  // Re-trigger fade animation on slide change
  useEffect(() => {
    if (!slideRef.current) return;
    slideRef.current.classList.remove("fade-up");
    // force reflow
    void slideRef.current.offsetWidth;
    slideRef.current.classList.add("fade-up");
  }, [nav.index]);

  const currentSlide = SLIDES.find((s) => s.id === nav.index) || SLIDES[0];
  const doClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className="min-h-screen bg-white text-[color:var(--ink)] flex overflow-hidden">
      <TopProgressBar current={nav.index} total={nav.total} />

      {/* Sidebar */}
      <div
        className="no-print fixed left-0 top-0 h-screen z-30"
        style={{
          width: SIDEBAR_WIDTH,
          transform: open ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: "transform 180ms ease",
        }}
      >
        <Sidebar
          currentSlide={nav.index}
          onSelect={nav.goTo}
          onSelectSection={nav.goToSection}
          onClose={doClose}
        />
      </div>

      {/* Main */}
      <div
        className="deck-main flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: open ? SIDEBAR_WIDTH : 0, transition: "margin-left 180ms ease" }}
      >
        {!open && <div className="edge-hint no-print" />}
        <button
          onClick={toggle}
          className="no-print fixed top-3 left-3 z-40 w-10 h-10 rounded-md bg-white/90 backdrop-blur border border-[color:var(--muted-line)] flex items-center justify-center hover:bg-white shadow-sm"
          aria-label="Toggle sidebar"
          title="Toggle sidebar (M)"
          style={{ opacity: open ? 0 : 1, pointerEvents: open ? "none" : "auto", transition: "opacity 160ms ease" }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 1h16M1 7h16M1 13h16" stroke="#0a2540" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>

        <main ref={slideRef} key={nav.index} className="flex-1 fade-up">
          {currentSlide.render()}
        </main>

        {/* Chrome */}
        <div
          className="deck-chrome-left no-print fixed top-5 left-16 z-20 rounded-full border border-[color:var(--muted-line)] bg-white/90 px-3 py-1.5 font-mono text-[11px] tabular-nums tracking-wider text-slate-500 shadow-sm backdrop-blur"
          style={{ marginLeft: open ? SIDEBAR_WIDTH : 0, transition: "margin-left 180ms ease" }}
          aria-label={`Slide ${nav.index} of ${nav.total}`}
        >
          {String(nav.index).padStart(2, "0")} / {nav.total}
        </div>

        <div className="deck-chrome-left no-print fixed bottom-4 left-4 z-30 font-mono text-xs text-slate-500 flex items-center gap-3"
             style={{ marginLeft: open ? SIDEBAR_WIDTH : 0, transition: "margin-left 180ms ease" }}>
          <span className="tabular-nums" aria-hidden="true">
            {String(nav.index).padStart(2, "0")} / {nav.total}
          </span>
          <button onClick={() => setNotesOpen((v) => !v)} className="hover:text-[color:var(--accent)]" title="Toggle notes (N)">📝</button>
          <button onClick={() => setHelpOpen(true)} className="hover:text-[color:var(--accent)]" title="Keyboard help (?)">?</button>
        </div>

        <div className="no-print fixed bottom-4 right-4 z-30 flex items-center gap-1">
          <button
            onClick={nav.prev}
            disabled={nav.index === 1}
            className="w-10 h-10 rounded-md border border-[color:var(--muted-line)] bg-white/70 hover:bg-white flex items-center justify-center text-slate-400 hover:text-[color:var(--navy)] disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Previous slide"
          >‹</button>
          <button
            onClick={nav.next}
            disabled={nav.index === nav.total}
            className="w-10 h-10 rounded-md border border-[color:var(--muted-line)] bg-white/70 hover:bg-white flex items-center justify-center text-slate-400 hover:text-[color:var(--navy)] disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Next slide"
          >›</button>
        </div>
      </div>

      <KeyboardHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
      <NotesDrawer open={notesOpen} note={currentSlide.notes} />
    </div>
  );
}
