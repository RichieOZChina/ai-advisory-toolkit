
## Three targeted edits

### 1. Slide 2 — "The ratio we are trying to change" (the 78/22 slide)

The 78% / 22% numbers are not from your PDFs — I invented them. Fix by removing the fake precision:

- Replace `RatioBar` numeric split with a **qualitative** two-bar visual labeled "Assembling" vs "Deciding" (no percentages).
- Rewrite body copy: *"Most of your M&A week goes into assembling materials — pulling data, formatting decks, chasing sources. Only a sliver goes into the decision itself. Today is about flipping that ratio."*
- Add a small caption: *"We'll validate the actual split with the pre-workshop survey."*

(If you'd rather keep numbers, tell me a source or a range you're comfortable citing and I'll wire that in instead.)

### 2. Slide 6 — Reframe from "next-word predictor" to the PDF's definition

Right now slide 6 leads with my simplification. Rewrite it to match your source material:

- Title: **"What is a Large Language Model?"**
- Lead definition (verbatim from `LLM Theory` p.2): *"AI systems trained on vast amounts of text data, capable of understanding and generating human-like language."*
- Two supporting pillars as cards:
  - **Scale** — billions of parameters, trained on billions of words.
  - **Emergent properties** — capabilities that arise from training, not explicit programming (the "chef who memorized 1000 recipes" analogy in a short caption).
- Keep the `TextPredictor` interactive as a secondary "intuition" panel below, framed as *"One way to picture it: a very sophisticated next-word predictor."* — so the intuition is present but not presented as the definition.
- Source citation footer: *"LLM Theory pp.1–3."*

### 3. Slide 7 — Convert from section divider to "Intro: What is an LLM?"

Currently slide 7 is `L.Section` ("Module 2 — How modern AI works"). Replace with a simple intro-body slide:

- Kicker: *"Module 2 · How modern AI works"*
- Title: **"So what actually is an LLM?"**
- One-sentence lead: *"Before we go under the hood, one plain-English answer."*
- Body: a short 3-line explanation in your voice, plain language, no jargon — something like:
  > *"An LLM is a computer program that has read most of the internet and learned the patterns of how humans use language. When you type something, it predicts, one piece at a time, what a helpful response looks like. It doesn't 'know' things the way you do — it recognises patterns extremely well."*
- Footer: *"Everything else in this section is detail on top of that one idea."*

This makes slide 7 the **soft on-ramp**, slide 6 becomes the **formal definition**, and the AI family tree (slide 8) then makes sense as the next beat.

### Order check

After these edits the opening of Section 2 reads:
- **6** — What is a Large Language Model? (formal definition + scale + emergent properties)
- **7** — So what actually is an LLM? (plain-English intro)
- **8** — The AI family tree

You may actually want **7 before 6** (plain-English first, formal second). Tell me which order you prefer and I'll wire it that way.

### Technical notes

- Edits touch only `src/deck/slidesData.tsx` and `src/deck/interactive/RatioBar.tsx`.
- No new dependencies, no routing changes, sidebar auto-updates from `SLIDES`.

Approve and I'll make the changes. Also confirm the 6/7 order.
