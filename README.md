# TaskFlow

![Logo TypeScript](00-DOC/images/typescript-logo.png)

📆 08/2026

_TaskFlow_ est une application pédagogique de gestion de tâches réalisée en TypeScript. Elle met en pratique le typage strict, la manipulation du DOM, les classes, les modules, les appels à une API REST et plusieurs fonctionnalités avancées du système de types.

## Fonctionnalités

- Chargement des tâches depuis une API REST
- Création d'une tâche avec un titre et une priorité
- Gestion des statuts (todo, doing, done)
- Gestion des priorités (low, normal, high)
- Recherche par titre, insensible à la casse
- Filtrage par statut, priorité et utilisateur assigné
- Combinaison simultanée de plusieurs filtres
- Validation à l'exécution des réponses de l'API
- Gestion explicite des succès et des erreurs avec `Result<T>`

## Technologies

- TypeScript en mode strict
- JavaScript ES2022 et modules ES
- API Fetch
- HTML5
- Bootstrap 5.3
- localStorage pour le module de persistance

## Installation

Prérequis : Node.js, npm et un serveur HTTP local.

```bash
npm install
npx tsc
```

Le fichier à servir est _public/index.html_.
```

Pour surveiller et recompiler les fichiers pendant le développement :

```bash
npx tsc --watch
```

## API REST attendue

L'application utilise la ressource `/api/tasks`. Une API compatible doit exposer les routes suivantes :

| Méthode | Route | Utilisation |
| ------- | ----- | ----------- |
| `GET` | `/api/tasks` | Récupérer toutes les tâches |
| `POST` | `/api/tasks` | Créer une tâche |
| `PATCH` | `/api/tasks/:id` | Modifier partiellement une tâche |
| `DELETE` | `/api/tasks/:id` | Supprimer une tâche |

Sans API disponible sur ces routes, le chargement produira une erreur HTTP ou réseau dans la console du navigateur.

Une tâche renvoyée par l'API respecte cette structure :

```json
{
  "id": 1,
  "title": "Apprendre TypeScript",
  "description": "Relire le chapitre sur les génériques",
  "status": "todo",
  "priority": "high",
  "assignee": {
    "id": 2,
    "firstname": "Ada",
    "lastname": "Lovelace",
    "email": "ada@example.com"
  }
}
```

`description` et `assignee` sont optionnels. Pour une création, le client n'envoie pas d'identifiant : celui-ci doit être ajouté par l'API dans sa réponse.

## Organisation du projet

```text
taskflow/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── apiFetch.ts
│   │   └── taskApi.ts
│   ├── models/
│   │   ├── Task.ts
│   │   ├── TaskFilters.ts
│   │   └── User.ts
│   ├── services/
│   │   ├── filterTasks.ts
│   │   └── TaskService.ts
│   ├── storage/
│   │   └── taskStorage.ts
│   ├── types/
│   │   └── Result.ts
│   ├── ui/
│   │   └── TaskRenderer.ts
│   ├── utils/
│   │   └── validators.ts
│   └── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

Les responsabilités sont séparées :

- `api` centralise les communications HTTP ;
- `models` décrit les données et leurs variantes métier ;
- `services` gère la collection et le filtrage des tâches ;
- `storage` contient la persistance locale issue d'une étape antérieure ;
- `ui` assure le rendu dans le DOM ;
- `utils` valide les valeurs provenant du DOM ou de l'API.

## Notions TypeScript mises en œuvre

- Alias, interfaces et unions de littéraux
- Propriétés optionnelles et `readonly`
- Narrowing et gardes de type
- Classes et encapsulation
- Types génériques avec `Result<T>` et `apiFetch<T>()`
- Union discriminée avec `success`
- Types utilitaires `Partial`, `Pick`, `Omit` et `Readonly`
- Types dérivés `NewTask`, `TaskChanges` et `TaskSummary`
- Fonctions asynchrones et `Promise`
- Validation des données externes à partir de `unknown`
- Typage précis des éléments du DOM

## Compilation

Le code source se trouve dans `src/`. TypeScript génère les modules JavaScript dans `dist/` selon la configuration de `tsconfig.json`.

Pour vérifier les types sans générer de fichiers :

```bash
npx tsc --noEmit
```
