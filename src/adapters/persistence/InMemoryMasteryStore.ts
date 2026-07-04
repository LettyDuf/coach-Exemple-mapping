/**
 * Adaptateur driven — store de maîtrise en mémoire.
 *
 * Seule implémentation en V1 (DECISIONS.md D5) : pas de persistance
 * entre sessions. À chaque rechargement, on repart à vide — choix
 * assumé pour un outil d'auto-formation utilisé ponctuellement avant
 * un atelier, pas pour un suivi de progression long terme.
 */

import type { MasteryStore, SuccessfulPass } from "@domain/index";

export function createInMemoryMasteryStore(): MasteryStore {
  const passes: SuccessfulPass[] = [];

  return {
    readAllPasses: () => [...passes],
    appendPass: (p) => {
      passes.push(p);
    },
  };
}
