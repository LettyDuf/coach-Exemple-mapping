/**
 * Test d'accessibilité WCAG 2.1 AA — garde-fou (UX-UI.md).
 *
 * axe-core scanne les violations courantes : sémantique ARIA,
 * structure, labels. Les contrastes réels restent à valider à l'œil +
 * outil de design (axe en jsdom ne rend pas les pixels).
 */

import { describe, it, expect, beforeEach } from "vitest";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import ClassificationBoard from "@adapters/ui/classification/ClassificationBoard";
import { renderWithEngine } from "./test-utils";

expect.extend(matchers);

beforeEach(() => {
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
});

describe("Accessibilité — ClassificationBoard", () => {
  it("ne déclenche aucune violation axe-core", async () => {
    const { container } = renderWithEngine(<ClassificationBoard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
