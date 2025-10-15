import * as React from "react";
import { Sidebar } from "@ui/components/sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@ui/components/sgComponent/sidebar/SiteHeader";
import { useClaims } from "./hooks/useClaims";
import { ClaimsTable } from "./components/ClaimsTable";
import { Button } from "@ui/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "@hooks/useNavigate";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card";
import { useDI } from "@dependencies/depencieProvider";

export default function GliClaimsPage() {
  const navigate = useNavigate();
  const { claims, isLoading } = useClaims();
  const { routes } = useDI<any>();
  console.log(routes, "routes");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des sinistres</h1>
          <p className="text-muted-foreground">Suivez et gérez vos déclarations de sinistres GLI</p>
        </div>
        <Button onClick={() => navigate({ to: routes.BORDEREAUX_NEW })}>
          <Plus className="mr-2 h-4 w-4" />
          Déclarer un sinistre
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des sinistres</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          ) : (
            <ClaimsTable claims={claims} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
