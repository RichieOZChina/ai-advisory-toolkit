/**
 * Four ways to run an agent — an autonomy ladder.
 * Each row is an SVG flow with an animated pulse traveling the path.
 * Palette matches the deck (navy #0a2540, accent #005cff).
 */

const NAVY = "#0a2540";
const ACCENT = "#005cff";

type Row = {
  n: string;
  kind: string;
  title: string;
  triggered: string;
  ends: string;
  banker: string;
  nodes: { x: number; label: string; sub?: string }[];
  loopBack?: string; // label under the dashed return arc
};

const ROWS: Row[] = [
  {
    n: "01",
    kind: "Turn-based",
    title: "You steer every move",
    triggered: "your prompt",
    ends: "you review",
    banker: "Analyst prompts, reviews each output. Drafting a buyer list, one turn at a time.",
    nodes: [
      { x: 90, label: "prompt" },
      { x: 300, label: "gather / check" },
      { x: 510, label: "act" },
      { x: 700, label: "reply" },
    ],
    loopBack: "you write the next prompt",
  },
  {
    n: "02",
    kind: "Goal-based",
    title: "It checks itself",
    triggered: "goal + budget",
    ends: "evaluator passes",
    banker: '"Draft a first-pass IC memo, stop when the checklist passes." Human reviews the finished artefact, not each step.',
    nodes: [
      { x: 90, label: "agent works" },
      { x: 340, label: "evaluator" },
      { x: 620, label: "goal met · stop" },
    ],
    loopBack: "no · back to work",
  },
  {
    n: "03",
    kind: "Time-based",
    title: "The clock triggers it",
    triggered: "interval fires",
    ends: "waits for tick",
    banker: "Every Monday 07:00 · scan the deal pipeline for stale items, post a summary to the deal channel.",
    nodes: [
      { x: 90, label: "interval fires" },
      { x: 340, label: "runs task" },
      { x: 620, label: "posts summary" },
    ],
    loopBack: "waits for next interval",
  },
  {
    n: "04",
    kind: "Proactive",
    title: "No human present",
    triggered: "event / schedule",
    ends: "it decides",
    banker: "A new filing hits for a target → agent triages, drafts a note, pings the deal lead. Event-driven.",
    nodes: [
      { x: 60, label: "event" },
      { x: 240, label: "triage" },
      { x: 420, label: "draft" },
      { x: 600, label: "notify" },
      { x: 760, label: "close" },
    ],
    loopBack: "waits for next event",
  },
];

export function AgentLoopTypes() {
  return (
    <div className="mt-4">
      <style>{`
        @keyframes agent-pulse {
          0%   { stroke-dashoffset: 900; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .agent-flow-pulse {
          stroke-dasharray: 60 840;
          animation: agent-pulse 3.6s linear infinite;
        }
      `}</style>

      <div className="rounded-2xl border border-[#0a2540]/10 bg-white p-6 md:p-7">
        {ROWS.map((row, i) => (
          <div key={row.n}>
            <LoopRow row={row} delay={i * 0.9} />
            {i < ROWS.length - 1 && (
              <div className="my-5 h-px w-full bg-[#0a2540]/10" />
            )}
          </div>
        ))}
        <div className="mt-6 pt-5 border-t border-[#0a2540]/10 text-center">
          <p className="slide-body-lg font-medium" style={{ color: NAVY }}>
            The more you hand off, the less you babysit — and the more governance you need.
          </p>
          <p className="slide-caption mt-1 text-[#0a2540]/60">
            STAMP (next section) is how we decide which loops are safe to run where.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoopRow({ row, delay }: { row: Row; delay: number }) {
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-5 items-center">
      {/* Left — label column */}
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[13px] font-semibold" style={{ color: ACCENT }}>
            {row.n}
          </span>
          <span className="slide-caption uppercase tracking-[0.18em] font-semibold" style={{ color: NAVY }}>
            {row.kind}
          </span>
        </div>
        <div className="mt-1 text-[20px] font-bold leading-tight" style={{ color: NAVY }}>
          {row.title}
        </div>
        <div className="mt-2 slide-caption text-[#0a2540]/65 leading-snug">
          <div><span className="font-semibold text-[#0a2540]/80">triggered by:</span> {row.triggered}</div>
          <div><span className="font-semibold text-[#0a2540]/80">ends:</span> {row.ends}</div>
        </div>
        <div className="mt-2 slide-caption text-[#0a2540]/55 italic leading-snug">
          {row.banker}
        </div>
      </div>

      {/* Right — flow diagram */}
      <LoopFlow row={row} delay={delay} />
    </div>
  );
}

function LoopFlow({ row, delay }: { row: Row; delay: number }) {
  const W = 880;
  const H = 140;
  const cy = 60;
  const nodeW = 130;
  const nodeH = 40;

  // Path across nodes (center-to-center, straight)
  const first = row.nodes[0].x;
  const last = row.nodes[row.nodes.length - 1].x;
  const pathD = `M ${first + nodeW / 2} ${cy} L ${last + nodeW / 2} ${cy}`;

  // Dashed loop-back arc
  const arcD = `M ${last + nodeW / 2} ${cy + nodeH / 2 + 4}
                C ${last + nodeW / 2} ${cy + 70}, ${first + nodeW / 2} ${cy + 70}, ${first + nodeW / 2} ${cy + nodeH / 2 + 4}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        <marker
          id={`arr-${row.n}`}
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
        </marker>
      </defs>

      {/* Base connector */}
      <path d={pathD} stroke={NAVY} strokeOpacity={0.18} strokeWidth={1.5} fill="none" />
      {/* Animated pulse traveling the connector */}
      <path
        d={pathD}
        stroke={ACCENT}
        strokeWidth={2.5}
        fill="none"
        className="agent-flow-pulse"
        style={{ animationDelay: `${delay}s` }}
      />

      {/* Loop-back dashed arc */}
      {row.loopBack && (
        <>
          <path
            d={arcD}
            stroke={NAVY}
            strokeOpacity={0.35}
            strokeWidth={1.2}
            strokeDasharray="4 4"
            fill="none"
            markerEnd={`url(#arr-${row.n})`}
          />
          <text
            x={(first + last) / 2 + nodeW / 2}
            y={cy + 78}
            textAnchor="middle"
            fontSize={11}
            fill={NAVY}
            opacity={0.55}
          >
            {row.loopBack}
          </text>
        </>
      )}

      {/* Nodes */}
      {row.nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={cy - nodeH / 2}
            width={nodeW}
            height={nodeH}
            rx={8}
            fill="#fff"
            stroke={ACCENT}
            strokeWidth={1.4}
          />
          <text
            x={n.x + nodeW / 2}
            y={cy + 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill={NAVY}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
