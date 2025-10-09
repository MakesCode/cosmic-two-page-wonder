import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Badge } from "@ui/components/ui/badge";
import { Separator } from "@ui/components/ui/separator";
import {
  Claim,
  ClaimStatus,
  ClaimStatusLabels,
  ClaimTypeLabels,
} from "@features/pro/gli/Claims/model/Claim";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FileText, MapPin, User, Calendar, Euro, FileCheck } from "lucide-react";

interface ClaimDetailProps {
  claim: Claim;
}

const getStatusVariant = (
  status: ClaimStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case ClaimStatus.APPROVED:
      return "default";
    case ClaimStatus.IN_PROGRESS:
      return "secondary";
    case ClaimStatus.REJECTED:
      return "destructive";
    default:
      return "outline";
  }
};

export const ClaimDetail: React.FC<ClaimDetailProps> = ({ claim }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{claim.claimNumber}</CardTitle>
            <Badge variant={getStatusVariant(claim.status)}>
              {ClaimStatusLabels[claim.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Locataire</p>
                <p className="text-sm text-muted-foreground">{claim.tenantName}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Adresse du bien</p>
                <p className="text-sm text-muted-foreground">{claim.propertyAddress}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Type de sinistre</p>
                <p className="text-sm text-muted-foreground">
                  {ClaimTypeLabels[claim.type]}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Euro className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Montant</p>
                <p className="text-sm text-muted-foreground">
                  {claim.amount.toFixed(2)} €
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Date de création</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(claim.createdAt), "dd MMMM yyyy", { locale: fr })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Dernière mise à jour</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(claim.updatedAt), "dd MMMM yyyy", { locale: fr })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Description</p>
            <p className="text-sm text-muted-foreground">{claim.description}</p>
          </div>

          {claim.rejectionReason && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2 text-destructive">
                  Raison du rejet
                </p>
                <p className="text-sm text-muted-foreground">{claim.rejectionReason}</p>
              </div>
            </>
          )}

          {claim.documents && claim.documents.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-3">Documents joints</p>
                <div className="space-y-2">
                  {claim.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm p-2 rounded-md border"
                    >
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
