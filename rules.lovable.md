# Lovable Rules

## Structure du projet
Ce projet utilise une architecture monorepo avec des packages partagés.

## Placement des fichiers

### Composants UI personnalisés
- **Emplacement** : `packages/ui/src/components/`
- **Règle** : Tous les composants React réutilisables doivent être placés dans ce dossier
- **Exemples** : Navigation, SpaceHero, modals, cartes personnalisées, etc.
- **Import** : Utiliser l'alias `@ui/NomDuComposant`

### Composants sgComponent (Business Logic)
- **Emplacement** : `packages/ui/src/components/sgComponent/`
- **Règle** : Composants métier spécialisés pour la gestion immobilière et GLI
- **Sous-dossiers** :
  - `autoform/` : Composants de formulaires automatiques
  - `gli/` : Composants pour la gestion des garanties locatives
  - `sidebar/` : Composants de navigation et sidebar
  - `multi-step/` : Composants pour les formulaires multi-étapes
- **Exemples** : RentalGuaranteeManagement, AutoForm, AlertDialog, Loading
- **Import** : Utiliser l'alias `@sgComponent/sous-dossier/NomDuComposant`

### Composants UI Shadcn/ui
- **Emplacement** : `packages/ui/src/components/ui/`
- **Règle** : Composants de base Shadcn/ui (button, card, input, etc.)
- **Import** : Utiliser l'alias `@ui/nom-du-composant`

### Pages
- **Emplacement** : `packages/pages/`
- **Règle** : Toutes les pages complètes doivent être placées dans ce dossier
- **Exemples** : Index.tsx, SolarSystem.tsx, NotFound.tsx, etc.
- **Import** : Utiliser l'alias `@pages/NomDeLaPage`

### Assets (images, icônes, etc.)
- **Emplacement** : `packages/ui/src/assets/`
- **Règle** : Toutes les images, icônes, et autres assets statiques
- **Exemples** : hero-space.jpg, solar-system.jpg, logos, etc.
- **Import** : Utiliser l'alias `@ui/assets/nom-du-fichier`

### Utilitaires et hooks
- **Emplacement** : `packages/ui/src/lib/` pour les utilitaires
- **Emplacement** : `packages/ui/src/hooks/` pour les hooks React
- **Import** : Utiliser l'alias `@ui/lib/utils` ou `@ui/hooks/nom-du-hook`

### Mock et Presenters (Architecture Clean Code)
- **Emplacement** : `packages/mock/`
- **Structure** :
  - `interfaces/` : Interfaces TypeScript et contrats
  - `types/` : Types de domaine et DTOs
  - `gateways/` : Implémentations des gateways (accès données)
  - `presenters/` : Logique de présentation et hooks
  - `data/` : Données de test et utilitaires
  - `constants/` : Constantes et configurations
- **Exemples** : UseSubscriptionPresenter, MockRentalApprovalsGateway, StatusOption
- **Import** : Utiliser `@mock/index` pour tout importer ou des imports spécifiques

## Conventions de nommage

### Composants
- PascalCase pour les noms de composants : `SpaceHero`, `Navigation`
- Fichiers en PascalCase : `SpaceHero.tsx`

### Pages
- PascalCase pour les noms de pages : `Index`, `SolarSystem`
- Fichiers en PascalCase : `Index.tsx`, `SolarSystem.tsx`

### Assets
- kebab-case pour les fichiers : `hero-space.jpg`, `solar-system.jpg`

## Imports à utiliser

```typescript
// Composants UI personnalisés
import Navigation from "@ui/components/Navigation";
import SpaceHero from "@ui/components/SpaceHero";

// Composants sgComponent (Business Logic)
import RentalGuaranteeManagement from "@sgComponent/gli/RentalGuaranteeManagement";
import { AutoForm } from "@sgComponent/autoform/AutoForm";
import { AlertDialog } from "@sgComponent/AlertDialog";
import { Loading } from "@sgComponent/Loading";
import { Sidebar } from "@sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@sgComponent/sidebar/SiteHeader";
import { SearchInput } from "@sgComponent/searchInput";
import MultiStepForm from "@sgComponent/multi-step";

// Composants UI Shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";

// Pages
import Index from "@pages/Index";
import SolarSystem from "@pages/SolarSystem";
import { GliPage } from "@pages/Gli";

// Mock et Presenters (Clean Architecture)
import { 
  UseSubscriptionPresenter, 
  UseKpiPresenter,
  createUseSubscriptionPresenter,
  createUseKpiPresenter,
  MockRentalApprovalsGateway
} from "@mock/index";

// Assets
import heroImage from "@ui/assets/hero-space.jpg";

// Utilitaires
import { cn } from "@ui/lib/utils";
```

## Structure CSS et styling

### Tailwind CSS v4
- Configuration dans `apps/lovable/index.css` et `apps/admin/src/styles/app.css`
- Utiliser les classes personnalisées définies dans le thème
- Classes personnalisées disponibles : `bg-gradient-space`, `shadow-cosmic`, `animate-float`, etc.

### Couleurs du thème cosmique
- Primary: `text-primary`, `bg-primary`
- Accent: `text-accent`, `bg-accent`
- Background: `bg-background`, `text-foreground`
- Muted: `text-muted-foreground`, `bg-muted`

### Composants sgComponent spécialisés
**Utiliser ces composants pour les fonctionnalités métier :**
- `RentalGuaranteeManagement` - Gestion complète des garanties locatives avec tableau
- `AutoForm` - Génération automatique de formulaires depuis des schémas
- `AlertDialog` - Dialogues d'alerte et confirmation
- `Loading` - Indicateur de chargement animé
- `Sidebar` - Navigation latérale avec gestion responsive
- `SiteHeader` - En-tête de site avec navigation
- `SearchInput` - Champ de recherche avec dropdown et debounce
- `MultiStepForm` - Formulaires multi-étapes avec navigation

## Règles importantes

1. **TOUJOURS** placer les nouveaux composants dans `packages/ui/src/components/`
2. **TOUJOURS** placer les nouvelles pages dans `packages/pages/`
3. **TOUJOURS** placer les assets dans `packages/ui/src/assets/`
4. **TOUJOURS** utiliser les alias d'import (`@ui`, `@pages`, `@sgComponent`, `@mock`, `@presenter`)
5. **TOUJOURS** vérifier si un composant existant peut être utilisé avant d'en créer un nouveau
6. **NE JAMAIS** créer de composants directement dans les apps
7. **NE JAMAIS** dupliquer des composants entre les apps
8. **NE JAMAIS** recréer des composants UI de base (utiliser Shadcn/ui)
9. **TOUJOURS** exporter les composants avec `export default`
10. **TOUJOURS** utiliser TypeScript avec des types appropriés
11. **TOUJOURS** utiliser l'injection de dépendances pour les pages réutilisables
