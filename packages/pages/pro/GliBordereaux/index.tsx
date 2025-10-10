import { useBordereaux } from "@pages/pro/GliBordereaux/hooks/useBordereaux";
import { BordereauxTable } from "@pages/pro/GliBordereaux/components/BordereauxTable";
import { Button } from "@ui/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";

export default function GliBordereauxPage() {
  const { bordereaux, isLoading } = useBordereaux();
  const navigate = useNavigate();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bordereaux GLI</h2>
          <p className="text-muted-foreground">
            Gérez vos bordereaux de garantie des loyers impayés
          </p>
        </div>
        <Button onClick={() => navigate({ to: "/pro/bordereaux/nouveau" })}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau bordereau
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des bordereaux</CardTitle>
          <CardDescription>
            Retrouvez l'ensemble de vos bordereaux avec leur statut et détails
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          ) : (
            <BordereauxTable bordereaux={bordereaux} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
