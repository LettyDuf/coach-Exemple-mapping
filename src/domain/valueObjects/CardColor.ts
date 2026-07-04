/**
 * Les 4 couleurs canoniques de l'Example Mapping (DOMAINE.md §1).
 *
 * Ces valeurs ne sont pas décoratives : elles portent la grammaire de
 * la technique (story / règle / exemple / question). Le domaine ne
 * connaît que ces identifiants ; le rendu visuel (couleur, icône,
 * forme de carte) est une responsabilité de l'adaptateur UI (voir
 * UX-UI.md — différenciation par forme pour éviter la collision avec
 * Coach Objectifs).
 */
export type CardColor = "story" | "rule" | "example" | "question";

export const CARD_COLORS: ReadonlyArray<CardColor> = [
  "story",
  "rule",
  "example",
  "question",
] as const;
