import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/components/ui/table';
import { Badge } from '@ui/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Input } from '@ui/components/ui/input';
import { retrieveClaimsQueryOption } from '@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption';
import { selectSubscriptionId } from '@features/common/globalIds/globalIds.selector';
import { ClaimStatus } from '@features/pro/gli/Claims/model/Claim';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useRouteContext } from '@tanstack/react-router';

const statusConfig = {
  [ClaimStatus.OPEN]: { label: 'Ouvert', variant: 'destructive' as const },
  [ClaimStatus.IN_PROGRESS]: { label: 'En cours', variant: 'default' as const },
  [ClaimStatus.CLOSED]: { label: 'Clôturé', variant: 'secondary' as const },
  [ClaimStatus.REJECTED]: { label: 'Rejeté', variant: 'outline' as const },
};

export function ClaimsTable() {
  const { dependencies } = useRouteContext({ from: '/sinistres' });
  const subscriptionId = useSelector(selectSubscriptionId);
  const [search, setSearch] = useState('');

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

  const filteredClaims = claims.filter(
    (claim) =>
      claim.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      claim.propertyAddress.toLowerCase().includes(search.toLowerCase()) ||
      claim.claimType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des sinistres</CardTitle>
        <Input
          placeholder="Rechercher par locataire, adresse ou type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Locataire</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.tenantName}</TableCell>
                <TableCell>{claim.propertyAddress}</TableCell>
                <TableCell>{claim.claimType}</TableCell>
                <TableCell>
                  {format(new Date(claim.claimDate), 'dd/MM/yyyy', { locale: fr })}
                </TableCell>
                <TableCell>{claim.amount.toLocaleString('fr-FR')} €</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[claim.status].variant}>
                    {statusConfig[claim.status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
