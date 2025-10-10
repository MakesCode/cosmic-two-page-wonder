import { CreateBordereauForm } from "@pages/pro/GliBordereaux/components/CreateBordereauForm";
import { Button } from "@ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function CreateBordereauPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/pro/bordereaux" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouveau bordereau</CardTitle>
          <CardDescription>
            Créez un nouveau bordereau pour le mois en cours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateBordereauForm />
        </CardContent>
      </Card>
    </div>
  );
}
