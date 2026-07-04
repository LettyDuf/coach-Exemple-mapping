# Coach Example Mapping — Domaine

Source de vérité du contenu pédagogique. Toute règle métier, tout seuil, tout
exemple annoté ci-dessous doit être validé par Lætitia avant d'être codé en dur
quelque part — ce document est la référence, pas le code.

Statut au 2026-07-03 : tronc commun et fixture n°1 validés par Lætitia en
conversation. Seuils numériques précis et fixtures additionnelles encore ouverts
(marqués « À VALIDER » ci-dessous).

## 1. Ce qu'est l'Example Mapping (tronc commun)

L'Example Mapping (Matt Wynne, Cucumber, 2015) est une conversation structurée
qui a lieu **avant** qu'une story n'entre en développement. Ce n'est pas une
session de rédaction de user stories, et ce n'est pas une session d'écriture de
Gherkin formel — les deux sont des pièges classiques à signaler explicitement
dans l'outil.

### Le prérequis absolu : règle vs exemple

Avant de pouvoir pratiquer la technique, l'équipe doit savoir distinguer :
- une **règle** : un énoncé général, abstrait, qui décrit une contrainte ou un
  comportement attendu, sans valeur concrète.
- un **exemple** : une situation concrète et nommée qui illustre une règle, avec
  des données précises (une date, un montant, un nom).

Sans cette distinction acquise, l'équipe ne fait pas de l'Example Mapping — elle
fait autre chose. C'est pourquoi le module 0 de l'outil porte uniquement
là-dessus, avant même de présenter les 4 couleurs comme système complet.

### Les 4 cartes

| Couleur | Rôle | Contenu |
|---|---|---|
| Jaune | Story | Le sujet de la conversation, posé en haut. |
| Bleu | Règle | Une contrainte ou un critère d'acceptation déjà connu. |
| Vert | Exemple | Une illustration concrète d'une règle, nommée façon « épisode
  de Friends » (ex. « Le cas où le client a perdu son ticket ») plutôt qu'en
  Gherkin formel à ce stade. |
| Rouge | Question | Une question sans réponse dans la salle, capturée puis mise
  de côté — pas débattue en boucle. |

### Les rôles

Le minimum : les « trois amigos » — quelqu'un qui porte le métier (PO/product),
quelqu'un qui développe, quelqu'un qui teste/challenge. On peut élargir (UX,
opérations) à quiconque aide à transformer une question en décision, pas
au-delà. Pendant l'apprentissage, un facilitateur dédié est recommandé : son
seul rôle est de capter ce qui se dit sur les cartes, sans participer au débat.
Ce rôle s'efface une fois la pratique acquise.

### Le rythme

Une story à la fois, environ 25 minutes. Signaux de lecture à mi-session :
- beaucoup de rouge → l'équipe ne sait pas encore assez sur ce sujet ;
- beaucoup de bleu → la story est probablement trop grosse, à découper ;
- une règle avec de nombreux exemples → elle cache probablement plusieurs
  règles à séparer.

**À VALIDER** : seuils numériques précis (« beaucoup » = combien de cartes ?)
à définir avec Lætitia avant de les coder comme règle de détection dans les
exercices.

### Clore une session

Vote à main levée : la story est-elle prête pour le développement, ou faut-il
la découper / faire des devoirs avant une nouvelle session ? La justification
du vote compte autant que le choix lui-même.

## 2. Anti-patterns à signaler dans l'outil

- Écrire du Gherkin formel pendant la session — détourne l'objectif (compréhension
  partagée) vers la formalisation prématurée.
- Une règle formulée avec une valeur concrète (ex. « le montant doit être
  inférieur à 500 $ » écrit comme règle plutôt que comme seuil illustré par un
  exemple) — signe qu'une règle et un exemple ont été confondus.
- Le facilitateur qui débat au lieu de capter — perd la neutralité qui fait
  fonctionner la technique pendant l'apprentissage.
- Continuer à débattre une question rouge au lieu de la capturer et d'avancer.

## 3. Fixture n°1 (validée 2026-07-03) — Assurances Nordika

Contexte fictif : une équipe TI construit un portail libre-service permettant à
des clients d'exécuter eux-mêmes un processus d'affaires — ici, déclarer un
sinistre habitation sans passer par un agent.

**Story (jaune)**
En tant que client assuré, je veux déclarer un sinistre dégât d'eau directement
dans le portail libre-service, afin d'obtenir un dossier ouvert et un premier
suivi sans attendre un agent.

**Règle 1 (bleu)** — Le contrat doit être actif au moment de la déclaration.
- Exemple (vert) : contrat habitation actif → dossier créé normalement.
- Exemple (vert) : contrat résilié depuis 2 semaines → refus, redirection vers
  un agent.
- Exemple (vert) : client avec plusieurs contrats (auto + habitation) → doit
  choisir le bon contrat avant de continuer.

**Règle 2 (bleu)** — Le type de sinistre doit être couvert par la police pour
permettre l'ouverture autonome.
- Exemple (vert) : dégât d'eau couvert par la police de base → dossier ouvert
  automatiquement.
- Exemple (vert) : sinistre « vol » non couvert par cette police → bascule vers
  un contact agent, pas d'auto-déclaration.

**Règle 3 (bleu)** — Le dossier doit contenir un minimum d'informations
factuelles pour être recevable.
- Exemple (vert) : date de l'incident + photos fournies → dossier recevable,
  numéro généré immédiatement.
- Exemple (vert) : date de l'incident manquante → soumission bloquée, complément
  demandé.

**Règle 4 (bleu)** — Au-delà d'un montant estimé, le dossier sort du parcours
100 % autonome.
- Exemple (vert) : dommage estimé à 500 $ → traitement autonome complet,
  remboursement proposé directement.
- Exemple (vert) : dommage estimé à 15 000 $ → dossier transféré à un expert,
  client notifié du changement de parcours.

**Questions (rouge)**
- Quel est le délai maximal entre l'incident et la déclaration pour rester
  recevable (délai de prescription) ?
- Le client peut-il corriger sa déclaration après soumission, ou doit-il appeler
  un agent pour toute modification ?
- Que fait-on si le client déclare deux fois le même sinistre par erreur
  (doublon) ?

**Story découpée (jaune, nouvelle carte)**
« Permettre au client de suivre l'état d'avancement de son dossier après
ouverture » — mise de côté, hors scope de cette première story.

**Lecture pédagogique de cette fixture** : 4 règles pour une story reste
raisonnable, mais la règle 4 (seuil de montant) est assez riche pour devenir sa
propre story si le temps manque. Les 3 questions rouges sont de vraies inconnues
métier, pas des désaccords d'opinion — exactement ce qui doit être capté puis
mis de côté plutôt que débattu en séance.

## 4. Fixtures additionnelles

**À VALIDER** : au moins une deuxième fixture est nécessaire pour varier les
exercices du module 0 (classification règle/exemple) et pour peupler le
simulateur de préparation (module Préparer) avec plusieurs stories candidates
de qualité différente (une trop grosse, une déjà claire, une bonne candidate).
À construire avec Lætitia lors du prochain incrément.

## 5. Critères de « prêt pour le développement »

Une story est prête quand : les règles connues sont couvertes par au moins un
exemple chacune (sauf règles jugées évidentes par l'équipe), les questions
rouges restantes sont mineures et peuvent être résolues en cours de
développement, et le groupe vote majoritairement « prêt ». Sinon : découper
(si trop de règles/trop gros) ou reporter avec des devoirs identifiés (si trop
de questions rouges bloquantes).
