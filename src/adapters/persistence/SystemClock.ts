/**
 * Adaptateur driven — horloge système réelle.
 *
 * Utilisé en production. En tests, on injecte une horloge fixe.
 */

import type { Clock } from "@domain/index";

export function createSystemClock(): Clock {
  return { now: () => Date.now() };
}
