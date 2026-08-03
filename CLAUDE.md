# CLAUDE.md — orientation for AI coding agents

This repo is a **web-based slide deck** for an M&A team workshop. It looks like a consulting deliverable, not PowerPoint. Keep that bar.

## What this is

- Single-page React app. Hash-based routing (`#slide-N`) — no server.
- 90+ slides registered in one file. Interactive diagrams are custom React/SVG components.
- Rendered inside a shell with a collapsible sidebar, top progress bar, and global keyboard shortcuts.

## File map

```
src/deck/
  Deck.tsx                    Shell: sidebar + slide viewport + hotkeys
  slidesData.tsx              THE CONTENT. Slide registry + section grouping. Start here for edits.
  layouts.tsx                 Layout templates: Title / Body / Section / Move / Build
  hooks/
    useDeckNav.ts             Hash routing, next/prev, jump-to-slide
    useHotkeys.ts             Arrow keys, space, m, n, 1–7, ?, esc
    useSidebar.ts             Collapse state
  components/
    Sidebar.tsx               Section + slide list
    TopProgressBar.tsx
    NotesDrawer.tsx
    KeyboardHelp.tsx
  interactive/                One file per custom diagram. Named after concept.
    AITree.tsx                Nested AI → ML → DL → LLM containment
    AgentLoop.tsx             5-step agent loop
    AgentLoopTypes.tsx        Four autonomy modes (turn/goal/time/proactive)
    AttentionDiagram.tsx      Transformer attention arcs
    ChunkingCompare.tsx       Chunking strategies
    EmbeddingSpace.tsx        3D-ish semantic space
    OpenClosedAccordion.tsx   Open vs closed models + provider list
    PrivacyTiers.tsx
    ProviderGrid.tsx
    RagFlow.tsx               Closed-book vs open-book (RAG)
    TwoGateWorkCycle.tsx      Data gate → work cycle → tie-out
    StampExercise.tsx         Interactive human tie-out exercise
    SurveyBar.tsx
    TemperatureSlider.tsx     Temperature + 2026 model pricing table
    TextPredictor.tsx
    TokenSplitter.tsx
    WorkflowTimeline.tsx
```

## Conventions

- **Palette**: navy `#0a2540`, accent `#005cff`, white. Use these as literals in SVG. Tailwind semantic tokens in components.
- **Type**: Inter. Utility classes `slide-title`, `slide-body`, `slide-body-lg`, `slide-caption` are defined in `src/styles.css`.
- **Voice**: this is a first-person deliverable from the workshop author. **Do not** cite external sources, PDFs, papers, or vendor blogs in slide copy. State things plainly.
- **Numbers**: any figure on a slide must be real and current (July 2026 baseline for model pricing). If you can't verify, don't invent — leave it out or mark clearly.
- **No project-specific deal names**. Use "a specific deal", "the target company", "the deal folder". Do not reintroduce "Northstar" or similar.
- **One concept per slide**. When collapsing content, prefer a rich single slide with a diagram over 3 bullet slides.

## Adding / editing slides

1. Open `src/deck/slidesData.tsx`.
2. Slides live in an ordered array. Each slide has `{ id, title, section, render: () => JSX }`.
3. Reuse a layout from `layouts.tsx` or drop in a component from `interactive/`.
4. Section groupings and `startSlide` markers control the sidebar — update them if you insert/remove slides so numbering stays consistent.

## Adding an interactive diagram

- New file under `src/deck/interactive/`, one default (or named) export.
- Pure SVG or CSS animation preferred over a charting lib. Keep it under ~250 lines.
- Match the navy/accent palette. Include a short caption under the diagram tying it back to M&A work.

## Do not

- Do not add server routes, API calls, auth, or a database. This is a static deck.
- Do not add heavy dependencies (chart libs, animation libs). Hand-roll SVG.
- Do not touch `src/routeTree.gen.ts` — it's auto-generated.
- Do not rewrite the whole slide array to renumber; edit in place and update section `startSlide` values.
- Do not mention internal tooling, the PDF, the workshop-author's private research, or vendor whitepapers in slide copy.

## Running

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build to dist/
```

## Publishing

Pushes to `main` are built and published automatically by the GitHub Pages workflow.
