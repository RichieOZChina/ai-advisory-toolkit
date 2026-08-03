import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const baseUrl = import.meta.env.BASE_URL ?? "/";
  const basepath = baseUrl === "/" ? "/" : baseUrl.replace(/\/$/, "");

  // GitHub Pages serves index.html, but the router's canonical route is the
  // directory URL. Normalise explicit /index.html visits before matching.
  if (typeof window !== "undefined" && window.location.pathname.endsWith("/index.html")) {
    const cleanPath = window.location.pathname.slice(0, -"index.html".length);
    window.history.replaceState({}, "", `${cleanPath}${window.location.search}${window.location.hash}`);
  }

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
