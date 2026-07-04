/**
 * Point d'entrée public du domaine.
 *
 * Tout ce qui est exporté ici est accessible par les adaptateurs et
 * l'app. Le reste reste privé au domaine.
 */

// Value objects
export * from "./valueObjects/ids";
export * from "./valueObjects/CardColor";
export * from "./valueObjects/Feedback";
export * from "./valueObjects/Mastery";

// Ports
export type {
  ExampleMappingCoachEngine,
  NextItemRequest,
} from "./ports/ExampleMappingCoachEngine";
export type { ContentRepository, ContentItem } from "./ports/ContentRepository";
export type { MasteryStore, SuccessfulPass } from "./ports/MasteryStore";
export type { RandomSource } from "./ports/RandomSource";
export type { Clock } from "./ports/Clock";
