import { useState, useMemo, useEffect } from "react";
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from "@tanstack/react-table";
import LoanMutation from "../../../core/entities/Mutasi/Output/LoanMutation";
import { getLoanMutations, hapusPinjaman, hapusPembayaran } from "../../../container";

interface PinjamanMutationTableProps {
  pinjamanId: number | null;
  renderCounter: number;
  onDelete: (message: string, deleteClicked:boolean) => void;
  onDeleteSuccess: () => void;
}

const PinjamanMutationTable = ({ pinjamanId, renderCounter, onDelete, onDeleteSuccess }: PinjamanMutationTableProps) => {
  const [data, setData] = useState<LoanMutation["cicilan"]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [pinjaman, setPinjaman] = useState<{
    id: number;
    pokok: number;
    bunga: number;
    berbunga: number;
    tanggal: Date;
    status: 'Aktif' | 'Lunas' | 'Macet' | 'Gagal';
    keterangan: string;
  }>();
  const [deleteClicked, setDeleteClicked] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      if (!pinjamanId) {
        return;
      }
      const mutation = await getLoanMutations.execute(pinjamanId);
      setData(mutation.cicilan);
      setPinjaman({
        id: mutation.pinjamanId,
        pokok: mutation.pinjamanPokok,
        bunga: mutation.bunga,
        berbunga: mutation.pinjamanBerbunga,
        tanggal: mutation.tanggalPinjaman,
        status: mutation.statusPinjaman,
        keterangan: mutation.keterangan? mutation.keterangan : '',
      });
    } catch (error) {
      console.error('Error fetching loan mutations:', error);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchData();
    }, [pinjamanId, renderCounter]);

  const onDeleteClick = async (id: number) => {
    try {
      await hapusPinjaman.execute(id);
      setMessage('Pinjaman berhasil dihapus');
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting loan:', error);
      setMessage('Pinjaman masih memiliki catatan pembayaran, tidak dapat dihapus');
    } finally {
      setDeleteClicked(true); // Tandai bahwa tombol hapus telah ditekan
    }
  };

  const onDelIconClick = async (cicilanId: number, transaksiId: number) => {
    try {
      await hapusPembayaran.execute(cicilanId, transaksiId);
      setMessage('Pembayaran berhasil dihapus');
      fetchData();
    } catch (error) {
      console.error('Error deleting loan:', error);
      setMessage('Catatan pembayaran tidak dapat dihapus');
    } finally {
      setDeleteClicked(true); // Tandai bahwa tombol hapus telah ditekan
    }
  };

  useEffect(() => {
    if (deleteClicked) {
      onDelete(message, deleteClicked); // Panggil onDelete dengan message terbaru
      setDeleteClicked(false); // Reset deleteClicked setelah memanggil onDelete
    }
  }, [deleteClicked, message, onDelete]);

  const columns = useMemo<ColumnDef<LoanMutation["cicilan"][number]>[]>(
    () => [
      {
        header: "No.",
        accessorKey: "nomorCicilan",
        size: 5,
      },
      {
        header: "Jatuh Tempo",
        accessorKey: "tanggalJatuhTempo",
        cell: (info) => info.getValue<Date>().toLocaleDateString("id-ID"),
      },
      {
        header: "Terutang",
        accessorKey: "jumlahHarusDibayar",
        cell: (info) => info.getValue<number>().toLocaleString("id-ID"),
      },
      {
        header: "Tanggal Bayar",
        cell: (info) => {
          const rows = info.row.original.rows;
          return (
            <div className="space-y-1">
              {rows.map((row, index) => (
                <div key={index}>
                  {row.tanggalBayar.toLocaleDateString("id-ID")}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        header: "Jumlah Bayar",
        cell: (info) => {
          const rows = info.row.original.rows;
          return (
            <div className="space-y-1">
              {rows.map((row, index) => (
                <div key={index}>
                  {row.jumlah.toLocaleString("id-ID")}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        header: "Kurang Bayar",
        cell: (info) => {
          const rows = info.row.original.rows;
          return (
            <div className="space-y-1">
              {rows.map((row, index) => (
                <div key={index}>
                  {row.kurangBayar.toLocaleString("id-ID")}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        header: "Keterangan",
        cell: (info) => {
          const rows = info.row.original.rows;
          return (
            <div className="space-y-1">
              {rows.map((row, index) => (
                <div key={index}>
                  {row.keterangan || "-"}
                  <div className="">
                    <button
                      type="button"
                      className="bg-red-500 text-white  p-1 rounded-lg hover:bg-red-600 hidden group-hover:block"
                      onClick={() => row && onDelIconClick(info.row.original.cicilanId, row.transaksiId)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

            </div>
          );
        },
      },
      {
        header: "Tgl. Lunas",
        accessorKey: "tanggalPembayaranLunas",
        cell: (info) =>
          info.getValue<Date | null>()?.toLocaleDateString("id-ID") || "-",
      },
      {
        header: "LC Days",
        accessorKey: "lcDays",
      },
      {
        header: "Status Cicilan",
        accessorKey: "statusCicilan",
        cell: (info) => {
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
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 1,
      minSize: 1,
      maxSize: 200,
    }
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
    <div>
      <div className="container overflow-x-auto">
        <table className="min-w-full divide-y divide-black-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="w-auto px-2 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    style={{ width: header.getSize() }} // Terapkan lebar kolom
                  >
                  
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 group">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="w-auto px-2 py-3 text-sm text-gray-700"
                    style={{ width: cell.column.getSize() }} // Terapkan lebar kolom
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
      <div className="flex flex-row pb-1 bg-gray-100">
        <span className="text-sm font-semibold ml-4">
          Pinjaman Berbunga: {(!pinjaman) ? "-" : (pinjaman.berbunga.toLocaleString("id-ID"))}
        </span>
      </div>
      <div className="flex flex-row pb-1">
        <span className="text-sm ml-4">
          Keterangan: {(!pinjaman) ? "-" : pinjaman.keterangan}
        </span>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="m-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={() => pinjaman && onDeleteClick(pinjaman.id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default PinjamanMutationTable;