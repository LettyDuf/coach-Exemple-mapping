# Coach Example Mapping — Feuille de route

## Vision

Un outil pédagogique web qui permet à une équipe TI n'ayant jamais pratiqué l'Example
Mapping (technique de Matt Wynne / Cucumber) de comprendre ce qui est attendu de la
technique, de s'exercer, et de se préparer sérieusement à un atelier réel — sans
jamais se substituer à cet atelier.

L'outil ne remplace jamais la conversation en direct ni la manipulation de cartes
(post-its physiques ou tableau collaboratif habituel de l'équipe). Il prépare le
terrain avant, il n'accompagne pas la session en direct.

## Portée V1 — "Apprendre + Préparer"

### Module Apprendre
- Le prérequis : distinguer une règle d'un exemple (avant toute chose, selon Wynne).
- Les 4 cartes et leur grammaire (jaune = story, bleu = règle, vert = exemple,
  rouge = question) et la hiérarchie story → règle → exemple.
- Les rôles : les trois amigos (métier / dev / test) et le facilitateur qui capte
  sans débattre.
- Le rythme d'une session : timebox de 25 minutes, signaux de lecture (trop de
  rouge, trop de bleu, un exemple qui cache plusieurs règles).
- Clore une session : le vote (prêt / à découper / devoirs à faire).
- Quiz de validation avant de débloquer le module suivant.

### Module Préparer l'atelier
- Simulateur de décision : choisir la bonne story à amener parmi plusieurs
  candidates, composer son trio d'amigos.
- Checklist logistique : durée, matériel, rythme des sessions.
- Écran de lancement récapitulatif, imprimable/partageable — fin du parcours dans
  l'outil, l'atelier se déroule ensuite en dehors de l'outil.

### Adaptation du niveau
- Toggle manuel permanent "Guidé / Autonome", visible en permanence, réversible à
  tout moment. Pas de détection automatique, pas de mémoire de progression entre
  sessions (voir DECISIONS.md D4, D5).

## Hors scope V1 (explicite)

- Tableau numérique live remplaçant les post-its pendant l'atelier réel.
- Détection automatique du niveau de pratique de l'équipe.
- Mémoire de progression persistante entre sessions.
- Écriture de Gherkin formel dans l'outil (contraire à l'esprit de la technique
  pendant cette phase — voir DOMAINE.md).
- Gestion multi-équipes, comptes utilisateurs, backend/serveur : l'outil reste un
  fichier HTML autoporté, comme ses outils frères.

## Prochains incréments

1. Scaffolding technique (projet, domaine minimal, tests sur la fixture validée
   "Assurances Nordika").
2. Corpus de contenu du module Apprendre (extraits de classification, cas du
   simulateur de préparation) — chaque item validé par Lætitia avant intégration.
3. Maquette UX-UI (parcours, système visuel, résolution de la collision de
   couleurs avec Coach Objectifs) à valider avant implémentation finale.
4. Premier incrément codé et testé, présenté pour revue avant d'enchaîner.

## Points encore ouverts (à trancher avec Lætitia au fil des incréments)

- Seuils numériques exacts des signaux d'alerte (à partir de combien de cartes
  rouges/bleues considère-t-on qu'il y a un problème ?).
- Personas des trois amigos et liste complète des stories candidates du
  simulateur de préparation (au-delà de la fixture Nordika).
- Confirmation du fil ludique "nommer ses exemples façon épisode de Friends"
  comme mécanique retenue.
