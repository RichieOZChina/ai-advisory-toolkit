import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeadContent, RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

function HeadInjector() {
  return <HeadContent />;
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router}>
      <HeadInjector />
    </RouterProvider>
  </StrictMode>,
);
