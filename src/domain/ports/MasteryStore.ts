/**
 * Port de sortie (driven) — suivi de la progression.
 *
 * Le domaine ignore si on garde cet état en mémoire ou ailleurs.
 * V1 : seul un store en mémoire existe (DECISIONS.md D5 — pas de
 * persistance entre sessions en V1).
 */

import type { ModuleId } from "../valueObjects/ids";
import type { ItemSignature } from "../valueObjects/Mastery";

/** Trace minimale d'un exercice réussi : sur quel module, quelle signature, quand. */
export type SuccessfulPass = {
  readonly module: ModuleId;
  readonly signature: ItemSignature;
  readonly at: number; // epoch ms (fourni par Clock pour testabilité)
};

export type MasteryStore = {
  /** Toutes les passes réussies de la session courante. */
  readAllPasses(): ReadonlyArray<SuccessfulPass>;

  /** Ajoute une passe. */
  appendPass(pass: SuccessfulPass): void;
};
