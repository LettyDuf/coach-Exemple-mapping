/**
 * Adaptateur driven — accès au corpus pédagogique bundlé.
 *
 * V1 : tout le corpus est embarqué côté client (TS bundlé par Vite).
 * Plus tard, on pourra charger depuis un endpoint sans changer le
 * port `ContentRepository` ni le domaine.
 *
 * Discipline (DECISIONS.md D7) : le domaine ignore complètement cette
 * implémentation. Si demain on bascule sur fetch(), le canari ne
 * bouge pas et les tests d'intégrité non plus.
 */

import type { ContentItem, ContentRepository, ItemId, ModuleId } from "@domain/index";
import { CLASSIFICATION_ITEMS } from "@content/index";
import { validateClassificationCorpus } from "@content/classification/schema";

type AnyItem = ContentItem;

function buildIndex(): Map<string, AnyItem> {
  const index = new Map<string, AnyItem>();

  // Validation Zod du corpus à la construction — échec bruyant si schéma cassé.
  const classificationItems = validateClassificationCorpus(
    CLASSIFICATION_ITEMS as unknown as unknown[],
  );

  const allItems: ReadonlyArray<AnyItem> =
    classificationItems as unknown as ReadonlyArray<AnyItem>;

  for (const item of allItems) {
    const key = item.id as unknown as string;
    if (index.has(key)) {
      throw new Error(`Doublon d'ItemId détecté : ${key}`);
    }
    index.set(key, item);
  }

  return index;
}

export function createContentRepository(): ContentRepository {
  const index = buildIndex();
  const ordered = Array.from(index.values());

  return {
    findById<T extends ContentItem>(id: ItemId): T | null {
      const found = index.get(id as unknown as string);
      return (found as unknown as T) ?? null;
    },
    listByModule<T extends ContentItem>(module: ModuleId): ReadonlyArray<T> {
      const filtered = ordered.filter((it) => it.module === module);
      return filtered as unknown as ReadonlyArray<T>;
    },
  };
}
