/**
 * Icônes des 4 catégories de carte.
 *
 * Responsabilité UI pure (pas de contenu pédagogique) : le choix du
 * pictogramme est une décision de conception visuelle, distincte des
 * libellés/définitions qui vivent dans le contenu (categoryReminders.ts).
 * Toujours utilisées avec aria-hidden, jamais seules comme porteuses de
 * sens (accessibilité, UX-UI.md : icône + libellé systématiques).
 *
 * Traits affinés (2026-07-04, direction "reliure ornée" validée par
 * Lætitia) : un peu de détail gravé pour s'accorder à la matérialité
 * parchemin/or du reste du système, sans changer le pictogramme de
 * base ni sa lecture (livre, balance, loupe, parchemin).
 */

import type { CardColor } from "@domain/index";
import type { JSX } from "react";

function StoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M4 5c3-1.4 6-1.4 8 0v14c-2-1.4-5-1.4-8 0V5z" />
      <path d="M20 5c-3-1.4-6-1.4-8 0v14c2-1.4 5-1.4 8 0V5z" />
      <path d="M9 8.6c1.3-.5 2.5-.5 3 0M9 11.6c1.3-.5 2.5-.5 3 0" strokeWidth={1} opacity={0.55} />
      <path d="M11 3v3.6l1-.8 1 .8V3" fill="currentColor" stroke="none" opacity={0.9} />
    </svg>
  );
}

function RuleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M12 5v14M6.5 8h11M6.5 8L4 13.4a2.5 2.5 0 004.9 0L6.5 8zM17.5 8L15 13.4a2.5 2.5 0 004.9 0L17.5 8z" />
      <path d="M9 21h6" strokeWidth={1.3} />
      <path d="M10.6 2.2l1.4 1.4 1.4-1.4" opacity={0.6} />
    </svg>
  );
}

function ExampleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx={10} cy={10} r={6} />
      <line x1={14.5} y1={14.5} x2={20} y2={20} />
      <path
        d="M10 7.4l.75 1.7 1.85.25-1.35 1.3.3 1.85L10 11.7l-1.55.8.3-1.85-1.35-1.3 1.85-.25L10 7.4z"
        fill="currentColor"
        stroke="none"
        opacity={0.9}
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M5 5h14a1 1 0 011 1v8a1 1 0 01-1 1H9l-4 4V15H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
      <path d="M4 6.6c-.5.4-.5 1 0 1.4M20 6.6c.5.4.5 1 0 1.4" strokeWidth={1.1} opacity={0.55} />
      <text x="10.3" y="12.6" fontSize={7} fill="currentColor" stroke="none" fontFamily="Fraunces, serif">
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
