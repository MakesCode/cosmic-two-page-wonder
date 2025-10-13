import { z } from "zod";
import { AutoForm } from "@ui/components/sgComponent/autoform/AutoForm";
import { ZodProvider } from "@ui/components/sgComponent/autoform/zod/provider";
import { fieldConfig } from "@ui/components/sgComponent/autoform/zod/field-config";
import { useCreateBordereau } from "@pages/pro/GliBordereaux/hooks/useCreateBordereau";
import { useSelector } from "react-redux";
import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { BordereauPeriodType } from "@features/pro/gli/Bordereaux/model/Bordereau";

const createBordereauSchema = z.object({
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
  periodType: z.coerce.number().superRefine(
    fieldConfig({
      label: "Type de période",
      fieldType: "select",
      customData: {
        data: [
          { label: "Mensuel", value: BordereauPeriodType.MONTHLY.toString() },
          { label: "Trimestriel", value: BordereauPeriodType.QUARTERLY.toString() },
          { label: "Annuel", value: BordereauPeriodType.ANNUAL.toString() },
        ],
      },
    }),
  ),
  totalAmount: z.coerce
    .number()
    .min(0, "Le montant doit être positif")
    .superRefine(
      fieldConfig({
        label: "Montant total (€)",
        fieldType: "currency",
        description: "Montant en euros",
      }),
    ),
  commissionsAmount: z.coerce
    .number()
    .min(0, "Le montant doit être positif")
    .superRefine(
      fieldConfig({
        label: "Montant des commissions (€)",
        fieldType: "currency",
        description: "Montant en euros",
      }),
    ),
  claimsAmount: z.coerce
    .number()
    .min(0, "Le montant doit être positif")
    .superRefine(
      fieldConfig({
        label: "Montant des sinistres (€)",
        fieldType: "currency",
        description: "Montant en euros",
      }),
    ),
  rentalCount: z.coerce
    .number()
    .min(1, "Le nombre doit être supérieur à 0")
    .superRefine(
      fieldConfig({
        label: "Nombre de locations",
        fieldType: "number",
        inputProps: { min: 1 },
      }),
    ),
  comment: z
    .string()
    .optional()
    .superRefine(
      fieldConfig({
        label: "Commentaire",
        description: "Optionnel",
        inputProps: { placeholder: "Ajouter un commentaire..." },
      }),
    ),
});

type CreateBordereauFormData = z.infer<typeof createBordereauSchema>;

export function CreateBordereauForm() {
  const { createBordereau, isCreating } = useCreateBordereau();
  const subscriptionId = useSelector(selectSubscriptionId);

  const handleSubmit = (values: CreateBordereauFormData) => {
    if (!subscriptionId) {
      return;
    }

    createBordereau({
      params: {},
      data: {
        subscriptionId,
        period: values.period,
        periodType: Number(values.periodType),
        totalAmount: Math.round(values.totalAmount * 100),
        commissionsAmount: Math.round(values.commissionsAmount * 100),
        claimsAmount: Math.round(values.claimsAmount * 100),
        rentalCount: values.rentalCount,
        comment: values.comment,
      },
    });
  };

  return (
    <AutoForm
      id="create-bordereau-form"
      schema={new ZodProvider(createBordereauSchema)}
      onSubmit={handleSubmit}
      withSubmit
    />
  );
}
