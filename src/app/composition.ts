/**
 * Composition root — le SEUL endroit où on branche le domaine aux
 * adaptateurs concrets.
 *
 * Store de maîtrise en mémoire (DECISIONS.md D5) : pas de persistance
 * entre sessions en V1.
 */

import { createExampleMappingCoachEngine } from "@domain/engine/ExampleMappingCoachEngineImpl";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { createInMemoryMasteryStore } from "@adapters/persistence/InMemoryMasteryStore";
import { createSystemClock } from "@adapters/persistence/SystemClock";
import { createBrowserRandomSource } from "@adapters/persistence/BrowserRandomSource";
import type { ExampleMappingCoachEngine } from "@domain/index";

export function composeEngine(): ExampleMappingCoachEngine {
  return createExampleMappingCoachEngine({
    content: createContentRepository(),
    mastery: createInMemoryMasteryStore(),
    clock: createSystemClock(),
    random: createBrowserRandomSource(),
  });
}
