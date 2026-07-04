/**
 * Identifiants typés du domaine.
 *
 * Brand types : on évite de confondre un `ItemId` avec un `ModuleId`
 * au niveau du compilateur, sans coût à l'exécution.
 */

declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

export type ItemId = Brand<string, "ItemId">;
export type ModuleId = Brand<string, "ModuleId">;

export const ItemId = (raw: string): ItemId => raw as ItemId;
export const ModuleId = (raw: string): ModuleId => raw as ModuleId;

/**
 * Modules du parcours Apprendre (ROADMAP.md).
 *
 * V1 n'implémente que CLASSIFICATION (le prérequis absolu : distinguer
 * une règle d'un exemple — DOMAINE.md §1). Les autres modules
 * (TRAME, ROLES, RYTHME, CLOTURE, PREPARATION) arrivent par incréments
 * successifs ; on ne les déclare pas avant d'avoir du contenu réel
 * pour eux (pas d'abstraction prématurée).
 */
export const MODULES = {
  CLASSIFICATION: ModuleId("classification"),
} as const;
