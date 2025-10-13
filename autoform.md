# AutoForm – Guide de référence interne

## Objectifs

- Ancrer une convention commune autour de `AutoForm`.
- Décrire la composition d’un schéma (`ZodProvider`, `fieldConfig`) et le cycle de vie des données.
- Illustrer les cas d’usage rencontrés dans le parcours GLI : candidature locataire, logement, bail, locataires/garants et documents.

## Anatomie d’un formulaire AutoForm

- **`AutoForm`** : composant contrôleur qui orchestre la validation, la soumission et le rendu.
- **`schema`** : instance de `ZodProvider` enveloppant un schéma `zod`. Chaque champ appelle `fieldConfig(...)` pour brancher la métadonnée UI.
- **`StepProps<T>`** : contrat standard des écrans multi-étapes (`data`, `onDataChange`, `id`).
- **Accrochages optionnels** :
  - `formComponents` pour fournir des rendus personnalisés.
  - `defaultValues` pour pré-hydrater le formulaire.
  - `onSubmit`, `onErrorForm` pour piloter les mutations et la gestion d’erreur.

## Exemple minimal

```tsx
import { z } from "zod";
import { AutoForm, ZodProvider, fieldConfig, StepProps } from "@sg/design";

type ExampleForm = { lastName: string; phone: { phoneNumber: string; countryCode: string } };

export const ExampleForm = ({ data, onDataChange, id }: StepProps<ExampleForm>) => (
  <AutoForm
    id={id}
    defaultValues={data}
    schema={
      new ZodProvider(
        z.object({
          lastName: z
            .string()
            .min(1)
            .superRefine(fieldConfig({ label: "Nom", inputProps: { required: false } })),
          phone: z
            .object({
              phoneNumber: z.string().min(6),
              countryCode: z.string().min(1),
            })
            .superRefine(fieldConfig({ label: "Téléphone", fieldType: "phone" })),
        }),
      )
    }
    onSubmit={(values) => onDataChange(values)}
  />
);
```

## Configurer les champs

### `fieldConfig`

`fieldConfig` encapsule toutes les métadonnées nécessaires au composant d’input :

- `label`, `description`, `placeholder` : textes affichés (chaînes brutes ou construites dynamiquement).
- `fieldType` : sélectionne un rendu spécifique (`'currency'`, `'phone'`, `'nestedbutton'`, `'situation'`, `'address'`, etc.).
- `inputProps` : propage des props natives (`required`, `min`, `type`, `disabled`…).
- `customData` : charge utile libre pour un renderer (ex. listes d’options, groupes, icônes).
- `shouldRender(formValues)` : masquage conditionnel côté UI.

### Champs conditionnels (`shouldRender`)

Sur un step bail, un champ peut être masqué en fonction d'une réponse précédente :

```tsx
rentAmount: z.number({ message: "Champ requis" }).superRefine(
  fieldConfig({
    fieldType: "currency",
    label: "Loyer hors charges",
    shouldRender(data) {
      return data?.sittingTenant === "true";
    },
  }),
);
```

> Utilisez une vérification défensive (`data?.field`) car `shouldRender` peut recevoir `undefined` avant l’hydratation complète.

### Options complexes

- **`customData.data`** : alimente les boutons illustrés (sélecteurs de situation, nested buttons) ou les listes dynamiques.
- **`fieldType: 'address'`** : gère la suggestion d’adresse et le mode saisie libre.
- **`fieldType: 'phone'`** : encapsule code pays + numéro et s’intègre dans les formulaires de contacts.

### Catalogue des composants intégrés

Les rendus par défaut sont centralisés dans `packages/ui/src/components/sgComponent/autoform/components` et exposés via `ShadcnAutoFormFieldComponents`. Ils couvrent la majorité des besoins métiers :

- `string` → `StringField` : input texte shadcn.
- `number` → `NumberField` : saisie numérique classique.
- `boolean` → `BooleanField` : case à cocher.
- `date` → `DateField` : `<input type="date" />` natif (HTML5).
- `datepicker` → `DatePicker` : calendrier shadcn + popover (`react-day-picker`).
- `select` → `SelectField` : liste déroulante shadcn.
- `switch` → `Switch` : interrupteur.
- `currency` → `CurrencyInput` : formatage locale (fr-FR) + affichage `€`.
- `phone` → `PhoneComponent` : indicatif + numéro.
- `nestedbutton` → `NestedButtonsComponent` : choix hiérarchiques.
- `situation` → `SituationForm` : cartes illustrées (icône + label).
- `address` → `AdressComponent` : suggestion + saisie libre.

> Réutiliser ces `fieldType` avant de surcharger `formComponents`. Ils gèrent déjà les conventions Lovable (styles, accessibilité, formats).

### Utiliser le `DatePicker`

Privilégier `fieldType: 'datepicker'` pour les champs date afin de bénéficier de l’UI calendrier et de l’ISO string (`2024-01-31T00:00:00.000Z`) cohérente côté validation/mutation.

```tsx
const schema = new ZodProvider(
  z.object({
    period: z
      .string()
      .min(1, "Sélectionnez une date")
      .superRefine(
        fieldConfig({
          fieldType: "datepicker",
          label: "Période du bordereau",
          description: "Choisissez la date via le calendrier",
          inputProps: { placeholder: "Sélectionnez une date" },
        }),
      ),
  }),
);
```

```tsx
import { format } from "date-fns";

<AutoForm
  id="create-bordereau-form"
  schema={schema}
  onSubmit={(values) => {
    const periodMonth = format(new Date(values.period), "yyyy-MM");
    runMutation({ ...values, period: periodMonth });
  }}
/>;
```

Astuce : adapter l’affichage (placeholder, format) via `fieldConfig.inputProps` et `fieldConfig.customData`. En cas de besoin spécifique (range, multi-date), passer un composant custom dans `formComponents`.

## Cycle de vie des données

1. **Initialisation**
   - Hiverner les données serveur via `defaultValues`.
   - S’appuyer sur `useQuery` pour remplir les champs avant d’afficher le step.

2. **Soumission**
   - `onSubmit` reçoit les données validées. Transformer si besoin avant l’appel d’API (conversion `Number`, `toBoolean`, mapping d’objets).
   - `onDataChange` (issu de `StepProps`) notifie l’étape parente lorsque le step est “validé”.

3. **Gestion d’erreurs**
   - `AutoForm` déclenche `onErrorForm` avec les erreurs agrégées (ex. transformer en notification via `generateFormErrorMessage`).
   - Prévoir une expérience utilisateur cohérente (toast, bannière, re-highlight).

## Intégrer des composants personnalisés

Un step documents peut exposer un composant custom :

```tsx
<AutoForm
  schema={
    new ZodProvider(
      z.object({
        documents: z.any().superRefine(fieldConfig({ fieldType: "documentsStructure" })),
      }),
    )
  }
  formComponents={{ documentsStructure: DocumentStructuresForm }}
  onSubmit={(values) => (validateDocuments() ? onDataChange(values) : toast("Documents manquants"))}
/>
```

Le composant `DocumentStructuresForm` reçoit les props `AutoFormFieldProps` (valeur, erreurs, helpers) et peut piloter une expérience riche : drag & drop, aperçus (`ViewFileFactory`), suppression via mutations (`useMutation` + `deleteDocumentMutationOption`).

## Formulaires composites & modaux

Le module locataires/garants illustre la combinaison de plusieurs `AutoForm` :

- **Liste principale** : affichage en cartes des locataires/garants (gestion état local, mutations `react-query`).
- **Modales d’ajout/édition** : `AutoForm` embarqué dans un `DrawerDialog`.
- **Suppression** : confirmation via `AlertDialog` + mutation dédiée.

Points clés à retenir :

- Passer un `id` distinct à chaque `AutoForm` pour relier le bouton de soumission (prop `form` des boutons).
- Pré-remplir les modales avec les données sélectionnées (`defaultValues`) en convertissant les types (`String(...)`, `toBoolean`).
- Réutiliser les utilitaires de formatage (`enumToStringValues`, helpers `convertLabel...`) pour construire `customData`.

## Bonnes pratiques

- **Schémas Zod typés** : centraliser les types (`export type ...FormType`) et réutiliser dans les props.
- **Gestion des conversions** : utiliser `z.coerce.number` pour parser les inputs textuels en nombres.
- **Découplage API/UI** : encapsuler les mutations dans `useMutation` et isoler les transformations dans `handleRegister...`.
- **Error UX** : fournir un feedback cohérent (`notificationAdded`, `toast`).
- **Réactivité** : invalider les `queryKey` pertinents après mutation pour synchroniser l’état.

## Schéma de référence (GLI)

```tsx
const schema = new ZodProvider(
  z.object({
    type: z
      .enum(getEnumNumericValuesAsStrings(RealEstateLotType) as [string, ...string[]])
      .superRefine(
        fieldConfig({
          label: "Type de logement",
          fieldType: "situation",
          customData: {
            data: [
              { label: "Appartement", value: RealEstateLotType.APARTMENT.toString(), icon: Home },
              { label: "Maison", value: RealEstateLotType.HOUSE.toString(), icon: Key },
            ],
          },
        }),
      ),
    address: z
      .object({
        country: z.string().min(1),
        address: z.string().min(1),
        fullAddress: z.string(),
        zipCode: z.string().min(1),
        city: z.string().min(1),
        isManual: z.boolean(),
      })
      .superRefine(
        fieldConfig({
          fieldType: "address",
          label: "Adresse du logement",
          customData: {
            showActionSelectedScopeSearch: false,
            searchScope: "france",
          },
        }),
      ),
    rentAmount: z.number().superRefine(
      fieldConfig({
        fieldType: "currency",
        label: "Loyer hors charges",
        description: "Avant prélèvement à la source",
      }),
    ),
  }),
);
```

Ce fragment regroupe les patterns essentiels : liste typée (`enum`), objet imbriqué (`address`), champ monétaire, métadonnées i18n.

---

Pour ajouter un nouveau formulaire :

1. Définir le type `FormType` et les valeurs par défaut.
2. Décrire le schéma `zod` en s’appuyant sur `fieldConfig`.
3. Implémenter `onSubmit` (mutations, `onDataChange`) et `onErrorForm` si nécessaire.
4. Factoriser les listes d’options et helpers dans `packages/common` / `packages/utils` pour éviter la duplication.
5. Tester via `pnpm --filter @sg/tests test` et valider les flux critiques en Storybook ou e2e si la logique UI est complexe.
