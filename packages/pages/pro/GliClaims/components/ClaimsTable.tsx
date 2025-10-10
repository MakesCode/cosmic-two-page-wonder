import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Badge } from "@ui/components/ui/badge";
import {
  Claim,
  ClaimStatus,
  ClaimStatusLabels,
  ClaimTypeLabels,
} from "@features/pro/gli/Claims/model/Claim";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye } from "lucide-react";

interface ClaimsTableProps {
  claims: Claim[];
}

const getStatusVariant = (
  status: ClaimStatus,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case ClaimStatus.APPROVED:
      return "default";
    case ClaimStatus.IN_PROGRESS:
      return "secondary";
    case ClaimStatus.REJECTED:
      return "destructive";
    default:
      return "outline";
  }
};

export const ClaimsTable: React.FC<ClaimsTableProps> = ({ claims }) => {
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<Claim>[] = [
    {
      accessorKey: "claimNumber",
      header: "N° Sinistre",
      cell: ({ row }) => <div className="font-medium">{row.getValue("claimNumber")}</div>,
    },
    {
      accessorKey: "tenantName",
      header: "Locataire",
    },
    {
      accessorKey: "propertyAddress",
      header: "Bien",
      cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("propertyAddress")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => ClaimTypeLabels[row.getValue("type") as keyof typeof ClaimTypeLabels],
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as ClaimStatus;
        return <Badge variant={getStatusVariant(status)}>{ClaimStatusLabels[status]}</Badge>;
      },
    },
    {
      accessorKey: "amount",
      header: "Montant",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return <div className="font-medium">{amount.toFixed(2)} €</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date création",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return format(date, "dd MMM yyyy", { locale: fr });
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            navigate({
              to: "/pro/sinistres/$claimId",
              params: { claimId: row.original.id },
            })
          }
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: claims,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Rechercher un sinistre..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun sinistre trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} sinistre(s) au total
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
};
