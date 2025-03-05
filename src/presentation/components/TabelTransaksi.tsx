import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Transaksi } from "../../core/entities/Mutasi/Transaksi";

const columns: ColumnDef<Transaksi>[] = [
  {
    header: "Tanggal Transaksi",
    accessorKey: "tanggalTransaksi",
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return value.toLocaleDateString("id-ID");
    },
    filterFn: (row, columnId, filterValue: string) => {
      const date = row.getValue<Date>(columnId);
      return filterValue ? date.toISOString().startsWith(filterValue) : true;
    },
  },
  {
    header: "Jumlah Transaksi",
    accessorKey: "jumlahTransaksi",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <span
          className={`px-2 py-1 rounded ${
            value === "Cicilan"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      const value = row.getValue<string>(columnId);
      return filterValue ? value === filterValue : true;
    },
  },
  {
    header: "Keterangan",
    accessorKey: "keterangan",
    cell: ({ getValue }) => getValue<string>(),
  },
];

interface TabelTransaksiProps {
  transaksiList: Transaksi[];
}

export const TabelTransaksi: React.FC<TabelTransaksiProps> = ({ transaksiList }) => {
  const table = useReactTable({
    data: transaksiList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div
                    className="flex items-center space-x-2 hover:cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    {{
                      asc: "🔼",
                      desc: "🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>

                  {header.column.getCanFilter() ? (
                    <div className="mt-2">
                      {header.column.id === "tanggalTransaksi" ? (
                        <input
                          type="date"
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value || undefined)
                          }
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : header.column.id === "status" ? (
                        <select
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value || undefined)
                          }
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Semua</option>
                          <option value="Cicilan">Cicilan</option>
                          <option value="Pinjaman">Pinjaman</option>
                        </select>
                      ) : null}
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};