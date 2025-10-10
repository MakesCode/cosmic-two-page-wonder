import { Bordereau, BordereauStatusLabels, BordereauPeriodTypeLabels } from "@features/pro/gli/Bordereaux/model/Bordereau";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { Badge } from "@ui/components/ui/badge";
import { Separator } from "@ui/components/ui/separator";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Euro, FileText, Home, AlertCircle } from "lucide-react";

interface BordereauDetailProps {
  bordereau: Bordereau;
}

const getStatusVariant = (status: number): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 0: return "secondary";
    case 1: return "outline";
    case 2: return "default";
    case 3: return "destructive";
    default: return "default";
  }
};

export function BordereauDetail({ bordereau }: BordereauDetailProps) {
  const periodDate = new Date(bordereau.period + "-01");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{bordereau.reference}</CardTitle>
              <CardDescription>
                {format(periodDate, "MMMM yyyy", { locale: fr })} - {BordereauPeriodTypeLabels[bordereau.periodType]}
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(bordereau.status)} className="h-8 px-4">
              {BordereauStatusLabels[bordereau.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(bordereau.totalAmount / 100)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commissions</p>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(bordereau.commissionsAmount / 100)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sinistres</p>
                <p className="text-xl font-semibold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(bordereau.claimsAmount / 100)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <Home className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="text-xl font-semibold">{bordereau.rentalCount}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Historique
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date de création</span>
                <span className="font-medium">
                  {format(new Date(bordereau.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                </span>
              </div>
              {bordereau.submittedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date de soumission</span>
                  <span className="font-medium">
                    {format(new Date(bordereau.submittedAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                  </span>
                </div>
              )}
              {bordereau.validatedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date de validation</span>
                  <span className="font-medium">
                    {format(new Date(bordereau.validatedAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                  </span>
                </div>
              )}
              {bordereau.rejectedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date de rejet</span>
                  <span className="font-medium">
                    {format(new Date(bordereau.rejectedAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {bordereau.comment && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Commentaire</h3>
                <p className="text-sm text-muted-foreground">{bordereau.comment}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
