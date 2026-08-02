import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import favicon from "/favicon.ico?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AI for the M&A Team — Tenet Advisory × Sentia Partners" },
      { name: "description", content: "A full-day AI workshop for the Tenet Advisory M&A team, delivered by Sentia Partners." },
      { property: "og:title", content: "AI for the M&A Team" },
      { property: "og:description", content: "A full-day AI workshop for the Tenet Advisory M&A team, delivered by Sentia Partners." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://richieozchina.github.io/ai-advisory-toolkit/" },
      { property: "og:site_name", content: "Sentia Partners" },
      { property: "og:image", content: "https://richieozchina.github.io/ai-advisory-toolkit/og-sentia-ai-workshop.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: "AI for the M&A Team — Tenet Advisory × Sentia Partners" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI for the M&A Team" },
      { name: "twitter:description", content: "A full-day AI workshop for the Tenet Advisory M&A team, delivered by Sentia Partners." },
      { name: "twitter:image", content: "https://richieozchina.github.io/ai-advisory-toolkit/og-sentia-ai-workshop.png" },
      { name: "twitter:image:alt", content: "AI for the M&A Team — Tenet Advisory × Sentia Partners" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: favicon, type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
