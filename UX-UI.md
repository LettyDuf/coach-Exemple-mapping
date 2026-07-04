# Coach Example Mapping — UX/UI

Proposition issue du panel d'experts (pédagogie/ludification, UX-UI/graphisme,
architecture) du 2026-07-03, acceptée dans son ensemble par Lætitia. Les tokens
visuels précis (valeurs de couleur, typographie) restent à produire en maquette
avant implémentation finale — ce document fixe les principes, pas les valeurs.

## Parcours utilisateur minimal

### Module Apprendre (linéaire, divulgation progressive)
1. Le problème — accroche sans jargon : une story qui semble claire cache des
   malentendus.
2. Les 4 cartes — révélées une à une (jaune → bleu → vert → rouge), chacune avec
   définition courte + exemple concret (fixture Nordika).
3. Les rôles — les trois amigos + facilitateur, en situation.
4. La mécanique — timebox 25 min, signaux d'alerte, vote de fin ; mini-plateau
   interactif ponctuel où l'apprenant pose des cartes et voit le signal changer
   (pas un plateau persistant, voir DECISIONS.md D3).
5. Quiz de validation — questions situationnelles, correction immédiate, pas de
   score anxiogène.

### Module Préparer l'atelier (orienté action)
1. Choisir la story du jour parmi plusieurs candidates.
2. Assigner les rôles.
3. Pré-remplir le contexte (objectif, contraintes connues).
4. Checklist logistique (matériel, timebox, rappel du vote de fin).
5. Écran de lancement récapitulatif, imprimable/partageable.

Le passage Apprendre → Préparer n'est débloqué qu'après le quiz du module
Apprendre, pour garantir un socle commun avant l'atelier réel.

## Résolution de la collision chromatique avec Coach Objectifs

Coach Objectifs utilise déjà rouge/ambre/vert pour la qualité d'un objectif.
L'Example Mapping impose ses propres couleurs (jaune/bleu/vert/rouge),
internationalement enseignées et non négociables (voir DECISIONS.md D6). La
différenciation se fait donc par la forme, pas par la couleur :
- Cartes rectangulaires à coin plié (façon post-it), jamais de pastille ou de
  rond plein — la forme « ronde » reste associée à Coach Objectifs.
- Icône systématique par catégorie, redondante avec la couleur (jamais couleur
  seule) : jaune = story, bleu = règle, vert = exemple, rouge = question.
- Palette désaturée et teintée différemment de Coach Objectifs (ex. jaune
  moutarde, bleu ardoise, vert sauge, rouge brique plutôt qu'un rouge/vert
  saturé façon feu de signalisation).
- Jamais d'ambre dans cet outil — l'ambre reste le signal intermédiaire propre à
  Coach Objectifs.
- Un texte d'aide au premier lancement rappelle explicitement que ces couleurs
  codent une nature de carte, pas un niveau de qualité.

## Tokens de système visuel (principes)

- Typographie : une famille sans-serif chaleureuse pour le texte pédagogique
  long, une graisse condensée en capitales réservée aux labels de carte
  (« RÈGLE », « EXEMPLE »).
- Espacement : grille basée sur une unité « carte », pas une grille pixel
  abstraite.
- Couleur : tokens `card-story`, `card-rule`, `card-example`, `card-question`
  strictement réservés aux cartes ; palette neutre séparée pour toute l'UI de
  navigation — aucune couleur de carte n'est réutilisée comme couleur
  d'interface (bouton, lien, focus).

## Toggle Guidé / Autonome

Visible en permanence dans l'en-tête (jamais dans un menu de réglages), état
visuel net (interrupteur à deux positions libellées). En mode Guidé : labels
texte + icône + bandeau d'aide rétractable sous chaque carte, actions pas à pas.
En mode Autonome : labels optionnels (icône + couleur au premier plan, label au
survol/focus), aide contextuelle masquée par défaut mais accessible via une
icône dédiée, actions libres.

## Accessibilité (à traiter d'office)

- Contraste WCAG AA testé pour chaque couleur de carte, texte et icône compris ;
  bleu et vert canoniques ont souvent un contraste faible sur blanc, prévoir
  bordure ou fond assombri.
- Jamais d'information codée par la couleur seule (icône + label texte
  systématiques) — particulièrement critique ici puisque 2 des 4 catégories sont
  rouge et vert (daltonisme).
- Toute carte manipulable a un équivalent clavier (tab, flèches, entrée), pas de
  dépendance au drag-and-drop seul.
- Chaque carte porte un rôle et un libellé ARIA explicite (« Carte règle :
  [contenu] »), catégorie annoncée avant le contenu.
