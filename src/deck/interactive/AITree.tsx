import { useState } from "react";

/**
 * Nested containment diagram sourced from 1.1_The_AI_Landscape.pdf p.3–4.
 * AI ⊃ ML ⊃ { Supervised, Unsupervised, Reinforcement, Deep Learning, NLP, CV, Robotics }
 * LLMs live inside Deep Learning — highlighted as "you are here".
 */

type Node = {
  id: string;
  label: string;
  kind: "ai" | "ml" | "field";
  techniques: string[];
  blurb: string;
  eyebrow?: string;
};

const AI_NODE: Node = {
  id: "ai",
  label: "Artificial Intelligence",
  kind: "ai",
  eyebrow: "Outer container",
  blurb:
    "The broadest field — any technique that lets machines perform tasks that would normally require human intelligence: reasoning, perception, decision-making, language.",
  techniques: [
    "Machine Learning",
    "Symbolic / rule-based systems",
    "Expert systems",
    "Search and planning",
    "Knowledge representation",
  ],
};

const ML_NODE: Node = {
  id: "ml",
  label: "Machine Learning",
  kind: "ml",
  eyebrow: "Inside AI",
  blurb:
    "A subset of AI in which systems learn patterns from data rather than being explicitly programmed. Every subfield below is a different way of learning from data.",
  techniques: [
    "Supervised learning",
    "Unsupervised learning",
    "Reinforcement learning",
    "Deep learning",
    "Natural language processing",
    "Computer vision",
    "Robotics",
  ],
};

const FIELDS: Node[] = [
  {
    id: "sup",
    kind: "field",
    label: "Supervised Learning",
    techniques: ["Linear / logistic regression", "Support vector machines", "Random forests", "k-nearest neighbours", "Boosting ensembles"],
    blurb: "Models trained on labelled examples — input mapped to a known output.",
  },
  {
    id: "unsup",
    kind: "field",
    label: "Unsupervised Learning",
    techniques: ["Principal component analysis", "Independent component analysis", "k-means clustering"],
    blurb: "Finds hidden structure in unlabelled data — no predefined answers.",
  },
  {
    id: "rl",
    kind: "field",
    label: "Reinforcement Learning",
    techniques: ["Policy gradients", "Q-learning", "Actor–critic methods"],
    blurb: "An agent learns by taking actions and receiving rewards over time.",
  },
  {
    id: "dl",
    kind: "field",
    label: "Deep Learning",
    techniques: ["GANs", "Autoencoders", "CNNs", "Diffusion models", "Transformers", "Large language models"],
    blurb: "Multi-layer neural networks that learn hierarchical patterns. Home of the transformer — and therefore of LLMs.",
  },
  {
    id: "nlp",
    kind: "field",
    label: "Natural Language Processing",
    techniques: ["Tokenisation", "Named entity recognition", "Machine translation", "Speech recognition"],
    blurb: "Making machines understand and produce human language.",
  },
  {
    id: "cv",
    kind: "field",
    label: "Computer Vision",
    techniques: ["Image classification", "Object detection", "Segmentation", "OCR"],
    blurb: "Interpreting images and video — recognising objects, scenes and text.",
  },
  {
    id: "rob",
    kind: "field",
    label: "Robotics",
    techniques: ["Control systems", "Motion planning", "Sensor fusion", "SLAM"],
    blurb: "Physical machines perceiving and acting in the real world.",
  },
];

const ALL: Node[] = [AI_NODE, ML_NODE, ...FIELDS];

export function AITree() {
  const [selected, setSelected] = useState<string>("dl");
  const sel = ALL.find((f) => f.id === selected)!;

  const eyebrow =
    sel.kind === "ai"
      ? "Outer container"
      : sel.kind === "ml"
      ? "Inside AI"
      : sel.id === "dl"
      ? "You are here"
      : "Sub-field";

  const techniquesLabel = sel.kind === "field" ? "Techniques" : "Contains";

  return (
    <div className="mt-6 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      {/* Diagram */}
      <div className="relative">
        {/* AI outer container */}
        <div
          className={[
            "relative rounded-2xl border p-6 pt-14 shadow-[0_1px_0_rgba(10,37,64,0.04),0_20px_60px_-30px_rgba(10,37,64,0.25)] transition-colors",
            selected === "ai"
              ? "border-[#0a2540] bg-[#eef2f7]"
              : "border-[#0a2540]/15 bg-[#f7f9fc]",
          ].join(" ")}
        >
          <RingLabel
            tone="ai"
            active={selected === "ai"}
            onClick={() => setSelected("ai")}
          >
            Artificial Intelligence
          </RingLabel>

          {/* ML container */}
          <div
            className={[
              "relative rounded-xl border p-5 pt-12 transition-colors",
              selected === "ml"
                ? "border-[#0a2540] bg-[#f4f7fb]"
                : "border-[#0a2540]/20 bg-white",
            ].join(" ")}
          >
            <RingLabel
              tone="ml"
              active={selected === "ml"}
              onClick={() => setSelected("ml")}
            >
              Machine Learning
            </RingLabel>

            {/* Grid of subfields */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FIELDS.map((f) => (
                <FieldCard
                  key={f.id}
                  field={f}
                  active={selected === f.id}
                  onClick={() => setSelected(f.id)}
                />
              ))}
            </div>

            {/* Fine-print footnote */}
            <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#0a2540]/45">
              <span className="inline-block h-px w-6 bg-[#0a2540]/25" />
              Click any ring or sub-field to inspect
            </div>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <aside className="rounded-2xl border border-[#0a2540]/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(10,37,64,0.25)]">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[#0a2540]/50">
          {eyebrow}
        </div>
        <div className="mt-2 text-2xl font-semibold text-[#0a2540] leading-tight tracking-tight">
          {sel.label}
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-[#0a2540]/75">{sel.blurb}</p>

        <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[#0a2540]/50">{techniquesLabel}</div>
        <ul className="mt-3 space-y-2">
          {sel.techniques.map((t) => {
            const isLLM = t === "Large language models";
            return (
              <li
                key={t}
                className={`flex items-start gap-3 text-[14px] leading-snug ${
                  isLLM ? "text-[#005cff] font-semibold" : "text-[#0a2540]/85"
                }`}
              >
                <span
                  className={`mt-[7px] h-1.5 w-1.5 rounded-full ${
                    isLLM ? "bg-[#005cff]" : "bg-[#0a2540]/30"
                  }`}
                />
                <span>
                  {t}
                  {isLLM && <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-[#005cff]/70">← the workshop</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

function FieldCard({ field, active, onClick }: { field: Node; active: boolean; onClick: () => void }) {
  const isDL = field.id === "dl";
  const highlight = isDL;

  return (
    <button
      onClick={onClick}
      className={[
        "group text-left rounded-lg border p-4 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#005cff]/40",
        active
          ? "border-[#0a2540] bg-[#0a2540] text-white shadow-[0_10px_30px_-15px_rgba(10,37,64,0.6)]"
          : highlight
          ? "border-[#005cff]/40 bg-gradient-to-br from-[#eef4ff] to-white hover:border-[#005cff]"
          : "border-[#0a2540]/12 bg-white hover:border-[#0a2540]/40",
      ].join(" ")}
    >
      <div
        className={`text-[10px] uppercase tracking-[0.16em] ${
          active ? "text-white/60" : highlight ? "text-[#005cff]/80" : "text-[#0a2540]/45"
        }`}
      >
        {isDL ? "Contains LLMs" : "Sub-field"}
      </div>
      <div
        className={`mt-1.5 text-[15px] font-semibold leading-tight tracking-tight ${
          active ? "text-white" : "text-[#0a2540]"
        }`}
      >
        {field.label}
      </div>

      {/* Technique chips — clipped preview */}
      <div className="mt-3 flex flex-wrap gap-1">
        {field.techniques.slice(0, 3).map((t) => {
          const isLLMChip = t === "Large language models";
          return (
            <span
              key={t}
              className={[
                "text-[10px] px-1.5 py-0.5 rounded-sm border leading-tight",
                active
                  ? "border-white/25 text-white/80"
                  : isLLMChip
                  ? "border-[#005cff]/50 text-[#005cff] bg-white"
                  : "border-[#0a2540]/15 text-[#0a2540]/70",
              ].join(" ")}
            >
              {isLLMChip ? "LLMs" : t.replace(/\s*\(.*\)/, "").split(" ").slice(0, 2).join(" ")}
            </span>
          );
        })}
        {field.techniques.length > 3 && (
          <span
            className={`text-[10px] px-1 py-0.5 leading-tight ${
              active ? "text-white/60" : "text-[#0a2540]/45"
            }`}
          >
            +{field.techniques.length - 3}
          </span>
        )}
      </div>
    </button>
  );
}

function RingLabel({
  tone,
  active,
  onClick,
  children,
}: {
  tone: "ai" | "ml";
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const isAI = tone === "ai";
  return (
    <button
      onClick={onClick}
      className={[
        "absolute left-5 top-4 flex items-center gap-3 rounded-md px-2 py-1 -mx-2 -my-1 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-[#005cff]/40",
        active ? "bg-[#0a2540] text-white" : "hover:bg-[#0a2540]/5",
      ].join(" ")}
    >
      <span
        className={`text-[10px] font-mono uppercase tracking-[0.22em] ${
          active ? "text-white/70" : isAI ? "text-[#0a2540]/45" : "text-[#0a2540]/40"
        }`}
      >
        {isAI ? "01" : "02"}
      </span>
      <span
        className={`text-[13px] font-semibold uppercase tracking-[0.22em] ${
          active ? "text-white" : isAI ? "text-[#0a2540]" : "text-[#0a2540]/85"
        }`}
      >
        {children}
      </span>
      <span className={`h-px w-16 ${active ? "bg-white/30" : "bg-[#0a2540]/15"}`} />
    </button>
  );
}
