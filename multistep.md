# `MultiStepForm` (`packages/ui/src/components/sgComponent/multi-step`)

## Pourquoi l'utiliser
- Encapsule un flux multi-étapes sans imposer d'UI : vous fournissez le container via une render-prop.
- Gère l'état persistant de chaque étape (avec option localStorage) et la navigation avant/arrière.
- Filtre dynamiquement les étapes grâce à `shouldRender`, ce qui évite de soumettre des données devenues hors-scope.
- Expose un `ref` pour réinitialiser le formulaire depuis l'extérieur (utile pour des filtres de tableaux, par exemple).

## Types clés
### `StepProps<T>`
| Propriété | Type | Description |
| --- | --- | --- |
| `data` | `T` | Valeurs de l'étape en cours. |
| `onDataChange` | `(data: T) => void` | Valide l'étape et passe à la suivante (ou soumet si c'est la dernière). |
| `onTempChange?` | `(data: Partial<T>) => void` | Met à jour l'état local de l'étape sans déclencher `onDataChange`. |
| `id` | `string` | Identifiant unique de l'étape. |

### `StepConfig<T, TFormData = Record<string, any>>`
| Propriété | Type | Description |
| --- | --- | --- |
| `name` | `string` | Clé utilisée dans `formData` et pour identifier l'étape. |
| `component` | `(props: StepProps<T>) => ReactNode` | Composant contrôlé par l'étape. |
| `shouldRender?` | `(formData: TFormData) => boolean` | Permet de masquer l'étape selon les données courantes. |

### `MultiStepFormProps<T, TFormData = Record<string, any>>`
| Propriété | Type | Description |
| --- | --- | --- |
| `steps` | `StepConfig<T, TFormData>[]` | Liste ordonnée des étapes. |
| `onSubmitApi` | `(formData: TFormData, clearFilters: () => void) => void` | Callback finale; reçoit uniquement les étapes rendues. |
| `children` | `({ currentForm, prevStep, progress, isLastStep, currentStepIndex, id, allStepsData }) => ReactNode` | Render-prop qui retourne votre UI. |
| `nameStorage?` | `string` | Active la persistance dans `localStorage` (clé utilisée pour sauvegarder). |
| `defaultFormData?` | `Record<string, T>` | Valeurs par défaut par étape. |
| `initialStepIndex?` | `number` | Étape sélectionnée initialement (par défaut `0`). |
| `ref?` | `React.Ref<MultiStepFormRef>` | Expose `clearFilters()`. |

## Render-prop `children`
Le composant ne rend rien par lui-même. Utilisez la fonction `children` pour récupérer :
- `currentForm`: le composant contrôlé de l'étape active (à insérer dans votre mise en page).
- `prevStep()`: navigation vers l'étape précédente.
- `progress`: pourcentage (0–100) basé sur le nombre d'étapes visibles.
- `isLastStep`: `true` lorsqu'on est à la dernière étape visible.
- `currentStepIndex`: index de l'étape visible (après filtrage).
- `id`: identifiant de l'étape courante.
- `allStepsData`: dictionnaire `{ [stepName]: stepData }` pour des récapitulatifs.

## Exemple rapide
```tsx
import MultiStepForm, { StepConfig, MultiStepFormRef } from '@ui/components/sgComponent/multi-step';

type StepPayload = {
  email?: string;
  accept?: boolean;
};

const steps: StepConfig<StepPayload>[] = [
  {
    name: 'contact',
    component: ({ data, onTempChange, onDataChange }) => (
      <ContactStep
        value={data.email ?? ''}
        onChange={(value) => onTempChange?.({ email: value })}
        onNext={() => onDataChange({ ...data, email: data.email })}
      />
    ),
  },
  {
    name: 'confirmation',
    shouldRender: (formData) => Boolean(formData.contact?.email),
    component: ({ data, onDataChange }) => (
      <ConfirmStep
        checked={!!data.accept}
        onSubmit={() => onDataChange({ ...data, accept: true })}
      />
    ),
  },
];

export function NewsletterWizard() {
  const formRef = React.useRef<MultiStepFormRef>(null);

  return (
    <MultiStepForm
      ref={formRef}
      steps={steps}
      nameStorage="newsletter-wizard"
      onSubmitApi={(payload, clear) => {
        submitNewsletter(payload);
        clear();
      }}
    >
      {({ currentForm, prevStep, progress, currentStepIndex, isLastStep }) => (
        <section className="space-y-4">
          <p aria-live="polite">Progression : {Math.round(progress)}%</p>
          <div>{currentForm}</div>
          <div className="flex items-center justify-between">
            <button type="button" onClick={prevStep} disabled={currentStepIndex === 0}>
              Retour
            </button>
            <span className="text-sm text-muted-foreground">
              {isLastStep ? 'Déclenchez la soumission depuis l\'étape courante.' : 'La navigation suivante est gérée par le composant d\'étape.'}
            </span>
          </div>
        </section>
      )}
    </MultiStepForm>
  );
}
```

## Persistance et réinitialisation
- Activez `nameStorage` pour réutiliser la progression après un rafraîchissement. En cas d'erreur `localStorage`, le composant logge un message et continue sans bloquer l'utilisateur.
- `defaultFormData` est fusionné avec les données persistées. Pensez à conserver les mêmes clés d'étapes pour éviter des collisions.
- `clearFilters()` remet les étapes à l'état initial et purge `localStorage`. Vous pouvez l'invoquer via le `ref` ou depuis `onSubmitApi` (voir l'exemple ci-dessus).

## Gestion des étapes conditionnelles
`shouldRender` reçoit les données complètes (données validées + saisie temporaire de l'étape active). Après un changement :
- Les étapes masquées sont ignorées pour le calcul du `progress` et ne sont plus soumises.
- Si l'étape courante devient invalide (non rendue), le composant recale automatiquement l'index sur la dernière étape visible.

## Bonnes pratiques
- Fournissez des identifiants de formulaire (`id`) cohérents si vous déclenchez un submit externe (`<Button form="...">`).
- Utilisez `onTempChange` pour prévisualiser les saisies (par exemple afficher un résumé à droite) sans quitter l'étape.
- Centralisez les types (`StepPayload`) pour que chaque étape lise/écrive un objet prévisible.
- Lorsque vous utilisez `nameStorage`, évitez de stocker des données volumineuses (localStorage est limité à ~5MB).
