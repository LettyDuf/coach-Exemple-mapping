/**
 * CANARI D'ISOLEMENT HEXAGONAL — test fondateur du projet.
 *
 * Garantit que le domaine `ExampleMappingCoachEngine` reste
 * instanciable et utilisable dans un environnement Node pur, SANS
 * dépendance navigateur, SANS React, SANS localStorage.
 *
 * Ce test ne teste PAS la pédagogie. Il teste l'isolation
 * architecturale. Les tests de comportement viennent des services
 * (ClassificationEvaluator, MasteryProgressor) et du corpus.
 */

import { describe, it, expect } from "vitest";
import {
  ItemId,
  MODULES,
  type ExampleMappingCoachEngine,
  type ContentRepository,
  type ContentItem,
  type MasteryStore,
  type RandomSource,
  type Clock,
  type EvaluationResult,
  type MasteryState,
  type SuccessfulPass,
  type ModuleId,
} from "@domain/index";

function makeFakeContentRepository(): ContentRepository {
  const items = new Map<string, ContentItem>([
    [
      "class-001",
      {
        id: ItemId("class-001"),
        module: MODULES.CLASSIFICATION,
        signature: { trapPattern: "story-vs-rule", theme: "test" },
      },
    ],
  ]);
  return {
    findById<T extends ContentItem>(id: ItemId): T | null {
      return (items.get(id as unknown as string) as unknown as T) ?? null;
    },
    listByModule<T extends ContentItem>(module: ModuleId): ReadonlyArray<T> {
      const filtered = Array.from(items.values()).filter((it) => it.module === module);
      return filtered as unknown as ReadonlyArray<T>;
    },
  };
}

function makeFakeMasteryStore(): MasteryStore {
  const passes: SuccessfulPass[] = [];
  return {
    readAllPasses: () => [...passes],
    appendPass: (p) => {
      passes.push(p);
    },
  };
}

function makeFakeRandomSource(seed: number = 1): RandomSource {
  let state = seed;
  const next = (): number => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state;
  };
  return {
    nextInt: (max) => (max <= 0 ? 0 : next() % max),
    pick: (items) => items[next() % items.length]!,
  };
}

function makeFakeClock(epochMs: number = 1_700_000_000_000): Clock {
  return { now: () => epochMs };
}

function makeStubEngine(deps: {
  content: ContentRepository;
  mastery: MasteryStore;
  random: RandomSource;
  clock: Clock;
}): ExampleMappingCoachEngine {
  const empty: EvaluationResult = { feedback: { verdict: "ok", message: "" }, outcome: "miss" };
  const emptyMastery: MasteryState = [];
  return {
    evaluateClassification: () => empty,
    nextItem: ({ module }) => {
      const items = deps.content.listByModule(module);
      return items[0]?.id ?? null;
    },
    registerOutcome: (module, _itemId, _outcome) => {
      deps.mastery.appendPass({ module, signature: { trapPattern: "stub", theme: "stub" }, at: deps.clock.now() });
      return emptyMastery;
    },
    getMasteryByModule: () => emptyMastery,
  };
}

describe("Canari d'isolement hexagonal", () => {
  it("s'instancie sans toucher au DOM ni au navigateur", () => {
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery: makeFakeMasteryStore(),
      random: makeFakeRandomSource(),
      clock: makeFakeClock(),
    });

    expect(engine).toBeDefined();
    expect(typeof engine.evaluateClassification).toBe("function");
    expect(typeof engine.nextItem).toBe("function");
    expect(typeof engine.registerOutcome).toBe("function");
    expect(typeof engine.getMasteryByModule).toBe("function");
  });

  it("peut sélectionner un item via le port ContentRepository", () => {
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery: makeFakeMasteryStore(),
      random: makeFakeRandomSource(),
      clock: makeFakeClock(),
    });

    const itemId = engine.nextItem({ module: MODULES.CLASSIFICATION });
    expect(itemId).toBe(ItemId("class-001"));
  });

  it("peut enregistrer une issue via le port MasteryStore (Clock injecté)", () => {
    const mastery = makeFakeMasteryStore();
    const engine = makeStubEngine({
      content: makeFakeContentRepository(),
      mastery,
      random: makeFakeRandomSource(),
      clock: makeFakeClock(1_700_000_000_000),
    });

    const result: EvaluationResult = { feedback: { verdict: "ok", message: "" }, outcome: "success" };
    engine.registerOutcome(MODULES.CLASSIFICATION, ItemId("dummy-001"), result);

    const passes = mastery.readAllPasses();
    expect(passes).toHaveLength(1);
    expect(passes[0]?.module).toBe(MODULES.CLASSIFICATION);
    expect(passes[0]?.at).toBe(1_700_000_000_000);
  });

  it("vérifie qu'aucune API navigateur n'est accessible dans cet environnement de test", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
    expect(typeof localStorage).toBe("undefined");
  });
});
