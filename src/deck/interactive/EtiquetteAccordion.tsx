import { useState } from "react";

const RULES = [
  {
    title: "Choose work by repeatability and consequence",
    summary: "Automate bounded support; keep high-consequence judgement human-owned.",
    detail:
      "Good first uses include source indices, issue logs, page plans and research capture. Valuation judgement, disclosure, buyer selection and external release retain explicit human ownership.",
  },
  {
    title: "Capture once, then reconcile",
    summary: "Transcription is an input—not the final record.",
    detail:
      "Use an approved capture method and obtain consent. Structure facts, actions and questions; assign owners and dates; then reconcile names, numbers, commitments and sensitive content before saving.",
  },
  {
    title: "Parallelise independent lanes",
    summary: "Give every lane the same brief, evidence perimeter and naming rules.",
    detail:
      "Separate source, drafting and review lanes only when they can run independently. One named integrator must reconcile outputs, conflicts, units, periods and omissions.",
  },
  {
    title: "Use a second model as a challenger",
    summary: "Agreement between models is not verification.",
    detail:
      "A challenger can find missing questions, test logic and suggest checks. Verification still returns to the controlling source, calculation or authorised reviewer.",
  },
  {
    title: "Work in copies; protect master files",
    summary: "AI may assist around models, but signed-off masters stay human-owned.",
    detail:
      "Constrain permitted cells and tabs, record differences, recalculate in Excel, rerun checks and inspect material outputs. Do not delegate final peers, forecasts, adjustments or valuation conclusions.",
  },
  {
    title: "Respect both data and action permissions",
    summary: "Being allowed to read something does not mean being allowed to act on it.",
    detail:
      "Use approved environments and honour deal, client and clean-team restrictions. No external send, master-file update, permission change, irreversible file operation or release without named approval.",
  },
  {
    title: "Read and curate everything you send",
    summary: "AI may draft the document; it may not outsource your thinking to the reader.",
    detail:
      "Before sharing, read the full output, decide what matters, remove what does not and be able to defend every conclusion. Sending unreviewed AI volume transfers the work—and the cost of making sense of it—to the recipient. That is not efficiency; it is poor professional etiquette.",
  },
];

export function EtiquetteAccordion({ start = 0, count = 4 }: { start?: number; count?: number }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-4 rounded-xl border border-[color:var(--muted-line)]">
      {RULES.slice(start, start + count).map((rule, offset) => {
        const i = start + offset;
        return (
        <div key={rule.title} className="border-b border-[color:var(--muted-line)] last:border-b-0">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-[color:var(--secondary)] transition"
          >
            <div className="w-8 h-8 rounded-full bg-[color:var(--navy)] text-white flex items-center justify-center font-mono text-xs shrink-0">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">{rule.title}</div>
              <div className="slide-caption mt-0.5">{rule.summary}</div>
            </div>
            <div className="text-[color:var(--accent)] text-lg shrink-0">
              {open === i ? "−" : "+"}
            </div>
          </button>
          {open === i && (
            <div className="px-5 pb-4 pl-[68px]">
              <p className="slide-body">{rule.detail}</p>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
}
