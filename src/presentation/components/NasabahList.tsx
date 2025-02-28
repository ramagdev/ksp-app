import { Nasabah } from "../../data/repositories/IndexDB/NasabahRepository";
import { useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { PlusIcon } from "@heroicons/react/24/outline"; // Tambahkan PlusIcon
import { useState } from "react";
import { ModalTambahTransaksi } from "./ModalTambahTransaksi"; // Import komponen modal

interface NasabahListProps {
  nasabahList: Nasabah[];
  isLoading?: boolean;
  error?: string | null;
}

export default function NasabahList({ nasabahList, isLoading, error }: NasabahListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [selectedNasabahId, setSelectedNasabahId] = useState<number | null>(null); // State untuk menyimpan ID nasabah yang dipilih
  const [selectedNasabahName, setSelectedNasabahName] = useState<string>("");
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleOpenModal = (nasabahId: number, namaNasabah: string) => {
  
    setSelectedNasabahId(nasabahId);
    setSelectedNasabahName(namaNasabah);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNasabahId(null);
  };

  const handleRowClick = (nasabahId: number) => {
    navigate(`/nasabah/${nasabahId}`); // Navigasi ke halaman profil nasabah
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-600 max-w-md mx-auto">
        <p className="font-semibold text-lg">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="nasabah-list max-w-8xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">  
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                NIK
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Transaksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {nasabahList
              .filter((nasabah) => nasabah !== undefined && nasabah !== null && nasabah.id !== undefined) // Filter elemen yang tidak valid
              .map((nasabah) => (
                <tr
                  key={nasabah.id}
                  onClick={() => {
                    if (nasabah.id !== undefined) {
                      handleRowClick(nasabah.id);
                    }
                  }}
                  className="hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {nasabah.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {nasabah.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {nasabah.telepon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {nasabah.nik}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {nasabah.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Mencegah event bubbling ke <tr>
                        if (nasabah.id !== undefined) {
                          handleOpenModal(nasabah.id, nasabah.nama);
                        }
                      }}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {nasabahList.length === 0 && (
        <div className="p-6 text-center text-gray-500 bg-white">
          Tidak ada data nasabah saat ini.
        </div>
      )}

      {/* Modal Tambah Transaksi */}
      {isModalOpen && selectedNasabahId && (
        <ModalTambahTransaksi
        nasabahId={selectedNasabahId}
        namaNasabah={selectedNasabahName} // Ganti dengan nama nasabah yang sesuai
        onClose={handleCloseModal}
        />
      )}
    </div>
  );
}