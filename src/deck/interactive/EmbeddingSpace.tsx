import { useEffect, useMemo, useRef, useState } from "react";

/**
 * A rotating 3D vector-space visualisation, projected to 2D via SVG.
 * Points are grouped into semantic clusters. The king / queen / man / woman
 * parallelogram is drawn on top to illustrate vector arithmetic.
 */

type P3 = { w: string; x: number; y: number; z: number; group: G };
type G = "royalty" | "people" | "fruit" | "animal" | "finance";

const GROUPS: Record<G, { label: string; color: string }> = {
  royalty: { label: "Royalty", color: "#005cff" },
  people: { label: "People", color: "#3b82f6" },
  fruit: { label: "Fruit", color: "#f59e0b" },
  animal: { label: "Animals", color: "#10b981" },
  finance: { label: "Finance", color: "#8b5cf6" },
};

// Coordinates roughly follow the PDF's illustrative numbers (page 24).
const POINTS: P3[] = [
  { w: "king",   x:  1.4, y:  0.9, z:  0.6, group: "royalty" },
  { w: "queen",  x:  1.1, y:  1.2, z:  0.4, group: "royalty" },
  { w: "prince", x:  1.6, y:  0.6, z:  0.9, group: "royalty" },
  { w: "man",    x:  0.5, y: -0.4, z:  0.7, group: "people" },
  { w: "woman",  x:  0.2, y: -0.1, z:  0.5, group: "people" },
  { w: "apple",  x: -1.4, y:  0.3, z: -0.9, group: "fruit" },
  { w: "orange", x: -1.2, y:  0.6, z: -0.7, group: "fruit" },
  { w: "banana", x: -1.6, y:  0.1, z: -1.1, group: "fruit" },
  { w: "dog",    x: -0.3, y: -1.3, z:  1.1, group: "animal" },
  { w: "fox",    x: -0.1, y: -1.5, z:  0.9, group: "animal" },
  { w: "wolf",   x: -0.5, y: -1.1, z:  1.3, group: "animal" },
  { w: "bank",   x:  0.7, y:  1.5, z: -1.2, group: "finance" },
  { w: "credit", x:  0.4, y:  1.7, z: -1.0, group: "finance" },
  { w: "loan",   x:  1.0, y:  1.4, z: -1.4, group: "finance" },
];

// project 3D → 2D. yaw around Y, small tilt around X.
function project(p: { x: number; y: number; z: number }, yaw: number, tilt: number) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cx = Math.cos(tilt), sx = Math.sin(tilt);
  // rotate around Y
  const x1 = p.x * cy + p.z * sy;
  const z1 = -p.x * sy + p.z * cy;
  // rotate around X
  const y2 = p.y * cx - z1 * sx;
  const z2 = p.y * sx + z1 * cx;
  return { x: x1, y: y2, depth: z2 };
}

export function EmbeddingSpace() {
  const [yaw, setYaw] = useState(0.6);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const raf = useRef<number>();
  const last = useRef<number>(performance.now());
  const tilt = -0.35;

  useEffect(() => {
    const tick = (t: number) => {
      const dt = (t - last.current) / 1000;
      last.current = t;
      if (!paused) setYaw((y) => y + dt * 0.35);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [paused]);

  // viewport
  const W = 640, H = 460, cx0 = W / 2, cy0 = H / 2 + 20, scale = 90;

  // project + z-sort so nearer points render on top
  const projected = useMemo(() => {
    return POINTS.map((p) => {
      const q = project(p, yaw, tilt);
      return { ...p, sx: cx0 + q.x * scale, sy: cy0 - q.y * scale, depth: q.depth };
    }).sort((a, b) => a.depth - b.depth);
  }, [yaw]);

  // axes
  const axLen = 1.7;
  const axes = useMemo(() => {
    const o = project({ x: 0, y: 0, z: 0 }, yaw, tilt);
    const ax = project({ x: axLen, y: 0, z: 0 }, yaw, tilt);
    const ay = project({ x: 0, y: axLen, z: 0 }, yaw, tilt);
    const az = project({ x: 0, y: 0, z: axLen }, yaw, tilt);
    const to = (p: { x: number; y: number }) => ({ x: cx0 + p.x * scale, y: cy0 - p.y * scale });
    return {
      o: to(o),
      x: to(ax),
      y: to(ay),
      z: to(az),
    };
  }, [yaw]);

  // parallelogram vertices (king, queen, woman, man)
  const analogy = useMemo(() => {
    const map = Object.fromEntries(projected.map((p) => [p.w, p]));
    return ["king", "queen", "woman", "man"].map((w) => map[w]).filter(Boolean);
  }, [projected]);

  return (
    <div className="mt-2 grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      {/* Framing intro */}
      <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
        <div className="slide-card">
          <div className="slide-chip">Why this matters</div>
          <p className="slide-body mt-2">Tokens on their own are just numbers. Computers need a way to know that <b>“cat”</b> and <b>“kitten”</b> are related — but <b>“cat”</b> and <b>“carburettor”</b> aren’t. Embeddings are how.</p>
        </div>
        <div className="slide-card">
          <div className="slide-chip">The Grand Library</div>
          <p className="slide-body mt-2">Picture a library where books on similar topics sit on the same shelf. Embeddings do the same for words — except the “shelves” live in a mathematical space with <b>hundreds of dimensions</b>.</p>
        </div>
        <div className="slide-card">
          <div className="slide-chip">In one line</div>
          <p className="slide-body mt-2"><b>Embedding:</b> a list of numbers (coordinates) that captures what a word <i>means</i>, so words with similar meaning sit close together in space.</p>
        </div>
      </div>

      {/* 3D canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-[color:var(--muted-line)]"
           style={{ background: "radial-gradient(1200px 500px at 30% 20%, #10203a 0%, #0a1628 55%, #06101d 100%)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#005cff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#005cff" stopOpacity="0" />
            </radialGradient>
            {(Object.keys(GROUPS) as G[]).map((g) => (
              <radialGradient key={g} id={`dot-${g}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={GROUPS[g].color} stopOpacity="1" />
                <stop offset="100%" stopColor={GROUPS[g].color} stopOpacity="0.15" />
              </radialGradient>
            ))}
            <marker id="arrEmb" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#e2e8f0" />
            </marker>
          </defs>

          {/* faint grid on the xz plane (y=0) */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = (i - 4) * 0.4;
            const a = project({ x: t, y: 0, z: -1.6 }, yaw, tilt);
            const b = project({ x: t, y: 0, z:  1.6 }, yaw, tilt);
            const c = project({ x: -1.6, y: 0, z: t }, yaw, tilt);
            const d = project({ x:  1.6, y: 0, z: t }, yaw, tilt);
            const to = (p: any) => [cx0 + p.x * scale, cy0 - p.y * scale];
            const [ax, ay] = to(a), [bx, by] = to(b), [ccx, ccy] = to(c), [dx, dy] = to(d);
            return (
              <g key={i} stroke="#1e3a5f" strokeWidth={0.6} opacity={0.55}>
                <line x1={ax} y1={ay} x2={bx} y2={by} />
                <line x1={ccx} y1={ccy} x2={dx} y2={dy} />
              </g>
            );
          })}

          {/* axes */}
          <g stroke="#64748b" strokeWidth={1}>
            <line x1={axes.o.x} y1={axes.o.y} x2={axes.x.x} y2={axes.x.y} />
            <line x1={axes.o.x} y1={axes.o.y} x2={axes.y.x} y2={axes.y.y} />
            <line x1={axes.o.x} y1={axes.o.y} x2={axes.z.x} y2={axes.z.y} />
          </g>
          <g fill="#94a3b8" fontSize={11} fontFamily="ui-monospace, monospace">
            <text x={axes.x.x + 6} y={axes.x.y + 4}>dim 1</text>
            <text x={axes.y.x + 4} y={axes.y.y - 4}>dim 2</text>
            <text x={axes.z.x + 6} y={axes.z.y + 4}>dim 3</text>
          </g>

          {/* analogy parallelogram: king → queen and man → woman + connecting differences */}
          {analogy.length === 4 && (
            <g>
              <path
                d={`M${analogy[0].sx},${analogy[0].sy} L${analogy[1].sx},${analogy[1].sy} L${analogy[2].sx},${analogy[2].sy} L${analogy[3].sx},${analogy[3].sy} Z`}
                fill="#005cff" fillOpacity={0.08} stroke="#005cff" strokeOpacity={0.55} strokeDasharray="4 3" strokeWidth={1}
              />
              <line x1={analogy[0].sx} y1={analogy[0].sy} x2={analogy[1].sx} y2={analogy[1].sy}
                    stroke="#e2e8f0" strokeWidth={1.4} markerEnd="url(#arrEmb)" />
              <line x1={analogy[3].sx} y1={analogy[3].sy} x2={analogy[2].sx} y2={analogy[2].sy}
                    stroke="#e2e8f0" strokeWidth={1.4} markerEnd="url(#arrEmb)" />
            </g>
          )}

          {/* points */}
          {projected.map((p) => {
            const near = (p.depth + 2) / 4; // 0..1
            const r = 4 + near * 4;
            const isHover = hover === p.w;
            return (
              <g key={p.w} onMouseEnter={() => setHover(p.w)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
                <circle cx={p.sx} cy={p.sy} r={r * 3} fill="url(#glow)" opacity={0.4 + near * 0.3} />
                <circle cx={p.sx} cy={p.sy} r={r} fill={`url(#dot-${p.group})`} stroke={GROUPS[p.group].color} strokeWidth={1} />
                <text
                  x={p.sx + r + 4}
                  y={p.sy + 3}
                  fill={isHover ? "#ffffff" : "#e2e8f0"}
                  fontSize={11 + near * 2}
                  fontFamily="ui-sans-serif, system-ui"
                  fontWeight={isHover ? 700 : 500}
                  opacity={0.55 + near * 0.45}
                >
                  {p.w}
                </text>
              </g>
            );
          })}
        </svg>

        <button
          onClick={() => setPaused((p) => !p)}
          className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-md border border-white/15 text-white/80 hover:bg-white/10"
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>

        {/* legend */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {(Object.keys(GROUPS) as G[]).map((g) => (
            <div key={g} className="flex items-center gap-1.5 text-[11px] text-white/80 bg-black/25 backdrop-blur px-2 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full" style={{ background: GROUPS[g].color }} />
              {GROUPS[g].label}
            </div>
          ))}
        </div>
      </div>

      {/* Side panel */}
      <div className="space-y-4">
        <div className="slide-card">
          <div className="slide-chip">Vector</div>
          <p className="slide-body mt-2">A list of numbers that pinpoints a location in space. In 3D that’s <span className="font-mono">[x, y, z]</span>. Real LLMs use <b>hundreds to thousands</b> of dimensions.</p>
          <div className="mt-3 grid grid-cols-4 gap-1 text-[11px] font-mono">
            <div className="text-white/50">token</div><div className="text-white/50 text-right">x</div><div className="text-white/50 text-right">y</div><div className="text-white/50 text-right">z</div>
            <div>fox</div><div className="text-right">-0.3</div><div className="text-right">0.6</div><div className="text-right">0.4</div>
            <div>dog</div><div className="text-right">-0.4</div><div className="text-right">0.7</div><div className="text-right">0.3</div>
            <div>apple</div><div className="text-right">-1.4</div><div className="text-right">0.3</div><div className="text-right">-0.9</div>
          </div>
        </div>

        <div className="slide-card">
          <div className="slide-chip">Vector arithmetic</div>
          <div className="mt-2 font-mono text-sm leading-relaxed">
            king − queen ≈ man − woman<br/>
            <span className="text-white/60">so:</span> king − queen + woman ≈ man
          </div>
          <p className="slide-body mt-3">The <span className="text-[color:var(--accent)]">dashed parallelogram</span> in the canvas shows exactly that — the shift from <i>king</i> to <i>queen</i> is the same direction as <i>man</i> to <i>woman</i>. That’s the model learning “gender” as a direction in space.</p>
        </div>

        <div className="slide-card">
          <div className="slide-chip">In practice</div>
          <p className="slide-body mt-2">OpenAI’s embedding models use <b>1,536 dimensions</b>. We show 3 because our brains give up at four. Every extra dimension lets the model capture a subtler shade of meaning.</p>
        </div>
      </div>
    </div>
  );
}
