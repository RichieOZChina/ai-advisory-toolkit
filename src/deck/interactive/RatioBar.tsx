export function RatioBar() {
  return (
    <div className="mt-8 max-w-4xl">
      <div className="flex h-20 rounded-xl overflow-hidden border border-[color:var(--muted-line)]">
        <div className="bg-[color:var(--accent)] text-white flex items-center px-6 font-semibold" style={{ width: "78%" }}>
          <div>
            <div className="text-3xl font-bold">78%</div>
            <div className="text-xs uppercase tracking-widest opacity-90">Assembling</div>
          </div>
        </div>
        <div className="bg-white flex items-center px-6" style={{ width: "22%" }}>
          <div>
            <div className="text-3xl font-bold">22%</div>
            <div className="slide-caption uppercase tracking-widest">Deciding</div>
          </div>
        </div>
      </div>
    </div>
  );
}
