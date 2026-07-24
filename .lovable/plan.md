Problem: https://richieozchina.github.io/ai-advisory-toolkit/ returns a GitHub Pages 404.

Root cause (most likely): GitHub Pages has not been enabled in the repo settings, or the source is still set to "Deploy from a branch" instead of "GitHub Actions". The workflow file `.github/workflows/deploy.yml` and the Vite static build config are already in place.

Steps to fix:

1. Enable GitHub Pages with GitHub Actions as the source
   - Go to https://github.com/RichieOZChina/ai-advisory-toolkit/settings/pages
   - Under "Build and deployment" → "Source", select **GitHub Actions**
   - Save

2. Trigger the deployment workflow
   - The workflow runs on every push to `main`. If Pages is now enabled, make any trivial commit+push to `main` (e.g., update README) to trigger it.
   - Alternatively, go to **Actions** tab → "Deploy to GitHub Pages" → **Run workflow**.

3. Verify the Actions run succeeds
   - Check https://github.com/RichieOZChina/ai-advisory-toolkit/actions
   - Confirm both "build" and "deploy" jobs complete green.

4. Verify the live URL loads the deck
   - Re-check https://richieozchina.github.io/ai-advisory-toolkit/
   - If it still 404s after a green deploy, investigate whether the subpath router base is working; the current `src/router.tsx` reads `import.meta.env.BASE_URL` and the Vite config sets `base: "/ai-advisory-toolkit/"`, so it should match.

5. If the page loads but the router shows "This page doesn't exist", fix the TanStack Router basepath handling for the GitHub Pages subpath and re-deploy.

Expected outcome: the live deck loads at the URL, and every future push to `main` auto-redeploys it.