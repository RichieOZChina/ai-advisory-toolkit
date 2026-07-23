## What the video shows

An animated infographic titled **"Four types of loops — four ways to structure agentic work"**, with four stacked rows:

1. **Turn-based — you steer every move** (prompt → gather/check → act → reply)
2. **Goal-based — it checks itself** (agent works → evaluator → loops until goal met)
3. **Time-based — the clock triggers it** (interval fires → runs task → waits for next tick)
4. **Proactive — no human present** (event/schedule → triage → fix → review → close)

The through-line: **"the more you hand off, the less you babysit"** — an autonomy spectrum from tight human-in-the-loop to fully autonomous.

## Why this fits slide 19

Slide 19 currently uses `AgentLoop.tsx` to explain *one* generic agent loop (goal → plan → act → observe → decide). That's great for defining what an agent is, but it doesn't answer the natural next question the M&A team will ask: *"So how much do we let it run on its own?"* The four-loop taxonomy is exactly that framing — an autonomy ladder — and lands the STAMP governance point that follows.

## Proposal — rebuild natively, don't embed the mp4

Recreating it as a native React/SVG component (rather than dropping the .mp4 into the deck) keeps:
- The deck's visual language (navy / #005cff accent, consulting typography) instead of the video's purple/coral palette
- Everything vector-sharp when projected at 1920×1080
- No "someone else's graphic" feel — consistent with your earlier instruction to strip external references

Same idea, same 4-row structure, same animation feel (nodes lighting up in sequence along each loop path), but styled as one of your slides.

## Placement

Insert as a **new slide 20**, immediately after the current slide 19 (agent loop definition):

- **19** — What is an agent? (current `AgentLoop`, unchanged) — defines the loop
- **20 (new)** — *Four ways to run an agent* — autonomy ladder, animated
- **21** — STAMP / governance (previously 20) — now lands harder because we've just shown the autonomy spectrum

M&A framing per row, tied to their world:
1. **Turn-based** — analyst prompts, reviews each output. Drafting a buyer list.
2. **Goal-based** — "produce a first-draft IC memo, stop when the evaluator says it hits the checklist." Human reviews the finished artefact.
3. **Time-based** — every Monday 7am, scan the deal pipeline for stale items, post a summary to the deal channel.
4. **Proactive** — event-driven. New filing hits SEC EDGAR for a target → agent triages, drafts a note, pings the deal lead.

Bottom strapline in your voice: *"The more you hand off, the less you babysit — but also the more governance you need. STAMP (next slide) is how we decide which loops are safe to run where."*

## Technical

- New component `src/deck/interactive/AgentLoopTypes.tsx` — four stacked rows, each an SVG flow diagram with a small animated pulse traveling along the path (CSS `@keyframes` on `stroke-dashoffset`, no new deps).
- Register new slide in `src/deck/slidesData.tsx` at position 20; downstream slides renumber automatically via the array.
- Keep `AgentLoop.tsx` untouched.
- No routing, no dependencies, no data changes.

## Open question

Do you want the four-loop slide **after** the current agent-definition slide (my recommendation, above), or **replacing** it? Replacing would be tighter but loses the "what is an agent" grounding for people who need the basic definition first.
