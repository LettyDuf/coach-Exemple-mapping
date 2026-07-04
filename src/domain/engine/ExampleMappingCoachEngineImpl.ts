/**
 * Implémentation du port `ExampleMappingCoachEngine`.
 *
 * Orchestre les services internes, branche les ports de sortie, reste
 * découplé de l'UI.
 *
 * V1 : seul le module « Classification » est implémenté (ROADMAP.md).
 * Les modules suivants (Trame, Rôles, Rythme, Clôture, Préparation)
 * s'ajouteront par incréments successifs.
 */

import type {
  ContentItem,
  ContentRepository,
  ItemId,
  MasteryState,
  ModuleId,
  NextItemRequest,
  ExampleMappingCoachEngine,
} from "../index";
import { MODULES, type CardColor, type EvaluationResult } from "../index";
import type { MasteryStore } from "../ports/MasteryStore";
import type { Clock } from "../ports/Clock";
import type { RandomSource } from "../ports/RandomSource";
import { evaluateClassification } from "../services/ClassificationEvaluator";
import { computeMasteryLevel } from "../services/MasteryProgressor";
import type { ClassificationItem } from "@content/classification/types";

export type EngineDependencies = {
  readonly content: ContentRepository;
  readonly mastery: MasteryStore;
  readonly clock: Clock;
  readonly random: RandomSource;
};

const ALL_MODULES: ReadonlyArray<ModuleId> = [MODULES.CLASSIFICATION];

export function createExampleMappingCoachEngine(
  deps: EngineDependencies,
): ExampleMappingCoachEngine {
  function projectMastery(): MasteryState {
    const passes = deps.mastery.readAllPasses();
    return ALL_MODULES.map((module) => ({
      module,
      level: computeMasteryLevel(passes, module),
    }));
  }

  /**
   * Tirage favorisant la variation : sélectionne uniformément parmi
   * les items dont la signature `trapPattern` a été vue le moins.
   * Évite le farming (répéter le même item pour progresser).
   */
  function pickNextByLeastSeenSignature<T extends ContentItem>(
    module: ModuleId,
  ): ItemId | null {
    const items = deps.content.listByModule<T>(module);
    if (items.length === 0) return null;

    const passes = deps.mastery.readAllPasses();
    const seenCounts = new Map<string, number>();
    for (const p of passes) {
      const sig = p.signature.trapPattern;
      seenCounts.set(sig, (seenCounts.get(sig) ?? 0) + 1);
    }

    let minSeen = Infinity;
    const candidates: T[] = [];
    for (const item of items) {
      const seen = seenCounts.get(item.signature.trapPattern) ?? 0;
      if (seen < minSeen) {
        minSeen = seen;
        candidates.length = 0;
        candidates.push(item);
      } else if (seen === minSeen) {
        candidates.push(item);
      }
    }

    const picked = deps.random.pick(candidates);
    return picked.id;
  }

  return {
    evaluateClassification(itemId: ItemId, chosen: CardColor): EvaluationResult {
      const item = deps.content.findById<ClassificationItem>(itemId);
      if (!item) {
        return {
          feedback: { verdict: "wrong", message: "Item introuvable." },
          outcome: "miss",
        };
      }
      return evaluateClassification(item, chosen);
    },

    nextItem(request: NextItemRequest): ItemId | null {
      return pickNextByLeastSeenSignature<ClassificationItem>(request.module);
    },

    registerOutcome(
      module: ModuleId,
      itemId: ItemId,
      outcome: EvaluationResult,
    ): MasteryState {
      if (outcome.outcome === "success") {
        const item = deps.content.findById<ContentItem>(itemId);
        const signature = item?.signature ?? {
          trapPattern: "unknown",
          theme: "unknown",
        };
        deps.mastery.appendPass({ module, signature, at: deps.clock.now() });
      }
      return projectMastery();
    },

    getMasteryByModule(): MasteryState {
      return projectMastery();
    },
  };
}
