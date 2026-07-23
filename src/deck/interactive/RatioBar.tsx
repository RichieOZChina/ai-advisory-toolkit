export function RatioBar() {
  return (
    <div className="mt-8 max-w-4xl">
      <div className="flex h-20 rounded-xl overflow-hidden border border-[color:var(--muted-line)]">
        <div className="bg-[color:var(--accent)] text-white flex items-center px-6 font-semibold" style={{ width: "80%" }}>
          <div>
            <div className="text-2xl font-bold">Assembling</div>
            <div className="text-xs uppercase tracking-widest opacity-90">Pulling data · formatting · chasing sources</div>
          </div>
        </div>
        <div className="bg-white flex items-center px-6" style={{ width: "20%" }}>
          <div>
            <div className="text-2xl font-bold">Deciding</div>
            <div className="slide-caption uppercase tracking-widest">The actual judgement</div>
          </div>
        </div>
      </div>
    </div>
  );
}
