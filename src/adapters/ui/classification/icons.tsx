/**
 * Icônes des 4 catégories de carte.
 *
 * Responsabilité UI pure (pas de contenu pédagogique) : le choix du
 * pictogramme est une décision de conception visuelle, distincte des
 * libellés/définitions qui vivent dans le contenu (categoryReminders.ts).
 * Toujours utilisées avec aria-hidden, jamais seules comme porteuses de
 * sens (accessibilité, UX-UI.md : icône + libellé systématiques).
 */

import type { CardColor } from "@domain/index";
import type { JSX } from "react";

function StoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M4 5c3-1.4 6-1.4 8 0v14c-2-1.4-5-1.4-8 0V5z" />
      <path d="M20 5c-3-1.4-6-1.4-8 0v14c2-1.4 5-1.4 8 0V5z" />
    </svg>
  );
}

function RuleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M12 3v16M6 7h12M6 7L3.5 12.5a2.6 2.6 0 005 0L6 7zM18 7l-2.5 5.5a2.6 2.6 0 005 0L18 7z" />
    </svg>
  );
}

function ExampleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx={10} cy={10} r={6} />
      <line x1={14.5} y1={14.5} x2={20} y2={20} />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M4 5h16v10H9l-4 4V15H4z" />
      <text x="10.5" y="12.5" fontSize={7} fill="currentColor" stroke="none" fontFamily="Inter">
        ?
      </text>
    </svg>
  );
}

export const CATEGORY_ICONS: Readonly<Record<CardColor, () => JSX.Element>> = {
  story: StoryIcon,
  rule: RuleIcon,
  example: ExampleIcon,
  question: QuestionIcon,
};
