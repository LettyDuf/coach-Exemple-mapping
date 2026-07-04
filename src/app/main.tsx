/**
 * Bootstrap React + composition root.
 *
 * Le seul endroit où l'engine est instancié et exposé via Context.
 * Aucun composant ne fabrique d'engine local.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { composeEngine } from "./composition";
import { EngineProvider } from "@adapters/ui/hooks/useEngine";
import "./global.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Élément #root introuvable dans index.html");
}

const engine = composeEngine();

createRoot(container).render(
  <StrictMode>
    <EngineProvider engine={engine}>
      <App />
    </EngineProvider>
  </StrictMode>,
);
