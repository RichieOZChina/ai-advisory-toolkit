import { useState } from "react";

type Node = { id: string; label: string; def: string; color: string; children?: Node[] };

const TREE: Node = {
  id: "ai", label: "Artificial Intelligence", color: "#0a2540",
  def: "Machines performing tasks that would need human intelligence.",
  children: [{
    id: "ml", label: "Machine Learning", color: "#0369a1",
    def: "Systems that learn patterns from data rather than being explicitly programmed.",
    children: [{
      id: "dl", label: "Deep Learning", color: "#005cff",
      def: "Multi-layered neural networks that learn complex, non-linear patterns.",
      children: [
        { id: "nlp", label: "NLP", color: "#7c3aed", def: "Text understanding and generation." },
        { id: "cv", label: "Computer Vision", color: "#059669", def: "Image and video understanding." },
        { id: "gen", label: "Generative AI", color: "#d97706", def: "Creates new content: text, code, images, audio." },
      ],
    }],
  }],
};

export function AITree() {
  const [open, setOpen] = useState<string | null>("ai");
  const [selected, setSelected] = useState<string>("ai");
  const flat = flatten(TREE);
  const sel = flat.find((n) => n.id === selected) || flat[0];

  return (
    <div className="mt-4 grid md:grid-cols-[1fr_320px] gap-8 items-start">
      <svg viewBox="0 0 720 380" className="w-full h-auto">
        {/* Root */}
        <g>
          <NodeBox x={280} y={20} w={160} node={TREE} active={selected === TREE.id} onClick={() => setSelected(TREE.id)} />
          <line x1={360} y1={70} x2={360} y2={100} stroke="#cbd5e1" />
          {/* ML */}
          <NodeBox x={280} y={100} w={160} node={TREE.children![0]} active={selected === "ml"} onClick={() => setSelected("ml")} />
          <line x1={360} y1={150} x2={360} y2={180} stroke="#cbd5e1" />
          {/* DL */}
          <NodeBox x={280} y={180} w={160} node={TREE.children![0].children![0]} active={selected === "dl"} onClick={() => setSelected("dl")} />
          {/* Branches to leaves */}
          <line x1={360} y1={230} x2={360} y2={260} stroke="#cbd5e1" />
          <line x1={140} y1={260} x2={580} y2={260} stroke="#cbd5e1" />
          {TREE.children![0].children![0].children!.map((leaf, i) => {
            const x = [80, 280, 480][i];
            return (
              <g key={leaf.id}>
                <line x1={x + 80} y1={260} x2={x + 80} y2={290} stroke="#cbd5e1" />
                <NodeBox x={x} y={290} w={160} node={leaf} active={selected === leaf.id} onClick={() => setSelected(leaf.id)} />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="slide-card">
        <div className="slide-chip" style={{ background: `${sel.color}18`, color: sel.color }}>{sel.label}</div>
        <p className="slide-body mt-4">{sel.def}</p>
        <div className="slide-caption mt-6">Click any node in the tree to reveal its definition.</div>
      </div>
    </div>
  );
}

function NodeBox({ x, y, w, node, active, onClick }: { x: number; y: number; w: number; node: Node; active: boolean; onClick: () => void }) {
  return (
    <g style={{ cursor: "pointer" }} onClick={onClick}>
      <rect x={x} y={y} width={w} height={50} rx={8} fill={active ? node.color : "#fff"} stroke={node.color} strokeWidth={active ? 0 : 1.5} />
      <text x={x + w / 2} y={y + 30} textAnchor="middle" fontSize={13} fontWeight={600} fill={active ? "#fff" : node.color}>{node.label}</text>
    </g>
  );
}

function flatten(n: Node): Node[] {
  return [n, ...(n.children || []).flatMap(flatten)];
}
