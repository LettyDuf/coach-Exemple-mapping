/**
 * État de maîtrise par module (repris du modèle validé de Coach Risques).
 *
 * 4 états qualitatifs — pas de score numérique. La consolidation se
 * mérite par variation (items de signatures distinctes), pas par
 * répétition du même item (« farming »).
 */

import type { ModuleId } from "./ids";

export type MasteryLevel =
  | "non-commencee"
  | "effleuree"
  | "travaillee"
  | "consolidee";

export const MASTERY_LEVELS: ReadonlyArray<MasteryLevel> = [
  "non-commencee",
  "effleuree",
  "travaillee",
  "consolidee",
] as const;

/** Signature pédagogique d'un item — sert à mesurer la variation. */
export type ItemSignature = {
  readonly trapPattern: string;
  readonly theme: string;
};

export type ModuleMastery = {
  readonly module: ModuleId;
  readonly level: MasteryLevel;
};

export type MasteryState = ReadonlyArray<ModuleMastery>;
