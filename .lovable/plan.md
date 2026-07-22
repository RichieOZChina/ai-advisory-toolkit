
# AI for the M&A Team — Web Slide Deck

A single-page React app on the Lovable modern stack (TanStack Start, but authored as pure client components — no server functions, no loaders). Ships 99 slides as static assets with a Notion/Linear-grade sidebar and keyboard-driven navigation.

## Scope

- All 99 slides across 7 sections at the fidelity you specified (interactive tree, Venn, provider grid, RAG flow, attention diagram, temperature slider, STAMP accordion + exercise, timelines, etc.).
- Collapsible left sidebar + section-shortcut row + keyboard shortcuts + top progress bar + speaker notes drawer + print CSS.
- Content sourced from the 8 uploaded PDFs where you cited page ranges; original slides authored directly.
- Palette: dark navy (#0a2540), white, single accent blue (#005cff). Inter typography. No gradients, no heavy shadows.

## Architecture

```text
src/
  routes/
    __root.tsx              # shell + Inter font <link> + global providers
    index.tsx               # renders <Deck />
  deck/
    Deck.tsx                # layout: sidebar + main + progress bar + chrome
    slides/Slide01..Slide99.tsx
    slides/index.ts         # ordered list + section metadata
    components/
      Sidebar.tsx           # TOC + section shortcut dots + mobile bottom sheet
      TopProgressBar.tsx
      SlideFrame.tsx        # 16:9 container + fade-up entrance
      Chrome.tsx            # counter, prev/next, notes button
      KeyboardHelp.tsx      # `?` overlay
      NotesDrawer.tsx
    interactive/            # AITree, VennDiagram, ProviderGrid, RagFlow,
                            # AttentionDiagram, TemperatureSlider, StampAccordion,
                            # StampExercise, ParameterChart, EmbeddingSpace,
                            # AgentLoop, PrivacyTiers, WorkflowTimeline
    content/                # typed data extracted from the PDFs
    hooks/
      useDeckNav.ts         # hash routing (#slide-N), arrows, 1–7 section jumps
      useSidebar.ts         # open/close, persisted in localStorage
      useHotkeys.ts
  styles.css                # tokens + slide typography + print styles
```

### Design tokens (`src/styles.css`)
- `--navy: #0a2540`, `--accent: #005cff`, muted grays, `--font-sans: Inter`.
- Semantic slide classes (`.slide-title`, `.slide-subtitle`, `.slide-body`, `.slide-kicker`, `.slide-caption`) with responsive `clamp()` sizing.
- Inter loaded via `<link>` in `__root.tsx` head (Tailwind v4 rule — no `@import` of a remote URL).

### Navigation
- URL hash `#slide-N` (1..99) is the source of truth; browser back/forward works.
- Sidebar open/closed persisted in `localStorage`.
- Keys: `←/→` prev/next, `M` toggle sidebar, `Esc` close sidebar, `1`–`7` jump to a section, `?` toggle shortcut overlay, `N` toggle notes.
- Sidebar: 7 sections with accent bar + indented numbered slides; current slide highlighted. Top row of 7 muted color dots for one-click section jumps.
- Mobile: sidebar collapses into a bottom sheet.

### Slide frame
- Content authored in a responsive container (not a fixed 1920×1080 scaled surface — this is a web deck, not a projector export).
- 300ms fade-up entrance; sidebar animations ≤200ms.
- Left-edge gradient hint when sidebar is closed.
- Print CSS hides chrome and paginates one slide per page.

## Content pipeline

1. Parse the two prompt PDFs with `document--parse_document` (already done for the framework slides).
2. For the six theory PDFs, use your detailed per-slide brief as the primary content spec — it already contains every definition, label, and example needed. Parse selectively only if a specific slide needs verbatim quotes.
3. Store structured content in `src/deck/content/*.ts` so slide components import typed data rather than hard-coding strings.

## Interactive components (all custom SVG + Tailwind, client-only)

AITree, VennDiagram, ProviderGrid, ParameterGrowthChart, NeuronCompare, TokenSplitter, EmbeddingSpace, RagFlow, ChunkingCompare, AttentionDiagram, TemperatureSlider (with July-2026 pricing table you supplied), AgentLoop, PrivacyTiers, WorkflowTimeline, StampAccordion, StampExercise. All degrade to static visuals in print.

## Delivery order

1. Tokens + typography + `SlideFrame` + `Sidebar` + hash routing + keyboard + notes drawer + print CSS. Verify with 3 placeholder slides.
2. Build the reusable interactive components.
3. Author all 99 slides section by section, wiring each to its content module and interactive component.
4. QA pass: keyboard, mobile drawer, print preview, transitions, contrast, `?` overlay.

## Explicit non-goals

- No backend, no auth, no database. Nothing that would justify a server function.
- No PDF export tooling — print-to-PDF via the browser is the export path.
- Survey chart on slide 5 is a labeled placeholder, per your spec.
- Speaker notes are seeded with a 1–2 sentence stub per slide; you can edit inline.

## Assumptions (say the word to change any)

- Slide count: your header says ~95 but the numbered list runs 1–99; I'll build all 99.
- Provider logos on slides 12–13: I'll use text wordmarks to keep the deck self-contained and license-safe. Ask if you want real SVGs and I'll source them.
- Stack: staying on TanStack Start (Lovable default) but authoring as a static client deck; no server layer used.

Approve to start. First push will be the shell + navigation + a few real slides so you can feel the interaction; the remaining slides follow immediately after.
