# Dossier de Tests - SI Relevé

## Structure des Screenshots

Ce dossier contient les captures d'écran des tests fonctionnels organisées par module.

### Organisation

```
tests/
└── screenshots/
    ├── auth/              # Tests d'authentification
    ├── users/             # Tests de gestion des utilisateurs (SuperAdmin)
    ├── compteurs/         # Tests de gestion des compteurs
    ├── agents/            # Tests de gestion des agents
    ├── clients/           # Tests de gestion des clients
    ├── releves/           # Tests de consultation des relevés
    ├── integration/       # Tests d'intégration avec systèmes externes
    └── security/          # Tests de sécurité et contrôle d'accès
```

### Conventions de Nommage

Les fichiers de screenshots suivent la convention :

```
[ID_TEST]-[description-courte].png
```

Exemples :

- `AUTH-001-connexion-valide.png`
- `COMP-002-creation-compteur.png`
- `INTEG-003-reception-releves.png`

### Liste des Tests par Module

#### Authentification (auth/)

- AUTH-001 : Connexion avec identifiants valides
- AUTH-002 : Connexion avec identifiants invalides
- AUTH-003 : Session expirée après 10 minutes

#### Gestion Utilisateurs (users/)

- USER-001 : Création d'un nouvel utilisateur
- USER-002 : Modification d'un utilisateur
- USER-003 : Suppression d'un utilisateur

#### Gestion Compteurs (compteurs/)

- COMP-001 : Liste paginée des compteurs
- COMP-002 : Création d'un nouveau compteur
- COMP-003 : Suppression d'un compteur

#### Gestion Agents (agents/)

- AGENT-001 : Liste des agents
- AGENT-002 : Affectation agent à quartier

#### Gestion Clients (clients/)

- CLIENT-001 : Tous les clients (sans pagination)
- CLIENT-002 : Clients paginés

#### Gestion Relevés (releves/)

- RELEVE-001 : Liste des relevés

#### Intégration (integration/)

- INTEG-001 : Réception clients depuis SI Commercial
- INTEG-002 : Réception agents depuis SI RH
- INTEG-003 : Réception relevés depuis App Mobile
- INTEG-004 : Envoi consommations vers SI Facturation

#### Sécurité (security/)

- SEC-001 : Accès refusé sans authentification
- SEC-002 : Restriction d'accès basée sur les rôles

## Processus de Création des Screenshots

1. **Exécuter le test** selon les étapes décrites dans le cahier de tests
2. **Capturer l'écran** au moment du résultat attendu
3. **Nommer le fichier** selon la convention [ID_TEST]-[description].png
4. **Placer le fichier** dans le sous-dossier approprié
5. **Annoter si nécessaire** pour mettre en évidence les éléments importants

## Outils Recommandés

- **Windows** : Outil Capture d'écran (Win + Shift + S)
- **Annotation** : Paint, Snagit, ou tout éditeur d'images
- **Format** : PNG (pour la qualité)
- **Résolution** : Minimum 1920x1080

## Référence

Voir le fichier `documentation/cahier_de_tests.tex` pour les détails complets de chaque test.
