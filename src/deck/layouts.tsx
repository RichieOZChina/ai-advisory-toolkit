import type { ReactNode } from "react";

// Shared layouts used by slidesData

function Frame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={"slide-page fade-up h-screen overflow-hidden px-8 md:px-14 py-8 md:py-9 " + (dark ? "bg-[color:var(--navy)] text-slate-100" : "")}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

export function Title({ kicker, title, subtitle, footer }: { kicker?: string; title: ReactNode; subtitle?: string; footer?: string }) {
  return (
    <div className="slide-page fade-up min-h-full flex flex-col justify-between px-8 md:px-16 py-12">
      <div>{kicker && <div className="slide-kicker">{kicker}</div>}</div>
      <div>
        <div className="slide-title-lg">{title}</div>
        {subtitle && <div className="slide-subtitle mt-6 max-w-3xl">{subtitle}</div>}
      </div>
      <div className="slide-caption">{footer}</div>
    </div>
  );
}

export function Body({ kicker, title, children }: { kicker?: string; title?: ReactNode; children: ReactNode }) {
  return (
    <Frame>
      {kicker && <div className="slide-kicker">{kicker}</div>}
      {title && <h1 className="slide-title mt-3">{title}</h1>}
      <div className="mt-4">{children}</div>
    </Frame>
  );
}

export function Section({ number, title, subtitle, children }: { number: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="slide-page fade-up min-h-full flex flex-col justify-center px-8 md:px-16 py-14 bg-[color:var(--navy)] text-slate-100">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-[color:var(--accent-soft)] font-mono text-sm tracking-widest">SECTION · {number}</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,80px)] font-bold leading-[1.02]">{title}</h1>
        {subtitle && <p className="mt-6 text-slate-300 text-lg max-w-3xl">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export function Center({ children }: { children: ReactNode }) {
  return (
    <div className="slide-page fade-up min-h-full flex items-center justify-center px-8 md:px-16 py-14">
      {children}
    </div>
  );
}

export function Prompt({ step, label, title, children }: { step: string; label: string; title: string; children: ReactNode }) {
  return (
    <Frame>
      <div className="flex items-center gap-3">
        <div className="slide-kicker">Step {step}</div>
        <span className="slide-chip">{label}</span>
      </div>
      <h1 className="slide-title mt-3">{title}</h1>
      <div className="mt-6 max-w-4xl">{children}</div>
    </Frame>
  );
}

export function Move({ n, title, flow, example }: { n: number; title: string; flow: string[]; example: string }) {
  return (
    <Frame>
      <div className="slide-kicker">Move {n}</div>
      <h1 className="slide-title mt-3">{title}</h1>
      <div className="mt-8 flex items-center gap-3 flex-wrap">
        {flow.map((t, i, a) => (
          <div key={i} className="flex items-center gap-3">
            <div className="slide-card px-4 py-3 font-medium text-sm">{t}</div>
            {i < a.length - 1 && <div className="text-[color:var(--accent)] text-xl">→</div>}
          </div>
        ))}
      </div>
      <div className="mt-10 max-w-4xl">
        <div className="slide-caption uppercase tracking-widest">Example prompt</div>
        <div className="mt-2 slide-card-dark font-mono text-sm whitespace-pre-wrap">{example}</div>
      </div>
    </Frame>
  );
}

export function Build({ step, of, title, prompt }: { step: number; of: number; title: string; prompt: string }) {
  return (
    <Frame>
      <div className="flex items-center gap-3">
        <div className="slide-kicker">Build · step {step} of {of}</div>
      </div>
      <h1 className="slide-title mt-3">{title}</h1>
      <div className="mt-10 slide-card-dark max-w-4xl text-lg">{prompt}</div>
      <div className="mt-10 flex items-center gap-3">
        <div className="slide-caption uppercase tracking-widest">Timer</div>
        <div className="text-3xl font-mono text-[color:var(--accent)]">--:--</div>
      </div>
    </Frame>
  );
}
