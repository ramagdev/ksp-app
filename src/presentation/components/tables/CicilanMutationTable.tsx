// src/components/CicilanMutationTable.tsx
import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { getLoanMutations } from '../../../container';
import LoanMutation from '../../../core/entities/Mutasi/LoanMutation';

type CicilanData = LoanMutation['cicilan'][number];

interface CicilanMutationTableProps {
  pinjamanId: number | null;
}

export const CicilanMutationTable = ({ pinjamanId }: CicilanMutationTableProps) => {
  const [data, setData] = useState<CicilanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (pinjamanId) {
        const mutation = await getLoanMutations.execute(pinjamanId);
        setData(mutation.cicilan)
        }
      } catch (error) {
        console.error('Error fetching loan mutations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pinjamanId]);

  const columns = useMemo<ColumnDef<CicilanData>[]>(
    () => [
      {
        accessorKey: 'nomor',
        header: 'No.',
        cell: info => info.getValue(),
        size: 50,
      },
      {
        accessorKey: 'tanggalJatuhTempo',
        header: 'Tgl. Jatuh Tempo',
        cell: info => new Date(info.getValue() as Date).toLocaleDateString('id-ID'),
      },
      {
        accessorKey: 'jumlahHarusDibayar',
        header: 'Besar Tagihan',
        cell: info =>
          (info.getValue() as number).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }),
      },
      {
        accessorKey: 'tanggalBayar',
        header: 'Tgl. Bayar',
        cell: info => {
          const tanggalBayar = info.getValue() as Date[];
          return tanggalBayar.length > 0
            ? tanggalBayar.map(d => new Date(d).toLocaleDateString('id-ID')).join(', ')
            : '-';
        },
      },
      {
        accessorKey: 'lcDays',
        header: 'LC Days',
        cell: info => info.getValue(),
        size: 80,
      },
      {
        accessorKey: 'pembayaran',
        header: 'Pembayaran',
        cell: info =>
          (info.getValue() as number).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }),
      },
      {
        accessorKey: 'kurangBayar',
        header: 'Kurang Bayar',
        cell: info =>
          (info.getValue() as number).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => {
          const status = info.getValue() as string;
          const colorClass =
            status === 'Dibayar'
              ? 'bg-green-100 text-green-800'
              : status === 'Terlambat'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'Macet'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800';

          return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'keterangan',
        header: 'Keterangan',
        cell: info => info.getValue() || '-',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-2 text-gray-600">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="py-3 px-4 text-left text-sm font-semibold text-gray-700"
                  style={{ width: header.column.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition-colors duration-150"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-3 px-4 text-sm text-gray-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">Tidak ada data cicilan.</div>
      )}
    </div>
  );
};