/**
 * Types du corpus « Classification » (module 0 — DOMAINE.md §1, §3).
 *
 * Chaque item porte :
 *  - l'extrait de conversation à classer ;
 *  - la couleur attendue (réponse juste) ;
 *  - sa justification pédagogique (visible en « voir le pourquoi ») ;
 *  - les messages de feedback pour chaque couleur erronée possible.
 *
 * Discipline (DECISIONS.md D7) : aucun message n'est généré par le
 * moteur. Tous les messages sont écrits en français par Lætitia dans
 * ce fichier. Le moteur sélectionne, ne formule jamais.
 */

import type { ContentItem } from "@domain/index";
import type { CardColor } from "@domain/index";

/**
 * Thème du scénario support. Un seul thème en V1 (la fixture
 * « Assurances Nordika » validée le 2026-07-03 — DOMAINE.md §3).
 * D'autres thèmes s'ajouteront avec de nouvelles fixtures
 * (DOMAINE.md §4, encore ouvert).
 */
export type ClassificationTheme = "assurance-libre-service";

export type ClassificationConfusionMessages = Partial<Record<CardColor, string>>;

export type ClassificationItem = ContentItem & {
  /** L'extrait de conversation libre que l'apprenant doit classer. */
  readonly statement: string;
  /** La bonne réponse. */
  readonly expected: CardColor;
  /** Argument pédagogique du « pourquoi cette catégorie » (visible à la demande). */
  readonly rationale: string;
  /** Messages structurés par couleur erronée. */
  readonly confusionMessages: ClassificationConfusionMessages;
  /** Thème du scénario (pour la diversité de pool). */
  readonly theme: ClassificationTheme;
};
