/**
 * Corpus du module « Classification ».
 *
 * Tous les items sont dérivés de la fixture « Assurances Nordika »
 * validée par Lætitia le 2026-07-03 (DOMAINE.md §3). Une deuxième
 * fixture (autre thème) reste à construire avec elle pour varier le
 * pool (DOMAINE.md §4, encore ouvert).
 */

import { MODULES, ItemId } from "@domain/index";
import type { ClassificationItem } from "./types";

export const CLASSIFICATION_ITEMS: ReadonlyArray<ClassificationItem> = [
  {
    id: ItemId("class-001"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "story-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Je veux déclarer un sinistre dégât d'eau directement dans le portail, pour obtenir un dossier ouvert sans attendre un agent.",
    expected: "story",
    rationale:
      "C'est le sujet de la conversation — on ne sait pas encore quelles contraintes s'appliquent, juste ce qu'on veut permettre au client.",
    confusionMessages: {
      rule: "C'est trop général pour être une règle : ça ne dit encore aucune contrainte précise à respecter.",
      example:
        "Il manque une situation concrète (une date, un contrat précis) pour que ce soit un exemple.",
    },
  },
  {
    id: ItemId("class-002"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "rule-vs-example", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement: "Le contrat doit être actif au moment de la déclaration.",
    expected: "rule",
    rationale:
      "Énoncé général et abstrait, sans valeur concrète (pas de date, pas de nom) — une vraie règle.",
    confusionMessages: {
      example:
        "Aucune donnée concrète n'est citée ici (pas de date, pas de nom) — ce n'est pas encore un exemple, juste la contrainte générale.",
      question: "On connaît déjà la réponse ici : ce n'est pas une inconnue.",
    },
  },
  {
    id: ItemId("class-003"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "example-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Le contrat a été résilié il y a 2 semaines : le portail refuse et redirige vers un agent.",
    expected: "example",
    rationale:
      "Concret et nommé — une donnée précise (2 semaines), une situation identifiable, façon épisode de Friends.",
    confusionMessages: {
      rule: "C'est une illustration d'une règle, pas la règle elle-même — la règle générale serait « le contrat doit être actif ».",
    },
  },
  {
    id: ItemId("class-004"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "question-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Quel est le délai maximal entre l'incident et la déclaration pour rester recevable ?",
    expected: "question",
    rationale:
      "Personne ne connaît la réponse dans la salle — exactement ce qu'une carte rouge doit capturer, avant de mettre de côté et d'avancer.",
    confusionMessages: {
      rule: "Une règle affirme une contrainte connue ; ici, personne ne sait la réponse — donc ce n'est pas encore une règle.",
    },
  },
  {
    id: ItemId("class-005"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "rule-vs-example", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Le type de sinistre doit être couvert par la police pour permettre l'ouverture autonome.",
    expected: "rule",
    rationale: "Contrainte générale, sans sinistre précis cité — une règle.",
    confusionMessages: {
      example: "Aucun sinistre précis n'est nommé ici, donc ce n'est pas encore un exemple.",
    },
  },
  {
    id: ItemId("class-006"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "example-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Un sinistre « vol » non couvert par cette police fait basculer le client vers un contact agent.",
    expected: "example",
    rationale:
      "Situation concrète et nommée (un type de sinistre précis) illustrant la règle de couverture.",
    confusionMessages: {
      rule: "C'est un cas particulier, pas l'énoncé général de la règle de couverture.",
    },
  },
  {
    id: ItemId("class-007"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "rule-vs-example", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Le dossier doit contenir un minimum d'informations factuelles pour être recevable.",
    expected: "rule",
    rationale: "Contrainte générale sur la recevabilité, sans cas précis cité — une règle.",
    confusionMessages: {
      example: "Aucune situation précise n'est décrite ici, donc ce n'est pas encore un exemple.",
    },
  },
  {
    id: ItemId("class-008"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "example-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "La date de l'incident est manquante : la soumission est bloquée et un complément est demandé.",
    expected: "example",
    rationale:
      "Situation concrète illustrant la règle de recevabilité — un cas précis, pas l'énoncé général.",
    confusionMessages: {
      rule: "C'est un cas particulier de la règle de recevabilité, pas la règle elle-même.",
    },
  },
  {
    id: ItemId("class-009"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "question-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Le client peut-il corriger sa déclaration après soumission, ou doit-il appeler un agent pour toute modification ?",
    expected: "question",
    rationale:
      "Vraie inconnue métier, pas un désaccord d'opinion — à capturer et mettre de côté plutôt qu'à débattre en boucle.",
    confusionMessages: {
      rule: "Une règle affirme une réponse connue ; ici, la réponse n'est pas encore tranchée.",
    },
  },
  {
    id: ItemId("class-010"),
    module: MODULES.CLASSIFICATION,
    signature: { trapPattern: "story-vs-rule", theme: "assurance-libre-service" },
    theme: "assurance-libre-service",
    statement:
      "Permettre au client de suivre l'état d'avancement de son dossier après ouverture.",
    expected: "story",
    rationale:
      "C'est une nouvelle story découpée et mise de côté — pas une règle ni un exemple du sujet initial.",
    confusionMessages: {
      rule: "Ce n'est pas une contrainte sur la story en cours, c'est un sujet différent, à traiter plus tard.",
    },
  },
] as const;
