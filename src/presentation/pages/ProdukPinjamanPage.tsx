import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProdukPinjamanList } from "../components/tables/ProdukPinjamanList";
import { getAllProdukPinjaman, deleteProdukPinjaman } from "../../container"; // Impor dari container.ts
import { ProdukPinjaman } from "../../core/entities/Mutasi/ProdukPinjaman";

export const ProdukPinjamanPage: React.FC = () => {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState<ProdukPinjaman[]>([]);

  // Ambil daftar produk saat komponen dimuat
  useEffect(() => {
    const fetchProdukPinjaman = async () => {
      const data = await getAllProdukPinjaman.execute();
      setProdukList(data);
    };
    fetchProdukPinjaman();
  }, [getAllProdukPinjaman]);

  const handleTambahProduk = () => {
    navigate("/produk-pinjaman/tambah"); // Navigasi ke halaman tambah produk
  };

  const handleEditProduk = (id: number) => {
    navigate(`/produk-pinjaman/edit/${id}`); // Navigasi ke halaman edit produk
  };

  const handleDeleteProduk = async (id: number) => {
    await deleteProdukPinjaman.execute(id); // Hapus produk
    const data = await getAllProdukPinjaman.execute(); // Refresh daftar produk
    setProdukList(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Kelola Produk Pinjaman</h1>
            <div className="relative w-full sm:w-80 mt-4 sm:mt-0">
                <button
                    onClick={handleTambahProduk}
                    className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
                >
                    Tambah Produk
                </button>
            </div>
        </div>

            {/* Daftar Produk Pinjaman */}
            <ProdukPinjamanList
                produkList={produkList}
                onEdit={handleEditProduk}
                onDelete={handleDeleteProduk}
            />
      </div>
    </div>
  );
};