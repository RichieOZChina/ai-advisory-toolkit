export function NotesDrawer({ open, note }: { open: boolean; note?: string }) {
  if (!open) return null;
  return (
    <div className="no-print fixed left-0 right-0 bottom-0 z-30 bg-white border-t border-[color:var(--muted-line)] shadow-[0_-8px_24px_-16px_rgba(10,37,64,0.2)]">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="slide-caption uppercase tracking-widest">Speaker notes</div>
        <div className="mt-2 slide-body">{note || <span className="text-slate-400">No notes for this slide.</span>}</div>
      </div>
    </div>
  );
}
