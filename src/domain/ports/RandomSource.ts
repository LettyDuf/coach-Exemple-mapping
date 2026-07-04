/**
 * Port de sortie (driven) — source de hasard injectée.
 *
 * Le domaine n'utilise JAMAIS `Math.random()` directement, sinon les
 * tests deviennent non déterministes. En tests on injecte une source
 * à graine fixe.
 */
export type RandomSource = {
  /** Entier dans [0, max) avec distribution uniforme. */
  nextInt(max: number): number;

  /** Pick un élément au hasard parmi une liste non vide. */
  pick<T>(items: ReadonlyArray<T>): T;
};
