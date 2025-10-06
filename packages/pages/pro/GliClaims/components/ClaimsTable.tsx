import { useMemo } from "react";
import { useDependencies } from "@dependencies/depencieProvider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { retrieveClaimsQueryOption } from "@features/pro/gli/Claims/retrieveClaims/retrieveClaimsQueryOption";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Claim, ClaimStatus, ClaimType } from "@features/pro/gli/Claims/model/Claim";
import { Card } from "@ui/components/ui/card";
import { Badge } from "@ui/components/ui/badge";
import { Input } from "@ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const getStatusBadge = (status: ClaimStatus) => {
  const variants: Record<ClaimStatus, { variant: any; label: string }> = {
    [ClaimStatus.OPEN]: { variant: "destructive", label: "Ouvert" },
    [ClaimStatus.IN_PROGRESS]: { variant: "default", label: "En cours" },
    [ClaimStatus.CLOSED]: { variant: "secondary", label: "Clôturé" },
    [ClaimStatus.REJECTED]: { variant: "outline", label: "Rejeté" },
  };
  
  const config = variants[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const getTypeBadge = (type: ClaimType) => {
  const labels: Record<ClaimType, string> = {
    [ClaimType.UNPAID_RENT]: "Loyers impayés",
    [ClaimType.PROPERTY_DAMAGE]: "Dégâts matériels",
    [ClaimType.LEGAL_FEES]: "Frais juridiques",
    [ClaimType.OTHER]: "Autre",
  };
  
  return <Badge variant="outline">{labels[type]}</Badge>;
};

export function ClaimsTable() {
  const { claimsApi } = useDependencies();
  
  const { data: claimsResponse } = useSuspenseQuery(
    retrieveClaimsQueryOption(claimsApi, { params: {} })
  );

  const claims = claimsResponse?.payload || [];

  const columns = useMemo<ColumnDef<Claim>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.id}</span>
        ),
      },
      {
        accessorKey: "tenantName",
        header: "Locataire",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.tenantName}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.propertyAddress}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => getTypeBadge(row.original.type),
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => getStatusBadge(row.original.status),
      },
      {
        accessorKey: "amount",
        header: "Montant",
        cell: ({ row }) => (
          <span className="font-semibold">
            {row.original.amount.toLocaleString("fr-FR")} €
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) => (
          <span className="text-sm">
            {format(new Date(row.original.createdAt), "dd MMM yyyy", {
              locale: fr,
            })}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: claims,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Card>
      <div className="p-4 border-b">
        <Input
          placeholder="Rechercher un sinistre..."
          value={(table.getColumn("tenantName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tenantName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun sinistre trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
