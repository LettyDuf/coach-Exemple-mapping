/**
 * Service de domaine — évaluation d'une classification de carte
 * (DOMAINE.md §1 — le prérequis règle vs exemple).
 *
 * Stateless. Reçoit un item et une couleur choisie, retourne un
 * EvaluationResult. Toute formulation de feedback vient de l'item
 * (DECISIONS.md D7). Le service ne formule jamais.
 *
 * Note hexagonale : ce service ne connaît PAS la source des items
 * (ContentRepository est utilisé en amont, par l'engine). Il opère
 * sur une structure déjà chargée et validée.
 */

import type { CardColor } from "../valueObjects/CardColor";
import type { EvaluationResult } from "../valueObjects/Feedback";

/**
 * Interface minimale attendue par le service. On la duplique ici (au
 * lieu d'importer le ClassificationItem du corpus) pour garder le
 * domaine indépendant de la couche contenu — le contenu étend cette
 * interface dans `content/classification/types.ts`.
 */
export type ClassificationQuestion = {
  readonly expected: CardColor;
  readonly rationale: string;
  readonly confusionMessages: Partial<Record<CardColor, string>>;
};

/** Fallback générique quand l'item ne fournit pas de message pour la confusion donnée. */
const GENERIC_WRONG_FEEDBACK: Record<CardColor, string> = {
  story:
    "Ce n'est pas la story — la story pose le sujet de la conversation, elle ne décrit ni contrainte ni cas concret.",
  rule: "Ce n'est pas une règle — une règle est un énoncé général, sans valeur concrète (pas de date, pas de montant, pas de nom).",
  example:
    "Ce n'est pas un exemple — un exemple est une situation concrète et nommée, avec des données précises.",
  question:
    "Ce n'est pas une question — une question capture une inconnue, pas une affirmation ou une contrainte déjà admise.",
};

export function evaluateClassification(
  question: ClassificationQuestion,
  chosen: CardColor,
): EvaluationResult {
  if (chosen === question.expected) {
    return {
      feedback: { verdict: "ok", message: question.rationale },
      outcome: "success",
    };
  }

  const tailored = question.confusionMessages[chosen];
  const message = tailored ?? GENERIC_WRONG_FEEDBACK[chosen];

  return {
    feedback: { verdict: "wrong", message },
    outcome: "miss",
  };
}
