/**
 * Module « Classification » (module 0, DOMAINE.md §1).
 *
 * Distinguer story / règle / exemple / question sur des extraits de
 * conversation. Prérequis absolu avant tout le reste de la technique.
 *
 * Mécanique validée par Lætitia (mockup fun, 2026-07-03/04 ; délai de
 * lecture retiré et double retournement supprimé le 2026-07-04, jugés
 * trop lents à l'usage) : le dos de carte n'est visible qu'au tout
 * début (premier clic) et à la toute fin (bouton Terminer) de la
 * session. Entre les deux, la carte reste ouverte en permanence : le
 * conteneur ne rejoue plus aucune rotation, seul le texte de l'énoncé
 * change (D18, 2026-07-04, deux tentatives précédentes écartées : un
 * clin d'oeil de rotation du conteneur laissait deviner le dos et
 * compressait le texte de façon illisible). La transition d'un énoncé
 * au suivant joue une sortie puis une entrée distinctes sur ce texte
 * seul. Les 4 catégories sont des cartes de jeu (icône + libellé +
 * définition, jamais masquée à un lecteur d'écran) ; un bouton dédié
 * permet de passer un item sans répondre ; les bonnes réponses
 * s'accumulent en petites piles par catégorie.
 *
 * Toggle Mentor/Solo (DECISIONS.md D4) : flag d'affichage local à ce
 * composant, absent du domaine. En mode Solo, la définition de chaque
 * carte reste dans le DOM (toujours restituée à un lecteur d'écran)
 * mais est visuellement atténuée : voir feedback-mesurer-avant-de-refuter,
 * ne jamais retirer l'information, seulement l'estomper.
 *
 * Fin de session (D16, tranchée par Lætitia le 2026-07-04) : un bouton
 * "Terminer" explicite, pas de notion de fin dérivée du corpus (le
 * moteur ne connaît pas de fin de session, il ne fait qu'énumérer des
 * items).
 *
 * Réponse erronée (2026-07-04) : le message du domaine explique déjà
 * pourquoi la catégorie choisie ne convient pas (corpus, confusionMessages).
 * En plus de ce message, la carte de la bonne réponse est mise en
 * évidence (bordure + repère non colorimétrique) et son nom est cité en
 * toutes lettres dans la bulle de feedback : `item.expected` est une
 * donnée de contenu déjà exposée par le domaine, pas une déduction
 * ajoutée côté UI.
 *
 * Matérialité "reliure ornée" (D19, 2026-07-04) : direction validée par
 * Lætitia après plusieurs mockups comparés (voir
 * coach-example-mapping-mockup-approfondi.html). Les badges "Votre
 * choix"/"Bonne réponse" sont décoratifs (aria-hidden) : l'information
 * qu'ils portent est déjà restituée en toutes lettres dans la bulle de
 * feedback accessible, jamais dupliquée pour un lecteur d'écran.
 */

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useEngine } from "@adapters/ui/hooks/useEngine";
import { CARD_COLORS, MODULES, type CardColor, type EvaluationResult, type ItemId } from "@domain/index";
import type { ClassificationItem } from "@content/classification/types";
import { CATEGORY_REMINDERS } from "@content/index";
import { createContentRepository } from "@adapters/content-loader/ContentRepositoryAdapter";
import { CATEGORY_ICONS } from "./icons";
import "./ClassificationBoard.css";

type Mode = "guided" | "autonomous";

const MODE_LABEL: Readonly<Record<Mode, string>> = {
  guided: "Avec le mentor",
  autonomous: "En solo",
};

/** Durées des deux temps de la transition de texte entre deux items (ms). */
const STATEMENT_EXIT_MS = 170;
const STATEMENT_ENTER_MS = 200;

type TurnPhase = "idle" | "exiting" | "entering";

const EMPTY_PILES: Readonly<Record<CardColor, number>> = {
  story: 0,
  rule: 0,
  example: 0,
  question: 0,
};

let _repoSingleton: ReturnType<typeof createContentRepository> | null = null;
function getRepo() {
  if (!_repoSingleton) _repoSingleton = createContentRepository();
  return _repoSingleton;
}

function getItemUntyped(id: ItemId): ClassificationItem | null {
  return getRepo().findById<ClassificationItem>(id);
}

export default function ClassificationBoard() {
  const engine = useEngine();
  const [currentId, setCurrentId] = useState<ItemId | null>(null);
  const [mode, setMode] = useState<Mode>("guided");
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [chosenColor, setChosenColor] = useState<CardColor | null>(null);
  const [pileCounts, setPileCounts] = useState<Record<CardColor, number>>({ ...EMPTY_PILES });
  const [tailLeft, setTailLeft] = useState(28);
  const [displayedStatement, setDisplayedStatement] = useState("");
  const [turnPhase, setTurnPhase] = useState<TurnPhase>("idle");

  const feedbackRef = useRef<HTMLParagraphElement | null>(null);
  const choiceRefs = useRef<Partial<Record<CardColor, HTMLButtonElement | null>>>({});
  const isFirstItem = useRef(true);

  useEffect(() => {
    setCurrentId(engine.nextItem({ module: MODULES.CLASSIFICATION }));
  }, [engine]);

  const item = useMemo<ClassificationItem | null>(() => {
    if (!currentId) return null;
    return getItemUntyped(currentId);
  }, [currentId]);

  // Transition de texte entre deux énoncés : sortie du texte affiché,
  // puis remplacement par le nouveau texte et entrée. Hormis le tout
  // premier chargement (le texte apparaît directement, porté par le
  // retournement d'ouverture de la carte, pas par cette transition).
  useEffect(() => {
    if (!item) return;
    if (isFirstItem.current) {
      isFirstItem.current = false;
      setDisplayedStatement(item.statement);
      return;
    }
    setTurnPhase("exiting");
    const exitTimeout = setTimeout(() => {
      setDisplayedStatement(item.statement);
      setTurnPhase("entering");
    }, STATEMENT_EXIT_MS);
    return () => clearTimeout(exitTimeout);
  }, [item]);

  useEffect(() => {
    if (turnPhase !== "entering") return;
    const enterTimeout = setTimeout(() => setTurnPhase("idle"), STATEMENT_ENTER_MS);
    return () => clearTimeout(enterTimeout);
  }, [turnPhase]);

  // Pointe de la bulle de feedback positionnée sur la carte choisie.
  useEffect(() => {
    if (!result || !chosenColor) return;
    const btn = choiceRefs.current[chosenColor];
    const fb = feedbackRef.current;
    if (!btn || !fb) return;
    const btnRect = btn.getBoundingClientRect();
    const fbRect = fb.getBoundingClientRect();
    const left = btnRect.left + btnRect.width / 2 - fbRect.left;
    setTailLeft(Math.max(20, Math.min(left, fbRect.width - 20)));
  }, [result, chosenColor]);

  function advance() {
    setResult(null);
    setChosenColor(null);
    setCurrentId(engine.nextItem({ module: MODULES.CLASSIFICATION }));
  }

  function handleCardActivate() {
    if (finished) return;
    if (!revealed) {
      setRevealed(true);
      return;
    }
    if (result) {
      advance();
    }
  }

  /** Passer l'item courant sans répondre : pas d'évaluation, pas d'impact sur la maîtrise. */
  function skip() {
    setResult(null);
    setChosenColor(null);
    setCurrentId(engine.nextItem({ module: MODULES.CLASSIFICATION }));
  }

  function submit(color: CardColor) {
    if (!currentId || !revealed || result) return;
    const evalResult = engine.evaluateClassification(currentId, color);
    setChosenColor(color);
    setResult(evalResult);
    engine.registerOutcome(MODULES.CLASSIFICATION, currentId, evalResult);
    if (evalResult.outcome === "success") {
      setPileCounts((counts) => ({ ...counts, [color]: counts[color] + 1 }));
    }
  }

  function restart() {
    isFirstItem.current = true;
    setFinished(false);
    setRevealed(false);
    setResult(null);
    setChosenColor(null);
    setPileCounts({ ...EMPTY_PILES });
    setCurrentId(engine.nextItem({ module: MODULES.CLASSIFICATION }));
  }

  if (!item) {
    return (
      <div className="classification-board" role="status">
        Aucun item disponible pour le moment.
      </div>
    );
  }

  if (finished) {
    return (
      <section className="classification-board" aria-label="Exercice de classification">
        <div className="classification-board__stage">
          <div className="classification-board__flip classification-board__flip--static">
            <span className="classification-board__face classification-board__face--back">
              <span className="classification-board__medallion" aria-hidden="true" />
            </span>
          </div>
        </div>
        <p className="classification-board__hint" role="status">
          Session terminée. À bientôt !
        </p>
        <div className="classification-board__skip-row">
          <button type="button" className="classification-board__skip" onClick={restart}>
            Recommencer
          </button>
        </div>
      </section>
    );
  }

  const showHint = !revealed || Boolean(result);

  return (
    <section className="classification-board" aria-label="Exercice de classification">
      <div className="classification-board__toolbar">
        <button
          type="button"
          className="classification-board__toggle"
          onClick={() => setMode(mode === "guided" ? "autonomous" : "guided")}
          aria-pressed={mode === "guided"}
        >
          <span className="classification-board__toggle-dot" aria-hidden="true" />
          Mode : <strong>{MODE_LABEL[mode]}</strong>
        </button>
        <button type="button" className="classification-board__finish" onClick={() => setFinished(true)}>
          Terminer
        </button>
      </div>

      <div className="classification-board__stage">
        <button
          type="button"
          className={[
            "classification-board__flip",
            revealed ? "classification-board__flip--revealed" : "",
            result ? "classification-board__flip--ready" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleCardActivate}
        >
          {/* Le dos de carte est purement decoratif (aria-hidden fixe). Le
              texte de l'extrait reste toujours accessible a un lecteur
              d'ecran, meme avant le retournement visuel : le mystere de la
              carte retournee est un plaisir reserve aux personnes voyantes,
              pas une information retenue a une personne non-voyante. */}
          <span className="classification-board__face classification-board__face--back" aria-hidden="true">
            <span className="classification-board__medallion" aria-hidden="true" />
          </span>
          <span className="classification-board__face classification-board__face--front">
            <span className="classification-board__corner classification-board__corner--tl" aria-hidden="true" />
            <span className="classification-board__corner classification-board__corner--tr" aria-hidden="true" />
            <span className="classification-board__stage-kicker" aria-hidden="true">
              <span>Énoncé</span>
              <span>&#10022;</span>
            </span>
            <span
              className={[
                "classification-board__statement",
                turnPhase !== "idle" ? `classification-board__statement--${turnPhase}` : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {displayedStatement}
            </span>
            <span className="classification-board__stage-divider" aria-hidden="true">
              <span className="classification-board__stage-divider-line" />
              <span>&#10022;</span>
              <span className="classification-board__stage-divider-line" />
            </span>
          </span>
        </button>
      </div>

      {showHint ? (
        <p className="classification-board__hint">
          {!revealed ? "Cliquer la carte pour la retourner" : "Cliquer la carte pour continuer"}
        </p>
      ) : null}

      <div
        className={[
          "classification-board__choices",
          mode === "autonomous" ? "classification-board__choices--solo" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-label="Choisir une catégorie de carte"
      >
        {CARD_COLORS.map((color) => {
          const reminder = CATEGORY_REMINDERS[color];
          const Icon = CATEGORY_ICONS[color];
          const isChosen = chosenColor === color;
          const isPulsing = isChosen && result?.outcome === "success";
          const isShaking = isChosen && result?.outcome === "miss";
          const isCorrectReveal = result?.outcome === "miss" && color === item.expected;
          return (
            <button
              key={color}
              ref={(el) => {
                choiceRefs.current[color] = el;
              }}
              type="button"
              className={[
                "classification-board__choice",
                `classification-board__choice--${color}`,
                isPulsing ? "classification-board__choice--pulse" : "",
                isShaking ? "classification-board__choice--shake" : "",
                isCorrectReveal ? "classification-board__choice--correct-reveal" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => submit(color)}
              disabled={!revealed || Boolean(result)}
            >
              <span className="classification-board__corner classification-board__corner--tl" aria-hidden="true" />
              <span className="classification-board__corner classification-board__corner--tr" aria-hidden="true" />
              {isChosen && result ? (
                <span className="classification-board__badge classification-board__badge--chosen" aria-hidden="true">
                  <span className="classification-board__badge-glyph">&#9733;</span>
                  Votre choix
                </span>
              ) : null}
              {isCorrectReveal ? (
                <span className="classification-board__badge classification-board__badge--correct" aria-hidden="true">
                  <span className="classification-board__badge-glyph">&#10003;</span>
                  Bonne réponse
                </span>
              ) : null}
              <span className="classification-board__choice-head">
                <Icon />
              </span>
              <span className="classification-board__choice-body">
                <span className="classification-board__choice-label">{reminder.label}</span>
                <span className="classification-board__choice-def">{reminder.definition}</span>
              </span>
            </button>
          );
        })}
      </div>

      {!result ? (
        <div className="classification-board__skip-row">
          <button type="button" className="classification-board__skip" onClick={skip}>
            Passer cette question
          </button>
        </div>
      ) : null}

      {result ? (
        <p
          ref={feedbackRef}
          className={`classification-board__feedback classification-board__feedback--${
            result.outcome === "success" ? "ok" : "wrong"
          } classification-board__feedback--show`}
          style={{ "--tail-left": `${tailLeft}px` } as CSSProperties}
          role="status"
        >
          {result.feedback.message}
          {result.outcome === "miss" ? (
            <>
              {" "}
              La bonne réponse était : <strong>{CATEGORY_REMINDERS[item.expected].label}</strong>.
            </>
          ) : null}
        </p>
      ) : null}

      <div className="classification-board__piles" aria-hidden="true">
        {CARD_COLORS.map((color) => (
          <div key={color} className="classification-board__pile-col">
            <div className="classification-board__pile-stack">
              {Array.from({ length: pileCounts[color] }).map((_, i) => (
                <div
                  key={i}
                  className={`classification-board__pile-card classification-board__pile-card--${color}`}
                  style={{
                    transform: `translateX(-50%) rotate(${(i % 2 === 0 ? 1 : -1) * (2 + (i % 3))}deg)`,
                    bottom: `${Math.min((i + 1) * 4, 40)}px`,
                    zIndex: i + 1,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
