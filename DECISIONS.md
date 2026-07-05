# Coach Example Mapping — Journal de décisions

Format : contexte / choix / alternative écartée, en 3 lignes. Chaque décision
structurante est consignée ici avant ou au moment où elle est prise.

## D1 — Nom et emplacement du projet
Contexte : nouvel outil pédagogique distinct de coach-objectifs et coach-risques,
dans le même espace de travail « Création d'outils ».
Choix : nouveau dossier frère `coach-example-mapping/`, pattern `coach-<objet-métier>`
déjà établi.
Alternative écartée : un module ajouté à coach-risques ou coach-objectifs — écartée,
le domaine (Example Mapping) n'a aucun rapport métier avec les objectifs ou les
risques ; mélanger casserait l'isolation du domaine.

## D2 — Stack technique
Contexte : cohérence de studio, maintenabilité, deux implémentations précédentes
déjà éprouvées.
Choix : TypeScript + React 18 + Vite (build HTML autoporté via
vite-plugin-singlefile) + Zustand + Zod + Vitest, alias @domain/@content/@adapters/@app,
eslint-plugin-boundaries interdisant au domaine d'importer React ou le navigateur.
Alternative écartée : une stack différente (autre framework, sans build unique) —
écartée, aucune valeur ajoutée, casse la cohérence du studio et la portabilité
(l'outil doit rester distribuable en un seul fichier HTML, sans serveur).

## D3 — Portée du moteur de domaine : pas de plateau de cartes
Contexte : le V1 est « Apprendre + Préparer », pas un tableau collaboratif live
remplaçant les post-its physiques (voir ROADMAP.md).
Choix : le domaine ne modélise aucune notion de plateau ou de position de carte ;
seulement des items pédagogiques évalués un par un (classification, qualité d'un
exemple, déclenchement d'une question, verdict de préparation).
Alternative écartée : un moteur de manipulation de cartes façon mini-Miro — écartée,
sur-conception pour un besoin qui n'existe pas en V1 ; risque signalé explicitement
par le panel d'architecture du 2026-07-03.

## D4 — Toggle Guidé/Autonome
Contexte : Lætitia a tranché pour un toggle manuel plutôt qu'une détection
automatique ou une mémoire de progression (question posée le 2026-07-03).
Choix : flag d'affichage porté uniquement par l'adaptateur UI React, absent du
domaine ; bascule manuelle et réversible à tout moment, visible en permanence dans
l'en-tête, jamais cachée dans un menu de réglages.
Alternative écartée : détection automatique du niveau ou persistance de la
progression entre sessions — écartées par choix explicite de Lætitia.

## D5 — Pas de persistance de progression
Contexte : cohérent avec D4, aucun suivi de progression entre sessions en V1.
Choix : `InMemoryMasteryStore` comme unique implémentation du port de suivi, pas de
LocalStorage ni de backend.
Alternative écartée : persistance LocalStorage dès le V1 — écartée, ajouterait un
système de migration de schéma sans utilité tant que rien n'a besoin de survivre à
un rechargement de page.

## D6 — Système visuel : couleurs canoniques préservées, différenciation par forme
Contexte : risque de collision sémantique avec Coach Objectifs, qui utilise déjà
rouge/ambre/vert pour la qualité d'un objectif ; l'Example Mapping impose ses
propres couleurs internationalement enseignées (jaune/bleu/vert/rouge).
Choix : conserver les 4 couleurs canoniques de la technique, différencier par la
forme (carte à coin plié, jamais de pastille/rond), icône systématique redondante
avec la couleur, teintes désaturées propres à cet outil, jamais d'ambre.
Alternative écartée : changer les couleurs de la technique pour éviter la collision
— écartée, trahirait la convention enseignée partout (formations externes,
littérature) et créerait une confusion plus grande, pas moins.

## D7 — Contenu pédagogique externalisé
Contexte : doctrine du studio — le contenu métier ne doit jamais être codé en dur,
il doit pouvoir évoluer sans modifier le code (voir CLAUDE.md du projet).
Choix : corpus d'exemples annotés (dont la fixture « Assurances Nordika » validée
par Lætitia le 2026-07-03) stocké en `src/content/`, validé par des schémas Zod,
chargé par un adaptateur de contenu dédié.
Alternative écartée : contenu inline dans les composants React — écartée, rendrait
toute évolution pédagogique dépendante d'une modification de code.

## D8 — Réutilisation du modèle de maîtrise qualitatif de Coach Risques
Contexte : le premier incrément codé (module Classification) a besoin d'un moyen
de représenter la progression sans score numérique ni persistance (D5).
Choix : réutiliser tel quel le modèle à 4 niveaux qualitatifs et la règle
« consolidée par variation » de Coach Risques (mêmes seuils V1, `MasteryProgressor`),
adapté aux modules de cet outil plutôt qu'aux zones de risque.
Alternative écartée : inventer un nouveau modèle de progression pour cet outil —
écartée pour l'instant, le modèle existant est déjà validé pédagogiquement et évite
la dispersion de conventions entre outils frères ; à remettre en question
explicitement si l'usage réel du module Préparer (plus tard) s'y prête mal.

## D9 — Périmètre du premier incrément codé (2026-07-03)
Contexte : premier incrément après cadrage — construire quelque chose de petit,
testé, buildable, plutôt que l'ensemble du V1 d'un coup.
Choix : seul le module Classification (le prérequis règle/exemple) est implémenté
— domaine, contenu (10 items dérivés de la fixture Nordika), adaptateurs, UI
minimale, tests domaine/corpus/UI/a11y, tous verts (`npm test`, `tsc --noEmit`,
`eslint`, `vite build`).
Alternative écartée : scaffolder tous les modules du V1 (Trame, Rôles, Rythme,
Clôture, Préparation) en une fois — écartée, casserait la discipline
« incréments testés » et livrerait des modules non vérifiés.

## D10 — Coexistence assumée avec coach-3amigos (duplication de contenu acceptée)
Contexte : `coach-3amigos/` (autre projet du même espace de travail, cadré et
commencé le même jour dans une autre session) inclut déjà l'Example Mapping
comme sa mécanique 1 du Lot 1 ("Tri de cartes story/règle/exemple/question"),
qui recoupe directement le module Classification de cet outil. Lætitia a
tranché le 2026-07-03 après clarification : les deux outils répondent à des
intentions distinctes — coach-3amigos forme au **rituel** (qui est dans la
salle, les 4 rôles Business/Dev/Test/Facilitateur) ; coach-example-mapping
forme à la **technique** de structuration elle-même (les cartes, la rigueur,
le critère de sortie), utilisable dans n'importe quelle conversation de
clarification, pas seulement un 3 Amigos formel.
Choix : les deux outils restent 100 % autonomes et distribuables
indépendamment (deux fichiers HTML séparés, deux corpus distincts — celui-ci
sur la fixture Nordika, coach-3amigos sur des scénarios génériques). La
duplication partielle de contenu pédagogique (le tri de cartes) est assumée
comme le prix de deux outils indépendants, plutôt que de les coupler.
Alternative écartée : faire de ce module la brique de référence réutilisée par
coach-3amigos (couplerait deux projets nés indépendamment, complexifierait le
déploiement autoporté des deux) ; recentrer le périmètre de cet outil pour
éviter tout recoupement (perdrait l'intérêt du module déjà construit et testé).

## D11 — Palette neutre : bleu ardoise froid (2026-07-04)

Contexte : la palette d'origine (beige/brun clair) a été jugée datée par Lætitia ("outil des années 70"). Trois alternatives proposées et comparées sur la vraie rangée de choix : contemporain clair et froid, ardoise sombre, bleu ardoise froid.

Choix : palette "bleu ardoise froid" retenue (fond `#eef1f4`, encre `#1c2a33`, cartes blanches `#ffffff`, bordure `#d7dee3`). Les 4 couleurs porteuses de sens (moutarde/bleu/vert/brique, D6) sont inchangées, seuls le fond et le cadre neutre changent.

Alternative écartée : l'ardoise sombre rendait les couleurs de cartes plus vibrantes mais s'éloignait du reste de la suite d'outils (Coach Objectifs, Coach Risques, Coach 3 Amigos) qui restent en fond clair.

## D12 — Couleur "récit" assombrie pour une règle d'icône uniforme (2026-07-04)

Contexte : sur les 4 cartes de choix, l'icône du bandeau moutarde (récit) était rendue dans une encre sombre pour rester lisible (contraste blanc/moutarde insuffisant, 2,13:1), pendant que les 3 autres bandeaux (règle/exemple/question) affichaient une icône blanche. Ce traitement différencié, bien que justifié par le contraste, était perçu comme une incohérence visuelle.

Choix : assombrir le jaune canonique lui-même, de `#e3a73a` à `#9c7015`, ce qui porte le contraste blanc/moutarde à 4,43:1, comparable aux 3 autres bandeaux (4,14 à 5,39:1). Une seule règle d'icône désormais : blanc partout, sans exception.

Impact : le token `--story` (D6) change de valeur dans ce mockup et dans le JS de la pile de cartes. Répercuter ce changement dans tout fichier de comparaison encore en vie (palettes, essais de layout) si l'un d'eux est repris pour l'intégration finale.

Alternative écartée : garder deux couleurs d'icône différentes selon le bandeau (dark/light) : rejetée, la cohérence visuelle prime ici sur la nuance exacte de moutarde d'origine.

## D13 — Empilement forcé du contenu des cartes de choix (2026-07-04)

Contexte : le bandeau coloré de "Récit" restait toujours collé en haut de sa carte, mais celui de "Règle"/"Exemple"/"Question" démarrait 9,5px plus bas que le haut de leur propre carte. Cause identifiée par mesure directe (`getBoundingClientRect`) : le bouton natif centre son contenu comme un bloc quand il reste de la place, un comportement que `display: block` seul ne suffit pas à annuler. Comme les 4 cartes ont la même hauteur totale (D6/D9, étirement de grille) mais que le texte de Récit fait 3 lignes contre 2 pour les 3 autres, Récit remplit tout l'espace (pas de centrage visible) alors que les 3 autres ont un espace résiduel réparti en haut et en bas de leur contenu.

Choix : `.choice-card` devient explicitement un conteneur flex en colonne, avec `justify-content: flex-start` (empile le contenu en haut, laisse l'espace résiduel en bas) et `align-items: stretch` (le bandeau et le corps gardent toute la largeur).

Méthode de diagnostic à retenir : ce bug a résisté à cinq corrections théoriques successives (bordure, rayon d'angle, hauteur figée, contraste d'icône, étirement de grille) avant d'être résolu, parce que je réfutais les rapports visuels de Lætitia par la lecture du code au lieu de faire mesurer directement le DOM rendu (`getBoundingClientRect`) dès le début du désaccord. Voir [[feedback-mesurer-avant-de-refuter]].

## D14 — Intégration du mockup fun dans ClassificationBoard.tsx (2026-07-04)

Contexte : le mockup `coach-example-mapping-mockup-fun.html` a été itéré et corrigé avec Lætitia sur plusieurs sessions (mécanique, couleurs, alignement). Une fois validé, il fallait le porter dans le composant réel, testé, sans dupliquer de logique ni de contenu pédagogique dans l'UI.

Choix :
- Comportement porté tel quel : carte retournée au clic, choix désactivés tant que la carte n'est pas retournée, délai de lecture incompressible (4s) avant de pouvoir avancer, avance en recliquant la carte (plus de bouton "Item suivant"), piles de cartes classées par catégorie.
- Les libellés et définitions des 4 catégories, auparavant codés en dur dans le mockup HTML, sont désormais externalisés dans `src/content/classification/categoryReminders.ts` (contenu pédagogique, D7) plutôt que dans le composant.
- En mode Autonome, la définition de chaque carte reste dans le DOM (toujours restituée à un lecteur d'écran), seule son opacité visuelle change : jamais d'information retirée à une personne utilisant un lecteur d'écran pour un effet purement visuel.
- Le dos de carte retourné est purement décoratif (`aria-hidden`) ; le texte de l'extrait reste accessible dès le premier rendu, avant même le retournement visuel, pour éviter un bouton sans nom accessible (violation axe `button-name` détectée et corrigée pendant l'intégration).
- Palette (D11), contraste d'icône (D12) et empilement du contenu de carte (D13) deviennent les jetons visuels de production du module, plus seulement du mockup.

Hors périmètre de cet incrément : le motif du dos de carte reste le treillis simple actuellement dans le mockup validé. Les 4 variantes comparées dans `coach-example-mapping-mockup-card-backs.html` (constellation, brins botaniques, boussole, double losange décalé) restent un choix ouvert, non tranché par Lætitia ; à échanger avec elle avant de remplacer le motif actuel.

Vérification : 24 tests verts (domaine, corpus, UI, a11y axe-core), `tsc --noEmit` et ESLint propres (0 erreur), build autoporté régénéré (`coach-example-mapping.html`, `docs/index.html`, ~220 Ko).

## D15 — Retrait du délai de lecture incompressible (2026-07-04)

Contexte : le mockup imposait 4 secondes de lecture forcée après chaque réponse avant de pouvoir avancer. Lætitia a remonté que ce délai est souvent trop lent à l'usage réel.

Choix : suppression complète du minuteur. Le feedback s'affiche immédiatement après le choix, et la carte redevient cliquable pour avancer dès cet instant, sans attente imposée.

Alternative écartée : réduire le délai plutôt que le supprimer. Écartée : Lætitia n'a pas demandé un délai plus court, mais l'absence de contrainte de temps.

## D16 — Un seul retournement par session, bouton "Passer" (2026-07-04)

Contexte : Lætitia a signalé qu'il fallait cliquer deux fois pour passer à l'item suivant (retourner vers le dos, puis re-retourner vers l'extrait), ce qui rendait l'enchaînement pénible sur plusieurs items d'affilée.

Choix :
- Le dos de carte n'est retourné qu'une seule fois, au tout début de la session. Une fois révélée, la carte reste face visible pour le reste de la session ; avancer à l'item suivant swap directement le texte, sans repasser par le dos.
- Ajout d'un bouton "Passer cette question" (visible tant que l'item n'a pas de réponse) : avance sans évaluer, sans impact sur la maîtrise enregistrée.

Hors périmètre, à trancher avec Lætitia : le dos de carte en "fin de partie" qu'elle demande n'a pas d'équivalent dans le domaine actuel (`nextItem` ne signale pas de fin de session, l'exercice boucle sur le corpus). Pas d'abstraction de fin de session ajoutée sans validation de ce que "fin de partie" doit signifier pédagogiquement (nombre fixe d'items ? un item par item une seule fois puis relance ? un bouton "Terminer" explicite ?).

## D17 — Feedback d'erreur complet : bonne réponse citée et mise en évidence (2026-07-04)

Contexte : en cas d'erreur, le message du domaine (confusionMessages) explique déjà pourquoi la catégorie choisie ne convient pas, mais aucune bonne réponse n'était affichée : l'apprenant restait sans savoir laquelle des 3 autres catégories était correcte.

Choix : `item.expected` (donnée de contenu déjà exposée par le domaine, pas une déduction ajoutée côté UI) sert à afficher, en cas d'erreur, la bonne réponse en toutes lettres dans la bulle de feedback, et à mettre en évidence la carte correspondante (contour + repère textuel "(bonne réponse)", jamais la couleur seule).

Aucun changement de domaine ou de contenu requis : uniquement de la lecture supplémentaire côté adaptateur UI d'une donnée déjà présente.

## D18 — Transition de texte seule entre deux items, sans rotation du conteneur (2026-07-04)

Contexte : la première tentative d'animation de "tour" entre deux items (rotation légère du conteneur de carte autour de son orientation d'équilibre) laissait deviner le motif du dos et compressait le texte au point de paraître tronquée. Deux corrections théoriques (réduction de l'angle, fondu au point médian) n'ont pas suffi : Lætitia a demandé explicitement à ne plus jamais revoir le dos, avec une sortie et une entrée distinctes.

Choix : le conteneur de la carte garde désormais une orientation fixe une fois révélé (plus aucune classe d'animation dessus). Seul le texte de l'énoncé, dans un `<span>` dédié, joue une sortie (aplatissement horizontal + fondu) puis, une fois le texte remplacé, une entrée symétrique. Aucune rotation 3D réelle sur cet élément : il est déjà dans un parent avec perspective et rotateY, une seconde rotation imbriquée aurait un rendu peu prévisible selon les navigateurs.

Alternative écartée : garder une rotation 3D mais sur le texte seul plutôt que sur la carte entière. Écartée pour la même raison de prévisibilité inter-navigateurs ; l'aplatissement horizontal (scaleX) donne une sensation de "tour" comparable sans ce risque.

## D19 — Matérialité "reliure ornée", icônes affinées, badges d'état (2026-07-04)

Contexte : Lætitia a demandé d'aller plus loin dans un graphisme "jeu de plateau", en s'inspirant d'un autre outil de la même autrice (Coach Risques) sans en répliquer l'identité (doctrine du projet, jamais de parité par calque). Deux univers thématiques nouveaux (Expédition, Naturaliste) ont été proposés par un panel d'experts puis écartés par Lætitia : elle voulait approfondir la direction parchemin/or déjà validée, pas repartir sur une nouvelle métaphore.

Choix retenu après plusieurs itérations de mockup (voir coach-example-mapping-mockup-approfondi.html) :
- Cartes couleur parchemin (`--card: #fbf9f4`), cerclées d'un filet doré (`--gold: #b8925a`), avec de petits repères de coin en losange, purement décoratifs.
- Typographie Fraunces (serif) pour les titres, labels de catégorie et l'énoncé lui-même ; remplace "Source Serif 4" qui était chargé mais jamais utilisé.
- Icônes des 4 catégories affinées (livre à ruban, balance à fleuron, loupe à joyau, parchemin à coins enroulés) : même pictogramme de base, un peu plus de détail gravé.
- Badges "Votre choix"/"Bonne réponse" sous la carte concernée (jamais au-dessus : chevauchait le bandeau de couleur et l'icône lors des essais). Purement décoratifs (aria-hidden) : l'information qu'ils portent est déjà restituée en toutes lettres dans la bulle de feedback accessible (D17), jamais dupliquée pour un lecteur d'écran.
- Le repère textuel "(bonne réponse)" auparavant intégré à l'étiquette de la carte est retiré, remplacé par le badge ; la bulle de feedback (source accessible) est inchangée.

Alternative écartée : univers thématiques "Expédition" ou "Naturaliste" (nouvelle métaphore, nouvelles icônes). Écartée par Lætitia : elle voulait approfondir l'existant, pas le remplacer.

Hors périmètre, toujours ouvert : le motif définitif du dos de carte (D14) reste à trancher ; le bandeau doré s'applique au motif actuel (treillis) sans le remplacer.
