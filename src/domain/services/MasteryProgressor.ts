/**
 * MasteryProgressor — calcule l'état qualitatif de maîtrise d'un
 * module à partir de l'historique des passes réussies.
 *
 * Modèle et seuils repris tels quels de Coach Risques (pattern déjà
 * validé — DECISIONS.md D9) : à ajuster ensemble une fois qu'on aura
 * du recul sur l'usage réel de ce module.
 *
 * Règle « consolidée par variation » : on ne marque pas un module
 * comme acquis sur la base de la rejouabilité d'un même item. Il faut
 * des réussites sur des items de signatures distinctes.
 *
 * Seuils V1 (ajustables après pilote) :
 *   - non-commencée  : 0 réussite
 *   - effleurée      : ≥ 1 réussite
 *   - travaillée     : ≥ 3 réussites OU ≥ 2 signatures distinctes
 *   - consolidée     : ≥ 5 réussites ET ≥ 3 signatures distinctes
 */

import type { MasteryLevel } from "../valueObjects/Mastery";
import type { SuccessfulPass } from "../ports/MasteryStore";
import type { ModuleId } from "../valueObjects/ids";

export type Seuils = {
  readonly effleureeMin: number;
  readonly travailleeMin: number;
  readonly travailleeSignaturesMin: number;
  readonly consolideeMin: number;
  readonly consolideeSignaturesMin: number;
};

export const SEUILS_V1: Seuils = {
  effleureeMin: 1,
  travailleeMin: 3,
  travailleeSignaturesMin: 2,
  consolideeMin: 5,
  consolideeSignaturesMin: 3,
};

export function computeMasteryLevel(
  passes: ReadonlyArray<SuccessfulPass>,
  module: ModuleId,
  seuils: Seuils = SEUILS_V1,
): MasteryLevel {
  const modulePasses = passes.filter((p) => p.module === module);
  const count = modulePasses.length;

  if (count === 0) return "non-commencee";

  const distinctSignatures = new Set(
    modulePasses.map((p) => p.signature.trapPattern),
  );
  const signatureCount = distinctSignatures.size;

  if (
    count >= seuils.consolideeMin &&
    signatureCount >= seuils.consolideeSignaturesMin
  ) {
    return "consolidee";
  }

  if (
    count >= seuils.travailleeMin ||
    signatureCount >= seuils.travailleeSignaturesMin
  ) {
    return "travaillee";
  }

  if (count >= seuils.effleureeMin) return "effleuree";

  return "non-commencee";
}
