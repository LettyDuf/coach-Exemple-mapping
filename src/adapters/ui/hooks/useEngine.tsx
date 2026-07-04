/**
 * Contexte React pour exposer l'engine à toute l'UI.
 *
 * Discipline : un seul engine pour toute l'app (instancié en
 * composition root), passé via Context. Aucun composant ne fabrique
 * d'engine localement.
 */

import { createContext, useContext, type ReactNode } from "react";
import type { ExampleMappingCoachEngine } from "@domain/index";

const EngineContext = createContext<ExampleMappingCoachEngine | null>(null);

export function EngineProvider(props: {
  engine: ExampleMappingCoachEngine;
  children: ReactNode;
}) {
  return (
    <EngineContext.Provider value={props.engine}>
      {props.children}
    </EngineContext.Provider>
  );
}

export function useEngine(): ExampleMappingCoachEngine {
  const engine = useContext(EngineContext);
  if (!engine) {
    throw new Error(
      "useEngine doit être appelé à l'intérieur d'un <EngineProvider>.",
    );
  }
  return engine;
}
