import { useEffect, useState, useCallback } from "react";

const KEY = "deck.sidebar.open";

export function useSidebar() {
  const [open, setOpen] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v !== null) setOpen(v === "1");
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, open ? "1" : "0"); } catch {}
  }, [open, hydrated]);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  return { open, setOpen, toggle };
}
