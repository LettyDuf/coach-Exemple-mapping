# Coach Example Mapping — État du projet

## Fait (2026-07-03)
- Cadrage V1 clarifié par dialogue : périmètre « Apprendre + Préparer », pas de
  tableau numérique live, toggle Guidé/Autonome manuel.
- Panel d'experts consulté (pédagogie/ludification, UX-UI/graphisme,
  architecture) — propositions argumentées acceptées par Lætitia.
- Fixture domaine n°1 validée : « Assurances Nordika ».
- Fichiers d'état consignés : ROADMAP.md, DECISIONS.md (D1-D9), DOMAINE.md,
  UX-UI.md.
- **Premier incrément codé et testé** : module Classification (le prérequis
  règle/exemple — DOMAINE.md §1).
  - Domaine : `ExampleMappingCoachEngine`, `ClassificationEvaluator`,
    `MasteryProgressor` (modèle qualitatif repris de Coach Risques, D8).
  - Contenu : 10 items dérivés de la fixture Nordika, validés par schéma Zod.
  - Adaptateurs : repository de contenu, store de maîtrise en mémoire (D5),
    horloge et source aléatoire.
  - UI : écran de classification avec toggle Guidé/Autonome, feedback immédiat,
    accessibilité (icône + label, clavier, ARIA).
  - Tests : 24 tests verts (domaine, corpus, UI, accessibilité axe-core).
    `tsc --noEmit` et `eslint` propres. Build HTML autoporté vérifié
    (`coach-example-mapping.html` à la racine, ~212 Ko).

## En cours
- Rien en chantier : la refonte fun est intégrée et vérifiée en production
  (voir plus bas).

## Prochain pas
1. Décider avec Lætitia du motif définitif du dos de carte (D14 laisse ce
   point ouvert : 4 variantes comparées, aucune choisie).
2. Construire une deuxième fixture domaine avec Lætitia (nécessaire pour varier
   les exercices du module 0 et peupler le futur simulateur de préparation,
   DOMAINE.md §4).
3. Trancher les seuils numériques des signaux d'alerte de lecture d'atelier
   (DOMAINE.md §1, distincts des seuils de maîtrise de D8/D9).
4. Prochain module à construire : la grammaire des 4 cartes (module « Trame »)
   ou les rôles/facilitateur, à décider ensemble.
5. Maquette UX-UI concrète (valeurs de tokens, mockup des 5 écrans) avant
   d'étoffer l'UI au-delà de l'écran de classification actuel.

## Rappel de fonctionnement (sandbox)
- Fichiers de ce projet à lire/écrire via bash uniquement (Read/Edit échouent
  avec EPERM sur ce chemin) — voir mémoire sandbox-macbook-file-git-limits.
- Aucune suppression de fichier/dossier depuis le bac à sable ; init Git et
  tout commit/push à faire par Lætitia depuis son propre Terminal.
- `node_modules/` a été installé (nécessaire pour tester) — ne sera jamais
  supprimable depuis le bac à sable, mais il est dans `.gitignore`, donc sans
  conséquence pour le dépôt.
- Un fichier résiduel `tests/ui/ClassificationBoard.a11y.test.tsx.bak` traîne
  (créé par une commande sed, non supprimable depuis le bac à sable) — inoffensif
  (ignoré par Vitest, extension `.bak` non matchée), à supprimer manuellement si
  souhaité.
- Le script `npm run build` (qui appelle `rimraf dist`) échoue depuis le bac à
  sable : `rimraf`/l'auto-nettoyage de Vite tentent de supprimer `dist/index.html`
  existant, `unlink` refusé (EPERM). Construire plutôt avec
  `npx vite build --outDir <dossier de scratch>` puis copier (`cp`, jamais `mv`)
  le `index.html` obtenu vers `coach-example-mapping.html` et `docs/index.html`.

## Mockup "fun" (2026-07-03)
Fichier `coach-example-mapping-mockup-fun.html` à la racine : prototype HTML/CSS/JS
autonome (pas branché au domaine réel, pas de tests) pour tester visuellement la
piste retenue par le panel jeu de société (carte retournée, choix façon carte à
jouer avec relief, pile qui grandit, feedback avec délai de lecture incompressible
de 4s, choix de mode en entrée de partie). À valider par Lætitia avant intégration
dans `ClassificationBoard.tsx` (le vrai composant testé).

## Retours sur le mockup fun (2026-07-03)
Ajustements faits sur `coach-example-mapping-mockup-fun.html` suite aux retours de
Lætitia : suppression de tous les tirets longs (style d'écriture, à respecter
partout désormais), pointe de la bulle de feedback repositionnée dynamiquement
sur la carte de catégorie cliquée (au lieu d'une position fixe), et bouton "Item
suivant" retiré : cliquer la carte de l'extrait fait maintenant avancer à l'item
suivant une fois le délai de lecture (4s) écoulé.

## Retrait de l'écran de choix de mode (2026-07-03)
L'écran "Avec le mentor / En solo" proposé par le panel jeu de société ajoutait
un clic et un écran à harmoniser sans bénéfice réel : le toggle Guidé/Autonome
était déjà tranché comme un bouton permanent dans l'en-tête (DECISIONS.md D4),
pas un écran séparé. Lætitia a relevé l'incohérence de largeur/style entre cet
écran et le reste, et a questionné l'intérêt de l'étape en elle-même. Retiré du
mockup interactif : l'exercice démarre directement en mode Guidé, un bouton
toujours visible bascule vers Autonome sans changement d'écran.

## Retours suite au retrait de l'écran de mode (2026-07-03)
- "Story" renommé en "Récit" (affichage uniquement ; l'identifiant interne
  reste "story" dans le code, cohérent avec le corpus).
- Décor du dos de carte remplacé : treillis en losanges (deux dégradés
  répétés à 45°/-45°) plutôt que des rayures parallèles.
- Répétition des noms de catégorie sous les cartes de choix retirée (les
  piles s'identifient par la position de colonne et la couleur, sans
  redire le nom déjà affiché sur la carte de choix juste au-dessus).
- Définitions sous chaque carte de choix : relecture du code, aucune
  anomalie trouvée (aucune règle CSS ne les masque par défaut). Signalé
  à Lætitia que la capture montrée était probablement une version mise
  en cache du navigateur.

## Corrections visuelles du mockup (2026-07-04)
Suite à plusieurs allers-retours de mesure directe du DOM avec Lætitia
(voir mémoire feedback-mesurer-avant-de-refuter) : palette neutre bleu-
ardoise froid (D11), icône blanche uniforme sur les 4 bandeaux avec
moutarde assombri pour le contraste (D12), empilement du contenu de
carte forcé collé en haut plutôt que centré par le bouton natif (D13).
Cause racine du décalage signalé : les boutons natifs centrent leur
contenu comme un bloc quand il reste de la place, un comportement que
`display: block` seul ne suffit pas à annuler.

## Ajustements post-intégration (2026-07-04)
- Délai de lecture (4s) retiré : jugé trop lent à l'usage (pas de D dédiée,
  ajustement mineur sur D14).
- D15 : plus de double retournement entre deux items, un bouton "Passer
  cette question" ajouté.
- D16 : un seul retournement de carte par session (début), bouton "Terminer"
  explicite (fin), brève animation de "tour" entre deux items (clin d'oeil
  visuel sans jamais remontrer le dos).
- D17 : en cas d'erreur, la bonne réponse est désormais citée dans le
  feedback et mise en évidence sur la carte correspondante.
- 27 tests verts (domaine, corpus, UI, a11y). Un fichier `tests/ui/probe.test.tsx`
  résiduel (sondage ponctuel de l'item sélectionné par la graine de test,
  non supprimable depuis le bac à sable) traîne, inoffensif, à supprimer
  manuellement si souhaité.

## Intégration en production (2026-07-04, D14)
Le mockup validé est porté dans `ClassificationBoard.tsx`/`.css` (le
composant réel, testé) : carte retournée au clic, choix désactivés
avant retournement, délai de lecture incompressible (4s), avance en
recliquant la carte, piles de cartes classées. Les libellés/définitions
de catégorie sont désormais externalisés dans
`src/content/classification/categoryReminders.ts` (contenu pédagogique,
D7), plus codés en dur dans l'UI. En mode Autonome, la définition reste
toujours restituée à un lecteur d'écran (seule l'opacité visuelle
change). 24 tests verts, `tsc`/`ESLint` propres, build régénéré.
