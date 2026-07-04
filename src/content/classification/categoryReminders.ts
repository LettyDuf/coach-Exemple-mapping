/**
 * Rappels pédagogiques par catégorie de carte (module Classification).
 *
 * Contenu externalisé (DECISIONS.md D7) : ces libellés et définitions
 * sont du contenu pédagogique validé par Lætitia, jamais codés en dur
 * dans l'adaptateur UI. Si le libellé ou la définition d'une
 * catégorie doit changer, ce fichier est le seul à modifier.
 *
 * Affichage : toujours visible dans le corps de chaque carte de
 * choix, atténué (pas masqué) en mode Autonome : un lecteur d'écran
 * restitue systématiquement la définition complète, quel que soit le
 * mode (accessibilité, DECISIONS.md D4).
 */

import type { CardColor } from "@domain/index";

export type CategoryReminder = {
  readonly label: string;
  readonly definition: string;
};

export const CATEGORY_REMINDERS: Readonly<Record<CardColor, CategoryReminder>> = {
  story: {
    label: "Récit",
    definition: "Pose le sujet de la conversation, sans trancher.",
  },
  rule: {
    label: "Règle",
    definition: "Générale et abstraite, sans valeur concrète.",
  },
  example: {
    label: "Exemple",
    definition: "Concret et nommé : une date, un montant, un nom.",
  },
  question: {
    label: "Question",
    definition: "Ce que personne ne sait encore.",
  },
};
