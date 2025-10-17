import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "@hooks/useNavigate";
import {
  Bordereau,
  BordereauStatusLabels,
  BordereauPeriodTypeLabels,
} from "@features/pro/gli/Bordereaux/model/Bordereau";
import { Button } from "@ui/components/ui/button";
import { Badge } from "@ui/components/ui/badge";
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
import { Eye } from "lucide-react";
import { useDI } from "@dependencies/depencieProvider";
import { Dependencies } from "@lib/tanstack-start/routerType";
interface BordereauxTableProps {
  bordereaux: Bordereau[];
}

const getStatusVariant = (status: number): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 0:
      return "secondary";
    case 1:
      return "outline";
    case 2:
      return "default";
    case 3:
      return "destructive";
    default:
      return "default";
  }
};

export function BordereauxTable({ bordereaux }: BordereauxTableProps) {
  const navigate = useNavigate();
  const { routes } = useDI<any>();

  const columns = useMemo<ColumnDef<Bordereau>[]>(
    () => [
      {
        accessorKey: "reference",
        header: "Référence",
        cell: ({ row }) => <div className="font-medium">{row.original.reference}</div>,
      },
      {
        accessorKey: "period",
        header: "Période",
        cell: ({ row }) => {
          const date = new Date(row.original.period + "-01");
          return format(date, "MMMM yyyy", { locale: fr });
        },
      },
      {
        accessorKey: "periodType",
        header: "Type",
        cell: ({ row }) => BordereauPeriodTypeLabels[row.original.periodType],
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {BordereauStatusLabels[row.original.status]}
          </Badge>
        ),
      },
      {
        accessorKey: "rentalCount",
        header: "Nb locations",
        cell: ({ row }) => row.original.rentalCount,
      },
      {
        accessorKey: "totalAmount",
        header: "Montant total",
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(row.original.totalAmount / 100)}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date création",
        cell: ({ row }) => format(new Date(row.original.createdAt), "dd/MM/yyyy", { locale: fr }),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate({
                to: "/pro/bordereaux/$bordereauId",
                params: { bordereauId: row.original.id },
              })
            }
          >
            <Eye className="h-4 w-4" />
          </Button>
        ),
      },
    ],
    [navigate],
  );

  const table = useReactTable({
    data: bordereaux,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
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
                Aucun bordereau trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
