import * as React from "react";
import { Sidebar } from "@ui/components/sgComponent/sidebar/Sidebar";
import { SiteHeader } from "@ui/components/sgComponent/sidebar/SiteHeader";
import { CreateClaimForm } from "./components/CreateClaimForm";
import { Button } from "@ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function CreateClaimPage() {
  const navigate = useNavigate();

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
            <h1 className="text-3xl font-bold">Nouveau sinistre</h1>
            <p className="text-muted-foreground">
              Déclarez un nouveau sinistre pour votre garantie GLI
            </p>
          </div>
        </div>

        <CreateClaimForm />
      </div>
    </Sidebar>
  );
}
