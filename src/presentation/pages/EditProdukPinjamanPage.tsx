import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProdukPinjamanForm } from '../components/forms/ProdukPinjamanForm';
import { getProdukPinjamanById, updateProdukPinjaman } from '../../container';
import { ProdukPinjaman } from '../../core/entities/Mutasi/ProdukPinjaman';

export const EditProdukPinjamanPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [produk, setProduk] = useState<ProdukPinjaman | null>(null);

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduk = async () => {
      if (id) {
        const data = await getProdukPinjamanById.execute(Number(id));
        setProduk(data);
      }
    };
    fetchProduk();
  }, [id]);

  const handleSubmit = async (produk: Omit<ProdukPinjaman, 'id'>) => {
    if (id) {
      await updateProdukPinjaman.execute(Number(id), produk); // Update produk
      navigate('/produk-pinjaman'); // Redirect ke halaman daftar produk
    }
  };

  if (!produk) {
    return <div>Loading...</div>; // Tampilkan loading saat data sedang diambil
  }

  return (
    <ProdukPinjamanForm
      initialData={produk} // Data produk yang akan diedit
      onSubmit={handleSubmit} // Fungsi untuk mengupdate produk
    />
  );
};