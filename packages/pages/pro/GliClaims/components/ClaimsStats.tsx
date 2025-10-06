import { Card } from "@ui/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useDependencies } from "@dependencies/depencieProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { retrieveClaimsQueryOption } from "@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption";
import { ClaimStatus } from "@features/pro/gli/Claims/model/Claim";

export function ClaimsStats() {
  const { claimsApi } = useDependencies();
  
  const { data: claimsResponse } = useSuspenseQuery(
    retrieveClaimsQueryOption(claimsApi, { params: {} })
  );

  const claims = claimsResponse?.payload || [];

  const stats = {
    open: claims.filter(c => c.status === ClaimStatus.OPEN).length,
    inProgress: claims.filter(c => c.status === ClaimStatus.IN_PROGRESS).length,
    closed: claims.filter(c => c.status === ClaimStatus.CLOSED).length,
    rejected: claims.filter(c => c.status === ClaimStatus.REJECTED).length,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Ouverts</p>
            <p className="text-2xl font-bold">{stats.open}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">En cours</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Clôturés</p>
            <p className="text-2xl font-bold">{stats.closed}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-gray-100 p-3">
            <XCircle className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Rejetés</p>
            <p className="text-2xl font-bold">{stats.rejected}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
