import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain Vite static build for GitHub Pages.
// This avoids TanStack Start's server/Nitro layer and outputs a client-only SPA.
export default defineConfig({
  base: "/ai-advisory-toolkit/",
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    react(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.gh-pages.html",
    },
  },
});
