import { useBordereau } from "@pages/pro/GliBordereaux/hooks/useBordereau";
import { BordereauDetail } from "@pages/pro/GliBordereaux/components/BordereauDetail";
import { Button } from "@ui/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@hooks/useNavigate";
import { useParamsGenric } from "@lib/tanstack-start/useParamsGenric";

export default function BordereauDetailPage() {
  const navigate = useNavigate();
  const params = useParamsGenric<{
    bordereauId: string;
  }>();

  const { bordereau, isLoading } = useBordereau(params.bordereauId);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!bordereau) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Bordereau non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/pro/bordereaux" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <BordereauDetail bordereau={bordereau} />
    </div>
  );
}
