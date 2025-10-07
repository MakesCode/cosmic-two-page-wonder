import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { retrieveClaimsQueryOption } from '@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption';
import { useSelector } from 'react-redux';
import { selectSubscriptionId } from '@features/common/globalIds/globalIds.selector';
import { ClaimStatus } from '@features/pro/gli/Claims/model/Claim';
import { useRouteContext } from '@tanstack/react-router';

export function ClaimsStats() {
  const { dependencies } = useRouteContext({ from: '/sinistres' });
  const subscriptionId = useSelector(selectSubscriptionId);

  const { data: claims = [] } = useQuery(
    retrieveClaimsQueryOption(
      {
        data: {},
        params: {
          subscriptionId: subscriptionId!,
        },
      },
      dependencies
    )
  );

  const stats = {
    open: claims.filter((c) => c.status === ClaimStatus.OPEN).length,
    inProgress: claims.filter((c) => c.status === ClaimStatus.IN_PROGRESS).length,
    closed: claims.filter((c) => c.status === ClaimStatus.CLOSED).length,
    rejected: claims.filter((c) => c.status === ClaimStatus.REJECTED).length,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sinistres ouverts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.open}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En cours</CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clôturés</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.closed}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
          <XCircle className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rejected}</div>
        </CardContent>
      </Card>
    </div>
  );
}
