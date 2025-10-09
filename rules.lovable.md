# Lovable Rules

## Context

Nous travaillons sur un projet en monorepo. L’objectif est que les apps Admin et Pro soient pilotées par Lovable, qui génère l’UI et la logique. À terme, il suffira de brancher les véritables dépendances API pour que les projets Admin et Pro fonctionnent. apps/lovable est la surface de prod qui orchestre admin et pro, tout le reste vit dans `packages/\*`.

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
- Les use cases sont toujours portés par Redux Toolkit (`createAction`, `createSlice`, `createAppAsyncThunk`) et orchestrent les gateways via des événements. Ne créez pas de classes de use case qui appellent directement un gateway (`new RetrieveClaimsUseCase(claimsGateway).execute(...)`). Au lieu de cela, exposez un thunk et un `queryOption` qui reçoivent `dispatch` (cf. `retrieveKpiQueryOption`).
- Chaque feature doit proposer un presenter dédié pour la composition UI (hook, factory ou composant conteneur). Le presenter adapte la donnée pour la vue et reste dans `packages/pages/**/*`. Inspirez-vous du pattern `packages/pages/pro/Gli/components/stats/useStats.tsx` : le hook lit le state Redux (`useSelector`), passe le `dispatch` au `queryOption`, et ne laisse aucune logique métier dans le composant d’affichage.
- Lorsque vous ajoutez un `queryOption`, veillez à ce qu’il prenne en charge `dispatch` et toute dépendance externe via les `dependencies` injectées par la route. On ne crée jamais de logique d’accès API directement dans un composant React.
- Documentez systématiquement les presenters et exports de feature dans les `index.ts` correspondants pour garantir l’arborescence d’imports (`@features/*`, `@pages/*`).

### Données mock & presenters (`packages/mock`)

- Le dossier mock contient les fausses API et données utilisées par l’app Lovable. Elles sont injectées par inversion de dépendances via Redux. Respectez la convention suivante : `nomApp/data` et `nomApp/gateway`. ici pour chaque ajout tu devras bien mettre l'exportation dans les index.ts qui ce trouve dans les dossier

### Configuration (`packages/config`)

- Toutes les configurations du projet ou du monorepo (TypeScript, ESLint, Prettier, etc.) se trouvent ici.

### i18n (`packages/i18n`)

- `packages/i18n` est réservé aux dictionnaires multilingues. Pas encore fonctionnel. <!-- TODO -->

### Dependencie (`packages/dependencie`)

- On y trouve aussi les adaptateurs qui relient les classes API mockées aux vraies APIs.

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
- **NE JAMAIS** toucher au autres apps autre que lovable.
- **NE JAMAIS** toucher au config de l'app, ne touche jamais au fichier de config typescript.
- **TOUJOURS** utiliser TypeScript avec des types adaptés.
- **TOUJOURS** Utilisez toujours AutoForm pour les formulaires
- **TOUJOURS** Utilisez toujours multi-step pour tout formulaire multi-step.
- **TOUJOURS** Utilisez tanstack-table pour les tabeau.
- **TOUJOURS** Chaque ajout de page tu doit le plug à l'app lovable. **NE JAMAIS** toucher au autres apps autre que lovable.

## Workflow nouvelle feature

1. Trouvez le bon dossier dans `features`, sinon créez-en un.
2. Ajoutez le modèle fourni dans le prompt ; s’il n’existe pas, créez-le et réutilisez les modèles communs si nécessaire.
3. Ajoutez les mock data dans `packages/mock/*` et creer l'adapter dans `packages/dependencie` dans le bon dossier.
4. Déclarez la dépendance dans `apps/lovable/lib/redux/dependencies.ts` si besoin.
5. Créez la feature et implémentez toute la logique. ajout le fichier : Le usecase avec REDUX, queryOption ou mutationOption, l'action redux qui seras appeler dans le usecase tout le temps. l'action peut etre ajouter à d'autre reducer si besoin de faire de l'eventmentiel. Crée le presenter hook ansi que le compteur qui plug le presenter.
6. Créez un dossier au niveau de la page qui contiendras le composant et le presenter qui contiendra toute la logique applicative à la feature
7. Vérifiez qu’il n’y a pas d’erreur TypeScript.

# Exemple code feature

```ts
// packages/pages/pro/GliClaims/components/ClaimsStats.tsx

import * as React from "react";
import { Users, CheckCircle, Home, AlertTriangle, Euro } from "lucide-react";
import { useStats } from "@pages/pro/Gli/components/stats/useStats";

export const StatsContainer = () => {
  const { averageRent, guaranteedTenants, openClaims, totalCandidates, validatedFiles } =
    useStats();
  console.log(averageRent, guaranteedTenants, openClaims, totalCandidates, validatedFiles);

  return (
    <>
      <DashboardStats
        stats={{
          averageRent,
          guaranteedTenants,
          openClaims,
          totalCandidates,
          validatedFiles,
        }}
      />
    </>
  );
};

function DashboardStats({
  stats,
}: {
  stats: {
    totalCandidates: number;
    validatedFiles: number;
    guaranteedTenants: number;
    openClaims: number;
    averageRent: number;
  };
}) {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-wrap gap-3">
        <StatCard
          icon={<Users size={16} className="text-[#8B5CF6]" />}
          value={stats.totalCandidates}
          title="Total candidats"
          color="#8B5CF6"
        />
        <StatCard
          icon={<CheckCircle size={16} className="text-[#3B82F6]" />}
          value={stats.validatedFiles}
          title="Dossiers validés"
          color="#3B82F6"
        />
        <StatCard
          icon={<Home size={16} className="text-[#10B981]" />}
          value={stats.guaranteedTenants}
          title="Locataires garantis"
          color="#10B981"
        />
        <StatCard
          icon={<AlertTriangle size={16} className="text-[#EF4444]" />}
          value={stats.openClaims}
          title="Sinistres ouverts"
          color="#EF4444"
        />
        <StatCard
          icon={<Euro size={16} className="text-[#F59E0B]" />}
          value={stats.averageRent}
          title="Loyer moyen garanti (€)"
          color="#F59E0B"
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  title,
  color,
}: {
  icon: React.ReactNode;
  value: number | string;
  title: string;
  color: string;
}) {
  return (
    <div className="flex-1 min-w-[150px] bg-white border border-gray-100 rounded-md shadow-sm p-3">
      <div className="flex items-center space-x-3">
        <div style={{ backgroundColor: `${color}10` }} className="p-2 rounded-md">
          {icon}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-800">{value}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}

// packages/pages/pro/Gli/components/stats/useStats.tsx

import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { retrieveKpiQueryOption } from "@features/pro/gli/Subscriptions/retrieveKpi/retrieveKpiQueryOption";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

export const useStats = () => {
  const dispatch = useDispatch();
  const subscriptionId = useSelector(selectSubscriptionId);
  const { data: kpi } = useQuery(
    retrieveKpiQueryOption(
      {
        data: {},
        params: {
          subscriptionId: subscriptionId!,
        },
      },
      dispatch,
    ),
  );
  return {
    averageRent: kpi?.averageGuaranteedRentAmount ?? 0,
    guaranteedTenants: kpi?.activeRentalApprovalCount ?? 0,
    openClaims: kpi?.claimCount ?? 0,
    totalCandidates: kpi?.rentalApprovalCount ?? 0,
    validatedFiles: kpi?.approvedRentalApprovalCount ?? 0,
  };
};

// packages/features/pro/gli/Subscriptions/retrieveSubscription/retrieveSubscription.usecase.ts

import { createAppAsyncThunk } from "@lib/redux/createAppAsyncThunk";
import { Dependencies } from "@pro/lib/dependencies";
import { subscriptionLoaded } from "@features/pro/gli/Subscriptions/retrieveSubscription/subscription.action";

export interface CtxretrieveSubscription {
  params: {};
  data: {};
}
export const retrieveSubscriptionUsecase = createAppAsyncThunk(
  "subscription/retrieveSubscriptionUsecase",
  async (ctx: CtxretrieveSubscription, { dispatch, extra }) => {
    const { subscriptionApi } = extra as Dependencies;

    try {
      const data = await subscriptionApi.getSubscription({
        data: {},
        params: {},
      });
      dispatch(subscriptionLoaded(data.payload));
      return data.payload;
    } catch (error) {
      throw error;
    }
  },
);

// packages/features/pro/gli/Subscriptions/retrieveSubscription/retrieveSubscriptionQueryOption.ts
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { queryOptions } from "@tanstack/react-query";

import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import {
  CtxretrieveSubscription,
  retrieveSubscriptionUsecase,
} from "./retrieveSubscription.usecase";

export const retrieveSubscriptionQueryOption = (
  ctx: CtxretrieveSubscription,
  dispatch?: Dispatch<UnknownAction> | null | undefined,
) =>
  queryOptions<GLICreationResponse>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const data = await dispatch?.(retrieveSubscriptionUsecase(ctx) as any).unwrap();
      return data;
    },
  });

// packages/features/pro/gli/Subscriptions/retrieveSubscription/subscription.action.ts

import { createAction } from "@reduxjs/toolkit";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";

export const subscriptionLoaded = createAction<GLICreationResponse>("SUBSCRIPTION_LOADED");

// packages/features/pro/gli/Subscriptions/api-subscription.ts

import {
  getKpiRequest,
  SubscriptionGateway,
  getSubscriptionRequest,
} from "@dependencies/interface/pro/SubscriptionGateway";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";
import { ApiService } from "@lib/axios/ApiService";

export class ApiSubscriptionGateway implements SubscriptionGateway {
  constructor(private apiService: ApiService) {}

  async getSubscription({
    params,
    data,
  }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    return this.apiService.get(`/v1/gli/subscription`);
  }
  async getKpi({ params }: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    return this.apiService.get(`/v1/gli/subscriptions/${params.subscriptionId}/kpi`);
  }
}

// packages/mock/pro/gateways/MockSubscriptionGateway.ts

import { mockSubscriptions } from "@mock/pro/data/subscriptions";
import {
  getKpiRequest,
  getSubscriptionRequest,
  SubscriptionGateway,
} from "@dependencies/interface/pro/SubscriptionGateway";
import { mockKpiData } from "@mock/pro/data";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";

export class MockSubscriptionGateway implements SubscriptionGateway {
  async getSubscription({
    params,
    data,
  }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      error: {
        errorCode: "NOT_FOUND",
        message: "Subscription not found",
      },
      requestId: "mock-request-id",
      resultStats: 1,
      payload: mockSubscriptions,
    };
  }
  async getKpi({ params }: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      error: {
        errorCode: "NOT_FOUND",
        message: "Subscription not found",
      },
      requestId: "mock-request-id",
      resultStats: 1,
      payload: mockKpiData,
    };
  }
}

// packages/dependencie/interface/pro/SubscriptionGateway.ts

import { ApiRequest } from "@features/model/apiRequest";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";

export type getSubscriptionRequest = ApiRequest<{}, {}>;
export type getKpiRequest = ApiRequest<
  {
    subscriptionId: string;
  },
  {}
>;

export interface SubscriptionGateway {
  getSubscription({
    params,
    data,
  }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>>;
  getKpi({ params, data }: getKpiRequest): Promise<SmartGarantResponse<Kpi>>;
}

```

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

# READ

- `autoform.md`
- `multistep.md`
