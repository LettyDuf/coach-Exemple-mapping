/**
 * Brique élémentaire de tout feedback du domaine.
 *
 * Principe repris de Coach Risques (D15 là-bas) : « le moteur ne
 * formule pas, il sélectionne ». Tout `message` est écrit en français
 * par Lætitia dans le corpus ; le moteur choisit lequel renvoyer selon
 * la production de l'apprenant.
 *
 * Les tests d'intégrité du corpus vérifient que tous les messages sont
 * non vides, en français, et ne contiennent pas TODO/XXX.
 */

export type FeedbackVerdict = "ok" | "wrong";

export type Feedback = {
  readonly verdict: FeedbackVerdict;
  readonly message: string;
};

/** Résultat d'une évaluation d'item (un exercice, une réponse donnée). */
export type EvaluationResult = {
  readonly feedback: Feedback;
  readonly outcome: "success" | "miss";
};
