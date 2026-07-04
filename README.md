# Coach Example Mapping

**Outil pédagogique pour apprendre l'Example Mapping et préparer un atelier réel.**
Pour les équipes TI qui n'ont jamais pratiqué la technique (Matt Wynne, Cucumber)
et veulent comprendre ce qui est attendu, s'exercer sur la distinction règle/exemple,
et arriver préparées à leur premier atelier — sans jamais remplacer l'atelier
lui-même : la conversation et les cartes (physiques ou tableau habituel de l'équipe)
restent l'outil de la session réelle.

[![Licence : CC BY-SA 4.0](https://img.shields.io/badge/Licence-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/deed.fr)

## Ce que fait l'outil (V1)

- **Apprendre** : le tronc commun de l'Example Mapping — la distinction règle vs
  exemple, les 4 cartes (story/règle/exemple/question), les rôles, le rythme
  d'une session, la clôture par vote.
- **Préparer l'atelier** : un simulateur de décision pour choisir la bonne story
  à apporter et composer son trio d'amigos, plus une checklist logistique.
- Un toggle manuel **Guidé / Autonome** pour adapter la quantité d'aide affichée,
  à tout moment, sans détection automatique.

Hors périmètre V1 : aucun tableau numérique ne remplace les post-its pendant
l'atelier réel — voir ROADMAP.md.

## État du projet

Voir `STATUS.md` pour ce qui est fait / en cours / prochain. Voir `ROADMAP.md`
pour la portée V1, `DECISIONS.md` pour le journal des choix techniques,
`DOMAINE.md` pour le contenu pédagogique validé, `UX-UI.md` pour le système
visuel et le parcours.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm test         # suite de tests (domaine, corpus, UI)
npm run build    # build HTML autoporté
```
