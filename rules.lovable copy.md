# Lovable Rules

## Context

Nous travaillons sur un projet en monorepo. L’objectif est que les apps Admin et Pro soient pilotées par Lovable, qui génère l’UI et la logique. À terme, il suffira de brancher les véritables dépendances API pour que les projets Admin et Pro fonctionnent.

## Alias TypeScript

| Alias             | Cible                                      | Usage                                                 |
| ----------------- | ------------------------------------------ | ----------------------------------------------------- |
| `@lovable/*`      | `apps/lovable/*`                           | Code spécifique à l’application (lib, DI, router).    |
| `@ui/*`           | `packages/ui/src/*`                        | Design system, assets et helpers UI.                  |
| `@sgComponent/*`  | `packages/ui/src/components/sgComponent/*` | Composants métiers Lovable.                           |
| `@pages/*`        | `packages/pages/*`                         | Pages partagées.                                      |
| `@features/*`     | `packages/features/*`                      | Features et logique métier.                           |
| `@hooks/*`        | `packages/hooks/*`                         | Hooks transverses.                                    |
| `@utils/*`        | `packages/utils/*`                         | Utilitaires purs.                                     |
| `@lib/*`          | `packages/lib/*`                           | Clients API, Redux store, providers.                  |
| `@mock/*`         | `packages/mock/*`                          | Mocks et presenters (tests, données demo).            |
| `@presenter/*`    | `packages/mock/presenter/*`                | Présenteurs spécifiques (créez le dossier si besoin). |
| `@asset/*`        | `packages/asset/*`                         | Assets globaux.                                       |
| `@dependencies/*` | `packages/dependencie/*`                   | Providers et contrats d’injection.                    |

## Architecture Monorepo

- `apps/*` contient les surfaces applicatives. `apps/lovable` est la cible de production qui interconnecte `apps/admin` et `apps/pro`.
- `packages/*` héberge tout le code partagé. On ne duplique jamais de logique dans `apps/*` si elle peut vivre dans un package.

## Organisation du code partagé

### UI & Design System (`packages/ui`)

- `src/components/ui/` : ré-exporte shadcn/ui. Créez de nouvelles primitives via `bunx --bun shadcn@latest add <component>` puis synchronisez avec `components.json`.
- `src/components/sgComponent/` : composants métiers Lovable (ex. `AutoForm`, `RentalGuaranteeManagement`, `Sidebar`). Organisez-les par domaine (`autoform/`, `multi-step/`, `sidebar/`, etc.).
- `src/components/sgComponent/AutoForm` : regroupe tout le code nécessaire pour construire les formulaires avec Zod. Utilisez toujours AutoForm pour les formulaires.
- `src/components/sgComponent/multi-step` : contient le socle des formulaires multi-étapes. Utilisez-le pour tout formulaire multi-step.
- `src/components/sgComponent/sidebar` : contient la logique de la sidebar partagée entre les différentes apps.
- `src/components/template/` : gabarits d’écran. Ajoutez-y les layouts partagés plutôt que dans une app.
- Exports : privilégiez les exports nommés pour les primitives réutilisables. Les pages ou layouts complets peuvent rester en `export default`.

### Pages partagées (`packages/pages`)

- Contient les pages complètes réutilisables, partagées entre Lovable et les autres apps.

### Features & logique métier (`packages/features`)

- Les fonctionnalités sont regroupées par domaine (`common`, `pro`, `admin`, `model`, etc.). Chaque feature expose les use cases de l’application cible (hooks, services, slices Redux). Le dossier `common` rassemble les use cases communs aux apps. `model` centralise les interfaces globales. Les dossiers `pro` et `admin` contiennent la logique métier spécifique à chaque app.
- Dans `pro/client`, rangez les features qui nécessitent un state propre à l’app Pro.
- Exemple : `packages/features/pro/organization/retrieveOrganization` contient l’action, le use case via `createAppAsyncThunk`, ainsi que les `queryOptions` pour le cache React Query. Avec Redux nous restons événementiels via les actions. `packages/features/pro/organization/model` regroupe les modèles API du domaine Organization. `packages/features/pro/organization/api-organization.ts` expose les appels API correspondants.

### Données mock & presenters (`packages/mock`)

- Le dossier mock contient les fausses API et données utilisées par l’app Lovable. Elles sont injectées par inversion de dépendances via Redux. Respectez la convention suivante : `nomApp/data` et `nomApp/gateway`.

### Configuration (`packages/config`)

- Toutes les configurations du projet ou du monorepo (TypeScript, ESLint, Prettier, etc.) se trouvent ici.

### i18n (`packages/i18n`)

- `packages/i18n` est réservé aux dictionnaires multilingues. Pas encore fonctionnel. <!-- TODO -->

### Dependencie (`packages/dependencie`)

- Ce dossier regroupe l’inversion de dépendance à utiliser dans les hooks React lorsqu’il faut relier Lovable aux autres apps. On y trouve aussi les adaptateurs qui relient les classes API mockées aux vraies APIs.

### Lib (`packages/lib`)

- Regroupe la configuration des dépendances installées.

### Asset (`packages/asset`)

- Contient tous les assets des apps : images, polices, etc.

## Conventions de nommage

- Tous les fichiers sont en TypeScript (`.ts`/`.tsx`).
- Les hooks personnalisés commencent par `use` et vivent dans `packages/hooks` ou dans la feature qui les consomme.

## Règles importantes

- **TOUJOURS** vérifier les types avec `bunx tsc --noEmit -p tsconfig.json` quand vous modifiez l’architecture ou le code partagé.
- **TOUJOURS** contrôler la qualité avec `bun run lint` et `bun run format:check`.
- **NE JAMAIS** ajouter de CSS arbitraire dans les composants ; utilisez au maximum le thème shadcn et évitez de multiplier les couleurs Tailwind.
- **TOUJOURS** réutiliser avant de créer : cherchez un composant ou hook existant avant toute duplication.
- **NE JAMAIS** laisser un composant ou hook partagé dans `apps/lovable`. **TOUJOURS** l’extraire dans `packages`.
- **TOUJOURS** placer les nouveaux composants dans `packages/ui/src/components/sgComponent`.
- **TOUJOURS** placer les nouvelles pages dans `packages/pages/`.
- **TOUJOURS** placer les assets dans `packages/asset/`.
- **TOUJOURS** utiliser les alias d’import (`@ui`, `@pages`, etc.).
- **TOUJOURS** vérifier si un composant existant peut être réutilisé avant d’en créer un nouveau.
- **NE JAMAIS** créer de composants directement dans les apps.
- **NE JAMAIS** dupliquer des composants entre les apps.
- **NE JAMAIS** recréer des composants UI de base : utilisez shadcn/ui.
- **TOUJOURS** utiliser TypeScript avec des types adaptés.
- **TOUJOURS** Utilisez toujours AutoForm pour les formulaires
- **TOUJOURS** Utilisez toujours multi-step pour tout formulaire multi-step.

## Workflow nouvelle feature

1. Trouvez le bon dossier dans `features`, sinon créez-en un.
2. Ajoutez le modèle fourni dans le prompt ; s’il n’existe pas, créez-le et réutilisez les modèles communs si nécessaire.
3. Ajoutez les mock data dans `packages/mock/*`.
4. Déclarez la dépendance dans `apps/lovable/lib/redux/dependencies.ts` si besoin.
5. Créez la feature et implémentez toute la logique.
6. Vérifiez qu’il n’y a pas d’erreur TypeScript.

## Dépendances utilisées

- Tailwind CSS v4
- shadcn
- Google Maps
- TanStack Query
- TanStack Start
- TanStack Router
- TanStack Table
- Axios
- Motion
- Redux Toolkit
