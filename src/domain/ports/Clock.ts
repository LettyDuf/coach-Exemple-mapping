/**
 * Port de sortie (driven) — horloge injectée.
 *
 * Le domaine n'utilise JAMAIS `Date.now()` directement, sinon les
 * tests deviennent fragiles. En tests on injecte une horloge fixe.
 */
export type Clock = {
  now(): number; // epoch ms
};
