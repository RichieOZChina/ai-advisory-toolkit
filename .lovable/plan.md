# Auto-redeploy the deck from GitHub pushes

## Goal
Every push to `main` in `RichieOZChina/ai-advisory-toolkit.git` automatically rebuilds and republishes the deck — no manual "Update" click in Lovable.

## Recommended path: GitHub Pages
GitHub Pages is the simplest option because it requires **no new accounts or services** — the repo already lives on GitHub. The published URL will be:

```
https://RichieOZChina.github.io/ai-advisory-toolkit/
```

Hash-based slide links (`#slide-N`) will continue to work.

## Plan

### 1. Add a static build configuration
Create `vite.gh-pages.config.ts` that tells TanStack Start to emit a plain static SPA instead of a Cloudflare Worker:

- `base: "/ai-advisory-toolkit/"` so assets load under the repo path.
- `tanstackStart.spa.enabled: true` for a client-only bundle.
- `nitro.preset: "static"` and `output.dir: "dist"` so the build produces a normal `dist/` folder with `index.html`.

Add a matching script in `package.json`:

```json
"build:gh-pages": "vite build --config vite.gh-pages.config.ts"
```

### 2. Fix the favicon path for a subpath
The root route currently links to `/favicon.ico` as an absolute path. Switch it to a Vite `?url` import so the base path is applied automatically:

```ts
import favicon from "/favicon.ico?url";
```

### 3. Add the GitHub Actions workflow
Create `.github/workflows/deploy.yml` that:

- Triggers on every push to `main`.
- Checks out the repo.
- Sets up Bun and runs `bun install`.
- Runs `bun run build:gh-pages`.
- Uploads `dist/` and deploys it to GitHub Pages using the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions.

### 4. Update README
Add the GitHub Pages URL to `README.md` and clarify:

- The GitHub Pages URL updates automatically on every push.
- The Lovable published URL (`https://sentia-insight-draft.lovable.app`) will **not** auto-update from GitHub pushes; it still needs a manual "Update" click in Lovable if you want to keep using it.

### 5. One-time repo setting
In the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. This only needs to be done once.

## Verification
After the first workflow run, open `https://RichieOZChina.github.io/ai-advisory-toolkit/` and confirm the deck loads. Then test a deep link such as `.../ai-advisory-toolkit/#slide-5`.
