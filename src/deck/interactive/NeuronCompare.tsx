/**
 * Neural network diagram — mirrors the pedagogical layout in
 * 1.2a_LLM_Theory (p.4): biological neural network on top, artificial
 * neural network below with Input / Hidden / Output layer labels.
 * Rebuilt as a premium consulting-style SVG (no clip art).
 */

const NAVY = "#0a2540";
const ACCENT = "#005cff";
const INK_SOFT = "#0a2540";

export function NeuronCompare() {
  return (
    <div className="mt-6 rounded-2xl border border-[#0a2540]/10 bg-white p-6 md:p-8">
      {/* Biological */}
      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#0a2540]/55 font-semibold">
            Biological neural network
          </div>
          <div className="text-[11px] text-[#0a2540]/45">Inspiration</div>
        </div>
        <BiologicalPair />
        <div className="mt-2 grid grid-cols-2 gap-6 text-center">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#005cff]">
            Neuron A
          </div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#005cff]">
            Neuron B
          </div>
        </div>
      </div>

      {/* Divider with arrow */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#0a2540]/10" />
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#0a2540]/50 font-semibold">
          Inspired by, not copied from
        </div>
        <div className="h-px flex-1 bg-[#0a2540]/10" />
      </div>

      {/* Artificial */}
      <div>
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#0a2540]/55 font-semibold">
            Artificial neural network
          </div>
          <div className="text-[11px] text-[#0a2540]/45">The machine under the hood</div>
        </div>
        <ArtificialNetwork />
        <div className="mt-3 grid grid-cols-[1fr_2fr_1fr] gap-4 text-center">
          <LayerLabel title="Input layer" sub="Receives the data" />
          <LayerLabel title="Hidden layers" sub="Extract patterns & features" highlight />
          <LayerLabel title="Output layer" sub="Produces the prediction" />
        </div>
      </div>
    </div>
  );
}

function LayerLabel({ title, sub, highlight = false }: { title: string; sub: string; highlight?: boolean }) {
  return (
    <div>
      <div
        className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${
          highlight ? "text-[#005cff]" : "text-[#0a2540]"
        }`}
      >
        {title}
      </div>
      <div className="mt-0.5 text-[11px] text-[#0a2540]/60">{sub}</div>
    </div>
  );
}

/* ----------------------------- Biological ----------------------------- */

function BiologicalPair() {
  return (
    <svg viewBox="0 0 720 210" className="mt-3 w-full" aria-hidden>
      <defs>
        <radialGradient id="soma" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#eaf1ff" />
          <stop offset="100%" stopColor="#c9d9f7" />
        </radialGradient>
        <linearGradient id="axon" x1="0" x2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <Neuron x={0} />
      <Neuron x={360} />
      {/* signal arrow between the two neurons */}
      <g>
        <line x1={330} y1={95} x2={372} y2={95} stroke={ACCENT} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.6} />
        <polygon points="372,95 366,92 366,98" fill={ACCENT} opacity={0.7} />
      </g>
    </svg>
  );
}

function Neuron({ x }: { x: number }) {
  // Dendrite branches on the left of the soma
  const soma = { cx: x + 140, cy: 95, r: 28 };
  const dendrites: [number, number][] = [
    [x + 20, 30],
    [x + 10, 70],
    [x + 12, 120],
    [x + 22, 160],
    [x + 55, 40],
    [x + 55, 150],
  ];

  return (
    <g>
      {/* dendrites */}
      {dendrites.map(([dx, dy], i) => (
        <g key={i}>
          <path
            d={`M ${soma.cx - 20} ${soma.cy} C ${soma.cx - 60} ${soma.cy + (dy - soma.cy) * 0.3}, ${dx + 40} ${dy}, ${dx} ${dy}`}
            fill="none"
            stroke={NAVY}
            strokeOpacity={0.55}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <circle cx={dx} cy={dy} r={2.5} fill={NAVY} opacity={0.55} />
        </g>
      ))}
      {/* soma */}
      <circle
        cx={soma.cx}
        cy={soma.cy}
        r={soma.r}
        fill="url(#soma)"
        stroke={ACCENT}
        strokeWidth={1.4}
      />
      <circle cx={soma.cx - 4} cy={soma.cy - 3} r={5} fill={NAVY} opacity={0.35} />
      {/* axon */}
      <path
        d={`M ${soma.cx + soma.r - 2} ${soma.cy} C ${soma.cx + 90} ${soma.cy - 15}, ${soma.cx + 140} ${soma.cy + 10}, ${x + 320} ${soma.cy}`}
        fill="none"
        stroke="url(#axon)"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* axon terminals */}
      {[-14, 0, 14].map((dy, i) => (
        <g key={i}>
          <line
            x1={x + 315}
            y1={soma.cy}
            x2={x + 335}
            y2={soma.cy + dy}
            stroke={ACCENT}
            strokeOpacity={0.7}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <circle cx={x + 335} cy={soma.cy + dy} r={2.5} fill={ACCENT} />
        </g>
      ))}
    </g>
  );
}

/* ----------------------------- Artificial ----------------------------- */

function ArtificialNetwork() {
  // Layer definitions: [count, x-position]
  const layers: { count: number; x: number }[] = [
    { count: 3, x: 90 },   // input
    { count: 5, x: 270 },  // hidden 1
    { count: 5, x: 450 },  // hidden 2
    { count: 2, x: 630 },  // output
  ];
  const H = 260;
  const W = 720;

  // Compute node positions
  const positions = layers.map((layer) => {
    const spacing = (H - 40) / (layer.count + 1);
    return Array.from({ length: layer.count }, (_, i) => ({
      x: layer.x,
      y: 20 + spacing * (i + 1),
    }));
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" aria-hidden>
      <defs>
        <radialGradient id="nodeInput" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbe6fb" />
        </radialGradient>
        <radialGradient id="nodeHidden" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e6efff" />
          <stop offset="100%" stopColor="#005cff" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="nodeOutput" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#dfe8fb" />
          <stop offset="100%" stopColor={NAVY} />
        </radialGradient>
      </defs>

      {/* Layer background bands */}
      <rect x={40} y={10} width={100} height={H - 20} rx={12} fill={INK_SOFT} fillOpacity={0.03} />
      <rect x={200} y={10} width={340} height={H - 20} rx={12} fill={ACCENT} fillOpacity={0.05} />
      <rect x={580} y={10} width={100} height={H - 20} rx={12} fill={INK_SOFT} fillOpacity={0.03} />

      {/* Connections */}
      {positions.slice(0, -1).map((layer, li) =>
        layer.map((a, ai) =>
          positions[li + 1].map((b, bi) => (
            <line
              key={`${li}-${ai}-${bi}`}
              x1={a.x + 12}
              y1={a.y}
              x2={b.x - 12}
              y2={b.y}
              stroke={NAVY}
              strokeOpacity={0.12}
              strokeWidth={0.9}
            />
          )),
        ),
      )}

      {/* Nodes */}
      {positions.map((layer, li) =>
        layer.map((n, ni) => {
          const isInput = li === 0;
          const isOutput = li === positions.length - 1;
          const fill = isInput ? "url(#nodeInput)" : isOutput ? "url(#nodeOutput)" : "url(#nodeHidden)";
          const stroke = isOutput ? NAVY : ACCENT;
          return (
            <g key={`n-${li}-${ni}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={12}
                fill={fill}
                stroke={stroke}
                strokeOpacity={0.7}
                strokeWidth={1.3}
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}
