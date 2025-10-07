# `AutoForm` (`packages/ui/src/components/sgComponent/autoform`)

## Vue d'ensemble
`AutoForm` encapsule la génération d'interfaces de formulaire basées sur un schéma (Zod ou Yup) en s'appuyant sur `react-hook-form` et les primitives shadcn/ui. Le composant exporté depuis `packages/ui` habille la version "nue" (`react/AutoForm`) avec des wrappers UI par défaut tout en vous laissant la possibilité de les surcharger.

Flux général :
1. Vous construisez un `SchemaProvider` (ex. `new ZodProvider(z.object({...}))`).
2. Vous alimentez `AutoForm` avec ce provider et, si besoin, des `defaultValues`/`values`.
3. Le schéma est parsé en une arborescence de champs (`ParsedField`). Chaque champ déduit son type (`string`, `number`, `select`, `object`, `array`, etc.) grâce à `fieldConfig`.
4. `AutoForm` instancie `react-hook-form`, rend les champs correspondants et déclenche la validation du `SchemaProvider` lors du submit.

## Exports principaux
- `AutoForm<T>` : composant React générique, déjà pré-configuré avec les composants UI shadcn.
- `AutoFormProps<T>` : interface de props (extension d'`ExtendableAutoFormProps` de la couche `react`).
- `fieldConfig` : fabrique typée (`buildZodFieldConfig`) permettant d'enrichir un champ Zod (`label`, `fieldType`, `shouldRender`, `order`, `customData`, etc.).
- Types utiles : `FieldTypes` (alias des clés disponibles dans `ShadcnAutoFormFieldComponents`).

## Props du composant
| Prop | Type | Description |
| --- | --- | --- |
| `schema` | `SchemaProvider<T>` | Fournisseur de schéma (Zod/Yup). Le repo expose `ZodProvider` et `YupProvider` dans les sous-dossiers correspondants. |
| `id` | `string` | Identifiant du formulaire. Permet d'associer un bouton externe via l'attribut HTML `form`. |
| `onSubmit` | `(values: T, form: UseFormReturn<T>) => void \| Promise<void>` | Callback déclenchée après validation réussie du schéma. Les valeurs sont passées par `removeEmptyValues` (null/''/[]/{} filtrés). |
| `onErrorForm?` | `(errors, methods) => void` | Reçoit les erreurs visibles (celles dont `shouldRender` est vrai) + l'instance `react-hook-form` pour des traitements custom (ex. scroll to first error). |
| `defaultValues?` | `Partial<T>` | Valeurs initiales fusionnées avec `schema.getDefaultValues()`. |
| `values?` | `Partial<T>` | Valeurs contrôlées (synchro externe). |
| `children?` | `ReactNode` | Sera rendu **après** les champs auto-générés. |
| `uiComponents?` | `Partial<AutoFormUIComponents>` | Permet d'écraser un wrapper (Form, FieldWrapper, ErrorMessage, SubmitButton, ObjectWrapper, ArrayWrapper, ArrayElementWrapper). |
| `formComponents?` | `Partial<AutoFormFieldComponents>` | Permet d'ajouter/overrider un render pour `fieldType`. Les types par défaut sont définis dans `ShadcnAutoFormFieldComponents`. |
| `withSubmit?` | `boolean` | Ajoute automatiquement un bouton submit (`uiComponents.SubmitButton`). |
| `onFormInit?` | `(form: UseFormReturn<T>) => void` | Hook d'initialisation (actuellement appelé lors du montage). |
| `formProps?` | `React.ComponentProps<'form'>` | Propagées au `<form>`. |

## Définir un schéma Zod annoté
Le helper `fieldConfig` encapsule la fonction `buildZodFieldConfig`. Vous l'utilisez dans un `.superRefine()` pour attacher les métadonnées de rendu.

```ts
import { z } from 'zod';
import { ZodProvider } from '@ui/components/sgComponent/autoform/zod/provider';
import { fieldConfig } from '@ui/components/sgComponent/autoform';

const subscriptionSchema = new ZodProvider(
  z
    .object({
      email: z
        .string()
        .email()
        .superRefine(fieldConfig({
          label: 'Adresse e-mail',
          fieldType: 'string',
          inputProps: { placeholder: 'jane@doe.com' },
          order: 1,
        })),
      plan: z
        .enum(['basic', 'pro'])
        .superRefine(
          fieldConfig({
            label: 'Plan',
            fieldType: 'select',
            inputProps: {
              options: [
                { value: 'basic', label: 'Standard' },
                { value: 'pro', label: 'Professionnel' },
              ],
            },
            customData: { group: 'pricing' },
          }),
        ),
      seats: z
        .number()
        .min(1)
        .max(50)
        .superRefine(fieldConfig({
          label: 'Nombre de licences',
          fieldType: 'number',
          shouldRender: (data) => data.plan === 'pro',
        })),
    })
    .superRefine(fieldConfig({ label: 'Abonnement', fieldType: 'object' })),
);
```

Notes :
- `fieldType` doit correspondre à une clé disponible dans `ShadcnAutoFormFieldComponents` ou dans vos overrides (`formComponents`).
- `customData.group` est interprété dans `react/AutoForm` pour regrouper les champs horizontalement.
- `shouldRender` masque dynamiquement le champ (il sera exclu du submit si caché).

## Exemple complet
```tsx
import { AutoForm, fieldConfig } from '@ui/components/sgComponent/autoform';
import { ZodProvider } from '@ui/components/sgComponent/autoform/zod/provider';
import { Button } from '@ui/components/ui/button';
import { z } from 'zod';

const provider = new ZodProvider(
  z
    .object({
      company: z
        .string()
        .min(1)
        .superRefine(fieldConfig({ label: 'Société', fieldType: 'string' })),
      contact: z
        .object({
          name: z
            .string()
            .superRefine(fieldConfig({ label: 'Nom', fieldType: 'string', customData: { group: 'contact' } })),
          phone: z
            .string()
            .superRefine(fieldConfig({ label: 'Téléphone', fieldType: 'phone', customData: { group: 'contact' } })),
        })
        .superRefine(fieldConfig({ label: 'Contact', fieldType: 'object' })),
      addons: z
        .array(
          z
            .object({
              name: z.string().superRefine(fieldConfig({ label: 'Nom', fieldType: 'string' })),
              price: z.number().superRefine(fieldConfig({ label: 'Prix HT', fieldType: 'currency' })),
            })
            .superRefine(fieldConfig({ label: 'Option', fieldType: 'object' })),
        )
        .superRefine(fieldConfig({ label: 'Options', fieldType: 'array' })),
    })
    .superRefine(fieldConfig({ label: 'Nouvel abonnement' })),
);

export function SubscriptionForm() {
  return (
    <AutoForm
      id="subscription-form"
      schema={provider}
      defaultValues={{ addons: [] }}
      withSubmit
      onSubmit={(values) => console.log('payload', values)}
      onErrorForm={(errors) => console.error(`${errors.length} champ(s) à corriger`, errors)}
    >
      <Button type="submit" form="subscription-form">
        Enregistrer
      </Button>
    </AutoForm>
  );
}
```

## Personnaliser le rendu
- **UI wrappers** : passez `uiComponents={{ Form: CustomForm, FieldWrapper: MyWrapper }}` pour changer la structure sans toucher aux champs.
- **Champs personnalisés** : ajoutez un composant dans `formComponents`. Exemple :
  ```tsx
  const myDateField = ({ inputProps, id }: AutoFormFieldProps) => (
    <MyDatePicker {...inputProps} id={id} />
  );

  <AutoForm formComponents={{ date: myDateField }} ... />
  ```
  Si vous avez besoin d'un nouveau `fieldType`, exposez-le via `fieldConfig({ fieldType: 'richtext' })` et fournissez `formComponents={{ richtext: RichTextField }}`.
- **Fallback** : ajoutez `fallback` dans `formComponents` pour gérer les types non prévus.

## Gestion des erreurs
- `AutoForm` ne déclenche `onSubmit` que si `schema.validateSchema` renvoie `success: true` **ou** si toutes les erreurs appartiennent à des champs cachés (`shouldRender === false`).
- Les erreurs visibles sont propagées à `react-hook-form` afin que `FieldWrapper` affiche `ErrorMessage`.
- Pour un comportement personnalisé (scroll, analytics), utilisez `onErrorForm`.

## Bonnes pratiques
- Centralisez la définition du schéma et des `fieldConfig` dans un fichier dédié pour réutiliser la logique entre apps (`packages/features` ou similaire).
- Servez-vous de `customData` pour transmettre des informations d'affichage (groupes, colonnes, icônes) plutôt que de hardcoder dans le composant.
- Pensez à vider / synchroniser `values` lorsque vous utilisez `defaultValues` pour éviter des resets inattendus (la prop `values` force l'état contrôlé).
- Pour des formulaires volumineux, couplez `AutoForm` avec `MultiStepForm` : chaque étape peut rendre un sous-ensemble de champs en manipulant `shouldRender`.
