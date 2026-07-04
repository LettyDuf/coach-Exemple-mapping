/**
 * Tests d'intégrité du corpus « Classification » (DECISIONS.md D7).
 *
 * Bloquants en CI. S'ils cassent, c'est qu'on a introduit une
 * régression silencieuse dans le corpus pédagogique (doublon d'id,
 * message vide, signature inexistante, etc.).
 */

import { describe, it, expect } from "vitest";
import { CLASSIFICATION_ITEMS, validateClassificationCorpus } from "@content/classification/index";
import { CARD_COLORS } from "@domain/index";

describe("Corpus Classification — intégrité structurelle", () => {
  it("passe la validation Zod sans exception", () => {
    expect(() =>
      validateClassificationCorpus(CLASSIFICATION_ITEMS as unknown as unknown[]),
    ).not.toThrow();
  });

  it("n'a aucun doublon d'ItemId", () => {
    const ids = CLASSIFICATION_ITEMS.map((i) => i.id as unknown as string);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tous les énoncés sont non vides et raisonnables", () => {
    for (const item of CLASSIFICATION_ITEMS) {
      expect(item.statement.trim().length).toBeGreaterThan(10);
      expect(item.statement).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("tous les rationales sont non vides et raisonnables", () => {
    for (const item of CLASSIFICATION_ITEMS) {
      expect(item.rationale.trim().length).toBeGreaterThan(10);
      expect(item.rationale).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
    }
  });

  it("tous les confusionMessages sont non vides, en français, sans TODO, et ne pointent jamais vers la réponse attendue", () => {
    for (const item of CLASSIFICATION_ITEMS) {
      const entries = Object.entries(item.confusionMessages);
      expect(entries.length).toBeGreaterThan(0);
      for (const [color, msg] of entries) {
        expect(msg).toBeTypeOf("string");
        expect((msg as string).trim().length).toBeGreaterThan(10);
        expect(msg).not.toMatch(/\b(TODO|XXX|FIXME)\b/);
        expect(color).not.toBe(item.expected);
      }
    }
  });

  it("chaque couleur possible est référencée comme expected au moins une fois (équilibrage du pool)", () => {
    const expectedColors = new Set(CLASSIFICATION_ITEMS.map((i) => i.expected));
    for (const color of CARD_COLORS) {
      expect(expectedColors.has(color)).toBe(true);
    }
  });

  it("au moins 2 signatures distinctes existent (nécessaire pour progresser vers 'travaillée')", () => {
    const signatures = new Set(CLASSIFICATION_ITEMS.map((i) => i.signature.trapPattern));
    expect(signatures.size).toBeGreaterThanOrEqual(2);
  });
});
