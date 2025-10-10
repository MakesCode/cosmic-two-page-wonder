import * as React from "react";
import { z } from "zod";
import { AutoForm, fieldConfig } from "@ui/components/sgComponent/autoform";
import { ZodProvider } from "@ui/components/sgComponent/autoform/zod/provider";
import { ClaimType } from "@features/pro/gli/Claims/model/Claim";
import { useCreateClaim } from "../hooks/useCreateClaim";
import { selectSubscriptionId } from "@features/common/globalIds/globalIds.selector";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card";

const claimSchema = new ZodProvider(
  z.object({
    rentalApprovalId: z
      .string()
      .min(1, "Veuillez sélectionner un locataire")
      .superRefine(
        fieldConfig({
          label: "Locataire",
          fieldType: "string",
          inputProps: {
            placeholder: "ID du locataire (ex: rental-1)",
          },
          order: 1,
        }),
      ),
    type: z
      .enum([
        ClaimType.UNPAID_RENT,
        ClaimType.PROPERTY_DAMAGE,
        ClaimType.LEGAL_FEES,
        ClaimType.EVICTION,
        ClaimType.OTHER,
      ])
      .superRefine(
        fieldConfig({
          label: "Type de sinistre",
          fieldType: "select",
          inputProps: {
            options: [
              { value: ClaimType.UNPAID_RENT, label: "Loyer impayé" },
              { value: ClaimType.PROPERTY_DAMAGE, label: "Dégradation" },
              { value: ClaimType.LEGAL_FEES, label: "Frais juridiques" },
              { value: ClaimType.EVICTION, label: "Expulsion" },
              { value: ClaimType.OTHER, label: "Autre" },
            ],
          },
          order: 2,
        }),
      ),
    amount: z
      .number()
      .min(1, "Le montant doit être supérieur à 0")
      .superRefine(
        fieldConfig({
          label: "Montant du sinistre (€)",
          fieldType: "currency",
          order: 3,
        }),
      ),
    description: z
      .string()
      .min(10, "La description doit contenir au moins 10 caractères")
      .superRefine(
        fieldConfig({
          label: "Description du sinistre",
          fieldType: "string",
          inputProps: {
            placeholder: "Décrivez le sinistre en détail...",
          },
          order: 4,
        }),
      ),
  }),
);
// lastName: z
//         .string({
//           message: `${t('RequiredFields18362', 'Champs requis')}`,
//         })
//         .superRefine(
//           fieldConfig({
//             label: `${t(isPro ? 'LastNamePro' : 'LastName')}`,
//             customData: { group: 'group1' },
//             inputProps: {
//               required: false,
//             },
//           }),
//         ),
export const CreateClaimForm: React.FC = () => {
  const navigate = useNavigate();
  const subscriptionId = useSelector(selectSubscriptionId);
  const { createClaim, isCreating, isSuccess } = useCreateClaim();

  React.useEffect(() => {
    if (isSuccess) {
      navigate({ to: "/pro/sinistres" });
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (values: z.infer<typeof claimSchema.schema>) => {
    if (!subscriptionId) return;

    createClaim({
      data: {
        subscriptionId,
        rentalApprovalId: values.rentalApprovalId,
        type: values.type,
        amount: values.amount,
        description: values.description,
      },
      params: {},
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Déclarer un sinistre</CardTitle>
      </CardHeader>
      <CardContent>
        <AutoForm id="create-claim-form" schema={claimSchema} onSubmit={handleSubmit}>
          <div className="flex items-center justify-end space-x-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/pro/sinistres" })}
              disabled={isCreating}
            >
              Annuler
            </Button>
            <Button type="submit" form="create-claim-form" disabled={isCreating}>
              {isCreating ? "Création..." : "Créer le sinistre"}
            </Button>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  );
};
