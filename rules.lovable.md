# Lovable Rules

## Structure du projet
Ce projet utilise une architecture monorepo avec des packages partagés.

## Placement des fichiers

### Composants UI personnalisés
- **Emplacement** : `packages/ui/src/components/`
- **Règle** : Tous les composants React réutilisables doivent être placés dans ce dossier
- **Exemples** : Navigation, SpaceHero, modals, cartes personnalisées, etc.
- **Import** : Utiliser l'alias `@ui/components/NomDuComposant`

### Composants UI Shadcn/ui
- **Emplacement** : `packages/ui/src/components/ui/`
- **Règle** : Composants de base Shadcn/ui (button, card, input, etc.)
- **Import** : Utiliser l'alias `@ui/components/ui/nom-du-composant`

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

// Composants UI Shadcn/ui
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";

// Pages
import Index from "@pages/Index";
import SolarSystem from "@pages/SolarSystem";

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

## Règles importantes

1. **TOUJOURS** placer les nouveaux composants dans `packages/ui/src/components/`
2. **TOUJOURS** placer les nouvelles pages dans `packages/pages/`
3. **TOUJOURS** placer les assets dans `packages/ui/src/assets/`
4. **TOUJOURS** utiliser les alias d'import (`@ui`, `@pages`)
5. **NE JAMAIS** créer de composants directement dans les apps
6. **NE JAMAIS** dupliquer des composants entre les apps
7. **TOUJOURS** exporter les composants avec `export default`
8. **TOUJOURS** utiliser TypeScript avec des types appropriés
