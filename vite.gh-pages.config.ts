import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static, client-only build for GitHub Pages.
// This produces a plain SPA in dist/ that updates automatically on every push to main.
export default defineConfig({
  vite: {
    base: "/ai-advisory-toolkit/",
  },
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "dist",
        crawlLinks: true,
        retryCount: 0,
      },
    },
  },
  nitro: {
    preset: "static",
    output: {
      dir: "dist",
    },
  },
});
