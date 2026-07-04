import { describe, it, expect } from "vitest";
import { evaluateClassification } from "@domain/services/ClassificationEvaluator";
import type { ClassificationQuestion } from "@domain/services/ClassificationEvaluator";

const question: ClassificationQuestion = {
  expected: "rule",
  rationale: "Énoncé général, sans valeur concrète — une règle.",
  confusionMessages: {
    example: "Message ciblé pour la confusion règle/exemple.",
  },
};

describe("ClassificationEvaluator", () => {
  it("renvoie un succès avec la justification quand la réponse est correcte", () => {
    const result = evaluateClassification(question, "rule");
    expect(result.outcome).toBe("success");
    expect(result.feedback.verdict).toBe("ok");
    expect(result.feedback.message).toBe(question.rationale);
  });

  it("renvoie le message ciblé quand un message de confusion existe pour la réponse donnée", () => {
    const result = evaluateClassification(question, "example");
    expect(result.outcome).toBe("miss");
    expect(result.feedback.verdict).toBe("wrong");
    expect(result.feedback.message).toBe("Message ciblé pour la confusion règle/exemple.");
  });

  it("retombe sur le message générique quand aucun message ciblé n'existe", () => {
    const result = evaluateClassification(question, "question");
    expect(result.outcome).toBe("miss");
    expect(result.feedback.message).toMatch(/Ce n'est pas une question/);
  });
});
