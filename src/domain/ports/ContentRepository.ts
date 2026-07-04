/**
 * Port de sortie (driven) — accès au corpus pédagogique.
 *
 * Le domaine ignore où vit le corpus (JSON bundlé, fichier, futur
 * back-end). Il demande des items par module et reçoit des objets
 * typés. Le contenu lui-même est externalisé (DECISIONS.md D7).
 */

import type { ItemId, ModuleId } from "../valueObjects/ids";

/**
 * Item neutre côté domaine — chaque module étend cette base avec ses
 * propres champs dans `src/content/<module>/types.ts`.
 */
export type ContentItem = {
  readonly id: ItemId;
  readonly module: ModuleId;
  readonly signature: { readonly trapPattern: string; readonly theme: string };
};

export type ContentRepository = {
  /** Récupère un item par identifiant. `null` si inconnu (jamais d'exception au domaine). */
  findById<T extends ContentItem>(id: ItemId): T | null;

  /** Liste tous les items d'un module. Ordre stable (utile aux tests). */
  listByModule<T extends ContentItem>(module: ModuleId): ReadonlyArray<T>;
};
