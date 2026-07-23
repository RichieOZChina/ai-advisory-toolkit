import { useState } from "react";

const STEPS = [
  { t: "1 · Goal", d: '"Draft a buyer outreach email for a specific deal targeting UK infra funds."', tone: "goal" as const },
  { t: "2 · Plan",   d: "LLM decomposes: pull deal one-pager · look up top 5 UK infra funds · draft email · check tone.", tone: "think" as const },
  { t: "3 · Act",    d: "Calls tools: file-reader, web-search, drafting model, tone-checker.", tone: "act" as const },
  { t: "4 · Observe",d: "Reads tool outputs. Was the fund list current? Did the tone check pass?", tone: "obs" as const },
  { t: "5 · Decide", d: "Loop again if gaps remain. Escalate to a human before anything is sent.", tone: "goal" as const },
];

const TOOLS = [
  { name: "File reader", ex: "read('CIM_deal.pdf')" },
  { name: "Web search",  ex: "search('UK infra fund AUM > £500m')" },
  { name: "Email draft", ex: "draft(to, subject, body)" },
  { name: "CRM",         ex: "log_activity(deal_id, ...)" },
  { name: "Calendar",    ex: "propose_slots(next_week)" },
];

export function AgentLoop() {
  const [step, setStep] = useState(0);
  const active = STEPS[step];
  return (
    <div className="mt-4 space-y-6">
      {/* Framing */}
      <div className="grid md:grid-cols-[1.15fr_1fr] gap-5">
        <div className="slide-card">
          <div className="slide-chip">What "agent" actually means</div>
          <p className="slide-body mt-3">
            The word <i>agent</i> comes from the Latin <b>agere</b> — <i>to do</i>. A real-estate agent acts on your
            behalf; an <b>AI agent</b> is a system that <b>takes actions on your behalf</b>, not just talks about them.
          </p>
          <p className="slide-body mt-3">
            The Field Work PDF defines the three ingredients: an <b>LLM</b> for reasoning, a <b>prompt</b> that sets
            its goal, and <b>tools</b> it can call — files, search, email, databases. Wire those together in a loop
            and you have an agent.
          </p>
        </div>
        <div className="slide-card-dark">
          <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>Chatbot vs agent</div>
          <p className="slide-body mt-3 text-slate-300">
            <b className="text-white">Chatbot:</b> you ask, it answers. Loop terminates immediately.
          </p>
          <p className="slide-body mt-2 text-slate-300">
            <b className="text-white">Agent:</b> you set a goal, it plans, calls tools, checks its own work, and only stops when the goal is met — or when it asks you to approve the next step.
          </p>
        </div>
      </div>

      {/* Loop visualization */}
      <div className="slide-card">
        <div className="slide-caption uppercase tracking-widest mb-4">The agent loop · click a step</div>
        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
            {/* Outer loop */}
            <circle cx={150} cy={150} r={110} fill="none" stroke="#cbd5e1" strokeDasharray="3 5" />
            {/* Center */}
            <circle cx={150} cy={150} r={44} fill="#0a2540" />
            <text x={150} y={145} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={600}>LLM</text>
            <text x={150} y={161} textAnchor="middle" fill="#7ab0ff" fontSize={9}>+ goal</text>

            {STEPS.map((s, i) => {
              const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 150 + Math.cos(angle) * 110;
              const y = 150 + Math.sin(angle) * 110;
              const isActive = i === step;
              return (
                <g key={s.t} onClick={() => setStep(i)} style={{ cursor: "pointer" }}>
                  <circle cx={x} cy={y} r={isActive ? 24 : 18} fill={isActive ? "#005cff" : "#fff"} stroke="#005cff" strokeWidth={2} />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={isActive ? "#fff" : "#005cff"}>{i + 1}</text>
                </g>
              );
            })}
            {/* Arrow marker */}
            <defs>
              <marker id="agarr" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={5} markerHeight={5} orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#005cff" />
              </marker>
            </defs>
            <path d="M 200 62 A 110 110 0 0 1 258 150" fill="none" stroke="#005cff" strokeWidth={1.5} markerEnd="url(#agarr)" opacity={0.5} />
          </svg>
          <div>
            <div className="slide-caption uppercase tracking-widest" style={{color:"var(--accent)"}}>{active.t}</div>
            <p className="text-lg font-medium mt-2 leading-snug">{active.d}</p>
            <div className="mt-5">
              <div className="slide-caption uppercase tracking-widest">Tools the agent can call</div>
              <div className="mt-2 grid grid-cols-1 gap-1.5">
                {TOOLS.map((tl) => (
                  <div key={tl.name} className="flex items-baseline gap-3 text-sm">
                    <span className="slide-chip w-[110px] shrink-0">{tl.name}</span>
                    <code className="font-mono text-xs text-slate-500">{tl.ex}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slide-card-dark">
        <p className="text-slate-200">
          <b className="text-white">The rule for banking:</b> agents may plan and draft, but every consequential
          action — sending, filing, spending — sits behind a human approval. STAMP is how we enforce that.
        </p>
      </div>
    </div>
  );
}
