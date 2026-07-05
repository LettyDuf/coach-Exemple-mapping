import { describe, it, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import ClassificationBoard from "@adapters/ui/classification/ClassificationBoard";
import { renderWithEngine } from "./test-utils";

/**
 * Mécanique validée par Lætitia (mockup fun, 2026-07-03/04 ; double
 * retournement supprimé le 2026-07-04) : la carte se retourne au clic
 * une seule fois, en tout début de session. Ensuite, les items
 * s'enchaînent directement (un clic sur la carte fait avancer, sans
 * repasser par le dos), et un bouton dédié permet de passer un item
 * sans répondre.
 */

function getFlipButton(): HTMLButtonElement {
  const button = document.querySelector(".classification-board__flip");
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error("Bouton de retournement de carte introuvable.");
  }
  return button;
}

describe("ClassificationBoard", () => {
  it("affiche une carte à retourner, et une fois retournée les 4 catégories de carte activées", () => {
    renderWithEngine(<ClassificationBoard />);
    expect(screen.getByText(/cliquer la carte pour la retourner/i)).toBeInTheDocument();

    const choices = screen.getByRole("group", { name: /choisir une catégorie de carte/i });
    expect(within(choices).getByRole("button", { name: /récit/i })).toBeDisabled();

    fireEvent.click(getFlipButton());

    expect(within(choices).getByRole("button", { name: /récit/i })).toBeEnabled();
    expect(within(choices).getByRole("button", { name: /règle/i })).toBeEnabled();
    expect(within(choices).getByRole("button", { name: /exemple/i })).toBeEnabled();
    expect(within(choices).getByRole("button", { name: /question/i })).toBeEnabled();
  });

  it("après un choix, affiche un feedback et permet aussitôt d'avancer en cliquant la carte, sans repasser par le dos", () => {
    renderWithEngine(<ClassificationBoard />);

    fireEvent.click(getFlipButton());

    const choices = screen.getByRole("group", { name: /choisir une catégorie de carte/i });
    const recitButton = within(choices).getByRole("button", { name: /récit/i });
    fireEvent.click(recitButton);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/cliquer la carte pour continuer/i)).toBeInTheDocument();
    expect(within(choices).getByRole("button", { name: /récit/i })).toBeDisabled();

    fireEvent.click(getFlipButton());

    // Plus de dos de carte a ce stade : l'item suivant s'affiche directement,
    // le feedback disparait et les 4 categories redeviennent actives.
    expect(screen.queryByText(/cliquer la carte pour la retourner/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(within(choices).getByRole("button", { name: /récit/i })).toBeEnabled();
  });

  it("en cas d'erreur, révèle la bonne catégorie dans le feedback et sur la carte correspondante (seed=1, item class-009, réponse attendue : question)", () => {
    renderWithEngine(<ClassificationBoard />, 1);
    fireEvent.click(getFlipButton());

    const choices = screen.getByRole("group", { name: /choisir une catégorie de carte/i });
    fireEvent.click(within(choices).getByRole("button", { name: /règle/i }));

    const feedback = screen.getByRole("status");
    expect(feedback).toHaveTextContent(/bonne réponse était : question/i);
    expect(within(choices).getByRole("button", { name: /question/i })).toHaveClass(
      "classification-board__choice--correct-reveal",
    );

    // Badges décoratifs (D19) : redondants avec la bulle de feedback
    // ci-dessus, jamais la seule source de l'information.
    const questionButton = within(choices).getByRole("button", { name: /question/i });
    expect(within(questionButton).getByText(/bonne réponse/i)).toBeInTheDocument();
    const regleButton = within(choices).getByRole("button", { name: /règle/i });
    expect(within(regleButton).getByText(/votre choix/i)).toBeInTheDocument();
  });

  it("un bouton dédié permet de passer un item sans répondre", () => {
    renderWithEngine(<ClassificationBoard />);
    fireEvent.click(getFlipButton());

    const choices = screen.getByRole("group", { name: /choisir une catégorie de carte/i });
    expect(within(choices).getByRole("button", { name: /récit/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /passer cette question/i }));

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(within(choices).getByRole("button", { name: /récit/i })).toBeEnabled();
  });

  it("garde la définition de chaque catégorie accessible en mode En solo, seulement atténuée visuellement", () => {
    renderWithEngine(<ClassificationBoard />);
    fireEvent.click(getFlipButton());

    expect(screen.getByText(/pose le sujet de la conversation, sans trancher/i)).toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: /mode.*avec le mentor/i });
    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: /mode.*en solo/i })).toBeInTheDocument();
    // La definition reste dans le DOM (toujours restituee a un lecteur
    // d'ecran), seule son opacite visuelle change (voir ClassificationBoard.css).
    expect(screen.getByText(/pose le sujet de la conversation, sans trancher/i)).toBeInTheDocument();
  });
});
