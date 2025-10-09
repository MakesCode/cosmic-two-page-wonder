import * as React from "react";
import { Sidebar } from "@ui/components/sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@ui/components/sgComponent/sidebar/SiteHeader";
import { useClaim } from "./hooks/useClaim";
import { ClaimDetail } from "./components/ClaimDetail";
import { Button } from "@ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function ClaimDetailPage() {
  const navigate = useNavigate();
  const { claimId } = useParams({ strict: false }) as { claimId: string };
  const { claim, isLoading } = useClaim(claimId);

  return (
    <Sidebar>
      <SiteHeader />
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/pro/sinistres" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Détail du sinistre</h1>
            <p className="text-muted-foreground">
              Informations complètes sur le sinistre
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : claim ? (
          <ClaimDetail claim={claim} />
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Sinistre non trouvé</p>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
