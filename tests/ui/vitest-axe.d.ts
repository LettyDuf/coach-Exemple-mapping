/**
 * Déclaration de types pour étendre les matchers vitest avec ceux de
 * vitest-axe (accessibilité). Sans cette déclaration, tsc ne reconnaît
 * pas `toHaveNoViolations` même si les tests passent au runtime.
 */

import "vitest";

interface AxeMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare module "vitest" {
  interface Assertion<T = unknown> extends AxeMatchers<T> {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
