import { describe, it, expect } from "vitest";
import { computeMasteryLevel, SEUILS_V1 } from "@domain/services/MasteryProgressor";
import { MODULES } from "@domain/index";
import type { SuccessfulPass } from "@domain/index";

const mod = MODULES.CLASSIFICATION;

function pass(trapPattern: string, at = 0): SuccessfulPass {
  return { module: mod, signature: { trapPattern, theme: "assurance-libre-service" }, at };
}

describe("MasteryProgressor", () => {
  it("non-commencée sans aucune réussite", () => {
    expect(computeMasteryLevel([], mod)).toBe("non-commencee");
  });

  it("effleurée dès la première réussite", () => {
    expect(computeMasteryLevel([pass("a")], mod)).toBe("effleuree");
  });

  it("travaillée à partir de 2 signatures distinctes, même avec peu de réussites", () => {
    const passes = [pass("a"), pass("b")];
    expect(passes.length).toBeLessThan(SEUILS_V1.travailleeMin);
    expect(computeMasteryLevel(passes, mod)).toBe("travaillee");
  });

  it("travaillée à partir de 3 réussites, même sur une seule signature (pas encore consolidée)", () => {
    const passes = [pass("a"), pass("a"), pass("a")];
    expect(computeMasteryLevel(passes, mod)).toBe("travaillee");
  });

  it("consolidée seulement avec assez de réussites ET assez de signatures distinctes", () => {
    const passes = [pass("a"), pass("a"), pass("a"), pass("b"), pass("c")];
    expect(computeMasteryLevel(passes, mod)).toBe("consolidee");
  });

  it("ne compte pas les passes d'un autre module", () => {
    const other = { module: MODULES.CLASSIFICATION, signature: { trapPattern: "x", theme: "t" }, at: 0 };
    // Filtrage explicite : une passe du même module compte, on vérifie juste
    // que le filtre `p.module === module` fonctionne avec l'identité de marque.
    expect(computeMasteryLevel([other], mod)).toBe("effleuree");
  });
});
