import { useState } from "react";

type Task = {
  name: string;
  use: string;
  prompt: string;
  output: string;
  check: string;
};

type Stage = {
  name: string;
  role: string;
  purpose: string;
  color: string;
  tasks: Task[];
};

const STAGES: Stage[] = [
  {
    name: "Review",
    role: "AI as analyst",
    purpose: "Turn inbound material into an organised first view.",
    color: "#2563eb",
    tasks: [
      {
        name: "Extract & summarise",
        use: "IM, VDD, call transcript",
        prompt:
          "Identify the ten facts that matter most to this transaction. Cite the page or source for each and explain why it matters.",
        output: "Prioritised fact set",
        check: "Trace every fact to source.",
      },
      {
        name: "Classify the evidence",
        use: "Any inbound pack",
        prompt:
          "Separate confirmed facts, management claims, assumptions and unanswered questions. Do not convert claims into facts.",
        output: "Evidence map",
        check: "Classification is not verification.",
      },
      {
        name: "Focus attention",
        use: "Large or unfamiliar data room",
        prompt:
          "What deserves immediate human attention before we analyse the rest? Rank items by potential deal impact and explain the trigger.",
        output: "First-pass priorities",
        check: "Materiality remains a human judgement.",
      },
    ],
  },
  {
    name: "Structure",
    role: "AI as thought partner",
    purpose: "Turn understanding into an executable approach.",
    color: "#7c3aed",
    tasks: [
      {
        name: "Define the decision",
        use: "Pitch, IC paper, client update",
        prompt:
          "What decision must the reader make, what do they need to believe, and what evidence is required to support that belief?",
        output: "Decision-led brief",
        check: "Confirm audience and mandate.",
      },
      {
        name: "Develop the thesis",
        use: "Equity story or buyer rationale",
        prompt:
          "Propose three alternative ways to structure the core argument. For each, show supporting evidence, weaknesses and the question it leaves open.",
        output: "Competing storylines",
        check: "Choose; do not blend by default.",
      },
      {
        name: "Plan the output",
        use: "IM section or analysis pack",
        prompt:
          "Turn the agreed thesis into a page plan: decision-led headline, supporting evidence, exhibit, source and unresolved question for each page.",
        output: "Page and analysis plan",
        check: "Do not draft ahead of evidence.",
      },
    ],
  },
  {
    name: "Create",
    role: "AI as co-author",
    purpose: "Produce and improve a controlled first pass.",
    color: "#ea580c",
    tasks: [
      {
        name: "Draft the first pass",
        use: "Page, memo or analysis",
        prompt:
          "Draft this for a sceptical investment-banking audience. Distinguish sourced evidence, inference and open items; preserve every material caveat.",
        output: "Reviewable first draft",
        check: "Read every word before reuse.",
      },
      {
        name: "Generate alternatives",
        use: "Headline, structure or wording",
        prompt:
          "Give me three materially different options: factual, commercially persuasive and contrarian. Keep each supportable from the source pack.",
        output: "Deliberate choices",
        check: "Novelty cannot outrun evidence.",
      },
      {
        name: "Tighten & improve",
        use: "Near-final draft",
        prompt:
          "Reduce length by 30% without changing numbers, deleting caveats or strengthening conclusions. List every substantive edit separately.",
        output: "Tighter controlled draft",
        check: "Review the diff, not only the result.",
      },
    ],
  },
  {
    name: "Challenge",
    role: "AI as counterparty",
    purpose: "Find weaknesses before the recipient does.",
    color: "#dc2626",
    tasks: [
      {
        name: "Red-team the argument",
        use: "IM, pitch or recommendation",
        prompt:
          "Review this as a hostile buyer trying to reduce price. What would you challenge, what alternative explanation fits, and what evidence would answer it?",
        output: "Counterargument register",
        check: "A challenge is a hypothesis, not a finding.",
      },
      {
        name: "Verify support",
        use: "Any external material",
        prompt:
          "Identify every unsupported claim, number requiring tie-out, inconsistent period, missing source and conclusion stronger than its evidence.",
        output: "Release issue list",
        check: "Tie back to controlling sources.",
      },
      {
        name: "Simulate the recipient",
        use: "Before client or counterparty send",
        prompt:
          "How would a strategic buyer, PE sponsor and lender read this differently? What would each question, discount or need proven?",
        output: "Audience-specific objections",
        check: "Named reviewer still approves release.",
      },
    ],
  },
];

export function WorkCycleFramework() {
  const [stageIndex, setStageIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const stage = STAGES[stageIndex];
  const task = stage.tasks[taskIndex];

  const chooseStage = (index: number) => {
    setStageIndex(index);
    setTaskIndex(0);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 gap-3">
        {STAGES.map((item, index) => {
          const active = index === stageIndex;
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={active}
              onClick={() => chooseStage(index)}
              className="rounded-xl border p-4 text-left transition min-h-[116px]"
              style={{
                borderColor: active ? item.color : "var(--muted-line)",
                background: active ? item.color : "#fff",
                color: active ? "#fff" : "var(--ink)",
                boxShadow: active ? `0 12px 24px -18px ${item.color}` : "none",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs opacity-70">0{index + 1}</span>
                <span className="text-lg" aria-hidden="true">
                  {index < STAGES.length - 1 ? "→" : "✓"}
                </span>
              </div>
              <div className="mt-1 text-xl font-bold">{item.name}</div>
              <div className="mt-1 text-xs font-semibold opacity-80">{item.role}</div>
              <div className="mt-2 text-xs leading-snug opacity-75 hidden xl:block">
                {item.purpose}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid lg:grid-cols-[285px_1fr] gap-4">
        <div className="rounded-xl border border-[color:var(--muted-line)] bg-[color:var(--secondary)] p-3">
          <div className="slide-caption uppercase tracking-widest px-2 py-1">Choose a task</div>
          <div className="mt-1 space-y-2">
            {stage.tasks.map((item, index) => {
              const active = index === taskIndex;
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTaskIndex(index)}
                  className="w-full rounded-lg border px-3 py-3 text-left transition"
                  style={{
                    borderColor: active ? stage.color : "transparent",
                    background: active ? "#fff" : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full text-white flex items-center justify-center font-mono text-[10px] shrink-0"
                      style={{ background: stage.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                  <div className="slide-caption mt-1.5 ml-9">{item.use}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[color:var(--muted-line)] bg-white p-5 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="slide-caption uppercase tracking-widest"
                style={{ color: stage.color }}
              >
                Example prompt
              </div>
              <div className="mt-1 font-semibold">{task.name}</div>
            </div>
            <span className="slide-chip shrink-0">{task.use}</span>
          </div>
          <blockquote className="mt-3 rounded-lg bg-[color:var(--navy)] px-5 py-4 text-white font-mono text-[13px] leading-relaxed">
            “{task.prompt}”
          </blockquote>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[color:var(--secondary)] px-4 py-3">
              <div className="slide-caption uppercase tracking-widest">Expected output</div>
              <div className="mt-1 font-semibold text-sm">{task.output}</div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="slide-caption uppercase tracking-widest text-amber-800">
                Human check
              </div>
              <div className="mt-1 font-semibold text-sm text-amber-950">{task.check}</div>
            </div>
          </div>
        </div>
      </div>
      <p className="slide-caption mt-3 text-center">
        The prompt changes with the job. Accountability does not.
      </p>
    </div>
  );
}
