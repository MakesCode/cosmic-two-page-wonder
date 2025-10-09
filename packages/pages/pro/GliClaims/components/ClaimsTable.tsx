import * as React from "react";
import { useClaims } from "@pages/pro/GliClaims/hooks/useClaims";
import { labelClaimStatus, labelClaimType } from "@features/pro/gli/Claims/model/Claim";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { Badge } from "@ui/components/ui/badge";

export const ClaimsTable = () => {
  const { claims, isLoading } = useClaims();

  if (isLoading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Référence</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Locataire</TableHead>
            <TableHead>Bien</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date création</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell className="font-medium">{claim.externalId}</TableCell>
              <TableCell>{labelClaimType(claim.type)}</TableCell>
              <TableCell>
                {claim.tenant.firstName} {claim.tenant.lastName}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{claim.property.address}</div>
                  <div className="text-gray-500">
                    {claim.property.zipCode} {claim.property.city}
                  </div>
                </div>
              </TableCell>
              <TableCell>{claim.amount.toLocaleString("fr-FR")} €</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(claim.status)}>
                  {labelClaimStatus(claim.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(claim.createDate), "dd MMM yyyy", { locale: fr })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function getStatusVariant(status: number): "default" | "secondary" | "destructive" | "outline" {
  if (status === 10) return "destructive"; // Open
  if (status === 20 || status === 30 || status === 40) return "default"; // InProgress, PendingDocuments, UnderReview
  if (status === 50 || status === 70) return "secondary"; // Approved, Closed
  return "outline"; // Rejected
}
