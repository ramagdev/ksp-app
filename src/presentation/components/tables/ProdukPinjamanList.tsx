import React from "react";
import { ProdukPinjamanEntity } from "../../../core/entities/Mutasi/ProdukPinjaman";

interface ProdukPinjamanListProps {
  produkList: ProdukPinjamanEntity[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProdukPinjamanList: React.FC<ProdukPinjamanListProps> = ({
  produkList,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="nasabah-list max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Produk</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jarak Cicilan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Banyak Cicilan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Maksimum</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Minimum</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bunga</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jenis Peminjam</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Keterangan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produkList.map((produk) => (
              <tr key={produk.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{produk.namaProduk}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.jarakCicilan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.banyakCicilan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.maksimumPinjaman}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.minimumPinjaman}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.bunga}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.jenisPeminjam}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{produk.keterangan}</td>
                <td className="flex flex-col gap-1 justify-center  px-2 py-4">
                  <button
                    onClick={() => onEdit(produk.id!)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(produk.id!)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};