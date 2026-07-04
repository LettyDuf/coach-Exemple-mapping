/**
 * Schéma Zod pour valider la forme d'un ClassificationItem au
 * chargement.
 *
 * Garde-fou « contenu pédagogique externalisé » (DECISIONS.md D7) :
 * si un item est mal formé, on échoue bruyamment (chargement), jamais
 * silencieusement (pas de fallback).
 *
 * Les tests d'intégrité du corpus (`tests/corpus/`) appellent ce
 * schéma pour garantir la non-régression.
 */

import { z } from "zod";
import { CARD_COLORS, MODULES } from "@domain/index";

const cardColorSchema = z.enum(CARD_COLORS as readonly [string, ...string[]]);

const themeSchema = z.enum(["assurance-libre-service"]);

const signatureSchema = z.object({
  trapPattern: z.string().min(1),
  theme: z.string().min(1),
});

/** Le module attendu pour un ClassificationItem est strictement MODULES.CLASSIFICATION. */
const moduleSchema = z.literal(MODULES.CLASSIFICATION as unknown as string);

export const classificationItemSchema = z.object({
  id: z.string().min(1),
  module: moduleSchema,
  signature: signatureSchema,
  statement: z.string().min(10, "L'extrait doit faire au moins 10 caractères."),
  expected: cardColorSchema,
  rationale: z.string().min(10, "La justification pédagogique est trop courte."),
  confusionMessages: z
    .record(cardColorSchema, z.string().min(10))
    .refine((m) => Object.keys(m).length >= 1, {
      message: "Au moins un message de feedback est requis.",
    }),
  theme: themeSchema,
});

export type ClassificationItemRaw = z.infer<typeof classificationItemSchema>;

export function validateClassificationCorpus(
  items: unknown[],
): ClassificationItemRaw[] {
  return items.map((item, idx) => {
    const result = classificationItemSchema.safeParse(item);
    if (!result.success) {
      throw new Error(
        `Item de classification invalide à l'index ${idx} : ${result.error.message}`,
      );
    }
    return result.data;
  });
}
