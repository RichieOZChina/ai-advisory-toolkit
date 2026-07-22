import { useEffect, useState, useCallback } from "react";
import { SLIDES, SECTIONS } from "@/deck/slidesData";

function readHash(): number {
  if (typeof window === "undefined") return 1;
  const m = window.location.hash.match(/slide-(\d+)/i);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= SLIDES.length) return n;
  }
  return 1;
}

export function useDeckNav() {
  const [index, setIndex] = useState<number>(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIndex(readHash());
    setHydrated(true);
    const onHash = () => setIndex(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(1, Math.min(SLIDES.length, n));
    if (typeof window !== "undefined") {
      window.location.hash = `slide-${clamped}`;
    }
    setIndex(clamped);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  const goToSection = useCallback((sectionIdx: number) => {
    const s = SECTIONS[sectionIdx];
    if (s) goTo(s.startSlide);
  }, [goTo]);

  return { index, hydrated, goTo, next, prev, goToSection, total: SLIDES.length };
}
