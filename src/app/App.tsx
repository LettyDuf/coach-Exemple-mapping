/**
 * Racine applicative — V1.
 *
 * Un seul module existe pour l'instant (Classification). Le Hub de
 * navigation entre modules (Apprendre / Préparer) arrivera avec le
 * deuxième module — pas d'abstraction de navigation avant d'en avoir
 * besoin.
 */

import ClassificationBoard from "@adapters/ui/classification/ClassificationBoard";

export default function App() {
  return (
    <main>
      <h1 style={{ textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        Coach Example Mapping — Module Classification
      </h1>
      <ClassificationBoard />
    </main>
  );
}
