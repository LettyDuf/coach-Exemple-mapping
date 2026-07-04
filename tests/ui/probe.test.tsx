import { describe, it, expect } from "vitest";

/**
 * Fichier residuel : utilise une seule fois pour sonder l'item selectionne
 * par le moteur avec la graine de test (seed=1), non supprimable depuis le
 * bac a sable (EPERM sur unlink, meme limite que documentee dans STATUS.md
 * pour ClassificationBoard.a11y.test.tsx.bak). Garde un test trivial pour
 * ne pas casser la suite ; a supprimer manuellement si souhaite.
 */
describe("probe (residuel, inoffensif)", () => {
  it("ne fait rien d'utile", () => {
    expect(true).toBe(true);
  });
});
