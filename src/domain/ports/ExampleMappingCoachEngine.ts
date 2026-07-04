/**
 * Port d'entrée (driving) — façade unique du domaine.
 *
 * C'est ce que l'UI (et le canari Node) appellent. L'orchestration
 * intérieure (sélection d'items, application des règles, mise à jour
 * de la maîtrise) reste invisible au monde extérieur. La signature
 * est stable : on ajoute, on ne casse pas.
 */

import type { ItemId, ModuleId } from "../valueObjects/ids";
import type { CardColor } from "../valueObjects/CardColor";
import type { EvaluationResult } from "../valueObjects/Feedback";
import type { MasteryState } from "../valueObjects/Mastery";

export type NextItemRequest = {
  readonly module: ModuleId;
};

export type ExampleMappingCoachEngine = {
  /**
   * Module « Classification » — reconnaître si un extrait de
   * conversation est une story, une règle, un exemple ou une question.
   */
  evaluateClassification(itemId: ItemId, chosen: CardColor): EvaluationResult;

  /** Sélection du prochain item pour un module donné. */
  nextItem(request: NextItemRequest): ItemId | null;

  /** Enregistre l'issue d'un exercice et renvoie l'état de maîtrise mis à jour. */
  registerOutcome(
    module: ModuleId,
    itemId: ItemId,
    outcome: EvaluationResult,
  ): MasteryState;

  /** Projection courante de la maîtrise (lecture seule). */
  getMasteryByModule(): MasteryState;
};
