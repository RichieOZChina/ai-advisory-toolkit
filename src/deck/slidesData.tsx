import { type ReactNode } from "react";
import { AITree } from "./interactive/AITree";
import { ProviderGrid } from "./interactive/ProviderGrid";
import { ParameterChart } from "./interactive/ParameterChart";
import { NeuronCompare } from "./interactive/NeuronCompare";
import { TokenSplitter } from "./interactive/TokenSplitter";
import { EmbeddingSpace } from "./interactive/EmbeddingSpace";
import { RagFlow } from "./interactive/RagFlow";
import { ChunkingCompare } from "./interactive/ChunkingCompare";
import { AttentionDiagram } from "./interactive/AttentionDiagram";
import { TemperatureSlider } from "./interactive/TemperatureSlider";
import { AgentLoop } from "./interactive/AgentLoop";
import { PrivacyTiers } from "./interactive/PrivacyTiers";
import { WorkflowTimeline } from "./interactive/WorkflowTimeline";
import { StampAccordion } from "./interactive/StampAccordion";
import { StampExercise } from "./interactive/StampExercise";
import { TextPredictor } from "./interactive/TextPredictor";
import { SurveyBar } from "./interactive/SurveyBar";
import { RatioBar } from "./interactive/RatioBar";
import { OpenClosedAccordion } from "./interactive/OpenClosedAccordion";
import * as L from "./layouts";

export type Section = {
  id: string;
  title: string;
  startSlide: number;
  color: string;
};

export type Slide = {
  id: number;
  section: number; // section index
  title: string;
  kicker?: string;
  notes?: string;
  render: () => ReactNode;
};

export const SECTIONS: Section[] = [
  { id: "opening", title: "Opening", startSlide: 1, color: "#94a3b8" },
  { id: "how-ai-works", title: "How Modern AI Works", startSlide: 6, color: "#60a5fa" },
  { id: "how-to-prompt", title: "How to Write a Prompt", startSlide: 26, color: "#a78bfa" },
  { id: "banker-moves", title: "Five Banker Moves", startSlide: 35, color: "#fb923c" },
  { id: "stamp", title: "STAMP Guardrails", startSlide: 45, color: "#f43f5e" },
  { id: "morning-close", title: "Morning Close", startSlide: 48, color: "#22c55e" },
  { id: "afternoon", title: "Afternoon Build Labs", startSlide: 52, color: "#0ea5e9" },
];

function sectionOf(id: number): number {
  let idx = 0;
  for (let i = 0; i < SECTIONS.length; i++) {
    if (id >= SECTIONS[i].startSlide) idx = i;
  }
  return idx;
}

// Helper: build a slide entry
const s = (id: number, title: string, render: () => ReactNode, opts: { kicker?: string; notes?: string } = {}): Slide => ({
  id, section: sectionOf(id), title, render, ...opts,
});

export const SLIDES: Slide[] = [
  // ===== SECTION 1: OPENING =====
  s(1, "AI for the M&A Team", () => (
    <L.Title
      kicker="Tenet Advisory × Sentia Partners"
      title={<>AI for the <span style={{color:"var(--accent)"}}>M&amp;A Team</span>.</>}
      subtitle="Three things you will do really well by the end of today."
      footer="Full-day workshop · Morning theory · Afternoon build labs"
    />
  ), { notes: "Set the room: this is not a lecture. Three concrete outcomes." }),

  s(2, "The ratio we are trying to change", () => (
    <L.Body kicker="The problem" title="The ratio we are trying to change">
      <RatioBar />
      <p className="slide-body mt-8 max-w-3xl">Most of your M&amp;A week goes into <b>assembling</b> materials — pulling data, formatting decks, chasing sources. Only a sliver goes into <b>the decision itself</b>. Today is about <span className="text-[color:var(--accent)] font-semibold">flipping that ratio</span>.</p>
      <p className="slide-caption mt-4">We'll validate the actual split with the pre-workshop survey.</p>
    </L.Body>
  )),

  s(3, "What you will leave with", () => (
    <L.Body kicker="Outcomes" title="What you will leave with">
      <div className="grid md:grid-cols-3 gap-5 mt-2">
        {[
          ["01","One practical environment","You can use this week — configured, tested, yours."],
          ["02","One method for writing prompts","A structure that works repeatedly, not luck."],
          ["03","One guardrail","That stops bad outputs reaching clients."],
        ].map(([n,t,d]) => (
          <div key={n} className="slide-card">
            <div className="text-[color:var(--accent)] font-mono text-sm">{n}</div>
            <div className="mt-3 text-xl font-semibold">{t}</div>
            <p className="slide-body mt-2">{d}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(4, "Housekeeping", () => (
    <L.Body kicker="Housekeeping" title="A few practicalities">
      <div className="grid md:grid-cols-2 gap-4 mt-4 max-w-4xl">
        {[
          ["Breaks","10:45 and 3:15 · 15 minutes each"],
          ["Lunch","12:30 · downstairs"],
          ["Wifi","Tenet-Guest · password on your table card"],
          ["Glossary","Bookmarked in your workshop pack"],
          ["Ask anytime","Interruptions welcome — this is your day"],
          ["Recording","Off, by default. Say if you'd like a clip"],
        ].map(([k,v]) => (
          <div key={k} className="flex items-baseline gap-6 py-3 border-b border-[color:var(--muted-line)]">
            <div className="w-28 slide-caption uppercase tracking-wider">{k}</div>
            <div className="slide-body">{v}</div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(5, "What you told us", () => (
    <L.Body kicker="Pre-workshop survey" title="What you told us">
      <SurveyBar />
      <p className="slide-caption mt-6">Placeholder chart — will be replaced after the pre-workshop survey completes.</p>
    </L.Body>
  )),

  // ===== SECTION 2: HOW MODERN AI WORKS =====
  s(6, "What is a Large Language Model?", () => (
    <L.Body kicker="Section 2" title="What is a Large Language Model?">
      <div className="mt-2 max-w-4xl space-y-3">
        <p className="slide-body">An LLM is a computer program that has read most of the internet and learned the patterns of how humans use language.</p>
        <p className="slide-body">When you type something, it predicts — one piece at a time — what a helpful response looks like.</p>
        <p className="slide-body">It doesn't <i>know</i> things the way you do. It recognises patterns extremely well.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="slide-card">
          <div className="slide-chip">Scale</div>
          <p className="slide-body mt-3">Billions of parameters, trained on trillions of words scraped from across the internet. Parameter counts have exploded — from millions a few years ago to well over a trillion today.</p>
          <div className="mt-4"><ParameterChart /></div>
        </div>
        <div className="slide-card">
          <div className="slide-chip">Emergent properties</div>
          <p className="slide-body mt-3">Capabilities that arise from training rather than being explicitly programmed. Like a chef who has memorised 1,000 recipes and can now improvise a meal from ingredients they've never seen combined before.</p>
        </div>
      </div>
      <div className="mt-8 slide-card-dark max-w-4xl">
        <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>One way to picture it</div>
        <p className="slide-body mt-3 text-white/90">A very sophisticated next-word predictor. Everything else is engineering to make the prediction better, faster, and safer.</p>
        <div className="mt-4"><TextPredictor /></div>
      </div>
    </L.Body>
  )),



  s(7, "The AI family tree", () => (
    <L.Body kicker="Slide 7" title="The AI family tree">
      <AITree />
    </L.Body>
  )),

  s(8, "Four ways machines learn", () => (
    <L.Body kicker="Slide 8" title="Four ways machines learn">
      <div className="grid md:grid-cols-2 gap-5 mt-2">
        {[
          {t:"Supervised Learning",d:"Labelled data. The model learns patterns from input-output examples.",e:"Credit scoring: past applications labelled 'default / no default'."},
          {t:"Unsupervised Learning",d:"Unlabelled data. The model finds hidden structure and clusters.",e:"Segmenting a buyer universe by acquisition behaviour, unprompted."},
          {t:"Reinforcement Learning",d:"Trial and error, guided by reward signals over time.",e:"Optimising trade execution against a benchmark P&L."},
          {t:"Deep Learning",d:"Many-layered neural networks that learn complex, non-linear patterns.",e:"Extracting numbers and clauses from a scanned SPA."},
        ].map((c) => (
          <div key={c.t} className="slide-card">
            <div className="text-lg font-semibold">{c.t}</div>
            <p className="slide-body mt-2">{c.d}</p>
            <div className="mt-4 pt-4 border-t border-[color:var(--muted-line)]">
              <div className="slide-caption uppercase tracking-wider">Banking example</div>
              <p className="slide-body mt-1">{c.e}</p>
            </div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(9, "Three places this shows up", () => (
    <L.Body kicker="Slide 9" title="Three places this shows up">
      <div className="grid md:grid-cols-3 gap-5 mt-2">
        {[
          {t:"Computer Vision",i:"eye",d:"Image and video understanding.",in:"Scanned annual report page",out:"Extracted tables + text"},
          {t:"Natural Language Processing",i:"speech",d:"Text understanding and generation.",in:"500-page vendor DD report",out:"5-page issue summary"},
          {t:"Generative AI",i:"sparkle",d:"Creates new content: text, code, images, audio.",in:"Bullet points + deal facts",out:"First-draft company overview"},
        ].map((c) => (
          <div key={c.t} className="slide-card">
            <div className="text-[color:var(--accent)] slide-caption uppercase tracking-widest">{c.i}</div>
            <div className="mt-2 text-lg font-semibold">{c.t}</div>
            <p className="slide-body mt-2">{c.d}</p>
            <div className="mt-4 space-y-2">
              <div><span className="slide-caption uppercase">Input</span><div className="slide-body">{c.in}</div></div>
              <div><span className="slide-caption uppercase">Output</span><div className="slide-body">{c.out}</div></div>
            </div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(10, "Closed vs open — and who's who", () => (
    <L.Body kicker="Slide 10" title="Closed vs open — and who's who">
      <OpenClosedAccordion />
    </L.Body>
  )),

  s(11, "Neural networks", () => (
    <L.Body kicker="Slide 10" title="Neural networks">
      <p className="slide-body max-w-3xl mt-2">
        Why are we suddenly talking about neural networks? Because <b>every modern LLM is one</b>.
        When ChatGPT writes a paragraph, what's running under the hood is a very large neural network
        making one prediction after another. To understand how an LLM behaves — why it's confident,
        why it hallucinates, why bigger models are smarter — you have to understand the machine underneath.
      </p>
      <p className="slide-body max-w-3xl mt-4">
        A neural network is a stack of simple units — <b>artificial neurons</b> — loosely inspired by the brain.
        Each neuron takes some inputs, multiplies them by learned weights, adds them up, and passes the result on.
        Stack millions of these together in layers, train them on huge amounts of text, and patterns emerge:
        grammar, facts, reasoning, style. Nobody programs those rules in — the network learns them from data.
      </p>
      <NeuronCompare />
      <p className="slide-caption mt-6 max-w-3xl">
        Biological neurons inspired the design; artificial neurons are the math. An LLM is billions of the
        right-hand kind, wired into layers.
      </p>
    </L.Body>
  )),

  s(12, "Tokens — the pieces models read", () => (
    <L.Body kicker="Slide 14" title="Tokens — the pieces models read">
      <TokenSplitter />
    </L.Body>
  )),

  s(13, "Embeddings & semantic meaning", () => (
    <L.Body kicker="Slide 13" title="Embeddings — giving tokens meaning">
      <EmbeddingSpace />
    </L.Body>
  )),

  s(14, "Vector databases & RAG", () => (
    <L.Body kicker="Slide 14" title="Vector databases & RAG — giving the model your files">
      <RagFlow />
    </L.Body>
  )),

  s(15, "Chunking", () => (
    <L.Body kicker="Slide 15" title="Chunking — how documents get sliced for retrieval">
      <ChunkingCompare />
    </L.Body>
  )),

  s(16, "Transformers & attention", () => (
    <L.Body kicker="Slide 16" title="Transformers &amp; attention — why order and context matter">
      <div className="mt-4 grid md:grid-cols-[1.15fr_1fr] gap-5">
        <div className="slide-card">
          <div className="slide-chip">Why we need attention</div>
          <p className="slide-body mt-3">
            Before Transformers, models read words <b>one at a time, left to right</b>. By the time they reached
            the end of a long sentence, the beginning had faded. Pronouns like "it" lost their referent. Long-range
            dependencies broke.
          </p>
          <p className="slide-body mt-3">
            In 2017 the <b>Transformer</b> architecture fixed this with one idea: <b>self-attention</b>. Every word
            looks at every other word simultaneously and decides which ones matter most for its meaning. That
            parallel reading is what unlocked modern LLMs — it's the <b>T</b> in G<b>P</b><b>T</b>.
          </p>
        </div>
        <div className="slide-card-dark">
          <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>The intuition</div>
          <p className="slide-body mt-3 text-slate-200">
            Reading <i>"The vendor flagged three risks to EBITDA"</i>, the word <b>"risks"</b> only makes sense in
            context of <b>"flagged"</b> and <b>"EBITDA"</b>. Attention is how the model learns which words to lean on.
          </p>
          <p className="slide-body mt-3 text-slate-300">
            Modern models run this in <b>parallel across dozens of layers</b> with many "attention heads" — each head
            learns a different kind of relationship (grammar, coreference, tone, etc.).
          </p>
        </div>
      </div>
      <AttentionDiagram />
    </L.Body>
  )),

  s(17, "Temperature & model choice", () => (
    <L.Body kicker="Slide 17" title="Temperature &amp; model choice — the two dials that matter">
      <TemperatureSlider />
    </L.Body>
  )),



  s(18, "LLM strengths & weaknesses", () => (
    <L.Body kicker="Slide 20" title="LLM strengths &amp; weaknesses">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card border-l-4" style={{borderLeftColor:"var(--good)"}}>
          <div className="text-[color:var(--good)] font-semibold uppercase tracking-widest text-xs">Strengths</div>
          <ul className="mt-4 space-y-2 slide-body">
            <li>• Speed — draft in seconds</li>
            <li>• Scale — parallel across hundreds of documents</li>
            <li>• Pattern recognition across unstructured text</li>
            <li>• 24/7 availability, no fatigue</li>
            <li>• Handles messy inputs — PDFs, transcripts, emails</li>
          </ul>
        </div>
        <div className="slide-card border-l-4" style={{borderLeftColor:"var(--warn)"}}>
          <div className="text-[color:var(--warn)] font-semibold uppercase tracking-widest text-xs">Weaknesses</div>
          <ul className="mt-4 space-y-2 slide-body">
            <li>• Hallucination — invents plausible-sounding facts</li>
            <li>• No real understanding — pattern-matching, not reasoning</li>
            <li>• Context limits — forgets earlier parts of long inputs</li>
            <li>• Inconsistent — same prompt, different answers</li>
            <li>• Cannot verify its own work</li>
          </ul>
        </div>
      </div>
    </L.Body>
  )),

  s(19, "AI agents, tools & OpenClaw", () => (
    <L.Body kicker="Slide 21" title="AI agents, tools & the loop">
      <AgentLoop />
    </L.Body>
  )),

  s(21, "Claude Code — your afternoon workbench", () => (
    <L.Body kicker="Slide 22" title="Claude Code — your afternoon workbench">
      <div className="grid md:grid-cols-2 gap-6 mt-4 items-center">
        <div className="slide-card-dark font-mono text-[13px]" style={{padding:"22px 24px"}}>
          <div className="text-emerald-300">➜ ~/tenet/deal-folder</div>
          <div className="mt-3"><span className="text-slate-400">$</span> claude</div>
          <div className="mt-2 text-slate-300">Welcome to Claude Code. What are we building?</div>
          <div className="mt-3"><span className="text-slate-400">&gt;</span> Extract every EBITDA adjustment from vdd_v3.pdf and output as a markdown table with page refs</div>
          <div className="mt-3 text-slate-300">Reading vdd_v3.pdf (247 pages)...</div>
          <div className="text-slate-300">Found 14 adjustments. Drafting table.</div>
          <div className="mt-3 text-emerald-300">✓ Wrote issues.md · 14 rows, 12 cited pages</div>
        </div>
        <div>
          <p className="slide-body">Claude Code reads files, writes scripts, runs commands, and iterates with your approval. It's a terminal, not a chatbot.</p>
          <p className="slide-body mt-4"><b>This is what we'll use in the afternoon labs.</b></p>
        </div>
      </div>
    </L.Body>
  )),

  s(22, "LLM privacy", () => (
    <L.Body kicker="Slide 23" title="LLM privacy — three tiers">
      <PrivacyTiers />
    </L.Body>
  )),

  s(23, "Why this matters to bankers now", () => (
    <L.Body kicker="Market signal" title="Why this matters to bankers now">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          {n:"60%",t:"faster IM production",d:"AI-native boutiques ship information memoranda 60% faster than traditional shops.",src:"Industry survey, Q2 2026"},
          {n:"3 hrs",t:"vs 3 days",d:"Buy-side screens that took three days now complete in three hours.",src:"Sentia client benchmark"},
          {n:"Judgement",t:"is the new bottleneck",d:"Production speed is no longer the constraint. Human judgement is.",src:"Sentia analysis"},
        ].map((c) => (
          <div key={c.n} className="slide-card">
            <div className="text-4xl font-bold text-[color:var(--accent)]">{c.n}</div>
            <div className="mt-1 text-lg font-semibold">{c.t}</div>
            <p className="slide-body mt-3">{c.d}</p>
            <div className="slide-caption mt-4 pt-3 border-t border-[color:var(--muted-line)]">{c.src}</div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(24, "The old workflow vs the new workflow", () => (
    <L.Body kicker="Before / after" title="The old workflow vs the new workflow">
      <WorkflowTimeline />
    </L.Body>
  )),

  s(25, "The three things that affect every real task", () => (
    <L.Body kicker="Bridge to practice" title="The three things that affect every real task">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["Model choice","What brain you're using. Frontier vs cheap-and-fast. Reasoning vs speed."],
          ["Prompt quality","What instruction you give it. Vague in = vague out."],
          ["Guardrails","What safety net catches errors before they leave the building."],
        ].map(([t,d]) => (
          <div key={t} className="slide-card">
            <div className="text-lg font-semibold">{t}</div>
            <p className="slide-body mt-2">{d}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(26, "What this session will not teach you", () => (
    <L.Body kicker="Expectations" title="What this session will not teach you">
      <ul className="mt-4 space-y-3 max-w-2xl slide-body">
        {[
          "Prompt engineering as a career",
          "How to build your own LLM",
          "Which AI vendor to bet the firm on",
          "Magic",
        ].map((x) => (
          <li key={x} className="flex items-baseline gap-3">
            <span className="text-slate-400 line-through decoration-slate-400/60">{x}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 slide-card-dark max-w-2xl">
        <div className="slide-chip" style={{background:"rgba(0,92,255,0.2)",color:"#7ab0ff"}}>What we will teach you</div>
        <p className="mt-3 text-lg">Practical skills you can use Monday morning.</p>
      </div>
    </L.Body>
  )),

  // ===== SECTION 3: HOW TO WRITE A PROMPT =====
  s(27, "Module 3 — How to write a prompt", () => (
    <L.Section number="03" title="How to write a prompt" subtitle="A repeatable six-part structure. The single most-used skill of the day." />
  )),

  s(28, "The lazy brief vs the structured brief", () => (
    <L.Body kicker="Slide 29" title="The lazy brief vs the structured brief">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="rounded-xl border border-[color:var(--muted-line)] p-6 bg-[color:var(--secondary)] opacity-90">
          <div className="flex items-center gap-2 text-red-600 font-semibold"><span>✗</span> Lazy brief</div>
          <div className="mt-4 font-mono text-sm text-slate-600">"Analyse this company."</div>
          <p className="slide-caption mt-6">Nine words. Zero structure. You will get generic consulting-speak back.</p>
        </div>
        <div className="rounded-xl border-2 p-6" style={{borderColor:"var(--accent)"}}>
          <div className="flex items-center gap-2 text-[color:var(--accent)] font-semibold"><span>✓</span> Structured brief</div>
          <div className="mt-4 space-y-2 font-mono text-[12px] leading-relaxed">
            <div><span className="slide-chip">Role</span> You are an M&amp;A Director…</div>
            <div><span className="slide-chip">Task</span> Identify the top 5 risks to EBITDA…</div>
            <div><span className="slide-chip">Specifics</span> Output as a table with columns…</div>
            <div><span className="slide-chip">Context</span> Client is a PE fund evaluating…</div>
            <div><span className="slide-chip">Examples</span> Here are two prior outputs…</div>
            <div><span className="slide-chip">Notes</span> Cite page numbers for every claim.</div>
          </div>
        </div>
      </div>
    </L.Body>
  )),

  s(29, "Role", () => (
    <L.Prompt step="1" label="Role" title="Tell the AI who to be.">
      <p className="slide-body">A clear, advantageous role primes the model to draw on the right patterns.</p>
      <div className="mt-6 slide-card-dark font-mono text-sm">
        "You are an M&amp;A Director reviewing a vendor DD report for a private equity client. You have 15 years of experience in Australian mid-market food &amp; beverage."
      </div>
    </L.Prompt>
  )),

  s(30, "Task", () => (
    <L.Prompt step="2" label="Task" title="Tell it exactly what to produce.">
      <p className="slide-body">Start with an action verb. Specify the output shape.</p>
      <div className="mt-6 slide-card-dark font-mono text-sm">
        "Identify the top 5 risks to EBITDA sustainability, with page references to the source document. Output as a markdown table with columns: Risk, Page Ref, Severity (High/Med/Low), Rationale."
      </div>
    </L.Prompt>
  )),

  s(31, "Specifics & context", () => (
    <L.Prompt step="3–4" label="Specifics & Context" title="Ground it in your world.">
      <p className="slide-body">Formats, audience, word limits, exclusions, tone.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="slide-card">
          <div className="slide-caption uppercase tracking-widest">Specifics</div>
          <ul className="mt-3 slide-body space-y-1">
            <li>• A$ millions unless stated</li>
            <li>• Max 200 words per rationale</li>
            <li>• Exclude anything about ESG</li>
          </ul>
        </div>
        <div className="slide-card">
          <div className="slide-caption uppercase tracking-widest">Context</div>
          <ul className="mt-3 slide-body space-y-1">
            <li>• Client: mid-market PE, ticket size $50–150m</li>
            <li>• Deal is competitive, seven-bidder process</li>
            <li>• Second-round IC memo</li>
          </ul>
        </div>
      </div>
    </L.Prompt>
  )),

  s(32, "Examples & notes", () => (
    <L.Prompt step="5–6" label="Examples & Notes" title="Show it what good looks like.">
      <p className="slide-body">Two or three worked input-output pairs beat any amount of description.</p>
      <div className="mt-6 slide-card-dark font-mono text-xs whitespace-pre-wrap">
{`# Examples

## Example 1
Q: [snippet of vendor DD, pages 24–28 on customer concentration]
A: | Risk | Page | Severity | Rationale |
   | Top-3 customer concentration 61% | 24 | High | Loss of #1 customer removes ~$8m EBITDA…

# Notes
- Cite page numbers for every claim.
- If a figure isn't in the source, say "not stated" rather than estimate.`}
      </div>
    </L.Prompt>
  )),

  s(33, "The assembled prompt & three takeaways", () => (
    <L.Body kicker="Slide 34" title="The assembled prompt">
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        {[
          ["Role","You are an M&A Director…"],
          ["Task","Identify top 5 risks to EBITDA…"],
          ["Specifics","Markdown table · A$m · <200 words each"],
          ["Context","PE fund, 2nd-round IC, seven-bidder"],
          ["Examples","Two worked snippets above"],
          ["Notes","Cite pages · say 'not stated' rather than estimate"],
        ].map(([k,v]) => (
          <div key={k} className="slide-card">
            <div className="slide-chip">{k}</div>
            <p className="slide-body mt-3">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          ["Role + Task", "is the minimum viable prompt."],
          ["Examples", "beat explanations every time."],
          ["Notes", "prevent the AI from drifting off-script."],
        ].map(([a,b],i) => (
          <div key={a} className="slide-card">
            <div className="text-[color:var(--accent)] text-xs font-mono">0{i+1}</div>
            <div className="mt-2 slide-body"><b>{a}</b> {b}</div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(34, "Paul's Claude Code tips", () => (
    <L.Body kicker="Working tips" title="Paul's Claude Code tips">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["/compact","Summarise the conversation so far, freeing up the context window without losing the thread."],
          ["/commit","Save your session progress with a commit message. Cheap insurance against a bad next step."],
          ["Escape","Cancel any in-progress action immediately. Use it more than you think you should."],
        ].map(([k,d]) => (
          <div key={k} className="slide-card-dark">
            <div className="font-mono text-[color:var(--accent-soft)]">{k}</div>
            <p className="mt-3 text-sm text-slate-200">{d}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(35, "Common failure modes", () => (
    <L.Body kicker="Watch out" title="Common failure modes">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {["Too vague — the AI guesses what you want, and guesses wrong.",
          "Too much in one prompt — it skips steps or ignores constraints.",
          "No examples — it defaults to generic consulting-speak."].map((t,i) => (
          <div key={i} className="slide-card border-l-4" style={{borderLeftColor:"var(--warn)"}}>
            <div className="text-[color:var(--warn)] font-semibold uppercase tracking-widest text-xs">Failure {i+1}</div>
            <p className="slide-body mt-3">{t}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  // ===== SECTION 4: FIVE BANKER MOVES =====
  s(36, "Five things you can do with AI by Monday", () => (
    <L.Section number="04" title="Five things you can do with AI by Monday" subtitle="The moves that survive contact with a real deal week.">
      <div className="mt-10 grid grid-cols-5 gap-3 max-w-3xl">
        {["Draft","Research","Actions","Compare","Dictate"].map((t,i) => (
          <div key={t} className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-[color:var(--accent)] text-white flex items-center justify-center font-semibold">{i+1}</div>
            <div className="mt-2 text-xs text-slate-300 uppercase tracking-widest">{t}</div>
          </div>
        ))}
      </div>
    </L.Section>
  )),

  s(37, "Move 1 — First draft in two minutes", () => (
    <L.Move n={1} title="First draft in two minutes"
      flow={["Blank page","Paste context","Write prompt","Editable draft"]}
      example={`Draft a one-page company overview from these bullet points. Include: business description, ownership, key financials (table), and 3 strategic questions for management.`}
    />
  )),
  s(38, "Move 2 — Research without the forty tabs", () => (
    <L.Move n={2} title="Research without the forty tabs"
      flow={["Question","One prompt","Cited answer"]}
      example={`What are the 3 largest M&A deals in Australian food manufacturing since 2023? For each: buyer, target, reported value, and strategic rationale. Cite your sources.`}
    />
  )),
  s(39, "Move 3 — Meeting to action list", () => (
    <L.Move n={3} title="Meeting to action list"
      flow={["Transcript","→","Action table"]}
      example={`Paste meeting notes. Output a table: Action, Owner, Deadline, Priority (P1/P2/P3), Dependencies.`}
    />
  )),
  s(40, "Move 4 — Compare before you sign", () => (
    <L.Move n={4} title="Compare before you sign"
      flow={["Draft SPA","Execution SPA","Diff table"]}
      example={`Compare these two versions of the SPA. Highlight: changed clauses, new provisions, deleted sections, modified numbers. Table format.`}
    />
  )),
  s(41, "Move 5 — Draft while you talk", () => (
    <L.Move n={5} title="Draft while you talk"
      flow={["Voice","Transcript","Formatted email"]}
      example={`Dictate a client update after this call. Output a formatted email: key points, agreed next steps, outstanding items, proposed follow-up date.`}
    />
  )),

  s(42, "Putting the moves together", () => (
    <L.Body kicker="A day on the desk" title="Putting the moves together">
      <div className="mt-6 relative">
        <div className="absolute left-0 right-0 top-8 h-px bg-[color:var(--muted-line)]" />
        <div className="grid grid-cols-6 gap-2 relative">
          {[
            ["8am","Move 2","Research the target"],
            ["10am","—","Client call"],
            ["11am","Move 3","Notes → actions"],
            ["2pm","Move 1","Draft company overview"],
            ["4pm","Move 4","Compare term sheets"],
            ["5pm","Move 5","Dictate client update"],
          ].map(([time,move,label]) => (
            <div key={time} className="text-center">
              <div className="slide-caption uppercase">{time}</div>
              <div className="mx-auto mt-1 w-4 h-4 rounded-full bg-[color:var(--accent)] border-4 border-white" />
              <div className="mt-3 font-semibold text-sm">{move}</div>
              <div className="slide-caption mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </L.Body>
  )),

  s(43, "The rule underneath the rules", () => (
    <L.Center>
      <div className="text-center">
        <div className="slide-title-lg">AI drafts. <span style={{color:"var(--accent)"}}>You decide.</span></div>
        <div className="slide-subtitle mt-6">Speed without judgement is just faster mistakes.</div>
      </div>
    </L.Center>
  )),

  s(44, "Do not use AI for these three things", () => (
    <L.Body kicker="Hard lines" title="Do not use AI for these three things">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["Confidential client data","without explicit permission and a business-grade API."],
          ["Final sign-off","without thorough human review and verification."],
          ["Anything you can't explain","if you can't walk through the reasoning, don't send it."],
        ].map(([t,d]) => (
          <div key={t} className="slide-card border-l-4" style={{borderLeftColor:"#dc2626"}}>
            <div className="text-red-600 font-semibold text-xl">✗</div>
            <div className="mt-2 font-semibold">{t}</div>
            <p className="slide-body mt-2">{d}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  // ===== SECTION 5: STAMP =====
  s(45, "STAMP — five checks before anything leaves the building", () => (
    <L.Body kicker="Slide 46 · Guardrails" title="STAMP — five checks before anything leaves the building">
      <StampAccordion />
    </L.Body>
  )),

  s(46, "Don't ship slop", () => (
    <L.Center>
      <div className="max-w-4xl text-center">
        <div className="text-[clamp(28px,3.6vw,52px)] leading-tight font-semibold" style={{letterSpacing:"-0.02em"}}>
          "AI content is very cheap to create and <span style={{color:"var(--accent)"}}>incredibly expensive</span> to consume."
        </div>
        <div className="slide-caption mt-6 uppercase tracking-widest">— Lewis, Sentia Partners</div>
        <div className="mt-16 slide-subtitle">At a bare minimum, don't make your stuff look like AI.</div>
      </div>
    </L.Center>
  )),

  s(47, "Live exercise — apply STAMP", () => (
    <L.Body kicker="Slide 48 · Interactive" title="Live exercise — apply STAMP">
      <StampExercise />
    </L.Body>
  )),

  // ===== SECTION 6: MORNING CLOSE =====
  s(48, "This morning in one slide", () => (
    <L.Body kicker="Recap" title="This morning in one slide">
      <div className="mt-8 flex flex-wrap items-center gap-4 justify-center">
        {["How AI Works","How to Prompt","Five Moves","STAMP"].map((t,i,a) => (
          <div key={t} className="flex items-center gap-4">
            <div className="slide-card px-6 py-4 font-semibold">{t}</div>
            {i < a.length-1 && <div className="text-[color:var(--accent)] text-2xl">→</div>}
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(49, "What changes this afternoon", () => (
    <L.Center>
      <div className="max-w-4xl text-center">
        <div className="slide-title-lg">Morning was the <span style={{color:"var(--accent)"}}>operating system</span>.</div>
        <div className="slide-title-lg mt-2">Afternoon we install the <span style={{color:"var(--accent)"}}>apps</span>.</div>
        <div className="mt-12 flex gap-10 justify-center slide-caption uppercase tracking-widest">
          <span>🔧 Reusable tool</span>
          <span>📄 Client materials</span>
          <span>🔍 Research</span>
        </div>
      </div>
    </L.Center>
  )),

  s(50, "One thing you will try this week", () => (
    <L.Body kicker="Reflection" title="One thing you will try this week">
      <div className="mt-8 max-w-3xl">
        <p className="slide-subtitle">Write down one move you'll use before Friday.</p>
        <div className="mt-8 h-40 rounded-xl border-2 border-dashed border-[color:var(--muted-line)] flex items-center justify-center slide-caption uppercase">
          space for your note
        </div>
      </div>
    </L.Body>
  )),

  s(51, "Morning end", () => (
    <L.Center>
      <div className="text-center">
        <div className="slide-title-lg">See you after lunch.</div>
        <div className="slide-subtitle mt-4">1:15pm.</div>
      </div>
    </L.Center>
  )),

  // ===== SECTION 7: AFTERNOON =====
  s(52, "Installing the apps", () => (
    <L.Section number="05" title="Installing the apps" subtitle="From concepts to workflows you can actually run.">
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-3xl text-slate-300">
        <div><div className="text-xs uppercase tracking-widest text-slate-400">Lab 1</div><div className="mt-1 font-semibold">Reusable Skill</div></div>
        <div><div className="text-xs uppercase tracking-widest text-slate-400">Lab 2</div><div className="mt-1 font-semibold">Client Materials</div></div>
        <div><div className="text-xs uppercase tracking-widest text-slate-400">Lab 3</div><div className="mt-1 font-semibold">Research & Screening</div></div>
      </div>
    </L.Section>
  )),

  s(53, "The strongest starter asset", () => (
    <L.Body kicker="Lab 1 · Setup" title="Turn diligence notes into a structured issue log">
      <p className="slide-subtitle mt-4 max-w-3xl">Every M&amp;A analyst already has the raw material. The AI turns unstructured notes into a reusable, queryable asset.</p>
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-4xl text-center">
        {["Unstructured DD notes","→","Structured issue log with page refs, severity, and owner"].map((t,i) => (
          <div key={i} className={i===1 ? "text-3xl text-[color:var(--accent)]" : "slide-card"}>{t}</div>
        ))}
      </div>
    </L.Body>
  )),

  s(54, "Project source pack", () => (
    <L.Body kicker="Shared evidence base" title="Project source pack — one source pack, one truth">
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <p className="slide-body">A single source pack every team member works from. Ensures consistent outputs across the room and across the week.</p>
          <ul className="mt-4 slide-body space-y-2">
            <li>· IM (redacted)</li>
            <li>· Vendor DD summary</li>
            <li>· Management accounts (FY24–FY26)</li>
            <li>· 3-year plan</li>
            <li>· Data-room index</li>
          </ul>
        </div>
        <div className="slide-card-dark">
          <div className="slide-caption text-slate-400 uppercase tracking-widest">Rule</div>
          <div className="mt-2 text-lg">If a fact isn't in the source pack, it doesn't go in your output.</div>
        </div>
      </div>
    </L.Body>
  )),

  s(55, "Turn a manual instruction into a controlled workflow", () => (
    <L.Body kicker="Lab 1 · Exercise" title="Turn a manual instruction into a controlled workflow">
      <ol className="mt-6 grid md:grid-cols-5 gap-3">
        {["Write the instruction","Test on sample data","Review output","Refine the instruction","Save as reusable asset"].map((t,i) => (
          <li key={t} className="slide-card">
            <div className="text-[color:var(--accent)] font-mono">0{i+1}</div>
            <div className="mt-2 font-semibold">{t}</div>
          </li>
        ))}
      </ol>
    </L.Body>
  )),

  s(56, "Test on a clean case and a difficult case", () => (
    <L.Body kicker="Lab 1 · Testing" title="Test on a clean case and a difficult case">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card">
          <div className="slide-chip">Clean case</div>
          <div className="mt-3 font-semibold">Straightforward data</div>
          <p className="slide-body mt-2">Standard DD note, all fields present, no ambiguity. The workflow should nail this every time.</p>
        </div>
        <div className="slide-card">
          <div className="slide-chip" style={{background:"#fef3c7",color:"#92400e"}}>Difficult case</div>
          <div className="mt-3 font-semibold">Edge cases</div>
          <p className="slide-body mt-2">Missing fields, ambiguous inputs, conflicting notes. The workflow should either handle it or clearly flag what it can't.</p>
        </div>
      </div>
    </L.Body>
  )),

  s(57, "Peer review — controls before elegance", () => (
    <L.Body kicker="Lab 1 · Review" title="Peer review should target controls before elegance">
      <ul className="mt-6 space-y-3 slide-body max-w-3xl">
        {[
          "Does it produce consistent output on the same input?",
          "Does it fail gracefully when a field is missing?",
          "Are the instructions clear enough for someone else to run?",
          "Does it flag uncertainty instead of hiding it?",
        ].map((t) => (
          <li key={t} className="flex items-baseline gap-3"><span className="text-[color:var(--accent)]">✓</span>{t}</li>
        ))}
      </ul>
    </L.Body>
  )),

  s(58, "Save the asset together", () => (
    <L.Body kicker="Lab 1 · Packaging" title="Save the instruction, sample output, and known limits together">
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {[
          ["Instruction prompt","The full role/task/notes"],
          ["Example output","One clean, one difficult"],
          ["Known failure modes","What it can't do yet"],
          ["Last updated","Date + owner"],
        ].map(([t,d]) => (
          <div key={t} className="slide-card"><div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p></div>
        ))}
      </div>
    </L.Body>
  )),

  s(59, "Lab 1 · Build step 1 · Set up", () => (
    <L.Build step={1} of={5} title="Set up your workspace" prompt="Open Claude Code in your deal folder. Confirm you can read the DD notes file." />
  )),
  s(60, "Lab 1 · Build step 2 · Build", () => (
    <L.Build step={2} of={5} title="Build the instruction" prompt="Draft the Role/Task/Specifics/Notes for the issue-log workflow. 20 minutes." />
  )),
  s(61, "Lab 1 · Build step 3 · Test", () => (
    <L.Build step={3} of={5} title="Run against the clean case" prompt="Test on the standard DD note. Compare output to the reference issue log." />
  )),
  s(62, "Lab 1 · Build step 4 · Peer review", () => (
    <L.Build step={4} of={5} title="Peer review" prompt="Swap with the person next to you. Run the controls checklist. 10 minutes." />
  )),
  s(63, "Lab 1 · Build step 5 · Save", () => (
    <L.Build step={5} of={5} title="Save the asset" prompt="Commit prompt + sample output + known limits to /assets. This is now yours." />
  )),

  // ---- Lab 2 ----
  s(64, "Source control, not slide generation", () => (
    <L.Body kicker="Lab 2 · Discipline" title="Client-materials work begins with source control, not slide generation">
      <p className="slide-subtitle mt-4 max-w-3xl">Gather sources first. Index them. <b>Then</b> generate. Never generate first and source later.</p>
    </L.Body>
  )),

  s(65, "Every claim needs a locator and a date", () => (
    <L.Body kicker="Lab 2 · Evidence" title="Every claim needs a precise locator and an as-of date">
      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
        <table className="w-full slide-body">
          <thead className="bg-[color:var(--secondary)]">
            <tr><th className="text-left px-4 py-3">Claim</th><th className="text-left px-4 py-3">Source</th><th className="text-left px-4 py-3">Page</th><th className="text-left px-4 py-3">As-of</th><th className="px-4 py-3">Confidence</th></tr>
          </thead>
          <tbody>
            {[
              ["Revenue A$142m FY26","Management accounts","p.4","30 Jun 26","High"],
              ["Top-3 customer conc. 61%","Vendor DD","p.24","Jun 26","High"],
              ["Sector growth 8.3% CAGR","IBIS report","p.11","2025","Med"],
            ].map((r) => (
              <tr key={r[0]} className="border-t border-[color:var(--muted-line)]">{r.map((c,i) => <td key={i} className="px-4 py-3">{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </L.Body>
  )),

  s(66, "A pitch and an IM answer different questions", () => (
    <L.Body kicker="Lab 2 · Framing" title="A pitch and an IM answer different questions">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card">
          <div className="slide-chip">Pitch</div>
          <div className="mt-3 text-lg font-semibold">"Why hire us for this mandate?"</div>
          <ul className="mt-3 slide-body space-y-1"><li>· Credentials</li><li>· Process</li><li>· Team</li><li>· Track record</li></ul>
        </div>
        <div className="slide-card">
          <div className="slide-chip">IM</div>
          <div className="mt-3 text-lg font-semibold">"Why buy this business?"</div>
          <ul className="mt-3 slide-body space-y-1"><li>· Investment thesis</li><li>· Financials</li><li>· Market</li><li>· Risks</li></ul>
        </div>
      </div>
    </L.Body>
  )),

  s(67, "Start with the decision the page must enable", () => (
    <L.Body kicker="Lab 2 · Method" title="Start with the decision the page must enable">
      <p className="slide-subtitle mt-4 max-w-3xl">Before writing: what does the reader need to decide after this page? Write that at the top. Everything on the page serves that decision.</p>
      <div className="mt-8 slide-card-dark max-w-3xl">
        <div className="slide-caption text-slate-400 uppercase tracking-widest">Example</div>
        <div className="mt-2 font-mono text-sm">Decision: "Do we submit an indicative offer above $180m by Friday?"</div>
      </div>
    </L.Body>
  )),

  s(68, "A supported headline beats a topic label", () => (
    <L.Body kicker="Lab 2 · Craft" title="A supported headline is more useful than a topic label">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card border-l-4" style={{borderLeftColor:"var(--warn)"}}>
          <div className="slide-caption uppercase">Topic label</div>
          <div className="mt-2 text-lg font-semibold">Market Overview</div>
          <p className="slide-body mt-2">Tells the reader what the page is about. Not what it says.</p>
        </div>
        <div className="slide-card border-l-4" style={{borderLeftColor:"var(--good)"}}>
          <div className="slide-caption uppercase">Supported headline</div>
          <div className="mt-2 text-lg font-semibold">The Australian food-manufacturing sector has consolidated 40% since 2020, creating a two-tier buyer landscape.</div>
          <p className="slide-body mt-2">Tells the reader what to conclude. Everything else on the page is evidence.</p>
        </div>
      </div>
    </L.Body>
  )),

  s(69, "Separate facts, claims, calculations, inferences, conflicts", () => (
    <L.Body kicker="Lab 2 · Categories" title="Separate facts, claims, calculations, inferences, and conflicts">
      <div className="grid md:grid-cols-5 gap-3 mt-4">
        {[
          ["Fact","Verifiable, sourced","#0891b2"],
          ["Claim","Asserted, needs support","#7c3aed"],
          ["Calculation","Derived from inputs","#059669"],
          ["Inference","Reasoned, not stated","#d97706"],
          ["Conflict","Sources disagree","#dc2626"],
        ].map(([t,d,c]) => (
          <div key={t} className="slide-card border-t-4" style={{borderTopColor:c}}>
            <div className="font-semibold">{t}</div>
            <p className="slide-caption mt-2">{d}</p>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(70, "Encode approved formatting as explicit rules", () => (
    <L.Body kicker="Lab 2 · House style" title="Encode approved formatting as explicit rules">
      <ul className="mt-6 space-y-3 slide-body max-w-3xl">
        {[
          "All numbers in A$ millions unless stated.",
          "Sources in 8pt gray at the bottom of each page.",
          "Company names in bold on first reference, plain thereafter.",
          "No em-dashes — the AI overuses them.",
        ].map((t) => <li key={t} className="flex gap-3"><span className="text-[color:var(--accent)]">·</span>{t}</li>)}
      </ul>
    </L.Body>
  )),

  s(71, "Exercise — build a four-page excerpt and its reusable creator", () => (
    <L.Body kicker="Lab 2 · Main exercise" title="Build a four-page excerpt and its reusable creator">
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {[
          ["Output","A four-page company overview from the deal source pack."],
          ["Byproduct","The reusable prompt/instruction that could produce the same quality for any company."],
        ].map(([t,d]) => (
          <div key={t} className="slide-card"><div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p></div>
        ))}
      </div>
    </L.Body>
  )),

  s(72, "First create the source index and page plan", () => (
    <L.Body kicker="Lab 2 · Step 1" title="First create the source index and page plan">
      <ol className="mt-6 space-y-4 slide-body max-w-3xl">
        <li><b>1.</b> List every source document.</li>
        <li><b>2.</b> Map which pages cover which topics.</li>
        <li><b>3.</b> Draft the page plan — what goes on each of the four pages.</li>
      </ol>
    </L.Body>
  )),

  s(73, "Generate an editable first pass with evidence tags", () => (
    <L.Body kicker="Lab 2 · Step 2" title="Generate an editable first pass with evidence tags">
      <p className="slide-body mt-4">Every factual claim gets an inline source tag. Verification becomes a Ctrl-F, not a hunt.</p>
      <div className="mt-6 slide-card-dark font-mono text-sm max-w-3xl">
        Revenue reached A$142m in FY26 <span className="text-emerald-300">[Source: Management accounts, p.4]</span>, with the top three customers contributing 61% of gross margin <span className="text-emerald-300">[Source: Vendor DD, p.24]</span>.
      </div>
    </L.Body>
  )),

  s(74, "Complete only after evidence and format review", () => (
    <L.Body kicker="Lab 2 · Step 3" title="A client-materials draft is complete only after evidence and format review">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card"><div className="slide-chip">Pass 1</div><div className="mt-2 font-semibold">Evidence review</div><p className="slide-body mt-2">Does every claim tie to a source?</p></div>
        <div className="slide-card"><div className="slide-chip">Pass 2</div><div className="mt-2 font-semibold">Format review</div><p className="slide-body mt-2">Does it follow the house-style rules?</p></div>
      </div>
    </L.Body>
  )),

  // ---- Lab 3 ----
  s(75, "Research is a traceable chain", () => (
    <L.Body kicker="Lab 3 · Foundation" title="Research is a traceable chain from question to recommendation">
      <div className="mt-8 flex items-center gap-3 justify-center flex-wrap">
        {["Research question","Search strategy","Sources collected","Analysis","Recommendation"].map((t,i,a) => (
          <div key={t} className="flex items-center gap-3">
            <div className="slide-card px-4 py-3 font-medium text-sm">{t}</div>
            {i<a.length-1 && <div className="text-[color:var(--accent)]">→</div>}
          </div>
        ))}
      </div>
      <p className="slide-caption mt-6 text-center">Every link must be traceable backward.</p>
    </L.Body>
  )),

  s(76, "Three workflows share the same discipline", () => (
    <L.Body kicker="Lab 3 · Scope" title="Three workflows share the same evidence discipline">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["Buyer screening","Thesis-driven shortlist"],
          ["Sector research","Question-driven synthesis"],
          ["PE portfolio mapping","Ownership-current view"],
        ].map(([t,d]) => (
          <div key={t} className="slide-card"><div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p></div>
        ))}
      </div>
    </L.Body>
  )),

  s(77, "Buyer screening — thesis + explicit exclusions", () => (
    <L.Body kicker="Lab 3 · Screening" title="Buyer screening starts with a thesis and explicit exclusions">
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        <div className="slide-card"><div className="slide-chip">In-thesis</div><ul className="mt-3 slide-body space-y-1"><li>· ANZ acquirers</li><li>· EV $50–250m</li><li>· Food & beverage</li><li>· Strategic buyers only</li></ul></div>
        <div className="slide-card border-l-4" style={{borderLeftColor:"var(--warn)"}}><div className="slide-chip" style={{background:"#fef3c7",color:"#92400e"}}>Excluded</div><ul className="mt-3 slide-body space-y-1"><li>· PE-owned platforms</li><li>· Sub-$50m EV</li><li>· Pure distributors</li><li>· Non-ANZ</li></ul></div>
      </div>
    </L.Body>
  )),

  s(78, "A scoring model organises judgement", () => (
    <L.Body kicker="Lab 3 · Scoring" title="A scoring model should organise judgement, not disguise it">
      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
        <table className="w-full slide-body">
          <thead className="bg-[color:var(--secondary)]"><tr><th className="text-left px-4 py-3">Criterion</th><th className="px-4 py-3">Weight</th><th className="px-4 py-3">Score</th><th className="text-left px-4 py-3">Rationale</th></tr></thead>
          <tbody>
            {[
              ["Strategic fit","30%","8","Direct product complement"],
              ["Balance-sheet capacity","25%","7","$400m cash + credit line"],
              ["Recent M&A appetite","20%","6","Two bolt-ons in 24 months"],
              ["Cultural fit","15%","5","Distant HQ, integration risk"],
              ["Competition risk","10%","9","No overlapping bid"],
            ].map((r) => <tr key={r[0]} className="border-t border-[color:var(--muted-line)]">{r.map((c,i) => <td key={i} className={i===3?"px-4 py-3":"px-4 py-3 text-center"}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      <p className="slide-caption mt-4">AI populates the evidence. The banker sets the weights and makes the call.</p>
    </L.Body>
  )),

  s(79, "Sector research — questions before search", () => (
    <L.Body kicker="Lab 3 · Sector" title="Sector research improves when questions are set before search begins">
      <p className="slide-body mt-4 max-w-3xl">Write your research questions first. Then search. Prevents confirmation bias and wandering through results.</p>
    </L.Body>
  )),

  s(80, "PE portfolio mapping — current ownership evidence", () => (
    <L.Body kicker="Lab 3 · PE mapping" title="PE portfolio mapping requires current ownership evidence">
      <p className="slide-body mt-4 max-w-3xl">PE portfolios change constantly. Your mapping is only as good as your last ownership verification.</p>
      <div className="grid md:grid-cols-4 gap-3 mt-6">
        {["CapIQ","PitchBook","FactSet","Company registries"].map((t) => (
          <div key={t} className="slide-card text-center font-medium">{t}</div>
        ))}
      </div>
    </L.Body>
  )),

  s(81, "Source ladder + access dates", () => (
    <L.Body kicker="Lab 3 · Sourcing" title="Use a source ladder and record access dates">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["Primary","Company filings, direct data","#059669"],
          ["Secondary","Broker research, industry reports","#d97706"],
          ["Tertiary","News, expert commentary","#94a3b8"],
        ].map(([t,d,c]) => (
          <div key={t} className="slide-card border-t-4" style={{borderTopColor:c}}>
            <div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p>
          </div>
        ))}
      </div>
      <p className="slide-caption mt-4">Record the date you accessed each source. Sources change.</p>
    </L.Body>
  )),

  s(82, "One evidence ledger makes uncertainty visible", () => (
    <L.Body kicker="Lab 3 · Evidence ledger" title="One evidence ledger makes uncertainty and conflicts visible">
      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
        <table className="w-full slide-body">
          <thead className="bg-[color:var(--secondary)]"><tr><th className="text-left px-4 py-3">Claim</th><th className="text-left px-4 py-3">Source 1 (supports)</th><th className="text-left px-4 py-3">Source 2 (contradicts)</th><th className="text-left px-4 py-3">Resolution</th><th className="px-4 py-3">Confidence</th></tr></thead>
          <tbody>
            {[
              ["Market growth 8.3%","IBIS 2025","Euromonitor 2025 (5.1%)","Use range 5–8%","Med"],
              ["Target #1 in category","Company deck","Nielsen (target #2)","Nielsen prevails","High"],
            ].map((r) => <tr key={r[0]} className="border-t border-[color:var(--muted-line)]">{r.map((c,i) => <td key={i} className="px-4 py-3">{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    </L.Body>
  )),

  s(83, "Exercise — build a defensible first-pass buyer screen", () => (
    <L.Body kicker="Lab 3 · Exercise" title="Build a defensible first-pass buyer screen">
      <ol className="mt-6 grid md:grid-cols-4 gap-3">
        {["Define screening criteria","Run the screen","Ranked shortlist with evidence","Document exclusions"].map((t,i) => (
          <li key={t} className="slide-card"><div className="text-[color:var(--accent)] font-mono">0{i+1}</div><div className="mt-2 font-semibold">{t}</div></li>
        ))}
      </ol>
    </L.Body>
  )),

  s(84, "Challenge the top candidate", () => (
    <L.Body kicker="Lab 3 · Stress test" title="Challenge the top candidate before you defend it">
      <p className="slide-subtitle mt-4 max-w-3xl">Before presenting: spend 10 minutes trying to kill your top pick.</p>
      <p className="slide-body mt-4 max-w-3xl">What would a sceptical partner ask? The AI can role-play the sceptic.</p>
    </L.Body>
  )),

  s(85, "A usable screen shows rationale, evidence, and a review trail", () => (
    <L.Body kicker="Lab 3 · Output" title="A usable screen shows rationale, evidence, and a review trail">
      <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--muted-line)]">
        <table className="w-full slide-body">
          <thead className="bg-[color:var(--secondary)]"><tr>{["Company","Fit","Rationale","Key evidence","Red flags","Reviewer"].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            <tr className="border-t border-[color:var(--muted-line)]"><td className="px-4 py-3 font-medium">Peer Co A</td><td className="px-4 py-3">9</td><td className="px-4 py-3">Adjacent product line</td><td className="px-4 py-3">FY26 annual, p.32</td><td className="px-4 py-3">CEO transition</td><td className="px-4 py-3">JS</td></tr>
            <tr className="border-t border-[color:var(--muted-line)]"><td className="px-4 py-3 font-medium">Peer Co B</td><td className="px-4 py-3">7</td><td className="px-4 py-3">Geographic fill</td><td className="px-4 py-3">CapIQ 12-Jul</td><td className="px-4 py-3">Balance-sheet stretch</td><td className="px-4 py-3">JS</td></tr>
          </tbody>
        </table>
      </div>
    </L.Body>
  )),

  // ---- Virtual employee ----
  s(86, "A virtual employee is a controlled workflow", () => (
    <L.Body kicker="Demo · Definition" title="A virtual employee is a controlled workflow with tools and approval gates">
      <p className="slide-subtitle mt-4 max-w-3xl">An AI agent that runs a defined workflow, connected to specific tools, with human approval before any consequential action.</p>
      <p className="slide-body mt-6 max-w-3xl">Not a chatbot. A <b>process</b>.</p>
    </L.Body>
  )),

  s(87, "One synthetic request end to end", () => (
    <L.Body kicker="Demo · Walkthrough" title="The demonstration follows one synthetic request end to end">
      <div className="mt-6 space-y-3 max-w-3xl">
        {[
          ["1","Email arrives","Client asks for company profiles"],
          ["2","AI reads and classifies","Routes to the profile workflow"],
          ["3","AI drafts response","With profiles attached"],
          ["4","Human approval","Reviewer clicks approve"],
          ["5","Send","Reply goes out"],
        ].map(([n,t,d]) => (
          <div key={n} className="flex items-start gap-4 slide-card">
            <div className="w-8 h-8 rounded-full bg-[color:var(--accent)] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">{n}</div>
            <div><div className="font-semibold">{t}</div><div className="slide-caption mt-1">{d}</div></div>
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(88, "Human approval before every consequential action", () => (
    <L.Body kicker="Demo · Gates" title="Human approval sits before every consequential action">
      <div className="mt-6 flex items-center gap-3 flex-wrap justify-center">
        {[
          {t:"Read",gate:false},{t:"Classify",gate:false},{t:"Draft",gate:false},
          {t:"STOP · APPROVE",gate:true},
          {t:"Send",gate:false},
        ].map((s,i,a) => (
          <div key={i} className="flex items-center gap-3">
            <div className={s.gate ? "px-5 py-4 rounded-lg font-semibold border-2" : "slide-card px-4 py-3"}
                 style={s.gate ? {borderColor:"#dc2626",background:"#fef2f2",color:"#991b1b"} : undefined}>
              {s.t}
            </div>
            {i<a.length-1 && <div className="text-[color:var(--accent)]">→</div>}
          </div>
        ))}
      </div>
    </L.Body>
  )),

  s(89, "Capability depends on integration, permissions, exception handling", () => (
    <L.Body kicker="Demo · Pillars" title="Capability depends on integration, permissions, and exception handling">
      <div className="grid md:grid-cols-3 gap-5 mt-4">
        {[
          ["Integrations","Email · calendar · files · CRM"],
          ["Permissions","What it can touch — and cannot"],
          ["Exception handling","What happens when something goes wrong"],
        ].map(([t,d]) => (
          <div key={t} className="slide-card"><div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p></div>
        ))}
      </div>
    </L.Body>
  )),

  s(90, "Start with one measured, reversible pilot", () => (
    <L.Body kicker="Demo · Rollout" title="Start implementation with one measured, reversible pilot">
      <div className="grid md:grid-cols-5 gap-3 mt-4">
        {["One workflow","One owner","Clear success metric","30-day trial","Weekly check-in"].map((t) => (
          <div key={t} className="slide-card text-center font-medium text-sm">{t}</div>
        ))}
      </div>
      <p className="slide-caption mt-4">Do not try to automate everything at once.</p>
    </L.Body>
  )),

  // ---- Close ----
  s(91, "Five repeatable moves reduce rework", () => (
    <L.Body kicker="Close" title="Five repeatable moves reduce rework">
      <ul className="mt-6 grid md:grid-cols-5 gap-3">
        {["Structured prompts","Source-first generation","STAMP review","Claim registers","Approval gates"].map((t) => (
          <li key={t} className="slide-card text-center font-medium">{t}</li>
        ))}
      </ul>
    </L.Body>
  )),

  s(92, "Your workshop outputs form a starter operating system", () => (
    <L.Body kicker="Close" title="Your workshop outputs form a starter operating system">
      <div className="grid md:grid-cols-2 gap-5 mt-6 max-w-4xl">
        {[
          ["Prompt templates","Role/Task/Notes patterns for the five moves"],
          ["STAMP checklist","One page. Pin above your monitor."],
          ["Build-lab outputs","The reusable asset you built today"],
          ["Source pack","Your reference source discipline"],
        ].map(([t,d]) => (
          <div key={t} className="slide-card"><div className="font-semibold">{t}</div><p className="slide-body mt-2">{d}</p></div>
        ))}
      </div>
    </L.Body>
  )),

  s(93, "Choose one live workflow, clear owner, safe boundary", () => (
    <L.Body kicker="Close" title="Choose one live workflow with a clear owner and safe boundary">
      <ul className="mt-6 slide-body space-y-2 max-w-3xl">
        <li>· High repetition</li>
        <li>· Low risk if it fails</li>
        <li>· Clear success metric</li>
        <li>· Enthusiastic owner</li>
      </ul>
      <div className="mt-8 slide-card-dark max-w-3xl">Pick one. Start next week.</div>
    </L.Body>
  )),

  s(94, "Exercise — write and stress-test your 30-day commitment", () => (
    <L.Body kicker="Close · Exercise" title="Write and stress-test your 30-day commitment">
      <div className="mt-6 slide-card-dark font-mono text-sm max-w-3xl">
        In the next 30 days, I will <span className="text-emerald-300">[specific workflow]</span> using <span className="text-emerald-300">[specific tool]</span>. Success looks like <span className="text-emerald-300">[measurable outcome]</span>. I'll review progress on <span className="text-emerald-300">[specific date]</span>.
      </div>
      <p className="slide-caption mt-6">Then stress-test with a partner.</p>
    </L.Body>
  )),

  s(95, "Closing", () => (
    <L.Center>
      <div className="text-center max-w-4xl">
        <div className="slide-title-lg">AI drafts. <span style={{color:"var(--accent)"}}>You decide.</span></div>
        <div className="slide-title mt-4">Start Monday.</div>
        <div className="mt-16 slide-caption uppercase tracking-widest">Sentia Partners · Tenet Advisory workshop</div>
      </div>
    </L.Center>
  )),
];

// Sanity: ensure section index recomputed with final startSlide values
SLIDES.forEach((sl) => { sl.section = sectionOf(sl.id); });
