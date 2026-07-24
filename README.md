# Tenet × Sentia — AI Advisory Toolkit

A web-based slide deck for the full-day AI workshop delivered to the Tenet Advisory M&A team. Built as a React SPA with a collapsible sidebar, keyboard navigation, and custom interactive diagrams — designed to feel like a premium consulting deliverable, not PowerPoint.

## Published URLs

- **Auto-deploying public site (GitHub Pages — updates on every push to `main`):**  
  https://RichieOZChina.github.io/ai-advisory-toolkit/

- **Lovable published site (manual "Update" click required to refresh):**  
  https://sentia-insight-draft.lovable.app/

## Team workflow

This repo is the source of truth. Anyone with access can edit the deck locally (Claude Code, Cursor, VS Code) and push. Lovable stays in two-way sync — pushes here update the Lovable preview, and edits in Lovable get committed back here.

**For the public site:** every merge/push to `main` automatically rebuilds and redeploys the GitHub Pages URL above. No manual steps.

```sh
git clone https://github.com/RichieOZChina/ai-advisory-toolkit.git
cd ai-advisory-toolkit
npm install
npm run dev
```

Then open http://localhost:8080.

### Making changes

- **Slide content, order, section grouping** → `src/deck/slidesData.tsx`
- **Layout templates** (Title / Body / Section / Move / Build) → `src/deck/layouts.tsx`
- **Interactive diagrams** → `src/deck/interactive/*.tsx` (one component per diagram)
- **Sidebar, progress bar, keyboard shortcuts** → `src/deck/components/*` and `src/deck/hooks/*`
- **Global styles / palette** → `src/styles.css`

Palette: navy `#0a2540`, accent blue `#005cff`, white. Typography: Inter.

### Working with Claude Code

There is a `CLAUDE.md` at the repo root with orientation for AI coding agents (file map, conventions, do/don't). Point Claude Code at it before making edits.

### Push / pull

Standard Git. `main` is the working branch — feature branches + PRs are optional but recommended for anything larger than a copy edit.

```sh
git checkout -b tweak-slide-14
# edit
git commit -am "Slide 14: tighten intro copy"
git push -u origin tweak-slide-14
```

Lovable picks up pushes to `main` automatically.

## Built with

- Vite + React 19 (authored as a client-side SPA on the TanStack Start template)
- TypeScript
- Tailwind CSS v4
- Hand-rolled SVG for all diagrams — no chart library
