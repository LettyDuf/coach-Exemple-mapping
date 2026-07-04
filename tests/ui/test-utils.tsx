/**
 * Helpers de test communs aux écrans React.
 *
 * `renderWithEngine` monte un composant en injectant un engine
 * construit à partir d'un store mastery en mémoire et d'une source de
 * hasard à graine fixe (déterminisme).
 */

import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { EngineProvider } from "@adapters/ui/hooks/useEngine";
import { createExampleMappingCoachEngine } from "@domain/engine/ExampleMappingCoachEngineImpl";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { createSeededRandomSource } from "@adapters/persistence/BrowserRandomSource";
import type { ExampleMappingCoachEngine } from "@domain/index";

export type TestEngineBundle = {
  engine: ExampleMappingCoachEngine;
};

export function makeTestEngine(seed: number = 1): TestEngineBundle {
  const engine = createExampleMappingCoachEngine({
    content: createContentRepository(),
    mastery: createInMemoryMasteryStore(),
    clock: { now: () => 1_700_000_000_000 },
    random: createSeededRandomSource(seed),
  });
  return { engine };
}

export function renderWithEngine(
  ui: ReactElement,
  seed: number = 1,
): RenderResult & TestEngineBundle {
  const bundle = makeTestEngine(seed);
  const result = render(<EngineProvider engine={bundle.engine}>{ui}</EngineProvider>);
  return { ...result, engine: bundle.engine };
}
